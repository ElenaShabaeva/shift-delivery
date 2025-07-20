import { API_URL } from '@/config/api.config'
import axios from 'axios'
import store from '.'
import router from '@/router'

const savedDeliveryMethods = sessionStorage.getItem('deliveryMethods')

export const main = {
    namespaced: true,
    state: {
        cities: [],
        packages: [],
        showModal: false,
        deliveryMethods: savedDeliveryMethods ? JSON.parse(savedDeliveryMethods) : null,
    },
    mutations: {
        setCities(state, cities) {
            state.cities = cities
        },
        setPackages(state, packages) {
            state.packages = packages
        },
        setShowModal(state, showModal) {
            state.showModal = showModal
        },
        setDeliveryMethods(state, deliveryMethods) {
            state.deliveryMethods = deliveryMethods
            sessionStorage.setItem('deliveryMethods', JSON.stringify(deliveryMethods))
        },
    },
    actions: {
        async fetchCities({ commit }) {
            try {
                const response = await axios.get(`${API_URL}/city/get-all-cities`)
                commit('setCities', response.data.cities)
            } catch {
                console.log('Ошибка получения списка городов')
            }
        },
        async fetchPackages({ commit }) {
            try {
                const response = await axios.get(`${API_URL}/package/all-packages`)
                commit('setPackages', response.data.packages)
            } catch (e) {
                console.log('Ошибка получения списка упаковок ', e)
            }
        },
        async fetchAll({ dispatch }) {
            await Promise.all([dispatch('fetchCities'), dispatch('fetchPackages')])
        },
        async calcDelivery({ commit }, { idSendingCity, idDestinationCity, idPackage }) {
            if (!store.getters['user/isProfileComplete']) {
                commit('setShowModal', true)
                document.documentElement.classList.add('pp-overflow')
            } else {
                const response = await axios.get(`${API_URL}/delivery/get-delivery-types`, {
                    params: {
                        from_city_id: idSendingCity,
                        to_city_id: idDestinationCity,
                    },
                })
                commit('setDeliveryMethods', response.data.delivery_types)
                router.push('/delivery/step/1')
                sessionStorage.setItem('idPackage', idPackage)
            }
        },
        closeModal({ commit }) {
            commit('setShowModal', false)
            document.documentElement.classList.remove('pp-overflow')
        },
        inProfileFromModal({ commit }) {
            const userIdRaw = localStorage.getItem('user')
            let userId = null
            try {
                userId = userIdRaw ? JSON.parse(userIdRaw) : null
            } catch {
                userId = userIdRaw
            }
            commit('setShowModal', false)
            document.documentElement.classList.remove('pp-overflow')
            router.push(userId ? { name: 'profile', params: { id: userId } } : '/login')
        },
        chooseDeliveryType({ commit }, idDeliveryType) {
            router.push('/delivery/step/2')
            sessionStorage.setItem('idDeliveryType', idDeliveryType)
        },
    },
    getters: {
        cities: (state) => state.cities,
        packages: (state) => state.packages,
        showModal: (state) => state.showModal,
        deliveryMethods: (state) => state.deliveryMethods
    },
}
