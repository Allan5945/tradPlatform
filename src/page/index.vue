<template>
    <div v-if="renderComponent">
        <bmap :allDot="allDot"></bmap>
       <!-- <navigation @toShow="toShow"></navigation>
        <toPublish v-show="show" @toShow="toShow"></toPublish>
        <tagIcon></tagIcon>
        <messageBox></messageBox>-->
        <!--<airlineReq></airlineReq>-->
        <!--<airlineDetail></airlineDetail>-->
        <!--<airlineWrite></airlineWrite>-->
        <!--<airlineDetailMine></airlineDetailMine>-->
        <!--<airlinePay></airlinePay>-->
        <!--<airlineDetailPayAfter></airlineDetailPayAfter>-->
        <airlineAffirm></airlineAffirm>
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
    import conversions from './../public/js/conversions'
    import airlineReq from './components/airlineReq.vue'
    import airlineWrite from './components/airlineWrite.vue'

    import airlineDetail from './../page/components/airlineDetail.vue'
    import airlineDetailMine from './../page/components/airlineDetailMine.vue'
    import airlinePay from './../page/components/airlinePay.vue'
    import airlineDetailPayAfter from './../page/components/airlineDetailPayAfter.vue'
    import airlineAffirm from './../page/components/airlineAffirm.vue'

    export default {
        data() {
            return {
                name: 1,
                show: false,
                loadingData: {
                    airList: false,
                    demands: false
                },
                allDot: '',
                test: 555
            }
        },
        methods: {
            ...vx.mapActions([
                'close',
                'initialize'
            ]),
            toShow() {
                this.show = !this.show;
            }
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
                    this.$store.dispatch('initialize', conversions(response.data.mes)).then(() => {
                    });
                    this.loadingData.airList = true;
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
                    response.data.data.forEach((val)=>{
                        if(
                            val.cityCoordinateJ != null &&
                            val.cityCoordinateW != null &&
                            val.demandType != null &&
                            val.dpt != null &&
                            val.newInfo != null &&
                            val.num != null &&
                            val.obj != null
                        ){
                            arr.push(val)
                        }
                    });
                    this.allDot = arr;
                    this.loadingData.demands = true;
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
        },
        computed: {
            ...vx.mapGetters([
                'c_updated',
                'airList'
            ]),
            renderComponent: function () {
                if (this.loadingData.airList && this.loadingData.demands) {
                    return true;
                } else {
                    return false;
                };
            }
        },
        components: {
            bmap,
            navigation,
            tagIcon,
            messageBox,
            airlineReq,
            airlineDetail,
            toPublish,
            airlineWrite,
            airlineDetailMine,
            airlinePay,
            airlineDetailPayAfter,
            airlineAffirm
        }
    }
</script>
