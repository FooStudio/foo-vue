<style src="styles/components/RotateScreen.styl" lang="stylus" scoped></style>

<script>
    export default{
        name: "RotateScreen",
        data(){
            return {
                width: App.width,
                height: App.height
            };
        },
        mounted(){
            App.resize.add(this.onResize);
        },
        methods: {
            onResize(size){
                this.width = size.width;
                this.height = size.height;
            }
        },
        computed: {
            style(){
                return {
                    visibility: this.width > this.height ? "visible" : "hidden"
                };
            }
        }
    };
</script>

<template>
    <div class="RotateScreen" :style="style">
        <div class="container">
            <p>Please rotate your device<br/>into portrait mode.</p>
        </div>
    </div>
</template>
