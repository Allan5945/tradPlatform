<template>
    <div class="ald-container">
        <div class="first item-container">
            <span>需求详情</span>
            <span class="close-icon">&times;</span>
        </div>
        <div class="second item-container">
            <div class="top">
                成都-北京-上海航线需求
            </div>
            <div class="bottom">
                <span>创建于2017.12.12</span><span>已有两位用户发起意向</span>
            </div>
        </div>
        <div class="third item-container">
            <div class="start item">
                <div class="item-a">始发机场</div>
                <div class="item-b">成都双流</div>
                <div class="item-c">接受临近机场</div>
                <div class="item-d">出港资源</div>
                <div class="item-e">08:00-12:00</div>
            </div>
            <div class="item-icon">
                <span class="icon-item">&#xe672;</span>
            </div>
            <div class="pass item">
                <div class="item-a">经停机场</div>
                <div class="item-b">北京南苑</div>
                <div class="item-c">&nbsp;</div>
                <div class="item-d">出港资源</div>
                <div class="item-e">带协调</div>
            </div>
            <div class="item-icon">
                <span class="icon-item">&#xe672;</span>
            </div>
            <div class="arrive item">
                <div class="item-a">到达区域</div>
                <div class="item-b">华北地区</div>

                <!--下方有空格-->
                <div class="item-c">&nbsp;<!--此处有空格--></div>
                <div class="item-d">&nbsp;<!--此处有空格--></div>
                <div class="item-e">&nbsp;<!--此处有空格--></div>
            </div>
        </div>
        <div class="fourth item-container">
            <div class="items">
                <div class="left item">
                    <div>拟开时间</div>
                    <div>拟飞机型</div>
                    <div>客量期望</div>
                    <div>补贴政策</div>
                </div>
                <div class="right item">
                    <div>2017.11.11-2018.11.11</div>
                    <div>AA2222</div>
                    <div>80人/均班</div>
                    <div>按人头</div>
                </div>
            </div>
            <div class="items">
                <div class="left item">
                    <div>拟开班期</div>
                    <div>座位数</div>
                    <div>客座率期望</div>
                    <div>有效期</div>
                </div>
                <div class="right item">
                    <div>待定</div>
                    <div>180</div>
                    <div>80%</div>
                    <div>2017.11.11-2018.11.11</div>
                </div>
            </div>
        </div>
        <div class="fifth">
            <div class="buttons">
                <button class="btn btn-b"><span class="icon-item">&#xe609;</span>我有意向</button>
                <button class="btn btn-w">收藏</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        components: {}
    }
</script>
<style lang="scss" scoped>
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
        top: 10px;
        right: 10px;
        width: 600px;
        min-height: 700px;
        background: white;
        transform:translate(0,0);
        z-index: 1;
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
        flex-direction: column;
        height: 100px;
        background: rgba(216,216,216, .17);
        .top {
            margin: 30px 0 15px 0;
            font-size: 20px;
        }
        .bottom {
            margin-left: 3px;
        }
    }
    .third {
        position: relative;
        justify-content: space-between;
        margin: 20px 0;
        .item {
            width: 140px;
            height: 160px;
            .item-a {
                margin: 25px 0 10px 0;
            }
            .item-b {
                font-size: 20px;
            }
            .item-c {
                margin-bottom: 23px;
            }
            .item-d {
                margin-bottom: 5px;
            }
            .item-e {}
        }
        .item-icon {
            position: relative;
            >span {
                position: absolute;
                top: 55px;
                left: 50%;
                margin-left: -8px;
            }
        }
    }
    .fourth {
        justify-content: space-between;
        .items {
            display: flex;
            width: 240px;
            .item {
                line-height: 40px;
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
        position: fixed;
        left: 20px;
        bottom: 0;
        display: flex;
        justify-content: center;
        width: 560px;
        height: 100px;
        border-top: 2px solid;
        .buttons {
            display: flex;
            margin-top: 18px;
            height: 40px;
            >.btn-b {
                margin-right: 10px;
                width: 230px;
                border-radius: 20px;
            }
            >.btn-w {
                width: 80px;
                border-radius: 20px;
            }
        }
    }
</style>