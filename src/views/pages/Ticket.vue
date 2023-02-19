<script setup>
import Comments from '../../components/Comments.vue';
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
        <div class="col-12 md:col-12">
            <div class="font-medium text-3xl text-900 mb-3">
                <TicketStatusBadge :value="ticket.status" :large="true" :inline="true" />
                <div class="inline-block w-1rem m-0"></div>
                {{ ticket.name }}
            </div>
            <div class="text-500 mb-2"> raised by {{ ticket.submitter }} {{
                timeService.getRelativeTime(ticket.createdAt)
            }}</div>
        </div>

        <div class="col-12 md:col-3">
            <TicketInfo :ticket="ticket" />
        </div>
        <div class="col-12 md:col-9">
            <Comments :comments="ticket.comments" @commentClick="commentClick" />
        </div>
    </div>
</template>
