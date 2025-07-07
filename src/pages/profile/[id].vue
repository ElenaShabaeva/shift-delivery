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
        </div>
    </div>
    <div v-if="showSuccessModal" @close="closeModal">
      Данные успешно обновлены!
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
            showSuccessModal: false,
        }
    },
    methods: {
        updateUserInfo() {
            this.$store
                .dispatch('user/updateUserInfo', this.user)
                .then((data) => {
                    if (data.status === 'success') {
                        this.showSuccessModal = true
                    } else {
                        console.log('Не удалось обновить данные', data)
                    }
                })
                .catch((e) => {
                    console.log('Ошибка при  обновлении данных', e)
                })
        },
        closeModal() {
            this.showSuccessModal = false
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
        padding-top: 48px;
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    &__form {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
        padding: 32px;
        background-color: @white;
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
}
</style>
