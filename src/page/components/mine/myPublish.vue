<template>
    <div class="ald-container">
        <div class="first item-container">
            <span>需求详情</span>
            <span class="close-icon" @click="closeThisFn" style="cursor: pointer;">&times;</span>
        </div>
        <div class="second item-container">
            <div class="anew-publish">
                重新发布
            </div>
            <div class="top">
                <span>成都-北京-上海航线需求</span>
            </div>
            <div class="bottom">
                <span class="font-gray" style="margin-right: 46px;">创建于2017.12.12</span>
                <span class="font-gray">状态:　<span style="color: red; font-weight: bold;">审核未通过</span></span>
            </div>
        </div>
        <div class="fourth item-container">
            <div class="items">
                <div class="left item">
                    <div class="font-gray">出港时刻</div>
                    <div class="font-gray">机型</div>
                    <div class="font-gray">运力归属</div>
                    <div class="font-gray">小时成本</div>
                    <div class="font-gray">有效期</div>
                </div>
                <div class="right item">
                    <div class="item-height">08:00-12:00</div>
                    <div class="item-height">AA2222</div>
                    <div class="item-height">东方航空</div>
                    <div class="item-height">0.5万元/小时</div>
                    <div class="item-height" style="display: flex;">2017.11.11-2018.11.11<span class="icon-item">&#xe653;</span></div>
                </div>
            </div>
            <div class="items">
                <div class="left item">
                    <div class="font-gray">班期</div>
                    <div class="font-gray">运力基地</div>
                    <div class="font-gray">座位布局</div>
                    <div class="font-gray">接受调度</div>
                </div>
                <div class="right item">
                    <div class="item-height">待定</div>
                    <div class="item-height">成都双流机场</div>
                    <div class="item-height">F8Y160</div>
                    <div class="item-height">武汉</div>
                </div>
            </div>
        </div>
        <div class="fifth item-container">
            <div class="left font-gray">其他说明</div>
            <div class="right">其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
            </div>
        </div>
        <div class="seventh item-container">
            <span class="danger">*XXXX事情有误，请重新输入</span>
        </div>
        <span class="line"></span>
        <div class="eighth">
            <div class="buttons">
                <button class="btn btn-w">结束需求</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        components: {},
        methods: {
            closeThisFn: function () {
                this.$emit('close-this');
            },
        }
    }
</script>
<style lang="scss" scoped>
    /*多行省略号，兼容多个浏览器*/
    @mixin line-clamp($lines, $line-height: 20px) {
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: $lines; // number of lines to show
        overflow: hidden;
        line-height: $line-height;
        max-height: $line-height * $lines;
    }
    /**************************/
    .font-gray {
        color: rgba(96, 94, 124, 0.7);
    }
    .danger {
        color: #FF9393;
    }
    .icon-item {
        font-size: 1.6rem;
        font-family: iconfont;
    }
    .btn-b {
        outline: none;
        border: 0;
    }
    .btn-w {
        outline: none;
    }
    .ald-container{
        position: absolute;
        top: 0px;
        right: 0px;
        /*padding-bottom: 100px;*/
        width: 600px;
        height: 100%;
        min-height: 700px;
        font-size: 1.2rem;
        background: white;
        transform:translate(0,0);
        z-index: 12;
    }
    .item-container {
        display: flex;
        padding: 0 40px;
    }
    .first {
        position: relative;
        justify-content: space-between;
        align-items: center;
        height: 41px;
        font-size: 12px;
        .close-icon {
            position: absolute;
            right: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            border: 1px solid gray;
            border-radius: 100%;
        }
    }
    .second {
        position: relative;
        flex-direction: column;
        margin-bottom: 50px;
        height: 100px;
        background: rgba(216,216,216, .17);
        .anew-publish {
            position: absolute;
            top: 25px;
            right: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 20px;
            color: white;
            border-radius: 20px;
            background: #3C78FF;
            cursor: pointer;
        }
        .top {
            display: flex;
            margin: 30px 0 15px 0;
            font-size: 20px;
        }
        .bottom {
            margin-left: 3px;
        }
    }
    .fourth {
        justify-content: space-between;
        .items {
            display: flex;
            width: 240px;
            .item {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                line-height: 40px;
                .item-height {
                    height: 40px;
                }
            }
            .left {
                width: 80px;
            }
            .right {
                width: 160px;
            }
        }
    }
    .fifth {
        margin-top: 20px;
        height: 100px;
        .left {
            flex-shrink: 0;
            width: 80px;
            line-height: 20px;
        }
        .right {
            @include line-clamp(3);
        }
    }
    .seventh {
        position: absolute;
        bottom: 125px;
    }
    .line {
        position: absolute;
        left: 20px;
        bottom: 110px;
        width: 560px;
        height: 2px;
        background: #f3f3f3;
    }
    .eighth {
        position: absolute;
        left: 20px;
        bottom: 0;
        display: flex;
        justify-content: center;
        /*align-items: center;*/
        width: 560px;
        height: 100px;
        background: white;
        .buttons {
            display: flex;
            margin-top: 18px;
            height: 40px;
            >.btn-b {
                margin-right: 14px;
                width: 300px;
                border-radius: 20px;
            }
            >.btn-w {
                width: 200px;
                border-radius: 20px;
            }
        }
    }
</style>