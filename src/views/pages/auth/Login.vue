<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { loginFn } from '@/api/authApi';
import 'mosha-vue-toastify/dist/style.css'
import { useRouter } from 'vue-router';
import useAuthStore from '@/stores/authStore';
import { useToast } from 'primevue/usetoast';

const { layoutConfig, contextPath } = useLayout();
const userid = ref('');
const password = ref('');
const checked = ref(false);

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const logoUrl = computed(() => {
    return `${contextPath}layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const resetPassword = () => {
    password.value = ''
}

const submitClick = () => {
    loginFn({
        userid: userid.value,
        password: password.value,
    }).then(
        (data) => {
            authStore.setAuthUser(data)
            router.push({ name: 'projects' });
        }
    ).catch(
        (error) => {
            console.log(error)
            toast.add({ severity: 'error', summary: 'Error Encountered', detail: error.message, life: 3000 });
        }
    )

    resetPassword();

}

</script>

<template>
    <div
        class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">

                    <div>
                        <label for="userid" class="block text-900 text-xl font-medium mb-2">Email/Username</label>
                        <InputText id="userid" type="text" placeholder="Username/Email" class="w-full md:w-30rem mb-5"
                            style="padding: 1rem" v-model="userid" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true"
                            class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer"
                                style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button label="Sign In" @click="submitClick" class="w-full p-3 text-xl"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
