<script setup>
import UserList from '@/components/UserList.vue'
import UsersService from '@/service/UsersService';
import { ref, onBeforeMount } from 'vue';

const users = ref(null);
const usersService = new UsersService();

onBeforeMount(() => {
    usersService.getUsers().then((data) => (users.value = data));
    console.log(users)
});

</script>

<template>
    <UserList :rows="10" :users="users"/>
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
