<script setup>
import TicketList from '@/components/TicketList.vue'
import TicketsService from '@/service/TicketsService';
import { ref, onBeforeMount } from 'vue';

const tickets = ref(null);
const ticketsService = new TicketsService();

onBeforeMount(() => {
    ticketsService.getTickets().then((data) => (tickets.value = data));
    console.log(tickets)
});

</script>

<template>
    <TicketList :rows="10" :tickets="tickets" :project="true"/>
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
