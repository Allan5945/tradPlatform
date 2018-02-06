<template>
    <div :class="{'detail-box':showMc}" @click.self="closewindow">
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
        <!--太美委托详情-->
        <adminDeleDetail v-if="(mes.demandType === 3||mes.demandType === 4) && role.role == 2" @closewindow="closewindow" :mes="mes"></adminDeleDetail>
        <!--太美运营托管详情 -->
       <adminAgentDetail v-if="mes.demandType === 2 && role.role == 2" @closewindow="closewindow" :mes="mes"></adminAgentDetail>
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
    import adminAgentDetail from './adminAgentDetail.vue'
    import adminDeleDetail from './adminDeleDetail.vue'
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
                    showMc:false
                }
            },
        methods:{
            closewindow(){
                this.mes.demandType = "";
                this.showMc = false;
                In.hierarchy = false;
            }
        },
        mounted(){
            let _this = this;
            In.$on('demandType',(data,show = false)=>{
                _this.mes = data;
                _this.showMc = eval(show);
            });
            In.$on('closeDetailed',()=>{
                _this.mes.demandType = "";
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
            adminDeleDetail,
            adminAgentDetail
        }
    }
</script>
<style scoped type="scss">
    .detail-box{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 20;
        width: 100%;
        height: 100%;
        background-color:rgba(0, 0, 0, .4) ;
    }
</style>
