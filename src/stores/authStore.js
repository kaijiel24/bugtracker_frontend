import { defineStore } from 'pinia';
import { ref } from 'vue'
import TimeService from '@/service/TimeService';

const timeService = new TimeService()

const useAuthStore = defineStore(
    'authStore',
    () => {
        const authUserJWT = ref(null)
        function setAuthUser(user) {
            this.authUserJWT = user;
        }

        function getAuthUser() {
            if (!this.authUserJWT) {
                return null
            }
            const expiry = Date.parse(this.authUserJWT.expire)
            if (timeService.beforeCurrentTime(expiry)) {
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
