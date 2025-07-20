<template>
    <div class="delivery-card" @click="chooseDeliveryType(deliveryType.id)">
        <div class="delivery-card__container">
            <img :src="deliveryType.icon_url" alt="" class="delivery-card__icon" />
        </div>
        <div class="delivery-card__info">
            <span class="paragraph-12-regular-light">{{ deliveryType.type }}</span>
            <span class="delivery-card__cost h3">{{ deliveryType.cost }} ₽</span>
            <span class="paragraph-12-regular-light">{{ deliveryType.duration }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        deliveryType: {
            type: Object,
            required: true,
        },
    },
    methods: {
        chooseDeliveryType(idDeliveryType){
            return this.$store.dispatch('delivery/updateDeliveryType', idDeliveryType)
        }
    }
}
</script>

<style lang="less">
.delivery-card {
    display: flex;
    gap: 16px;
    width: 100%;
    padding: 16px;
    border: 1px solid @border-extralight;
    border-radius: 24px;
    background-color: @white;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
            @media (hover: hover) {
                border-color: @border-medium;
            }
        }

    &__icon {
        width: 48px;
        height: 48px;
    }

    &__info {
        display: flex;
        flex-direction: column;
        gap: 8px;

        span:last-child{
            margin-top: 16px;
        }
    }
}
</style>
