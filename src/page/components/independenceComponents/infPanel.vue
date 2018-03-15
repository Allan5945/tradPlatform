<template>
    <div class="inf-box popup user-select" ref="timely-box" id="inf-mes-box" @click.stop
         @mousedown="clearAndBindDrop(true,$event)"
         @mouseup="clearAndBindDrop(false,$event)"
    >
        <div class="inf-head">
            <span>{{basicMes.airName}}</span>
            <span>{{basicMes.airCode}}</span>
            <span class="btn-w" @click="clek">&#xe62c;</span>
        </div>
        <div class="inf-mes">
            <div>
                <div>机场类型</div>
                <div>{{basicMes.airType}}</div>
            </div>
            <div>
                <div>飞行区等级</div>
                <div>{{basicMes.flyL}}</div>
            </div>
            <div>
                <div>是否国际</div>
                <div>{{basicMes.isgj}}</div>
            </div>
            <div>
                <div>放行准点率</div>
                <div>{{basicMes.fxzdl}}</div>
            </div>
            <div>
                <div>消防等级</div>
                <div>{{basicMes.xfdj}}</div>
            </div>
            <div>
                <div class="user-select">
                    航线网络图
                    <div id='turnLine' @click="change" :class="{'iskg0':!ched,'iskg1':ched}" class='iskg'>
                        <span :class="{'iskgCkecked':ched}" class='turn-off'>&#xe61e;</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="line-network">
            <router-link class="more" :to="{ path: '/index/information',query: { code: basicMes.airCode }}">
                更多详情
            </router-link>
        </div>
        <div class="inf-associated">
            <div class="inf-title">富余运力</div>
            <!--<div class="redundant">-->
                <!--<span>B7373-500</span>-->
                <!--<span>2架</span>-->
            <!--</div>-->
        </div>
        <div class="inf-associated">
            <div class="inf-title">关联航司</div>
            <div>
                <div v-for="(val,key) in glhs"class="inf-hsItrmBox">
                    <span class="inf-hsItrm">
                        <img class="isglhs" v-if="val.transactionCapacityCount > 0" src="./../../../static/img/mapImag/i4.png" alt="">
                    </span>
                    <span class="inf-hsItrmBg">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="(`#`+val.logo)"></use>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
        <div class="inf-associated" :class="{'gdyq':yq.length != 0}">
            <div class="inf-title">滚动舆情</div>
            <transition name="slide-fade">
                <div v-for="(val,key) in yq" class="gdyq-item" v-if="key == setgd">
                    <a :href="val.articleUrl" target="_blank"  v-text="val.articleTitle" class="text-line"></a>
                </div>
            </transition>
        </div>
        <div class="inf-associated" :class="{'gdyq':zc.length != 0}">
            <div class="inf-title">最新政策</div>
            <transition name="slide-fade">
                <div v-for="(val,key) in zc" class="gdyq-item" v-if="key == setzc">
                    <a href="" target="_blank" v-text="val.rewardpolicytext"class="text-line"></a>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import * as vx from 'vuex';
    import {companyIconData} from "./../../../public/js/companyIcon"
    import tabulationBoxTrigger from "./../../../public/js/tabulationBoxTrigger.js";

    export default {
        data(){
            return{
                code:"",
                ched:true,
                basicMes:{
                    airName:"",
                    airCode:"",
                    airType:"",
                    flyL:"",
                    isgj:false,
                    fxzdl:50,
                    xfdj:''
                },
                glhs:[],
                yq:[],
                setgd:0,
                setIn:"",
                zc:[],
                setzc:0,
                setInzc:"",
                dropData: {
                    mouseCoordinate: {
                        x: 0,
                        y: 0
                    },
                    switch: false
                },
                timelyBox: "",
                timelyBoxXY: {
                    // 最后设置的聊天框位置
                    x: 10,
                    y: 10
                },
                companyIconData:[]
            }
        },
        computed:{
            ...vx.mapGetters([
                'airList',
                'role'
            ])
        },
        methods:{
            change(){
                this.ched = !this.ched;
                tabulationBoxTrigger.$emit('routeNetwork',[this.ched,this.code]);
            },
            clek:function(){
                document.getElementById("inf-mes-box").style.display = "none";
            },
            setInl(){
                if(this.setIn != "")clearInterval(this.setIn);
                this.setgd = 0;
                this.setIn = setInterval(()=>{
                    if(this.setgd < this.yq.length-1){
                        let setgd = this.setgd +1;
                        this.setgd = 6666666;
                        setTimeout(()=>{
                            this.setgd = setgd;
                        },1000)
                    }else if(this.setgd == this.yq.length-1){
                        this.setgd = 0;
                    }
                },5000);
            },
            setInlzcf(){
                if(this.setInzc != "")clearInterval(this.setInzc);
                this.setzc = 0;
                this.setInzc = setInterval(()=>{
                    if(this.setzc < this.zc.length-1){
                        let setgds = this.setzc +1;
                        this.setzc = 6666666;
                        setTimeout(()=>{
                            this.setzc = setgds;
                        },1000)
                    }else if(this.setzc == this.zc.length-1){
                        this.setzc = 0;
                    }
                },5000);
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
            initBox: function () {
                this.timelyBox = this.$refs["timely-box"];
            }
        },
        mounted:function(){
            this.companyIconData = companyIconData;
            let _this = this;
            tabulationBoxTrigger.$on("tipBox",([d,type] = [...data]) => {
                if(type){
                    _this.ched = false
                }else{
                    _this.ched = true
                };
                _this.code = d;
                _this.yq = [];
                _this.zc = [];
                _this.glhs = [];
                _this.$ajax({
                    method: 'post',
                    url: '/loadIndexAirportInfoByCode',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params:{
                        itia:d
                    },
                })
                    .then((response) => {
                        if(response.data.opResult == '0'){
                            if(response.data.obj.opinions != null){
                                _this.yq = response.data.obj.opinions;
                                _this.setInl();
                            }else{
                                _this.yq = []
                            };
                            if(response.data.obj.rewardPolicyList != null){
                                _this.zc = response.data.obj.rewardPolicyList;
                                _this.setInlzcf();
                            }else{
                                _this.zc = []
                            }
                            if(response.data.obj.compenys != null){
                                _this.glhs = response.data.obj.compenys;
                            }else{
                                _this.glhs = []
                            };
                            let newglhs = _this.glhs.map((value)=>{
                                let oj = {};
                                _this.companyIconData.forEach((vl)=>{
                                    if(vl.companyIata === value.iata){
                                        oj.logo = vl.logo;
                                        oj.icon = vl.icon;
                                    }
                                });
                                return Object.assign(oj,value)
                            });
                            _this.glhs = newglhs;
                        }
                    })
                    .catch((error) => {
                            console.log(error);
                        }
                    );
                let mes = this.$airMes(this.airList,d).allData;
                let obj = {
                    airName:mes.airlnCdName,
                    airCode:`${mes.iata}/${mes.icao}`,
                    airType:mes.airpottype == '' ? "-" : mes.airpottype,
                    flyL:mes.airfieldLvl == '' ? '-' : mes.airfieldLvl,
                    isgj:mes.inter == '0' ? "否" : "是",
                    fxzdl:mes.releasePunctuality == undefined ? "-" : mes.releasePunctuality + "%",
                    xfdj:mes.firelvl == '' ? "-" : mes.firelvl
                };
                this.basicMes = obj;

            });
            document.addEventListener("mousemove", e => {
                if (this.dropData.switch) {
                    this.timelyBox.style.left = this.timelyBoxXY.x + (e.screenX - this.dropData.mouseCoordinate.x) + 'px';
                    this.timelyBox.style.top = this.timelyBoxXY.y + (e.screenY - this.dropData.mouseCoordinate.y) + 'px';
                }
            });
            this.initBox();
        }
    }
</script>
<style lang="scss" scoped>
    .iskg {
        display: inline-block;
        width: 35px;
        height: 16px;
        border-radius: 8px 8px 8px 8px;
        margin-right: 10px;
        cursor: pointer;
        position: relative;
        background-color: #605E7C;
        margin-left: 10px;
        margin-top: 10px;
    }
    .iskg0 {
        background-color:#57b57a;
    }
    .iskg0:before {
        content: 'ON';
        position: absolute;
        right: -1px;
        font-size: 12px;
        bottom: 1px;
        color: white;
        transform: scale(.7);
    }

    .iskg1:before {
        content: 'OFF';
        position: absolute;
        left: -2px;
        font-size: 12px;
        bottom: 1px;
        color: white;
        transform: scale(.7);
    }
    .turn-off {
        font-family: iconfont;
        font-size: 12px;
        color: white;
        position: relative;
        left: 3px;
        top: 1px;
        transition: left .15s linear;
    }
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
    .slide-fade-leave-to{
        transform: translateX(-10px);
        opacity: 0;
    }
    .inf-hsItrmBox{
        height: 30px;
        width: 30px;
        margin-right: 10px;
        position: relative;
        display: inline-block;
    }
    .inf-hsItrm{
        display: inline-block;
        text-align: center;
        line-height: 30px;
        height: 30px;
        width: 30px;
        position: relative;
        z-index: 5;
    }
    .inf-hsItrmBg{
        position: absolute;
        height: 30px;
        width: 30px;
        font-family: iconfont;
        top: 0;
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 5px 11px rgba(85, 85, 85, 0.4);
        >svg{
            height: 30px;
            width: 30px;
        }
    }
    .inf-box {
        width: 300px;
        max-height: 600px;
        position: absolute;
        top: 300px;
        left: 500px;
        display: none;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .gdyq{
        height: 45px;
        overflow: hidden;
    }
    .gdyq-item{
        height:25px;
        text-overflow: ellipsis;
    }
    .text-line{
        text-decoration:underline;
        line-height: 22px;
    }
    .inf-head {
        height: 40px;
        background-color: #e7e7e7;
        padding-left: 20px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        font-size: 14px;
        /*position: relative;*/
        > span:first-of-type {
            color: #605E7C;
            letter-spacing:.5px;
        }
        > span:nth-child(2){
            color: rgba(96,94,124,.7);
            padding-left: 12px;
            letter-spacing:.5px;
        }
        > span:nth-child(3){
            font-family: iconfont;
            font-size: 1.2rem;
            color: #3c78ff;
            border: none;
            padding: 0;
            cursor: pointer;
            display: inline-block;
            text-align: center;
            line-height: 15px;
            position: absolute;
            right: 10px;
            width: 15px;
            height: 15px;
            background-color: white;
            border-radius: 50%;
        }
    }
    .more{
        text-decoration:underline;
        color: #3c78ff;
        margin-right: 40px;
    }
    .inf-mes{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        padding: 30px 20px 0 ;
        >div{
            width: 84px;
            padding-bottom: 20px;
            > div:nth-child(1){
                font-size: 12px;
                color: rgba(96,94,124,.8);
                height: 17px;
            }
            > div:nth-child(2){
                font-size: 12px;
                color: #605e7c;
                height: 23px;
                display: flex;
                align-items: flex-end;
                font-weight: bold;
            }
        }
    }
    .inf-associated{
        padding: 20px 0 0 20px;
    }
    .inf-news{
        padding-left: 20px;
    }
    .line-network{
        border-bottom: 1px solid #f3f3f3;
        width: 290px;
        padding-right: 10px;
        padding-bottom: 10px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        line-height: 20px;
        >button:nth-child(odd){
            cursor: pointer;
            color: white;
            background-color:  #BDC8E0;
            border: 1px solid #ffffff;
        }
        >button:nth-child(even){
            cursor: pointer;
            color: white;
            background-color: #CCCCCC;
            border: 1px solid #ffffff;
        }
    }
    .iskgCkecked {
        left: 20px;
    }
    .isglhs{
        height: 30px;
        width: 30px;
        transform: translate(-5px, -13px);
        position: absolute;
    }
    .inf-title{
        color: rgba(96, 94, 124, 0.8);
    }
    .redundant{
        display: flex;
        justify-content: space-between;
        padding: 8px 50px 8px 0;
        font-size: 12px;
        color: #605e7c;
        font-weight: bold;
    }
</style>