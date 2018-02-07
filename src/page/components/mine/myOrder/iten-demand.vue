<template>
    <div class="plan-wrapper" >
        <template v-if="true || type.indexOf('航线')>-1">
            <header>
                <div class="head-til">选定意向方</div>
            </header>
            <p class="sub-title"><span>{{ ndetailData.responsedate }}</span><span>{{ ndetailData.intentionCompanyName }}</span></p>
            <div class="content">
                <div class="myplan">
                    <div class="airline">
                        <div class="airplace">
                            <div>始发机场</div>
                            <div>
                                <div>{{ndetailData.dptNm||"—"}}</div>
                                <div>{{ airportAcept[ndetailData.dptAcceptnearairport] || '-' }}</div>
                            </div>
                            <div class="resouse">
                                <div>出港资源</div>
                                <div>{{ndetailData.dptTimeresourcesStr ||"-"}}</div>
                            </div>
                        </div>
                        <div style="padding-top:45px;"><span class="iconfont" style="font-size:35px;">&#xe672;</span></div>
                        <div class="airplace">
                            <div>经停机场</div>
                            <div>
                                <div>{{ndetailData.pstNm||"—"}}</div>
                                <div>{{ airportAcept[ndetailData.pstAcceptnearairport] || '-' }}</div>
                            </div>
                            <div class="resouse">
                                <div>出港资源</div>
                                <div>{{ndetailData.pstTimeresourcesStr ||"-"}}</div>
                            </div>
                        </div>
                        <div style="padding-top:45px;"><span class="iconfont" style="font-size:35px;">&#xe672;</span></div>
                        <div class="airplace">
                            <div>到达区域</div>
                            <div>
                                <div>{{ndetailData.arrvNm||"—"}}</div>
                                <div>{{ airportAcept[ndetailData.arrvAcceptnearairport] || '-' }}</div>
                            </div>
                            <div class="resouse">
                                <div>出港资源</div>
                                <div>{{ndetailData.arrvTimeresourcesStr ||"-"}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="table-form">
                        <div>
                            <div>联系人</div>
                            <div>{{ndetailData.contact||"-"}}</div>
                        </div>
                        <div>
                            <div>联系方式</div>
                            <div>{{ndetailData.ihome||"-"}}</div>
                        </div>
                        <div>
                            <div>拟开时间</div>
                            <div>{{ndetailData.sailingtime||"-"}}</div>
                        </div>
                        <div>
                            <div>拟开班期</div>
                            <div>{{ndetailData.days||"-"}}</div>
                        </div>
                        <div>
                            <div>拟飞机型</div>
                            <div>{{ndetailData.aircrfttyp||"-"}}</div>
                        </div>
                        <div>
                            <div>座位数</div>
                            <div>{{ndetailData.seating||"-"}}</div>
                        </div>
                        <div>
                            <div>客量预期</div>
                            <div>{{ndetailData.avgguestexpect?ndetailData.avgguestexpect+"人/均班":"-"}}</div>
                        </div>
                        <div>
                            <div>客座率预期</div>
                            <div>{{ndetailData.loadfactorsexpect ? ndetailData.loadfactorsexpect+"%" : "-"}}</div>
                        </div>
                        <div>
                            <div>补贴政策</div>
                            <div>{{ ndetailData.subsidypolicyStr ||"-"}}</div>
                        </div>
                        <div>
                            <div>小时成本</div>
                            <div>{{ ndetailData.hourscost? ndetailData.hourscost+"万元/小时" :"-" }}</div>
                        </div>
                        <div>
                            <div>运力归属</div>
                            <div>{{ ndetailData.capacityCompany.airlnCd ||"-"}}</div>
                        </div>
                        <div>
                            <div>运力基地</div>
                            <div>{{ ndetailData.dptNm || "-" }}</div>
                        </div>
                        <div>
                            <div>是否调度</div>
                            <div>{{ ndetailData.schedulingStr || "-" }}</div>
                        </div>
                        <div style="width: 100%;height:auto;min-height: 40px;">
                            <div>其他说明</div>
                            <div style="width: 80%;height:auto;word-wrap: break-word;margin-left: -10px;">{{ndetailData.remark||"-"}}</div>
                        </div>
                    </div>
                    <template v-if="false">
                        <header>
                            <div class="head-til">收到的意向</div>
                            <div class="tips">
                                <span>已有{{ ndetailData.intentionCount||"0" }}位用户发起意向</span>
                            </div>
                        </header>
                        <div class="table-form-extend">
                            <div class="table-header">
                                <span class="item-a">收到时间</span><span class="item-b">意向方</span>
                            </div>
                            <ul class="table-body">
                                <li v-for="(item, index) in extend.data">
                                    <div class="list">
                                        <span class="item-a">2017.12.19</span>
                                        <span class="item-b">CTU</span>
                                        <span v-show="extend.active!=index" @click="extend.active=index" class="item-c">查看详情</span>
                                        <span v-show="extend.active===index" @click="extend.active=-1" class="item-c">收起详情</span>
                                    </div>
                                    <extendPanel class="main-info"
                                                 v-show="extend.active===index"
                                                 :extendData="ndetailData"
                                                 :thisType="'yunli'"
                                    >
                                    </extendPanel>
                                </li>
                            </ul>
                        </div>
                    </template>
                </div>
            </div>
        </template>
        <template v-else>
            <header>
                <div class="head-til">   选定意向方</div>
            </header>
            <p class="sub-title"><span>{{ ndetailData.responsedate }}</span><span>{{ ndetailData.intentionCompanyName }}</span></p>
            <div class="content">
                <div class="myplan">
                    <div class="table-form">
                        <div>
                            <div>联系人</div>
                            <div>{{ndetailData.contact||"-"}}</div>
                        </div>
                        <div>
                            <div>联系方式</div>
                            <div>{{ndetailData.ihome||"-"}}</div>
                        </div>
                        <div>
                            <div>机型</div>
                            <div>{{ndetailData.aircrfttyp||"-"}}</div>
                        </div>
                        <div>
                            <div>座位布局</div>
                            <div>{{ndetailData.seating||"-"}}</div>
                        </div>
                        <div>
                            <div>运力归属</div>
                            <div>{{ndetailData.capacityCompany.airlnCd||"-"}}</div>
                        </div>
                        <div>
                            <div>运力基地</div>
                            <div>{{ndetailData.capacityCompany.headquarterslocation||"-"}}</div>
                        </div>
                        <div>
                            <div>出港时刻</div>
                            <div>{{ ndetailData.dptTime||"-" }}</div>
                        </div>
                        <div>
                            <div>班期</div>
                            <div>{{ndetailData.days || "-"}}</div>
                        </div>
                        <div style="width: 100%;margin: 10px 0;">
                            <div>意向航线</div>
                            <div style="width: 95%;line-height: 8px;">
                                {{ndetailData.dptNm||"—"}}
                                <span class="iconfont flyicon">&#xe672;</span>
                                {{ndetailData.pstNm||"—"}}
                                <span class="iconfont flyicon">&#xe672;</span>
                                {{ndetailData.arrvNm||"—"}}
                            </div>
                        </div><div style="display: none"></div>
                        <div>
                            <div>小时成本</div>
                            <div>{{ndetailData.hourscost?ndetailData.hourscost+" 万元":"-"}}</div>
                        </div>
                        <div>
                            <div>接受调度</div>
                            <div>{{ndetailData.schedulingStr}}</div>
                        </div>
                        <div>
                            <div>有效期</div>
                            <div>{{ ndetailData.sailingtime? ndetailData.sailingtime.substr(-10)+" 止" :"-" }}</div>
                        </div>
                        <div style="width: 100%;height:auto;min-height: 40px;">
                            <div>其他说明</div>
                            <div style="width: 80%;height:auto;word-wrap: break-word;margin-left: -10px;">{{ndetailData.remark||"-"}}</div>
                        </div>
                    </div>
                    <template v-if="ndetailData.isWeituo">
                        <header>
                            <div class="head-til">收到的意向</div>
                            <div class="tips">
                                <span>已有{{ ndetailData.intentionCount||"0" }}位用户发起意向</span>
                            </div>
                        </header>
                        <div class="table-form-extend">
                            <div class="table-header">
                                <span class="item-a">收到时间</span><span class="item-b">意向方</span>
                            </div>
                            <ul class="table-body">
                                <li v-for="(item, index) in extend.data">
                                    <div class="list">
                                        <span class="item-a">2017.12.19</span>
                                        <span class="item-b">CTU</span>
                                        <span v-show="extend.active!=index" @click="extend.active=index" class="item-c">查看详情</span>
                                        <span v-show="extend.active===index" @click="extend.active=-1" class="item-c">收起详情</span>
                                    </div>
                                    <extendPanel class="main-info"
                                                 v-show="extend.active===index"
                                                 :extendData="ndetailData"
                                                 :thisType="'yunli'"
                                    >
                                    </extendPanel>
                                </li>
                            </ul>
                        </div>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                progressState:{
                    '3': '关闭',
                    '5': '交易完成',
                    '6': '订单完成',
                    '7': '佣金支付'
                },
                airportAcept:{
                    "0":"接受临近机场",
                    "1":"不接受临近机场"
                },
                extend:{
                    data:[
                        {
                            name: '1',
                            age:'2'
                        },
                        {
                            name: '3',
                            age:'4'
                        },
                        {
                            name: '5',
                            age:'6'
                        },
                    ],
                    active: -1
                }
            }
        },
        props:["ndetailData","type","roleType"],
    }
