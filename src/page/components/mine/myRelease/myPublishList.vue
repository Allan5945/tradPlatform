<template>
    <div>
        <div class="miList-wrapper" @click="closeAllFn">
            <div class="miList-container">
                <div class="title items">
                    <div class="list-a item">
                        发布时间
                        <div class="up-down" style="margin-left: 10px" @click="timeUpDownClick">
                            <span class="icon-item icon-up" :class="{active: timeUpDown == true}">&#xe605;</span>
                            <span class="icon-item icon-down" :class="{active: timeUpDown == false}">&#xe605;</span>
                        </div>
                    </div>
                    <div class="list-b item" @click.stop="typeShowFn">
                        {{typeWriting}}
                        <div class="triangle-little" style="margin-left: 10px"></div>
                        <ul class="type-list" v-show="typeShow">
                            <li v-for="item in type" @click="typeClickFn(item)">{{item}}</li>
                        </ul>
                    </div>
                    <div class="list-c item">
                        发布标题
                    </div>
                    <div class="list-d item" @click.stop="stateShowFn">
                        <span>{{stateWriting}}</span>
                        <div class="triangle-little" style="margin-left: 10px"></div>
                        <stateList class="state-list" :state="state" v-show="stateShow" @stateClick="stateClickFn"></stateList>
                    </div>
                    <div class="list-e item"></div>
                    <div class="list-f item"></div>
                </div>
                <div class="lists-containt">
                    <!--点击列表展示发布详情-->
                    <div class="list items" v-for="(item,index) in myData" :class="{'list-active': listItemIndex === index}" @click="listClickFn(item,index)">
                        <!--<span class="reminder" v-show="item.unreadMessageCount != 0 && item.unreadMessageCount != null && unreadMessageClick == true"></span>-->
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
                            <span class="icon-item talk-icon" @click.stop v-if="talkShowFn(item)"
                                  @mouseover="responseEmployeesIndex = index;" @mouseout="responseEmployeesIndex = '';">&#xe602;
                                <!--<span class="talk-num" v-show="item.unreadMessageCount != 0 && item.unreadMessageCount != null && unreadMessageClick == true">{{item.unreadMessageCount}}</span>-->
                                <ul class="choose-type response-employees" v-if="responseEmployeesIndex === index">
                                    <li v-for="(vl,i) in item.responseEmployees" @click.stop="responseEmployeesClickFn(item,vl,i)">
                                        <div></div>
                                        <div style="position: relative;">
                                            <span style="display: block; height: 100%; max-width: 105px; overflow: hidden;">
                                                <lonSpan :txt="vl.nickName"></lonSpan>
                                            </span>
                                            <!--<span class="talk-num" style="top: 0; left: auto; right: -10px;"
                                                  v-show="vl.chatNum != 0 && vl.chatNum != null && chatIndex.indexOf(i) == '-1'">{{vl.chatNum}}</span>-->
                                        </div>
                                    </li>
                                </ul>
                            </span>
                        </div>
                        <div class="list-f item color">查看详情<span class="icon-item">&#xe686;</span>
                        </div>
                    </div>
                </div>
            </div>
            <el-pagination
                    class="pagination"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="sendData.page"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="numPrePage"
                    layout="prev, pager, next, jumper, total"
                    :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';
    import stateList from '../stateList.vue'
    import lonSpan from '$src/page/components/publicTools/scrollTxt.vue';

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
                type0: ['需求类型','运力投放','运力委托'], // 0：航司方登录
                type1: ['需求类型','航线需求','航线委托','运营托管'], // 1：机场方登录
                type2: ['需求类型','运力投放','运力委托','航线需求','航线委托','运营托管'], // 2：太美登录
                state: [],
                state0: ['状态','需求发布','意向征集','订单确认','订单完成','佣金支付','交易完成','待处理','已接受','处理中','已拒绝','关闭(审核不通过、下架、过期)'],
                state00: ['状态','需求发布','意向征集','订单确认','交易完成','待处理','处理中','已拒绝','关闭(审核不通过、下架、过期)'], // 航司
                state1: ['状态','需求发布','意向征集','订单确认','订单完成','佣金支付','交易完成','关闭(审核不通过、下架、过期)'],
                state2: ['状态','待处理','处理中','已接受','已拒绝','关闭(审核不通过、下架、过期)'],      //运营托管
