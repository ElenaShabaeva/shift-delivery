<template>
    <div class="auth">
        <div class="auth__wrapper">
            <h3 class="auth__title h3">С возвращением</h3>
            <form @submit.prevent class="auth__form">
                <div class="auth__form-list">
                    <label class="form__field">
                        <span class="paragraph-14-regular">Email</span>
                        <my-input
                            type="email"
                            required="true"
                            placeholder="Email"
                            v-model="authForm.email"
                        ></my-input>
                    </label>
                    <label class="form__field">
                        <span class="paragraph-14-regular">Пароль</span>
                        <my-input
                            type="password"
                            required="true"
                            placeholder="Пароль"
                            v-model="authForm.password"
                        ></my-input>
                    </label>
                </div>
                <my-button :buttonColor="true" @click="handleLogin">Войти</my-button>
            </form>
            <router-link to="/register" class="auth__link">Еще нет аккаунта?</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            authForm: {
                email: '',
                password: '',
            },
        }
    },
    methods: {
        handleLogin() {
            this.$store
                .dispatch('auth/login', this.authForm)
                .then(() => {
                    this.$router.push('/main')
                })
        },
    },
}
</script>

<style lang="less">
.auth {
    display: flex;
    flex-direction: column;
    gap: 40px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // padding: 90px 100px 50px;
    background-color: fade(@text-primary, 30%);
    overflow-y: auto;
    z-index: 110;

    &__wrapper {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 40px;
        width: 100%;
        max-width: 544px;
        margin: auto;
        background-color: @bg-primary;
        padding: 20px 72px 40px;
        border-radius: 24px;
    }

    &__title {
        position: relative;
        padding-top: 84px;

        &::after {
            content: '';
            position: absolute;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: linear-gradient(#ade3fa, #4886e8);
            top: 0;
            left: calc(50% - 28px);
        }
    }

    &__form {
        display: flex;
        flex-direction: column;
        padding-inline: 36px;
        gap: 32px;
        width: 100%;
    }

    &__form-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    &__link{
        color: @text-brand;
        transition: all 0.3s;

        &:hover{
            @media(hover: hover){
                color: @bg-hover;
            }
        }
    }
}
</style>
