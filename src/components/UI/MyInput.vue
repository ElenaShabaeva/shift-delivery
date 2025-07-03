<template>
    <input type="text" class="input paragraph-16-regular" :value="modelValue" @input="updateInput"/>
</template>

<script>
export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number],
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
    padding: 12px 8px 12px 12px;
    border: 1px solid @border-light;
    background-color: transparent;
    border-radius: 8px;

    &::placeholder {
        color: @text-tertiary;
    }

    &:focus {
        border-color: @border-medium;
        &::placeholder {
            color: transparent;
        }
    }
}
</style>
