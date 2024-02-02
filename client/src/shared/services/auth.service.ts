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

    localStorage.setItem("token", (await response.json()).token)

    return true;
}

export { login };