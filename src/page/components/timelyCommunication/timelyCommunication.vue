<template>
    <div class="timely-box popup" ref="timely-box" @mousedown="clearAndBindDrop(true,$event)"
         @mouseup="clearAndBindDrop(false,$event)"
         @mousemove="transitionDrop">
        <div class="timely-nav">
            <div :class="{'timely-nav-checked':(setId == key.setId),'information':(key.noReadCount > 0)}"
                 v-for="(key,i) in inData"
                 @click="setChat(key)">
                <p>{{key.title}}</p>
                <span>{{key.chatObjectList.name}}</span>
            </div>
        </div>
        <div class="timely-content">
            <div class="timely-content-head">
                <div class="timely-title">{{inData[this.setId].title}}<span v-if="setId != 'x-t-null'">洽谈中</span></div>
                <div class="timely-window">
                    <div class="btn-w timely-window-s" @click="initDis(false)">&#xe667;</div>
                    <div class="btn-w timely-window-d" @click="initDis(true)">&#xe62c;</div>
                </div>
            </div>
            <div class="timely-content-body">
                <div class="chat-function" v-if="setId != 'x-t-null'" @mousedown.stop @mouseup.stop>
                    <div class="chat-function-banner" id="chat-function-banner">
                        <div class="scroll" @scroll="woListScroll($event)">
                            <div :class="{'modify-the-information':(val.textType == '1'),'oneself-news':(val.textType == '0' && val.fromNameId == role.id),'others-news':(val.textType == '0' && val.fromNameId != role.id)}"
                                 v-for="(val,index) in chatIng">
                                <div class="head-portrait" v-if="(val.textType == '0')">
                                    <img src="./../../../static/img/test/145.png"/>
                                </div>
                                <div class="say-words" v-if="(val.textType == '0')">
                                    <p>{{val.date}}</p>
                                    <div class="popup">{{val.text}}</div>
                                </div>
                                <span v-if="!(val.textType == '0')"><p>{{val.date}}</p><span></span>{{val.text}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="chat-function-input" v-show="inData[setId].demandProgress != '3' && inData[setId].demandProgress != '4'">
                        <textarea name="a" @keydown="handling({t:true},$event)" @keyup="handling({t:false},$event)"
                                  class="scroll" ref="textarea" v-model="textData"></textarea>
                        <div class="btn btn-b user-select" id="req-bth" @click="sendData">发送</div>
                    </div>
                </div>
                <div class="chat-detailed" @scroll="woListScroll($event)" v-else>
                    <div class="chat-detailed-item" v-for="(val,index) in chatIng.reverse()">
                        <div class="chat-detailed-title"><span v-text="val.title"></span>{{val.date}}</div>
                        <div class="chat-detailed-text popup" v-text="val.text"></div>
                        <div class="chat-detailed-btn btn btn-b" @click="queryDemod(val)">查看详情</div>
                    </div>
                </div>
                <div class="personal" v-if="!inData[setId].iskf">
                    <div class="personal-c" v-if="ishs">
                        <div class="personal-panel">
                            <div class="personal-panel-portrait">
                                <img src="./../../../static/img/test/145.png"/>
                            </div>
                            <div class="personal-panel-name">
                                <div class=""><span>{{kfIng.iata}}</span></div>
                                <p>{{inData.company}}</p>
                                <div class="">{{kfIng.department}}<span>{{kfIng.name}}</span></div>
                                <div class="">{{kfIng.phone}}</div>
                            </div>
                        </div>
                        <div class="demand-history">
                            <div>{{inData[this.setId].title}}</div>
                            <span @click="openhs" title="历史记录">&#xe63b;</span>
                        </div>
                        <div class="demand-describe scroll">
                            <div>
                                <div v-for="(key,i) in rightTableUp">
                                    <div>{{key.key}}</div>
                                    <div :title="[key.val] | dft">{{[key.val] | dft}}</div>
                                </div>
                                <div v-for="(key,i) in rightTableDown">
                                    <div>{{key.key}}</div>
                                    <div :title="[key.val] | dft">{{[key.val] | dft}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="personal-hy-btn btn btn-b" v-if="!ishs" @click="openhs"></div>
                    <div class="view-btn btn-w" v-if="ishs" @click="queryDemod('')">查看订单详情</div>
                    <div class="personal-hy" v-if="!ishs">
                        <div class="none-personal-hy" v-if="inData[setId].modifyRcord.list.length == 0">无修改记录</div>
                        <div class="personal-hy-t" v-if="inData[setId].modifyRcord.list.length != 0">
                            修改记录({{inData[setId].modifyRcord.list.length}}条)
                        </div>
                        <div v-if="inData[setId].modifyRcord.list.length != 0" class="personal-hy-i"
                             @mouseover="viewHsy(true,i)"
                             @mouseout="viewHsy(false,i)"
                             v-for="(key,i) in inData[setId].modifyRcord.list">
                            <div>{{inData[setId].chatObjectList.name}}{{key.text}}</div>
                            <span v-if="(i == selectModifyHistory)">&#xe686;</span>
                        </div>
                    </div>
                </div>
                <div class="personal-x" v-else>
                    <div class="personal-x-kf">
                        <img src="./../../../static/img/tmhk.png" alt="">
                    </div>
                    <div class="personal-x-title">
                        <span>如有任何需求请联系</span>
                        <h4>{{inData[setId].rightTableUp[2].val}}</h4>
                    </div>
                    <div class="personal-x-item">
                        <span>热线</span>
                        <p>{{inData[setId].rightTableUp[3].val}}</p>
                    </div>
                    <div class="personal-x-item">
                        <span>地址</span>
                        <h6>{{inData[setId].rightTableUp[0].val}}</h6>
                    </div>
                    <img src="./../../../static/img/blbj.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import * as vx from "vuex";
    import ln from "$src/public/js/tabulationBoxTrigger.js";

    export default {
        data() {
            return {
                newline: {
                    enter: false,
                    ctrl: false
                },
                ishs: true,
                selectModifyHistory: null,
                timelyBox: "",
                timelyBoxXY: {
                    // 最后设置的聊天框位置
                    x: 10,
                    y: 10
                },
                textData: "",
                dropData: {
                    mouseCoordinate: {
                        x: 0,
                        y: 0
                    },
                    switch: false
                }
            };
        },
        mounted: function () {
            document.addEventListener("mousemove", e => {
                if (this.dropData.switch) {
                    this.timelyBox.style.left = this.timelyBoxXY.x + (e.screenX - this.dropData.mouseCoordinate.x) + 'px';
                    this.timelyBox.style.top = this.timelyBoxXY.y + (e.screenY - this.dropData.mouseCoordinate.y) + 'px';
                }
            });
            this.initBox();
        },
        watch: {},
        filter:{
            orders(data){
                return data;
            }
        },
        computed: {
            ...vx.mapGetters(["role"]),
            setId: function () {
                let url = "/updateState",
                    params = {},
                    id = ln.chat.setChat.split("-")
                ;
                if (ln.chat.setChat == 'x-t-null') {
                    url = '/updateSystemState';
                    params = {fromNameId: this.role.id}
                } else {
                    params = {
                        fromNameId: id[0] == this.role.id ? id[0] : id[1],
                        toNameId: id[0] == this.role.id ? id[1] : id[0],
                        demandId: id[2] == "null" ? "" : id[2]
                    };
                }
                ;
                if (ln.chat.chatData[ln.chat.setChat].noReadCount != 0 && ln.chat.chatData[ln.chat.setChat].noReadCount != undefined) {
                    this.$ajax({
                        method: "post",
                        url,
                        headers: {
                            "Content-type": "application/x-www-form-urlencoded"
                        },
                        params
                    })
                        .then(response => {
                            if (response.data.opResult == "0")
                                ln.chat.chatData[ln.chat.setChat].noReadCount = 0;
                            ln.chat.change = !ln.chat.change;
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
                ;
                return ln.chat.setChat;
            },
            renTimelyBoxXY: function () {
                return `left:${this.timelyBoxXY.x}px;top:${this.timelyBoxXY.y}px`;
            },
            dis: function () {
                // 计算聊天框是显示还是关闭
                return {
                    shut: ln.chat.shut,
                    narrow: ln.chat.narrow
                };
            },
            inData: function () {
                let b = {};
                if (this.setId != 'x-t-null') {
                    setTimeout(() => {
                        document.getElementById(
                            "chat-function-banner"
                        ).scrollTop = document.getElementById(
                            "chat-function-banner"
                        ).scrollHeight;
                    }, 10);
                }
                if (ln.chat.change) ;
                for (let k in ln.chat.chatData) {
                    let chatObjectList = {};
                    ln.chat.chatData[k].chatObjectList.forEach(v => {
                        switch (v.key) {
                            case "department":
                                chatObjectList["department"] = v.val;
                                break;
                            case "company":
                                chatObjectList["company"] = v.val;
                                break;
                            case "name":
                                chatObjectList["name"] = v.val;
                                break;
                            case "phone":
                                chatObjectList["phone"] = v.val;
                                break;
                            case "iata":
                                chatObjectList["iata"] = v.val;
                                break;
                        }
                    });
                    let iskf = true;
                    if (ln.chat.chatData[k].chatFlag.split('-').indexOf('null') == -1) {
                        iskf = false;
                    }
                    ;
                    b[ln.chat.chatData[k].chatFlag] = {
                        chatObjectList,
                        iskf,
                        rightTableDown: ln.chat.chatData[k].rightTableDown,
                        rightTableUp: ln.chat.chatData[k].rightTableUp,
                        title: ln.chat.chatData[k].title,
                        demandState: ln.chat.chatData[k].demandState,
                        demandType: ln.chat.chatData[k].demandType,
                        demandProgress: ln.chat.chatData[k].demandProgress,
                        chatRcord: ln.chat.chatData[k].chatRcord,
                        modifyRcord:
                            ln.chat.chatData[k].modifyRcord == null
                                ? {list: []}
                                : ln.chat.chatData[k].modifyRcord,
                        setId: k,
                        noReadCount: ln.chat.chatData[k].noReadCount,
                    };
                }
                return b;
            },
            chatIng: function () {
                if (ln.chat.change) ;
                return [...ln.chat.chatData[this.setId].chatRcord.list].reverse();
            },
            kfIng: function () {
                return this.inData[this.setId].chatObjectList;
            },
            rightTableDown: function () {
                return ln.chat.chatData[this.setId].rightTableDown;
            },
            rightTableUp: function () {
                return ln.chat.chatData[this.setId].rightTableUp;
            }
        },
        methods: {
            queryDemod(val){
                let demandState,demandType,demand;
                if(val == ''){
                    let a = this.inData[this.setId];
                    demandState = Number(a.demandState);
                    demandType = Number(a.demandType);
                    demand = this.setId.split('-')[2];
                }else{
                    demandState = Number(val.demandState);
                    demandType = Number(val.demandType);
                    demand = Number(val.demandId);
                }
                let data = {
                    demandState,
                    demandType,
                    demand
                };
                ln.$emit('demandType',data);
            },
            initBox: function () {
                if (this.setId != "x-t-null") {
                    this.$refs.textarea.focus();
                }
                this.timelyBox = this.$refs["timely-box"];
                let app = document.getElementById("app");
                let left = (app.offsetWidth - this.timelyBox.offsetWidth) / 2;
                let top = (app.offsetHeight - this.timelyBox.offsetHeight) / 2;
                this.timelyBoxXY.x = left;
                this.timelyBoxXY.y = top;
                this.timelyBox.style.left = left + 'px';
                this.timelyBox.style.top = top + 'px';
            },
            handling: function (v, e) {
                if (e.keyCode == 17) {
                    this.newline.ctrl = v.t;
                }
                if (e.keyCode == 13) {
                    if (v.t) {
                        if (this.newline.ctrl) {
                            this.newline.enter = v.t;
                        }
                    } else {
                        this.newline.enter = v.t;
                    }
                }
                if (this.newline.enter && this.newline.ctrl) {
                    this.sendData();
                }
            },
            sendData: function () {
                if (this.textData == "") return;
                let ids = this.setId.split("-");
                let len =
                    ids.indexOf(String(this.$store.getters.role.id)) == 0 ? true : false;
                let p = {
                    fromNameId: len ? ids[0] : ids[1],
                    toNameId: len ? ids[1] : ids[0],
                    demandId: ids[2] == 'null' ? '' : ids[2],
                    text: this.textData
                };
                let _this = this;
                this.$ajax({
                    method: "post",
                    url: "/api/send",
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded"
                    },
                    params: p
                })
                    .then(response => {
                        _this.textData = "";
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            setChat: function (v) {
                ln.chat.setChat = v.setId;
                if (v.setId == 'x-t-null') return;
                setTimeout(() => {
                    document.getElementById(
                        "chat-function-banner"
                    ).scrollTop = document.getElementById(
                        "chat-function-banner"
                    ).scrollHeight;
                }, 10);
            },
            initDis(t) {
                ln.chat.narrow = false;
                if (t) {
                    this.initBox();
                }
                ;
            },
            viewHsy: function (t, i) {
                if (t) this.selectModifyHistory = i;
                if (!t) this.selectModifyHistory = null;
            },
            openhs: function () {
                this.ishs = !this.ishs;
            },
            transitionDrop: function (e) {
            },
            clearAndBindDrop: function (t, event) {
                this.dropData.mouseCoordinate.x = event.screenX;
                this.dropData.mouseCoordinate.y = event.screenY;

                this.timelyBoxXY.x = this.timelyBox.offsetLeft;
                this.timelyBoxXY.y = this.timelyBox.offsetTop;

                // 绑定拖拽事件
                if (t) {
                    this.dropData.switch = true;
                } else {
                    this.dropData.switch = false;
                    // this.timelyBoxXY.x =200;
                    // this.timelyBoxXY.x = 0;

                }
                ;

            },
            woListScroll(e){
                if(e.target.scrollTop > e.target.scrollHeight/2){
//                    console.log(ln.chat.chatData[this.setId]);
                    if(ln.chat.chatData[this.setId].chatRcord.pageNo < ln.chat.chatData[this.setId].chatRcord.pageCount){
                        let num = Number(ln.chat.chatData[this.setId].chatRcord.pageNo) + 1;
                        ln.chat.chatData[this.setId].chatRcord.pageNo = num;
                        let url = '/openSystemChat';
                        if(this.setId != 'x-t-null'){
                            url = 'openNormalChat';
                        }
                        let params = {
                            fromNameId:this.role.id,
                            page:num
                        };
                        if(this.setId != 'x-t-null'){
                            let sed = this.setId.split('-');
                            url = {
                                fromNameId:this.role.id,
                                toNameId:sed[0] == this.role.id ? sed[1] : sed[0],
                                page:num,
                                demandId:sed[2] == 'null' ? "":sed[2]
                            }
                        }

                        this.$ajax({
                            method: 'post',
                            url,
                            headers: {
                                'Content-type': 'application/x-www-form-urlencoded'
                            },
                            params,
                        })
                            .then((response) => {
                                if(response.data.opResult == "0"){
                                    ln.chat.chatData[this.setId].chatRcord.list = [...ln.chat.chatData[this.setId].chatRcord.list,...response.data.systemMessage.chatRcord.list]
                                    ln.chat.change = !ln.chat.change;
                                    console.log(ln.chat.chatData[this.setId])
                                }else{
                                    ln.chat.chatData[this.setId].chatRcord.pageNo = num - 1;
                                    const h = this.$createElement;
                                    let mes = response.data.msg;
                                    this.$message({
                                        showClose: true,
                                        message: mes,
                                        type: 'error'
                                    });
                                }
                            })
                            .catch((error) => {
                                    console.log(error);
                                }
                            );
                    }
                }
                if(this.setId){

                }

            }
        }
    };
</script>
<style lang="scss" scoped>
    .chat-detailed-title {
        padding: 6px 0 6px 20px;
        color: rgba(96, 94, 124, 0.6);
        > span {
            font-weight: bold;
            margin-right: 40px;
            color: #605e7c;
        }
    }

    .chat-detailed-btn {
        width: 100px;
        align-self: flex-end;
        border-radius: 15px;
        padding: 6px 0;
        color: white;
        margin-top: 11px;
        font-size: 12px;
    }

    .chat-detailed-text {
        margin-top: 5px;
        padding: 20px 20px;
        color: #605e7c;
        letter-spacing: 2px;
        font-size: 1.3rem;
        background-color: white;
        align-self: stretch;
        word-break: break-all;
        box-shadow: none;
    }

    .personal-x-kf {
        margin: 0px 0 90px 0;
    }

    .personal-x-item {
        margin: 15px 0 0 0;
    }

    .personal-x-title {
        margin: 0 0 50px 0;
        > h4 {
            color: #605e7c;
            font-size: 1.8rem;
        }
    }

    .personal-hy-i {
        display: flex;
        height: 34px;
        align-items: center;
        position: relative;
        > span {
            font-family: iconfont;
            position: absolute;
            right: 0;
            top: 12px;
            &:hover {
                color: #3c78ff;
                cursor: pointer;
            }
        }
        > div:nth-child(1) {
            color: #605e7c;
            // width: 70px;
        }
        > div:nth-child(2) {
            color: #605e7c;
            font-weight: 600;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            width: 100px;
        }
    }

    .personal-hy-btn {
        position: absolute;
        top: 50%;
        left: -25px;
        width: 50px !important;
        height: 50px !important;
        margin-top: -25px;
        border-radius: 50%;
        text-align: right;
        &:before {
            writing-mode: tb-rl;
            position: absolute;
            content: "返回";
            right: 5px;
            font-size: 12px;
            color: white;
            top: 12px;
        }
    }

    .personal-hy-t {
        height: 46px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(151, 151, 151, 0.2);
        color: #605e7c;
        margin-bottom: 8px;
    }

    .personal-hy {
        left: 0;
        padding: 0 8px 0 20px;
    }

    .personal-c {
        left: 0;
        display: flex;
        flex-flow: column;
        padding: 0 15px;
    }

    .slide-fade-enter-active {
        transition: all 0.3s ease;
    }

    .slide-fade-leave-active {
        transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter,
    .slide-fade-leave-to {
        transform: translateX(-200px);
        opacity: 0;
    }

    .slidehs-fade-enter-active {
        transition: all 0.3s ease;
    }

    .slidehs-fade-leave-active {
        transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slidehs-fade-enter,
    .slidehs-fade-leave-to {
        transform: translateX(200px);
        opacity: 1;
    }

    .slidehs-fade-enter-to,
    .slidehs-fade-leave {
        transform: translateX(0px);
        opacity: 0;
    }

    .demand-describe {
        flex: 1;
        overflow-x: hidden;
        /*max-height: 80px;*/
        > div {
            > div {
                display: flex;
                height: 30px;
                align-items: center;
                > div:first-of-type {
                    color: rgba(96, 94, 124, 0.7);
                    width: 60px;
                }
                > div:last-of-type {
                    color: #605e7c;
                    width: 120px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }
    }

    .view-btn {
        width: 160px;
        border-radius: 15px;
        height: 20px;
        color: rgba(96, 94, 124, 0.7);
        font-size: 1.2rem;
        float: right;
        text-align: center;
        line-height: 20px;
        margin: 10px auto;
        bottom: 5px;
    }

    .demand-history {
        display: flex;
        height: 60px;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        color: #605e7c;
        border-bottom: 1px solid #efefef;
        /*padding: 0 15px;*/
        > div {
            font-weight: bold;
            width: 160px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        > span {
            font-family: iconfont;
            font-size: 1.8rem;
            cursor: pointer;
            &:hover {
                color: #3c78ff;
            }
        }
    }

    .personal {
        position: relative;
        flex: 1;
        overflow-x: hidden;
        padding: 0 8px 0 20px;
        > div {
            width: 172px;
            position: absolute;
        }
    }

    .personal-x {
        position: relative;
        flex: 1;
        overflow-x: hidden;
        padding: 0 8px 0 20px;
        > img {
            width: 200px;
            position: absolute;
            bottom: 0px;
            transform: translateX(-20px);
        }
        > div {
            > span {
                color: rgba(96, 94, 124, 0.6);
                font-size: 1.2rem;
                margin: 3px 0;
                display: inline-block;
            }
            > p {
                color: #605e7c;
                font-weight: bold;
            }
            > h6 {
                color: #605e7c;
                font-weight: bold;
            }
        }
    }

    .personal-panel {
        display: flex;
        padding: 25px 0 20px 0;
        border-bottom: 1px solid #efefef;
        height: 60px;
    }

    .personal-panel-name {
        padding: 0 0 0 15px;
        > p {
            padding: 0;
            margin: 0;
            color: #605e7c;
            font-weight: bold;
        }
        > div {
            margin-top: 7px;
            color: rgba(96, 94, 124, 0.7);
            > span {
                margin-left: 5px;
            }
        }
    }

    .personal-panel-portrait {
        width: 60px;
        height: 60px;
        > img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
        }
    }

    #req-bth {
        width: 80px;
        border-radius: 15px;
        height: 20px;
        color: white;
        font-size: 1.2rem;
        float: right;
        margin-top: 5px;
    }

    .chat-function-input {
        > textarea {
            /*border: 1px solid #efefef;*/
            border: none;
            resize: none;
            height: 77px;
            width: 535px;
            background-color: #f6f6f6;
            font-size: 1.4rem;
            color: #605e7c;
            /*padding: 5px 10px;*/
            font-family: "Microsoft YaHei UI";
        }
    }

    .modify-the-information {
        > span {
            height: 30px;
            display: inline-flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            color: rgba(96, 94, 124, 0.7);
            font-size: 1.3rem;
            background-color: #ececec;
            margin-top: 30px;
            padding: 8px 10px;
            width: auto;
            border-radius: 5px;
            > span {
                margin: 0 10px;
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
        padding-right: 10px;
        max-width: 485px;
        > p {
            padding: 0;
            margin: 0;
            height: 16px;
            color: rgba(96, 94, 124, 0.7);
            font-size: 1.3rem;
            > span {
                margin-left: 10px;
            }
        }
        > div {
            margin-top: 5px;
            padding: 8px 20px;
            color: #605e7c;
            letter-spacing: 2px;
            font-size: 1.3rem;
            background-color: white;
            align-self: stretch;
            word-break: break-all;
        }
    }

    .say-words-oneself {
        padding: 0 10px 0 0;
        > p {
            display: flex;
            justify-content: flex-end;
        }
    }

    .others-news {
        display: flex;
        align-self: flex-start;
    }

    .oneself-news {
        display: flex;
        flex-flow: row-reverse nowrap;
        align-self: flex-end;
    }

    .chat-function-banner {
        height: 430px;
        border-bottom: 2px solid #efefef;
        overflow-y: scroll;
        overflow-x: hidden;
        > div {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            > div {
                padding-top: 30px;
            }
            > div:last-of-type {
                margin-bottom: 30px;
            }
        }
    }

    .timely-content-body {
        display: flex;
        flex: 1;
    }

    .chat-function, .chat-detailed {
        background-color: #f6f6f6;
        width: 600px;
        height: 560px;
        /*padding: 0 30px;*/
        overflow-y: auto;
        > div {
            padding: 0 30px;
        }
    }

    .chat-detailed-item {
        display: flex;
        flex-flow: column;
        margin: 10px 0;
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
        overflow-y: scroll;
        &:hover {
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
                color: rgba(255, 255, 255, 0.58);
                font-size: 1.2rem;
                transform: scale(0.8) translateX(-18px);
            }
        }
    }

    .timely-nav-checked {
        background-color: #5287ff;
        box-shadow: rgba(60, 120, 255, 0.19) 0 2px 12px;
    }

    .information:before {
        content: "\e61e";
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
        box-shadow: 0 5px 11px rgba(85, 85, 85, 0.1);
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
        color: #605e7c;
        font-weight: bold;
    }

    .timely-window-d {
        color: #3c78ff;
    }

    .timely-window-s {
        color: #5bb53c;
    }

    .none-personal-hy {
        color: red;
        padding-top: 50px;
    }
</style>