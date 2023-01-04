<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import ProjectsService from '@/service/ProjectsService';
import { ref, onBeforeMount } from 'vue';

const filters = ref(null);
const loading = ref(null);
const projects = ref(null);
const statuses = ref(['Development', 'Production', 'Depreciated']);
const projectsService = new ProjectsService();

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    };
};

const rowClick = (e) => { 
    console.log(e.data.id)
    window.location.href = "#/pages/project/" + e.data.id;
}

onBeforeMount(() => {
    projectsService.getProjects().then((data) => (projects.value = data));

    console.log(projects)

    initFilters();
});

</script>

<template>
    <div className="grid">
        <div className="col-12">
            <div className="card">
                <h2>My Projects</h2>
                <DataTable
                    :value="projects"
                    :paginator="true"
                    class="p-datatable-gridlines"
                    :rows="10"
                    dataKey="id"
                    :rowHover="true"
                    @row-click="rowClick($event)"
                    v-model:filters="filters"
                    filterDisplay="menu"
                    :loading="loading"
                    :filters="filters"
                    responsiveLayout="scroll"
                    :globalFilterField="['name', 'projectManager', 'status' ]"
                >
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2" @click="clearFilter1()" />
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Keyword Search" style="width: 100%" />
                            </span>
                        </div>
                    </template>
                    <template #empty> No projects found. </template>
                    <template #loading> Loading projects data. Please wait. </template>
                    <Column field="name" header="Name" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.name }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
                        </template>
                    </Column>
                    <Column header="Project Manager" filterField="projectManager" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.projectManager }}</span>
                        </template>
                        <template #filter="{ filterModel }">
                            <div class="mb-3 text-bold">Agent Picker</div>
                            <MultiSelect v-model="filterModel.value" :options="representatives" optionLabel="name" placeholder="Any" class="p-column-filter">
                                <template #option="slotProps">
                                    <div class="p-multiselect-representative-option">
                                        <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ slotProps.option.name }}</span>
                                    </div>
                                </template>
                            </MultiSelect>
                        </template>
                    </Column>
                    <Column field="status" header="Status" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span :class="'project-status-badge status-' + data.status">{{ data.status }}</span>
                        </template>
                        <template #filter="{ filterModel }">
                            <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Any" class="p-column-filter" :showClear="true">
                                <template #value="slotProps">
                                    <span :class="'project-status-badge status-' + slotProps.value" v-if="slotProps.value">{{ slotProps.value }}</span>
                                    <span v-else>{{ slotProps.placeholder }}</span>
                                </template>
                                <template #option="slotProps">
                                    <span :class="'project-status-badge status-' + slotProps.option">{{ slotProps.option }}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>
                </DataTable>
            

            </div>
        </div>
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
