import { ARTICLES_API_URL, SEARCH_API_URL } from "../../constants";
import { hasJson } from "../utils/responseHelpers";

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
    const token = localStorage.getItem("token")??'';
    const response = await fetch(`${ARTICLES_API_URL}`, {
        method: "POST",
        headers: {
            "Authorization": token
        },
        body: articleData,
    });

    if (!response.ok && !hasJson(response)) {
        throw new Error(response.statusText);
    }

    return response;
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

    const token = localStorage.getItem("token")??'';
    
    const response = await fetch(`${ARTICLES_API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": token
        },
        body: articleData,
    });

    if (!response.ok && !hasJson(response)) {
        throw new Error(response.statusText);
    }

    return response;
}

async function deleteArticle(id:string) {

    const token = localStorage.getItem("token")??'';
    
    const response = await fetch(`${ARTICLES_API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": token,
        },
    });

    if(response.status === 204) {
        return null;
    }

    throw new Error(response.statusText);
}

export {fetchAllArticles, fetchArticle, searchArticles, createArticle, updateArticle, deleteArticle};