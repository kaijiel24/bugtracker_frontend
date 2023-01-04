<script setup>
import UsersService from '@/service/UsersService';
import { ref, onBeforeMount } from 'vue';

const name = "";
const description = "";
const status = "Production";
const members = ref(null);
const statusButtonOptions = ref([{ name: 'Development' }, { name: 'Production' }]);
const membersSelectOptions = ref(null);
const usersService = new UsersService();
// TODO Replace user id when logged in
const currentUserId = 1


// TODO POST to database
const submitClick = () => {
    console.log({
        name: name,
        description: description,
        status: status,
        members: members.value.map(a => a.id),
    })
};
onBeforeMount(() => {
    usersService.getUsersExcept(currentUserId).then((data) => (membersSelectOptions.value = data))
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
                        <InputText id="name" type="text" />
                    </div>

                    <div class="field col-12 md:col-6">
                        <h5>Status</h5>
                        <SelectButton v-model="status" :options="statusButtonOptions" optionLabel="name" optionValue="name"/>
                    </div>
                    <div class="field col-12">
                        <label for="description">Description</label>
                        <Textarea id="description" rows="4" />
                    </div>
                    <div class="field col-12">
                        <h5>Members</h5>
                        <MultiSelect v-model="members" :options="membersSelectOptions" optionLabel="name" placeholder="Select Members" :filter="true" dataKey="id">
                            <template #value="slotProps">
                                <div class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2" v-for="option of slotProps.value">
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
