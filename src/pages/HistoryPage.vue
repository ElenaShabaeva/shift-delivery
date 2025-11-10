<template>
    <div class="history">
        <div class="history__container container">
            <h2 class="h2">История</h2>
            <table class="table">
                <thead class="table__thead">
                    <tr class="table__thead-tr">
                        <th class="table__thead-th paragraph-14-regular">Номер заказа</th>
                        <th class="table__thead-th paragraph-14-regular">Адрес доставки</th>
                        <th class="table__thead-th paragraph-14-regular">Статус заказа</th>
                        <th class="table__thead-th"></th>
                    </tr>
                </thead>
                <tbody class="table__tbody">
                    <tr class="table__tbody-tr" v-for="order in historyOrders" :key="order.id">
                        <td class="table__tbody-td">{{ order.id }}</td>
                        <td class="table__tbody-td">{{ order.destination_address }}</td>
                        <td class="table__tbody-td table__tbody-td--status">
                            <span
                                class="marker"
                                :class="[`marker--${getStatusClass(order.status)}`]"
                            ></span>
                            {{ order.status }}
                        </td>
                        <td class="table__tbody-td">
                            <router-link
                                class="paragraph-12-regular-light"
                                :to="
                                    order.id
                                        ? { name: 'detail', params: { id: order.id } }
                                        : '/login'
                                "
                            >
                                Подробнее
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <my-loading :title="loadingTitle" v-if="isLoading" />
</template>

<script>
export default {
    data(){
        return {
            loadingTitle: 'Идет загрузка истории',
        }
    },
    methods: {
        getStatusClass(status) {
            return this.$store.getters['order/statusClass'](status)
        },
    },
    computed: {
        historyOrders() {
            return this.$store.getters['order/orders']
        },
    },
    mounted() {
        this.$store.dispatch('order/historyOrders')
    },
}
</script>

<style lang="less">
.history {
    &__container {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
}
</style>
