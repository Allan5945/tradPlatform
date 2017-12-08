<template>
    <div v-if="renderComponent">
        <bmap :allDot="allDot"></bmap>
        <navigation @toShow="toShow"></navigation>
        <toPublish v-show="show"></toPublish>
        <tagIcon></tagIcon>
        <messageBox></messageBox>
        <transition name="dialog">
            <transDialog v-show="dialog"  @cancel="dialog = false" @sure="sureDialog"></transDialog>
        </transition>
        <needDetail @formShow="formShow" v-show="detailShow" @transShow="transShow" @closeDetail="closeDetail"></needDetail>
        <myPlan v-show="planShow" @showPlan="showPlan"></myplan>
        <respondAirport @responseShow="responShow" @responseClose="responClose" v-show="respond"></respondAirport>
        <intentForm v-show="intentFormShow" @sumitForm="dialog = true" @closeForm="closeForm"></intentForm>
        <myIntention @closeIntent="intentShow = false" v-show="intentShow" @formShow="formShow1" @openIntent="openIntent"></myintention>
        <myIntentForm v-show="myFormShow" @closeMyForm="closeMyForm"></myIntentForm>
         <infPanel></infPanel>
        <paySuccess @cancel="payDialog = false" v-show="payDialog"></paySuccess>
        <airlineDetailPayAfter v-show="detailShow2" @transShow='transShow2'  @closeThis="closeThis"></airlineDetailPayAfter>
       <myIndex></myIndex>
        <routeNetwork></routeNetwork>
         <!--<myIndexFzz></myIndexFzz>-->
    </div>
</template>

<script>
    import * as vx from 'vuex'
    import index from './../page/index.vue'
    import bmap from './components/bmap/bmap.vue'
    import navigation from './components/toolbar/navigation.vue'
    import tagIcon from './components/independenceComponents/tagIcon.vue'
    import messageBox from './components/demandListComponents/mesBox.vue'
    import toPublish from './../page/components/toPublish.vue'
    import needDetail from './../page/components/trans_detail/needDetail.vue'
    import intentForm from './../page/components/trans_detail/intentForm.vue'
    import myPlan from './../page/components/trans_detail/myPlan.vue'
    import myIntention from './../page/components/trans_detail/myIntention.vue'
    import transDialog from './../page/components/trans_detail/dialog.vue'
    import respondAirport from './../page/components/trans_detail/respondAirport.vue'
    import myIntentForm from './../page/components/trans_detail/myIntentForm.vue'
    import paySuccess  from './../page/components/trans_detail/paySuccess.vue'
    import {conversionsCity,conversions} from './../public/js/conversions'
    import airlineDetailPayAfter from './../page/components/airlineDetailPayAfter.vue'
    import infPanel from './components/independenceComponents/infPanel.vue'

    import myIndex from './../page/components/mine/myIndex.vue'
    import myIndexFzz from './../page/components/mine/myIndex-fzz.vue'
    import myPublish from './../page/components/mine/myPublish.vue'
    import myPurpose from './../page/components/mine/myPurpose.vue'


    import routeNetwork from '$src/page/components/independenceComponents/routeNetwork.vue'
    export default {
        data() {
            return {
                test1:false,
                renderComponent:false,
                name: 1,
                show: false,
                dialog:false,
                payDialog:false,
                intentFormShow:false,
                planShow:false,
                respond:false,
                intentShow:false,
                myFormShow:false,
                detailShow:false,
                detailShow2: false,
                loadingData: {
                    airList: false,
                    demands: false,
                    cityList: false,
                    routeNetwork:false,
                    data: {
                        airListData: null,
                        cityListData: null,
                    }
                },
                allDot: '',
                test: 555,
                demandId: ''
            }
        },
        methods: {
            ...vx.mapActions([
                'close',
                'initialize'
            ]),
            toShow() {
                this.show = !this.show;
            },
            formShow(){
                this.intentFormShow = !this.intentFormShow;
            },
            formShow1(){
                this.myFormShow = !this.myFormShow
            },
            openIntent() {
                this.intentShow = true;
                this.detailShow2 = false;
            },
            closeForm(){
                this.intentFormShow = !this.intentFormShow;
            },
            closeMyForm(){
                this.myFormShow = !this.myFormShow;
            },
            closeDetail(){
                this.detailShow =false;
            },
            responShow(){
                this.respond = true;
                this.detailShow = false;
                this.detailShow2 = false;
            },
            responClose(){
                this.respond = false;
            },
             closeThis() {
                this.detailShow2 = false;
            },
            sureDialog(){
                this.intentFormShow = false;
                this.planShow = true;
                this.payDialog = true;
                this.detailShow = false;
            },
            showPlan:function(){
                this.planShow = false;
            },
            transShow:function(){
                this.detailShow = true;
                this.detailShow2 = false;
                this.respond = false;

            },
            transShow2: function () {
                this.detailShow2 = true;
                this.detailShow = false;
                this.respond = false;
                this.intentShow = false;
            },
            init:function () {
                if(
                    this.loadingData.airList &&
                    this.loadingData.cityList &&
                    this.loadingData.demands &&
                    this.loadingData.routeNetwork &&
                    this.loadingData.data.airListData != null &&
                    this.loadingData.data.cityListData != null
                ) {
                    this.$store.dispatch('initialize', this.loadingData.data).then(() => {
                        this.renderComponent = true;
                    });

                }
                ;
            }
        },
        beforeMount: function () {
//            if (this.role == null) window.location.href = '#/login'
        },
        mounted: function () {
            this.$ajax({
                method: 'post',
                url: '/airList',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
                .then((response) => {
                    this.loadingData.data.airListData = conversions(response.data.mes);
                    this.loadingData.airList = true;
                    this.init();
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
            this.$ajax({
                method: 'post',
                url: '/getCityAllList',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
                .then((response) => {
                    this.loadingData.data.cityListData = conversionsCity(response.data.list);
                    this.loadingData.cityList = true;
                    this.init();
                })
                .catch((error) => {
                        console.log(error);
                    }
                );

            this.$ajax({
                method: 'post',
                url: '/getAllDemands',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
                .then((response) => {
                    let arr = [];
                    response.data.data.forEach((val) => {
                        if (
                            val.cityCoordinateJ != null &&
                            val.cityCoordinateW != null &&
//                            val.demandType != null &&
                            val.dpt != null &&
//                            val.newInfo != null &&
                            val.num != null &&
                            val.obj != null
                        ) {
                            arr.push(val)
                        }
                    });
                    this.allDot = arr;
                    this.loadingData.demands = true;
                    this.init();
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
            this.$ajax({
                method: 'post',
                url: '/getAirportListByCode',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
                .then((response) => {
                    if(response.data.list != null){
                        this.$store.dispatch('routeNetwork', response.data.list).then(() => {
                        });
                        this.loadingData.routeNetwork = true;
                        this.init();
                    }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
        },
        computed: {
            ...vx.mapGetters([
                'c_updated',
                'airList',
                'role'
            ])
        },
        components: {
            bmap,
            navigation,
            tagIcon,
            messageBox,
            toPublish,
            needDetail,
            intentForm,
            myPlan,
            transDialog,
            myIntention,
            paySuccess,
            airlineDetailPayAfter,
            infPanel,
            myIntentForm,
            myIndex,
            myIndexFzz,
            myPublish,
            myPurpose,
            routeNetwork,
            respondAirport
        }
    }
</script>

<style lang="scss">
</style>
