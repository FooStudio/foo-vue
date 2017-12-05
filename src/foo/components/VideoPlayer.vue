<style lang="stylus">
    .VideoPlayer
        position relative
        width 100%
        height 100%
        overflow hidden
        outline none

        svg
            fill #fff

        .BackgroundVideo
            width 100%
            height 100%
            outline none
            video
                width: 100%
                height 100%

        &:fullscreen
            width 100% !important
            height 100% !important
            background-color #000

            .BackgroundVideo
                display flex
                video
                    position relative
                    width 100% !important
                    height auto !important
                    left 0 !important
                    top 50% !important
                    transform translateY(-50%) !important

            button.close
                opacity 0

        button
            width 1.5rem
            height 1.5rem
            margin-left 1rem
            opacity 0.8
            padding 0
            transition opacity 0.3s
            background-color transparent

            &:hover
                opacity 1

            &:first-of-type
                margin-right 1rem

            &:last-of-type
                margin-right 1rem

            svg
                width 100%
                height 100%

            &.close
                position absolute
                padding 2rem
                top 0
                right 0
                z-index 1

        nav.controls
            display flex
            align-items center
            justify-content center
            position absolute
            bottom 0
            width 100%
            height 3rem
            background-color rgba(0, 0, 0, 0.8)
            z-index 1

            .VideoTimeline
                flex-grow 1

            time
                color #fff
                font-size 1rem
                margin-left 1rem
                outline none

        .captions-container
            position absolute
            left 50%
            bottom 8rem
            background-color rgba(0, 0, 0, 0.8)
            transform translateX(-50%)

            p
                font-size 2rem
                color #fff
                padding 2rem
                max-width 50rem
                text-align center

</style>

