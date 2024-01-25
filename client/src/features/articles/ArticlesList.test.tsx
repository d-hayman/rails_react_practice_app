import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import ArticlesList from './ArticlesList';
import * as articlesService from "../../shared/services/articles.service";

jest.mock("../../constants", () => ({
    API_URL: "http://your-test-url"
}));

jest.mock("../../shared/services/articles.service", () => ({
    fetchAllArticles: jest.fn(),
    deleteArticle: jest.fn(),
}));

global.console.error = jest.fn();

describe("ArticlesList component with nothing loaded yet", () => {
    test("sets error and loading to false when fetching posts fails",async () => {
        // "Failed to fetch articles: ", e => An error occurred!
        const error = new Error("An error occurred!");
        (articlesService.fetchAllArticles as jest.Mock).mockRejectedValue(error);

        //const consoleSpy = jest
        //    .spyOn(console, 'error')
        //    .mockImplementation(() => {});

        render(<ArticlesList/>, {wrapper: MemoryRouter});

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith("Failed to fetch articles: ", error);
            //expect(consoleSpy).toHaveBeenCalledWith("Failed to fetch articles: ", error);
        });
    }); 
});

describe("ArticlesList component", () => {
    const mockArticles = [
        {id: 1, title: "Article 1"},
        {id: 2, title: "Article 2"},
    ];

    beforeEach(() => {
        (articlesService.fetchAllArticles as jest.Mock).mockResolvedValue(mockArticles);
    });

    test("renders the list of articles",async () => {
        render(<ArticlesList/>, {wrapper: MemoryRouter});

        await waitFor(() => screen.getByText("Article 1"));

        expect(screen.getByText("Article 1")).toBeInTheDocument();
        expect(screen.getByText("Article 2")).toBeInTheDocument();
    });

    test("deletes a post when delete button is clicked",async () => {
        render(<ArticlesList/>, {wrapper: MemoryRouter});

        const articleText = "Article 1";
        await waitFor(() => screen.getByText(articleText));

        fireEvent.click(screen.getAllByText("Delete")[0]);
        fireEvent.click(screen.getAllByText("Confirm")[0]);

        await waitFor(() => expect(articlesService.deleteArticle).toHaveBeenCalled());

        expect(screen.queryByText(articleText)).not.toBeInTheDocument();
    }); 
});