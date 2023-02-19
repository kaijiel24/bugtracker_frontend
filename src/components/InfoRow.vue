<script setup>
const props = defineProps({
    title: String,
    value: String,
    badgeType: String,
    badgePrefix: String
});
</script>

<template>

    <div class="flex align-items-center pb-2 flex-wrap min-w-2 max-w-2">
        <div class="text-500 w-full border-bottom-1 surface-border font-medium mb-2">{{ props.title }}</div>
        <div class="text-900 w-full flex-order-1">
            <component v-if="props.badgeType" :is="props.badgeType" :value="props.value" :inline="true" />
            <div v-else>{{ props.value }}</div>
        </div>
    </div>
</template>
