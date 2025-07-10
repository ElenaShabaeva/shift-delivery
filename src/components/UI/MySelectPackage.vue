<template>
    <div class="select" ref="select">
        <div
            class="select__top"
            :class="{ 'select__top--active': isShowOptions }"
            @click="showOptions"
        >
            <div class="select__label">
                <div class="select__icon" v-if="this.$slots.default">
                    <slot></slot>
                </div>

                <span class="select__selected-option paragraph-16-regular">{{
                    selectedOption || 'Не выбран'
                }}</span>
            </div>

            <div class="select__icon" :class="{ 'select__icon--rotate': isShowOptions }">
                <SvgArrow />
            </div>
        </div>

        <TransitionGroup name="options">
            <div class="select__options" v-if="isShowOptions && packages.length > 0">
                <div
                    class="select__option"
                    v-for="pack in packages"
                    :key="pack.id"
                    @click="selectOption(pack)"
                >
                    <img class="select__option-icon" :src="pack.icon_url" alt="" />
                    <div class="select__option-description">
                        <div class="h3">{{ pack.name }}</div>
                        <div class="paragraph-12-regular">
                            {{ pack.length }}х{{ pack.width }}х{{ pack.height }} см
                        </div>
                    </div>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<script>
import SvgArrow from '@/assets/svg/SvgArrow.vue'
export default {
    name: 'my-select-package',
    components: { SvgArrow },
    props: {
        modelValue: {
            default: null,
        },
        packages: {
            type: Object,
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
            this.selectedOption = option.name
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

<style lang="less" scoped>
.select {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;

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
        border: 1px solid @border-light;

        &:hover {
            @media (hover: hover) {
                border-color: @border-medium;
            }
        }

        &--active {
            border-color: @border-medium;
        }
    }

    &__label {
        display: flex;
        gap: 8px;
        align-items: center;
    }

    &__selected-option {
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
        width: 100%;
        position: absolute;
        left: 0;
        right: 0;
        bottom: calc(100% + 8px);
        z-index: 10;
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 8px;
        background-color: @white;
        border: 1px solid @border-light;
        border-radius: 12px;
    }

    &__option {
        display: flex;
        gap: 16px;
        padding: 6px 8px;
        border-radius: 4px;
        transition: all 0.3s;
        user-select: none;
        cursor: pointer;
        background-color: @bg-secondary;

        &:hover {
            @media (hover: hover) {
                background-color: @border-extralight;
            }
        }
    }

    &__option-icon {
        width: 48px;
        height: 48px;
    }

    &__option-description {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 4px;
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
