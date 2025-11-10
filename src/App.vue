<template>
    <page-header :navLinks="navLinks" v-if="showHeader"></page-header>
    <router-view></router-view>
</template>

<script>
import store from '@/store'

import SvgExit from '@/assets/svg/SvgExit.vue'
import SvgHistory from '@/assets/svg/SvgHistory.vue'
import SvgUser from '@/assets/svg/SvgUser.vue'
import PageHeader from '@/components/PageHeader.vue'
import { markRaw } from 'vue'

export default {
    components: {
        PageHeader,
    },
    data() {
        return {
            navLinks: [],
            isLoggedIn: true,
        }
    },
    computed: {
        showHeader() {
            const noHeaderRoutes = ['/login', '/register']
            return !noHeaderRoutes.includes(this.$route.path) && this.isLoggedIn
        },
    },
    methods: {
        login() {
            this.isLoggedIn = store.getters['auth/isLoggedIn']

            if (this.isLoggedIn) {
                const userIdRaw = localStorage.getItem('user')
                let userId = null
                try {
                    userId = userIdRaw ? JSON.parse(userIdRaw) : null
                } catch {
                    userId = userIdRaw
                }

                this.navLinks = [
                    {
                        title: 'Профиль',
                        to: userId ? { name: 'profile', params: { id: userId } } : '/login',
                        icon: markRaw(SvgUser),
                    },
                    { title: 'История', to: '/history', icon: markRaw(SvgHistory) },
                ]
            } else {
                this.navLinks = []
            }
        },
    },
    watch: {
        '$route.path'() {
            this.login()
        },
    },
    mounted() {
        this.login()
    },
}
</script>
