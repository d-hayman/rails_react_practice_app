import { SETTINGS_API_URL } from "../../constants";
import { hasJson } from "../utils/responseHelpers";

/**
 * 
 * @returns 
 */
async function fetchAllSettings() {

    const token = localStorage.getItem("token")??'';

    const response = await fetch(`${SETTINGS_API_URL}`, {
        headers: {
            "Authorization": token,
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function updateSettings(settings:{name:string,value:string}[]) {
    if(settings === undefined || settings.length == 0){
        console.error("Tried to update settings without data?");
        return;
    }

    const token = localStorage.getItem("token")??'';
    
    const response = await fetch(`${SETTINGS_API_URL}`, {
        method: "PUT",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({settings: settings}),
    });

    if (!response.ok && !hasJson(response)) {
        throw new Error(response.statusText);
    }

    return response;
}

export {fetchAllSettings, updateSettings};