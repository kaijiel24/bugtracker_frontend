<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { ref, onBeforeMount } from 'vue';
import TicketStatusBadge from './badge/TicketStatusBadge.vue';
import TicketPriorityBadge from './badge/TicketPriorityBadge.vue';

const props = defineProps({
    rows: Number,
    tickets: Array,
    project: Boolean
})

const filters = ref(null);
const loading = ref(true);

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'submitter.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'assignee.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        priority: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        dateCreated: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        dateUpdated: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    };
    if (props.project) {
        filters.value['project.name'] = { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] };
        console.log(props.project);
    }
    loading.value = false;
    console.log(filters)
}

const formatDate = (value) => {
    let date = new Date(value);
    return date.toLocaleDateString('en-UK', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}
const rowClick = (e) => {
    console.log(e.data.id)
    window.location.href = "#/pages/ticket/" + e.data.id;
}

onBeforeMount(() => {
    initFilters();
});
</script>

<template>
    <div className="card">
        <h2>Tickets</h2>
        <DataTable :value="props.tickets" :paginator="true" class="p-datatable-gridlines" :rows="props.rows"
            dataKey="id" :rowHover="true" @row-click="rowClick" filterDisplay="menu" :loading="loading"
            :filters="filters" responsiveLayout="scroll"
            :globalFilterField="['name', 'submitter.name', 'assignee.name', 'status', 'priority', 'dateCreated', 'dateUpdated', 'type']">
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
            <template #empty>No tickets found</template>
            <template #loading> Loading tickets data. Please wait. </template>
            <Column field="name" header="Name" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>
            <Column filterField="submitter.name" header="Submitter" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.submitter.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>
            <Column filterField="assignee.name" header="Assignee" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.assignee.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>
            <Column field="status" header="Status" :filterMenuStyle="{ width: '14rem' }" style="min-width: 8rem">
                <template #body="{ data }">
                    <TicketStatusBadge :value="data.status" :inline="true" />
                </template>
                <template #filter="{ filterModel }">
                    <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Any" class="p-column-filter"
                        :showClear="true">
                        <template #value="slotProps">
                            <span :class="'ticket-status-badge status-' + slotProps.value" v-if="slotProps.value">{{
                                slotProps.value
                            }}</span>
                            <span v-else>{{ slotProps.placeholder }}</span>
                        </template>
                        <template #option="slotProps">
                            <span :class="'ticket-status-badge status-' + slotProps.option">{{
                                slotProps.option
                            }}</span>
                        </template>
                    </Dropdown>
                </template>
            </Column>
            <Column field="priority" header="Priority" :filterMenuStyle="{ width: '14rem' }" style="min-width: 8rem">
                <template #body="{ data }">
                    <TicketPriorityBadge :value="data.priority" :inline="true" />
                </template>
                <template #filter="{ filterModel }">
                    <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Any" class="p-column-filter"
                        :showClear="true">
                        <template #value="slotProps">
                            <span :class="'ticket-priority-badge priority-' + slotProps.value" v-if="slotProps.value">{{
                                slotProps.value
                            }}</span>
                            <span v-else>{{ slotProps.placeholder }}</span>
                        </template>
                        <template #option="slotProps">
                            <span :class="'ticket-priority-badge priority-' + slotProps.option">{{
                                slotProps.option
                            }}</span>
                        </template>
                    </Dropdown>
                </template>
            </Column>
            <Column header="Date Created" filterField="dateCreated" dataType="date" style="min-width: 8">
                <template #body="{ data }">
                    {{ formatDate(data.dateUpdated) }}
                </template>
                <template #filter="{ filterModel }">
                    <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                </template>
            </Column>
            <Column header="Date Updated" filterField="dateUpdated" dataType="date" style="min-width: 8rem">
                <template #body="{ data }">
                    {{ formatDate(data.dateUpdated) }}
                </template>
                <template #filter="{ filterModel }">
                    <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                </template>
            </Column>
            <Column v-if="props.project" field="project" header="Project" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.project.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>
