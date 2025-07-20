<template>
    <div class="delivery">
        <div class="delivery__container container">
            <h2 class="h2">{{ title }}</h2>
            <div class="progress-bar">
                <div class="progress-bar__label paragraph-12-regular-dark">Шаг {{ currentStep }} из {{ totalSteps }}</div>
                <div class="progress-bar__track">
                    <div class="progress-bar__fill" :style="{ width: fillWidth }"></div>
                </div>
            </div>

            <component :is="getStepComponent(currentStep)" @update-title="title = $event" @prev="goToStep(currentStep - 1)" @next="goToStep(currentStep + 1)"/>
        </div>
    </div>
</template>

<script>
import Step1 from '@/components/makingDelivery/Step1.vue'
import Step2 from '@/components/makingDelivery/Step2.vue'
import Step3 from '@/components/makingDelivery/Step3.vue'
import Step4 from '@/components/makingDelivery/Step4.vue'
import Step5 from '@/components/makingDelivery/Step5.vue'
import Step6 from '@/components/makingDelivery/Step6.vue'
import Step7 from '@/components/makingDelivery/Step7.vue'
export default {
    props: {
        currentStep: { type: Number, required: true },
        totalSteps: { type: Number, default: 7 },
    },
    data() {
        return {
            title: '',
        }
    },
    methods: {
        goToStep(step) {
            if (step >= 1 && step <= 7) {
                this.$router.push({ name: 'delivery', params: { stepNumber: step } })
            }
        },
        getStepComponent(step) {
            const steps = {
                1: Step1,
                2: Step2,
                3: Step3,
                4: Step4,
                5: Step5,
                6: Step6,
                7: Step7,
            }
            return steps[step] || Step1
        },
    },
    computed: {
        fillWidth() {
            const percent = Math.max(0, Math.min(this.currentStep / this.totalSteps, 1))
            return `${percent * 100}%`
        },
    },
}
</script>

<style lang="less">

</style>
