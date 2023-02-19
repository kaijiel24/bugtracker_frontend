<script setup>
import UserList from '@/components/UserList.vue'
import UsersService from '@/service/UsersService';
import { ref, onBeforeMount } from 'vue';
import { useToast } from "primevue/usetoast";

const users = ref(null);
const loading = ref(true)
const usersService = new UsersService();
const toast = useToast()

onBeforeMount(() => {
    usersService.getUsers()
        .then((data) => {
            users.value = data
            console.log(users.value)
        })
        .catch((error) => {
            toast.add({ 
                severity: 'error',
                summary: 'Error Encountered',
                detail: error.message,
                life: 3000 
            });
        })
        .finally(() => {
            loading.value = false
        })
});

</script>

<template>
    <UserList :loading="loading" :rows="10" :users="users" />
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';

::v-deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}
</style>
