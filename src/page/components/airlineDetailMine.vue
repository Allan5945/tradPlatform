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
                <span>创建于2017.12.12</span><span>已有2位用户发起意向</span>
            </div>
        </div>
        <div class="third item-container">
            <div class="start item">
                <div class="item-a">始发机场</div>
                <div class="item-b"><h2>成都双流</h2></div>
                <div class="item-c">接受临近机场</div>
                <div class="item-d">出港资源</div>
                <div class="item-e">08:00-12:00</div>
            </div>
            <div class="item-icon">
                <span class="icon-item">&#xe672;</span>
            </div>
            <div class="pass item">
                <div class="item-a">经停机场</div>
                <div class="item-b"><h2>北京南苑</h2></div>
                <div class="item-c">&nbsp;<!--此处有空格--></div>
                <div class="item-d">出港资源</div>
                <div class="item-e">带协调</div>
            </div>
            <div class="item-icon">
                <span class="icon-item">&#xe672;</span>
            </div>
            <div class="arrive item">
                <div class="item-a">到达区域</div>
                <div class="item-b"><h2>华北地区</h2></div>

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
                    <div style="display: flex;">2017.11.11-2018.11.11 <span class="icon-item">&#xe653;</span></div>
                </div>
            </div>
        </div>
        <div class="fifth item-container">
            <div class="left">其他说明</div>
            <div class="right">其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
            </div>
        </div>
        <div class="sixth item-container">
            <h2>收到的意向</h2>
            <span>已有2位用户发起意向</span>
        </div>
        <div class="seventh item-container">
            <span class="danger">*您还未缴纳意向金，缴纳后可查看详细列表</span>
        </div>
        <div class="eighth">
            <div class="buttons">
                <button class="btn btn-b">点击此处缴纳意向金</button>
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
        components: {}
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
    h2 {
        margin: 0;
        font-size: 20px;
        line-height: 20px;
    }
    .danger {
        color: red;
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
        top: 10px;
        right: 10px;
        padding-bottom: 100px;
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
                display: flex;
                flex-direction: column;
                justify-content: space-between;
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
    .sixth {
        flex-direction: column;
        margin: 20px 0;
        height: 100px;
        background: rgba(216,216,216, .17);
        h2 {
            margin: 30px 0 20px 0;
        }
        span {
            line-height: 12px;
        }
    }
    .seventh {
        margin-bottom: 40px;
    }
    .eighth {
        position: absolute;
        bottom: 0;
        display: flex;
        /*justify-content: center;*/
        width: 560px;
        height: 100px;
        .buttons {
            display: flex;
            margin-top: 18px;
            margin-left: 90px;
            height: 40px;
            >.btn-b {
                margin-right: 14px;
                width: 300px;
                border-radius: 20px;
            }
            >.btn-w {
                width: 100px;
                border-radius: 20px;
            }
        }
    }
</style>