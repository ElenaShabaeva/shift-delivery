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
            </div>
            <div class="form__btns">
                <my-button type="button" :button-border="true" @click="prev">Назад</my-button>
                <my-button type="button" :button-color="true" @click="next">Продолжить</my-button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                street: '',
                houseNumber: '',
                apartmentNumber: '',
                noteToTheCourier: '',
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
        const sendingCity = this.$store.getters['delivery/deliveryInfo']?.sendingCity
        if (sendingCity) {
            this.form = { ...sendingCity }
        }
    },
    watch: {
        form: {
            handler(newVal) {
                this.$store.dispatch('delivery/updateSendingCity', newVal)
            },
            deep: true,
        },
    },
    mounted() {
        this.$emit('update-title', 'Откуда забрать')
    },
}
</script>