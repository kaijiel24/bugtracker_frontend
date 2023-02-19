<script setup>
import UsersService from '@/service/UsersService';
import ProjectsService from '@/service/ProjectsService';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { ref, onBeforeMount } from 'vue';

const name = ref("");
const description = ref("");
const status = ref("dev");
const members = ref(null);
const statusButtonOptions = ref([{ name: 'Development', value: 'dev' }, { name: 'Production', value: 'prod' }]);
const membersSelectOptions = ref(null);
const usersService = new UsersService();
const projectsService = new ProjectsService();
const toast = useToast()
const router = useRouter();


// TODO POST to database
const submitClick = () => {
    projectsService.addProject({
        name: name.value,
        description: description.value,
        status: status.value,
        members: members.value.map(a => a.username),
    })
        .then((d) => {
            router.push({ name: 'projects' })
        })
        .catch((error) => {
            toast.add({
                severity: 'error',
                summary: 'Error Encountered',
                detail: error.message,
                life: 3000
            });
        })
};
onBeforeMount(() => {
    usersService.getUserSuggestions()
        .then((data) => (membersSelectOptions.value = data))
        .catch((error) => {
            toast.add({
                severity: 'error',
                summary: 'Error Encountered',
                detail: error.message,
                life: 3000
            });
        })
    console.log(membersSelectOptions)
});

</script>

<template>
    <div className="grid">
        <div class="col-12">
            <div class="card p-fluid">
                <h5>Vertical</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                        <label for="name">Project Name</label>
                        <InputText v-model="name" id="name" type="text" />
                    </div>

                    <div class="field col-12 md:col-6">
                        <label for="name">Status</label>
                        <SelectButton v-model="status" :options="statusButtonOptions" optionLabel="name"
                            optionValue="value" />
                    </div>
                    <div class="field col-12">
                        <label for="description">Description</label>
                        <Textarea v-model="description" id="description" rows="4" />
                    </div>
                    <div class="field col-12">
                        <label for="name">Members</label>
                        <MultiSelect v-model="members" :options="membersSelectOptions" optionLabel="name"
                            placeholder="Select Members" :filter="true">
                            <template #value="slotProps">
                                <div class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2"
                                    v-for="option of slotProps.value">
                                    <div>{{ option.name }}</div>
                                </div>
                                <template v-if="!slotProps.value || slotProps.value.length === 0">
                                    <div class="p-1">Select Members</div>
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
