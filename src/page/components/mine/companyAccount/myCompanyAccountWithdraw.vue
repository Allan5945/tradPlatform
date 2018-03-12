<template>
    <div class="mcar-wrapper">
        <div class="myCompanyAccountRecharge" @click="closeAll">
            <div class="top items">
                <div class="left">
                    申请提现
                </div>
                <div class="right warn">
                    <div class="title ">*提现金额将在财务审核通过后，转入您的账户，如有疑问，请联系客服</div>
                    <div class="anew-publish" @click="linkServiceClickFn">
                        联系客服<span class="icon-item">&#xe720;</span>
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div class="bottom items">
                <div class="account-mes">
                    <div class="account-top account-item">
                        <div class="left font-gray" style="margin-top: 7px;">请填写提现金额</div>
                        <div class="right">
                            <div>
                                <input class="input-num" type="text" v-model="inputNum" placeholder="最低提现金额 10000">元
                            </div>
                            <div class="font-gray" v-if="noticeMsg" style="height: 25px;line-height: 25px;" :class="{'warn': numberWarn}">*当前可提现金额： {{myAccountData.number}}元</div>
                            <div class="warn" v-else="noticeMsg" style="height: 25px;line-height: 25px;">*最低提现金额：10000元</div>
                        </div>
                    </div>
                    <div class="account-bottom account-item">
                        <div class="left font-gray">到帐账户</div>
                        <div class="right" style="height: 15px;">{{myCardData.cardName}}（{{myCardData.cardNumber}}）</div>
                    </div>
                </div>
                <div class="button">
                    <div class="btn btn-b" @click.stop="sendData" v-show="!loadingShow">确认</div>
                    <div class="btn btn-b" v-show="loadingShow">
                        <loading class="search-ing" :args="true"></loading>
                    </div>
                    <button class="btn btn-cancel" @click.stop="closeThisFn">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';
    import loading from '$src/page/reuseComponents/locading.vue'
    export default {
        props:['myCompanyAccountWithdraw'],
        data() {
            return {
                inputNum: '',    // 输入的金额
                noticeMsg: true, // 提示信息
                myData: {},     //获取的数据
                myAccountData: {},
                myCardData: {},
                numberWarn: false, // 可提现金额是否变红
                loadingShow: false,
            }
        },
        created() {
            let val = this.myCompanyAccountWithdraw;
            this.myData = val;
            this.myAccountData = val.account;
            this.myCardData = val.card;
        },
        methods: {
            // 改变alert弹出样式
            open6(mes) {  // 成功弹出的提示
                this.$message({
                    message: mes,
                    type: 'success'
                });
            },
            open8(mes) {  // 错误弹出的提示
                this.$message({
                    message: mes,
                    type: 'error'
                });
            },
            // 点击“取消”按钮
            closeThisFn: function () {
                this.$emit('closeThis');
                tabulationBoxTrigger.hierarchy = false;
            },
            // 点击关闭警告信息
            closeAll: function () {
                this.noticeMsg = true;
                this.numberWarn = false;
            },
            // 点击“联系客服”
            linkServiceClickFn: function () {
                let chatObj = {};
                chatObj.id = null;
                tabulationBoxTrigger.$emit('addChat',chatObj);
            },
            // 点击“确定”按钮
            sendData: function () {
                let replaceNum = this.inputNum.replace(/(^\s*)|(\s*$)/g,"");
                if(/^[0-9]*$/g.test(replaceNum) == false) {
                    this.open8(`请输入数字！`);
                    return
                }
                if(replaceNum < 10000) { // 判断输入的金额是否小于10000
                    this.noticeMsg = false;
                    this.open8(`最低提现金额：10000元`);
                    return
                }
                if(replaceNum > this.myAccountData.number) { // 判断输入的金额是否大于可提现金额
                    this.numberWarn = true;
                    this.open8(`当前可提现金额：${this.myAccountData.number}元`);
                    return
                }
                this.myAccountData.withdrawNumber = replaceNum;
                this.loadingShow = true;
                this.$ajax({
                    url:"/accountWithdraw",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: this.myAccountData
                }) .then((response) => {
//                    console.info(response)
                    if(response.data.opResult == '0') {
//                        alert('成功发送提现请求！')
                        this.open6(`成功发送提现请求！`);
                        this.$emit('refresh');
                        this.closeThisFn();
                    }else {
//                        this.open8(`无法请求到数据,代码：${response.data.opResult}`);
                        this.$processMessage(response.data.opResult);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
        },
        components: {
            loading,
        }
    }
</script>
<style lang="scss" scoped>
    .icon-item {
        font-size: 1.6rem;
        font-family: iconfont;
    }
    .font-gray {
        color: rgba(96, 94, 124, 0.7);
    }
    .warn {
        color: #FF9393;
    }
    /*按钮*/
    .btn-cancel {
        border-radius: 20px;
        outline: none;
    }
    .btn-b {
        outline: none;
        border: 0;
        border-radius: 20px;
        color: white;
        background: #3c78ff;
        &:hover {
            background: rgba(60, 120, 255, 0.7);
        }
        &:active {
            background: #336bea;
        }
    }
    .mcar-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, .4);
        z-index: 20;
    }
    .myCompanyAccountRecharge {
        padding: 25px 25px 0 25px;
        width: 490px;
        background: white;
        border-radius: 4px;
        .items {
            display: flex;
        }
        .line {
            margin: 20px 0 40px 0;
            width: 100%;
            height: 1px;
            background: #f3f3f3;
        }
    }
    .top {
        flex-direction: column;
        justify-content: space-between;
        .left {
            font-size: 1.6rem;
        }
        .right {
            display: flex;
            align-items: flex-end;
            .title {
                margin-right: 8px;
            }
            .anew-publish {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100px;
                height: 20px;
                color: white;
                border-radius: 20px;
                background: #3C78FF;
                cursor: pointer;
                .icon-item {
                    margin-left: 3px;
                    font-size: 1.8rem;
                }
            }
        }
    }
    .bottom {
        flex-direction: column;
        .button {
            display: flex;
            justify-content: center;
            margin-bottom: 33px;
            .btn-b {
                margin-right: 10px;
                width: 215px;
                height: 40px;
            }
            .btn-cancel {
                width: 80px;
                height: 40px;
                background: white;
                color: rgba(96, 94, 124, 0.7);
                cursor: pointer;
            }
        }
    }
    .account-mes {
        display: flex;
        flex-direction: column;
    }
    .account-item {
        display: flex;
        .left {
            width: 106px;
        }
        .right {
            width: 380px;
            .input-num {
                margin-right: 10px;
                padding: 7px 15px;
                width: 286px;
                font-size: 1.2rem;
                border: 1px solid rgba(151, 151, 151, 0.3);
                border-radius: 4px;
                outline: none;
            }
        }
    }
    .account-top {
        margin-bottom: 35px;
    }
    .account-bottom {
        margin-bottom: 68px;
    }
    .search-ing {
        width: 23px;
        height: 30px;
        color: #3c78ff !important;
        display: inline-block;
        transform: scale(.25);
    }
</style>