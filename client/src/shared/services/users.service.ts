import { USERS_API_URL } from "../../constants";

async function fetchAllUsers(page:number = 1, perPage:number = 5) {

    const token = localStorage.getItem("token")??'';

    const response = await fetch(`${USERS_API_URL}?page=${page}&per_page=${perPage}`, {
        headers: {
            "Authorization": token,
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function fetchUser(id:string|undefined) {
    if(id === undefined){
        console.error("Tried to get user without ID?");
        return;
    }

    if(id === ''){
        console.error("Tried to get user without ID?");
        return;
    }

    const token = localStorage.getItem("token")??'';

    const response = await fetch(`${USERS_API_URL}/${id}`, {
        headers: {
            "Authorization": token,
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function setUserPermissions(id:string|undefined, permissionIds:string[]) {
    if(id === undefined){
        console.error("Tried to update user without ID?");
        return;
    }
    
    if(id === ''){
        console.error("Tried to update user without ID?");
        return;
    }

    const token = localStorage.getItem("token")??'';
    
    const response = await fetch(`${USERS_API_URL}/${id}/set_permissions`, {
        method: "POST",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({user: {permission_ids: permissionIds}}),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export {fetchAllUsers, fetchUser, setUserPermissions};