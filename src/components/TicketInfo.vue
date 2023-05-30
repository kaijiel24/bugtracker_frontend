<script setup>
import { ref } from 'vue';
import InfoRow from './InfoRow.vue'
import TicketPriorityBadge from './badge/TicketPriorityBadge.vue';
import TicketTypeBadge from './badge/TicketTypeBadge.vue';
import UserListOverlay from './UserListOverlay.vue';
const props = defineProps({
    ticket: Object,
})

const ticket = ref(props.ticket)

</script>

<template>
    <div class="flex flex-wrap justify-content-left gap-4">

        <InfoRow title="Project" :value="ticket.project" buttonText="Edit" />
        <InfoRow title="Priority" :value="ticket.priority" buttonText="Edit" :badgeType="TicketPriorityBadge" />
        <InfoRow title="Type" :value="ticket.type" buttonText="Edit" :badgeType="TicketTypeBadge" />
        <UserListOverlay :users="props.ticket.assignees" >Assignees</UserListOverlay>
    </div>
</template>
