export const authHeader = (token) => {
    return {"Authorization": `Token ${token}`}
}

const TOKEN_KEY = "token";

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}