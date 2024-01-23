import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom";
import { act } from 'react-dom/test-utils';
import { describe } from "node:test";

import NewArticleForm from './NewArticleForm';
import { createArticle } from '../../shared/services/articles.service';

jest.mock("../../shared/services/articles.service", () => ({
    createArticle: jest.fn(() =>{
        return {
            id: 1,
            title: "Test Post",
            body: "This is a test Post"
        }
    }),
}));

describe("NewArticleForm", () => {
    const renderForm = () => {
        render(
            <Router>
                <NewArticleForm/>
            </Router>
        );
    }

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders NewArticleForm and allows typing", () => {
        renderForm();

        const titleInput = screen.getByLabelText(/Title:/i);
        const bodyInput = screen.getByLabelText(/Body:/i);
        const notesInput = screen.getByLabelText(/Notes:/i);
        const linksInput = screen.getByLabelText(/Links:/i);
        const submitButton = screen.getByRole("button", {name: /Create Article/i});

        const expectedTitle = "Test Post";
        const expectedBody = "This is a test Post";
        const expectedNotes = "These are additional remarks";
        const expectedLinks = "http://www.google.com";

        fireEvent.change(titleInput, {target: {value: expectedTitle}});
        fireEvent.change(bodyInput, {target: {value: expectedBody}});
        fireEvent.change(notesInput, {target: {value: expectedNotes}});
        fireEvent.change(linksInput, {target: {value: expectedLinks}});

        expect((titleInput as any).value).toBe(expectedTitle);
        expect((bodyInput as any).value).toBe(expectedBody);
        expect((notesInput as any).value).toBe(expectedNotes);
        expect((linksInput as any).value).toBe(expectedLinks);
        expect(submitButton).toBeInTheDocument();
    });

    test("Submits form and redirects to the article page", async () => {
        renderForm();

        const titleInput = screen.getByLabelText(/Title:/i);
        const bodyInput = screen.getByLabelText(/Body:/i);
        const notesInput = screen.getByLabelText(/Notes:/i);
        const linksInput = screen.getByLabelText(/Links:/i);
        const submitButton = screen.getByRole("button", {name: /Create Article/i});

        const expectedTitle = "Test Post";
        const expectedBody = "This is a test Post";
        const expectedNotes = "These are additional remarks";
        const expectedLinks = "http://www.google.com";

        fireEvent.change(titleInput, {target: {value: expectedTitle}});
        fireEvent.change(bodyInput, {target: {value: expectedBody}});
        fireEvent.change(notesInput, {target: {value: expectedNotes}});
        fireEvent.change(linksInput, {target: {value: expectedLinks}});

        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(createArticle).toHaveBeenCalledTimes(1);
    });

    test("Displays error message when postcreation fails", async () => {
        (createArticle as jest.Mock).mockRejectedValue(new Error("Failed to create post."));

        const consoleSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(jest.fn());

        renderForm();

        const titleInput = screen.getByLabelText(/Title:/i);
        const bodyInput = screen.getByLabelText(/Body:/i);
        const notesInput = screen.getByLabelText(/Notes:/i);
        const linksInput = screen.getByLabelText(/Links:/i);
        const submitButton = screen.getByRole("button", {name: /Create Article/i});

        const expectedTitle = "Test Post";
        const expectedBody = "This is a test Post";
        const expectedNotes = "These are additional remarks";
        const expectedLinks = "http://www.google.com";

        fireEvent.change(titleInput, {target: {value: expectedTitle}});
        fireEvent.change(bodyInput, {target: {value: expectedBody}});
        fireEvent.change(notesInput, {target: {value: expectedNotes}});
        fireEvent.change(linksInput, {target: {value: expectedLinks}});

        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(consoleSpy).toHaveBeenCalledWith("Failed to create post: ", new Error("Failed to create post."));
    });
});