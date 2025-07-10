import store from '@/store'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/AuthPage.vue'),
            meta: { requiresAuth: false },
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/pages/RegistPage.vue'),
            meta: { requiresAuth: false },
        },
        {
            path: '/',
            name: 'main',
            component: () => import('@/pages/MainPage.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/profile/:id',
            name: 'profile',
            component: () => import('@/pages/profile/[id].vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/delivery/step/:stepNumber',
            name: 'delivery',
            component: () => import('@/pages/DeliveryPage.vue'),
            props: (route) => ({ currentStep: Number(route.params.stepNumber) }),
        },
    ],
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = store.getters['auth/isLoggedIn']

    if (!isLoggedIn && to.name !== 'login' && to.name !== 'register') {
        next({ name: 'login', query: { redirect: to.fullPath } })
    } else if (isLoggedIn && (to.name === 'login' || to.name === 'register')) {
        next({ name: 'main' })
    } else {
        next()
    }
})

export default router
