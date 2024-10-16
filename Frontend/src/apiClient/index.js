import axios from "axios";

// Create an Axios instance with default settings
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            return Promise.reject({...error, "ClientSideStatus" : "Unauthorized"})
        }
        return Promise.reject(error);
    }
);

export default apiClient;
