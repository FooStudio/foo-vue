<style lang="stylus">
    .VideoTimeline
        display flex
        align-items center
        position relative
        height 3px

        .progress
            position absolute
            height 3px
            background-color #fff

        input[type=range]::webkit-slider-thumb
            -webkit-appearance none

        input[type=range]:focus
            outline none
            border none

        input[type=range]
            -webkit-appearance none
            position absolute
            width 100%
            height 3px
            background transparent
            border-color transparent
            color transparent
            cursor pointer
            padding 0

            &::-webkit-slider-runnable-track
                width 100%
                height 3px
                background-color rgba(255, 255, 255, 0.2)
                cursor pointer
                border none
                color transparent

            &::-moz-range-track
                width: 100%
                height 3px
                background-color rgba(255, 255, 255, 0.2)
                cursor pointer
                border none
                color transparent

            &::-ms-track
                width: 100%
                height 3px
                background-color rgba(255, 255, 255, 0.2)
                cursor pointer
                border none
                color transparent

            &::-ms-tooltip
                display none

            &::-ms-fill-lower
                background transparent

            &::-ms-fill-upper
                background transparent

            &::-webkit-slider-thumb
                -webkit-appearance none
                width 0
                height 0
                background transparent
                border none
                oultine none

            &::-moz-range-thumb
                width 0
                height 0
                background transparent
                border none
                oultine none

            &::-ms-thumb
                width 0
                height 0
                background transparent
                border none
                oultine none


</style>

<script>
    export default {
        props: {
            className: {
                type: String,
                default: "",
            },
            duration: {
                type: Number,
                required: true,
            },
            currentTime: {
                type: Number,
                required: true,
            },
        },
        data() {
            return {
                isMouseDown: false,
            };
        },
        methods: {
            onChangeHandler() {
                this.$emit("timechange", this.$refs["input"].value);
            },
            onUpdateHandler() {
                this.$emit("timechange", this.$refs["input"].value);
            },
            onMouseDownHandler() {
                this.isMouseDown = true;
            },
            onMouseUpHandler() {
                this.isMouseDown = false;
            },
        },
        computed: {
            progressStyle() {
                return {
                    width: this.currentTime / this.duration * 100 + "%",
                }
            }
        }
    }
</script>

<template>
    <div :class="`VideoTimeline ${className}`">
        <div class="progress" :style="progressStyle"></div>
        <input
            type="range"
            ref="input"
            :min="0"
            :max="duration"
            :step="0.001"
            @change="onChangeHandler"
            @input="onUpdateHandler"
            @mousedown="onMouseDownHandler"
            @mouseup="onMouseUpHandler"
            :value="currentTime"
        />
    </div>
</template>
