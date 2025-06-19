<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-button',
}
</script>

<style lang="less">
.button{
    display: flex;
    padding: 16px 32px;
    gap: 8px;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    border: none;
    background-color: transparent;
    outline: none;
    text-decoration: none;
    font-family: @font1;
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    text-align: center;
    transition: all 0.3s;
    overflow: hidden;
    cursor: pointer;
}
</style>
