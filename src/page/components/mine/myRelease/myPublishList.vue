<template>
    <div>
        <div class="miList-wrapper">
            <div class="miList-container">
                <div class="title items">
                    <div class="list-a item">
                        发布时间
                        <div class="up-down" style="margin-left: 10px" @click="timeUpDownClick">
                            <span class="icon-item icon-up" :class="{active: timeUpDown == true}">&#xe605;</span>
                            <span class="icon-item icon-down" :class="{active: timeUpDown == false}">&#xe605;</span>
                        </div>
                    </div>
                    <div class="list-b item" @click="typeShowFn">
                        {{typeWriting}}
                        <div class="triangle-little" style="margin-left: 10px"></div>
                        <ul class="type-list" v-show="typeShow">
                            <li v-for="item in type" @click="typeClickFn(item)">{{item}}</li>
                        </ul>
                    </div>
                    <div class="list-c item">
                        发布标题
                    </div>
                    <div class="list-d item" @click="stateShowFn">
                        <span>{{stateWriting}}</span>
                        <div class="triangle-little" style="margin-left: 10px"></div>
                        <stateList :state="state" v-show="stateShow" @stateClick="stateClickFn"></stateList>
                    </div>
                    <div class="list-e item"></div>
                    <div class="list-f item"></div>
                </div>
                <div class="lists-containt">
                    <!--点击列表展示发布详情-->
                    <div class="list items" v-for="(item,index) in myData" :class="{'list-active': listItemIndex === index}" @click="listClickFn(item,index)">
                        <div class="list-a item">
                            {{item.releasetime}}
                        </div>
                        <div class="list-b item">
                            {{item.demandtypeStr}}
                        </div>
                        <div class="list-c item color">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="list-d item">
                            {{item.demandprogress}}
                        </div>
                        <div class="list-e item">
                        <span class="icon-item talk-icon">&#xe602;
                            <span v-show="talkNumShow">1</span>
                        </span>
                        </div>
                        <div class="list-f item color">查看详情<span class="icon-item">&#xe686;</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition-group name="slidex-fade">
            <!--<myPublish v-show="myPublishShow" @close-this="closeMyPublishShowFn" :key="1"></myPublish>-->
            <myPublish0 v-show="myPublishShow0" @refresh="refreshFn" @close-this="closeMyPublishShowFn0" :key="2"></myPublish0>
            <myPublishNeed1 v-show="myPublishShow1" @close-this="closeMyPublishShowFn1" :key="3"></myPublishNeed1>
            <!--<myPublishAirline v-show="myPublishAirlineShow" @close-this="closeMyPublishAirlineFn" :key="4"></myPublishAirline>-->
            <myPublishTransportEntrust v-show="myPublishTransportEntrustShow" @close-this="closeMyPublishTransportEntrustFn" :key="5"></myPublishTransportEntrust>
            <myPublishAirLineEntrust v-show="myPublishAirLineEntrustShow" @close-this="closeMyPublishAirLineEntrustFn" :key="6"></myPublishAirLineEntrust>
        </transition-group>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';
    import stateList from '../stateList.vue'
//    import myPublish from './myPublishNeed.vue' // 运力需求详情
    import myPublish0 from './myPublishNeed0.vue' // 航线需求详情
    import myPublishNeed1 from './myPublishNeed1.vue' // 运力需求详情

