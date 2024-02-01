export const ARTICLES_API_URL = 
    process.env.NODE_ENV === "test" 
        ? "http://mocked-api-url" 
        : import.meta.env.VITE_ARTICLES_API_URL;

export const SEARCH_API_URL = 
    process.env.NODE_ENV === "test" 
        ? "http://mocked-api-url" 
        : import.meta.env.VITE_SEARCH_API_URL;

export const AUTH_API_URL = 
    process.env.NODE_ENV === "test" 
        ? "http://mocked-api-url" 
        : import.meta.env.VITE_AUTH_API_URL;