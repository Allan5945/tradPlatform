<template>
    <div>
        <searchHeader @search = "searchData"></searchHeader>
        <div  class="wrapper scroll" id="airline">
            <div class="content" v-if="showDetail">
                <div class="banner">
                    <div class="airport-img">
                        <!--<img :src="img" alt="">-->
                    </div>
                    <div class="b-til svg-wrapper" style="margin-left: 20px;" v-if="iconShow">
                        <div class="svg-container">
                            <svg class="icon svg-logo" aria-hidden="true">
                                <use :xlink:href="icon"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="b-til svg-wrapper" style="background: rgba(0, 0, 0, 0.3);" v-else>
                        <span>{{infoData.airlnCd || "-"}}</span>
                    </div>
                    <div class="sidebar">
                        <div :class="{seleted:step == '1'}" @click="getBaseInfo"><span class="iconfont">&#xe603;</span>基本信息</div>
                         <div :class="{seleted:step == '2'}" @click="getNews"><span class="iconfont" >&#xe624;</span>新闻舆情</div>
                    </div>
                </div>
                <div class="info" v-scrollWatch="{name:'1',offset:250,callback:spyDomChange}">
                    <div class="i-til"><span class="iconfont">&#xe603;</span>基本信息</div>
                    <div class="i-content">
                        <div class="info-box">
                            <ul>
                                <li><div>航司名</div><div>{{infoData.airlnCd || "-"}}</div></li>
                                <li><div>成立时间</div><div>{{infoData.establishtime || "-"}}</div></li>
                                <li>
                                    <div>基地分布</div>
                                    <div class="basedistribution"  @mouseover="basedistributionShow = true" @mouseout="basedistributionShow = false">{{infoData.basedistribution || "-"}}</div>
                                    <div class="list-wrapper" v-show='basedistributionShow' @mouseover="basedistributionShow = true" @mouseout="basedistributionShow = false">{{infoData.basedistribution || "-"}}</div>
                                </li>
                                <li><div>航空联盟</div><div>{{infoData.airlinealliance || "-"}}</div></li>
                            </ul>
                        </div>
                        <div class="info-box">
                            <ul>
                                <li><div>二字码</div><div>{{infoData.iata || "-"}}</div></li>
                                <li><div>总部地点</div><div>{{infoData.headquarterslocation || "-"}}</div></li>
                                <li><div>通航国家数量</div><div>{{infoData.shippingcountry || "-"}}</div></li>
                            </ul>
                        </div>
                        <div class="info-box">
                            <ul>
                                <li><div>三字码</div><div>{{infoData.icao || "-"}}</div></li>
                                <li><div>所属航系</div><div>{{infoData.systemairpot || "-"}}</div></li>
                                <li><div>通航机场数量</div><div>{{infoData.navigationairport || "-"}}</div></li>
                            </ul>
                        </div>
                    </div>
                    <div class="i-table">
                        <div class="table-til">
                            <div>机型及数量</div>
                            <div class="i-num" v-if="infoData.planeDetails">共{{infoData.planeDetails.length || "-"}}条</div>
                        </div>
                        <div class="table-content" >
                            <ul class="table-content-ul">
                                <li v-for="item in infoData.planeDetails">
                                    <div>{{item.airporttype}}</div>
                                    <div><span>数量</span>{{item.number}}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="news" id="news" v-scrollWatch="{name:'2',offset:200,callback:spyDomChange}">
                        <div class="n-til">
                            <div class="n-name"><span class="iconfont">&#xe624;</span>新闻舆情</div>
                            <div><router-link :to="{name:'opinion',params:{key:infoData.airlnCd}}"><span class="more">查看更多></span></router-link></div>
                        </div>
                        <div class="news-box" v-for="item in newsData">
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
    import noimg from './../../../static/img/pubo/noimg.png';
    import myPic from '$src/static/img/Slice.png';
    import myPic1 from '$src/static/img/infobg.png';
    import searchHeader from './searchHeader.vue'
    import scrollWatch from "vue-scrollwatch"
    import {companyIconData} from '$src/public/js/companyIcon.js'

    export default {
        data() {
            return {
                infoData:{},
                qyCode:'',
                newsData:[],
                showDetail:true,
                basedistributionShow:false,
                step:'1',
                companyIconData,
                icon: '',
                iconShow: false,
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
                /*let i = Math.random();
                if(Math.round(i) == '0'){
                     return myPic;
                 }else{
                     return myPic1;
                 }*/
                return myPic;
            },
            noimg:function(){
                return  noimg;
            }
        },
        methods: {
           searchData(qyCode){
                this.qyCode = qyCode;
            },
            getData(){
                 this.loading = Loading.service({
                    text:"努力加载中..."
                });
                this.$ajax({
                method: 'post',
                url: '/aircompenyDetail',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                     itia:this.qyCode
                    }
                })
                .then((response) => {
                    if(response.data.opResult == "0"){
                        this.showDetail = false;
                        if(response.data.obj){
                            this.showDetail = true;
                        }
                        this.infoData = response.data.obj;
                        this.companyIconData.forEach((val) => {
                            if(this.infoData.id == val.id){
                                this.iconShow = true;
                                this.icon = `#${val.icon}`
//                                console.info(this.icon)
                            }
                        })
                        this.newsData = response.data.obj.publicOpinions;
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
             openWindow(src) {
                window.open(src);
            },
            getBaseInfo(){
                let airline = document.getElementById('airline');
                airline.scrollTop = 0;
                this.step = '1';
                //this.scrollTo("1");
            },
            getNews(){
                let airline = document.getElementById('airline');

                 //获取新闻定位点
                let news = document.getElementById('news');
                airline.scrollTop = news.offsetTop;
                this.step = '2';
                //this.scrollTo("2");
            },
              spyDomChange(node) {
              //console.log(node.name)
                if (this.step !== node.name){
                    this.step = node.name;
                }
             },
            scrollTo(name) {
                scrollWatch.scrollTo(name);
            }
        },
        mounted() {
            this.qyCode = this.searchInfo.qyCode;
            //this.getData()
            if(this.qyCode == ''){
                this.showDetail=false;
            }

        },
         created(){
            scrollWatch.setContainer("#airline");

        },
        components:{
            searchHeader
        },
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
    /*↓↓↓icon↓↓↓*/
    .icon {
        /*width: 1em;*/
        /*height: 1em;*/
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
    .svg-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .svg-container {
        display: flex;
        .svg-logo {
            width: 13.5rem;
            height: 14rem;
        }
    }
    /*↑↑↑icon↑↑↑*/

    .wrapper{
        position: fixed;
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
            display: flex;
            align-items: center;
            justify-content: center;
            width:210px;
            height:100px;
            color:#fff;
            text-align:center;
            line-height:100px;
            font-size:2.0rem;
            /*background-color:rgba(0,0,0,.3);*/
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
            padding:58px 0;
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
            .basedistribution{
                width:190px;
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
                width: 260px;
                height:180px;
                background: white;
                border-radius: 4px;
                z-index: 3;
                border:1px solid #E3E3E3;
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
    .i-table{
        margin:0 20px;
        border:1px solid #ccc;
        .table-til{
            height:50px;
            line-height:50px;
            font-size:1.5rem;
            display:flex;
            justify-content: space-between;
            padding:0 20px 0 26px;
            border-bottom:1px solid #ccc;
            .i-num{
                color:#3c78ff;
                font-size:1.4rem;
            }
        }
        .table-content-ul{
            margin-top:20px;
            width:100%;
            line-height:60px;
            font-size:1.4rem;
            display:flex;
            flex-wrap: wrap;
             li{
                display:flex;
                justify-content: space-between;
                width:314px;
                height:60px;
                margin:0 10px 10px 0;
                padding:0 15px;
                border:1px solid #ccc;
                span{
                    margin-right:10px;
                }
             }
             li:nth-of-type(3n){
                margin-right:0;
                border-right:0;
                width:315px;
             }
             li:nth-of-type(3n+1){
                border-left:0;
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
                color:#3c78ff;
                font-size:1.4rem;
                cursor:pointer;
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
