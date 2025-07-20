<template>
    <div class="edit">
        <div class="edit__container">
            <h3 class="h3">{{ title }}</h3>
            <form @submit.prevent class="form">
                <div class="form__list">
                    <label class="form__field">
                        <span class="paragraph-14-regular">Фамилия</span>
                        <my-input
                            type="text"
                            required="true"
                            placeholder="Фамилия"
                            v-model="form.surname"
                        ></my-input>
                    </label>
                    <label class="form__field">
                        <span class="paragraph-14-regular">Имя</span>
                        <my-input
                            type="text"
                            required="true"
                            placeholder="Имя"
                            v-model="form.name"
                        ></my-input>
                    </label>
                    <label class="form__field">
                        <span class="paragraph-14-regular">Отчество</span>
                        <my-input
                            type="text"
                            placeholder="Отчество"
                            v-model="form.patronymic"
                        ></my-input>
                    </label>
                    <label class="form__field">
                        <span class="paragraph-14-regular">Номер телефона</span>
                        <my-input
                            type="tel"
                            required="true"
                            placeholder="Телефон"
                            v-model="form.phone"
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
                surname: '',
                name: '',
                patronymic: '',
                phone: '',
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
            if(this.section === 'Отправитель'){
                this.$store.dispatch('delivery/updateSender', this.form)
            }
            if(this.section === 'Получатель'){
                this.$store.dispatch('delivery/updateRecipient', this.form)
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
