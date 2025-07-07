import authService from '@/services/auth.service'

const userStr = localStorage.getItem('user');

let user = null;

try {
  if (userStr && userStr !== 'undefined') {
    user = JSON.parse(userStr);
  }
} catch (e) {
  console.error('Ошибка парсинга user из localStorage', e);
  user = null;
}

const token = localStorage.getItem('token')

const initialState =
    user && token
        ? { status: { loggedIn: true }, user, token }
        : { status: { loggedIn: false }, user: null, token: null }


export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, credentials) {
            return authService.login(credentials).then(
                (data) => {
                    commit('loginSuccess', data)
                    return Promise.resolve(data)
                },
                (error) => {
                    commit('loginFailure')
                    return Promise.reject(error)
                },
            )
        },
        logout({ commit }) {
            authService.logout()
            commit('logout')
        },
        register({ commit }, user) {
            return authService.register(user).then(
                (data) => {
                    commit('registerSuccess', data)
                    return Promise.resolve(data)
                },
                (error) => {
                    commit('registerFailure')
                    return Promise.reject(error)
                },
            )
        },
        refreshToken({ commit }) {
            return authService.refreshToken().then(
                (data) => {
                    commit('refreshTokenSuccess', data.token_info.token)
                    return Promise.resolve(data.token_info.token)
                },
                (error) => {
                    commit('logout')
                    return Promise.reject(error)
                },
            )
        },
    },
    mutations: {
        loginSuccess(state, data) {
            state.status.loggedIn = true
            state.user = data.user
            state.token = data.token_info.token
        },
        loginFailure(state) {
            state.status.loggedIn = false
            state.user = null
            state.token = null
        },
        logout(state) {
            state.status.loggedIn = false
            state.user = null
            state.token = null
        },
        registerSuccess(state, data) {
            state.status.loggedIn = true
            state.user = data.user
            state.token = data.token_info.token
        },
        registerFailure(state) {
            state.status.loggedIn = false
            state.user = null
            state.token = null
        },
        refreshTokenSuccess(state, token) {
            state.token = token
            state.status.loggedIn = true
        },
    },
    getters: {
        isLoggedIn: (state) => state.status.loggedIn,
        getToken: (state) => state.token,
        getUser: (state) => state.user,
    },
}