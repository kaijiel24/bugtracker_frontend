<script setup>
import { ref } from 'vue';
import InfoRow from './InfoRow.vue'
import TicketPriorityBadge from './badge/TicketPriorityBadge.vue';
const props = defineProps({
    ticket: Object,
})

const ticket = ref(props.ticket)

</script>

<template>
    <ul class="list-none p-0 m-0">
        <InfoRow title="Assignee" :value="ticket.assignee.name" buttonText="Add" />
        <InfoRow title="Project" :value="ticket.project.name" buttonText="Edit" />
        <InfoRow title="Priority" :value="ticket.priority" buttonText="Edit" :badgeType="TicketPriorityBadge" />
    </ul>
</template>
