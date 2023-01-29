<script setup>
import CommentCard from '@/components/CommentCard.vue'
import { ref, onBeforeMount } from 'vue'
import useAuthStore from '@/stores/authStore'

const props = defineProps({
    comments: Array
})

const array = ref([true])
const comment = ref('')

const authStore = useAuthStore()

const user = ref('')

const commentClick = () => {
    console.log({ comment: comment.value })
}


onBeforeMount(() => {
    const authUser = authStore.getAuthUser()
    console.log(authUser['user']['Name'])
    user.value = authUser.user.Name
    console.log(user.value)
})

</script>

<template>
    <Timeline :value="props.comments">
        <template #content="slotProps">
            <CommentCard :comment="slotProps.item" />
        </template>
    </Timeline>
    <div class="border-top-1 surround-face-border py-2"></div>
    <Timeline :value="array">
        <template #content="slotProps">
            <div class="surface-card pt-3 pl-3 p-4 shadow-2 border-round mb-5">
                <div class="font-medium text-xl text-900 mb-2">{{ user }}</div>
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
