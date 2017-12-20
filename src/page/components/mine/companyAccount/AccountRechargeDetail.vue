<template>
    <div class="wrapper" @click.self="closeIntent">
        <div class="plan-wrapper scroll">
            <header>
                <div class="top-til font-gray">流水详情<span class="iconfont" @click="closeIntent">&#xe62c;</span></div>
                <div class="head-til">意向金充值</div>
                <div class="header-num">
                    <div class="top">意向金</div>
                    <div class="bottom">+50000</div>
                </div>
            </header>
            <div class="ard-container">
                <div class="ard-item">
                    <div class="left font-gray">创建时间</div>
                    <div class="right">2017.12.23 17:59</div>
                </div>
                <div class="ard-item">
                    <div class="left font-gray">交易流水号</div>
                    <div class="right">00000000000000000000000</div>
                </div>
            </div>
            <div style="padding: 0 40px;">
                <span class="warn">*意向金将在双方互选方案后支付，或在需求/意向撤回后退回</span>
            </div>
        </div>
    </div>
</template>

<script>
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';
    import * as vx from 'vuex'

    export default {
        data() {
            return {

            }
        },
        mounted() {
        },
        methods: {
            closeIntent: function () {
                this.$emit('closeThis');
                tabulationBoxTrigger.hierarchy = false;
            },
        },
        components: {}
    }
</script>

<style lang="scss" scoped>
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
            height: 313px;
            .top {
                font-size: 2.0rem;
            }
            .bottom {
                font-weight: bold;
                font-size: 3.5rem;
            }
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
</style>
