const PROD_BACKEND_URL = "https://backend-2zjk.onrender.com";
const DEV_BACKEND_URL = "http://localhost:3000";

export const BACKEND_URL =
    process.env.NODE_ENV === "production" ? PROD_BACKEND_URL : DEV_BACKEND_URL;
