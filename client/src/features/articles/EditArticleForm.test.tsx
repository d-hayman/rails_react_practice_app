import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { act } from 'react-dom/test-utils';
import { describe } from "node:test";

import EditArticleForm from './EditArticleForm';
import { fetchArticle, updateArticle } from '../../shared/services/articles.service';
import { Article } from '../../shared/models/article.model';

jest.mock("../../shared/services/articles.service", () => ({
    fetchArticle: jest.fn(),
    updateArticle: jest.fn(() =>{
        return {
            id: 1,
            title: "Test Post",
            body: "This is a test Post"
        }
    }),
}));

describe("EditArticleForm", () => {
    const mockArticle: Article = {
        id: "1",
        title: "Test Title",
        body: "Test Body",
        notes: "Test Notes",
        links: "http://www.google.com",
        status: "public"
    };

    const renderForm = () => {
        render(
            <MemoryRouter initialEntries={[`/article/${mockArticle.id}/edit`]}>
                <Routes>
                    <Route path='/article/:id/edit' element={<EditArticleForm/>} />
                    <Route path='/article/:id' element={<h1>Article Details</h1>} />
                </Routes>
            </MemoryRouter>
        );
    }

    beforeEach(() => {
        (fetchArticle as jest.Mock).mockResolvedValue(mockArticle);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render the EditArticleForm component", async () => {
        renderForm();

        await waitFor(() => {
            expect(fetchArticle).toHaveBeenCalledTimes(1);
        });

        expect(screen.getByDisplayValue(mockArticle.title)).toBeInTheDocument();
        expect(screen.getByDisplayValue(mockArticle.body)).toBeInTheDocument();
        expect(screen.getByDisplayValue(mockArticle.notes)).toBeInTheDocument();
        expect(screen.getByDisplayValue(mockArticle.links)).toBeInTheDocument();
    });

    it("successfully updates the article and redirects",async () => {
        renderForm();

        await waitFor(() => {
            expect(fetchArticle).toHaveBeenCalledTimes(1);
        });

        const newArticle: Article = {
            id: "1",
            title: "Test Titles",
            body: "Test Body changed",
            notes: "Test Notes changed as well",
            links: "https://www.google.com",
            status: "public"
        };

        fireEvent.change(screen.getByLabelText(/Title:/i), {
            target: {value: newArticle.title}
        });

        fireEvent.change(screen.getByLabelText(/Body:/i), {
            target: {value: newArticle.body}
        });

        fireEvent.change(screen.getByLabelText(/Notes:/i), {
            target: {value: newArticle.notes}
        });

        fireEvent.change(screen.getByLabelText(/Links:/i), {
            target: {value: newArticle.links}
        });

        await act(async () => {
            fireEvent.click(screen.getByText(/Update Article/i));
        });

        await waitFor(() => {
            expect(updateArticle).toHaveBeenCalledTimes(1);
            expect(updateArticle).toHaveBeenCalledWith("1", newArticle);
        });

        expect(screen.getByText(/Article Details/i)).toBeInTheDocument();
    });

    it("shows error on update failure",async () => {
        (updateArticle as jest.Mock).mockRejectedValue(new Error("Update failed"));

        const consoleSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(jest.fn());

        renderForm();

        await waitFor(() => {
            fireEvent.click(screen.getByText(/Update Article/i));
        });

        await waitFor(() => {
            expect(updateArticle).toHaveBeenCalledTimes(1);
        });

        expect(consoleSpy).toHaveBeenCalledWith("Failed to update the article: ", new Error("Update failed"));
    });

    it("shows error on fetch failure",async () => {
        (fetchArticle as jest.Mock).mockRejectedValue(new Error("Fetch failed"));

        const consoleSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(jest.fn());

        renderForm();

        await waitFor(() => {
            expect(fetchArticle).toHaveBeenCalledTimes(1);
        });

        expect(consoleSpy).toHaveBeenCalledWith("Failed to fetch the article: ", new Error("Fetch failed"));
    });
});