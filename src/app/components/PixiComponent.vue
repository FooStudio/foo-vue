<style src="styles/components/PixiComponent.styl" lang="stylus" scoped></style>

<script type="text/babel">

    import "pixi.js"

    import PixiStage from "app/components/PixiStage"

    export default{
        name: "PixiComponent",
        data(){
            return {}
        },
        mounted(){
            this.$nextTick(() => {
                this.startPixi();
            });
        },
        props: {},
        components: {},
        methods: {
            startPixi(){
                this.renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0x1099bb});
                this.$el.appendChild(this.renderer.view);

                this.stage = new PixiStage(this.$route);

                App.rendered.add(this.animate);
            },
            animate(){
                this.renderer.render(this.stage);
            }
        },
        computed: {},
        watch: {
            "$route": function (value) {
                if (this.stage) this.stage.updateRoute(value);
            }
        },
        destroyed(){
            App.rendered.remove(this.animate);
            this.stage.cleanUp();
            this.renderer.destroy(true);
            this.stage = null;
            this.renderer = null;
        }
    }
</script>

<template>
    <div class="PixiComponent"></div>
</template>
