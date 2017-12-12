<template>
    <div class="timely-box popup" :style="renTimelyBoxXY" ref="timely-box" @mousedown="bindDrop"  @mouseup="clearDrop"
    @mouseover="">
        <div class="timely-nav">
            <div class="timely-nav-checked information">
                <p>成都双流运力</p>
                <span>张三</span>
            </div>
            <div>
                <p>成都双流运力</p>
                <span>张三</span>
            </div>
            <div>
                <p>成都双流运力</p>
                <span>张三</span>
            </div>
        </div>
        <div class="timely-content">
            <div class="timely-content-head">
                <div class="timely-title">成都双流找运力意向<span>洽谈中</span></div>
                <div class="timely-window">
                    <div class="btn-w timely-window-s">&#xe667;</div>
                    <div class="btn-w timely-window-d">&#xe62c;</div>
                </div>
            </div>
            <div class="timely-content-body">
                <div class="chat-function">
                    <div class="chat-function-banner">
                        <div class="scroll">
                            <div class="others-news">
                                <div class="head-portrait">
                                    <img src="./../../../static/img/test/145.png"/>
                                </div>
                                <div class="say-words">
                                    <p>2017.08.21<span>12:07</span></p>
                                    <div class="popup">您好，汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪</div>
                                </div>
                            </div>
                            <div class="oneself-news">
                                <div class="head-portrait">
                                    <img src="./../../../static/img/test/145.png"/>
                                </div>
                                <div class="say-words say-words-oneself">
                                    <p>2017.08.21<span>12:07</span></p>
                                    <div class="popup">您好，汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪</div>
                                </div>
                            </div>
                            <div class="oneself-news">
                                <div class="head-portrait">
                                    <img src="./../../../static/img/test/145.png"/>
                                </div>
                                <div class="say-words say-words-oneself">
                                    <p>2017.08.21<span>12:07</span></p>
                                    <div class="popup">您好，汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪</div>
                                </div>
                            </div>
                            <div class="oneself-news">
                                <div class="head-portrait">
                                    <img src="./../../../static/img/test/145.png"/>
                                </div>
                                <div class="say-words say-words-oneself">
                                    <p>2017.08.21<span>12:07</span></p>
                                    <div class="popup">您好，汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪</div>
                                </div>
                            </div>
                            <div class="oneself-news">
                                <div class="head-portrait">
                                    <img src="./../../../static/img/test/145.png"/>
                                </div>
                                <div class="say-words say-words-oneself">
                                    <p>2017.08.21<span>12:07</span></p>
                                    <div class="popup">您好，汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪</div>
                                </div>
                            </div>
                            <div class="oneself-news">
                                <div class="head-portrait">
                                    <img src="./../../../static/img/test/145.png"/>
                                </div>
                                <div class="say-words say-words-oneself">
                                    <p>2017.08.21<span>12:07</span></p>
                                    <div class="popup">您好，汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪</div>
                                </div>
                            </div>
                            <div class="oneself-news">
                                <div class="head-portrait">
                                    <img src="./../../../static/img/test/145.png"/>
                                </div>
                                <div class="say-words say-words-oneself">
                                    <p>2017.08.21<span>12:07</span></p>
                                    <div class="popup">您好，汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪</div>
                                </div>
                            </div>
                            <div class="modify-the-information">2017.08.21<span>12:07</span>xxxx 修改了信息</div>
                        </div>
                    </div>
                    <div class="chat-function-input">
                        <textarea name="a" class="scroll"></textarea>
                        <div class="btn btn-b user-select" id="req-bth">发送</div>
                    </div>
                </div>
                <div class="personal">
                    <transition name="slide-fade">
                        <div class="personal-c" v-if="ishs">
                            <div class="personal-panel">
                                <div class="personal-panel-portrait">
                                    <img src="./../../../static/img/test/145.png"/>
                                </div>
                                <div class="personal-panel-name">
                                    <p>小二</p>
                                    <div class="">南方航空<span>市场部</span></div>
                                </div>
                            </div>
                            <div class="demand-history">
                                <div>成都双流找运力</div>
                                <span @click="openhs">&#xe63b;</span>
                            </div>
                            <div class="demand-describe scroll">
                                <div>
                                    <div>
                                        <div>始发机场</div>
                                        <div>双流机场</div>
                                    </div>
                                    <div>
                                        <div>始发机场</div>
                                        <div>双流机场</div>
                                    </div>
                                    <div>
                                        <div>始发机场</div>
                                        <div>双流机场</div>
                                    </div>

                                </div>
                            </div>
                            <div class="view-btn btn-w">查看订单详情</div>
                        </div>
                    </transition>
                    <transition name="slidehs-fade">
                        <div class="personal-hy" @click="openhs">历史</div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                ishs:true,
                timelyBox:'',
                timelyBoxXY:{   // 最后设置的聊天框位置
                    x:10,
                    y:10
                },
                dropData:{
                    mouseCoordinate:{
                        x:0,
                        y:0
                    }
                }
            }
        },
        mounted:function () {
            this.timelyBox = this.$refs['timely-box'];
            let app = document.getElementById('app');
            let left = (app.offsetWidth - this.timelyBox.offsetWidth)/2;
            let top = (app.offsetHeight - this.timelyBox.offsetHeight)/2;
            this.timelyBoxXY.x = left;
            this.timelyBoxXY.y = top;
        },
        computed:{
            renTimelyBoxXY:function () {
                return `left:${this.timelyBoxXY.x}px;top:${this.timelyBoxXY.y}px`;
            }
        },
        methods:{
            openhs:function () {
                this.ishs = !this.ishs;
            },
            bindDrop:function () {  // 绑定拖拽事件
                this.dropData.mouseCoordinate.x = this.timelyBox.offsetLeft;
                this.dropData.mouseCoordinate.y = this.timelyBox.offsetTop;
            },
            clearDrop:function () {  // 移除拖拽事件
                console.log(7);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .personal-hy{
        left: 0;
        transform: translateX(200px);
    }
    .personal-c{
        left: 0;
    }
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(-200px);
        opacity: 0;
    }

    .slidehs-fade-enter-active {
        transition: all .3s ease;
    }
    .slidehs-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slidehs-fade-enter, .slidehs-fade-leave-to {
        transform: translateX(0px);
        opacity: 1;
    }

    .demand-describe{
        padding: 15px 0 15px 15px;
        flex: 1;
        overflow-x: hidden;
        overflow-y: scroll;
        >div{
           >div{
               display:flex;
               height: 30px;
               align-items: center;
               >div:first-of-type{
                   color:rgba(96, 94, 124, 0.7) ;
                   width: 60px;
               }
               >div:last-of-type{
                   color: #605E7C ;
               }
           }
        }
    }
    .view-btn{
        width: 160px;
        border-radius: 15px;
        height: 20px;
        color: rgba(96, 94, 124, 0.7);
        font-size: 1.2rem;
        float: right;
        text-align: center;
        line-height: 20px;
        margin: 10px auto;
    }
    .demand-history{
        display: flex;
        height: 60px;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        color: #605E7C;
        border-bottom: 1px solid #efefef;
        padding: 0 15px;
        >div{
            font-weight: bold;
        }
        >span{
            font-family: iconfont;
            font-size: 1.8rem;
            cursor: pointer;
        }
    }
    .personal{
        position: relative;
        padding: 0 ;
        flex: 1;
        overflow-x: hidden;
        >div{
            width: 100%;
            position: absolute;
        }
    }
    .personal-panel{
        display: flex;
        padding: 25px 15px 20px 15px;
        border-bottom: 1px solid #efefef;
        height: 60px;
    }
    .personal-panel-name{
        padding: 15px 0 0 15px;
        >p{
            padding: 0;
            margin: 0;
            color: #605E7C;
            font-weight: bold;
        }
        >div{
            margin-top: 7px;
            color:rgba(96, 94, 124, 0.7) ;
            >span{
                margin-left: 5px;
            }
        }
    }
    .personal-panel-portrait{
        width: 60px;
        height: 60px;
        >img{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
        }
    }
    #req-bth{
        width: 80px;
        border-radius: 15px;
        height: 20px;
        color: white;
        font-size: 1.2rem;
        float: right;
        margin-top: 5px;
    }
    .chat-function-input{
        >textarea{
            border: 1px solid #efefef;
            resize:none;
            height: 77px;
            width: 535px;
            background-color: #f6f6f6;
            font-size: 1.4rem;
            color: #605E7C;
            /*padding: 5px 10px;*/
            font-family: "Microsoft YaHei UI";
        }
    }
    .modify-the-information{
        height: 30px;
        display: inline-flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        color: rgba(96, 94, 124, 0.7);
        font-size: 1.3rem;
        background-color: #ececec;
        margin-top: 30px;
        padding: 0 10px;
        width: auto;
        border-radius: 5px;
        padding-top: 0px !important;
        >span{
            margin:0 10px;
        }
    }
    .head-portrait {
        width: 35px;
        height: 35px;
        > img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            overflow: hidden;
        }
    }

    .say-words {
        flex: 1;
        display: flex;
        flex-flow: column nowrap;
        padding-left: 10px;
        > p {
            padding: 0;
            margin: 0;
            height: 16px;
            color: rgba(96, 94, 124, .7);
            font-size: 1.3rem;
            > span {
                margin-left: 10px;
            }
        }
        > div {
            margin-top: 5px;
            padding: 8px 20px;
            color: #605E7C;
            letter-spacing: 2px;
            font-size: 1.3rem;
            line-height: 16px;
            background-color: white;
        }
    }
    .say-words-oneself{
        padding: 0 10px 0 0;
        >p{
            display: flex;
            justify-content: flex-end;
        }
    }
    .others-news {
        display: flex;
    }

    .oneself-news {
        display: flex;
        flex-flow: row-reverse nowrap;
    }
    .chat-function-banner {
        height: 430px;
        border-bottom: 2px solid #efefef;
        overflow-y: scroll;
        overflow-x: hidden;
        >div{
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            >div{
                padding-top: 30px;
            }
            >div:last-of-type{
                margin-bottom: 30px;
            }
        }
    }

    .timely-content-body {
        display: flex;
        flex: 1;
    }

    .chat-function {
        background-color: #f6f6f6;
        width: 600px;
        height: 100%;
        /*padding: 0 30px;*/
        >div{
            padding: 0 30px;
        }
    }

    .timely-box {
        width: 960px;
        height: 600px;
        position: absolute;
        z-index: 999;
        display: flex;
        flex-flow: row nowrap;
        /*overflow: hidden;*/
    }

    .timely-nav {
        width: 160px;
        background-color: #3c78ff;
        > div {
            height: 40px;
            display: flex;
            flex-flow: column nowrap;
            padding: 20px 0 0 20px;
            position: relative;
            > p {
                margin: 0 0 5px 0;
                padding: 0;
                color: white;
                font-size: 1.2rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            > span {
                margin: 0;
                padding: 0;
                color: rgba(255, 255, 255, .58);
                font-size: 1.2rem;
                transform: scale(.8) translateX(-18px);
            }
        }
    }

    .timely-nav-checked {
        background-color: #5287ff;
        box-shadow: rgba(60, 120, 255, .19) 0 2px 12px;
    }

    .information:before {
        content: '\e61e';
        font-family: iconfont;
        color: #ff656f;
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 12px;
    }

    .timely-content {
        display: flex;
        flex-flow: column nowrap;
        flex: 1;
    }

    .timely-content-head {
        height: 40px;
        box-shadow: 0 5px 11px rgba(85, 85, 85, 0.1);;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
    }

    .timely-window {
        display: flex;
        width: 48px;
        justify-content: space-between;
        > div {
            font-family: iconfont;
            font-size: 1.2rem;
            border: none;
            padding: 0;
            cursor: pointer;
            text-align: center;
            line-height: 20px;
            width: 20px;
            top: 6px;
            height: 20px;
            background-color: white;
            border-radius: 50%;
        }
    }

    .timely-title {
        > span {
            margin-left: 10px;
        }
        color: #605E7C;
        font-weight: bold;
    }

    .timely-window-d {
        color: #3c78ff;
    }

    .timely-window-s {
        color: #5bb53c;
    }
</style>