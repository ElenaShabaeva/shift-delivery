<template>
    <div class="edit">
        <div class="edit__container">
            <h3 class="h3">{{ title }}</h3>
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
                    <my-button type="button" :button-border="true" @click="closeModal"
                        >Отменить</my-button
                    >
                    <my-button type="button" :button-color="true" @click="save"
                        >Сохранить</my-button
                    >
                </div>
        </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
        section: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            form: {
                street: '',
                houseNumber: '',
                apartmentNumber: '',
                noteToTheCourier: '',
            },
            originalForm: null,
        }
    },
    created() {
        if (this.data) {
            this.form = { ...this.data }
            this.originalForm = { ...this.data }
        }
    },
    methods: {
        closeModal() {
            this.resetForm()
            this.$store.dispatch('delivery/showModal', false)
        },
        save() {
            if (this.section === 'Откуда забрать') {
                this.$store.dispatch('delivery/updateSendingCity', this.form)
            }
            if (this.section === 'Куда доставить') {
                this.$store.dispatch('delivery/updateDestinationCity', this.form)
            }
            this.originalForm = { ...this.form }
            this.$store.dispatch('delivery/showModal', false)
        },
        resetForm() {
            this.form = { ...this.originalForm }
        },
    },
    computed: {
        title() {
            return this.section
        },
    },
}
</script>

<style lang="less">
.edit {
    background-color: fade(@text-primary, 85%);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 110;

    &__container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin: 150px auto;
        border-radius: 24px;
        background-color: @white;
        max-width: 544px;
        width: 100%;
        padding: 30px;
    }
}
</style>
