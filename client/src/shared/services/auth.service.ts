import { AUTH_API_URL } from "../../constants";

const presharedKey = "#$^TGB*yrghf(%$t%R";

function HexOr(string: string) {
    let res = "";
    for(let i = 0; i < string.length; i++){
        res += (string.charCodeAt(i) ^ presharedKey.charCodeAt(i%presharedKey.length)).toString(16);
    }

    return res;
}

function UnHexOr(string: string) {
    let res = "";
    for(let i = 0; i < string.length / 2; i++){
        res += String.fromCharCode(parseInt(string.substring(i*2,i*2+2), 16) ^ presharedKey.charCodeAt(i%presharedKey.length));
    }

    return res;
}

async function login(username: string, password: string) {
    const response = await fetch(`${AUTH_API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username: HexOr(username), password: HexOr(password)}),
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