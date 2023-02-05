import useAuthStore from '@/stores/authStore'

const checkAuth = (to, from, next) => {
    const { authorize } = to.meta;

    const authStore = useAuthStore()
    const currentUser = authStore.getAuthUser()
    console.log(currentUser)

    if (authorize) {
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return next({ path: '/auth/login', query: { returnUrl: to.path } });
        }

        // check if route is restricted by role
        if (authorize.length && !authorize.includes(currentUser.user.role)) {
            // role not authorised so redirect to home page
            return next({ path: '/' });
        }
    }

    next();
}
export default checkAuth;
