<template>
    <div>
        <searchHeader @search = "searchData"></searchHeader>
        <div class="wrapper scroll" id="airport">
            <div class="content" v-if="showDetail">
                <div class="banner">
                    <div class="airport-img"><img :src="img" alt=""></div>
                    <div class="b-til">{{infoData.airlnCdName || "-"}}</div>
                    <div class="sidebar">
                        <div :class="{seleted:isInfo}" @click="getBaseInfo"><span class="iconfont">&#xe603;</span>基本信息</div>
                        <div :class="{seleted:!isInfo}" @click="getNews"><span class="iconfont" >&#xe624;</span>新闻舆情</div>
                    </div>
                </div>
                <div class="info">
                    <div class="i-til"><span class="iconfont">&#xe603;</span>基本信息</div>
                    <div class="i-content">
                        <div class="info-box">
                            <ul>
                                <li><div>机场名字</div><div>{{infoData.airlnCdName || "-"}}</div></li>
                                <li><div>所在城市</div><div>{{infoData.city || "-"}}</div></li>
                                <li><div>所属机场集团</div><div class="shipgroup">{{infoData.membershipgroup || "-"}}</div></li>
                                <li><div>机场类型</div><div>{{infoData.airpottype || "-"}}</div></li>
                                <li><div>是否特殊机场</div><div>{{infoData.specialairport || "-"}}</div></li>
                                <li><div>飞行区等级</div><div>{{infoData.airfieldlvl || "-"}}</div></li>
                                <li><div>灯光条件</div><div>{{infoData.lightingconditions || "-"}}</div></li>
                                <li><div>是否国际</div><div>{{infoData.inter || "-"}}</div></li>
                                <li><div>国内在飞航点</div><div>{{infoData.domestic || "-"}}</div></li>
                                <li><div>机场专线</div><div>{{infoData.airportshuttlemetro || "-"}}</div></li>
                            </ul>
                        </div>
                        <div class="info-box">
                            <ul>
                                <li><div>三字码</div><div>{{infoData.iata || "-"}}</div></li>
                                <li><div>所在区域</div><div>{{infoData.area || "-"}}</div></li>
                                <li><div>通航时间</div><div>{{infoData.departuretime || "-"}}</div></li>
                                <li><div>标高</div><div>{{infoData.airEle || "-"}}</div></li>
                                <li>
                                    <div>特殊机场构成原因</div>
                                    <div  @mouseover="resonShow = true" @mouseout="resonShow = false">{{infoData.specialairportwhy || "-"}}</div>
                                    <div class="list-wrapper" v-show='resonShow' v-if="infoData.specialairportwhy">{{infoData.specialairportwhy || "-"}}</div>
                                </li>
                                <li><div>消防等级</div><div>{{infoData.firelvl || "-"}}</div></li>
                                <li>
                                    <div>可起降机型</div>
                                    <div class="fl-type" @mouseover="flytypeShow = true" @mouseout="flytypeShow = false">{{infoData.modelcanhandle || "-"}}</div>
                                    <div class="list-wrapper" v-show='flytypeShow' style="width:400px;height:300px;" @mouseover="flytypeShow = true" @mouseout="flytypeShow = false">{{infoData.modelcanhandle || "-"}}</div>
                                </li>
                                <li><div>放行准点率</div><div>{{infoData.releasepunctuality || "-"}}</div></li>
                                <li><div>国内在飞航班数量</div><div>{{infoData.intheflight || "-"}}</div></li>
                                <li><div>机场巴士</div><div>{{infoData.airportbus || "-"}}</div></li>
                            </ul>
                        </div>
                        <div class="info-box">
                            <ul>
                                <li><div>四字码</div><div>{{infoData.icao || "-"}}</div></li>
                                <li><div>所在战区</div><div>{{infoData.warzone || "-"}}</div></li>
                                <li><div>高原机场</div><div>{{infoData.airpotcls || "-"}}</div></li>
                                <li><div>机型数量</div><div>{{infoData.planepositionnumber || "-"}}</div></li>
                                <li><div>国际在飞航点</div><div>{{infoData.international || "-"}}</div></li>
                                <li><div>距离市区</div><div>{{infoData.distancefromdowntown || "-"}}</div></li>
                            </ul>
                        </div>
                        <div class="airport-info" @click="airportInfo"><a>机场情报></a></div>
                    </div>
                    <div class="i-echart">
                        <div v-if="infoData.passengerThroughputs">
                            <h5>旅客吞吐量</h5>
                           <div id="myChart1"></div>
                           <div class="no-data" v-if="infoData.passengerThroughputs.length == 0">暂无数据</div>
                        </div>
                        <div v-if="infoData.passengerThroughputs">
                            <h5>货物吞吐量</h5>
                           <div id="myChart2"></div>
                           <div class="no-data" v-if="infoData.goodsThroughputs.length == 0 ">暂无数据</div>
                        </div>
                        <div v-if="infoData.passengerThroughputs">
                            <h5>起降架次</h5>
                           <div id="myChart3"></div>
                           <div class="no-data" v-if="infoData.takeOffAndLandingFlights.length == 0">暂无数据</div>
                        </div>
                    </div>
                    <div class="airport-track">
                        <div class="track-til">
                            <div>机场跑道数据</div>
                            <div v-if="infoData.runwayList" style="color:#3c78ff;">共{{infoData.runwayList.length}}条</div>
                        </div>
                        <div class="track-content" v-for="(item,index) in infoData.runwayList">
                            <div>跑道{{index+1}}</div>
                            <div><span>编号</span>{{item.runwaynumber|| "-"}}</div>
                            <div><span>等级</span>{{item.runwaylvl || "-"}}</div>
                            <div><span>长度</span>{{item.runwaywidth|| "-"}}</div>
                            <div><span>宽度</span>{{item.runwaylength|| "-"}}</div>
                        </div>
                        <div class="track-content" v-if="!infoData.runwayList">
                            <div style="text-align:center;width:100%;color:red;">暂无内容</div>
                        </div>
                    </div>
                    <div class="airport-policy" >
                        <div class="policy-til">
                            <div>相关政策</div>
                            <div style="color:#3c78ff;" v-if='infoData.rewardPolicyList'>共{{infoData.rewardPolicyList.length}}条</div>
                        </div>
                        <div class="policy-content">
                            <div class="policy-content-item" v-for="item in infoData.rewardPolicyList">
                                <div class="time">{{item.rewardpolicydate|| "--"}}</div>
                                <div class="text">
                                    <div class="text-til">内容</div>
                                    <div class="text-tent">{{item.rewardpolicytext|| "--"}}</div>
                                </div>
                            </div>
                            <div class="policy-content-item" v-if="!infoData.rewardPolicyList">
                               <div style="text-align:center;width:100%;color:red;">暂无内容</div>
                            </div>
                        </div>
                    </div>
                    <div class="news" id="news">
                        <div class="n-til">
                            <div class="n-name"><span class="iconfont">&#xe624;</span>新闻舆情</div>
                            <div><router-link :to="{name:'opinion',params:{key:infoData.airlnCdName}}"><span class="more">查看更多></span></router-link></div>
                        </div>
                        <div class="news-box" v-for="item in infoData.opinions">
                            <div class="box-pic">
                                <img :src="item.articleImage||noimg" alt="">
                            </div>
                            <div class="box-content">
                                <div class="box-til">
                                    <div class="name"><a @click="openWindow(item.articleUrl)">{{item.articleTitle}}</a></div>
                                    <div class="type">
                                        <div>{{item.articleType}}</div>
                                    </div>
                                </div>
                                <div class="box-text">{{item.articleContent}}</div>
                                <div class="box-foot">
                                    <div class="box-net">{{item.articleFrom}}</div>
                                    <div class="box-time">{{item.articleTime}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content" style="color:red;text-align:center;line-height:67px;" v-else>暂无内容,请重新搜索</div>
        </div>
            <airportInfo v-if="detailInfoShow" @closeDetail="closeDetail" :myData="infoData"></airportInfo>
    </div>
</template>

<script>
    import * as vx from 'vuex';
    import echarts from 'echarts';
    import { Loading } from 'element-ui';
    import myPic from '$src/static/img/Slice.png';
    import noimg from './../../../static/img/pubo/noimg.png';
    import searchHeader from './searchHeader.vue'
    import airportInfo from './airportInfo.vue'
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';
    export default {
        data() {
            return {
                infoData:{},
                qyCode:'',
                detailInfoShow:false,
                showDetail:true,
                resonShow:false,
                flytypeShow:false,
                isInfo:true

            }
        },
        watch: {
            'qyCode':function(){
                this.getData();
            }
        },
       computed:{
            ...vx.mapGetters([
                'searchInfo'
            ]),
            img:function(){
                return myPic;
            },
             noimg:function(){
                return noimg;
            },
            years:function(){
                if(this.infoData){
                    return this.infoData.years.reverse();
                }
            }
        },
        methods: {
            searchData(qyCode){
                this.qyCode = qyCode;
            },
            openWindow(src) {
                window.open(src);
            },
            airportInfo(){
                this.detailInfoShow = true;
            },
            getData(){
                this.loading = Loading.service({
                    text:"努力加载中..."
                });
                this.$ajax({
                method: 'post',
                url: '/loadAirportByCode',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                     itia:this.qyCode
                    }
                })
                .then((response) => {
                    if(response.data.opResult == "0"){
                        this.showDetail = true;
                        this.infoData = response.data.obj;
                        this.drawLine(this.infoData);
                        this.loading.close();
                    }else{
                        this.loading.close();
                        this.showDetail = false;
                    }
                })
                .catch((error) => {
                    this.loading.close();
                    console.log(error);
                    }
                );
            },
            drawLine(data){
                let myChart1 = this.$echarts.init(document.getElementById('myChart1')),
                    myChart2 = this.$echarts.init(document.getElementById('myChart2')),
                    myChart3 = this.$echarts.init(document.getElementById('myChart3'));
                myChart1.setOption({
                    tooltip: {
                    },
                    xAxis: {
                        data: this.years
                    },
                    yAxis: {
                        name:'单位:1000万',
                        //data: ["0","1","2","3","4","5","6"],
                        type : 'value',
                        splitLine: {
                            lineStyle: {
                                color: ['#aaa'],
                                type:'dashed'
                            }
                        }
                    },
                    series: [{
                        name: '旅客吞吐量',
                        type: 'line',
                        data:this.turnData(data.passengerThroughputs,7)
                    }]
                });
                 myChart2.setOption({
                    tooltip: {
                    },
                    xAxis: {
                        data: this.years
                    },
                    yAxis: {
                        name:'单位:10万',
                        //data:["0","1","2","3","4","5","6"]
                        type : 'value',
                        splitLine: {
                            lineStyle: {
                                color: ['#aaa'],
                                type:'dashed'
                            }
                        }
                    },
                    series: [{
                        name: '货物吞吐量',
                        type: 'line',
                        data:this.turnData(data.goodsThroughputs,5)
                    }]
                });
                  myChart3.setOption({
                    tooltip: {
                    },
                    xAxis: {
                        data: this.years
                    },
                    yAxis: {
                        name:'单位:10万',
                        //data: ["0","1","2","3","4","5","6"]
                        type : 'value',
                        splitLine: {
                            lineStyle: {
                                color: ['#aaa'],
                                type:'dashed'
                            }
                        }
                    },
                    series: [{
                        name: '起降架次',
                        type: 'line',
                        data:this.turnData(data.takeOffAndLandingFlights,5)
                    }]
                });
            },
            turnData(num,n){
                let newNum = [];
                num.forEach(item =>{
                    newNum.push(item*100000 /(Math.pow(10,n+5)));
                })
                return newNum.reverse();
            },
            closeDetail(){
                this.detailInfoShow = false;
            },
            getBaseInfo(){
                let airport = document.getElementById('airport');
                airport.scrollTop = 0;
                this.isInfo = true;
            },
            getNews(){
                let airport = document.getElementById('airport');

                 //获取新闻定位点
                let news = document.getElementById('news');
                airport.scrollTop = news.offsetTop;
                this.isInfo = false;
            }
        },
        mounted() {
            this.qyCode = this.searchInfo.qyCode ;
            if(this.qyCode == ''){
                this.showDetail=false;
            }else{
                this.getData();
            };

        },
        components:{
            searchHeader,
            airportInfo
        }
    }
