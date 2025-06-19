<template>
    <label class="radio" :class="radioDisabled ? 'radio--disabled' : ''">
        <input type="radio" class="radio__input" />
        <span class="radio__mark"></span>
    </label>
</template>

<script>
export default {
    name: 'my-radio',
    props: {
        radioDisabled: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style lang="less">
.radio {
    box-sizing: border-box;
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    min-height: 20px;
    padding-left: 20px;
    cursor: pointer;

    &__input {
        .is-hidden;

        &:checked {
            & ~ .radio__mark {
                background-color: @bg-brand;
                border-color: @bg-brand;

                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    left: 6px;
                    top: 4px;
                    width: 4px;
                    height: 7px;
                    background-color: transparent;
                    border-bottom: 2px solid @white;
                    border-right: 2px solid @white;
                    border-radius: 2px;
                    transform: rotate(45deg);
                }
            }
        }
    }

    &--disabled {
        pointer-events: none;
        
        .check__mark{
            border-color: @border-disabled;
        }
    }

    &__mark {
        box-sizing: border-box;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 20px;
        height: 20px;
        background-color: transparent;
        border: 1.5px solid @border-light;
        transition: all 0.3s;
        border-radius: 50%;
    }
}
</style>
