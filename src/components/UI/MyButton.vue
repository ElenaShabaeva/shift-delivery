<template>
    <button class="button button-text" :class="buttonClasses">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-button',
    props: {
        buttonColor:{ 
            type: Boolean,
        },
        buttonBorder: {
            type: Boolean,
        },
        buttonDisabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        buttonClasses(){
            return{
                'button__color': this.buttonColor,
                'button__border': this.buttonBorder,
                'button__color--disabled': this.buttonColor && this.buttonDisabled,
                'button__border--disabled': this.buttonBorder && this.buttonDisabled
            }
        }
    }
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
    text-align: center;
    transition: all 0.3s;
    overflow: hidden;
    cursor: pointer;

    &__color{
        background-color: @bg-brand;
        color: @text-invert;

        &:hover{
            @media(hover: hover){
                background-color: @bg-hover;
            }
        }

        &:active{
            background-color: @bg-hover;
        }

        &--disabled{
            background-color: @bg-extraLight;
            pointer-events: none;
        }
    }

    &__border{
        border: 1px solid @border-light;

        &:hover{
            @media(hover: hover){
                background-color: @bg-tertiary;
            }
        }

        &:active{
            background-color: @bg-tertiary;
        }

        &--disabled{
            border-color: @border-extralight;
            color: @text-tertiary;
            pointer-events: none;
        }
    }
}
</style>