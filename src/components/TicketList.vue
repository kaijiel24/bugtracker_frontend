<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { ref } from 'vue';
import TicketStatusBadge from './badge/TicketStatusBadge.vue';
import TicketPriorityBadge from './badge/TicketPriorityBadge.vue';
import TicketTypeBadge from './badge/TicketTypeBadge.vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    rows: Number,
    loading: Boolean,
    tickets: Array,
    project: Boolean
})

const filters = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
const router = useRouter();

const rowClick = (e) => {
    console.log(e.data.id)
    router.push({ name: 'ticket', params: { id: e.data.id } })
}

</script>

<template>
    <DataTable :value="props.tickets" :paginator="true" :rows="props.rows" dataKey="id" :rowHover="true"
        @row-click="rowClick" filterDisplay="menu" :loading="props.loading" :filters="filters" responsiveLayout="scroll"
        :globalFilterField="['name', 'submitter', 'assignees', 'status', 'priority', 'dateCreated', 'dateUpdated', 'type', 'comments']">
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
        <Column filterField="submitter" header="Submitter" style="min-width: 5rem">
            <template #body="{ data }">
                {{ data.submitter }}
            </template>
        </Column>
        <Column field="status" header="Status">
            <template #body="{ data }">
                <TicketStatusBadge :value="data.status" :inline="true" />
            </template>
        </Column>
        <Column field="priority" header="Priority">
            <template #body="{ data }">
                <TicketPriorityBadge :value="data.priority" :inline="true" />
            </template>
        </Column>
        <Column field="type" header="Type">
            <template #body="{ data }">
                <TicketTypeBadge :value="data.type" :inline="true" />
            </template>
        </Column>
        <Column filterField="assignees" header="Assignees">
            <template #body="{ data }">
                <div class="flex justify-content-center">
                    {{ data.assignees }}
                </div>
            </template>
        </Column>
        <Column filterField="comments" header="Comments">
            <template #body="{ data }">
                <div class="flex justify-content-center">
                    {{ data.comments }}
                </div>
            </template>
        </Column>
        <Column v-if="props.project" field="project" header="Project" style="min-width: 10rem">
            <template #body="{ data }">
                {{ data.project }}
            </template>
        </Column>
    </DataTable>
</template>
