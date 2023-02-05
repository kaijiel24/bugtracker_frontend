<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'Admin',
        items: [
            { label: 'Manage Users', icon: 'pi pi-fw pi-users', to: '/pages/manageusers' },
        ]
    },
    {
        label: 'Projects',
        items: [
            { label: 'Projects', icon: 'pi pi-fw pi-sitemap', to: '/pages/projects' },
            { label: 'Create Project', icon: 'pi pi-fw pi-plus', to: '/pages/createproject' },
        ]
    },
    {
        label: 'Tickets',
        items: [
            { label: 'Tickets', icon: 'pi pi-fw pi-ticket', to: '/pages/tickets' },
            { label: 'Create Ticket', icon: 'pi pi-fw pi-plus', to: '/pages/createticket' },
        ]
    },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped>

</style>
