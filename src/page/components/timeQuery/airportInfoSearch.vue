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
                    <div id="myChart"></div>
                    <div id="myChart"></div>
                    <div id="myChart"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    export default {
        data() {
            return {
                infoData:{}
            }
        },
        props:['qyCode'],
        watch: {

        },
       computed:{

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
                     itia:"CTU"
                    }
                })
                .then((response) => {
                    if(response.data.opResult == "0"){
                        this.infoData = response.data.obj;

                    }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
            },
            drawLine(){
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                myChart.setOption({
                    title: { text: '旅客吞吐量' },
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            }
        },
        mounted() {
            this.getData();
            this.drawLine();
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
        height:1000px;
        margin-left:250px;
        margin-top:160px;
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
            margin: 0 17px;
            border-bottom:1px solid #ccc;
            font-size:1.6rem;
            display:flex;
            .iconfont{
                font-size:3rem;
            }
        }
        .i-content{
            display:flex;
            padding-top:58px;
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
    }
    #myChart{
        width: 200px;
        height: 200px;
    }
</style>
