<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { ref, onBeforeMount } from 'vue';
import RoleBadge from './badge/RoleBadge.vue'
const props = defineProps({
    rows: Number,
    users: Array
})

const filters = ref(null);
const loading = ref(true);

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        username: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        role: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    };
    loading.value = false;
}

const rowClick = () => {
}
onBeforeMount(() => {
    initFilters();
});
</script>

<template>
    <div className="card">
        <h2>Users</h2>
        <DataTable :value="props.users" :paginator="true" class="p-datatable-gridlines" :rows="props.rows" dataKey="id"
            :rowHover="true" @row-click="rowClick" filterDisplay="menu" :loading="loading" :filters="filters"
            responsiveLayout="scroll" :globalFilterField="['name', 'username', 'role', 'email']">
            <template #header>
                <div class="flex justify-content-between flex-column sm:flex-row">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2"
                        @click="clearFilter1()" />
                    <span class="p-input-icon-left mb-2">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" style="width: 100%" />
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
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>
            <Column field="username" header="Username" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.username }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>
            <Column field="email" header="Email" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.email }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by email" />
                </template>
            </Column>
            <Column field="role" header="Role" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                <template #body="{ data }">
                    <RoleBadge :value="data.role" :inline="true" />
                </template>
                <template #filter="{ filterModel }">
                    <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Any" class="p-column-filter"
                        :showClear="true">
                        <template #value="slotProps">
                            <RoleBadge v-if="sslotProps.value" :value="slotProps.value" :inline="true" />
                            <span v-else>{{ slotProps.placeholder }}</span>
                        </template>
                        <template #option="slotProps">
                            <RoleBadge :value="slotProps.option" :inline="true" />
                        </template>
                    </Dropdown>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