<script>
    import fullscreen from "fullscreen-handler";
    import BackgroundVideo from "./BackgroundVideo.vue";
    import {TweenMax, Expo} from "gsap";
    import VideoTimeline from "./VideoTimeline.vue";
    import VideoPoster from "./VideoPoster.vue";
    import {secondsToString} from "foo/utils/TimeUtils";

    import PlayIcon from "assets/svg/play.svg";
    import PauseIcon from "assets/svg/pause.svg";
    import MutedIcon from "assets/svg/muted.svg"
    import UnMutedIcon from "assets/svg/unmuted.svg";
    import EnterFsIcon from "assets/svg/enter-fullscreen.svg";
    import LeaveFsIcon from "assets/svg/exit-fullscreen.svg";
    import CloseIcon from "assets/svg/close.svg";
    import CaptionsOnIcon from "assets/svg/captions-on.svg";
    import CaptionsOffIcon from "assets/svg/captions-off.svg";

    export default {
        props: {
            className: {
                type: String,
                default: "",
            },
            src: {
                type: String,
                required: true,
            },
            poster: {
                type: String,
            },
            preload: {
                type: String,
                default: "auto",
            },
            captions: {
                type: Object,
            },
            disableBackgroundCover: {
                type: Boolean,
                default: false,
            },
            id: {
                type: [String, Number],
                default: "",
            },
            allowKeyboardControl: {
                type: Boolean,
                default: true,
            },
            autoPlay: {
                type: Boolean,
                default: false,
            },
            muted: {
                type: Boolean,
                default: false,
            },
            loop: {
                type: Boolean,
                default: false,
            },
            togglePlayOnClick: {
                type: Boolean,
                default: true,
            },
            showControlsOnLoad: {
                type: Boolean,
                default: false,
            },
            hasCloseButton: {
                type: Boolean,
                default: false,
            },
            hasPlayButton: {
                type: Boolean,
                default: true,
            },
            showPosterOnEnd: {
                type: Boolean,
                default: false,
            },
            hasControls: {
                type: Boolean,
                default: true,
            },
            playsInline: {
                type: Boolean,
                default: false,
            },
            autoPlayDelay: {
                type: Number,
                default: 0,
            },
            controlsTimeout: {
                type: Number,
                default: 2500,
            },
            windowWidth: {
                type: Number,
                default: 0,
            },
            windowHeight: {
                type: Number,
                default: 0,
            },
            volume: {
                type: Number,
                default: 1,
            },
            startTime: {
                type: Number,
                default: 0,
            },
            posterFadeDuration: {
                type: Number,
                default: 0,
            },
            useNoise: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                containerWidth: this.windowWidth,
                containerHeight: this.windowHeight,
                isPlaying: false,
                isMuted: this.muted,
                isFullScreen: false,
                isShowingCaptions: this.captions && this.captions.default,
                currentCaptions: "",
                currentTime: 0,
                progress: 0,
                duration: 0,
            };
        },
        components: {
            BackgroundVideo,
            VideoTimeline,
            VideoPoster,
            PlayIcon,
            PauseIcon,
            MutedIcon,
            UnMutedIcon,
            EnterFsIcon,
            LeaveFsIcon,
            CloseIcon,
            CaptionsOnIcon,
            CaptionsOffIcon
        },
        mounted() {
            this.$nextTick(() => {
                this.fullscreen = fullscreen(this.$el, this.enterFullScreenHandler, this.exitFullScreenHandler);

                //TODO: verifiy if this is the best place, or a transition?
                if (this.hasControls) {
                    this.showControlsOnLoad ? this.setHideControlsTimeout() : this.hideControls(0);
                }

                if (this.autoPlay) {
                    this.autoPlayTimeout = setTimeout(() => {
                        this.play();
                        this.clearAutoPlayTimeout();
                    }, this.autoPlayDelay);
                }

                if (this.captions) {
                    TweenMax.set(this.$refs["captionsContainer"], {autoAlpha: Boolean(this.isShowingCaptions)});
                }
                App.resize.add(this.onResize);
            });
        },
        methods: {
            onResize({width, height}) {
                this.containerWidth = width;
                this.containerHeight = height;
            },
            getVideoElement() {
                return this.$refs["video"].$refs["video"];
            },
            setHideControlsTimeout() {
                this.clearHideControlsTimeout();
                this.hideControlsTimeout = setTimeout(() => {
                    this.isPlaying && this.hideControls();
                }, this.controlsTimeout);
            },
            clearHideControlsTimeout() {
                if (this.hideControlsTimeout) {
                    clearTimeout(this.hideControlsTimeout);
                    this.hideControlsTimeout = undefined;
                }
            },
            showControls(duration = 0.8, ease = Expo.easeOut) {
                this.$refs["closeButton"] && TweenMax.to(this.$refs["closeButton"], duration, {y: "0%", ease});
                this.$refs["controls"] && TweenMax.to(this.$refs["controls"], duration, {y: "0%", ease});
            },
            hideControls(duration = 0.8, ease = Expo.easeOut) {
                this.$refs["closeButton"] && TweenMax.to(this.$refs["closeButton"], duration, {y: "-100%", ease});
                this.$refs["controls"] && TweenMax.to(this.$refs["controls"], duration, {y: "100%", ease});
            },
            readyHandler() {
                if (this.captions) {
                    this.captions.src && this.setCaptions();
                }
            },
            play() {
                !this.isPlaying && this.$refs["video"].play();
            },
            togglePlay() {
                this.togglePlayOnClick && this.$refs["video"].togglePlay();
            },
            playHandler() {
                this.isPlaying = true;
            },
            pause() {
                this.isPlaying && this.$refs["video"].pause();
            },
            pauseHandler() {
                this.isPlaying = false;
            },
            mute() {
                !this.isMuted && this.$refs["video"].mute();
            },
            muteHandler() {
                this.isMuted = true;
            },
            unmute() {
                this.isMuted && this.$refs["video"].unmute();
            },
            unMuteHandler() {
                this.isMuted = false;
            },
            toggleMute() {
                this.$refs["video"].toggleMute();
            },
            clearAutoPlayTimeout() {
                this.autoPlayTimeout && clearTimeout(this.autoPlayTimeout);
            },
            onMouseMoveHandler() {
                if (this.isPlaying && this.hasControls) {
                    this.showControls();
                    this.setHideControlsTimeout();
                }
            },
            keyPressHandler(event) {
                if (this.allowKeyboardControl) {
                    const code = event.keyCode || event.which || event.charCode;
                    if (code === 32) this.togglePlay();
                }
            },
            endHandler() {
                this.$emit("end");
                this.fullscreen.isFullScreen() && this.fullscreen.exit();
                this.showPosterOnEnd && this.hideControls();
            },
            toggleFullScreen() {
                this.isFullScreen ? this.fullscreen.exit() : this.fullscreen.enter();
            },
            enterFullScreenHandler() {
                this.isFullScreen = true;
                this.resize();
            },
            exitFullScreenHandler() {
                this.isFullScreen = false;
                this.resize();
            },
            resize() {
                this.containerWidth = window.innerWidth;
                this.containerHeight = window.innerHeight;
            },
            toggleCaptions() {
                this.isShowingCaptions = !this.isShowingCaptions;
            },
            setCaptions(captions = this.captions) {
                const video = this.$refs["video"].$refs["video"];
                if (video.contains(this.captions)) {
                    video.removeChild(this.captions);
                    this.captions.removeEventListener("cuechange", this.trackChangeHandler);
                }

                const track = document.createElement("track");
                track.kind = captions.kind;
                track.label = captions.label;
                track.srclang = captions.srclang;
                track.src = captions.src;
                track.mode = "hidden";

                this.captions = track;
                video.appendChild(this.captions);
                video.textTracks[0].mode = "hidden";
                this.captions.addEventListener("cuechange", this.trackChangeHandler);
            },
            trackChangeHandler() {

            },
            timeUpdateHandler({currentTime, progress, duration}) {
                this.currentTime = currentTime;
                this.progress = progress;
                this.duration = duration;
            },
            timeChangeHandler(currentTime) {
                this.$refs["video"].setCurrentTime(currentTime);
            },
            onCloseHandler() {
                this.$emit("close");
            }
        },
        computed: {
            isPosterVisible() {
                return !this.isPlaying && (!this.progress || (this.showPosterOnEnd && this.progress >= 1));
            },
            formattedTime() {
                return secondsToString(this.currentTime);
            },
            totalFormattedTime() {
                return secondsToString(this.duration);
            }
        },
        watch: {
            captions(value, oldValue) {
                if (value.src !== oldValue.src) {
                    this.setCaptions(value);
                }
            },
            isPlaying(value) {
                if (value) {
                    this.$emit("play", {id: this.id});
                    this.hasControls && this.setHideControlsTimeout();
                } else {
                    this.$emit("pause", {id: this.id});
                    if (this.hasControls) {
                        this.clearHideControlsTimeout();
                        this.showControls();
                    }
                }
            },
            isShowingCaptions(value) {
                this.captions && TweenMax.to(this.$refs["captionsContainer"], 0.1, {autoAlpha: Boolean(value)});
            }
        },
        beforeDestroy() {
            App.resize.remove(this.onResize);
            this.fullscreen.destroy();
            this.pause();
            this.clearAutoPlayTimeout();
            this.hasControls && this.clearHideControlsTimeout();
            this.captions = this.captions.removeEventListener("cuechange", this.trackChangeHandler);
        }
    };
