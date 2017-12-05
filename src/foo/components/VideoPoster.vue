<style lang="stylus">
    .VideoPoster {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-position: center center;
        background-size: cover;
        z-index: 1;
        outline: none;

        button {
            align-items: center;
            justify-content: center;
            position: relative;
            width: 8rem;
            height: 8rem;
            padding: 2rem;
            background: rgba(0, 0, 0, 0.8);
            border-radius: 50%;
            transition: transform 0.3s ease-out, opacity 0.3s;

            svg {
                width: 100%;
                height: 100%;
                margin-left: 0.5rem;

                .mobile {
                    margin-left: 0.2rem;
                }
            }

            .mobile {
                width: 4rem;
                height: 4rem;
                padding: 1rem;
            }

            &:hover {
                transform: scale(1.1);
            }
        }
    }
</style>

<script>
    import {TweenMax} from "gsap";
    import PlayIcon from "assets/svg/play.svg";

    export default {
        props: {
            className: {
                type: String,
                default: "",
            },
            hasPlayButton: {
                type: Boolean,
                default: false,
            },
            poster: {
                type: String,
                required: true,
            },
            fadeDuration: {
                type: Number,
                default: 0,
            },
        },
        data() {
            return {};
        },
        components: {PlayIcon},
        mounted() {
        },
        methods: {
            onEnter(el, done) {
                TweenMax.fromTo(
                    el,
                    this.fadeDuration / 1000,
                    {autoAlpha: 0},
                    {autoAlpha: 1, onComplete: done},
                );
            },
            onLeave(el, done) {
                TweenMax.to(el, this.fadeDuration / 1000, {
                    autoAlpha: 0,
                    onComplete: done,
                });
            },
            onClickHandler() {
                this.$emit("click");
            },
        },
        computed: {
            styleObject() {
                return {
                    backgroundImage: `url('${this.poster}')`,
                };
            },
        },
    };
</script>

<template>
    <transition @enter="onEnter" @leave="onLeave" appear :css="false">
        <div :class="`VideoPoster ${className}`" :style="styleObject" ref="container" @click="onClickHandler">
            <button v-if="hasPlayButton" aria-label="Play Video">
                <play-icon></play-icon>
            </button>
        </div>
    </transition>
</template>
