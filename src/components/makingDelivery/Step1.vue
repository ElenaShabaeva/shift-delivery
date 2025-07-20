<template>
    <div class="delivery-list">
        <delivery-card v-for="card in deliveryMethods" :key="card.id" :delivery-type="card"></delivery-card>
        <div class="promotion">
            <div class="promotion__info">
                <h2 class="h2-light">1+1=3</h2>
                <span class="paragraph-14-regular-light">3-я доставка в подарок!</span>
            </div>
            <svg-promotion class="promotion__img"/>
        </div>
    </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import DeliveryCard from '../DeliveryCard.vue';
import SvgPromotion from '@/assets/svg/SvgPromotion.vue';

export default {
    components: {
        DeliveryCard, SvgPromotion
    },
    data(){
        return{
            deliveryMethods: [],
        }
    },
    methods: {
        getDeliveryMethods(){
            const deliveriesInfo = this.$store.getters['main/deliveryMethods']
            if (deliveriesInfo){
                this.deliveryMethods = cloneDeep(deliveriesInfo)
            }
        }
    },
    mounted() {
        this.getDeliveryMethods()
        this.$emit('update-title', 'Способ отправки')
    },
}
</script>

<style lang="less">
.delivery-list{
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 468px;
    width: 100%;
}
</style>
