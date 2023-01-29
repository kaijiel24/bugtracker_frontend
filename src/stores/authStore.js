import { defineStore } from 'pinia';
import { ref } from 'vue'
import { authAxios } from '../api/authApi';
import TimeService from '@/service/TimeService';

const timeService = new TimeService()

const useAuthStore = defineStore(
    'authStore',
    () => {
        const authUserJWT = ref(null)
        function setAuthUser(user) {
            this.authUserJWT = user;
            console.log("set authuser")
            if (!user) {
                console.log("no user")
                delete authAxios.defaults.headers.common['Authorization'];
            } else {
                console.log(user.token)
                authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
            }
        }

        function getAuthUser() {
            if (!this.authUserJWT) {
                return null
            }
            const expiry = Date.parse(this.authUserJWT.expire)
            if (timeService.moreThanAnHourAgo(expiry)) {
                console.log("jwt expired")
                this.authUserJWT = null
                return null
            }

            return this.authUserJWT
        }

        return { authUserJWT, setAuthUser, getAuthUser }
    },
    { persist: true }
)

export default useAuthStore;
