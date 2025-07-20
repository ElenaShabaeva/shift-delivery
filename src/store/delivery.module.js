import router from "@/router"

const savedDeliveryInfo = sessionStorage.getItem('deliveryInfo')
const savedDeliveryMethods = sessionStorage.getItem('deliveryMethods')

export const delivery = {
    namespaced: true,
    state: {
        showModal: false,
        deliveryMethods: savedDeliveryMethods ? JSON.parse(savedDeliveryMethods) : null,
        deliveryInfo: savedDeliveryInfo
            ? JSON.parse(savedDeliveryInfo)
            : {
                  idPackage: '',
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
    },
    mutations: {
        setShowModal(state, showModal) {
            state.showModal = showModal
            if (showModal){
                document.documentElement.classList.add('pp-overflow')
            }
            else {
                document.documentElement.classList.remove('pp-overflow')
            }
        },
        setDeliveryMethods(state, deliveryMethods) {
            state.deliveryMethods = deliveryMethods
            sessionStorage.setItem('deliveryMethods', JSON.stringify(deliveryMethods))
        },
        updateDeliveryType(state, idDeliveryTypeDate){
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
        showModal({commit}, showModal){
            commit('setShowModal', showModal)
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
                localStorage.setItem('idPackage', idPackage)
            }
        },
        updateDeliveryType({commit}, idDeliveryTypeDate){
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
    },
    getters: {
        showModal: (state) => state.showModal,
        deliveryMethods: (state) => state.deliveryMethods,
        deliveryInfo: (state) => state.deliveryInfo,
    },
}
