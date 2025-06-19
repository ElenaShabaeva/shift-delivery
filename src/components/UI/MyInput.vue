<template>
    <input type="text" class="input" />
</template>

<script>
export default {
    name: 'my-input',
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
        &::placeholder {
            color: transparent;
        }
    }
}
</style>
