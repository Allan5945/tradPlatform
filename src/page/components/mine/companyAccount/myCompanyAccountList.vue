<template>
    <div>
        <div class="miList-wrapper">
            <div class="miList-container">
                <div class="account-mes">
                    <div class="left">
                        <div style="margin-bottom: 22px;">当前账户金额（元）</div>
                        <div style="margin-bottom: 26px;height: 20px;">
                            <span style="font-size: 18px;font-weight: bold;">{{myAccountData.totalNumber || "0"}}</span>
                            <span>（含冻结金额{{myAccountData.freezeNumber || "0"}}元）</span>
                        </div>
                        <div class="buttons">
                            <button class="btn btn-w" style="margin-right: 10px;width: 96px;" @click="rechargeFn">充值</button>
                            <button class="btn btn-w" style="width: 96px;" @click="WithdrawFn">申请提现</button>
                        </div>
                    </div>
                    <div class="right">
                        <div class="title">{{myCardData.cardName}}</div>
                        <div class="num">{{myCardData.cardNumber}}</div>
                    </div>
                </div>
                <div class="lists-containt">
                    <!--点击列表展示发布详情-->
                    <div class="list items" v-for="(item,index) in myListData" :class="{'list-active': listItemIndex === index}" @click="listClickFn(item,index)">
                        <div class="item-a item">
                            {{item.date}}
                        </div>
                        <div class="item-b item">
                            <span v-if="item.demandId === '' || item.demandId === null">{{item.discription1}}</span>
                            <span v-else>{{item.discription1}} <span style="color: #3c78ff; cursor:pointer;" @click.stop="needDetailClickFn(item)">{{item.demandTitle}}{{item.demandTypeStr}}</span></span>
                        </div>
                        <div class="item-c item">{{item.discription2}}</div>
                    </div>
                </div>
            </div>
        </div>
        <transition-group name="fade">
            <myCompanyAccountRecharge v-if="myCompanyAccountRechargeShow" :acceptData="sendToMyCompanyAccountRecharge" @closeThis="closeRechargeFn" :key="0"></myCompanyAccountRecharge>
            <myCompanyAccountWithdraw v-if="myCompanyAccountWithdrawShow" @closeThis="closeWithdrawFn" :myCompanyAccountWithdraw="myData" @refresh="refreshFn" :key="1"></myCompanyAccountWithdraw>
        </transition-group>
        <transition-group name="slidex-fade">
            <AccountRechargeDetail v-if="AccountRechargeDetailShow" :acceptData="sendToAccountWithdrawDetail" @closeThis="closeAllFn" :key="2"></AccountRechargeDetail>
            <AccountWithdrawDetail v-if="AccountWithdrawDetailShow" :acceptData="sendToAccountWithdrawDetail" @closeThis="closeAllFn" :key="3"></AccountWithdrawDetail>
        </transition-group>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js'
    import myCompanyAccountRecharge from './myCompanyAccountRecharge.vue'
    import myCompanyAccountWithdraw from './myCompanyAccountWithdraw.vue'
    import AccountRechargeDetail from './AccountRechargeDetail.vue'
    import AccountWithdrawDetail from './AccountWithdrawDetail.vue'
    import transIndex from '$src/page/components/trans_detail/transIndex.vue'
    export default {
        data() {
            return {
                myCompanyAccountRechargeShow: false, // “充值账户”弹出框
                myCompanyAccountWithdrawShow: false, // "申请提现" 弹出框
                AccountRechargeDetailShow: false,    // 机场、航司充值详情
                AccountWithdrawDetailShow: false,    // 提现详情
                companyAirlineDetailPayAfterShow: false, // 航线详情是否显示
                myData: {},     //获取的数据
                myListData: [], // 获取的列表数据
                myAccountData: {},
                myCardData: {},
                sendData: {}, // ajax传递的参数
                listItemIndex: '',
                demandIdShow: false, // 列表数据中没有demandId时，不显示
                companyTransIndexShow: false,  // 运力详情是否显示
                mes:{       //demand  , demandState 需求状态 ,demandType  需求类型
                    demand:"",
                    demandState:"",
                    demandType:""
                },
                sendToAccountWithdrawDetail: {}, //向AccountWithdrawDetail、AccountRechargeDetail传数据
                sendToMyCompanyAccountRecharge: {}, //向myCompanyAccountRecharge.vue传数据
            }
        },
        created() {
            this.getListData();
        },
        mounted() {

        },
        watch: {
            ref(){
                if(!this.ref) this.refreshFn();
            },
        },
        computed: {
            ref(){
                return tabulationBoxTrigger.hierarchy;
            },
            ...vx.mapGetters([
                'role'
            ]),
        },
        methods: {
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
            // ajax获取数据
            getListData: function () {
                this.$ajax({
                    url:"/perSonNalCompanyAccountList",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: ''
                }) .then((response) => {
                    if(response.status === 200) {
                        this.myData = response.data;
                        this.myListData = response.data.transactionRecords;
                        this.myAccountData = response.data.account;
                        this.myCardData = response.data.card;
                    }else {
                        this.open8(`无法请求到数据!`);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            //***************************
            // 点击“充值”
            rechargeFn: function () {
                this.$ajax({
                    url:"/accountRecharge",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: ''
                }) .then((response) => {
                    if(response.status === 200) {
                        this.myCompanyAccountRechargeShow = true;
                        tabulationBoxTrigger.hierarchy = true;
                        this.sendToMyCompanyAccountRecharge = response.data.card;
//                        tabulationBoxTrigger.$emit('sendToMyCompanyAccountRecharge',response.data.card) //向myCompanyAccountRecharge.vue传数据
                    }else {
                        alert('无法请求到数据')
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            // 关闭“充值账户”
            closeRechargeFn: function () {
                this.myCompanyAccountRechargeShow = false;
            },
            // 点击“申请提现”
            WithdrawFn: function () {
                this.myCompanyAccountWithdrawShow = true;
                tabulationBoxTrigger.hierarchy = true;
            },
            // 关闭“申请提现”
            closeWithdrawFn: function () {
                this.myCompanyAccountWithdrawShow = false;
            },
            // 刷新数据
            refreshFn: function () {
                this.getListData();
            },
            // 点击列表(list)，变成active状态, 确定哪个显示;
            listClickFn: function (item,index) {
                this.listItemIndex = index; //变成active状态
                if(item.type !== '' || item.type !== null) {
                    if(item.type == '02'){
                        this.AccountWithdrawDetailShow = true; // 提现详情显示
                    }else{
                        this.AccountRechargeDetailShow = true; // 充值详情显示
                    }
                    this.sendToAccountWithdrawDetail = item;
                }else {
                    return
                }
                tabulationBoxTrigger.hierarchy = true;
            },
            // 点击展示（航线、运力）详情
            needDetailClickFn: function (item) {
                //0：航司、 1：机场、 2：太美
                this.mes.demand = item.demandId;
                this.mes.demandState = item.demandstate;
                this.mes.demandType = Number(item.demandType);
                tabulationBoxTrigger.hierarchy = true;
                console.info(this.mes)
                tabulationBoxTrigger.$emit('demandType',...[this.mes,'true']);
            },
            closeAllFn: function () {
                this.AccountRechargeDetailShow = false;
                this.AccountWithdrawDetailShow = false;
                this.listItemIndex = '';
                this.companyAirlineDetailPayAfterShow = false;
                this.companyTransIndexShow = false;
                tabulationBoxTrigger.hierarchy = false;
                this.refreshFn();
            },
        },
        components: {
            myCompanyAccountRecharge,
            myCompanyAccountWithdraw,
            AccountRechargeDetail,
            AccountWithdrawDetail,
            transIndex,
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
        }
    }
    .btn-w {
        height: 30px;
        border-radius: 20px;
        outline: none;
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
        width: 100%;
        height: 500px;
        font-size: 1.2rem;
        background: #F8F8F8;
    }
    .miList-container {
        margin: 0 auto;
        padding-top: 40px;
        width: 1000px;
        height: 340px;
        .lists-containt {
            height: 200px;
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
    }
    .account-mes {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        padding: 0 15px;
        .left {
            .buttons {
                display: flex;
            }
        }
        .right {
            padding: 22px 5px 0 10px;
            min-width: 225px;
            max-width: 325px;
            height: 78px;
            color: white;
            background: #3C78FF;
            background: -webkit-linear-gradient(left bottom, #3C78FF, #3D92F5, #3DAAEB); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(top right, #3C78FF, #3D92F5, #3DAAEB); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(top right, #3C78FF, #3D92F5, #3DAAEB); /* Firefox 3.6 - 15 */
            background: linear-gradient(to top right, #3C78FF, #3D92F5, #3DAAEB); /* 标准的语法 */
            border-radius: 10px;
            .title {
                margin-bottom: 20px;
                height: 15px;
            }
            .num {
                height: 20px;
                font-size: 1.8rem;
            }
        }
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
        .item-a{
            width: 163px;
        }
        .item-b{
            width: 600px;
        }
        .item-c{
            flex-grow: 1;
            justify-content: flex-end;
        }
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