<template>
    <div class="step">
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
                surname: '',
                name: '',
                patronymic: '',
                phone: '',
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
        const sender = this.$store.getters['delivery/deliveryInfo']?.sender
        if (sender) {
            this.form = { ...sender }
        }
    },
    watch: {
        form: {
            handler(newVal) {
                this.$store.dispatch('delivery/updateSender', newVal)
            },
            deep: true,
        },
    },
    mounted() {
        this.$emit('update-title', 'Получатель')
    },
}
</script>