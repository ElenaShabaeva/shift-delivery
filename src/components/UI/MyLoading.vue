<template>
    <div class="loading">
        <div class="loading__container">
            <h2 class="h2">{{ title }}</h2>
            <div class="loader-container">
                <div class="bouncing-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'my-loading',
    props: {
        title: {
            type: String,
            default: '',
        },
    },
}
</script>

<style lang="less">
.loading {
    // background-color: fade(@text-primary, 85%);
    background: rgba(20, 28, 36, 0.3);
    backdrop-filter: blur(4.5px);
    -webkit-backdrop-filter: blur(4.5px);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 110;

    &__container {
        display: flex;
        flex-direction: column;
        gap: 40px;
        align-items: center;
        margin: 250px auto;
        // background-color: @white;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 24px;
        // border-radius: 16px;
        // backdrop-filter: blur(4.5px);
        // -webkit-backdrop-filter: blur(4.5px);
        padding: 20px 72px 40px;
        max-width: 544px;
        width: 100%;
    }
}
</style>
