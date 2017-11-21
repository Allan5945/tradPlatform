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
    import conversions from './../../public/js/conversions'
    export default {
        data(){
            return{
                min:true,
                hybridData:{}, // 混合数据
                page:1,     // 页码
                monoData:{} // 图标筛选数据
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
                    page:this.page
                }
            }) .then((response) => {
                this.$store.dispatch('hybridData', response.data.list.list).then(() => {});
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
        height: 80%;
    }
    .demandMin{
        top: 40px;
        left: 40px;
    }
    .demandMax{
        top: 100px;
        left: 50%;
        margin:0 0 0 -500px;
    }
</style>