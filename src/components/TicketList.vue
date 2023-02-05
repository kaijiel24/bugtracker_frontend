<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { ref } from 'vue';
import TicketStatusBadge from './badge/TicketStatusBadge.vue';
import TicketPriorityBadge from './badge/TicketPriorityBadge.vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    loading: Boolean,
    rows: Number,
    tickets: Array,
    project: Boolean
})

const filters = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
const router = useRouter();

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
    router.push({ name: 'ticket', params: { id: e.data.id } })
}

</script>

<template>
    <div className="card">
        <h2>Tickets</h2>
        <DataTable :value="props.tickets" :paginator="true" :rows="props.rows" dataKey="id" :rowHover="true"
            @row-click="rowClick" filterDisplay="menu" :loading="props.loading" :filters="filters"
            responsiveLayout="scroll"
            :globalFilterField="['name', 'submitter.name', 'assignee.name', 'status', 'priority', 'dateCreated', 'dateUpdated', 'type']">
            <template #header>
                <div class="flex justify-content-between flex-column sm:flex-row">
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
            </Column>
            <Column filterField="submitter.name" header="Submitter" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.submitter.name }}
                </template>
            </Column>
            <Column filterField="assignee.name" header="Assignee" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.assignee.name }}
                </template>
            </Column>
            <Column field="status" header="Status" :filterMenuStyle="{ width: '14rem' }" style="min-width: 8rem">
                <template #body="{ data }">
                    <TicketStatusBadge :value="data.status" :inline="true" />
                </template>
            </Column>
            <Column field="priority" header="Priority" :filterMenuStyle="{ width: '14rem' }" style="min-width: 8rem">
                <template #body="{ data }">
                    <TicketPriorityBadge :value="data.priority" :inline="true" />
                </template>
            </Column>
            <Column v-if="props.project" field="project" header="Project" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.project.name }}
                </template>
            </Column>
        </DataTable>
    </div>
</template>
