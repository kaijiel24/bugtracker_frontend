<script setup>
import { ref } from 'vue';
import ProjectStatusBadge from './badge/ProjectStatusBadge.vue';
import InfoRow from './InfoRow.vue'
const props = defineProps({
    project: Object,
})

const project = ref(props.project)

</script>

<template>
    <div class="card">
        <div class="font-medium text-3xl text-900 mb-3">{{ project.name }}</div>
        <Divider />
        <div class="flex justify-content-left">
            <InfoRow title="Description" :value="project.description" buttonText="Edit" />
            <Divider layout="vertical" />
            <InfoRow title="Status" :value="project.status" buttonText="Edit" :badgeType="ProjectStatusBadge"
                badgePrefix="status" />
            <Divider layout="vertical" />
            <InfoRow title="Project Manager" :value="project.projectManager" buttonText="Edit" />
        </div>
    </div>
</template>
