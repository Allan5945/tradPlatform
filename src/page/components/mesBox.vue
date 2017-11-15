<template>
    <div class="demand" :class="{'demandMin':min,'demandMax':!min}">
        <mesMinComponent v-on:openMax="open" v-if="min"></mesMinComponent>
        <mesMaxComponent v-on:openMin="open" v-if="!min"></mesMaxComponent>
    </div>
</template>
<script>
    import mesMaxComponent from './mesMax.vue'
    import mesMinComponent from './mesMin.vue'
    export default {
        data(){
            return{
                min:false
            }
        },
        methods:{
            open:function (v) {
                if(v == 'min'){
                    this.min = true;
                }else{
                    this.min = false;
                }
            }
        },
        components:{
            mesMinComponent,
            mesMaxComponent
        },

    }
</script>
<style scoped lang="scss">
    .demand{
        position: absolute;
        /*background-color: red;*/
        height: 80%;
    }
    .demandMin{
        top: 100px;
        left: 40px;
    }
    .demandMax{
        top: 100px;
        left: 50%;
        margin:0 0 0 -500px;
    }
</style>