import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { API_URL } from '@/config/api.config'

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

let isRefresh = false
let failedQueue = []

const processQueue = (error, token = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error)
        } else {
            promise.resolve(token)
        }
    })

    failedQueue = []
}

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    (error) => Promise.reject(error),
)

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response && error.response.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefresh) {
        try {
          const token = await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
          originalRequest.headers['Authorization'] = 'Bearer ' + token
          return api(originalRequest)
        } catch (err) {
          return Promise.reject(err)
        }
      }

      originalRequest._retry = true
      isRefresh = true

      return new Promise((resolve, reject) => {
        store.dispatch('auth/refreshToken')
          .then(token => {
            
            api.defaults.headers.common['Authorization'] = 'Bearer ' + token
            originalRequest.headers['Authorization'] = 'Bearer ' + token

            processQueue(null, token)
            resolve(api(originalRequest))
          })
          .catch(err => {
            processQueue(err, null)
            store.dispatch('auth/logout')
            router.push({ name: 'login' })
            reject(err)
          })
          .finally(() => {
            isRefresh = false
          })
      })
    }

    return Promise.reject(error)
  }
)

export default api