//    import myPublishAirline from './myPublishAirline.vue' //航线需求详情
    import myPublishTransportEntrust from './myPublishTransportEntrust.vue'
    import myPublishAirLineEntrust from './myPublishAirLineEntrust.vue'

    export default {
        data() {
            return {
                typeShow: false,    //需求类型显示
                stateShow: false,   //状态显示
                typeWriting: '需求类型',
                stateWriting: '状态',
                //不同需求类型展现的状态不同
//                type: [],
                type: [],
                type0: ['运力投放','委托运力投放'], // 0：航司方登录
                type1: ['航线需求','委托航线需求','运营托管'], // 1：机场方登录
                state: [],
                state1: ['需求发布','意向征集','订单确认','关闭(审核不通过、下架、过期)','订单完成','佣金支付','交易完成'],
                state2: ['待处理','测评中','已接受','已拒绝','已关闭'],
                state3: ['待处理','处理中','意向征集','订单确认','订单完成','已拒绝','已完成','已关闭'],
                state4: ['需求发布','意向征集','订单确认','关闭(审核不通过、下架、过期)','交易完成'],
                myPublishShow: false,       // myPublish(我的发布-运力详情)是否显示
                myPublishShow0: false,       // myPublish(运力详情 + 航线详情)是否显示
                myPublishShow1: false,       // 运力详情显示
                myPublishAirlineShow: false, // 航线详情是否显示
                myPublishTransportEntrustShow: false, // myPublishEntrust（我的发布-发布的运力托管）是否显示
                myPublishAirLineEntrustShow: false,   //myPublishAirLineEntrust（我的发布-发布的航线托管）是否显示
                myData: [],                 // 将获取的数据，渲染到页面上
                myData0: [],                 // 航司能看到的数据，渲染到页面上
                myData1: [],                 // 机场能看到的数据，渲染到页面上
                listItemIndex: '',          // 被点击列的index，用来使其变成active
                talkNumShow: false,         // 是否有对话

                timeUpDown: true,           // 通过时间进行排序
                sendData:{                   // 请求的参数
                    page:1,                  // 页码，必传
//                    pageNo:4,
                    demandType: '',         // 查询需求类型 0:航线需求、1:运力需求、2:运营托管、3:航线委托、4:运力委托
                    demandprogress:'',      // 状态类型 0:需求发布、1:意向征集、2:订单确认、3:关闭（审核不通过、下架、过期）、
                                                // 4:订单完成、5:佣金支付、6:交易完成、7:待处理、8:已接受、9:处理中、10:已拒绝
                    orderType: 0            // 发布时间排序类型，0:倒序，1:正序
                },
            }
        },
        mounted() {
            this.judgeRole();
            this.getListData();
            tabulationBoxTrigger.hierarchy = false; // navigation层级，true：不显示，false：显示
        },
        watch: {
            'sendData.orderType': function () {
                this.getListData();
//                this.judgeRole();
            },
            'sendData.demandType': function () {
                this.getListData();
//                this.judgeRole();
            },
            'sendData.demandprogress': function () {
                console.info('1')
                this.getListData();
//                this.judgeRole();
            },
        },
        computed: {
            ...vx.mapGetters([
                'role'
            ]),
        },
        methods: {
            // 根据登陆角色不同，展示的数据不同
            judgeRole: function () {
                // 判断是机场(1)还是航司(0)登录
                console.info('this.role.role:'+ this.role.role)
                console.info(this.myData)
                if(this.role.role == 0) {
                    this.type = this.type0;
                    this.myData = this.myData0;
                }if(this.role.role == 1) {
                    this.type = this.type1;
                    this.myData = this.myData1;
                }
            },
            // ajax获取列表数据
            getListData: function () {
                this.$ajax({
                    url:"/getTheReleaseDemandOfMine",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: this.sendData
                }) .then((response) => {
                    console.info('myPublishList获取的数据:')
                    console.info(response)
                    if(response.data.opResult === '0') {
//                        alert('我的发布列表')
                        response.data.list.list.forEach((val) => {
                            if(val.demandtype == 1 || val.demandtype == 4 ){
                                this.myData0.push(val);
                            }if(val.demandtype == 0 || val.demandtype == 3 || val.demandtype == 2){
                                this.myData1.push(val);
                            }
                        })
                        this.judgeRole();
                    }else if(response.data.opResult === '1') {
                        console.info('ajax1')
                        this.myData0 = [];
                        this.myData1 = [];
                        this.judgeRole();
                    }else {
                        alert('无法请求到数据，错误代码：' + response.data.opResult)
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            // 刷新页面数据
            refreshFn: function () {
                console.info('refreshFn');
                this.getListData();
            },
            typeShowFn: function () {
                this.typeShow = !this.typeShow;
            },
            stateShowFn: function () {
                this.stateShow = !this.stateShow;
            },
            // 通过“发布时间”选择展示内容
            timeUpDownClick: function () {
                this.myData0 = [];
                this.myData1 = [];
                this.timeUpDown = !this.timeUpDown;
                this.sendData.orderType = this.timeUpDown ? 0 : 1;
            },
            // 通过“需求类型”选择展示内容 0:航线需求、1:运力需求、2:运营托管、3:航线委托、4:运力委托
            typeClickFn: function (item) {
                this.myData0 = [];
                this.myData1 = [];
                this.typeWriting = item;
                this.sendData.demandprogress = ''; // 状态类型
                this.stateWriting = '状态';
                if(item == '航线需求') {
                    this.state = this.state1;
                    this.sendData.demandType = 0;
                }if(item == '运营托管') {
                    this.state = this.state2;
                    this.sendData.demandType = 2;
                }if(item == '委托运力投放' || item == '委托航线需求') {
                    this.state = this.state3;
                    if(item == '委托运力投放') {
                        this.sendData.demandType = 4;
                    }if(item == '委托航线需求') {
                        this.sendData.demandType = 3;
                    }
                }if(item == '运力投放') {
                    this.state = this.state4;
                    this.sendData.demandType = 1;
                }
            },
            // 通过“状态”选择展示内容  状态类型 0:需求发布、1:意向征集、2:订单确认、3:关闭（审核不通过、下架、过期）、
            // 4:订单完成、5:佣金支付、6:交易完成、7:待处理、8:已接受、9:处理中、10:已拒绝
            stateClickFn: function (item) {
                this.myData0 = [];
                this.myData1 = [];
                this.stateWriting = item;
                if(item == '需求发布') {
                    this.sendData.demandprogress = 0;
                }if(item == '意向征集') {
                    console.info(0)
                    this.sendData.demandprogress = 1;
                }if(item == '订单确认') {
                    this.sendData.demandprogress = 2;
                }if(item == '关闭(审核不通过、下架、过期)' || item == '已关闭') {
                    this.sendData.demandprogress = 3;
                }if(item == '订单完成') {
                    this.sendData.demandprogress = 4;
                }if(item == '佣金支付') {
                    this.sendData.demandprogress = 5;
                }if(item == '交易完成' || item == '已完成') {
                    this.sendData.demandprogress = 6;
                }if(item == '待处理') {
                    this.sendData.demandprogress = 7;
                }if(item == '已接受') {
                    this.sendData.demandprogress = 8;
                }if(item == '处理中' || item == '测评中') {
                    this.sendData.demandprogress = 9;
                }if(item == '已拒绝') {
                    this.sendData.demandprogress = 10;
                }
            },

            // 点击列表(list)，变成active状态, 确定哪个显示; 向myPublish.vue传参数
            listClickFn: function (item,index) {
                this.listItemIndex = index; //变成active状态
                console.info('listItem:')
                console.info(item)
                this.$ajax({
                    url:"/demandFind",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: {
                        demandId: item.id //发布时间排序类型 0-倒序 1-正序
                    }
                }) .then((response) => {
                    console.info('我的发布详情:')
                    console.info(response.data.data)
                    tabulationBoxTrigger.$emit('sendDataToMyPublish',response.data.data); //将item的参数传递给myPurposeNeed/myPurposeNeed2.vue
                    tabulationBoxTrigger.hierarchy = true; //将nav栏层级下调，不显示
                }).catch((error) => {
                    console.log(error);
                });

                //['运力投放','委托运力投放','航线需求','委托航线需求','运营托管'],
//                响应的需求种类共5种（0:航线需求、1:运力需求、2:运营托管、3:航线委托、4:运力委托）
//                 除去0和1两种状态, 其他状态不再地图上呈现，仅在太美角色个人中心的委托列表中呈现。
                if(item.demandtype == 2){
                    // 运营托管详情
                    this.myPublishTransportEntrustShow = true;
                    this.myPublishAirLineEntrustShow = false;
//                    this.myPublishShow = false; // 此组件不要了
                    this.myPublishShow0 = false;
                    this.myPublishShow1 = false;
//                    this.myPublishAirlineShow = false;
                }if(item.demandtype == 3 || item.demandtype == 4){
                    // 航线委托详情
                    this.myPublishTransportEntrustShow = false;
                    this.myPublishAirLineEntrustShow = true;
//                    this.myPublishShow = false; // 此组件不要了
                    this.myPublishShow0 = false;
                    this.myPublishShow1 = false;
//                    this.myPublishAirlineShow = false;
                }if(item.demandtype == 1){
                    //  运力需求详情（航司发布，我写的）
                    this.myPublishTransportEntrustShow = false;
                    this.myPublishAirLineEntrustShow = false;
//                    this.myPublishShow = false; // 此组件不要了
                    this.myPublishShow0 = false;
                    this.myPublishShow1 = true;
//                    this.myPublishAirlineShow = false;
                }if(item.demandtype == 0){
                    //  航线需求详情（机场发布，我写的）
                    this.myPublishTransportEntrustShow = false;
                    this.myPublishAirLineEntrustShow = false;
//                    this.myPublishShow = false; // 此组件不要了
                    this.myPublishShow0 = true;
                    this.myPublishShow1 = false;
//                    this.myPublishAirlineShow = true;
                }

            },
           /* // 点击关闭:我的发布-运力需求详情
            closeMyPublishShowFn: function () {
                this.myPublishShow = false;
                this.listItemIndex = '';
                tabulationBoxTrigger.hierarchy = false;
            },*/
            // 点击关闭:我的发布-航线详情
            closeMyPublishShowFn0: function () {
                this.myPublishShow0 = false;
                this.listItemIndex = '';
                tabulationBoxTrigger.hierarchy = false;
            },
            // 点击关闭:我的发布-运力需求详情
            closeMyPublishShowFn1: function () {
                this.myPublishShow1 = false;
                this.listItemIndex = '';
                tabulationBoxTrigger.hierarchy = false;
            },
            /*// 点击关闭:我的发布-行线需求详情
            closeMyPublishAirlineFn: function () {
//                this.myPublishAirlineShow = false;
                this.listItemIndex = '';
                tabulationBoxTrigger.hierarchy = false;
            },*/
            // 点击关闭:我的发布-发布的运力托管
            closeMyPublishTransportEntrustFn: function () {
                this.myPublishTransportEntrustShow = false;
                this.listItemIndex = '';
                tabulationBoxTrigger.hierarchy = false;
            },
            // 点击关闭:我的发布-发布的航线托管
            closeMyPublishAirLineEntrustFn: function () {
                this.myPublishAirLineEntrustShow = false;
                this.listItemIndex = '';
                tabulationBoxTrigger.hierarchy = false;
            }
        },
        components: {
            stateList,
//            myPublish,
            myPublish0,
            myPublishNeed1,
//            myPublishAirline,
            myPublishTransportEntrust,
            myPublishAirLineEntrust
        }
    }
</script>
<style lang="scss" scoped>
    $icon-color: #3c78ff;
    $font-color: #605e7c;
    $border-color: rgba(96,94,124,0.37);
    ul {
        position: absolute;
        margin: 0;
        padding: 0;
        list-style: none;
        border-radius: 4px;
        box-shadow: 0 2px 11px $border-color;
        background: white;
        z-index: 2;
        li {
            padding-left: 17px;
            height: 35px;
            font-size: 1.2rem;
            color: $font-color;
            cursor: pointer;
            &:hover {
                background: #F5F5F5;
            }
        }
    }

    .icon-item {
        font-size: 1.6rem;
        font-family: iconfont;
    }
    .triangle-little {
        width: 0;
        height: 0;
        border-left: 4.5px solid transparent;
        border-right: 4.5px solid transparent;
        border-top: 5px solid $icon-color;
    }
    .color {
        color: #3c78ff;
    }
    .miList-wrapper {
        /*position: absolute;
        bottom: 0;
        left: 0;*/
        width: 100%;
        height: 500px;
        /*height: 434px;*/
        font-size: 1.2rem;
        background: #F8F8F8;
    }
    .miList-container {
        margin: 0 auto;
        padding-top: 40px;
        width: 1000px;
        height: 340px;
        .lists-containt {
            height: 280px;
            overflow-y: scroll;
        }
        .lists-containt::-webkit-scrollbar {
            width: 7px;
        }
        .lists-containt::-webkit-scrollbar-thumb {
            height: 56px;
            background: #D8D8D8;
            border-radius: 4px;
        }
        /*&::after {
            display: block;
            height: 60px;
            content: '';
        }*/
    }
    .items {
        display: flex;
        margin-bottom: 10px;
        padding: 0 40px;
        .item {
            display: flex;
            align-items: center;
            flex-shrink: 0;
        }
        .list-a {
            width: 100px;
            .up-down {
                position: relative;
                width: 20px;
                cursor: pointer;
                .active {
                    color: $icon-color;
                }
                .icon-up {
                    position: absolute;
                    bottom: -4px;
                    transform: rotate(180deg);
                }
                .icon-down {
                    position: absolute;
                    top: -4px;
                }
            }
        }
        .list-b {
            position: relative;
            margin-right: 40px;
            width: 100px;
            .type-list {
                top: 40px;
                left: 0;
                li {
                    display: flex;
                    align-items: center;
                    width: 103px;
                }
            }
        }
        .list-c {
            margin-right: 40px;
            width: 320px;
            >span {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .list-d {
            position: relative;
            width: 80px;
            >span {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .list-e {
            margin-right: 160px;
            width: 20px;
            .talk-icon {
                position: relative;
                font-size: 2.5rem;
                >span {
                    position: absolute;
                    top: -1px;
                    right: -1px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-width: 12px;
                    height: 12px;
                    font-size: 1.0rem;
                    color: white;
                    background: red;
                    border-radius: 20px;
                }
            }
        }
        .list-f {
            width: 60px;
            white-space: nowrap;
        }
    }
    .title {
        height: 40px;
    }
    .list {
        height: 58px;
        border: 1px solid transparent;
        border-radius: 4px;
        background: white;
        &:hover {
            background: #ebebeb;
        }
        &:active {
            border: 1px solid #d0d0d0;
            background: #ebebeb;
        }
        .list-f {
            cursor: pointer;
        }
    }
    .list-active {
        border: 1px solid #d0d0d0;
        background: #ebebeb;
    }
</style>