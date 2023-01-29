import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

export const authAxios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

authAxios.defaults.headers.common['Content-Type'] = 'application/json';

authAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        console.log("axios error")
        const originalRequest = error.config;
        const errMessage = error.response.data.message;
        if (errMessage.includes('not logged in') && !originalRequest._retry) {
            originalRequest._retry = true;
            await refreshAccessTokenFn();
            return authAxios(originalRequest);
        }
        return Promise.reject(error);
    }
);


export const refreshAccessTokenFn = async () => {
    const response = await authAxios.get('auth/refresh');
    return response.data;
};

export const loginFn = (user) => {
    return authAxios.post('auth/login', user);
};

