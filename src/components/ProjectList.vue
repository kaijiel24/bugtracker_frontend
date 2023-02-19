<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import ProjectStatusBadge from './badge/ProjectStatusBadge.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    rows: Number,
    projects: Array,
    loading: Boolean
})

const filters = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });

const router = useRouter();

const rowClick = (e) => {
    console.log(e.data.id)
    router.push({ name: 'project', params: { id: e.data.id } })
}
</script>

<template>
    <DataTable :value="props.projects" :rows="props.rows" dataKey="id" :rowHover="true" @row-click="rowClick($event)"
        v-model:filters="filters" filterDisplay="menu" :loading="props.loading" :filters="filters"
        responsiveLayout="scroll" :globalFilterField="['name', 'projectManager', 'status']">
        <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
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
        </Column>
        <Column header="Project Manager" filterField="projectManager" :showFilterMatchModes="false"
            :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
            <template #body="{ data }">
                <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{
                    data.projectManager
                }}</span>
            </template>
        </Column>
        <Column field="status" header="Status" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
            <template #body="{ data }">
                <ProjectStatusBadge :value="data.status" :inline="true" />
            </template>
        </Column>
    </DataTable>
</template>
