<script setup>
import { ref, computed } from 'vue';
import UserOverlay from './UserOverlay.vue';
const props = defineProps({
    value: String,
})

const firstLetter = computed(() => {
    return props.value[0]
})

const overlay = ref();
const toggle = (event) => {
    overlay.value.toggle(event)
}


</script>



<template>
    <p :data-letters="firstLetter" :data-large="false" :data-space="true" @click="toggle"
        class="font-medium text-900 transition-colors transition-duration-300 hover:text-blue-500 hover:underline cursor-pointer mb-2">
        {{ props.value }}
    </p>
    <UserOverlay ref="overlay" :value="props.value"/>
</template>
