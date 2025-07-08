import { API_URL } from '@/config/api.config'
import api from '@/services/api'

const savedUser = localStorage.getItem('userInfo')

export const user = {
    namespaced: true,
    state: {
        user: savedUser ? JSON.parse(savedUser) : null,
        showModal: false,
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            localStorage.setItem('userInfo', JSON.stringify(user))
        },
        clearUser(state) {
            state.user = null
            localStorage.removeItem('userInfo')
        },
        setShowModal(state, showModal) {
            state.showModal = showModal
        },
    },
    actions: {
        async fetchUser({ commit }) {
            try {
                const response = await api.get(`${API_URL}/user/info`)
                commit('setUser', response.data.user_info)
            } catch (e) {
                commit('clearUser')
                console.error('Ошибка загрузки пользователя', e)
            }
        },
        async updateUserInfo({ commit }, userData) {
            try {
                const response = await api.patch(`${API_URL}/user/update-info`, userData, {
                    withCredentials: true,
                })
                commit('setUser', response.data.user_info)
                commit('setShowModal', true)
                setTimeout(() => {
                    commit('setShowModal', false)
                }, 1500)
            } catch (e) {
                commit('clearUser')
                console.error('Ошибка обновления данных', e)
                throw e
            }
        },
        clearUser({ commit }) {
            commit('clearUser')
        },
    },
    getters: {
        user: (state) => state.user,
        isProfileComplete: (state) => {
            if (!state.user) return false
            const { first_name, last_name } = state.user
            const city_id = state.user.city_info?.id
            return Boolean(first_name && last_name && city_id)
        },
        showModal: (state) => state.showModal,
    },
}
