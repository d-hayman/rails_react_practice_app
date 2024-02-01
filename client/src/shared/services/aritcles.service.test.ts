import {
    fetchAllArticles, 
    fetchArticle, 
    createArticle, 
    updateArticle, 
    deleteArticle
} from "./articles.service";
import { ARTICLES_API_URL } from "../../constants";
import fetchMock from 'jest-fetch-mock';
import { objectToFormData } from "../utils/formDataHelper";

fetchMock.enableMocks();

jest.mock("../../constants", () => ({
    ARTICLES_API_URL: "http://your-test-url"
}));

describe("Article API Service", () => {
    beforeEach(() =>{
        fetchMock.resetMocks();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    //index
    it("fetches all articles", async () => {
        const mockData = [{
            id: "1",
            title: "Test Title",
            body: "Test Body",
            notes: "Test Notes",
            links: "http://www.google.com",
            status: "public"
        }];
        (fetch as any).mockResponseOnce(JSON.stringify(mockData));

        const result = await fetchAllArticles();

        expect(result).toEqual(mockData);
    });
    //show
    it("fetches a single article", async () => {
        const mockData = {
            id: "1",
            title: "Test Title",
            body: "Test Body",
            notes: "Test Notes",
            links: "http://www.google.com",
            status: "public"
        };
        (fetch as any).mockResponseOnce(JSON.stringify(mockData));

        const result = await fetchArticle("1");

        expect(result).toEqual(mockData);
    });
    //new
    //create
    it("creates a new article", async () => {
        const mockData = {
            title: "Test Title",
            body: "Test Body",
            notes: "Test Notes",
            links: "http://www.google.com",
            status: "public"
        };
        (fetch as any).mockResponseOnce(JSON.stringify(mockData));

        const result = await createArticle(objectToFormData({article: mockData}));

        expect(result).toEqual(mockData);
    });
    //edit
    //update
    it("updates the article", async () => {
        const mockData = {
            title: "Test Title",
            body: "Test Body",
            notes: "Test Notes",
            links: "http://www.google.com",
            status: "public"
        };
        (fetch as any).mockResponseOnce(JSON.stringify(mockData));

        const result = await updateArticle("1", objectToFormData({article: mockData}));

        expect(result).toEqual(mockData);
    });

    //delete
    it("deletes the article", async () => {
        const mockID = "1";
        (fetch as any).mockResponseOnce(null, {status: 204});

        const result = await deleteArticle("1");

        expect(result).toEqual(null);
    });

    //error zone
    it("throws an error when the response is not ok for fetchAllArticles",async () => {
        (fetch as any).mockResponseOnce(JSON.stringify({}), {status: 500});

        await expect(fetchAllArticles()).rejects.toThrow();
    });

    it("throws an error when the response is not ok for fetchArticle",async () => {
        const mockID = "1";
        (fetch as any).mockResponseOnce(JSON.stringify({}), {status: 500});

        await expect(fetchArticle(mockID)).rejects.toThrow();
    });

    it("throws an error when the response is not ok for createArticle",async () => {
        const mockData = {
            title: "Test Title",
            body: "Test Body",
            notes: "Test Notes",
            links: "http://www.google.com",
            status: "public"
        };
        (fetch as any).mockResponseOnce(JSON.stringify({}), {status: 500});

        await expect(createArticle(objectToFormData({article: mockData}))).rejects.toThrow();
    });

    it("throws an error when the response is not ok for updateArticle",async () => {
        const mockID = "1";
        const mockData = {
            title: "Test Title",
            body: "Test Body",
            notes: "Test Notes",
            links: "http://www.google.com",
            status: "public"
        };
        (fetch as any).mockResponseOnce(JSON.stringify({}), {status: 500});

        await expect(updateArticle(mockID, objectToFormData({article: mockData}))).rejects.toThrow();
    });

    it("throws an error when the response is not ok for deleteArticle",async () => {
        const mockID = "1";
        (fetch as any).mockResponseOnce(JSON.stringify({}), {status: 500});

        await expect(deleteArticle(mockID)).rejects.toThrow();
    });

    //bad input zone
    it("logs an error for fetchArticle when an undefined id is entered", async () => {
        const consoleSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(jest.fn());
        const result = await fetchArticle(undefined);

        expect(result).toEqual(undefined);
        expect(consoleSpy).toHaveBeenCalledWith("Tried to get article without ID?");
    });
    it("logs an error for fetchArticle when an empty id is entered", async () => {
        const consoleSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(jest.fn());
        const result = await fetchArticle('');

        expect(result).toEqual(undefined);
        expect(consoleSpy).toHaveBeenCalledWith("Tried to get article without ID?");
    });
    
    it("logs an error for updateArticle when an undefined id is entered", async () => {
        const consoleSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(jest.fn());
        const result = await updateArticle(undefined, objectToFormData({article: {
            title: "Test Title",
            body: "Test Body",
            notes: "Test Notes",
            links: "http://www.google.com",
            status: "public"
        }}));

        expect(result).toEqual(undefined);
        expect(consoleSpy).toHaveBeenCalledWith("Tried to update article without ID?");
    });
    it("logs an error for updateArticle when an empty id is entered", async () => {
        const consoleSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(jest.fn());
        const result = await updateArticle('', objectToFormData({article: {
            title: "Test Title",
            body: "Test Body",
            notes: "Test Notes",
            links: "http://www.google.com",
            status: "public"
        }}));

        expect(result).toEqual(undefined);
        expect(consoleSpy).toHaveBeenCalledWith("Tried to update article without ID?");
    });
    it("logs an error for updateArticle when a null article is entered", async () => {
        const consoleSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(jest.fn());
        const result = await updateArticle('1', null);

        expect(result).toEqual(undefined);
        expect(consoleSpy).toHaveBeenCalledWith("Tried to update article with null or undefined data?");
    });
});
