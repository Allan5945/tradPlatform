<template>
    <div class="timely-box popup" :style="renTimelyBoxXY" ref="timely-box" @mousedown="clearAndBindDrop(true)"  @mouseup="clearAndBindDrop(false)"
    @mousemove="transitionDrop">
        <div class="timely-nav">
            <div class="information" :class="{'timely-nav-checked':(setId == key.setId)}" v-for="(key,i) in inData"
            @click="setChat(key)">
                <p>{{key.title}}</p>
                <span>{{key.chatObjectList.name}}</span>
            </div>
        </div>
        <div class="timely-content">
            <div class="timely-content-head">
                <div class="timely-title">成都双流找运力意向<span>洽谈中</span></div>
                <div class="timely-window">
                    <div class="btn-w timely-window-s" @click="initDis(false)">&#xe667;</div>
                    <div class="btn-w timely-window-d" @click="initDis(true)">&#xe62c;</div>
                </div>
            </div>
            <div class="timely-content-body">
                <div class="chat-function">
                    <div class="chat-function-banner">
                        <div class="scroll">
                            <div :class="{'modify-the-information':(val.textType == '1'),'others-news':(val.textType == '0' && val.fromNameId == role.id),'oneself-news':(val.textType == '0' && val.fromNameId != role.id)}"
                                 v-for="(val,index) in chatIng">
                                <div class="head-portrait" v-if="(val.textType == '0')">
                                    <img src="./../../../static/img/test/145.png"/>
                                </div>
                                <div class="say-words" v-if="(val.textType == '0')">
                                    <p>{{val.date}}</p>
                                    <!--<p>{{val.date.split(' ')[0]}}<span>{{val.date.split(' ')[1]}}</span></p>-->
                                    <div class="popup">{{val.text}}</div>
                                </div>
                               <span v-if="!(val.textType == '0')">{{val.date}}<span></span>{{val.text}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="chat-function-input">
                        <textarea name="a" class="scroll" ref="textarea" v-model="textData"></textarea>
                        <div class="btn btn-b user-select" id="req-bth" @click="sendData">发送</div>
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
                                <span @click="openhs" title="历史记录">&#xe63b;</span>
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
                        </div>
                    </transition>
                    <div class="personal-hy-btn btn btn-b" v-if="!ishs" @click="openhs"></div>
                    <div class="view-btn btn-w" v-if="ishs">查看订单详情</div>
                    <transition name="slidehs-fade">
                        <div class="personal-hy" v-if="!ishs">
                            <div class="personal-hy-t">
                                运力修改记录(5条)
                            </div>
                            <div class="personal-hy-i"
                                 @mouseover="viewHsy(true,i)"
                                 @mouseout="viewHsy(false,i)"
                                 v-for="(key,i) in modifyHistory">
                                <div>{{key.t}}</div>
                                <div>{{key.c}}</div>
                                <span v-if="(i == selectModifyHistory)">&#xe686;</span>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import * as vx from 'vuex';
    import ln from '$src/public/js/tabulationBoxTrigger.js';

    export default {
        data(){
            return{
                ishs:false,
                selectModifyHistory:null,
                modifyHistory:[{
                    t:'2017.08.07',
                    c:"xx修改了方案"
                }],
                timelyBox:'',
                timelyBoxXY:{   // 最后设置的聊天框位置
                    x:10,
                    y:10
                },
                textData:"",
                dropData:{
                    mouseCoordinate:{
                        x:0,
                        y:0
                    }
                },
                setId:null
            }
        },
        created:function () {
            this.setId = this.inData[0].setId;
        },
        mounted:function () {
            this.$refs.textarea.focus();
            this.timelyBox = this.$refs['timely-box'];
            let app = document.getElementById('app');
            let left = (app.offsetWidth - this.timelyBox.offsetWidth)/2;
            let top = (app.offsetHeight - this.timelyBox.offsetHeight)/2;
            this.timelyBoxXY.x = left;
            this.timelyBoxXY.y = top;
        },
        computed:{
            ...vx.mapGetters([
                'role'
            ]),
            renTimelyBoxXY:function () {
                return `left:${this.timelyBoxXY.x}px;top:${this.timelyBoxXY.y}px`;
            },
            dis:function () {  // 计算聊天框是显示还是关闭
                return {
                    shut:ln.chat.shut,
                    narrow:ln.chat.narrow
                };
            },
            inData:function () {
                let a = [];
                for(let k in ln.chat.chatData){
                    let chatObjectList ={};
                    ln.chat.chatData[k].data.chatObjectList.forEach((v)=>{
                        switch (v.key){
                            case 'department' :
                                chatObjectList['department'] = v.val;
                                break;
                            case 'company' :
                                chatObjectList['company'] = v.val;
                                break;
                            case 'name' :
                                chatObjectList['name'] = v.val;
                                break;
                        }
                    });
                    a.push({
                        chatObjectList,
                        rightTable:ln.chat.chatData[k].data.rightTable,
                        title:ln.chat.chatData[k].data.title,
                        chatRcord:ln.chat.chatData[k].data.chatRcord,
                        modifyRcord:ln.chat.chatData[k].data.modifyRcord,
                        setId:k,
                    });
                };
                console.log(a)
                return a;
            },
            chatIng:function () {
                return ln.chat.chatData[this.setId].data.chatRcord.list.reverse();
            }

        },
        methods:{
            sendData:function () {
                let ids = this.setId.split('=');
                this.$ajax({
                    method: 'post',
                    url: '/api/send',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params:{
                        fromNameId:ids[0],
                        toNameId:ids[1],
                        demandId:ids[2],
                        text:this.textData
                    },
                })
                    .then((response) => {
                        console.log(response)
                    })
                    .catch((error) => {
                            console.log(error);
                        }
                    );
            },
            setChat:function (v) {
                this.setId = v.setId;
            },
            initDis(t) {
                if(t){
                    ln.chat.shut = false;
                    ln.chat.narrow = true;
                }else{
                    ln.chat.narrow = false;
                }
            },
            viewHsy:function (t,i) {
                if(t)this.selectModifyHistory = i;
                if(!t)this.selectModifyHistory = null;
            },
            openhs:function () {
                this.ishs = !this.ishs;
            },
            transitionDrop:function (e) {
//                console.log(66)
            },
            clearAndBindDrop:function () {  // 绑定拖拽事件
                this.dropData.mouseCoordinate.x = this.timelyBox.offsetLeft;
                this.dropData.mouseCoordinate.y = this.timelyBox.offsetTop;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .personal-hy-i{
        display: flex;
        height: 34px;
        align-items: center;
        position: relative;
        >span{
            font-family: iconfont;
            position: absolute;
            right: 0;
            top: 12px;
            &:hover{
               color: #3c78ff;
                cursor: pointer;
            }
        }
        >div:nth-child(1){
            color: #605E7C;
            width: 70px;
        }
        >div:nth-child(2){
            color: #605E7C;
            font-weight: 600;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            width: 100px;
        }
    }
    .personal-hy-btn{
        position: absolute;
        top: 50%;
        left: -25px;
        width: 50px !important;
        height: 50px !important;
        margin-top:-25px ;
        border-radius: 50%;
        text-align: right;
        &:before{
            writing-mode: tb-rl;
            position: absolute;
            content:'返回';
            right: 5px;
            font-size: 12px;
            color: white;
            top: 12px;
        }
    }
    .personal-hy-t{
        height: 46px;
        display: flex;align-items: center;
        border-bottom: 1px solid  rgba(151,151,151,.2);
        color: #605E7C;
        margin-bottom: 8px;
    }
    .personal-hy{
        left: 0;
        padding:0 8px 0 20px;
    }
    .personal-c{
        left: 0;
        display: flex;
        flex-flow: column;
        padding: 0 15px;
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
        transform: translateX(200px);
        opacity: 1;
    }
    .slidehs-fade-enter-to, .slidehs-fade-leave {
        transform: translateX(0px);
        opacity: 0;
    }


    .demand-describe{
        flex: 1;
        overflow-x: hidden;
        height: 80px;
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
        bottom:5px;
    }
    .demand-history{
        display: flex;
        height: 60px;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        color: #605E7C;
        border-bottom: 1px solid #efefef;
        /*padding: 0 15px;*/
        >div{
            font-weight: bold;
        }
        >span{
            font-family: iconfont;
            font-size: 1.8rem;
            cursor: pointer;
            &:hover{
                color: #3c78ff;
            }
        }
    }
    .personal{
        position: relative;
        flex: 1;
        overflow-x: hidden;
        padding: 0 8px 0 20px;
        >div{
            /*width: 200px;*/
            position: absolute;
        }
    }
    .personal-panel{
        display: flex;
        padding: 25px 0 20px 0;
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
            /*border: 1px solid #efefef;*/
            border: none;
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
        >span{
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
        align-self:flex-start;
    }

    .oneself-news {
        display: flex;
        flex-flow: row-reverse nowrap;
        align-self:flex-end;
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
        cursor: pointer;
        &:hover{
            background-color: #3c78ff;
        }
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
        z-index: 3;
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