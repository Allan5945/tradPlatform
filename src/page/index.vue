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
        <needDetail @formShow="formShow" v-if="detailShow" @transShow="transShow"></needDetail>
        <myPlan v-if="planShow" @showPlan="showPlan"></myplan>
        <intentForm v-if="intentFormShow" @sumitForm="dialog = true" @closeForm="closeForm"></intentForm>
        <!-- <myIntention></myintention> -->
      <paySuccess @cancel="payDialog = false" v-show="payDialog"></paySuccess>

        <!--<airlineDetailPayAfter v-show="detailShow2" @transShow='detailShow2 = true'></airlineDetailPayAfter>-->
        <airlineDetailPayAfter v-show="detailShow2" @transShow='transShow2' @closeThis="closeThis"></airlineDetailPayAfter>
    </div>
</template>

<script>
    import * as vx from 'vuex'
    import index from './../page/index.vue'
    import bmap from './../bmap/bmap.vue'
    import navigation from './../page/components/navigation.vue'
    import tagIcon from './../page/components/tagIcon.vue'
    import messageBox from './../page/components/mesBox.vue'
    import toPublish from './../page/components/toPublish.vue'
    import needDetail from './../page/components/trans_detail/needDetail.vue'
    import intentForm from './../page/components/trans_detail/intentForm.vue'
    import myPlan from './../page/components/trans_detail/myPlan.vue'
    import transDialog from './../page/components/trans_detail/dialog.vue'
    import myIntention from './../page/components/trans_detail/myIntention.vue'
    import paySuccess  from './../page/components/trans_detail/paySuccess.vue'
    import {conversionsCity,conversions} from './../public/js/conversions'
    import airlineReq from './components/airlineReq.vue'
    import airlineDetailPayAfter from './../page/components/airlineDetailPayAfter.vue'
    import airlineDelegation from './../page/components/airlineDelegation.vue'

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
                detailShow:false,
                detailShow2: false,
                loadingData: {
                    airList: false,
                    demands: false,
                    cityList: false,
                    data:{
                        airListData:null,
                        cityListData:null
                    }
                },
                allDot: '',
                test: 555,
                demandId :''
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
            closeForm(){
                this.intentFormShow = !this.intentFormShow;
            },
            closeThis() {
                this.detailShow2 = false;
            },
            sureDialog(){
                this.intentFormShow = false;
                this.planShow = true;
                this.payDialog = true;
                this.detailShow = false;
               /* const self = this;
                switch (self.dialog_type){
                    case 'clear':
                        self.$store.dispatch('clearevent');
                        break;
                    case 'del':
                        self.$store.dispatch('delevent',self.del_info);
                        break;
                }
                this.dialog = false;*/
            },
            showPlan:function(){
                this.planShow = false;
            },
            transShow:function(){
                this.detailShow = true;
            },
            transShow2: function () {
//                console.info(3);
                this.detailShow2 = true;
            },
            init:function () {
                if(
                    this.loadingData.airList &&
                    this.loadingData.cityList &&
                    this.loadingData.demands &&
                    this.loadingData.data.airListData != null &&
                    this.loadingData.data.cityListData != null
                ){
                    this.$store.dispatch('initialize',this.loadingData.data).then(() => {
                        this.renderComponent = true;
                    });

                };
            }
        },
        beforeMount: function () {
            if (this.role == null) window.location.href = '#/login'
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
            airlineReq,
            airlineDetailPayAfter,
            airlineDelegation
        }
    }
</script>

<style lang="scss">
    .dialog-enter-active, .dialog-leave-active {
     transition: opacity .3s;
}
.dialog-enter, .dialog-leave-to{
    opacity: 0;
}
</style>
