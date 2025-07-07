<template>
    <div class="calc">
        <div class="calc__container container">
            <div class="calc__hero">
                <div class="calc__title">
                    <h1 class="h1">Мы доставим ваш заказ</h1>
                    <p class="calc__description">Отправляйте посылки в приложении Шифт Delivery</p>
                </div>
                <div class="calc__content">
                    <svg-logo class="calc__logo" />
                    <svg-qr />
                    <span class="paragraph-16-regular">Наведите камеру телефона на QR‑код</span>
                </div>
            </div>
            <form @submit.prevent class="calc__form">
                <h3 class="h3">Рассчитать доставку</h3>
                <div class="form__list">
                    <label class="form__field">
                        <span class="form__label paragraph-14-regular">Город отправки</span>
                        <my-select-city :options="cities" v-model="idSendingCity"
                            ><svg-pin
                        /></my-select-city>
                    </label>
                    <label class="form__field">
                        <span class="form__label paragraph-14-regular">Город назначения</span>
                        <my-select-city :options="cities" v-model="idDestinationCity"
                            ><svg-plan
                        /></my-select-city>
                    </label>
                    <label class="form__field">
                        <span class="form__label paragraph-14-regular">Размер посылки</span>
                        <my-select-package :packages="packages" v-model="idPackage"
                            ><svg-pack
                        /></my-select-package>
                    </label>
                </div>
                <my-button :button-color="true" :button-disabled="!isFormValid" class="calc__button">Рассчитать</my-button>
            </form>
        </div>
    </div>
    <!-- <div v-if="showModal" >
      Заполните все обязательные поля в профиле
    </div> -->
</template>

<script>
import SvgLogo from '@/assets/svg/SvgLogo.vue'
import SvgPack from '@/assets/svg/SvgPack.vue'
import SvgPin from '@/assets/svg/SvgPin.vue'
import SvgPlan from '@/assets/svg/SvgPlan.vue'
import SvgQr from '@/assets/svg/SvgQr.vue'
import MyButton from '@/components/UI/MyButton.vue'

export default {
    components: { MyButton, SvgPin, SvgPack, SvgPlan, SvgLogo, SvgQr },
    data() {
        return {
            idSendingCity: '',
            idDestinationCity: '',
            idPackage: '',
            showModal: false
        }
    },
    methods:{
        // send(){
        //     if (!this.$store.getters['user/isProfileComplete']){
        //         this.showModal = true
        //     }
        //     else {
        //         console.log("Профиль заполнен");
        //     }
        // }
    },
    computed: {
        cities() {
            return this.$store.getters['delivery/cities']
        },
        packages() {
            return this.$store.getters['delivery/packages']
        },
        isFormValid() {
            return this.idSendingCity && this.idDestinationCity && this.idPackage
        },
        // isProfileComplete() {
            
        // },
    },
    mounted() {
        this.$store.dispatch('delivery/fetchAll')
    },
}
</script>

<style lang="less">
.calc {
    &__container {
        padding-block: 113px;
        display: grid;
        grid-template-columns: 380px 500px;
        gap: 80px;
    }

    &__hero {
        display: flex;
        flex-direction: column;
        padding-top: 30px;
        gap: 40px;
    }

    &__title {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    &__description {
        font-family: @font1;
        font-weight: 300;
        font-size: 24px;
        line-height: 1.33;
        color: @text-tertiary;
    }

    &__content {
        display: grid;
        grid-template-columns: repeat(2, 64px) 1fr;
        gap: 16px;
        align-items: center;
        padding: 16px;
        background-color: @white;
        border-radius: 16px;
    }

    &__logo {
        width: 64px;
        height: 64px;
    }

    &__form {
        padding: 32px 72px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        align-items: center;
        width: 100%;
        background-color: @white;
        border-radius: 24px;
    }

    &__button {
        width: 100%;
    }
}
</style>
