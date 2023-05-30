<script setup>
import Username from './Username.vue';
const props = defineProps({
    title: String,
    value: String,
    badgeType: String,
    badgePrefix: String,
    username: String,
});
</script>

<template>

    <div class="flex flex-grow-1 align-content-start align-items-center pb-2 flex-wrap min-w-3 max-w-3">
        <div class="text-500 w-full border-bottom-1 surface-border font-medium mb-2">{{ props.title }}</div>
        <div class="text-900 w-full flex-order-1">
            <Username v-if="props.username" :value="props.value"/>
            <component v-else-if="props.badgeType" :is="props.badgeType" :value="props.value" :inline="true" />
            <div v-else>{{ props.value }}</div>
        </div>
    </div>
</template>
