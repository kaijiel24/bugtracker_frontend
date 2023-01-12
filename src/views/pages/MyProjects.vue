<script setup>
import ProjectList from '@/components/ProjectList.vue'
import ProjectsService from '@/service/ProjectsService';
import { ref, onBeforeMount } from 'vue';

const projects = ref(null);
const projectsService = new ProjectsService();


onBeforeMount(() => {
    projectsService.getProjects().then((data) => (projects.value = data));
    console.log(projects)
});

</script>

<template>
    <ProjectList :rows="10" :projects="projects"/>
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';

::v-deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}
</style>
