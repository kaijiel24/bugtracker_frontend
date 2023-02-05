<script setup>
const props = defineProps({
    title: String,
    value: String,
    buttonText: String,
    badgeType: String,
    badgePrefix: String
});
</script>

<template>
    <div class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
        <div class="text-500 w-6 font-medium">{{ props.title }}</div>
        <div class="text-900 w-full flex-order-1">
            <component v-if="props.badgeType" :is="props.badgeType" :value="props.value" :inline="true" />
            <div v-else>{{ props.value }}</div>
        </div>
    </div>
</template>
