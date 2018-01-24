<template>
    <div>
        <transIndex v-show="detailShow" @closeAirline="closeAirline"  :mes.sync="mes"></transIndex>
        <airlineDetailPayAfter v-show="detailShow2" @transShow='closeTrans'  @closeThis="closeThis" :mes.sync="mes"></airlineDetailPayAfter>
    </div>
</template>
<script>
    import airlineDetailPayAfter from './../../../page/components/airlineDetailPayAfter.vue'
    import transIndex from './../../components/trans_detail/transIndex.vue'
    import In from '$src/public/js/tabulationBoxTrigger.js'

    export default {
            data(){
                return{
                    detailShow:false,
                    detailShow2:false,
                    mes:{
                        demand:"",
                        demandState:"",
                        demandType:""
                    },   //demand  , demandState 需求状态 ,demandType  需求类型
                }
            },
        methods:{
            closeAirline:function(){
                this.detailShow = true;
                this.detailShow2 = false;
            },
            closeTrans: function () {
                this.detailShow2 = true;
                this.detailShow = false;
            },
            closeThis() {
                this.detailShow2 = false;
            },
        },
        mounted(){
            let _this = this;
            In.$on('demandType',data=>{
                _this.mes = data;
            });
        },
        components:{
            airlineDetailPayAfter,
            transIndex,
        }
    }
</script>
<style scoped type="scss">

</style>