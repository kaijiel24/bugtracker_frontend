<script setup>
import ProjectList from '@/components/ProjectList.vue'
import ProjectsService from '@/service/ProjectsService';
import { useToast } from 'primevue/usetoast';
import { ref, onBeforeMount } from 'vue';

const toast = useToast()
const projectsService = new ProjectsService();

const myProjects = ref(null);
const allProjects = ref(null);
const myLoading = ref(true)
const allLoading = ref(true)


onBeforeMount(() => {
    projectsService.getMyProjects()
        .then((data) => (myProjects.value = data))
        .catch((error) => {
            toast.add({
                severity: 'error',
                summary: 'Error Encountered',
                detail: error.message,
                life: 3000
            });
        })
        .finally(() => (myLoading.value = false))

    projectsService.getAllProjects()
        .then((data) => (allProjects.value = data))
        .catch((error) => {
            toast.add({
                severity: 'error',
                summary: 'Error Encountered',
                detail: error.message,
                life: 3000
            });
        })
        .finally(() => (allLoading.value = false))

});

</script>

<template>
    <div class="card">
    <h2>Projects</h2>
    <TabView>
        <TabPanel header="My Projects">
            <ProjectList :loading="myLoading" :rows="10" :projects="myProjects" />
        </TabPanel>
        <TabPanel header="All Projects">
            <ProjectList :loading="allLoading" :rows="10" :projects="allProjects" />
        </TabPanel>
    </TabView>
    </div>
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
