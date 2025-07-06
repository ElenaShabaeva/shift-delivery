import axios from 'axios'
import { API_URL } from '@/config/api.config'
import api from './api'

class AuthService {
    async login(user) {
        const response = await api.post(`${API_URL}/login`, user, { withCredentials: true })
        console.log(response)

        if (response.data.status === 'success') {
            localStorage.setItem('user', JSON.stringify(response.data.user_id))
            localStorage.setItem('token', response.data.token_info.token)
        }
        return response.data
    }

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    register(user) {
        console.log('regist', user)
        return axios.post(`${API_URL}/registration`, user)
    }

    async refreshToken() {
        try {
            const response = await axios.post(
                `${API_URL}/refresh`,
                null,
                { withCredentials: true, timeout: 5000 },
            )
            if (response.data.access_token) {
                localStorage.setItem('token', response.data.access_token)
            }
            return response.data
        } catch (error) {
            console.error('Ошибка refreshToken:', error)
            throw error
        }
    }
}

export default new AuthService()
