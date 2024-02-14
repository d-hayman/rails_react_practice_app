import { INVITES_API_URL } from "../../constants";
import { hasJson } from "../utils/responseHelpers";

async function fetchAllInvites(page:number = 1, perPage:number = 5) {

    const token = localStorage.getItem("token")??'';

    const response = await fetch(`${INVITES_API_URL}?page=${page}&per_page=${perPage}`, {
        headers: {
            "Authorization": token,
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function createInvite(email: string) {
    const token = localStorage.getItem("token")??'';
    
    const response = await fetch(`${INVITES_API_URL}`, {
        method: "POST",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            invite: {
                email: email
        }}),
    });

    if (!response.ok && !hasJson(response)) {
        throw new Error(response.statusText);
    }

    return response;
}

async function deleteInvite(id:string) {
    const token = localStorage.getItem("token")??'';
    
    const response = await fetch(`${INVITES_API_URL}/${id}`, {
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

export {fetchAllInvites, createInvite, deleteInvite};