<script setup>
import ProjectList from '@/components/ProjectList.vue'
import ProjectsService from '@/service/ProjectsService';
import { authAxios } from '../../api/authApi';
import { ref, onBeforeMount } from 'vue';

const projects = ref(null);
const projectsService = new ProjectsService();
const loading = ref(true)


onBeforeMount(() => {
    // projectsService.getProjects().then((data) => (projects.value = data));
    //projects.value = getProjectListFn()
    authAxios.get('api/projectlist').then(
        (response) => {
            console.log(response.data)
            projects.value = response.data.data;
            loading.value = false
            console.log(loading.value)
        }
    )

    console.log(projects.value)
});

</script>

<template>
    <ProjectList :loading="loading" :rows="10" :projects="projects"/>
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
