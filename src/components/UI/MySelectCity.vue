<template>
    <div class="select" ref="select">
        <div
            class="select__top"
            :class="{ 'select__top--active': isShowOptions }"
            @click="showOptions"
        >
            <div class="select__icon" v-if="this.$slots.default">
                <slot></slot>
            </div>
            
            <span class="select__selected-option">{{ selectedOption || 'Не выбран' }}</span>

            <div class="select__icon" :class="{ 'select__icon--rotate': isShowOptions }">
                <SvgArrow />
            </div>
        </div>
        
        <TransitionGroup name="options">
            <div class="select__options" v-if="isShowOptions">
            <div
                class="select__option"
                v-for="option in options"
                :key="option.id"
                @click="selectOption(option)"
            >
                <div>{{ option.title }}</div>
            </div>
        </div>
        </TransitionGroup>
    </div>
</template>

<script>
import SvgArrow from '@/assets/svg/SvgArrow.vue'
export default {
    name: 'my-select-city',
    components: { SvgArrow },
    props: {
        modelValue: {
            default: null,
        },
        options: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            selectedOption: '',
            isShowOptions: false,
            select: null,
        }
    },
    methods: {
        showOptions() {
            this.isShowOptions = !this.isShowOptions
        },
        selectOption(option) {
            this.selectedOption = option.title
            this.$emit('update:modelValue', option.id)
            this.isShowOptions = false
        },
        clickSelect(event) {
            if (!this.select.contains(event.target)) {
                this.isShowOptions = false
            }
        },
        closeSelect() {
            window.addEventListener('click', this.clickSelect)
        },
    },
    mounted() {
        this.select = this.$refs.select
        this.closeSelect()
    },
    beforeUnmount() {
        window.removeEventListener('click', this.clickSelect)
    },
}
</script>

<style lang="less">
.select {
    max-width: 320px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;

    &__top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        padding: 8px 12px;
        border-radius: 4px;
        transition: all 0.3s;
        user-select: none;
        cursor: pointer;
        background-color: @white;
        border: 1px solid @white;

        &:hover {
            @media (hover: hover) {
                border-color: @border-light;
            }
        }

        &--active {
            border-color: @border-light;
        }
    }

    &__selected-option{
        width: 100%;
    }

    &__icon {
        width: 20px;
        height: 20px;
        transition: all 0.4s;

        &--rotate {
            transform: rotate(180deg);
        }
    }

    &__options {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 8px;
        background-color: @white;
        border-radius: 12px;
        max-height: 235px;
        overflow-y: auto;
        scroll-behavior: smooth;

        &::-webkit-scrollbar {
            width: 3px;
            height: 10px;
        }

        &::-webkit-scrollbar-track {
            margin: 24px 0;
        }

        &::-webkit-scrollbar-thumb {
            background: @border-light;
            border-radius: 6px;
        }
    }

    &__option {
        padding: 6px 8px;
        border-radius: 4px;
        transition: all 0.3s;
        user-select: none;
        cursor: pointer;

        &:hover {
            @media (hover: hover) {
                background-color: @bg-secondary;
            }
        }
    }
}

.options-move,
.options-enter-active,
.options-leave-active {
  transition: all 0.4s ease;
}
.options-enter-from,
.options-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
