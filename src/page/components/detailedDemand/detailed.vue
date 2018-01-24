<template>
    <div>
        <!-- 航线详情-->
        <airlineDetailPayAfter v-if="mes.demandType == 0" @closewindow="closewindow" :mes="mes"></airlineDetailPayAfter>
        <!--运力详情-->
        <transIndex v-if="mes.demandType == 1" @closewindow="closewindow" :mes="mes"></transIndex>

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
            closewindow(){
                this.mes.demandType = "";
            }

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