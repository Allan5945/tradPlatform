<template>
    <div class="plan-wrapper" >
        <template v-if="type==='航线需求'">
            <header>
                <div class="head-til">{{ndetailData.title?ndetailData.title+" 航线需求":"-"}}</div>
                <div class="tips">
                    <span>发布方 {{ ndetailData.num||"成都双流" }}</span>
                    <span>创建于{{ ndetailData.releasetime ? ndetailData.releasetime.substring(0,10):"-"}}</span>
                    <span>状态：<span style="color: #336BEA">{{ ndetailData.demandStateStr || "未知状态" }}</span></span>
                </div>
            </header>
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
                                <div>{{ndetailData.dptTimeresourcesStr||"-"}}</div>
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
                                <div>{{ndetailData.pstTimeresourcesStr||"-"}}</div>
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
                                <div>{{ndetailData.arrvTimeresourcesStr||"-"}}</div>
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
                            <div>{{ndetailData.iHome||"-"}}</div>
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
                            <div>{{ ndetailData.subsidypolicyStr || "-"}}</div>

                        </div>
                        <div>
                            <div>有效期</div>
                            <div>{{ ndetailData.periodValidity ? ndetailData.periodValidity.substr(-10)+" 止" : "-" }}</div>
                        </div>
                        <div style="width: 100%;">
                            <div>其他说明</div>
                            <div style="width: 80%;word-wrap: break-word;margin-left: -10px;">{{ndetailData.remark||"-"}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <header>
                <div class="head-til">{{ndetailData.title?ndetailData.title+" 运力需求":"-"}}</div>
                <div class="tips">
                    <span>创建于{{ ndetailData.releasetime ? ndetailData.releasetime.substring(0,10):"-"}}</span>
                    <span>已有{{ ndetailData.intentionCount||"0" }}位用户发起意向</span>
                    <span>状态：<span style="color: #336BEA">{{ ndetailData.demandStateStr || "未知状态" }}</span></span>
                </div>
            </header>
            <div class="content">
                <div class="myplan">
                    <div class="table-form">
                        <div>
                            <div>联系人</div>
                            <div>{{ndetailData.contact||"-"}}</div>
                        </div>
                        <div>
                            <div>联系方式</div>
                            <div>{{ndetailData.iHome||"-"}}</div>
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
                            <div>{{ndetailData.capacityCompany.airlnCd || "-"}}</div>
                        </div>
                        <div>
                            <div>运力基地</div>
                            <div>{{ ndetailData.dptNm ||"-"}}</div>
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
                            <div style="width: 95%;line-height: 8px;"
                                 v-if="ndetailData.intendedAirlines && ndetailData.intendedAirlines.length>0">
                                {{ndetailData.intendedAirlines[0].dptName||"待定"}}
                                <span class="iconfont flyicon">&#xe672;</span>
                                {{ndetailData.intendedAirlines[0].pstName||"待定"}}
                                <span class="iconfont flyicon">&#xe672;</span>
                                {{ndetailData.intendedAirlines[0].arrvName||"待定"}}
                            </div>
                        </div><div style="display: none"></div>
                        <div>
                            <div>小时成本</div>
                            <div>{{ ndetailData.hourscost?ndetailData.hourscost+' 万元':"-"}}</div>
                        </div>
                        <div>
                            <div>接受调度</div>
                            <div>{{schedulingList[ndetailData.scheduling]||"不接受"}}</div>
                        </div>
                        <div style="width: 100%;">
                            <div>有效期</div>
                            <div style="width: 80%;word-wrap: break-word;margin-left: -10px;">{{ ndetailData.periodValidity ? ndetailData.periodValidity.substr(-10)+" 止" : "-" }}</div>
                        </div>
                        <div style="width: 100%;">
                            <div>其他说明</div>
                            <div style="width: 80%;word-wrap: break-word;margin-left: -10px;">{{ndetailData.remark||"-"}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                schedulingList: ["接受","不接受"],
                airportAcept:{
                    "0":"接受临近机场",
                    "1":"不接受临近机场"
                },
            }
        },
        props:["ndetailData","type"],
        mounted: function () {
        }
    }
</script>

<style lang="scss" scoped>
    .plan-wrapper{
        position:absolute;
        right:0;
        top:50px;
        width:100%;
        max-height: 75%;
        box-sizing:border-box;
        color:#605E7C;
        overflow: hidden;
        overflow-y: auto;
        background-color:#fff;
        header{
            width:100%;
            background-color:rgba(216,216,216,.2);
        }
        footer{
            position:fixed;
            bottom:0;
            right:0;
            width:600px;
            background-color:#fff;
            height:100px;
        }
    }
    header{
        padding: 5px 40px 0 50px;
        .head-til{
            font-size:20px;
            font-weight:bold;
            margin-top:30px;
            height:20px;
            line-height:20px;
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
                width:90px;
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
        margin-bottom:140px;
        .airline{
            display:flex;
            padding:20px 0 0 10px;
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
        }
    }
    .airplace{
        margin-top:20px;
        >div:nth-of-type(2){
            height:45px;
            font-size:2rem;
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
    footer{
        border-top: 1px solid #ccc;
        .btn{
            height:40px;
            margin:20px 0 40px 0;
            >div{
                height:40px;
                line-height:40px;
                font-size:1.5rem;
                color:#605E7C;
                background-color:#fff;
                text-align:center;
                border-radius:100px;
                cursor:pointer;
                box-shadow: 1px 2px 18px rgba(60, 120, 255,0.5);
            }
            .cancel-btn{
                width:100px;
                margin-right:10px;
            }
            .col-btn{
                width:80px;
            }
        }
    }
</style>
