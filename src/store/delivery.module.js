import { API_URL } from "@/config/api.config"
import axios from "axios"

export const delivery = {
    namespaced: true,
    state: {
        cities: [],
        packages: [],
    },
    mutations: {
        setCities(state, cities) {
            state.cities = cities
        },
        setPackages(state, packages) {
            state.packages = packages
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
            } catch(e) {
                console.log('Ошибка получения списка упаковок ', e)
            }
        },
        async fetchAll({ dispatch }) {
            await Promise.all([dispatch('fetchCities'), dispatch('fetchPackages')])
        },
    },
    getters: {
        cities: (state) => state.cities,
        packages: (state) => state.packages,
    },
}
