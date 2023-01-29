<script setup>
import ProjectsService from '../../service/ProjectsService';
import ProjectInfo from '../../components/ProjectInfo.vue';
import TicketList from '../../components/TicketList.vue';
import UserList from '../../components/UserList.vue';
import { ref, onBeforeMount } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
})

const project = ref(null);
const projectsService = new ProjectsService();


const getProjectData = () => {
    projectsService.getProject(props.id).then((data) => (project.value = data))
    console.log(project)
}
onBeforeMount(() => {
    getProjectData()
});
</script>

<template>
    <div v-if="project" className="grid">
        <div class="col-12 md:col-4">
            <ProjectInfo :project="project" />
        </div>
        <div class="col-12 md:col-8">
            <UserList :rows="5" :users="project.members" />
        </div>
        <div class="col-12 md:col-12">
            <TicketList :rows="5" :tickets="project.tickets" />
        </div>
    </div>
</template>
