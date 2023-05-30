<script setup>
import { computed } from 'vue'
const props = defineProps({
    value: String,
    large: Boolean,
    inline: Boolean
})

const text = computed(() => {
    if (props.value == 'bug') {
        return 'Bug/Error'
    } else if (props.value == 'feature') {
        return 'Feature Request'
    } else if (props.value == 'doc') {
        return 'Doc Request'
    } else if (props.value == 'other') {
        return 'Other Issue'
    }

    return ''
})

</script>

<template>
    <div
        :class="'ticket-type-badge type-' + props.value + (props.large ? ' large-badge' : '') + (props.inline ? ' inline' : '')">
        {{
    text
        }}</div>
</template>
