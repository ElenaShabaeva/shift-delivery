<template>
    <input
        type="text"
        class="input paragraph-16-regular"
        :class="{ 'input--disabled': disabled }"
        :disabled="disabled"
        :value="modelValue"
        @input="updateInput"
    />
</template>

<script>
export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number],
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        },
    },
}
</script>

<style lang="less">
.input {
    box-shadow: none;
    outline: none;
    color: @text-primary;
    max-width: 464px;
    width: 100%;
    padding: 8px 8px 8px 12px;
    border: 1px solid @border-light;
    background-color: transparent;
    border-radius: 8px;
    transition: all 0.3s;

    &::placeholder {
        color: @text-tertiary;
    }

    &:not(:disabled):hover {
        @media (hover: hover) {
            border-color: @border-medium;
        }
    }

    &:focus {
        border-color: @border-medium;
        &::placeholder {
            color: transparent;
        }
    }

    &--disabled {
        background-color: @bg-secondary;
        &::placeholder {
            color: @text-tertiary;
        }
        pointer-events: none;
    }
}
</style>
