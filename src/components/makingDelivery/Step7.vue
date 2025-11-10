<template>
    <div class="validate">
        <div class="validate__list">
            <section class="validate__card">
                <span class="paragraph-16-regular">Получатель</span>
                <div class="validate__card-list">
                    <div class="validate__card-info">
                        <span class="paragraph-12-regular-light">ФИО</span>
                        <span class="validate__card-value paragraph-16-regular"
                            >{{ deliveryInfo.recipient.surname }} {{ deliveryInfo.recipient.name }}
                            {{ deliveryInfo.recipient.patronymic }}</span
                        >
                    </div>
                    <div class="validate__card-info">
                        <span class="paragraph-12-regular-light">Телефон</span>
                        <span class="paragraph-16-regular">{{ deliveryInfo.recipient.phone }}</span>
                    </div>
                </div>
                <svg-pencil class="validate__icon" @click="editInfo('recipient')" />
            </section>
            <section class="validate__card">
                <span class="paragraph-16-regular">Отправитель</span>
                <div class="validate__card-list">
                    <div class="validate__card-info">
                        <span class="paragraph-12-regular-light">ФИО</span>
                        <span class="validate__card-value paragraph-16-regular"
                            >{{ deliveryInfo.sender.surname }} {{ deliveryInfo.sender.name }}
                            {{ deliveryInfo.sender.patronymic }}</span
                        >
                    </div>
                    <div class="validate__card-info">
                        <span class="paragraph-12-regular-light">Телефон</span>
                        <span class="paragraph-16-regular">{{ deliveryInfo.sender.phone }}</span>
                    </div>
                </div>
                <svg-pencil class="validate__icon" @click="editInfo('sender')" />
            </section>
            <section class="validate__card">
                <span class="paragraph-16-regular">Откуда забрать</span>
                <div class="validate__card-list">
                    <div class="validate__card-info">
                        <span class="paragraph-12-regular-light">Адрес</span>
                        <span class="validate__card-value paragraph-16-regular"
                            >ул.{{ deliveryInfo.sendingCity.street }}, д.{{
                                deliveryInfo.sendingCity.houseNumber
                            }}</span
                        >
                    </div>
                    <div class="validate__card-info">
                        <span class="paragraph-12-regular-light">Заметка</span>
                        <span class="validate__card-value paragraph-16-regular">{{
                            deliveryInfo.sendingCity.noteToTheCourier
                        }}</span>
                    </div>
                </div>
                <svg-pencil class="validate__icon" @click="editInfo('sendingCity')" />
            </section>
            <section class="validate__card">
                <span class="paragraph-16-regular">Куда доставить</span>
                <div class="validate__card-list">
                    <div class="validate__card-info">
                        <span class="paragraph-12-regular-light">Адрес</span>
                        <span class="validate__card-value paragraph-16-regular"
                            >ул.{{ deliveryInfo.destinationCity.street }}, д.{{
                                deliveryInfo.destinationCity.houseNumber
                            }}</span
                        >
                    </div>
                    <div class="validate__card-info">
                        <span class="paragraph-12-regular-light">Заметка</span>
                        <span class="validate__card-value paragraph-16-regular">{{
                            deliveryInfo.destinationCity.noteToTheCourier
                        }}</span>
                    </div>
                </div>
                <svg-pencil class="validate__icon" @click="editInfo('destinationCity')" />
            </section>
            <section class="validate__result">
                <h3 class="h3">Итого: {{ selectedDeliveryType?.cost }}</h3>
                <div class="validate__result-info">
                    <span class="paragraph-16-regular"
                        >Тариф: {{ selectedDeliveryType?.type }}</span
                    >
                    <span class="paragraph-16-regular"
                        >Срок: {{ selectedDeliveryType?.duration }}</span
                    >
                </div>
            </section>
        </div>
        <div class="validate__btns">
            <my-button type="button" :button-border="true" @click="prev">Назад</my-button>
            <my-button type="button" :button-color="true" @click="sendDeliveryInfo"
                >Отправить</my-button
            >
        </div>
    </div>
    <edit-user-info
        v-if="showModal && editingSection === 'recipient'"
        :section="'Получатель'"
        :data="editingData"
    />
    <edit-user-info
        v-if="showModal && editingSection === 'sender'"
        :section="'Отправитель'"
        :data="editingData"
    />

    <edit-city-info
        v-if="showModal && editingSection === 'sendingCity'"
        :section="'Откуда забрать'"
        :data="editingData"
    />
    <edit-city-info
        v-if="showModal && editingSection === 'destinationCity'"
        :section="'Куда доставить'"
        :data="editingData"
    />
    <my-loading :title="loadingTitle" v-if="isLoading" />
</template>

<script>
import SvgPencil from '@/assets/svg/SvgPencil.vue'
import EditUserInfo from '../EditUserInfo.vue'
import EditCityInfo from '../UI/EditCityInfo.vue'

export default {
    components: {
        SvgPencil,
        EditUserInfo,
        EditCityInfo,
    },
    data() {
        return {
            loadingTitle: 'Идет отправка заказа',
            editingSection: null,
            editingData: null,
            deliveryMethods: [],
            selectedDeliveryType: null,
            deliveryInfo: {
                sender: {},
                recipient: {},
                sendingCity: {},
                destinationCity: {},
                payer: '',
                idDeliveryType: '',
                payment: '',
            },
        }
    },
    methods: {
        prev() {
            this.$emit('prev')
        },
        editInfo(section) {
            this.editingSection = section
            this.editingData = this.deliveryInfo[section]

            document.documentElement.classList.add('pp-overflow')
            this.$store.dispatch('delivery/showModal', true)
        },
        async sendDeliveryInfo() {
            this.$store.dispatch('delivery/sendDeliveryInfo')
        },
    },
    created() {
        const info = this.$store.getters['delivery/deliveryInfo']
        if (info) {
            this.deliveryInfo = info
        }
        const methods = this.$store.getters['main/deliveryMethods']
        if (methods) {
            this.deliveryMethods = methods
        }

        const deliveryInfo = this.$store.getters['delivery/deliveryInfo']
        const selectedId = deliveryInfo?.idDeliveryType

        if (selectedId && this.deliveryMethods.length) {
            this.selectedDeliveryType = this.deliveryMethods.find(
                (method) => method.id === selectedId,
            )
        }
    },
    computed: {
        showModal() {
            return this.$store.getters['delivery/showModal']
        },
    },
    mounted() {
        this.$emit('update-title', 'Проверка данных заказа')
    },
}
</script>

<style lang="less">
.validate {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding-bottom: 32px;

    &__list {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    &__card {
        display: grid;
        grid-template-columns: 200px auto 24px;
        align-items: center;
        gap: 24px;
        width: 100%;
        padding: 24px 48px;
        background-color: @white;
        border-radius: 24px;

        > span:first-child {
            font-weight: 500;
        }

        .paragraph-16-regular {
            color: @text-primary;
        }
    }

    &__card-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: start;
        gap: 24px;
    }

    &__card-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        align-items: start;
        max-width: 284px;
        width: 100%;
    }

    &__card-value {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__icon {
        cursor: pointer;
    }

    &__result {
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: end;
    }

    &__result-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        align-items: end;
    }

    &__btns {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 304px;
    }
}
</style>