</script>

<template>
    <div :class="`VideoPlayer ${className}`" @mousemove="onMouseMoveHandler">
        <background-video :containerWidth="containerWidth"
                          :containerHeight="containerHeight"
                          ref="video"
                          :src="src"
                          :autoPlay="autoPlay"
                          :muted="muted"
                          :loop="loop"
                          :disableBackgroundCover="disableBackgroundCover"
                          :preload="preload"
                          :playsinline="playsInline"
                          :volume="volume"
                          :startTime="startTime"
                          :useNoise="useNoise"
                          @ready="readyHandler"
                          @play="playHandler"
                          @pause="pauseHandler"
                          @time="timeUpdateHandler"
                          @mute="muteHandler"
                          @unmute="unMuteHandler"
                          @end="endHandler"
                          @keypress="keyPressHandler"
                          @click="togglePlay"
        >
        </background-video>
        <video-poster v-if="isPosterVisible"
                      :poster="poster"
                      :hasPlayButton="hasPlayButton"
                      :fadeDuration="posterFadeDuration"
                      @click="play"
        ></video-poster>
        <button v-if="hasCloseButton"
                class="close"
                ref="closeButton"
                aria-label="Close Video"
                @click="onCloseHandler"
        ></button>
        <nav v-if="hasControls" class="controls" ref="controls">
            <button :aria-label="isPlaying ? 'Pause Video' : 'Play Video'" @click="togglePlay">
                <pause-icon v-if="isPlaying"></pause-icon>
                <play-icon v-else></play-icon>
            </button>
            <video-timeline
                :duration="duration"
                :currentTime="currentTime"
                @timechange="timeChangeHandler"
            ></video-timeline>
            <time tabindex="0">
                {{formattedTime}}
            </time>
            <button :aria-label="isMuted ? 'Unmute Video' : 'Mute Video'" @click="toggleMute">
                <muted-icon v-if="isMuted"></muted-icon>
                <un-muted-icon v-else></un-muted-icon>
            </button>
            <button :aria-label="isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'"
                    @click="toggleFullScreen">
                <leave-fs-icon v-if="isFullScreen"></leave-fs-icon>
                <enter-fs-icon v-else></enter-fs-icon>
            </button>
        </nav>
    </div>
</template>
