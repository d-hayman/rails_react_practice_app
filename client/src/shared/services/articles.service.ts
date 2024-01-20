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
        console.log("Tried to get article without ID?");
        return;
    }

    if(id === ''){
        console.log("Tried to get article without ID?");
        return;
    }

    const response = await fetch(`${API_URL}/articles/${id}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function createArticle(articleData:Article) {
    const response = await fetch(`${API_URL}/articles`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({article:articleData}),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function updateArticle(id:string|undefined, articleData:Article|null) {
    if(id === undefined){
        console.log("Tried to get article without ID?");
        return;
    }
    
    if(id === ''){
        console.log("Tried to update article without ID?");
        return;
    }

    if(articleData === null){
        console.log("Tried to update article with null data?");
        return;
    }

    delete(articleData.id);
    
    const response = await fetch(`${API_URL}/articles/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({article:articleData}),
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

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    if(response.status === 204) {
        return null;
    }

    return response.json();
}

export {fetchAllArticles, fetchArticle, createArticle, updateArticle, deleteArticle};