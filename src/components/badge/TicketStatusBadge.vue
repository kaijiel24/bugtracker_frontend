<script setup>
const props = defineProps({
    value: String,
    large: Boolean,
    inline: Boolean
})
</script>

<template>
    <div
        :class="'ticket-status-badge status-' + props.value + (props.large ? ' large-badge' : '') + (props.inline ? ' inline' : '')">
        {{
    props.value
        }}</div>
</template>