</script>

<style lang="scss" scoped>
    input{
        border:0;
        outline:0;
    }
    ul,li{
        list-style:none;
        padding:0;
        margin:0;
    }
    .wrapper{
        position: absolute;
        width: 100%;
        height:100%;
        top: 0;
        left: 0;
        background-color: #f5f5f5;
        z-index: 12;
        color:#605e7c;
        overflow-y: scroll;
    }
    .content{
        width:1100px;
        margin:160px 0 10px 250px;
        padding-bottom:50px;
        background-color: #fff;
    }
    .banner{
        width:100%;
        height:100px;
        position:relative;
        .airport-img{
            width:100%;
            height:100%;
            img{
                width:100%;
                height:100%;
            }
        }
        .b-til{
            position:absolute;
            left:0;
            top:0;
            width:210px;
            height:100px;
            color:#fff;
            text-align:center;
            line-height:100px;
            font-size:2.0rem;
            background-color:rgba(0,0,0,.3);
        }
    }
    .sidebar{
        position:fixed;
        top:180px;
        left:1350px;
        z-index:999;
        >div{
            height:42px;
            line-height:42px;
            font-size:1.5rem;
            width:100px;
            display:flex;
            cursor:pointer;
            border-top-right-radius:5px;
            border-bottom-right-radius:5px;
            span{
                font-size:2rem;
                margin:0 6px 0 6px;
            }
           /*  &:hover{
               color:#fff;
               background-color:#3c78ff;
           } */
        }
         .seleted{
              color:#fff;
              background-color:#3c78ff;
            }
    }
    .info{
         .i-til{
            height:86px;
            line-height:86px;
            margin: 0 20px;
            border-bottom:1px solid #ccc;
            font-size:1.6rem;
            display:flex;
            .iconfont{
                font-size:3rem;
            }
        }
        .i-content{
            display:flex;
            position:relative;
            padding:58px 0;
            .airport-info{
                position:absolute;
                bottom:50px;
                right:50px;
                color:#3c78ff;
                cursor:pointer;
                font-size:1.4rem;
            }
             a{
                text-decoration: underline;
                color: #3c78ff;
                &:hover {
                    color: #51a2ff;
                }
                &:active {
                    color: #3c78ff;
                }
            }
        }
    }
    .info-box{
        flex:1;
        li{
            display:flex;
            position: relative;
            >div{
                height:35px;
                line-height:35px;
            }
            >div:first-of-type{
                width:140px;
                text-align:right;
            }
            >div:nth-of-type(2){
                text-align:left;
                padding-left:18px;
                font-size:1.4rem;
            }
            .shipgroup,.fl-type{
                width:208px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .list-wrapper {
                position: absolute;
                top: 30px;
                left: 140px;
                display: flex;
                padding: 10px;
                width:260px;
                height:160px;
                line-height:20px;
                font-size:1.2rem;
                background: white;
                border-radius: 4px;
                z-index: 3;
                border:1px solid #E3E3E3;
            }
        }
    }
    .i-echart{
        margin:0 20px 20px 20px;
        height:370px;
        display:flex;
        >div{
            height: 370px;
            width:345px;
            border:1px solid #ccc;
            box-sizing:border-box;
            margin-right:12px;
            position:relative;
            .no-data{
                width:300px;
                height:100px;
                line-height:100px;
                text-align:center;
                position:absolute;
                font-size:3rem;
                color:#ccc;
                left:0;
                right:0;
                top:0;
                bottom:0;
                margin:auto;
            }
        }
         >div:last-of-type{
             margin-right:0;
        }
        h5{
            height:50px;
            line-height:50px;
            font-size:1.5rem;
            padding-left:26px;
            border-bottom:1px solid #ccc;
        }
    }
    #myChart1,#myChart2,#myChart3{
        width:345px;
        height: 320px;
    }
    .airport-track{
        margin:0 20px;
        border:1px solid #ccc;
        .track-til{
            height:50px;
            line-height:50px;
            font-size:1.5rem;
            display:flex;
            justify-content: space-between;
            padding:0 20px 0 26px;
            border-bottom:1px solid #ccc;
        }
        .track-content{
            margin-top:20px;
            height:60px;
            line-height:60px;
            font-size:1.4rem;
             border-top:1px solid #ccc;
             display:flex;
             >div{
                flex:1;
                padding-left:20px;
                span{
                    margin-right:10px;
                }
             }
        }
    }
    .airport-policy{
        margin:20px 20px 0 20px;
        border:1px solid #ccc;
        .policy-til{
            height:50px;
            line-height:50px;
            font-size:1.5rem;
            display:flex;
            justify-content: space-between;
            padding:0 20px 0 26px;
            border-bottom:1px solid #ccc;
        }
       .policy-content{
           margin-top:20px;
           border-top:1px solid #ccc;
           >div:last-of-type{
                border-bottom:0;
           }
       }
        .policy-content-item{
            height:60px;
            line-height:60px;
            font-size:1.4rem;
            border-bottom:1px solid #ccc;
            display:flex;
             .time{
                width:230px;
                padding-left:20px;
             }
             .text{
                display:flex;
                padding:0 30px 0 15px;
             }
             .text-til{
                width:50px;
             }
             .text-tent{
                width:700px;
                overflow:hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
             }
        }
    }
    .news{
        .n-til{
            height:86px;
            line-height:86px;
            margin: 0 20px 16px 20px;
            padding: 0 10px;
            border-bottom:1px solid #ccc;
            font-size:1.6rem;
            display:flex;
            justify-content: space-between;
            .iconfont{
                font-size:2rem;
                margin-right:6px;
            }
            .n-name{
                 display:flex;
            }
            .more{
                cursor:pointer;
                font-size:1.4rem;
                color: #3c78ff;
            }
        }
    }
    .news-box{
        margin:0 20px 10px 20px;
        height:110px;
        border:1px solid #ccc;
        padding:10px 8px 10px 12px;
        display:flex;
        .box-pic{
            width:170px;
            height:110px;
            img{
                width:100%;
                height:100%;
            }
        }
        .box-content{
            width:850px;
            margin-left:20px;
        }
        .box-til{
             height:42px;
             font-size:1.4rem;
             font-weight:bold;
             display:flex;
             justify-content: space-between;
            .name{
                height:16px;
                line-height:16px;
                margin:11px 0 15px 0;
                cursor:pointer;
                a{
                    text-decoration: underline;
                    &:hover {
                        color: #51a2ff;
                    }
                    &:active {
                        color: #3c78ff;
                    }
                }
            }
        }
        .type{
            display:flex;
            div{
                height:24px;
                line-height:24px;
                width:79px;
                margin-left:5px;
                color:#fff;
                text-align:center;
                border-radius:5px;
            }
            div:nth-of-type(odd){
                background-color:#97c889;
            }
            div:nth-of-type(even){
                background-color:#c8a289;
            }
        }
        .box-text{
            text-indent:20px;
            font-size:1.2rem;
            padding-right:20px;
            height:46px;
            line-height:23px;
            overflow:hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .box-foot{
            margin-top:10px;
            display:flex;
            div{
                height:12px;
                line-height:12px;
                margin-right:10px;
            }
        }
    }
</style>
