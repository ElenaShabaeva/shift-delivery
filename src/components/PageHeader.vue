<template>
    <header class="page-header">
        <div class="page-header__container">
            <nav class="page-header__nav">
                <router-link class="page-header__logo" to="/">
                    <div class="page-header__logo-icon">
                        <SvgLogo />
                    </div>

                    Шифт Delivery
                </router-link>
                <router-link
                    class="page-header__link paragraph-16-regular"
                    v-for="(link, index) in navLinks"
                    :key="index"
                    :to="link.to"
                >
                    <component :is="link.icon" class="page-header__link-icon"></component>
                    {{ link.title }}
                </router-link>
                <router-link
                    class="page-header__link paragraph-16-regular"
                    to="/login"
                    @click="handleLogout"
                >
                    <SvgExit class="page-header__link-icon" />
                    Выйти
                </router-link>
            </nav>
        </div>
    </header>
</template>

<script>
import { mapActions } from 'vuex'

import SvgExit from '@/assets/svg/SvgExit.vue'
import SvgLogo from '@/assets/svg/SvgLogo.vue'

export default {
    components: { SvgLogo, SvgExit },
    props: {
        navLinks: {
            type: Array,
            required: true,
        },
    },
    methods: {
        ...mapActions('auth', ['logout']),
        handleLogout() {
            this.logout()
            this.$router.push('/login')
        },
    },
}
</script>

<style lang="less">
.page-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    background-color: @white;
    padding-block: 24px;

    &__container {
        margin: 0 auto;
        max-width: 960px;
        width: 100%;
    }

    &__nav {
        display: flex;
        gap: 32px;
        align-items: center;
    }

    &__logo {
        display: flex;
        gap: 8px;
        max-width: 106px;
        width: 100%;
        color: @text-brand;
        text-transform: uppercase;
        font-family: @font2;
        font-weight: 600;
        font-size: 15px;
    }

    &__logo-icon {
        width: 35px;
        height: 35px;
    }

    &__link {
        display: flex;
        gap: 16px;
        align-items: center;
        transition: all 0.3s;

        &:last-child {
            margin-left: auto;
        }

        &:hover {
            @media (hover: hover) {
                color: @text-brand;
            }
        }

        &:active,
        &--active,
        &.router-link-exact-active {
            color: @text-brand;
        }
    }

    &__link-icon {
        width: 24px;
        height: 24px;
    }
}
</style>
