<template>
    <div class="mcar-wrapper">
        <div class="myCompanyAccountRecharge">
            <div class="top items">
                <div class="left">
                    充值账户
                </div>
                <div class="right">
                    <div class="title font-gray">如有疑问，请联系客服</div>
                    <button class="btn btn-b">联系客服<span class="icon-item">&#xe720;</span></button>
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
                        <div class="item-height">太美航空</div>
                        <div class="item-height">0000000000000000000</div>
                        <div class="item-height">交通银行 成都分行 新华支行</div>
                    </div>
                </div>
                <div class="button">
                    <button class="btn btn-b">确认</button>
                    <button class="btn btn-cancel" @click="closeThisFn">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
            closeThisFn: function () {
                this.$emit('closeThis')
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
        }
        .right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            .title {
                margin-bottom: 10px;
            }
            .btn-b {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100px;
                height: 20px;
                font-size: 1.2rem;
                .icon-item {
                    margin-left: 5px;
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
            height: 40px;
            .btn-b {
                margin-right: 10px;
                width: 215px;
            }
            .btn-cancel {
                width: 80px;
                background: white;
                color: rgba(96, 94, 124, 0.7);
                cursor: pointer;
            }
        }
    }
</style>