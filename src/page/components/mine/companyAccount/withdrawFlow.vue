<template>
    <div class="wf-container">
        <div class="wf-top">
            <div class="color">
                <div class="sure sure-a iconfont" v-show="sureAShow">&#xe6cc;</div>
                <div class="sure sure-b iconfont" v-show="sureBShow">&#xe6cc;</div>
                <div class="sure sure-c iconfont" v-show="sureCShow">&#xe6cc;</div>
                <div class="unsure unsure-a" v-show="unsureAShow"></div>
                <div class="unsure unsure-b" v-show="unsureBShow"></div>
                <div class="unsure unsure-c" v-show="unsureCShow"></div>
                <div class="unclor unclor-a" v-show="unclorAShow"></div>
                <div class="unclor unclor-b" v-show="unclorBShow"></div>
            </div>
        </div>
        <div class="wf-bottom">
            <div class="text">
                <span>发起申请</span>
                <span>财务审核</span>
                <span>提现成功</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['withdrawFlowCode'],
        data() {
            return {
                sureAShow: false,
                sureBShow: false,
                sureCShow: false,
                unsureAShow: false,
                unsureBShow: false,
                unsureCShow: false,
                unclorAShow: false,
                unclorBShow: false,
            }
        },
        mounted() {
            this.show();
        },
        methods: {
            show: function () {
                // 代码1、2、3对应的情况
                if(this.withdrawFlowCode == 0) {
                    console.info('1')
                    this.sureAShow = true;
                    this.sureBShow = false;
                    this.sureCShow = false;
                    this.unsureAShow = false;
                    this.unsureBShow = true;
                    this.unsureCShow = true;
                    this.unclorAShow = true;
                    this.unclorBShow = true;
                }if(this.withdrawFlowCode == 1) {
                    this.sureAShow = true;
                    this.sureBShow = true;
                    this.sureCShow = false;
                    this.unsureAShow = false;
                    this.unsureBShow = false;
                    this.unsureCShow = true;
                    this.unclorAShow = false;
                    this.unclorBShow = true;
                }if(this.withdrawFlowCode == 2) {
                    this.sureAShow = true;
                    this.sureBShow = true;
                    this.sureCShow = true;
                    this.unsureAShow = false;
                    this.unsureBShow = false;
                    this.unsureCShow = false;
                    this.unclorAShow = false;
                    this.unclorBShow = false;
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
    .wf-container {
        display: flex;
        flex-direction: column;
        width: 540px;
        height: 100px;
        background: white;
        border-radius: 4px;
        box-shadow: 0 2px 11px rgba(96,94,124,0.37);
    }
    .wf-top {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 24px;
        height: 30px;
        .color {
            position: relative;
            width: 360px;
            height: 3px;
            background: -webkit-linear-gradient(left, #EDC682, #EF7373); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, #EDC682, #EF7373); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, #EDC682, #EF7373); /* Firefox 3.6 - 15 */
            background: linear-gradient(to right, #EDC682, #EF7373); /* 标准的语法 */
            .sure {
                position: absolute;
                top: 50%;
                margin-top: -14px;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 28px;
                height: 28px;
                border-radius: 100%;
                background: #3C78FF;
                color: white;
                font-size: 2.2rem;
                z-index: 2;
            }
            .unsure {
                position: absolute;
                top: 50%;
                margin-top: -6px;
                width: 12px;
                height: 12px;
                border-radius: 100%;
                background: #3C78FF;
                z-index: 2;
            }
            .unclor {
                position: absolute;
                top: 0;
                width: 180px;
                height: 3px;
                background: #EFEFEF;
                z-index: 1;
            }
            .sure-a {
                left: -14px;
            }
            .sure-b {
                left: 50%;
                margin-left: -14px;
            }
            .sure-c {
                right: -14px;
            }
            .unsure-a {
                left: -6px;
            }
            .unsure-b {
                left: 50%;
                margin-left: -6px;
            }
            .unsure-c {
                right: -6px;
            }
            .unclor-a {
                left: 0;
            }
            .unclor-b {
                left: 180px;
            }
        }
    }
    .wf-bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 15px;
        height: 15px;
        .text {
            display: flex;
            justify-content: space-between;
            width: 415px;
        }
    }
</style>