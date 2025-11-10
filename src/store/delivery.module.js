import { API_URL } from '@/config/api.config'
import router from '@/router'
import api from '@/services/api'

const savedDeliveryInfo = sessionStorage.getItem('deliveryInfo')
const savedDeliveryMethods = sessionStorage.getItem('deliveryMethods')
const savedSuccessOrder = sessionStorage.getItem('successOrder')

export const delivery = {
    namespaced: true,
    state: {
        showModal: false,
        isLoading: false,
        deliveryMethods: savedDeliveryMethods ? JSON.parse(savedDeliveryMethods) : null,
        deliveryInfo: savedDeliveryInfo
            ? JSON.parse(savedDeliveryInfo)
            : {
                  idDeliveryType: '',
                  sender: {
                      surname: '',
                      name: '',
                      patronymic: '',
                      phone: '',
                  },
                  recipient: {
                      surname: '',
                      name: '',
                      patronymic: '',
                      phone: '',
                  },
                  sendingCity: {
                      street: '',
                      houseNumber: '',
                      apartmentNumber: '',
                      noteToTheCourier: '',
                  },
                  destinationCity: {
                      street: '',
                      houseNumber: '',
                      apartmentNumber: '',
                      noteToTheCourier: '',
                      toTheDoor: false,
                  },
                  payer: '',
              },
        successOrderInfo: savedSuccessOrder ? JSON.parse(savedSuccessOrder) : null,
    },
    mutations: {
        setShowModal(state, showModal) {
            state.showModal = showModal
            if (showModal) {
                document.documentElement.classList.add('pp-overflow')
            } else {
                document.documentElement.classList.remove('pp-overflow')
            }
        },
        setIsLoading(state, isLoading) {
            state.isLoading = isLoading
        },
        setDeliveryMethods(state, deliveryMethods) {
            state.deliveryMethods = deliveryMethods
            sessionStorage.setItem('deliveryMethods', JSON.stringify(deliveryMethods))
        },
        setSuccessOrder(state, successOrder) {
            state.successOrder = successOrder
            sessionStorage.setItem('successOrder', successOrder)
        },
        async updateDeliveryType(state, idDeliveryTypeDate) {
            const dataForStartCreateOrder = {
                sending_city_id: sessionStorage.getItem('idSendingCity'),
                destination_city_id: sessionStorage.getItem('idDestinationCity'),
                package_id: sessionStorage.getItem('idPackage'),
            }
            const response = await api.post(
                `${API_URL}/order/start-creating-order`,
                dataForStartCreateOrder,
            )
            sessionStorage.setItem('orderId', response.data.order_info.id)

            state.deliveryInfo.idDeliveryType = idDeliveryTypeDate
            sessionStorage.setItem('deliveryInfo', JSON.stringify(state.deliveryInfo))
        },
        updateSender(state, senderData) {
            state.deliveryInfo.sender = { ...state.deliveryInfo.sender, ...senderData }
            sessionStorage.setItem('deliveryInfo', JSON.stringify(state.deliveryInfo))
        },
        updateRecipient(state, recipientData) {
            state.deliveryInfo.recipient = { ...state.deliveryInfo.recipient, ...recipientData }
            sessionStorage.setItem('deliveryInfo', JSON.stringify(state.deliveryInfo))
        },
        updateSendingCity(state, sendingCityData) {
            state.deliveryInfo.sendingCity = {
                ...state.deliveryInfo.sendingCity,
                ...sendingCityData,
            }
            sessionStorage.setItem('deliveryInfo', JSON.stringify(state.deliveryInfo))
        },
        updateDestinationCity(state, destinationCityData) {
            state.deliveryInfo.destinationCity = {
                ...state.deliveryInfo.destinationCity,
                ...destinationCityData,
            }
            sessionStorage.setItem('deliveryInfo', JSON.stringify(state.deliveryInfo))
        },
        updatePayer(state, payerData) {
            state.deliveryInfo.payer = payerData
            sessionStorage.setItem('deliveryInfo', JSON.stringify(state.deliveryInfo))
        },
    },
    actions: {
        showModal({ commit }, showModal) {
            commit('setShowModal', showModal)
        },
        updateDeliveryType({ commit }, idDeliveryTypeDate) {
            commit('updateDeliveryType', idDeliveryTypeDate)
            router.push('/delivery/step/2')
        },
        updateSender({ commit }, senderData) {
            commit('updateSender', senderData)
        },
        updateRecipient({ commit }, recipientData) {
            commit('updateRecipient', recipientData)
        },
        updateSendingCity({ commit }, sendingCityData) {
            commit('updateSendingCity', sendingCityData)
        },
        updateDestinationCity({ commit }, destinationCityData) {
            commit('updateDestinationCity', destinationCityData)
        },
        updatePayer({ commit }, payerData) {
            commit('updatePayer', payerData)
        },
        // async calcDelivery({ commit }, { idSendingCity, idDestinationCity, idPackage }) {
        //     if (!store.getters['user/isProfileComplete']) {
        //         commit('setShowModal', true)
        //         document.documentElement.classList.add('pp-overflow')
        //     } else {
        //         try {
        //             commit('setIsLoading', true)
        //             document.documentElement.classList.add('pp-overflow')
        //             const response = await axios.get(`${API_URL}/delivery/get-delivery-types`, {
        //                 params: {
        //                     from_city_id: idSendingCity,
        //                     to_city_id: idDestinationCity,
        //                 },
        //             })
        //             commit('setDeliveryMethods', response.data.delivery_types)

        //             router.push('/delivery/step/1')
        //             localStorage.setItem('idPackage', idPackage)
        //         } catch (e) {
        //             console.log('Ошибка расчета доставки', e)
        //         } finally {
        //             commit('setIsLoading', false)
        //             document.documentElement.classList.remove('pp-overflow')
        //         }
        //     }
        // },
        async sendDeliveryInfo({ state, commit }) {
            try {
                commit('setIsLoading', true)
                document.documentElement.classList.add('pp-overflow')
                const deliveryInfo = state.deliveryInfo

                const orderId = sessionStorage.getItem('orderId')

                const response = await api.patch(
                    `${API_URL}/order/add-new-information-to-order`,
                    deliveryInfo,
                    {
                        params: {
                            order_id: orderId,
                        },
                    },
                )
                commit('setSuccessOrder', response.data.order_info)
                router.push('/delivery/success')
                sessionStorage.clear()
            } catch (e) {
                console.log('Ошибка отправки заказа', e)
            } finally {
                commit('setIsLoading', false)
                document.documentElement.classList.remove('pp-overflow')
            }
        },
    },
    getters: {
        showModal: (state) => state.showModal,
        deliveryMethods: (state) => state.deliveryMethods,
        deliveryInfo: (state) => state.deliveryInfo,
        successOrder: (state) => state.successOrder,
    },
}
