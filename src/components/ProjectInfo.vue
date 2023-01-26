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
        <ul class="list-none p-0 m-0">
            <InfoRow title="Description" :value="project.description" buttonText="Edit" />
            <InfoRow title="Status" :value="project.status" buttonText="Edit" :badgeType="ProjectStatusBadge"
                badgePrefix="status" />
            <InfoRow title="Project Manager" :value="project.projectManager" buttonText="Edit" />
            <InfoRow title="Members" :value="project.memberCount" buttonText="Add" />
            <InfoRow title="Active Tickets" :value="project.activeTickets" buttonText="Add" />
        </ul>
    </div>
</template>
