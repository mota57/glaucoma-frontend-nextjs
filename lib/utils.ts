import axios from "axios";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { API_URL } from "./settings";
import { AppStorage } from "./app.storage";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const apiSecure = axios.create({
  baseURL: API_URL
});

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

apiSecure.interceptors.request.use(
  (config) => {
    // Retrieve the bearer token from your preferred storage (e.g., localStorage, sessionStorage, state management library)
    const bearerToken = AppStorage.getBearerToken();

    if (bearerToken) {
      config.headers.Authorization = `Bearer ${bearerToken}`;
    } else {
        //for now reload
        window.location.href = '/login'
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function isUserLoggedOrRedirect() {
  const bearerToken = AppStorage.getBearerToken();
  if(!bearerToken) {
      window.location.href = '/login'
  }

}