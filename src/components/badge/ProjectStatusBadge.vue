<script setup>
import { computed } from 'vue'
const props = defineProps({
    value: String,
    large: Boolean,
    inline: Boolean
})

const text = computed(() => {
    if (props.value == 'dev') {
        return 'Development'
    } else if (props.value == 'prod') {
        return 'Production'
    } else if (props.value == 'depr') {
        return 'Depreciated'
    }

    return ''
})
</script>

<template>
    <div
        :class="'project-status-badge status-' + props.value + (props.large ? ' large-badge' : '') + (props.inline ? ' inline' : '')">
        {{
    text
        }}</div>
</template>
