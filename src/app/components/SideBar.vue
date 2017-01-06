<style src="styles/components/SideBar.styl" lang="stylus" scoped></style>

<script type="text/babel">
    export default{
        name      : "SideBar",
        data(){
            return {}
        },
        props     : ["nombre"],
        mounted(){
            this.hammer = {};
        },
        components: {},
        methods   : {},
        computed  : {
            nombreComp(){
                return (this.nombre != "") ? this.nombre : "No hay nombre";
            }
        },
        watch:{
            nombreComp(old , newVal){
                if (old == "no hay nombre"){
                    console.log("error");
                }
            }
        },
        destroy(){
            this.hammer = null;
        }
    }
</script>

<template>
    <div class="SideBar">
        <h3>{{nombreComp}}</h3>
        <p>sidebar</p>
    </div>
</template>
