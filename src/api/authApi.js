import axios from 'axios';
import useAuthStore from '@/stores/authStore';

const BASE_URL = 'http://localhost:8080/';

export const authAxios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

authAxios.defaults.headers.common['Content-Type'] = 'application/json';

authAxios.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore()
        const user = authStore.getAuthUser()

        if (user) {
            config.headers.Authorization = 'Bearer ' + user.token;
        }

        return config;
    }
);



export const refreshAccessTokenFn = async () => {
    return authAxios.get('auth/refresh');
};

export const loginFn = async (user) => {
    return authAxios.post('auth/login', user);
};

