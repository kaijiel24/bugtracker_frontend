<script setup>
import TimeService from '@/service/TimeService'
const props = defineProps({
    comment: Object
});

const timeService = new TimeService();
</script>

<template>
    <div class="grid grid-nogutter surface-card pt-3 pl-3 p-4 shadow-2 border-round mb-5  ">
        <div class="col-11 justify-content-start">
            <div
                class="font-semibold text-xl text-900 transition-colors transition-duration-300 hover:text-blue-500 hover:underline cursor-pointer">
                {{
                    props.comment.commenter
                }}</div>

            <div class="text-500 mb-2">{{ timeService.getRelativeTime(props.comment.createdAt) }}
            </div>
            <div class="text-700 w-full flex-order-1">{{ props.comment.text }}</div>
        </div>
        <div class="col-1 justify-content-end">
            <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text" />
        </div>
    </div>
</template>

<style>
.p-timeline-event-opposite {
    display: box;
}
</style>
