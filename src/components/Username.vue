<script setup>
import { ref, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import UsersService from '../service/UsersService';
import RoleBadge from './badge/RoleBadge.vue';
const props = defineProps({
    value: String,
})
const toast = useToast()
const userService = new UsersService()


const firstLetter = computed(() => {
    return props.value[0]
})

const user = ref(null)
const op = ref();
const toggle = (event) => {
    op.value.toggle(event);
    userService.getUser(props.value)
        .then((data) => (user.value = data))
        .catch((error) => {
            toast.add({
                severity: 'error',
                summary: 'Error Encountered',
                detail: error.message,
                life: 3000
            });
        })
};
</script>



<template>
    <p :data-letters="firstLetter" :data-large="false" :data-space="true" @click="toggle"
        class="font-medium text-900 transition-colors transition-duration-300 hover:text-blue-500 hover:underline cursor-pointer mb-2">

        {{ props.value }}
    </p>
    <OverlayPanel ref="op">
        <div class="align-items-center justify-content-center">
            <p :data-letters="firstLetter" :data-large="true" class="text-center"></p>
            <p class="font-medium text-900 text-center mb-2">
                {{ user.name }}</p>
            <p class="block font-medium text-900 text-center transition-duration-300 mb-2 ">
                {{ user.email }}</p>

            <p class="text-center">
                <RoleBadge :value="user.role" />
            </p>
        </div>
    </OverlayPanel>
</template>
