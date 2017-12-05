<script>
    import MainTransition from "app/transitions/GSAP";
    import VideoPlayer from "foo/components/VideoPlayer.vue";

    export default {
        name: "Home",
        data() {
            return {
                users: [],
                filter: "",
                loading: true,
                error: false,
            };
        },
        created() {
            this.fetchData();
        },
        props: {},
        components: {MainTransition, VideoPlayer},
        mounted() {
        },
        methods: {
            fetchData() {
                this.$get("https://jsonplaceholder.typicode.com/users")
                    .then(response => {
                        this.loading = false;
                        this.users = response.body;
                    })
                    .then(undefined, error => {
                        this.loading = false;
                        this.error = true;
                        console.error(error);
                    });
            },
            beforeEnter(el) {
                TweenMax.set(el, {alpha: 0, height: 0});
            },
            enter(el, done) {
                let delay = el.dataset.index * 0.015;
                TweenMax.to(el, 0.65, {
                    alpha: 1,
                    height: 24,
                    delay: delay,
                    ease: Power4.easeOut,
                    onComplete: done,
                });
            },
            leave(el, done) {
                let delay = el.dataset.index * 0.015;
                TweenMax.to(el, 0.65, {
                    alpha: 0,
                    height: 0,
                    ease: Power4.easeOut,
                    delay: delay,
                    onComplete: done,
                });
            },
        },
        computed: {
            filteredUsers() {
                return this.users.filter(item => {
                    return (
                        item.name
                            .toLowerCase()
                            .indexOf(this.filter.toLowerCase()) !== -1
                    );
                });
            },
        },
    };
</script>

<template>
    <main-transition>
        <div class="Home">
            <h1 ref="title">{{$t("home.title")}}</h1>
            <h3>{{$t("home.subtitle")}}</h3>

            <h4 v-if="loading">loading data</h4>
            <h4 v-else-if="error">Error loading</h4>
            <div v-else-if="!loading && !error" class="users">
                <input type="text" v-model="filter">
                <transition-group name="staggered-fade" tag="ul" :css="false" @before-enter="beforeEnter" @enter="enter"
                                  @leave="leave">
                    <li v-for="(user, index) in filteredUsers" :key="user.id" :data-index="index">{{user.name}}</li>
                </transition-group>
            </div>
            <div class="player-container">
                <div class="content">
                    <video-player
                        className="Player"
                        :autoPlay="false"
                        useNoise
                        poster="http://il6.picdn.net/shutterstock/videos/3548084/thumb/1.jpg?i10c=img.resize(height:160)"
                        src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4"
                        togglePlayOnClick
                        showPosterOnEnd
                        hasControls
                    ></video-player>
                </div>
            </div>
        </div>
    </main-transition>
</template>

<style src="styles/views/Home.styl" lang="stylus"></style>
