<script setup>
import { ref } from 'vue';
import useAuthStore from '@/stores/authStore';
import TimeService from '@/service/TimeService'
import UserOverlay from './UserOverlay.vue';
const props = defineProps({
    comment: Object
});
const emit = defineEmits(['delete'])

const authStore = useAuthStore();
const user = authStore.getAuthUser();
const timeService = new TimeService();
const overlay = ref();

const isCommenter = () => {
    return user.user.username == props.comment.commenter
}
const isAdmin = () => {
    return user.user.role == "admin"
}

const toggle = (event) => {
    overlay.value.toggle(event)
}
const displayConfirmation = ref(false);
const openConfirmation = () => {
    displayConfirmation.value = true;
};

const closeConfirmation = () => {
    displayConfirmation.value = false;
};

const confirmDelete = () => {
    emit('delete', props.comment.id)
    closeConfirmation()
};

</script>

<template>
    <div class="grid grid-nogutter surface-card pt-3 pl-3 p-4 shadow-2 border-round mb-5  ">
        <div class="col-11 justify-content-start">
            <div
                class="font-semibold text-xl text-900 transition-colors transition-duration-300 hover:text-blue-500 hover:underline cursor-pointer" @click="toggle">
                {{
                    props.comment.commenter
                }}</div>
            <UserOverlay ref="overlay" :value="props.comment.commenter"/>

            <div class="text-500 mb-2">{{ timeService.getRelativeTime(props.comment.createdAt) }}
            </div>
            <div class="text-700 w-full flex-order-1">{{ props.comment.text }}</div>
        </div>
        <div v-if="isCommenter() || isAdmin()" class="col-1 justify-content-end">
            <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{ width: '350px' }" :modal="true">
                <div class="flex align-items-center justify-content-center">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span>Are you sure you want to delete the comment?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" />
                    <Button label="Yes" icon="pi pi-check"  @click="confirmDelete" class="p-button-danger" autofocus />
                </template>
            </Dialog>
            <Button v-if="isCommenter()" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text"  @click="openConfirmation"/>
            <Button v-else-if="isAdmin()" icon="pi pi-times" class="p-button-rounded p-button-secondary p-button-text"  @click="openConfirmation"/>
        </div>
    </div>
</template>

<style>
.p-timeline-event-opposite {
    display: box;
}
</style>
