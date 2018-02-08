<template>
    <div>
        <searchHeader @search = "searchData"></searchHeader>
        <div class="wrapper" id="city">
            <div class="content" v-if="showDetail">
                <div class="banner">
                    <div class="airport-img"><img :src="img" alt=""></div>
                    <div class="b-til">{{infoData.cityname || "-"}}</div>
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
                                <li><div class="name">城市名称</div><div class="text">{{infoData.cityname || "-"}}</div></li>
                                <li><div class="name">城市类型</div><div class="text">{{infoData.citytype || "-"}}</div></li>
                                <li><div class="name">大型企业数量</div><div class="text">{{infoData.largeenterprisenumber || "-"}}</div></li>
                                <li><div class="name">著名高校数量</div><div class="text">{{infoData.famousuniversities || "-"}}</div></li>
                                <li><div class="name">4A景点数量</div><div class="text">{{infoData.sitesnumber4a || "-"}}</div></li>
                                <li><div class="name">5A景点数量</div><div class="text">{{infoData.sitesnumber5a || "-"}}</div></li>
                            </ul>
                        </div>
                        <div class="info-box">
                            <ul>
                                <li><div class="name">所在省份</div>
                                <div class="text">{{infoData.provinces || "-"}}</div></li>
                                <li><div class="name">机场</div><div class="text">{{infoData.airport || "-"}}</div></li>
                                <li>
                                    <div class="name">企业枚举</div>
                                    <div class="overflow-item text"  @mouseover="enterpriseShow = true" @mouseout="enterpriseShow = false">{{infoData.enterpriseenumeration || "-"}}</div>
                                    <div class="list-wrapper" v-show='enterpriseShow'>{{infoData.enterpriseenumeration || "-"}}</div>
                                </li>
                                <li>
                                    <div class="name">高校枚举</div>
                                    <div class="overflow-item text" @mouseover="collegeShow = true" @mouseout="collegeShow = false">{{infoData.famousuniversitiesenumeration || "-"}}</div>
                                    <div class="list-wrapper" v-show='collegeShow'>{{infoData.famousuniversitiesenumeration || "-"}}</div>
                                </li>
                                <li>
                                    <div class="name">4A景点枚举</div>
                                    <div class="overflow-item text"  @mouseover="site4aShow = true" @mouseout="site4aShow = false">{{infoData.sitesenumeration4a || "-"}}</div>
                                    <div class="list-wrapper" v-show='site4aShow'>{{infoData.sitesenumeration4a || "-"}}</div>
                                </li>
                                <li>
                                    <div class="name">5A景点枚举</div>
                                    <div class="overflow-item text"  @mouseover="site5aShow = true" @mouseout="site5aShow = false">{{infoData.sitesenumeration5a || "-"}}</div>
                                    <div class="list-wrapper" v-show='site5aShow'>{{infoData.sitesenumeration5a || "-"}}</div>
                                </li>
                            </ul>
                        </div>
                        <div class="info-box">
                            <ul>
                                <li><div class="name">行政区等级</div><div class="text">{{infoData.citylvl || "-"}}</div></li>
                            </ul>
                        </div>
                    </div>
                    <div class="airport-policy" >
                        <div class="policy-til">
                            <div>补贴</div>
                            <div style="color:#3c78ff;" v-if='infoData.policys'>共{{infoData.policys.length}}条</div>
                        </div>
                        <div class="policy-content">
                            <div class="policy-content-item" v-for="item in infoData.policys">
                                <div class="time">{{item.policyyear|| "--"}}</div>
                                <div class="text">
                                    <div class="text-til">内容</div>
                                    <div class="text-tent">{{item.subsidypolicy|| "--"}}</div>
                                </div>
                            </div>
                            <div class="policy-content-item" v-if="!infoData.policys">
                               <div style="text-align:center;width:100%;color:red;">暂无内容</div>
                            </div>
                        </div>
                    </div>
                    <div class="i-echart">
                        <div>
                            <div class="t-til">旅游</div>
                            <div id="myChart1"></div>
                        </div>
                        <div>
                            <div class="t-til">经济</div>
                            <div id="myChart2"></div>
                        </div>
                         <div>
                            <div class="t-til">人口</div>
                            <div id="myChart3"></div>
                        </div>
                    </div>
                    <div class="traffic">
                        <div class="t-til">
                            <div>交通</div>
                        </div>
                        <div class="t-content">
                            <div class="highway">
                                <div class="c-til">
                                    <div>公路</div>
                                    <div v-if="infoData.highwayList" style="color:#3c78ff;">共{{infoData.highwayList.length}}条</div>
                                </div>
                                <div class="c-list-item" v-for="item in infoData.highwayList">
                                    <div class="type"><span>类型</span>{{item.roadType|| "--"}}</div>
                                    <div class="code"><span>代码</span>{{item.roadCode|| "--"}}</div>
                                    <div class="place">
                                        <span>途径点</span>
                                        <div class="over-flow" @mouseover="roadPointShow1 = true" @mouseout="roadPointShow1 = false">{{item.roadPoint|| "--"}}</div>
                                        <div class="list-wrapper" v-show='roadPointShow1'>{{item.roadPoint|| "--"}}</div>
                                    </div>
                                </div>
                                <div class="c-list-item" v-if="!infoData.highwayList">
                                    <div style="text-align:center;width:100%;color:red;">暂无数据</div>
                                </div>
                            </div>
                             <div class="railway">
                                <div class="c-til">
                                    <div>铁路</div>
                                    <div v-if="infoData.railwayList" style="color:#3c78ff;">共{{infoData.railwayList.length}}条</div>
                                </div>
                                 <div class="c-list-item" v-for="item in infoData.railwayList">
                                    <div class="type"><span>类型</span>{{item.roadType|| "--"}}</div>
                                    <div class="code"><span>代码</span>{{item.roadCode|| "--"}}</div>
                                    <div class="place">
                                        <span>途径点</span>
                                        <div class="over-flow" @mouseover="roadPointShow = true" @mouseout="roadPointShow = false">{{item.roadPoint|| "--"}}</div>
                                        <div class="list-wrapper" v-show='roadPointShow'>{{item.roadPoint|| "--"}}</div>
                                    </div>
                                </div>
                                <div class="c-list-item" v-if="!infoData.railwayList">
                                    <div style="text-align:center;width:100%;color:red;">暂无数据</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="news" id="news">
                        <div class="n-til">
                            <div class="n-name"><span class="iconfont">&#xe624;</span>新闻舆情</div>
                            <div><router-link :to="{name:'opinion',params:{key:infoData.cityname}}"><span class="more">查看更多></span></router-link></div>
                        </div>
                        <div class="news-box" v-for="item in infoData.publicopinions">
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
</div>
</template>

