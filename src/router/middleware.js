import useAuthStore from '@/stores/authStore'

const checkAuth = (to, from) => {
    const authStore = useAuthStore()
    console.log(authStore.getAuthUser())
    if ( !authStore.getAuthUser() && to.name !== 'login') {
        return { name: 'login' }
    }
}
export default checkAuth;
