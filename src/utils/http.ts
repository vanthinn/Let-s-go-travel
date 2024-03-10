import axios from "axios";

const BaseURL = axios.create({
    baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}`,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        'ngrok-skip-browser-warning': 'true',
    },
});

BaseURL.interceptors.request.use(
    async (config) => {
        const auth: any = JSON.parse(String(localStorage.getItem("auth")));

        if (config.url !== 'users/login' && config.url !== 'users' && config.url !== 'tourist') {
            config.headers.Authorization = `${auth?.token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

BaseURL.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (originalConfig.url !== "/auth/login" && err.response) {

        }
        return Promise.reject(err);
    }
);

export default BaseURL;
