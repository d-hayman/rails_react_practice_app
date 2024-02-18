import { COMMENTS_API_URL } from "../../constants";
import { hasJson } from "../utils/responseHelpers";

async function fetchAllComments(articleId:string, page:number = 1) {
    const response = await fetch(`${COMMENTS_API_URL}?page=${page}`.replace(':articleId', articleId));

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function createComment(articleId:string, body:string) {
    const token = localStorage.getItem("token")??'';
    const response = await fetch(`${COMMENTS_API_URL}`.replace(':articleId', articleId), {
        method: "POST",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            comment: {
                body: body,
                status: "public"
        }}),
    });

    if (!response.ok && !hasJson(response)) {
        throw new Error(response.statusText);
    }

    return response;
}

async function deleteComment(articleId:string, id:string) {

    const token = localStorage.getItem("token")??'';
    
    const response = await fetch(`${COMMENTS_API_URL}/${id}`.replace(':articleId', articleId), {
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

export {fetchAllComments, createComment, deleteComment};