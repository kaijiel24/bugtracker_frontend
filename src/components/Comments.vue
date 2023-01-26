<script setup>
import CommentCard from '@/components/CommentCard.vue'
const props = defineProps({
    comments: Array
})

</script>

<template>
    <Timeline :value="props.comments">
        <template #content="slotProps">
            <CommentCard :comment="slotProps.item"/>
        </template>
    </Timeline>
</template>

<style>
.p-timeline-event-opposite {
    display: none;
}
</style>
