import { ARTICLES_API_URL, SEARCH_API_URL } from "../../constants";
import { Article } from "../models/article.model";

async function fetchAllArticles(page:number = 1) {
    const response = await fetch(`${ARTICLES_API_URL}?page=${page}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function fetchArticle(id:string|undefined) {
    if(id === undefined){
        console.error("Tried to get article without ID?");
        return;
    }

    if(id === ''){
        console.error("Tried to get article without ID?");
        return;
    }

    const response = await fetch(`${ARTICLES_API_URL}/${id}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function searchArticles(query: string, page:number = 1) {
    const response = await fetch(`${SEARCH_API_URL}/articles/?q=${encodeURI(query)}&page=${page}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function createArticle(articleData:FormData) {
    const response = await fetch(`${ARTICLES_API_URL}`, {
        method: "POST",
        headers: {
            
        },
        body: articleData,
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function updateArticle(id:string|undefined, articleData:FormData) {
    if(id === undefined){
        console.error("Tried to update article without ID?");
        return;
    }
    
    if(id === ''){
        console.error("Tried to update article without ID?");
        return;
    }

    if(articleData === null || articleData == undefined){
        console.error("Tried to update article with null or undefined data?");
        return;
    }
    
    const response = await fetch(`${ARTICLES_API_URL}/${id}`, {
        method: "PUT",
        headers: {
            
        },
        body: articleData,
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function deleteArticle(id:string) {
    const response = await fetch(`${ARTICLES_API_URL}/${id}`, {
        method: "DELETE"
    });

    if(response.status === 204) {
        return null;
    }

    throw new Error(response.statusText);
}

export {fetchAllArticles, fetchArticle, searchArticles, createArticle, updateArticle, deleteArticle};