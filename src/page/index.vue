<template>
    <div v-if="renderComponent">
        <bmap :allDot="allDot"></bmap>
        <navigation @toShow="toShow"></navigation>
        <toPublish v-show="publichShow"></toPublish>
        <tagIcon></tagIcon>
        <messageBox></messageBox>
         <infPanel></infPanel>
         <transIndex v-show="detailShow" @closeAirline="closeAirline"></transIndex>
        <airlineDetailPayAfter v-show="detailShow2" @transShow='closeTrans'  @closeThis="closeThis"></airlineDetailPayAfter>
        <routeNetwork v-if="role.role != '2'"></routeNetwork>
        <timelyCommunication v-if="dis.shut" v-show="dis.narrow"></timelyCommunication>
        <router-view></router-view>
        <newsTip></newsTip>
        <!-- <timeQuery></timeQuery> -->
    </div>
</template>

<script>
    import Vue from 'vue'
    import * as vx from 'vuex'
    import index from './../page/index.vue'
    import bmap from './components/bmap/bmap.vue'
    import navigation from './components/toolbar/navigation.vue'
    import tagIcon from './components/independenceComponents/tagIcon.vue'
    import messageBox from './components/demandListComponents/mesBox.vue'
    import toPublish from './../page/components/toPublish.vue'
    import {conversionsCity,conversions} from './../public/js/conversions'
    import airlineDetailPayAfter from './../page/components/airlineDetailPayAfter.vue'
    import infPanel from './components/independenceComponents/infPanel.vue'
    import transIndex from './components/trans_detail/transIndex.vue'
    import routeNetwork from '$src/page/components/independenceComponents/routeNetwork.vue'
    import timeQuery from './components/timeQuery/timeIndex.vue'
    //test
    import timelyCommunication from './../page/components/timelyCommunication/timelyCommunication.vue'
    import newsTip from './components/toolbar/newsTip.vue';

    import localCommunication from '$src/public/js/tabulationBoxTrigger.js'
    import ChatSocket from '$src/page/components/timelyCommunication/communicationConstructor.js';

    export default {
        data() {
            return {
                test1:false,
                renderComponent:false,
                name: 1,
                publichShow: false,
                detailShow:false,
                detailShow2:false,
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
            initSocket(){



//                let socket=io.connect(`ws://192.168.10.194:8081/socket?name=${this.role.id}`);

//                socket.emit('login',"898555");
//                socket.emit('message',"nijiushi");

//                ws.onopen = (e)=> {
//                    console.log('连接成功');
////                    this.$chatSocket.init(ws);
//                };
//                ws.onmessage = (data)=>{
//                    console.log(data)
//                };
//                ws.onclose = ()=>{
//                    console.log('关闭连接');
//                }
////                ws.close();
            },
            contactClient(){  // 联系客户

            },
            toShow() {
                this.publichShow = !this.publichShow;
            },
             closeThis() {
                this.detailShow2 = false;
            },
            closeAirline:function(){
                this.detailShow = true;
                this.detailShow2 = false;
            },
            closeTrans: function () {
                this.detailShow2 = true;
                this.detailShow = false;
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

                };
            }
        },
        beforeMount: function () {

        },
        mounted: function () {

            if(!('$chatSocket' in this)){
//                Vue.prototype.$chatSocket = new ChatSocket(`ws://localhost:8029/socket?name=${this.role.id}`);
//                Vue.prototype.$chatSocket = new ChatSocket(socketIp);
                Vue.prototype.$chatSocket = new ChatSocket(socketIp + this.role.id);
            }
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
                    }
                    this.loadingData.routeNetwork = true;
                    this.init();
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
//
        },
        computed: {
            ...vx.mapGetters([
                'c_updated',
                'airList',
                'role'
            ]),
            dis:function () {  // 计算聊天框是显示还是关闭
                return {
                    shut:localCommunication.chat.shut,
                    narrow:localCommunication.chat.narrow
                };
            }
        },
        components: {
            newsTip,
            bmap,
            navigation,
            tagIcon,
            messageBox,
            toPublish,
            airlineDetailPayAfter,
            transIndex,
            infPanel,
            routeNetwork,
            timelyCommunication,
            timeQuery
        }
    }
</script>

<style lang="scss">
</style>
