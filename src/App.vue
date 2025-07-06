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

export default {
    components: {
        PageHeader,
    },
    data() {
        return {
            navLinks: [
                { title: 'Профиль', to: '/', icon: SvgUser },
                { title: 'История', to: '/', icon: SvgHistory },
                { title: 'Выйти', to: '/', icon: SvgExit },
            ],
            isLoggedIn: null,
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
