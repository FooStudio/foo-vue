<style src="styles/components/RotateScreen.styl" lang="stylus" scoped></style>

<script>
    export default{
        name: "RotateScreen",
        props: {
            width: {
                type: Number,
                required: true
            },
            height: {
                type: Number,
                required: true
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
