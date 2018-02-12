<template>
    <div :class="{'detail-box':showMc}" @click.self="closewindow">
        <!-- 航线详情-->
        <transition name="slidex-fade">
            <airlineDetailPayAfter v-if="mes.demandType === 0 " @closewindow="closewindow" :mes="mes"></airlineDetailPayAfter>
        </transition>
        <!--运力详情-->
         <transition name="slidex-fade">
             <transIndex v-if="mes.demandType === 1" @closewindow="closewindow" :mes="mes"></transIndex>
         </transition>
        <!--航线委托详情-->
         <transition name="slidex-fade">
             <detailMyPublishAirLineEntrust v-if="mes.demandType === 3 && role.role != 2" @closewindow="closewindow" :mes="mes"></detailMyPublishAirLineEntrust>
         </transition>
        <!--运力委托详情-->
         <transition name="slidex-fade">
             <detailMyPublishAirLineEntrust1 v-if="mes.demandType === 4 && role.role != 2" @closewindow="closewindow" :mes="mes"></detailMyPublishAirLineEntrust1>
         </transition>
        <!--运营托管详情-->
         <transition name="slidex-fade">
             <detailMyPublishTransportEntrust v-if="mes.demandType === 2 && role.role != 2" @closewindow="closewindow" :mes="mes"></detailMyPublishTransportEntrust>
         </transition>
        <!--太美委托详情-->
         <transition name="slidex-fade">
             <adminDeleDetail v-if="(mes.demandType === 3||mes.demandType === 4) && role.role == 2" @closewindow="closewindow" :mes="mes"></adminDeleDetail>
         </transition>
        <!--太美运营托管详情 -->
         <transition name="slidex-fade">
             <adminAgentDetail v-if="mes.demandType === 2 && role.role == 2" @closewindow="closewindow" :mes="mes"></adminAgentDetail>
         </transition>

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
            In.$on('demandType',(data,show = true)=>{
                _this.mes = data;
                _this.showMc = false;
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
