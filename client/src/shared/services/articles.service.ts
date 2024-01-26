import { API_URL } from "../../constants";
import { Article } from "../models/article.model";

async function fetchAllArticles() {
    const response = await fetch(`${API_URL}/articles`);

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

    const response = await fetch(`${API_URL}/articles/${id}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function createArticle(articleData:FormData) {
    const response = await fetch(`${API_URL}/articles`, {
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
    
    const response = await fetch(`${API_URL}/articles/${id}`, {
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
    const response = await fetch(`${API_URL}/articles/${id}`, {
        method: "DELETE"
    });

    if(response.status === 204) {
        return null;
    }

    throw new Error(response.statusText);
}

export {fetchAllArticles, fetchArticle, createArticle, updateArticle, deleteArticle};