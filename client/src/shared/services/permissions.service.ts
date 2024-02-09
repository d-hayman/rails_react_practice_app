import { PERMISSIONS_API_URL } from "../../constants";

/**
 * 
 * @returns 
 */
async function fetchAllPermissions() {
    const response = await fetch(`${PERMISSIONS_API_URL}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

/**
 * 
 * @param id 
 * @returns 
 */
async function fetchPermission(id:string|undefined) {
    if(id === undefined){
        console.error("Tried to get permission without ID?");
        return;
    }

    if(id === ''){
        console.error("Tried to get permission without ID?");
        return;
    }

    const response = await fetch(`${PERMISSIONS_API_URL}/${id}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export {fetchAllPermissions, fetchPermission};