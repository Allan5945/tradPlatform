<template>
    <div >
        <div class="content">
            <div class="banner">
                <div class="b-til">机场</div>
                <div class="sidebar">
                    <div><span class="iconfont">&#xe603;</span>基本信息</div>
                     <div><span class="iconfont">&#xe624;</span>新闻舆情</div>
                </div>
            </div>
            <div class="info">
                <div class="i-til"><span class="iconfont">&#xe603;</span>基本信息</div>
                <div class="i-content">
                    <div class="info-box">
                        <ul>
                            <li><div>机场名字</div><div>{{infoData.airlnCd || "-"}}</div></li>
                            <li><div>所在城市</div><div>{{infoData.city || "-"}}</div></li>
                            <li><div>所属机场集团</div><div>{{infoData.membershipgroup || "-"}}</div></li>
                            <li><div>机场类型</div><div>{{infoData.airpotcls || "-"}}</div></li>
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
                            <li><div>特殊机场构成原因</div><div>{{infoData.specialairportwhy || "-"}}</div></li>
                            <li><div>消防等级</div><div>{{infoData.firelvl || "-"}}</div></li>
                            <li><div>可起降机型</div><div class="fl-type">{{infoData.modelcanhandle || "-"}}</div></li>
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
                </div>
                <div class="i-echart">
                   <div id="myChart1"></div>
                    <div id="myChart2"></div>
                    <div id="myChart3"></div>
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
                </div>
                <div class="airport-policy" >
                    <div class="policy-til">
                        <div>相关政策</div>
                        <div style="color:#3c78ff;">共2条</div>
                    </div>
                    <div class="policy-content">
                        <div class="time">2014.12.12</div>
                        <div class="text">
                            <div class="text-til">内容</div>
                            <div class="text-tent">我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
                            我是内容我是内容我是内容我是内容我是内容我是内容</div>
                        </div>
                    </div>
                </div>
                <div class="news">
                    <div class="n-til">
                        <div class="n-name"><span class="iconfont">&#xe624;</span>新闻舆情</div>
                        <div class="more">查看更多></div>
                    </div>
                    <div class="news-box">
                        <div class="box-pic">
                            <img :src="img" alt="">
                        </div>
                        <div class="box-content">
                            <div class="box-til">
                                <div class="name"><a href="javascript:;">成都-北京航线舆情</a></div>
                                <div class="type">
                                    <div>舆情类型</div>
                                    <div>舆情类型</div>
                                </div>
                            </div>
                            <div class="box-text">我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</div>
                            <div class="box-foot">
                                <div class="box-net">民航资源网</div>
                                <div class="box-time">2012.12.12</div>
                            </div>
                        </div>
                    </div>
                    <div class="news-box">
                        <div class="box-pic">
                            <img :src="img" alt="">
                        </div>
                        <div class="box-content">
                            <div class="box-til">
                                <div class="name"><a href="javascript:;">成都-北京航线舆情</a></div>
                                <div class="type">
                                    <div>舆情类型</div>
                                    <div>舆情类型</div>
                                </div>
                            </div>
                            <div class="box-text">我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容内容我是内容我是内容我是内容我是内容我是内容我是内容</div>
                            <div class="box-foot">
                                <div class="box-net">民航资源网</div>
                                <div class="box-time">2012.12.12</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import myPic from '$src/static/img/145.jpg';
    export default {
        data() {
            return {
                infoData:{}
            }
        },
        props:['qyCode'],
        watch: {
            'qyCode':function(){
                this.getData();
            }
        },
       computed:{
            img:function(){
                return myPic;
            },
            years:function(){
                if(this.infoData){
                    return this.infoData.years.reverse()
                }
            }
        },
        methods: {
            getData(){
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
                        this.infoData = response.data.obj;
                        this.drawLine(this.infoData);
                    }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
            },
            drawLine(data){
                console.log(this.turnData(data.passengerThroughputs))
                let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
                let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
                let myChart3 = this.$echarts.init(document.getElementById('myChart3'))
                myChart1.setOption({
                    title: { text: '旅客吞吐量' },
                    tooltip: {},
                    xAxis: {
                        data: this.years
                    },
                    yAxis: {
                        name:'单位：1000万',
                        data: ["0","1","2","3","4","5","6"]
                    },
                    series: [{
                        name: '旅客吞吐量',
                        type: 'line',
                        data:this.turnData(data.passengerThroughputs,7)
                    }]
                });
                 myChart2.setOption({
                    title: { text: '货物吞吐量' },
                    tooltip: {},
                    xAxis: {
                        data: this.years
                    },
                    yAxis: {
                        name:'单位：10万',
                        data:["0","1","2","3","4","5","6"]
                    },
                    series: [{
                        name: '货物吞吐量',
                        type: 'line',
                        data:this.turnData(data.goodsThroughputs,5)
                    }]
                });
                  myChart3.setOption({
                    title: { text: '起降架次' },
                    tooltip: {},
                    xAxis: {
                        data: this.years
                    },
                    yAxis: {
                        name:'单位：10万',
                        data: ["0","1","2","3","4","5","6"]
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
            }
        },
        mounted() {
            this.getData();
        },
        components:{

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
        background-color:pink;
        .b-til{
            width:210px;
            height:100px;
            text-align:center;
            line-height:100px;
            font-size:2.5rem;
        }
    }
    .sidebar{
        position:absolute;
        top:12px;
        right:-100px;
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
            &:hover{
                color:#fff;
                background-color:#3c78ff;
            }
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
            padding:58px 0;
        }
    }
    .info-box{
        flex:1;
        li{
            display:flex;
            >div{
                height:35px;
                line-height:35px;
            }
            >div:first-of-type{
                width:140px;
                text-align:right;
            }
            >div:last-of-type{
                text-align:left;
                padding-left:18px;
                font-size:1.4rem;
            }
        }
        .fl-type{
            width:250px;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }

    }
    .i-echart{

        height:370px;
        margin:0 20px 20px 10px;
        display:flex;
    }
    #myChart1,#myChart2,#myChart3{
        flex:1;
        height: 370px;
        margin-left:10px;
        border:1px solid #ccc;
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
            height:60px;
            line-height:60px;
            font-size:1.4rem;
            border-top:1px solid #ccc;
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
            background-color:pink;
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
                border-bottom:1px solid #000;
                margin:11px 0 15px 0;
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
