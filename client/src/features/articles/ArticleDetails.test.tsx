import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ArticleDetails from './ArticleDetails';
import * as articlesService from "../../shared/services/articles.service";
import { Article } from '../../shared/models/article.model';

jest.mock("../../constants", () => ({
    API_URL: "http://your-test-url"
}));

jest.mock("../../shared/services/articles.service", () => ({
    fetchArticle: jest.fn(),
    deleteArticle: jest.fn(),
}));

global.console.error = jest.fn();

describe("ArticleDetails component", () => {
    const mockArticle: Article = {
        id: "1",
        title: "Test Title",
        body: "Test Body",
        notes: "Test Notes",
        links: "http://www.google.com",
        status: "public"
    };

    const renderComponent = () => {
        render(
            <MemoryRouter initialEntries={[`/article/${mockArticle.id}`]}>
                <Routes>
                    <Route path='/article/:id' element={<ArticleDetails/>} />
                    <Route path='/' element={<div>Articles List</div>} />
                </Routes>
            </MemoryRouter>
        );
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("handles error when fetching article fails",async () => {
        // "Failed to fetch articles: ", e => An error occurred!
        const error = new Error("An error occurred!");
        (articlesService.fetchArticle as jest.Mock).mockRejectedValue(error);

        const consoleSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(jest.fn());

        renderComponent();

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith("Failed to fetch article: ", error);
        });

        consoleSpy.mockRestore();
    }); 

    test("displays the fetched article data",async () => {
        (articlesService.fetchArticle as jest.Mock).mockResolvedValue(mockArticle);
        renderComponent();

        await waitFor(() => {
            expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
            expect(screen.getByText(mockArticle.body)).toBeInTheDocument();
            expect(screen.getByText(mockArticle.notes)).toBeInTheDocument();
            expect(screen.getByText(mockArticle.links)).toBeInTheDocument();
        });
    });

    test("deletes a post and redirects to list when delete button is clicked",async () => {
        (articlesService.fetchArticle as jest.Mock).mockResolvedValue(mockArticle);

        renderComponent();

        await waitFor(() => screen.getByText(mockArticle.title));

        fireEvent.click(screen.getAllByText("Delete")[0]);
        fireEvent.click(screen.getAllByText("Confirm")[0]);

        await waitFor(() => expect(articlesService.deleteArticle).toHaveBeenCalled());

        await waitFor(() => expect(screen.getByText("Articles List")).toBeInTheDocument())
    }); 
});