<template>
    <div >
        <div class="content">
            <div class="banner">
                <div class="b-til">中国南方航空</div>
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
                            <li><div>航司名</div><div>{{infoData.airlnCd || "-"}}</div></li>
                            <li><div>成立时间</div><div>{{infoData.city || "-"}}</div></li>
                            <li><div>基地分布</div><div>{{infoData.membershipgroup || "-"}}</div></li>
                            <li><div>航空联盟</div><div>{{infoData.airpotcls || "-"}}</div></li>
                        </ul>
                    </div>
                    <div class="info-box">
                        <ul>
                            <li><div>二字码</div><div>{{infoData.iata || "-"}}</div></li>
                            <li><div>总部地点</div><div>{{infoData.area || "-"}}</div></li>
                            <li><div>通航国家数量</div><div>{{infoData.departuretime || "-"}}</div></li>
                        </ul>
                    </div>
                    <div class="info-box">
                        <ul>
                            <li><div>四字码</div><div>{{infoData.icao || "-"}}</div></li>
                            <li><div>所属航系</div><div>{{infoData.warzone || "-"}}</div></li>
                            <li><div>通航机场数量</div><div>{{infoData.airpotcls || "-"}}</div></li>
                        </ul>
                    </div>
                </div>
               <!--  <div class="airport-track">
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
               </div> -->
                <div class="i-table">
                    <div class="table-til">
                        <div>机型及数量</div>
                        <div class="i-num">共3条</div>
                    </div>
                    <div class="table-content" >
                        <ul>
                            <li>
                                <div>B33-300</div>
                                <div><span>数量</span>26</div>
                            </li>
                            <li>
                                <div>B33-300</div>
                                <div><span>数量</span>26</div>
                            </li>
                            <li>
                                <div>B33-300</div>
                                <div><span>数量</span>26</div>
                            </li>
                              <li>
                                <div>B33-300</div>
                                <div><span>数量</span>26</div>
                            </li>
                        </ul>
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
                        this.infoData = response.data.obj;
                    }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
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
                font-size:1.2rem;
            }
        }
        .table-content ul{
            margin-top:20px;
            height:60px;
            line-height:60px;
            font-size:1.4rem;
            display:flex;
            flex-wrap: wrap;
             li{
                display:flex;
                flex:1;
                justify-content: space-between;
                margin-right:10px;
                padding:0 15px;
                border:1px solid #ccc;
                span{
                    margin-right:10px;
                }
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
                font-size:1.2rem;
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
