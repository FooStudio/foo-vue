<template>
    <transition
        :css="false"
        :appear="true"
        @enter="intro"
        @appear="intro"
    >
        <div class="RotateDevice" v-show="show">
            <div class="RotateDevice-inner">
                <p ref="copy" class="RotateDevice-copy">
                    Mantén tu dispositivo en vertical para poder vivir esta
                    experiencia.
                </p>
            </div>
        </div>
    </transition>
</template>

<script>
import app from '@/app'

export default {
    name: 'RotateDevice',
    data() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            count: 0,
        }
    },
    mounted() {
        this.updateSize()
        app.resize.add(this.updateSize)
    },
    beforeDestroy() {
        app.resize.remove(this.updateSize)
    },
    methods: {
        intro(el, done) {
            const { $refs } = this
            TweenMax.fromTo($refs.copy, 0.2,
                { y: 15, alpha: 0 },
                { y: 0, alpha: 1, delay: 0.5, onComplete: done })
        },
        updateSize() {
            // Timeout needed because IOS Chrome
            let to = setTimeout(() => {
                this.width = window.innerWidth
                this.height = window.innerHeight
                clearTimeout(to)
                to = null
            }, 100)
        },
    },
    computed: {
        show() {
            const { width, height } = this
            if (typeof screen === 'object' && screen.orientation) {
                const orientation = screen.orientation.type.match(/\w+/)[0]
                return orientation === 'landscape'
            }
            return width > height
        },
    },
}
</script>

<style src="styles/components/base/RotateDevice.styl" lang="stylus"></style>