<script setup>
import UsersService from '@/service/UsersService';
import ProjectsService from '@/service/ProjectsService';
import TicketsService from '@/service/TicketsService';
import { ref, onBeforeMount } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const name = ref("");
const description = ref("");
const project = ref(null);
const priority = ref("");
const type = ref("");

const assignees = ref(null);
const prioritySelectOptions = ref(['low', 'medium', 'high']);
const typeSelectOptions = ref(['bug', 'feature', 'doc', 'other']);
const projectsSelectOptions = ref(null);
const membersSelectOptions = ref(null);
const usersService = new UsersService();
const projectsService = new ProjectsService();
const ticketService = new TicketsService();
const toast = useToast()
const router = useRouter();

const getAssigneesSuggestions = (event) => {
    console.log(event.value)
    const id = event.value
    usersService.getAssigneeSuggestions(id)
        .then((data) => (membersSelectOptions.value = data))
        .catch((error) => {
            toast.add({
                severity: 'error',
                summary: 'Error Encountered',
                detail: error.message,
                life: 3000
            });
        })
    assignees.value = null
}

const submitClick = () => {
    var assigneesUsername = []
    var id = null

    if (assignees.value) {
        assigneesUsername = assignees.value.map(a => a.username)
    }
    console.log({
        name: name.value,
        description: description.value,
        projectid: project.value,
        priority: priority.value,
        assignees: assigneesUsername,
    })
    ticketService.addTicket({
        name: name.value,
        description: description.value,
        projectid: project.value,
        priority: priority.value,
        assignees: assigneesUsername,
        type: type.value,
    }).then((data) => {
        console.log(data)
        router.push({ name: "ticket", params: { id: data } })
    })


};

onBeforeMount(() => {
    projectsService.getProjectSuggestions()
        .then((data) => (projectsSelectOptions.value = data))
        .catch((error) => {
            toast.add({
                severity: 'error',
                summary: 'Error Encountered',
                detail: error.message,
                life: 3000
            });
        })
});

</script>

<template>
    <div className="grid">
        <div class="col-12">
            <div class="card p-fluid">
                <h5>Create New Ticket</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-5">
                        <label for="name">Ticket Name</label>
                        <InputText v-model="name" id="name" type="text" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="name">Project</label>
                        <Dropdown v-model="project" :options="projectsSelectOptions" optionLabel="name" optionValue="id"
                            @change="getAssigneesSuggestions($event)" :showClear="true" />
                    </div>
                    <div class="field col-12 md:col-2">
                        <label for="name">Type</label>
                        <Dropdown v-model="type" :options="typeSelectOptions" :showClear="true">
                            <template #value="slotProps">
                                <span :class="'ticket-type-badge type-' + slotProps.value">{{
                                    slotProps.value
                                }}</span>
                            </template>
                            <template #option="slotProps">
                                <span :class="'ticket-type-badge type-' + slotProps.option">{{
                                    slotProps.option
                                }}</span>
                            </template>
                        </Dropdown>
                    </div>
                    <div class="field col-12 md:col-2">
                        <label for="name">Priority</label>
                        <Dropdown v-model="priority" :options="prioritySelectOptions" :showClear="true">
                            <template #value="slotProps">
                                <span :class="'ticket-priority-badge priority-' + slotProps.value">{{
                                    slotProps.value
                                }}</span>
                            </template>
                            <template #option="slotProps">
                                <span :class="'ticket-priority-badge priority-' + slotProps.option">{{
                                    slotProps.option
                                }}</span>
                            </template>
                        </Dropdown>
                    </div>
                    <div class="field col-12">
                        <label for="description">Description</label>
                        <Textarea v-model="description" id="description" rows="4" />
                    </div>
                    <div class="field col-12">
                        <label for="name">Assignees</label>
                        <MultiSelect v-model="assignees" :options="membersSelectOptions" optionLabel="name"
                            placeholder="Select Assignees" :filter="true">
                            <template #value="slotProps">
                                <div class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2"
                                    v-for="option of slotProps.value">
                                    <div>{{ option.name }} ({{ option.username }})</div>
                                </div>
                                <template v-if="!slotProps.value || slotProps.value.length === 0">
                                    <div class="p-1">Select Assignees</div>
                                </template>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                    <div>{{ slotProps.option.name }} ({{ slotProps.option.username }})</div>
                                </div>
                            </template>
                        </MultiSelect>
                    </div>
                </div>
                <Button label="Submit" @click="submitClick"></Button>
            </div>
        </div>
    </div>
</template>
