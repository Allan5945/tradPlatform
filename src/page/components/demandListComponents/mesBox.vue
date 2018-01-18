<template>
    <div class="demand" :class="{'demandMin':min,'demandMax':!min}">
        <mesMinComponent v-on:openMax="open" v-if="min"></mesMinComponent>
        <mesMaxComponent v-on:openMin="open" v-if="!min"></mesMaxComponent>
    </div>
</template>
<script>
    import mesMaxComponent from './mesMax.vue'
    import mesMinComponent from './mesMin.vue'
    import * as vx from 'vuex'
    import conversions from '../../../public/js/conversions'
    export default {
        data(){
            return{
                min:true,
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
        beforeMount:function () {
            this.$ajax({
                url:"/getDemandsForCurrentEmployee",
                method: 'post',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                params: {
                    page:this.demandList.hybridPage
                }
            }) .then((response) => {
                if(response.data.opResult != '1'){
                    this.$store.dispatch('hybridData',{v:response.data.list,t:0}).then(() => {});
                }
            })
                .catch((error) => {
                    console.log(error);
                });
        },
        computed:{
            ...vx.mapGetters([
                'demandList'
            ])
        }

    }
</script>
<style scoped lang="scss">
    .demand{
        position: absolute;
        /*background-color: red;*/
        height: 100%;
    }
    .demandMin{
        top: 0;
        left: 0;
        background-color: white;
    }
    .demandMax{
        top: 100px;
        left: 50%;
        margin:0 0 0 -500px;
    }
</style>