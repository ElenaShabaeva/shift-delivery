import { API_URL } from "@/config/api.config"
import axios from "axios"
import store from "."
import router from "@/router"

export const delivery = {
    namespaced: true,
    state: {
        cities: [],
        packages: [],
        showModal: false,
    },
    mutations: {
        setCities(state, cities) {
            state.cities = cities
        },
        setPackages(state, packages) {
            state.packages = packages
        },
        setShowModal(state, showModal){
            state.showModal = showModal
        }
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
            } catch(e) {
                console.log('Ошибка получения списка упаковок ', e)
            }
        },
        async fetchAll({ dispatch }) {
            await Promise.all([dispatch('fetchCities'), dispatch('fetchPackages')])
        },
        async calcDelivery({commit}){
            if (!store.getters['user/isProfileComplete']) {
                commit('setShowModal', true)
                document.documentElement.classList.add('pp-overflow')
            } else {
                console.log('Профиль заполнен')
            }
        },
        closeModal({commit}){
            commit('setShowModal', false)
            document.documentElement.classList.remove('pp-overflow')
        },
        inProfileFromModal({commit}){
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
        }
    },
    getters: {
        cities: (state) => state.cities,
        packages: (state) => state.packages,
        showModal: (state) => state.showModal,
    },
}
