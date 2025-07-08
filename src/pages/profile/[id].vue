<template>
    <div class="profile">
        <div class="profile__container container">
            <h2 class="h2">Профиль</h2>
            <form @submit.prevent class="profile__form form">
                <div class="form__list">
                    <label class="form__field">
                        <span class="paragraph-14-regular profile__input">Фамилия</span>
                        <my-input
                            type="email"
                            required="true"
                            placeholder="Email"
                            v-model="user.last_name"
                        ></my-input>
                    </label>
                    <label class="form__field">
                        <span class="paragraph-14-regular profile__input">Имя</span>
                        <my-input
                            type="email"
                            required="true"
                            placeholder="Имя"
                            v-model="user.first_name"
                        ></my-input>
                    </label>
                    <label class="form__field">
                        <span class="paragraph-14-regular">Отчество</span>
                        <my-input
                            type="email"
                            required="true"
                            placeholder="Отчество"
                            v-model="user.middle_name"
                        ></my-input>
                    </label>
                </div>
                <div class="form__list">
                    <label class="form__field">
                        <span class="paragraph-14-regular">Телефон</span>
                        <my-input
                            type="email"
                            required="true"
                            placeholder="Телефон"
                            v-model="user.phone_number"
                        ></my-input>
                    </label>
                    <label class="form__field">
                        <span class="paragraph-14-regular">Email</span>
                        <my-input
                            type="email"
                            required="true"
                            placeholder="Email"
                            :disabled="true"
                            v-model="user.email"
                        ></my-input>
                    </label>
                    <label class="form__field">
                        <span class="paragraph-14-regular profile__input">Город</span>
                        <my-select-city
                            class="profile__select"
                            :options="cities"
                            v-model="user.city_id"
                        ></my-select-city>
                    </label>
                </div>
            </form>
            <my-button
                class="profile__button"
                :button-color="true"
                :button-disabled="!isFormValid"
                @click="updateUserInfo"
                >Обновить данные</my-button
            >
            <TransitionGroup name="modal">
                <div class="profile__modal" v-if="showModal">Данные успешно обновлены!</div>
            </TransitionGroup>
        </div>
    </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
    data() {
        return {
            user: {
                last_name: '',
                first_name: '',
                middle_name: '',
                phone_number: '',
                email: '',
                city_id: '',
            },
        }
    },
    methods: {
        updateUserInfo() {
            this.$store.dispatch('user/updateUserInfo', this.user)
        },
        userInfo() {
            const userInfo = this.$store.getters['user/user']
            if (userInfo) {
                this.user = cloneDeep(userInfo)
                this.user.city_id = userInfo.city_info?.id || null
            }
        },
    },
    computed: {
        isFormValid() {
            return this.user.last_name && this.user.first_name && this.user.city_id
        },
        cities() {
            return this.$store.getters['delivery/cities']
        },
        showModal() {
            return this.$store.getters['user/showModal']
        },
    },
    mounted() {
        this.userInfo()
        this.$store.dispatch('delivery/fetchAll')
    },
}
</script>

<style lang="less">
.profile {
    &__container {
        position: relative;
    }

    &__form {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
        padding: 32px;
        background-color: @white;
        border-radius: 24px;
    }

    &__input {
        position: relative;
        margin-left: 6px;

        &::before {
            position: absolute;
            content: '*';
            width: 4px;
            height: 4px;
            color: @indicator-error;
            top: 0;
            left: -7px;
        }
    }

    &__button {
        width: 330px;
        margin-top: 16px;
    }

    &__modal {
        position: absolute;
        top: 20px;
        right: -268px;
        z-index: 10;
        padding: 10px 20px;
        color: @white;
        background-color: @indicator-positive;
    }
}

.modal-move,
.modal-enter-active,
.modal-leave-active {
    transition: all 0.4s ease;
}
.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: translateY(-50px);
}
</style>
