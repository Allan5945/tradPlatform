<template>
    <div class="mcar-wrapper">
        <div class="myCompanyAccountRecharge">
            <div class="top items">
                <div class="left">
                    充值账户
                </div>
                <div class="right">
                    <div class="title font-gray">如有疑问，请联系客服</div>
                    <div class="anew-publish" @click="linkServiceClickFn">
                        联系客服<span class="icon-item">&#xe720;</span>
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div class="bottom items">
                <div class="title font-gray">请转账至以下账户，我们的工作人员会为您处理</div>
                <div class="account-mes">
                    <div class="left items">
                        <div class="item-height font-gray">开户名</div>
                        <div class="item-height font-gray">开户账户</div>
                        <div class="item-height font-gray">开户银行</div>
                    </div>
                    <div class="right items">
                        <div class="item-height item-with">{{myCardData.cardPerson}}</div>
                        <div class="item-height item-with">{{myCardData.cardNumber}}</div>
                        <div class="item-height item-with">{{myCardData.cardName}}</div>
                    </div>
                </div>
                <div class="button">
                    <button class="btn btn-b" @click="closeThisFn">确认</button>
                    <button class="btn btn-cancel" @click="closeThisFn">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';
    export default {
        data() {
            return {
                myCardData: {},
                id: '',
                employeeId: '',
            }
        },
        created() {
            tabulationBoxTrigger.$on('sendToMyCompanyAccountRecharge',(val) => { //从myCompanyAccountList.vue接受数据
                this.myCardData = val;
                this.id = val.id;
                this.employeeId = val.employeeId;
            })
        },
        methods: {
            closeThisFn: function () {
                this.$emit('closeThis');
                tabulationBoxTrigger.hierarchy = false;
            },
            // 点击“联系客服”
            linkServiceClickFn: function () {
                let chatObj = {};
                chatObj.id = null;
                console.info(chatObj);
                tabulationBoxTrigger.$emit('addChat',chatObj);
            },
        },
        components: {}
    }
</script>
<style lang="scss" scoped>
    .icon-item {
        font-size: 1.6rem;
        font-family: iconfont;
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
    .font-gray {
        color: rgba(96, 94, 124, 0.7);
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
        justify-content: space-between;
        .left {
            margin-top: 4px;
            font-size: 1.6rem;
        }
        .right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            .title {
                margin-bottom: 10px;
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
        .title {
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
        }
        .account-mes {
            display: flex;
            justify-content: center;
            margin-bottom: 50px;
            .items {
                flex-direction: column;
                .item-height {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    height: 35px;
                }
                .item-with {
                    width: 180px;
                }
            }
            .left {
                width: 65px;
            }
            .right {}
        }
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
</style>