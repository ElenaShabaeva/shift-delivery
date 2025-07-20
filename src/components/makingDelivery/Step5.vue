<template>
    <div class="step">
        <form @submit.prevent class="form">
            <div class="form__list">
                <label class="form__field">
                    <span class="paragraph-14-regular">Улица</span>
                    <my-input
                        type="text"
                        required="true"
                        placeholder="Улица"
                        v-model="form.street"
                    ></my-input>
                </label>
                <label class="form__field">
                    <span class="paragraph-14-regular">Дом</span>
                    <my-input
                        type="text"
                        required="true"
                        placeholder="Дом"
                        v-model="form.houseNumber"
                    ></my-input>
                </label>
                <label class="form__field">
                    <span class="paragraph-14-regular">Номер квартиры</span>
                    <my-input
                        type="text"
                        required="true"
                        placeholder="Номер квартиры"
                        v-model="form.apartmentNumber"
                    ></my-input>
                </label>
                <label class="form__field">
                    <span class="paragraph-14-regular">Заметки для курьера</span>
                    <my-input
                        type="text"
                        placeholder="Заметки для курьера"
                        v-model="form.noteToTheCourier"
                    ></my-input>
                </label>
                <div class="form__check">
                    <my-checkbox v-model="form.toTheDoor"></my-checkbox>
                    <span class="form__check-label">Оставить заказ у двери</span>
                    <div class="help">
                        <svg-help class="help__icon" />
                        <div class="help__dropdown">
                            <span class="paragraph-12-regular-dark">Бесконтактная доставка</span>
                            <span class="paragraph-12-regular-light"
                                >Курьер привозит заказ, оставляет его у двери и уходит, а вам
                                приходит уведомление на телефон о том, что заказ доставлен</span
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div class="form__btns">
                <my-button type="button" :button-border="true" @click="prev">Назад</my-button>
                <my-button type="button" :button-color="true" @click="next">Продолжить</my-button>
            </div>
        </form>
    </div>
</template>

<script>
import SvgHelp from '@/assets/svg/SvgHelp.vue'

export default {
    components: {
        SvgHelp,
    },
    data() {
        return {
            form: {
                street: '',
                houseNumber: '',
                apartmentNumber: '',
                noteToTheCourier: '',
                toTheDoor: false,
            },
        }
    },
    methods: {
        prev() {
            this.$emit('prev')
        },
        next() {
            this.$emit('next')
        },
    },
    created() {
        const destinationCity = this.$store.getters['delivery/deliveryInfo']?.destinationCity
        if (destinationCity) {
            this.form = { ...destinationCity }
        }
    },
    watch: {
        form: {
            handler(newVal) {
                this.$store.dispatch('delivery/updateDestinationCity', newVal)
            },
            deep: true,
        },
    },
    mounted() {
        this.$emit('update-title', 'Куда доставить')
    },
}
</script>