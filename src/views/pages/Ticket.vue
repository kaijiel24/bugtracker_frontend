<script setup>
import Comments from '../../components/Comments.vue';
import TicketInfo from '../../components/TicketInfo.vue';
import TicketsService from '../../service/TicketsService';
import { ref, onBeforeMount } from 'vue';
import TimeService from '../../service/TimeService';
import TicketStatusBadge from '../../components/badge/TicketStatusBadge.vue';

const props = defineProps({
    id: Number
});

const ticket = ref(null);
const ticketsService = new TicketsService();
const timeService = new TimeService();

onBeforeMount(() => {
    ticketsService.getTicket(props.id).then((data) => (ticket.value = data));
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
            <div class="text-500 mb-2"> raised by {{ ticket.submitter.name }} {{
                timeService.getRelativeTime(ticket.dateCreated)
            }}</div>
        </div>

        <div class="col-12 md:col-3">
            <TicketInfo :ticket="ticket" />
        </div>
        <div class="col-12 md:col-9">
            <Comments :comments="ticket.comments" />
        </div>
    </div>
</template>
