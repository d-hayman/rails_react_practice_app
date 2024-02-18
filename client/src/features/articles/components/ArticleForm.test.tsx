import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import ArticleForm from "./ArticleForm";
import { Article } from "../../../shared/models/article.model";

describe("ArticleForm component", () => {
    it("renders default inputs when no post prop is passed", () =>{
        const mockSubmit = jest.fn();
        const headerText = "Hi";
        const buttonText = "Bye";
        const {getByLabelText} = render(
            <ArticleForm 
                onSubmit={mockSubmit} 
                headerText={headerText} 
                buttonText={buttonText} 
            />
        );

        expect(getByLabelText(/Title:/i)).toBeInTheDocument();
        expect(getByLabelText(/Body:/i)).toBeInTheDocument();
        expect(getByLabelText(/Notes:/i)).toBeInTheDocument();
        expect(getByLabelText(/Links:/i)).toBeInTheDocument();
    });
    
    it("renders default inputs when a post prop is passed", () =>{
        const mockArticle: Article = {
            id: "1",
            title: "Test Title",
            body: "Test Body",
            notes: "Test Notes",
            links: "http://www.google.com",
            status: "public"
        };
        const mockSubmit = jest.fn();
        const headerText = "Hi";
        const buttonText = "Bye";
        const {getByLabelText} = render(
            <ArticleForm 
                article={mockArticle}
                onSubmit={mockSubmit} 
                headerText={headerText} 
                buttonText={buttonText} 
            />
        );

        expect(getByLabelText(/Title:/i)).toBeInTheDocument();
        expect(getByLabelText(/Body:/i)).toBeInTheDocument();
        expect(getByLabelText(/Notes:/i)).toBeInTheDocument();
        expect(getByLabelText(/Links:/i)).toBeInTheDocument();
        
        expect((getByLabelText(/Title:/i) as HTMLInputElement).value).toBe(mockArticle.title);
        expect((getByLabelText(/Body:/i) as HTMLInputElement).value).toBe(mockArticle.body);
        expect((getByLabelText(/Notes:/i) as HTMLInputElement).value).toBe(mockArticle.notes);
        expect((getByLabelText(/Links:/i) as HTMLInputElement).value).toBe(mockArticle.links);
    });

    it("updates the input values on change", () =>{
        const mockArticle: Article = {
            id: "1",
            title: "Test Title",
            body: "Test Body",
            notes: "Test Notes",
            links: "http://www.google.com",
            status: "public"
        };
        const mockSubmit = jest.fn();
        const headerText = "Hi";
        const buttonText = "Bye";
        const {getByLabelText} = render(
            <ArticleForm 
                onSubmit={mockSubmit} 
                headerText={headerText} 
                buttonText={buttonText} 
            />
        );

        const titleInput = getByLabelText(/Title:/i) as HTMLInputElement;
        fireEvent.change(titleInput, {target: {value: mockArticle.title}});
        const bodyInput = getByLabelText(/Body:/i) as HTMLInputElement;
        fireEvent.change(bodyInput, {target: {value: mockArticle.body}});
        const notesInput = getByLabelText(/Notes:/i) as HTMLInputElement;
        fireEvent.change(notesInput, {target: {value: mockArticle.notes}});
        const linksInput = getByLabelText(/Links:/i) as HTMLInputElement;
        fireEvent.change(linksInput, {target: {value: mockArticle.links}});

        expect(titleInput.value).toBe(mockArticle.title);
        expect(bodyInput.value).toBe(mockArticle.body);
        expect(notesInput.value).toBe(mockArticle.notes);
        expect(linksInput.value).toBe(mockArticle.links);
    });

    it("calls onSubmit when the form data is submitted", async () =>{
        const mockArticle: Article = {
            //id: "1",
            title: "Test Title",
            body: "Test Body",
            notes: "Test Notes",
            links: "http://www.google.com",
            status: "public",
            image: null
        };
        const mockSubmit = jest.fn();
        const headerText = "Hi";
        const buttonText = "Bye";
        const {getByLabelText, getByRole} = render(
            <ArticleForm 
                onSubmit={mockSubmit} 
                headerText={headerText} 
                buttonText={buttonText} 
            />
        );

        const titleInput = getByLabelText(/Title:/i) as HTMLInputElement;
        fireEvent.change(titleInput, {target: {value: mockArticle.title}});
        const bodyInput = getByLabelText(/Body:/i) as HTMLInputElement;
        fireEvent.change(bodyInput, {target: {value: mockArticle.body}});
        const notesInput = getByLabelText(/Notes:/i) as HTMLInputElement;
        fireEvent.change(notesInput, {target: {value: mockArticle.notes}});
        const linksInput = getByLabelText(/Links:/i) as HTMLInputElement;
        fireEvent.change(linksInput, {target: {value: mockArticle.links}});

        await act(async () => {
            fireEvent.click(getByRole("button", {name: new RegExp(buttonText, "i")}));
        });

        expect(mockSubmit).toHaveBeenCalledTimes(1);
        expect(mockSubmit).toHaveBeenCalledWith(mockArticle);
    });

    it("calls nothing when the form data is submitted with a bad callback", async () =>{
        const mockArticle: Article = {
            //id: "1",
            title: "Test Title",
            body: "Test Body",
            notes: "Test Notes",
            links: "http://www.google.com",
            status: "public"
        };
        const mockSubmit = jest.fn();
        const headerText = "Hi";
        const buttonText = "Bye";
        const {getByLabelText, getByRole} = render(
            <ArticleForm 
                onSubmit={undefined} 
                headerText={headerText} 
                buttonText={buttonText} 
            />
        );

        const titleInput = getByLabelText(/Title:/i) as HTMLInputElement;
        fireEvent.change(titleInput, {target: {value: mockArticle.title}});
        const bodyInput = getByLabelText(/Body:/i) as HTMLInputElement;
        fireEvent.change(bodyInput, {target: {value: mockArticle.body}});
        const notesInput = getByLabelText(/Notes:/i) as HTMLInputElement;
        fireEvent.change(notesInput, {target: {value: mockArticle.notes}});
        const linksInput = getByLabelText(/Links:/i) as HTMLInputElement;
        fireEvent.change(linksInput, {target: {value: mockArticle.links}});

        await act(async () => {
            fireEvent.click(getByRole("button", {name: new RegExp(buttonText, "i")}));
        });

        expect(mockSubmit).not.toHaveBeenCalled();
    });

    it("handles image file upload", () => {
        const mockSubmit = jest.fn();
        const headerText = "Hi";
        const buttonText = "Bye";

        const consoleSpy = jest.spyOn(console, "log");
        consoleSpy.mockImplementation(() => {});

        const {getByLabelText} = render(
            <ArticleForm 
                onSubmit={undefined} 
                headerText={headerText} 
                buttonText={buttonText} 
            />
        );

        const file = new File(["sample"], "sample.png", { type: "image/png" });
        const imageInput = getByLabelText(/image/i) as HTMLInputElement;

        fireEvent.change(imageInput, { target: { files: [file]}});

        expect(consoleSpy).toHaveBeenCalledWith(file);
    });

});