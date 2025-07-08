<template>
    <div class="modal-window">
        <div class="modal-window__container">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'my-modal-window',
}
</script>

<style lang="less">
.modal-window {
    background-color: fade(@text-primary, 85%);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 110;

    &__container {
        margin: 230px auto;
        border-radius: 24px;
        background-color: @white;
        max-width: 544px;
        width: 100%;
    }
}
</style>