<script>
    import * as vx from 'vuex';
    import echarts from 'echarts';
     import { Loading } from 'element-ui';
    import myPic from '$src/static/img/Slice.png';
    import noimg from './../../../static/img/pubo/noimg.png';
    import searchHeader from './searchHeader.vue';
    export default {
        data() {
            return {
                infoData:{},
                qyCode:'',
                showDetail:true,
                enterpriseShow:false,
                collegeShow:false,
                site4aShow:false,
                site5aShow:false,
                roadPointShow:false,
                roadPointShow1:false,
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
                    return this.infoData.years.reverse()
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
            getData(){
                 this.loading = Loading.service({
                    text:"努力加载中..."
                });
                this.$ajax({
                method: 'post',
                url: '/getCityDetail',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                     cityName:this.qyCode
                    }
                })
                .then((response) => {
                    if(response.data.opResult == "0"){
                        this.showDetail = true;
                        this.infoData = response.data.citys[0];
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
                    legend: {
                        data:['旅游收入','旅游人次'],
                        itemGap :340,
                        left:5,
                        top:5
                    },
                    backgroundColor:'#fbfbfb',
                    xAxis: {
                        data: [2015,2016,2017],
                        axisLine:{
                            lineStyle :{
                                color: '#605e7c'
                            }
                        }
                    },
                    yAxis: [{
                        name:'单位：亿元',
                        //data: ["0","1","2","3","4","5","6"],
                        type : 'value',
                        axisLine:{
                            lineStyle :{
                                color: '#605e7c'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#aaa'],
                                type:'dashed'
                            }
                        }
                    },
                    {
                        name:'单位：万人',
                        type : 'value',
                        //inverse: true,
                        //nameLocation: 'start',
                        axisLine:{
                            lineStyle :{
                                color: '#605e7c'
                            }
                        }
                    }],
                    series: [{
                        name: '旅游收入',
                        type: 'line',
                        data: [null,this.infoData.culturaleducationyYears[0].tourismincome,null],
                        color:['#605e7c']
                    },
                    {
                        name: '旅游人次',
                        type: 'bar',
                        data: [0,this.infoData.culturaleducationyYears[0].passengersnumberyear,0],
                        barWidth:'30%',
                         color:['red']
                    }]
                });
                 myChart2.setOption({
                    tooltip: {
                    },
                    legend: {
                        data:['城市GDP'],
                        left:5,
                        top:5
                    },
                    backgroundColor:'#fbfbfb',
                    xAxis: {
                        data: [2015,2016,2017],
                        axisLine:{
                            lineStyle :{
                                color: '#605e7c'
                            }
                        }
                    },
                    yAxis: {
                        name:'单位：亿元',
                        //data: ["0","1","2","3","4","5","6"],
                        type : 'value',
                        axisLine:{
                            lineStyle :{
                                color: '#605e7c'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#aaa'],
                                type:'dashed'
                            }
                        }
                    },
                    series: {
                        name: '城市GDP',
                        type: 'line',
                        data: [null,parseFloat(this.infoData.economicYears[0].citygdp),null],
                        color:['#605e7c']
                    }
                });
                 myChart3.setOption({
                    tooltip: {
                    },
                    legend: {
                        data:['常驻人口'],
                        right:10,
                        top:25
                    },
                    backgroundColor:'#fbfbfb',
                    xAxis: {
                        data: [2015,2016,2017],
                        axisLine:{
                            lineStyle :{
                                color: '#605e7c'
                            }
                        }
                    },
                    yAxis: {
                        name:'单位：万人',
                        //data: ["0","1","2","3","4","5","6"],
                        type : 'value',
                        axisLine:{
                            lineStyle :{
                                color: '#605e7c'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#aaa'],
                                type:'dashed'
                            }
                        }
                    },
                    series: {
                        name: '常驻人口',
                        type: 'bar',
                        barWidth:'30%',
                        data: [null,parseFloat(this.infoData.populations[0].residentpgenumber),null],
                        color:['#605e7c']
                    }
                });
            },
            turnData(num,n){
                let newNum = [];
                num.forEach(item =>{
                    newNum.push(item*100000 /(Math.pow(10,n+5)));
                })
                return newNum.reverse();
            },
             getBaseInfo(){
                let city = document.getElementById('city');
                city.scrollTop = 0;
                this.isInfo = true;
            },
            getNews(){
                let city = document.getElementById('city');

                 //获取新闻定位点
                let news = document.getElementById('news');
                city.scrollTop = news.offsetTop;
                this.isInfo = false;
            }
        },
        mounted() {
            this.qyCode = this.searchInfo.qyCode;
            if(this.qyCode == ''){
                this.showDetail=false;
            }
        },
        components:{
            searchHeader
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
    /*多行省略号，兼容多个浏览器*/
    @mixin line-clamp($lines, $line-height: 23px) {
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: $lines; // number of lines to show
        overflow: hidden;
        line-height: $line-height;
        max-height: $line-height * $lines;
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
          /*   &:hover{
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
            padding:58px 0 20px 0;
        }
    }
    .info-box{
        flex:1;
        li{
            display:flex;
            position:relative;
            margin-top:1px;
            >.name{
                height:35px;
                line-height:35px;
                width:140px;
                text-align:right;
            }
            >.text{
                height:35px;
                line-height:35px;
                text-align:left;
                padding-left:18px;
                font-size:1.4rem;
            }
        }
         .overflow-item{
            width:250px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }

    }
     .list-wrapper {
        position: absolute;
        top: 30px;
        left: 140px;
        display: flex;
        padding: 10px;
        width: 260px;
        height:100px;
        background: white;
        border-radius: 4px;
        //box-shadow: 0 2px 11px rgba(96,94,124,0.37);
        z-index: 3;
        border:1px solid #E3E3E3;
        font-size:1.4rem;
    }
    .i-echart{
        margin:0 20px 20px 20px;
        display:flex;
        flex-wrap: wrap;
        >div{
            height: 323px;
            width:525px;
            border:1px solid #ccc;
            box-sizing:border-box;
        }
        >div:first-of-type{
             margin-right:10px;
        }
         >div:last-of-type{
             width:100%;
             margin-top:20px;
        }
        .t-til{
            height:50px;
            line-height:50px;
            font-size:1.5rem;
            padding-left:26px;
            border-bottom:1px solid #ccc;
        }
    }
    #myChart1,#myChart2{
        height: 270px;
        width:523px;
    }
    #myChart3{
        height: 270px;
        width:1058px;
    }
    .traffic{
        margin:0 20px 10px 20px;
        border:1px solid #ccc;
        .t-til{
            height:50px;
            line-height:50px;
            font-size:1.5rem;
            display:flex;
            justify-content: space-between;
            padding-left:26px;
            border-bottom:1px solid #ccc;
        }
        .t-content{
            margin-top:20px;
            font-size:1.4rem;
             display:flex;
             .highway{
                margin-right:16px;
                 .c-list-item{
                    border-right:1px solid #ccc;
                }
             }
             .railway{
                 .c-list-item{
                    border-left:1px solid #ccc;
                }
             }
             >div{
                flex:1;
                .c-til{
                    padding:0 10px 0 26px;
                    display:flex;
                    height:37px;
                    line-height:37px;
                    justify-content: space-between;
                }
                .c-list-item{
                    display:flex;
                    height:67px;
                    line-height:67px;
                    padding:0 26px;
                    border-top:1px solid #ccc;
                    .type{
                        width:120px;
                    }
                    .code{
                        width:120px;
                    }
                    .place{
                        width:220px;
                        display:flex;
                        position: relative;
                    }
                    span{
                        padding-right:12px;
                        font-size:1.2rem;
                    }
                    .over-flow{
                        display:inline-block;
                        width:170px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    .list-wrapper{
                        top:45px;
                        left:0;
                        width:220px;
                        height:80px;
                        line-height:26px;
                    }
                }
             }
        }
    }
    .airport-policy{
        margin:20px;
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
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
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
           @include line-clamp(2);

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
