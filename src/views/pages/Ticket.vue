<script setup>
import Comments from '../../components/Comments.vue';
import UserOverlay from '../../components/UserOverlay.vue';
import TicketInfo from '../../components/TicketInfo.vue';
import TicketsService from '../../service/TicketsService';
import { ref, onBeforeMount } from 'vue';
import TimeService from '../../service/TimeService';
import TicketStatusBadge from '../../components/badge/TicketStatusBadge.vue';
import { useToast } from 'primevue/usetoast';

const props = defineProps({
    id: Number
});

const ticket = ref(null);
const ticketsService = new TicketsService();
const timeService = new TimeService();
const toast = useToast()

const overlay = ref();
const toggle = (event) => {
    overlay.value.toggle(event)
}
const displayEditTicket = ref(false);
const openEdit = () => {
    displayCloseTicketConfirmation.value = true;
};

const displayCloseicketConfirmation = ref(false);
const openConfirmation = () => {
    displayCloseTicketConfirmation.value = true;
};

const closeConfirmation = () => {
    displayCloseTicketConfirmation.value = false;
};

const confirmCloseTicket = () => {
    // Close Ticket
    closeConfirmation()
};


onBeforeMount(() => {
    ticketsService.getTicket(props.id)
        .then((data) => {
            console.log(data)
            ticket.value = data
        })
        .catch((error) => {
            toast.add({ severity: 'error', summary: 'Error Encountered', detail: error.message, life: 3000 });

        })
});
</script>

<template >
    <div v-if="ticket" class="card grid flex flex-row-reverse">
        <div class="col-12 md:col-12 grid align-items-top">
            <div class="col-12 md:col-8">
                <div class="font-medium text-3xl text-900 mb-3">
                    <TicketStatusBadge :value="ticket.status" :large="true" :inline="true" />
                    <div class="inline-block w-1rem m-0"></div>
                    {{ ticket.name }}
                </div>
                <div class="text-500 mb-2"> raised by 
                <div
                    class="transition-colors transition-duration-300 hover:text-blue-500 hover:underline cursor-pointer inline" @click="toggle">
                        {{ ticket.submitter }}
                    </div> {{
                    timeService.getRelativeTime(ticket.createdAt)
                }}</div>
                <UserOverlay ref="overlay" :value="ticket.submitter"/>
            </div>
            <div class="col-12 md:col-4 flex gap-2 mb-4  align-items-top justify-content-start md:justify-content-end">
                <Button label="Edit Ticket" class="p-button-primary"  @click="openConfirmation"/>
                <Button label="Close Ticket" class="p-button-danger"  @click="openConfirmation"/>
                <Dialog header="Confirm Close Ticket" v-model:visible="displayConfirmation" :style="{ width: '350px' }" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span>Are you sure you want to close the ticket?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" />
                        <Button label="Yes" icon="pi pi-check"  @click="confirmCloseTicket" class="p-button-danger" autofocus />
                    </template>
                </Dialog>
            </div>
        </div>

        <div class="col-12 md:col-2">
            <TicketInfo :ticket="ticket" />
        </div>
        <div class="col-12 md:col-10">
            <Comments :ticketid="props.id" :comments="ticket.comments" @commentClick="commentClick" />
        </div>
    </div>
</template>
