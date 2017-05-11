<style src="styles/views/Test.styl" lang="stylus"></style>

<script>
    import MainTransition from "app/transitions/GSAP";
    import AuthManager from "foo/net/AuthManager";
    import Xeerpa from "foo/net/api/XeerpaApi";
    import {LOGIN} from "app/store/modules/user";
    import XeerpaWidget from "app/components/XeerpaWidget.vue";
    import isEmpty from 'lodash/isEmpty';

    export default {
        name: "Test",
        data(){
            return {
                appSize: {width: App.width, height: App.height}
            };
        },
        props: {},
        components: {MainTransition, XeerpaWidget},
        mounted(){
            App.resize.add(this.appResized);
        },
        destroyed(){
            App.resize.remove(this.appResized);
        },
        methods: {
            appResized(size){
                this.appSize = size;
            },
            onFBLogin(){
                this.$store.dispatch(LOGIN, {service: AuthManager.services.FB}).catch((error) => {
                    // not able to do login
                    console.error(error);
                });
            },
            onXeerpaLogin(){
                this.$store.dispatch(LOGIN, {service: AuthManager.services.XE, xs: Xeerpa.FB});
            },
            onGoogleLogin(){
                this.$store.dispatch(LOGIN, {service: AuthManager.services.GO}).catch((error) => {
                    // not able to do login
                    console.error(error);
                });
            }
        },
        computed: {
            fbLoggedIn(){
                return !isEmpty(this.$store.state.user.facebook);
            },
            fbData(){
                return this.$store.state.user.facebook;
            },
            xeerpaLoggedIn(){
                return !isEmpty(this.$store.state.user.xeerpa);
            },
            googleLoggedIn(){
                return !isEmpty(this.$store.state.user.google);
            },
            googleData(){
                return this.$store.state.user.google;
            }

        }
    };
</script>

<template>
    <main-transition>
        <div class="Test">
            <h1 ref="title">{{$t("test.title")}}</h1>
            <h3 ref="sub">{{$t("test.subtitle")}}</h3>
            <p ref="info">width:{{appSize.width}} | height:{{appSize.height}} </p>
            <button @click="onFBLogin" v-if="!fbLoggedIn">FB Login</button>
            <div v-else>
                <h2>Facebook</h2>
                <h5>{{fbData.profile.name}}</h5>
                <img :src="fbData.profile.profile_pic.url" :alt="fbData.profile.name">
            </div>
            <button @click="onGoogleLogin" v-if="!googleLoggedIn">Google Login</button>
            <div v-else>
                <h2>Google</h2>
                <h5>{{googleData.profile.name}}</h5>
                <img :src="googleData.profile.image_url" :alt="googleData.profile.name">
            </div>
            <button @click="onXeerpaLogin" v-if="!xeerpaLoggedIn">Xeerpa Login</button>
            <xeerpa-widget v-else></xeerpa-widget>
        </div>
    </main-transition>
</template>
