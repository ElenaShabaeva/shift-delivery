<template>
    <div class="step">
        <form @submit.prevent class="form">
            <div class="form__list">
                <div class="form__check">
                    <my-radio name="payer" value="recipient" v-model="payer"></my-radio>
                    <span class="form__check-label paragraph-16-regular">Получатель</span>
                </div>
                <div class="form__check">
                    <my-radio name="payer" value="sender" v-model="payer"></my-radio>
                    <span class="form__check-label paragraph-16-regular">Отправитель</span>
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
            payer: '',
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
        const payer = this.$store.getters['delivery/deliveryInfo']?.payer
        if (payer) {
            this.payer = payer
        }
    },
    watch: {
        payer(newVal) {
            this.$store.dispatch('delivery/updatePayer', newVal)
        },
    },
    mounted() {
        this.$emit('update-title', 'Оплата доставки')
    },
}
</script>