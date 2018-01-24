<template>
    <div>
        <!-- 航线详情-->
        <airlineDetailPayAfter v-if="mes.demandType === 0 " @closewindow="closewindow" :mes="mes"></airlineDetailPayAfter>
        <!--运力详情-->
        <transIndex v-if="mes.demandType === 1" @closewindow="closewindow" :mes="mes"></transIndex>


        <!--航线委托详情-->
        <detailMyPublishAirLineEntrust v-if="mes.demandType === 3 && role.role != 2" @closewindow="closewindow" :mes="mes"></detailMyPublishAirLineEntrust>
        <!--运力委托详情-->
        <detailMyPublishAirLineEntrust1 v-if="mes.demandType === 4 && role.role != 2" @closewindow="closewindow" :mes="mes"></detailMyPublishAirLineEntrust1>
        <!--运营托管详情-->
        <detailMyPublishTransportEntrust v-if="mes.demandType === 2 && role.role != 2" @closewindow="closewindow" :mes="mes"></detailMyPublishTransportEntrust>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import airlineDetailPayAfter from './../../../page/components/airlineDetailPayAfter.vue'
    import transIndex from './../../components/trans_detail/transIndex.vue'
    import In from '$src/public/js/tabulationBoxTrigger.js'
    import detailMyPublishAirLineEntrust from './detailMyPublishAirLineEntrust.vue'
    import detailMyPublishAirLineEntrust1 from './detailMyPublishAirLineEntrust1.vue'
    import detailMyPublishTransportEntrust from './detailMyPublishTransportEntrust.vue'
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
                console.log(data)
                _this.mes = data;
            });
        },
        computed: {
            ...vx.mapGetters([
                'role'
            ])
        },
        components:{
            airlineDetailPayAfter,
            transIndex,
            detailMyPublishAirLineEntrust,
            detailMyPublishAirLineEntrust1,
            detailMyPublishTransportEntrust,
        }
    }
</script>
<style scoped type="scss">

</style>