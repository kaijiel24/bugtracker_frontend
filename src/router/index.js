import { createRouter, createWebHistory } from 'vue-router';
import checkAuth from '@/router/middleware'
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue'),
                    meta: { authorize: [] }
                },
                {
                    path: '/pages/manageusers',
                    name: 'manageusers',
                    component: () => import('@/views/pages/ManageUsers.vue'),
                    meta: { authorize: ['admin'] }
                },
                {
                    path: '/pages/projects',
                    name: 'projects',
                    component: () => import('@/views/pages/Projects.vue'),
                    meta: { authorize: [] }
                },
                {
                    path: '/pages/project/:id',
                    name: 'project',
                    props: (route) => {
                        const id = Number.parseInt(route.params.id);
                        return { id }
                    },
                    component: () => import('@/views/pages/Project.vue'),
                    meta: { authorize: [] }
                },
                {
                    path: '/pages/createproject',
                    name: 'createproject',
                    component: () => import('@/views/pages/CreateProject.vue'),
                    meta: { authorize: [] }
                },
                {
                    path: '/pages/tickets',
                    name: 'tickets',
                    component: () => import('@/views/pages/Tickets.vue'),
                    meta: { authorize: [] }
                },
                {
                    path: '/pages/ticket/:id',
                    name: 'ticket',
                    props: (route) => {
                        const id = Number.parseInt(route.params.id);
                        return { id }
                    },
                    component: () => import('@/views/pages/Ticket.vue'),
                    meta: { authorize: [] }
                },
                {
                    path: '/pages/createticket',
                    name: 'createticket',
                    component: () => import('@/views/pages/CreateTicket.vue'),
                    meta: { authorize: [] }
                },
            ]
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
    ]
});

router.beforeEach(checkAuth)

export default router;
