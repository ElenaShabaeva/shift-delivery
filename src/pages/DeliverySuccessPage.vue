<template>
    <div class="detail">
        <div class="detail__container container">
            <div class="detail__title">
                <div class="detail__title-icon">
                    <svg-success />
                </div>
                <h2 class="h2 detail__title">Заявка отправлена</h2>
            </div>
            <div class="detail__order">
                <div class="detail__order-info">
                    <span class="paragraph-12-regular-light">Номер заказа</span>
                    <span>{{ successOrder.id }}</span>
                </div>
                <div class="detail__order-info">
                    <span class="paragraph-12-regular-light">Статус</span>
                    <div class="detail__order-info-status">
                        <span
                            class="marker"
                            :class="[`marker--${getStatusClass(successOrder.status)}`]"
                        ></span>
                        <span>{{ successOrder.status }}</span>
                    </div>
                </div>
                <div class="detail__order-info">
                    <span class="paragraph-12-regular-light">Адрес доставки</span>
                    <span>{{ successOrder.destination_address }}</span>
                </div>
                <div class="detail__order-info">
                    <span class="paragraph-12-regular-light">Тип доставки</span>
                    <span>{{ successOrder.delivery_type_name }}</span>
                </div>
                <span class="paragraph-14-regular">Вся информация была продублирована в SMS</span>
            </div>
            <div class="detail__btns">
                <my-button type="button" :button-border="true" @click="() => $router.push('/history')">Посмотреть статус</my-button>
                <my-button type="button" :button-color="true" @click="() => $router.push('/')"
                    >На главную</my-button
                >
            </div>
        </div>
    </div>
</template>

<script>
import SvgSuccess from '@/assets/svg/SvgSuccess.vue'

export default {
    components: {
        SvgSuccess,
    },
    methods: {
        getStatusClass(status) {
            return this.$store.getters['order/statusClass'](status)
        },
    },
    computed: {
        successOrder() {
            return this.$store.getters['delivery/successOrder']
        },
    },
}
</script>

<style lang="less">
.detail {
    &__container {
        max-width: 600px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    &__order-info-status{
        display: flex;
        align-items: center;
        gap: 12px;
    }
}
</style>
