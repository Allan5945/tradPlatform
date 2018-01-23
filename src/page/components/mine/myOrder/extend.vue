<template>
    <div class="extend-talbe">
        <div class="table-form" v-if="thisType=='yunli'">
            <div>
                <div>联系人</div>
                <div>{{extendData.contact||"-"}}</div>
            </div>
            <div>
                <div>联系方式</div>
                <div>{{extendData.iHome||"-"}}</div>
            </div>
            <div>
                <div>机型</div>
                <div>{{extendData.aircrfttyp||"-"}}</div>
            </div>
            <div>
                <div>座位布局</div>
                <div>{{extendData.seating||"-"}}</div>
            </div>
            <div>
                <div>运力归属</div>
                <div>{{extendData.capacitycompany||"-"}}</div>
            </div>
            <div>
                <div>运力基地</div>
                <div>{{extendData.dpt||"-"}}</div>
            </div>
            <div>
                <div>出港时刻</div>
                <div>{{timeresources[extendData.dptTimeresources]||"-"}}</div>
            </div>
            <div>
                <div>班期</div>
                <div>{{extendData.days || "-"}}</div>
            </div>
            <div style="width: 100%;margin: 10px 0;">
                <div>意向航线</div>
                <div style="width: 95%;line-height: 8px;">
                    {{extendData.dptNm||"—"}}
                    <span class="iconfont flyicon">&#xe672;</span>
                    {{extendData.pstNm||"—"}}
                    <span class="iconfont flyicon">&#xe672;</span>
                    {{extendData.arrvNm||"—"}}
                </div>
            </div><div style="display: none"></div>
            <div>
                <div>小时成本</div>
                <div>{{extendData.hourscost?extendData.hourscost+"万元/小时":"-"}}</div>
            </div>
            <div>
                <div>接受调度</div>
                <div>{{schedulingList[extendData.scheduling]||"不接受"}}</div>
            </div>
            <div>
                <div>有效期</div>
                <div>{{extendData.hourscost?extendData.hourscost+" 止":"-"}}</div>
            </div>
            <div style="width: 100%;">
                <div>其他说明</div>
                <div style="width: 80%;word-wrap: break-word;margin-left: -10px;">{{extendData.remark||"-"}}</div>
            </div>
        </div>
        <template v-else>
            <div class="airline">
                <div class="airplace">
                    <div>始发机场</div>
                    <div>
                        <div>{{extendData.dptNm||"—"}}</div>
                        <div v-show="extendData.dptAcceptnearairport=='0'">接受临近机场</div>
                    </div>
                    <div class="resouse">
                        <div>出港资源</div>
                        <div>{{extendData.dptTime||"待协调"}}</div>
                    </div>
                </div>
                <div style="padding-top:60px;"><span class="iconfont">&#xe672;</span></div>
                <div class="airplace">
                    <div>经停机场</div>
                    <div>
                        <div>{{extendData.pstNm||"—"}}</div>
                        <div v-show="extendData.pstAcceptnearairport=='0'">接受临近机场</div>
                    </div>
                    <div class="resouse">
                        <div>出港资源</div>
                        <div>{{extendData.pstTime||"待协调"}}</div>
                    </div>
                </div>
                <div style="padding-top:60px;"><span class="iconfont">&#xe672;</span></div>
                <div class="airplace">
                    <div>到达区域</div>
                    <div>
                        <div>{{extendData.arrvNm||"—"}}</div>
                        <div v-show="extendData.arrvAcceptnearairport=='0'">接受临近机场</div>
                    </div>
                    <div class="resouse">
                        <div>出港资源</div>
                        <div>{{extendData.arrvTime||"待协调"}}</div>
                    </div>
                </div>
            </div>
            <div class="table-form">
                <div>
                    <div>联系人</div>
                    <div>{{extendData.contact||"-"}}</div>
                </div>
                <div>
                    <div>联系方式</div>
                    <div>{{extendData.iHome||"-"}}</div>
                </div>
                <div>
                    <div>拟开时间</div>
                    <div>{{extendData.sailingtime||"-"}}</div>
                </div>
                <div>
                    <div>拟开班期</div>
                    <div>{{extendData.days||"-"}}</div>
                </div>
                <div>
                    <div>拟飞机型</div>
                    <div>{{extendData.aircrfttyp||"-"}}</div>
                </div>
                <div>
                    <div>座位数</div>
                    <div>{{extendData.seating||"-"}}</div>
                </div>
                <div>
                    <div>客量预期</div>
                    <div>{{extendData.avgguestexpect?extendData.avgguestexpect+"人/均班":"-"}}</div>
                </div>
                <div>
                    <div>客座率预期</div>
                    <div>{{extendData.loadfactorsexpect ? extendData.loadfactorsexpect+"%" : "-"}}</div>
                </div>
                <div>
                    <div>补贴政策</div>
                    <div>{{subsidyList[extendData.subsidypolicy]||"-"}}</div>

                </div>
                <div>
                    <div>有效期</div>
                    <div>{{extendData.hourscost?extendData.hourscost+" 止":"-"}}</div>
                </div>
                <div style="width: 100%;">
                    <div>其他说明</div>
                    <div style="width: 80%;word-wrap: break-word;margin-left: -10px;">{{extendData.remark||"-"}}</div>
                </div>
            </div>

        </template>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                progressState:{
                    '3': '关闭',
                    '5': '交易完成',
                    '6': '订单完成',
                    '7': '佣金支付'
                },
                subsidyList:["定补","保底","人头补","无补贴"],
                timeresources:["09:00-18:00",'待协调','充足'],
                schedulingList: ["接受","不接受"],
            }
        },
        props: ["extendData","thisType"],
        methods: {},
    }
</script>

<style lang="scss" scoped>
    .extend-talbe{
        width: 100%;
    }
    .table-form{
        width:100%;
        box-sizing:border-box;
        padding:40px 0 10px 0;
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
    .airline{
        display:flex;
        padding:20px 0 0 10px;
        margin: 0 10px;
        box-sizing:border-box;
        border-bottom:1px solid #ccc;
        >div:nth-of-type(odd){
            max-width:160px;
        }
        >div:nth-of-type(even){
            width:60px;
            text-align: center;
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
    }
</style>
