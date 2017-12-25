<template>
    <div class="wrapper" @click.self="closeIntent">
        <div class="plan-wrapper scroll">
            <header>
                <div class="top-til font-gray">流水详情<span class="iconfont" @click="closeIntent">&#xe62c;</span></div>
                <div class="head-til">{{myData.discription1}}</div>
                <div class="header-num">
                    <div class="top">意向金</div>
                    <div class="bottom">
                        <span>{{myData.number}}</span>
                    </div>
                </div>
                <div class="withdraw-flow">
                    <withdrawFlow :withdrawFlowCode="withdrawFlowCode"></withdrawFlow>
                </div>
            </header>
            <div class="ard-container">
                <div class="ard-item">
                    <div class="left font-gray">创建时间</div>
                    <div class="right">{{myData.dateComplete}}</div>
                </div>
                <div class="ard-item">
                    <div class="left font-gray">交易流水号</div>
                    <div class="right">{{myData.serialNumber}}</div>
                </div>
            </div>
            <!--<div style="padding: 0 40px;">
                <span class="warn">*意向金将在双方互选方案后支付，或在需求/意向撤回后退回</span>
            </div>-->
            <div class="ard-button" v-show="ardButtonShow">
                <button class="btn btn-b" @click="applyClickFn">申请电子凭证</button>
            </div>
            <div class="ard-certificate" v-show="certificateShow">
                <div class="ardc-left font-gray">电子凭证</div>
                <div class="ardc-right">
                    <img :src="src" alt="电子凭证" @dblclick="imgDblClickFn">
                </div>
            </div>
        </div>
        <transition-group name="fade">
            <applySuccess v-show="applySuccessShow" @closeThis="closeApplySuccessFn" :key="0"></applySuccess>
            <certificateImg v-show="certificateImgShow" :srcImg="src" @closeThis="closeCertificateImgFn" :key="1"></certificateImg>
        </transition-group>
    </div>
</template>

<script>
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';
    import * as vx from 'vuex'
    import withdrawFlow from './withdrawFlow.vue'
    import applySuccess from './applySuccess.vue'
    import certificateImg from './certificateImg.vue'

    export default {
        data() {
            return {
                withdrawFlowCode: '', // 传给流水详情的参数
                ardButtonShow: false,    // "申请电子凭证"按钮是否显示
                applySuccessShow: false, // “申请成功”是否显示
                certificateShow: false,  // “电子凭证”图片是否显示
                src: '',                  // 电子凭证图片
                certificateImgShow: false,    // “电子凭证”双击放大是否展示
                showCode: '',                  // 1、2、3：未完成,申请电子凭证，申请电子凭证完成
                myData: {},                 //
            }
        },
        created() {
            tabulationBoxTrigger.$on('sendToAccountWithdrawDetail',(val) => { //从myCompanyAccountList接受数据
                this.withdrawFlowCode = val.phase; // 传给流水详情的参数(0、1、2)
                this.myData = val;
                if(val.phase == 2){ // 判断页面显示的内容
                    this.showCode = 1;
                }else {
                    this.showCode = 0;
                }
                this.show();
            })
        },
        mounted() {
            this.src = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1930822017,3565726415&fm=27&gp=0.jpg';
        },
        methods: {
            show: function () {
                if(this.showCode == 0) {
                    this.ardButtonShow = false;
                    this.certificateShow = false;
                }if(this.showCode == 1) {
                    this.ardButtonShow = true;
                    this.certificateShow = false;
                }if(this.showCode == 2) {
                    this.ardButtonShow = false;
                    this.certificateShow = true;
                }
            },
            closeIntent: function () {
                this.$emit('closeThis');
                tabulationBoxTrigger.hierarchy = false;
            },
            // 点击“申请电子凭证”
            applyClickFn: function () {
                this.applySuccessShow = true;
            },
            // 关闭“申请成功”弹出框
            closeApplySuccessFn: function () {
                this.applySuccessShow = false;
            },
            // 电子凭证双击放大
            imgDblClickFn: function () {
                this.certificateImgShow = true;
            },
            // 关闭电子凭证放大图
            closeCertificateImgFn: function () {
                this.certificateImgShow = false;
            },
        },
        components: {
            withdrawFlow,
            applySuccess,
            certificateImg
        }
    }
</script>

<style lang="scss" scoped>
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
    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .4);
        z-index: 30;
    }
    .plan-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 16;
        width: 600px;
        box-sizing: border-box;
        height: 100%;
        overflow: hidden;
        overflow-y: scroll;
        color: #605E7C;
        background-color: #fff;
        header {
            width: 100%;
            background-color: rgba(216, 216, 216, .2);
            border-bottom: 1px solid transparent;
        }
    }
    .warn {
        color: #FF9393;
    }
    .font-gray {
        color: rgba(96, 94, 124, 0.7);
    }
    header {
        .top-til {
            justify-content: space-between;
            display: flex;
            margin-bottom: 10px;
            padding: 0 15px 0 40px;
            height: 41px;
            line-height: 41px;
            font-size: 1.2rem;
            background-color: #fff;
            span {
                display: block;
                box-sizing: border-box;
                margin-top: 9px;
                width: 22px;
                height: 22px;
                line-height: 22px;
                text-align: center;
                color: #3C78FF;
                border: 1px solid #ededed;
                border-radius: 100%;
                cursor: pointer;
            }
        }
        .head-til {
            display: flex;
            align-items: center;
            padding-left: 40px;
            height: 73px;
            font-size: 1.5rem;
            background: white;
        }
        .header-num {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 242px;
            .top {
                font-size: 2.0rem;
            }
            .bottom {
                font-weight: bold;
                font-size: 3.5rem;
            }
        }
        .withdraw-flow {
            display: flex;
            justify-content: center;
            margin-bottom: 45px;
        }
    }
    .ard-container {
        display: flex;
        margin-top: 45px;
        margin-bottom: 40px;
        padding: 0 40px;
        .ard-item {
            display: flex;
            flex-grow: 1;
            width: 256px;
            height: 15px;
            .left {
                width: 85px;
            }
            .right {}
        }
    }
    .ard-button {
        position: fixed;
        right: 20px;
        bottom: 0;
        display: flex;
        justify-content: center;
        margin: 0 auto;
        margin-bottom: 25px;
        width: 560px;
        height: 62px;
        background: white;
        border-top: 1px solid rgba(151, 151, 151, 0.3);
        .btn-b {
            margin-top: 20px;
            width: 202px;
            height: 40px;
        }
    }
    .ard-certificate {
        display: flex;
        padding-left: 40px;
        .ardc-left {
            width: 85px;
        }
        .ardc-right {
            img {
                width: 440px;
                height: 320px;
            }
        }
    }
</style>
