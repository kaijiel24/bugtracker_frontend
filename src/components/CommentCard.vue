<script setup>
import TimeService from '@/service/TimeService'
const props = defineProps({
    comment: Object
});

const timeService = new TimeService();
</script>

<template>
    <div class="surface-card pt-3 pl-3 p-4 shadow-2 border-round mb-5">
        <div class="font-medium text-xl text-900">{{ props.comment.commentor.name }}</div>
        <div class="text-500 mb-2">{{ timeService.getRelativeTime(props.comment.dateCreated) }}</div>
        <div class="text-700 w-full flex-order-1">{{ props.comment.text }}</div>
    </div>
</template>

<style>
.p-timeline-event-opposite {
    display: box;
}
</style>
