<script setup>
import { ref } from 'vue'
import Username from './Username.vue';
const props = defineProps({
    users: Array,
})

const op = ref();
const toggle = (event) => {
    op.value.toggle(event);
};
</script>

<template>
    <div class="flex flex-grow-1 align-items-center pb-2 flex-wrap min-w-2 max-w-2">
        <div class="text-500 w-full border-bottom-1 surface-border font-medium mb-2"><slot></slot></div>
        <div v-if="props.users">
            <Username :value="props.users[0]" />
            <Username v-if="props.users.length > 1" :value="props.users[1]" />
            <div v-if="props.users.length > 2">
                <Button label="More" icon="pi pi-angle-down" class="p-button-sm p-button-text p-button-secondary"
                    @click="toggle" />
                <OverlayPanel ref="op">
                    <ScrollPanel style="width: 100%" class="">
                        <div v-for="user in props.users.slice(2)">
                            <Username :value="user" />
                        </div>
                    </ScrollPanel>
                </OverlayPanel>
            </div>
        </div>
        <div class="text-900 w-full mb-2" v-else>No <slot></slot> yet</div>
    </div>
</template>
