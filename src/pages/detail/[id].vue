<template>
    <div class="detail">
        <div class="detail__container container">
            <h2 class="h2">Детали заказа</h2>
            <div class="detail__order">
                <div class="detail__order-info">
                    <span class="paragraph-12-regular-light">Номер заказа</span>
                    <span>{{ orderInfo?.id }}</span>
                </div>
                <div class="detail__order-info">
                    <span class="paragraph-12-regular-light">Статус</span>
                    <div class="detail__order-info-status">
                        <span
                            class="marker"
                            :class="[`marker--${getStatusClass(orderInfo?.status)}`]"
                        ></span>
                        <span>{{ orderInfo?.status }}</span>
                    </div>
                </div>
                <div class="detail__order-info">
                    <span class="paragraph-12-regular-light">Адрес доставки</span>
                    <span>{{ orderInfo?.destination_address }}</span>
                </div>
                <div class="detail__order-info">
                    <span class="paragraph-12-regular-light">Тип доставки</span>
                    <span>{{ orderInfo?.delivery_type_name }}</span>
                </div>
            </div>
            <div class="detail__btns">
                <my-button type="button" :button-border="true" @click="() => $router.back()"
                    >Назад</my-button
                >
                <my-button type="button" :button-color="true" @click="openModal">Отменить</my-button>
            </div>
        </div>
    </div>
    <my-modal-window v-if="showModal">
        <template #content>
            <div class="modal">
                <h3 class="h3 modal__title">Отменить заказ?</h3>
                <div class="modal__buttons">
                    <my-button :button-border="true" @click="deleteOrder">Отменить</my-button>
                    <my-button :button-color="true" @click="closeModal">Не отменять</my-button>
                </div>
            </div>
        </template>
    </my-modal-window>
    <my-loading :title="loadingTitle" v-if="!showModal && isLoading" />
</template>

<script>
export default {
    data(){
        return {
            loadingTitle: 'Идет загрузка информации о заказе',
        }
    },
    methods: {
        deleteOrder(){
            this.$store.dispatch('order/deleteOrder', this.$route.params.id)
        },
        getStatusClass(status) {
            return this.$store.getters['order/statusClass'](status)
        },
        openModal(){
            return this.$store.dispatch('order/showModal', true)
        },
        closeModal() {
            return this.$store.dispatch('order/showModal', false)
        },
    },
    computed: {
        orderInfo() {
            return this.$store.getters['order/detailOrder']
        },
        showModal() {
            return this.$store.getters['order/showModal']
        },
    },
    mounted() {
        this.$store.dispatch('order/detailOrderInfo', this.$route.params.id)
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

    &__order-info-status {
        display: flex;
        align-items: center;
        gap: 12px;
    }
}
</style>
