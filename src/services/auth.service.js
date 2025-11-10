import axios from 'axios'
import { API_URL } from '@/config/api.config'
import api from './api'
import store from '@/store'

class AuthService {
    async login(user) {
        const response = await api.post(`${API_URL}/login`, user, { withCredentials: true })

        if (response.data.status === 'success') {
            localStorage.setItem('user', JSON.stringify(response.data.user_id))
            localStorage.setItem('token', response.data.token_info.token)
            await store.dispatch('user/fetchUser')
        }
        return response.data
    }
    
    async logout() {
        try {
            await api.get(`${API_URL}/logout`)
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('userInfo')
            sessionStorage.clear()
        } catch (e) {
            console.error('Ошибка logout', e)
        }
    }

    async register(user) {
        const response = await api.post(`${API_URL}/registration`, user, { withCredentials: true })
        if (response.data.status === 'success') {
            localStorage.setItem('user', JSON.stringify(response.data.user_id))
            localStorage.setItem('token', response.data.token_info.token)
            await store.dispatch('user/fetchUser')
        }
        return response.data
    }

    async refreshToken() {
        try {
            const response = await axios.post(`${API_URL}/refresh`, null, {
                withCredentials: true,
                timeout: 5000,
            })

            if (response.data.token_info.token) {
                localStorage.setItem('token', response.data.token_info.token)
            }
            return response.data
        } catch (error) {
            console.error('Ошибка refreshToken:', error)
            throw error
        }
    }
}

export default new AuthService()
