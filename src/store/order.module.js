import { API_URL } from '@/config/api.config'
import router from '@/router'
import api from '@/services/api'

const savedOrders = sessionStorage.getItem('orders')
const savedDetailOrder = sessionStorage.getItem('detailOrder')

export const order = {
    namespaced: true,
    state: {
        showModal: false,
        isLoading: false,
        orders: savedOrders ? JSON.parse(savedOrders) : null,
        detailOrder: null,
    },
    mutations: {
        // setPackages(state, packages) {
        //     state.packages = packages
        // },
        setShowModal(state, showModal) {
            state.showModal = showModal
        },
        setIsLoading(state, isLoading) {
            state.isLoading = isLoading
        },
        setOrders(state, orders) {
            state.orders = orders
            sessionStorage.setItem('orders', JSON.stringify(orders))
        },
        setDetailOrder(state, orderInfo) {
            state.detailOrder = orderInfo
            sessionStorage.setItem('detailOrder', JSON.stringify(orderInfo))
        },
    },
    actions: {
        async historyOrders({ commit }) {
            try {
                commit('setIsLoading', true)
                document.documentElement.classList.add('pp-overflow')
                const response = await api.get(`${API_URL}/order/get-orders-for-history`)
                commit('setOrders', response.data.orders_info)
            } catch (e) {
                console.log('Ошибка получения истории заказов', e)
            } finally {
                commit('setIsLoading', false)
                document.documentElement.classList.remove('pp-overflow')
            }
        },
        async detailOrderInfo({ commit }, order_id) {
            try {
                commit('setIsLoading', true)
                document.documentElement.classList.add('pp-overflow')
                const response = await api.get(`${API_URL}/order/get-details-of-order`, {
                    params: {
                        order_id: order_id,
                    },
                })
                commit('setDetailOrder', response.data.order_info)
            } catch (e) {
                console.log('Ошибка получения детальной информации о заказе', e)
            } finally {
                commit('setIsLoading', false)
                document.documentElement.classList.remove('pp-overflow')
            }
        },
        async deleteOrder({ commit }, order_id) {
            try {
                commit('setIsLoading', true)
                document.documentElement.classList.add('pp-overflow')
                const response = await api.delete('/order/cancel-order', {
                    params: {
                        order_id: order_id,
                    },
                })
            } catch (e) {
                console.log('Ошибка удаления заказа', e)
            } finally {
                commit('setIsLoading', false)
                document.documentElement.classList.remove('pp-overflow')
                router.push('/history')
            }
        },
        showModal({ commit }, showModal) {
            commit('setShowModal', showModal)
            if (showModal) {
                document.documentElement.classList.add('pp-overflow')
            } else {
                document.documentElement.classList.remove('pp-overflow')
            }
        },
    },
    getters: {
        showModal: (state) => state.showModal,
        isLoading: (state) => state.isLoading,
        orders: (state) => state.orders,
        detailOrder: (state) => state.detailOrder,
        statusClass: () => (status) => {
            switch (status) {
                case 'Создан':
                    return 'created'
                case 'Вручен':
                    return 'delivered'
                case 'Отменен':
                    return 'delited'
                default:
                    return 'default'
            }
        },
    },
}
