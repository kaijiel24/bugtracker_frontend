<script setup>
import CommentCard from '@/components/CommentCard.vue'
import { ref, onBeforeMount } from 'vue'
import useAuthStore from '@/stores/authStore'
import { useToast } from 'primevue/usetoast';
import TicketsService from '../service/TicketsService';

const props = defineProps({
    comments: Array
})

const array = ref([true])
const comment = ref('')

const toast = useToast()
const authStore = useAuthStore()
const ticketsService = new TicketsService();

const user = ref('')

const commentClick = () => {
    ticketsService.addComment({
        ticketid: props.id,
        text: comment.value
    })
        .then((data) => {
            props.comments.push(data)
            comment.value = ''

            toast.add({
                severity: 'success',
                summary: 'Successful',
                detail: `Comment added`,
                life: 5000
            });
        })
        .catch((error) => {
            toast.add({
                severity: 'error',
                summary: 'Error Encountered',
                detail: error.message,
                life: 5000
            });
        })
}

onBeforeMount(() => {
    const authUser = authStore.getAuthUser()
    user.value = authUser.user.username
})

</script>

<template>
    <Timeline :value="props.comments">
        <template #content="slotProps">
            <CommentCard :comment="slotProps.item" />
        </template>
        <template #marker="slotProps">
            <p :data-letters="slotProps.item.commenter[0]" :data-large="true"></p>
        </template>
    </Timeline>
    <Divider />
    <Timeline :value="array">
        <template #marker="slotProps">
            <p :data-letters="user[0]" :data-large="true"></p>
        </template>
        <template #content="slotProps">
            <div class="surface-card pt-3 pl-3 p-4 shadow-2 border-round mb-5">
                <div class="font-medium text-xl text-900 mb-2 font-semibold">{{ user }}</div>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12">
                        <Textarea v-model="comment" :autoResize="true" id="comment" rows="4" />
                    </div>
                </div>
                <Button label="Comment" @click="commentClick"></Button>
            </div>
        </template>
    </Timeline>
</template>

<style>
.p-timeline-event-opposite {
    display: none;
}
</style>
