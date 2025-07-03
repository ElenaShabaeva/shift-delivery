import axios from 'axios'
import { API_URL } from '@/config/api.config'

class AuthService {
    async login(user) {
        const response = await axios.post(`${API_URL}/login`, user, { withCredentials: true })
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
        const response = await axios.post(`${API_URL}/refresh`, {}, { withCredentials: true })
        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token)
        }
        return response.data
    }
}

export default new AuthService()
