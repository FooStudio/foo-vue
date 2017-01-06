<style src="styles/views/Contact.styl" lang="stylus"></style>

<script type="text/babel">

    import SideBar from "app/components/SideBar.vue"
    import ContactTransition from "app/transitions/ContactTransition"

    export default{
        name: "Contact",
        data(){
            return {
                tab: true,
                nombre: ""
            }
        },
        props: {},
        components: {SideBar, ContactTransition},
        methods: {
            onClick(data){
                console.log(data);
                this.tab = false;
                console.log(this.nombre);
            }
        },
        computed: {},
        watch: {}
    }
</script>

<template>
    <contact-transition>
        <div class="Contact">
            <h1>contact</h1>
            <transition name="fade">
                <button v-show="tab" @click="onClick(10)">test</button>
            </transition>
            <input type="text" v-model="nombre">
            <side-bar v-for="i in 10" :nombre="nombre"></side-bar>
        </div>
    </contact-transition>
</template>
