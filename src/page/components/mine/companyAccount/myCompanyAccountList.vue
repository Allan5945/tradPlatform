<template>
    <div>
        <div class="miList-wrapper">
            <div class="miList-container">
                <div class="account-mes">
                    <div class="left">
                        <div style="margin-bottom: 22px;">当前账户金额（元）</div>
                        <div style="margin-bottom: 26px;height: 20px;">
                            <span style="font-size: 18px;font-weight: bold;">1000000</span>
                            <span>（含冻结金额2000元）</span>
                        </div>
                        <div class="buttons">
                            <button class="btn btn-w" style="margin-right: 10px;width: 96px;" @click="rechargeFn">充值</button>
                            <button class="btn btn-w" style="width: 96px;" @click="WithdrawFn">申请提现</button>
                        </div>
                    </div>
                    <div class="right">
                        <div class="title">交通银行</div>
                        <div class="num">6227 0038 1902 0911 231</div>
                    </div>
                </div>
                <div class="lists-containt">
                    <!--点击列表展示发布详情-->
                    <!--<div class="list items" v-for="(item,index) in myData" :class="{'list-active': listItemIndex === index}" @click="listClickFn(item,index)">-->
                    <div class="list items" @click="listClickFn">
                        <div class="item-a item">
                            11.04.2017
                        </div>
                        <div class="item-b item">
                            <span v-show="false">响应 <span>成都-北京航线需求</span></span>
                            <span>申请提现20000</span>
                        </div>
                        <div class="item-c item">冻结50000</div>
                    </div>
                    <div class="list items">
                        <div class="item-a item">
                            11.04.2017
                        </div>
                        <div class="item-b item">
                            <span v-show="false">响应 <span>成都-北京航线需求</span></span>
                            <span>申请提现20000</span>
                        </div>
                        <div class="item-c item">冻结50000</div>
                    </div>
                    <div class="list items">
                        <div class="item-a item">
                            11.04.2017
                        </div>
                        <div class="item-b item">
                            <span v-show="false">响应 <span>成都-北京航线需求</span></span>
                            <span>申请提现20000</span>
                        </div>
                        <div class="item-c item">冻结50000</div>
                    </div>
                    <div class="list items">
                        <div class="item-a item">
                            11.04.2017
                        </div>
                        <div class="item-b item">
                            <span v-show="false">响应 <span>成都-北京航线需求</span></span>
                            <span>申请提现20000</span>
                        </div>
                        <div class="item-c item">冻结50000</div>
                    </div>
                    <div class="list items">
                        <div class="item-a item">
                            11.04.2017
                        </div>
                        <div class="item-b item">
                            <span v-show="false">响应 <span>成都-北京航线需求</span></span>
                            <span>申请提现20000</span>
                        </div>
                        <div class="item-c item">冻结50000</div>
                    </div>
                    <div class="list items">
                        <div class="item-a item">
                            11.04.2017
                        </div>
                        <div class="item-b item">
                            <span v-show="false">响应 <span>成都-北京航线需求</span></span>
                            <span>申请提现20000</span>
                        </div>
                        <div class="item-c item">冻结50000</div>
                    </div>
                </div>
            </div>
        </div>
        <myCompanyAccountRecharge @closeThis="closeRechargeFn" v-show="myCompanyAccountRechargeShow"></myCompanyAccountRecharge>
        <myCompanyAccountWithdraw @closeThis="closeWithdrawFn" v-show="myCompanyAccountWithdrawShow"></myCompanyAccountWithdraw>
        <transition-group name="slidex-fade">
            <AccountRechargeDetail v-show="AccountRechargeDetailShow" @closeThis="closeAccountRechargeDetailFn" :key="0"></AccountRechargeDetail>
            <AccountWithdrawDetail v-show="AccountWithdrawDetailShow" @closeThis="closeAccountWithdrawDetailFn" :key="1" ></AccountWithdrawDetail>
            <!--<myPublish v-show="myPublishShow" @close-this="closeMyPublishShowFn" :key="1"></myPublish>-->
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
    export default {
        data() {
            return {
                myCompanyAccountRechargeShow: false, // “充值账户”弹出框
                myCompanyAccountWithdrawShow: false, // "申请提现" 弹出框
                AccountRechargeDetailShow: false,    // 机场、航司充值详情
                AccountWithdrawDetailShow: false,    // 提现详情
                myData: [], // 获取的数据
                sendData: {}, // ajax传递的参数
            }
        },
        mounted() {
            this.getListData();
        },
        computed: {
            ...vx.mapGetters([
                'role'
            ]),
        },
        methods: {
            // ajax获取列表数据
            getListData: function () {
               /* this.$ajax({
                    url:"/",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: this.sendData
                }) .then((response) => {
                    console.info('myCompanyAccountList获取的数据:')
                    console.info(response)
                    if(response.data.opResult === '0') {
                        alert('公司账号')
                    }else {
                        alert('无法请求到数据，错误代码：' + response.data.opResult)
                    }
                }).catch((error) => {
                    console.log(error);
                });*/
            },
            // 点击“充值账户”
            rechargeFn: function () {
                this.myCompanyAccountRechargeShow = true;
                tabulationBoxTrigger.hierarchy = true;
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
            // 点击列表(list)，变成active状态, 确定哪个显示;
            listClickFn: function (item,index) {
                this.listItemIndex = index; //变成active状态
//                this.AccountRechargeDetailShow = true; // 充值详情显示
                this.AccountWithdrawDetailShow = true; // 提现详情显示
                tabulationBoxTrigger.hierarchy = true;
            },
            // 关闭“充值详情”
            closeAccountRechargeDetailFn: function () {
                this.AccountRechargeDetailShow = false;
            },
            // 关闭“提现详情”
            closeAccountWithdrawDetailFn: function () {
                this.AccountWithdrawDetailShow = false;
            },
        },
        components: {
            myCompanyAccountRecharge,
            myCompanyAccountWithdraw,
            AccountRechargeDetail,
            AccountWithdrawDetail
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
        margin-bottom: 44px;
        padding: 0 15px;
        .left {
            .buttons {
                display: flex;
            }
        }
        .right {
            padding: 22px 5px 0 10px;
            min-width: 225px;
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