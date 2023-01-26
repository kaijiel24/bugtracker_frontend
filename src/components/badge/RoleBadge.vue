<script setup>
const props = defineProps({
    value: String,
    large: Boolean,
    inline: Boolean
})
</script>

<template>
    <div
        :class="'role-badge role-' + props.value + (props.large ? ' large-badge' : '') + (props.inline ? ' inline' : '')">
        {{
    props.value
        }}</div>
</template>