</script>

<style lang="scss" scoped>
    .plan-wrapper{
        right:0;
        width:100%;
        box-sizing:border-box;
        color:#605E7C;
        background-color:#fff;
        margin-top: 30px;
        header{
            width:100%;
            background-color:rgba(216,216,216,.2);
        }
    }
    header{
        box-sizing: border-box;
        padding: 5px 40px 0 50px;
        .head-til{
            font-size: 2rem;
            font-weight:bold;
            height: 80px;
            line-height: 80px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        .tips{
            height:12px;
            line-height:12px;
            color:rgba(96, 94, 124, 0.7);
            padding:20px 0;
            span{
                margin-right:30px;
            }
        }
    }
    .sub-title{
        line-height: 30px;
        height: 30px;
        border-bottom:1px solid #ccc;
        margin: 0px 40px 0px 50px;
        padding: 20px 0 20px 0;
        span{
            margin-right: 50px;
        }
    }
    .table-form{
        width:100%;
        box-sizing:border-box;
        padding:40px 50px;
        flex-wrap: wrap;
        display: flex;
        .flyicon{
            font-size: 25px;
            margin: 0 20px;
        }
        >div{
            width:220px;
            height:40px;
            display: flex;
            >div{
                margin-bottom:20px;
                height:20px;
                line-height:20px;
            }
            >div:nth-of-type(1){
                width: 90px;
                color:rgba(96, 94, 124, 0.7);
            }
            >div:nth-of-type(2){
                width:160px;
            }
        }
        >div:nth-of-type(odd){
            margin-right:40px;
        }
    }
    .myplan{
        margin-bottom:40px;
        .airline{
            display:flex;
            padding:0 0 0 10px;
            margin: 0 40px;
            box-sizing:border-box;
            border-bottom:1px solid #ccc;
            >div:nth-of-type(odd){
                max-width:160px;
            }
            >div:nth-of-type(even){
                width:100px;
                text-align: center;
            }
            .airplace{
                margin-top:20px;
                >div:nth-of-type(2){
                    height:45px;
                    font-size:1.8rem;
                    font-weight:bold;
                    padding-top:15px;
                    >div:nth-of-type(2){
                        font-size:1rem;
                        font-weight:normal;
                    }
                }
                .resouse{
                    margin:20px 0;
                }
            }
        }
    }
    .table-form-extend{
        width: 100%;
        box-sizing: border-box;
        padding: 40px 0;
        .table-header{
            padding: 0 50px;
            display: flex;
            .item-a{
                flex:2;
            }
            .item-b{
                flex:5;
            }
        }
        .table-body{
            list-style: none;
            padding: 0 30px;
            li{
                background-color: #eee;
                margin: 5px 0;
                .list{
                    height: 60px;
                    line-height: 60px;
                    padding: 0 20px;
                    display: flex;
                    .item-a{
                        flex:2;
                    }
                    .item-b{
                        flex:4;
                    }
                    .item-c{
                        flex:1;
                        color: #3c78ff;
                        cursor: pointer;
                    }
                }
                .main-info{
                    box-sizing: border-box;
                    width: 100%;
                    padding: 0 20px;
                    border-top: 2px solid #000;
                }
            }
        }
    }
</style>
