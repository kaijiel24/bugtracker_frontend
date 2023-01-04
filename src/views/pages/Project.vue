<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import ProjectsService from '../../service/ProjectsService';
import { ref, onBeforeMount } from 'vue';

const props = defineProps({
        id: {
          type: Number,
          required: true,
        },
    })

const memberFilters = ref(null);
const ticketFilters = ref(null);
const memberLoading = ref(true);
const ticketLoading = ref(true);
const project = ref(null);
const projectsService = new ProjectsService();

const initMembersFilters = () => {
    memberFilters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        username: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        role: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    };
    memberLoading.value = false;
}

const initTicketsFilters = () => {
    ticketFilters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        "submitter.name": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        "assignee.name": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        priority: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        dateCreated: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        dateUpdated: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    };
    ticketLoading.value = false;
}
const memberRowClick = () =>{
}
const ticketRowClick = () =>{
}

const getProjectData = () => {
    projectsService.getProject(props.id).then((data) => (project.value = data));
    console.log(project)
}
const formatDate = (value) => { 
    let date = new Date(value);
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}
onBeforeMount(() => {
    getProjectData();
    initMembersFilters();
    initTicketsFilters();
});
</script>

<template>
    <div v-if="project" className="grid">
        <div class="col-12 md:col-4">
            <div className="card">
                <div class="surface-section">
                    <div class="font-medium text-3xl text-900 mb-3">{{ project.name }}</div>
                    <ul class="list-none p-0 m-0">
                        <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                            <div class="text-500 w-6 font-medium">Description</div>
                            <div class="text-900 w-full flex-order-1">{{project.description}}</div>
                            <div class="w-6 flex justify-content-end">
                                <Button label="Edit" icon="pi pi-pencil" class="p-button-text"></Button>
                            </div>
                        </li>
                        <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                            <div class="text-500 w-6 font-medium">Status</div>
                            <div class="text-900 w-full flex-order-1">
                                <span :class="'project-status-badge status-' + project.status">{{ project.status }}</span>
                            </div>
                            <div class="w-6 flex justify-content-end">
                                <Button label="Edit" icon="pi pi-pencil" class="p-button-text"></Button>
                            </div>
                        </li>
                        <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                            <div class="text-500 w-6 font-medium">Project Manager</div>
                            <div class="text-900 w-full flex-order-1">{{ project.projectManager}}</div>
                            <div class="w-6 flex justify-content-end">
                                <Button label="Edit" icon="pi pi-pencil" class="p-button-text"></Button>
                            </div>
                        </li>
                        <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                            <div class="text-500 w-6 font-medium">Members</div>
                            <div class="text-900 w-full flex-order-1">{{ project.memberCount}}</div>
                            <div class="w-6 flex justify-content-end">
                                <Button label="Add Member" icon="pi pi-pencil" class="p-button-text"></Button>
                            </div>
                        </li>
                        <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                            <div class="text-500 w-6 font-medium">Active Tickets</div>
                            <div class="text-900 w-full flex-order-1">{{ project.activeTickets}}</div>
                            <div class="w-6 flex justify-content-end">
                                <Button label="Add Ticket" icon="pi pi-pencil" class="p-button-text"></Button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-10 md:col-8">
            <div className="card">
                <h2>Members</h2>
                <DataTable
                    :value="project.members"
                    :paginator="true"
                    class="p-datatable-gridlines"
                    :rows="5"
                    dataKey="id"
                    :rowHover="true"
                    @row-click="memberRowClick($event)"
                    v-model:filters="memberFilters"
                    filterDisplay="menu"
                    :loading="memberLoading"
                    :filters="memberFilters"
                    responsiveLayout="scroll"
                    :globalFilterField="['name', 'username', 'role', 'email' ]"
                >
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2" @click="clearFilter1()" />
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="memberFilters['global'].value" placeholder="Keyword Search" style="width: 100%" />
                            </span>
                        </div>
                    </template>
                    <template #empty>No developers found</template>
                    <template #loading> Loading developers data. Please wait. </template>
                    <Column field="name" header="Name" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.name }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
                        </template>
                    </Column>
                    <Column field="username" header="Username" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.username }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
                        </template>
                    </Column>
                    <Column field="email" header="Email" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.email }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by email" />
                        </template>
                    </Column>
                    <Column field="role" header="Role" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span :class="'role-badge status-' + data.role.replace(' ', '-')">{{ data.role }}</span>
                        </template>
                        <template #filter="{ filterModel }">
                            <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Any" class="p-column-filter" :showClear="true">
                                <template #value="slotProps">
                                    <span :class="'role-badge status-' + slotProps.value" v-if="slotProps.value">{{ slotProps.value }}</span>
                                    <span v-else>{{ slotProps.placeholder }}</span>
                                </template>
                                <template #option="slotProps">
                                    <span :class="'role-badge status-' + slotProps.option">{{ slotProps.option }}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <div class="col-12 md:col-12">
            <div className="card">
                <h2>Tickets</h2>
                <DataTable
                    :value="project.tickets"
                    :paginator="true"
                    class="p-datatable-gridlines"
                    :rows="5"
                    dataKey="id"
                    :rowHover="true"
                    @row-click="ticketRowClick($event)"
                    v-model:filters="ticketFilters"
                    filterDisplay="menu"
                    :loading="ticketLoading"
                    :filters="ticketFilters"
                    responsiveLayout="scroll"
                    :globalFilterField="['name', 'submitter.name', 'assignee.name', 'status', 'priority', 'dateCreated', 'dateUpdated', 'type' ]"
                >
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2" @click="clearFilter1()" />
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="ticketFilters['global'].value" placeholder="Keyword Search" style="width: 100%" />
                            </span>
                        </div>
                    </template>
                    <template #empty>No tickets found</template>
                    <template #loading> Loading tickets data. Please wait. </template>
                    <Column field="name" header="Name" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.name }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
                        </template>
                    </Column>
                    <Column filterField="submitter.name" header="Submitter" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.submitter.name }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
                        </template>
                    </Column>
                    <Column filterField="assignee.name" header="Assignee" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.assignee.name }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
                        </template>
                    </Column>
                    <Column field="status" header="Status" :filterMenuStyle="{ width: '14rem' }" style="min-width: 8rem">
                        <template #body="{ data }">
                            <span :class="'ticket-status-badge status-' + data.status.replace(' ', '-')">{{ data.status }}</span>
                        </template>
                        <template #filter="{ filterModel }">
                            <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Any" class="p-column-filter" :showClear="true">
                                <template #value="slotProps">
                                    <span :class="'ticket-status-badge status-' + slotProps.value" v-if="slotProps.value">{{ slotProps.value }}</span>
                                    <span v-else>{{ slotProps.placeholder }}</span>
                                </template>
                                <template #option="slotProps">
                                    <span :class="'ticket-status-badge status-' + slotProps.option">{{ slotProps.option }}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>
                    <Column field="priority" header="Priority" :filterMenuStyle="{ width: '14rem' }" style="min-width: 8rem">
                        <template #body="{ data }">
                            <span :class="'ticket-priority-badge status-' + data.priority.replace(' ', '-')">{{ data.priority }}</span>
                        </template>
                        <template #filter="{ filterModel }">
                            <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Any" class="p-column-filter" :showClear="true">
                                <template #value="slotProps">
                                    <span :class="'ticket-priority-badge status-' + slotProps.value" v-if="slotProps.value">{{ slotProps.value }}</span>
                                    <span v-else>{{ slotProps.placeholder }}</span>
                                </template>
                                <template #option="slotProps">
                                    <span :class="'ticket-priority-badge status-' + slotProps.option">{{ slotProps.option }}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>
                    <Column header="Date Created" filterField="dateCreated" dataType="date" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatDate(data.dateUpdated) }}
                        </template>
                        <template #filter="{ filterModel }">
                            <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                        </template>
                    </Column>
                    <Column header="Date Updated" filterField="dateUpdated" dataType="date" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatDate(data.dateUpdated) }}
                        </template>
                        <template #filter="{ filterModel }">
                            <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>
