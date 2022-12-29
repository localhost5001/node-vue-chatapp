import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: () => import('@/pages/home.vue') },
    { path: '/room', component: () => import('@/pages/room.vue') },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
