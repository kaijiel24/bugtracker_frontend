<script setup>
import { authAxios } from '@/api/authApi';
import { useRouter } from 'vue-router';

const router = useRouter();

authAxios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.log(error.config)
        if (error.response) {
            if (error.response.status == 401) {
                router.push({ name: "login" })
            } else if (error.response.status == 403) {
                router.push({ name: "dashboard" });
            }
            return Promise.reject(
                new Error(`Error ${error.response.status} querying ${error.config.baseurl}${error.config.url}: ${error.response.data}`)
            );
        } else {
            router.push({ name: "dashboard" });
            return Promise.reject(new Error(`Error: ${error.message}`))
        }
    }
);
</script>

<template>
    <router-view />
    <Toast />
</template>

<style scoped>

</style>


