<script setup>
import TicketList from '@/components/TicketList.vue'
import TicketsService from '@/service/TicketsService';
import { useToast } from 'primevue/usetoast';
import { ref, onBeforeMount } from 'vue';

const ticketsService = new TicketsService();
const toast = useToast()


const myTickets = ref(null);
const allTickets = ref(null);
const assignedTickets = ref(null);
const myLoading = ref(true)
const allLoading = ref(true)
const assignedLoading = ref(true)

const tabchanged = (event) => {
    if (event.index == 1 && assignedLoading.value) {
        console.log("Load Assigned")
        ticketsService.getAssignedTickets()
            .then((data) => (assignedTickets.value = data))
            .catch((error) => {
                toast.add({
                    severity: 'error',
                    summary: 'Error Encountered',
                    detail: error.message,
                    life: 3000
                });
            })
            .finally(() => (assignedLoading.value = false))
    } else if (event.index == 2 && allLoading.value) {
        console.log("Load All")
        ticketsService.getAllTickets()
            .then((data) => (allTickets.value = data))
            .catch((error) => {
                toast.add({
                    severity: 'error',
                    summary: 'Error Encountered',
                    detail: error.message,
                    life: 3000
                });
            })
            .finally(() => (allLoading.value = false))

    }
}

onBeforeMount(() => {
    ticketsService.getMyTickets()
        .then((data) => { myTickets.value = data; console.log(data) })
        .catch((error) => {
            toast.add({
                severity: 'error',
                summary: 'Error Encountered',
                detail: error.message,
                life: 3000
            });
        })
        .finally(() => (myLoading.value = false))


});

</script>

<template>
    <div class="card">
        <h2>Tickets</h2>
        <TabView @tab-change="tabchanged">
            <TabPanel header="My Tickets">
                <TicketList :loading="myLoading" :rows="10" :tickets="myTickets" />
            </TabPanel>
            <TabPanel header="Assigned Tickets">
                <TicketList :loading="assignedLoading" :rows="10" :tickets="assignedTickets" />
            </TabPanel>
            <TabPanel header="All Tickets">
                <TicketList :loading="allLoading" :rows="10" :tickets="allTickets" />
            </TabPanel>
        </TabView>
    </div>
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
