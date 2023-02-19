<script setup>
import { ref } from 'vue';
import ProjectStatusBadge from './badge/ProjectStatusBadge.vue';
import UserListOverlay from './UserListOverlay.vue';
import InfoRow from './InfoRow.vue'
const props = defineProps({
    project: Object,
})

const project = ref(props.project)

</script>

<template>
    <div class="card">
        <div class="font-medium text-3xl text-900 mb-3">{{ project.name }}</div>
        <div class="flex flex-wrap justify-content-left gap-4">
            <InfoRow title="Description" :value="project.description" />
            <InfoRow title="Status" :value="project.status" :badgeType="ProjectStatusBadge" badgePrefix="status" />
            <InfoRow title="Project Manager" :value="project.projectManager" />
            <UserListOverlay :users="props.project.members" />
        </div>
    </div>
</template>
