<script setup>
import ProjectStatusBadge from './badge/ProjectStatusBadge.vue';
import UserListOverlay from './UserListOverlay.vue';
import InfoRow from './InfoRow.vue'
const props = defineProps({
    project: Object,
})

</script>

<template>
    <div class="card">
        <div class="font-medium text-3xl text-900 mb-3">{{props.project.name }}</div>
        <div class="flex flex-wrap justify-content-left gap-4">
            <InfoRow title="Description" :value="props.project.description" />
            <InfoRow title="Status" :value="props.project.status" :badgeType="ProjectStatusBadge" badgePrefix="status" />
            <InfoRow title="Project Manager" :value="props.project.projectManager" :username="true"/>
            <UserListOverlay :users="props.project.members">Members</UserListOverlay>
        </div>
    </div>
</template>