//                state3: ['状态','待处理','处理中','需求发布','意向征集','订单确认','订单完成','已拒绝','已完成','已关闭'],  // 委托
                state3: ['状态','待处理','处理中','交易完成','已拒绝','关闭(审核不通过、下架、过期)'],  // 委托
                state4: ['状态','需求发布','意向征集','订单确认','交易完成','关闭(审核不通过、下架、过期)'],
                myPublishShow: false,       // myPublish(我的发布-运力详情)是否显示
                myPublishShow0: false,       // myPublish(运力详情 + 航线详情)是否显示
                myPublishShow1: false,       // 运力详情显示
                myPublishAirlineShow: false, // 航线详情是否显示
                myPublishTransportEntrustShow: false, // myPublishEntrust（我的发布-发布的运营托管）是否显示
                myPublishAirLineEntrustShow: false,   //myPublishAirLineEntrust（我的发布-发布的航线委托）是否显示
                myPublishAirLineEntrust1Show: false,  //运力委托是否显示
                myData: [],                 // 将获取的数据，渲染到页面上
                myData0: [],                 // 航司能看到的数据，渲染到页面上
                myData1: [],                 // 机场能看到的数据，渲染到页面上
                myData2: [],                 // 太美能看到所有数据，渲染到页面上
                listItemIndex: '',          // 被点击列的index，用来使其变成active

                timeUpDown: true,           // 通过时间进行排序
                sendData:{                   // 请求的参数
                    page: 1,                  // 页码，必传
                    demandType: '',         // 查询需求类型 0:航线需求、1:运力需求、2:运营托管、3:航线委托、4:运力委托
                    demandprogress:'',      // 状态类型 0:需求发布、1:意向征集、2:订单确认、3:关闭（审核不通过、下架、过期）、
                                                // 4:订单完成、5:佣金支付、6:交易完成、7:待处理、8:已接受、9:处理中、10:已拒绝
                    orderType: 0            // 发布时间排序类型，0:倒序，1:正序
                },
                responseEmployeesIndex: '', // 对我发布的需求有意向的用户列表是否显示
                currentPage4: 1,    // element-ui组件
                totalCount: 1,
                pageCount: 1,
                numPrePage: 1,
                sendToMyPublishData: {},  // 向子组件传递的数据
                chatIndex: [],         // 聊天提醒
                unreadMessageClick: true,  // 未读消息提示是否显示
                mes:{       //demand  , demandState 需求状态 ,demandType  需求类型
                    demand:"",
                    demandState:"",
                    demandType:""
                },
            }
        },
        mounted() {
            this.judgeRole();
            this.getListData();
            if(this.role.role == '0') {
                this.state = this.state00;
            }else {
                this.state = this.state0;
            }
            tabulationBoxTrigger.hierarchy = false; // navigation层级，true：不显示，false：显示
        },
        watch: {
            ref(){
                if(!this.ref) this.refreshFn();
            },
            'sendData.orderType': function () {
                this.sendData.page = 1;
                this.getListData();
//                this.judgeRole();
            },
            'sendData.demandType': function () {
                this.sendData.page = 1;
                this.getListData();
//                this.judgeRole();
            },
            'sendData.demandprogress': function () {
                this.sendData.page = 1;
                this.getListData();
//                this.judgeRole();
            },
            'sendData.page': function () {
                this.getListData();
            },
            tlistItem: function() {
                if(tabulationBoxTrigger.listItem == false) {
                    this.listItemIndex = '';
                }
            }
        },
        computed: {
            ref(){
                return tabulationBoxTrigger.hierarchy;
            },
            tlistItem: function() {
                return tabulationBoxTrigger.listItem;
            },
            ...vx.mapGetters([
                'role'
            ]),
        },
        methods: {
            // element-ui里的方法
            handleSizeChange(val) {
//                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
//                console.log(`当前页: ${val}`);
                this.sendData.page = val;
            },
            // 改变alert弹出样式
            open6(mes) {  // 成功弹出的提示
                this.$message({
                    message: mes,
                    type: 'success',
                    duration: 2000,
                });
            },
            open8(mes) {  // 错误弹出的提示
                this.$message({
                    message: mes,
                    type: 'error',
                    duration: 2000,
                });
            },
            /*************************/
            talkShowFn: function (item) {  // 列表中的交谈按钮是否显示
                if(this.role.role == '1'){  //0：航司 1：机场 2：太美
                    if(item.responseEmployees != null && item.responseEmployees.length != 0 && item.intentionMoneyState === '0'){
                        return true
                    }else {
                        return false
                    }
                }else{
                    if(item.responseEmployees != null && item.responseEmployees.length != 0){
                        return true
                    }else {
                        return false
                    }
                }
            },
            // 点击关闭所有下拉框
            closeAllFn: function () {
                this.typeShow = false;   //需求类型显示
                this.stateShow = false;   //状态显示
            },
            // 根据登陆角色不同，展示的数据不同
            judgeRole: function () {
                // 判断是机场(1)还是航司(0)登录
//                console.info('this.role.role:'+ this.role.role)
//                console.info(this.myData)
                if(this.role.role == 0) {
                    this.type = this.type0;
                    this.myData = this.myData0;
                }if(this.role.role == 1) {
                    this.type = this.type1;
                    this.myData = this.myData1;
                }if(this.role.role == 2) { // 太美
                    this.type = this.type2;
                    this.myData = this.myData2;
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
//                    console.info('myPublishList获取的数据:')
//                    console.info(response)
                    if(response.data.opResult === '0') {
                        this.myData0 = [];
                        this.myData1 = [];
                        this.myData2 = [];
                        this.totalCount = response.data.list.totalCount;
                        this.pageCount = response.data.list.pageCount;
                        this.numPrePage = response.data.list.numPrePage;
                        this.unreadMessageClick = true; // 未读消息提示是否显示
                        this.chatIndex = [];
                        response.data.list.list.forEach((val) => {
                            this.myData2.push(val);
                            if(val.demandtype == 1 || val.demandtype == 4 ){
                                this.myData0.push(val);
                            }if(val.demandtype == 0 || val.demandtype == 3 || val.demandtype == 2){
                                this.myData1.push(val);
                            }
                        })
                        this.judgeRole();
                    }else if(response.data.opResult === '1') {
//                        console.info('ajax1')
                        this.myData0 = [];
                        this.myData1 = [];
                        this.myData2 = [];
                        this.totalCount = 0;
                        this.judgeRole();
                    }else {
//                        this.open8(`无法请求到数据，错误代码：${response.data.opResult}`);
                        this.$processMessage(response.data.opResult);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            // 刷新页面数据
            refreshFn: function () {
//                this.myData0 = [];
//                this.myData1 = [];
                this.getListData();
            },
            // 点击对应的意向用户，弹出聊天框
            responseEmployeesClickFn: function (item,vl,i) {
                let chatObj = {};
                chatObj.demandEmployeeId = this.role.id;
                chatObj.id = item.id;
                chatObj.employeeId = vl.id;
                tabulationBoxTrigger.$emit('addChat',chatObj);
                this.chatIndex.push(i);
                this.unreadMessageClick = false; // 未读消息提示是否显示
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
                this.myData2 = [];
                this.timeUpDown = !this.timeUpDown;
                this.sendData.orderType = this.timeUpDown ? 0 : 1;
            },
            // 通过“需求类型”选择展示内容 0:航线需求、1:运力需求、2:运营托管、3:航线委托、4:运力委托
            typeClickFn: function (item) {
                this.myData0 = [];
                this.myData1 = [];
                this.myData2 = [];
                this.typeWriting = item;
                this.sendData.demandprogress = ''; // 状态类型
                this.stateWriting = '状态';
                if (item == '需求类型') {
                    if(this.role.role == '0') {
                        this.state = this.state00;
                    }else {
                        this.state = this.state0;
                    }
                    this.sendData.demandType = '';
                }if(item == '航线需求') {
                    this.state = this.state1;
                    this.sendData.demandType = 0;
                }if(item == '运营托管') {
                    this.state = this.state2;
                    this.sendData.demandType = 2;
                }if(item == '运力委托' || item == '航线委托') {
                    this.state = this.state3;
                    if(item == '运力委托') {
                        this.sendData.demandType = 4;
                    }if(item == '航线委托') {
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
                this.myData2 = [];
                this.stateWriting = item;
                if(item == '状态') {
                    this.sendData.demandprogress = '';
                }if(item == '需求发布') {
                    this.sendData.demandprogress = 0;
                }if(item == '意向征集') {
//                    console.info(0)
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
                this.mes.demand = item.id;
                this.mes.demandState = item.demandstate;
                this.mes.demandType = Number(item.demandtype);
                this.sendToMyPublishData = item;
                tabulationBoxTrigger.hierarchy = true; //将nav栏层级下调，不显示
                tabulationBoxTrigger.listItem = true;
                tabulationBoxTrigger.$emit('demandType',...[this.mes,'true']);
            },
        },
        components: {
            stateList,
            lonSpan,
        }
    }
</script>
<style lang="scss" scoped>
    $icon-color: #3c78ff;
    $font-color: #605e7c;
    $border-color: rgba(96,94,124,0.37);
    .trans-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .4);
        z-index: 30;
    }
    .reminder {
        position: absolute;
        top: 50%;
        left: 20px;
        margin-top: -5px;
        width: 10px;
        height: 10px;
        background: red;
        border-radius: 100%;
    }
    /*element-ui分页组件*/
    .pagination {
        display: flex;
        justify-content: center;
    }
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
    .choose-type {
        position: absolute;
        margin: 0;
        padding: 0;
        list-style: none;
        border-radius: 4px;
        box-shadow: 0 2px 11px $border-color;
        background: white;
        overflow: hidden;
        z-index: 1;
        li {
            display: flex;
            padding-left: 14px;
            height: 35px;
            line-height: 32px;
            font-size: 1.2rem;
            color: $font-color;
            cursor: pointer;
            &:hover {
                background: #F5F5F5;
            }
        }
    }
    .response-employees {
        width: 120px;
        max-height: 175px;
        overflow-y: scroll;
        li {
            position: relative;
        }
    }
    .response-employees::-webkit-scrollbar {
        width: 7px;
    }
    .response-employees::-webkit-scrollbar-thumb {
        height: 56px;
        background: #D8D8D8;
        border-radius: 4px;
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
        position: relative;
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
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
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
            .state-list {
                max-height: 300px;
                overflow-y: scroll;
            }
            .state-list::-webkit-scrollbar {
                width: 7px;
            }
            .state-list::-webkit-scrollbar-thumb {
                height: 56px;
                background: #D8D8D8;
                border-radius: 4px;
            }
        }
        .list-e {
            margin-right: 160px;
            width: 20px;
            .talk-icon {
                position: relative;
                font-size: 2.5rem;
                cursor: pointer;
                .talk-num {
                    position: absolute;
                    top: -1px;
                    left: 20px;
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