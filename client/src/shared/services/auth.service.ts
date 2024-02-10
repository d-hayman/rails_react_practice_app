import { AUTH_API_URL } from "../../constants";

async function login(username: string, password: string) {
    const response = await fetch(`${AUTH_API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username: username, password: password}),
    });

    if (!response.ok) {
        return false;
    }

    const res = await response.json();
    localStorage.setItem("token", res.token)
    localStorage.setItem("permissions", res.permissions)
    localStorage.setItem("loggedInAs", username);

    return true;
}
async function logout() {
    const token = localStorage.getItem("token")??'';
    const response = await fetch(`${AUTH_API_URL}`, {
        method: "DELETE",
        headers: {
            "Authorization": token
        }
    });

    if (!response.ok) {
        return false;
    }

    localStorage.clear();

    return true;
}

export { login, logout };