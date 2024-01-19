import { API_URL } from "../../constants";

async function fetchAllArticles() {
    const response = await fetch(`${API_URL}`);

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

    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function deleteArticle(id:string) {
    const response = await fetch(`${API_URL}/${id}`, {
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

export {fetchAllArticles, fetchArticle, deleteArticle};