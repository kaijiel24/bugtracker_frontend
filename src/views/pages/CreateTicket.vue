<script setup>
import UsersService from '@/service/UsersService';
import ProjectsService from '@/service/ProjectsService';
import { ref, onBeforeMount } from 'vue';

const name = ref("");
const comment = ref("");
const project = ref(null);
const priority = ref("");

const assignee = ref(null);
const prioritySelectOptions = ref(['low', 'medium', 'high']);
const projectsSelectOptions = ref(null);
const membersSelectOptions = ref(null);
const usersService = new UsersService();
const projectsService = new ProjectsService();
// TODO Replace user id when logged in
const currentUserId = 1


// TODO POST to database
const submitClick = () => {
    console.log({
        name: name,
        comment: comment,
        project: project,
        priority: priority,
        assignee: assignee.value.map(a => a.id),
    })
};
onBeforeMount(() => {
    usersService.getUsersExcept(currentUserId).then((data) => (membersSelectOptions.value = data))
    projectsService.getProjects().then((data) => (projectsSelectOptions.value = data))
});

</script>

<template>
    <div className="grid">
        <div class="col-12">
            <div class="card p-fluid">
                <h5>Create New Ticket</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                        <label for="name">Ticket Name</label>
                        <InputText v-model="name" id="name" type="text" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="name">Project</label>
                        <Dropdown v-model="project" :options="projectsSelectOptions" optionLabel="name" optionValue="id" :showClear="true"/>
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="name">Priority</label>
                        <Dropdown v-model="priority" :options="prioritySelectOptions" :showClear="true">
                            <template #value="slotProps">
                                <span :class="'ticket-priority-badge priority-' + slotProps.value">{{ slotProps.value }}</span>
                            </template>
                            <template #option="slotProps">
                                <span :class="'ticket-priority-badge priority-' + slotProps.option">{{ slotProps.option }}</span>
                            </template>
                        </Dropdown>
                    </div>
                    <div class="field col-12">
                        <label for="description">Comment</label>
                        <Textarea v-model="comment" id="comment" rows="4"/>
                    </div>
                    <div class="field col-12">
                        <label for="name">Assignee</label>
                        <MultiSelect v-model="assignee" :options="membersSelectOptions" optionLabel="name" placeholder="Select Members" :filter="true" dataKey="id">
                            <template #value="slotProps">
                                <div class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2" v-for="option of slotProps.value">
                                    <div>{{ option.name }}</div>
                                </div>
                                <template v-if="!slotProps.value || slotProps.value.length === 0">
                                    <div class="p-1">Assign To</div>
                                </template>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                    <div>{{ slotProps.option.name }}</div>
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
