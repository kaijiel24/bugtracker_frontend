<script setup>
import TicketList from '@/components/TicketList.vue'
import TicketsService from '@/service/TicketsService';
import { useToast } from 'primevue/usetoast';
import { ref, onBeforeMount } from 'vue';

const tickets = ref(null);
const ticketsService = new TicketsService();
const loading = ref(true)
const toast = useToast()

onBeforeMount(() => {
    ticketsService.getMyTickets()
        .then((data) => (tickets.value = data))
        .catch((error) => (toast.add({ severity: 'error', summary: 'Error Encountered', detail: error.message, life: 3000 })))
        .finally(() => (loading.value = false))
    console.log(tickets)
});

</script>

<template>
    <TicketList :loading="loading" :rows="10" :tickets="tickets" :project="true" />
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
