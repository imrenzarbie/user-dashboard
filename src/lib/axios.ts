import Axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

declare module "axios" {
    export interface AxiosRequestConfig {
        skipAuth?: boolean;
    }
}

const api: AxiosInstance = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE ?? "https://api.example.com",
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("accessToken");
        if (token && !config.skipAuth) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export { api };
