<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import UsersService from '../service/UsersService';
import RoleBadge from './badge/RoleBadge.vue'
const props = defineProps({
    rows: Number,
    users: Array,
    loading: Boolean
})

const userService = new UsersService();
const toast = useToast()

const filters = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
const editingRows = ref([])
const visible = ref(false)

const username = ref('')
const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('dev')

const roles = ref(['admin', 'pm', 'dev'])

const addUserClick = () => {
    userService.addUser({
        username: username.value,
        name: name.value,
        email: email.value,
        password: password.value,
        role: role.value
    })
        .then((data) => {
            props.users.push(data)
            toast.add({
                severity: 'success',
                summary: 'Successful',
                detail: `User ${data.username} added`,
                life: 5000
            });
        })
        .catch((error) => {
            toast.add({
                severity: 'error',
                summary: 'Error Encountered',
                detail: error.message,
                life: 5000
            });
        })

    username.value = ""
    name.value = ""
    email.value = ""
    password.value = ""
    role.value = "dev"

    visible.value = false
}

const onRowEditSave = (event) => {
    let { newData, index } = event;
    userService.updateUser(newData)
        .then((data) => {
            console.log(index)
            console.log(data)
            props.users[index] = data
            // props.users.splice(index, 1)
            // props.users.push(data)
            console.log(props.users)
            toast.add({
                severity: 'success',
                summary: 'Successful',
                detail: `User ${data.username} updated`,
                life: 3000
            });
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
</script>

<template>
    <div className="card">
        <h2>Users</h2>
        <DataTable :value="props.users" editMode="row" dataKey="username" v-model:editingRows="editingRows"
            @row-edit-save="onRowEditSave" v-model:filters="filters" responsiveLayout="stack" breakpoint="1140px">
            <template #header>
                <div class="flex justify-content-between flex-column sm:flex-row">
                    <span class="p-input-icon-left mb-2">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" style="width: 100%" />
                    </span>

                    <Button label="Add User" icon="pi pi-external-link" @click="visible = true"
                        :aria-controls="visible ? 'dlg' : null" :aria-expanded="visible ? true : false" />
                    <Dialog id="dlg" header="Add User" v-model:visible="visible" :style="{ width: '50vw' }"
                        :modal="true">

                        <div class="grid formgrid p-fluid">
                            <div class="field col-12">
                                <label for="username">Username</label>
                                <InputText v-model="username" id="username" type="text" />
                            </div>
                            <div class="field col-12">
                                <label for="name">Name</label>
                                <InputText v-model="name" id="name" type="text" />
                            </div>
                            <div class="field col-12">
                                <label for="email">Email</label>
                                <InputText v-model="email" id="email" type="text" />
                            </div>
                            <div class="field col-12">
                                <label for="password">Password</label>
                                <Password v-model="password" toggleMask id="password"></Password>
                            </div>
                            <div class="field col-12">
                                <label for="role">Role</label>
                                <Dropdown id="role" v-model="role" :options="roles" placeholder="Select a Role">
                                    <template #option="slotProps">
                                        <RoleBadge :value="slotProps.option" :inline="true" />
                                    </template>
                                    <template #value="slotProps">
                                        <RoleBadge :value="slotProps.value" :inline="true" />
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="field col-4">
                                <Button label="Add" @click="addUserClick" />
                            </div>
                        </div>
                    </Dialog>
                </div>
            </template>
            <Column field="username" header="Username" style="width:20%">
                <template #editor="{ data, field }">
                    <div>{{ data[field]}}</div>
                </template>
            </Column>
            <Column field="name" header="Name" style="width:20%">
                <template #editor="{ data, field }">
                    <div class="p-fluid">
                        <InputText v-model="data[field]" />
                    </div>
                </template>
            </Column>
            <Column field="email" header="Email" style="width:20%">
                <template #editor="{ data, field }">
                    <div class="p-fluid">
                        <InputText v-model="data[field]" />
                    </div>
                </template>
            </Column>
            <Column field="role" header="Role" style="width:20%">
                <template #editor="{ data, field }">
                    <Dropdown v-model="data[field]" :options="roles" placeholder="Select a Role">
                        <template #option="slotProps">
                            <RoleBadge :value="slotProps.option" :inline="true" />
                        </template>
                        <template #value="slotProps">
                            <RoleBadge :value="slotProps.value" :inline="true" />
                        </template>
                    </Dropdown>
                </template>
                <template #body="slotProps">
                    <RoleBadge :value="slotProps.data.role" :inline="true" />
                </template>
            </Column>
            <Column :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
        </DataTable>
    </div>
</template>
