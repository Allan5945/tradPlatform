<template>
    <div class="plan-wrapper" >
        <template v-if="type && type.indexOf('航线')>-1">
            <header>
                <div class="head-til" :title="ndetailData.title">{{ndetailData.title || "-"}}</div>
                <div class="tips">
                    <span>发布方 {{ ndetailData.cpnNm||"-" }}</span>
                    <span>创建于{{ ndetailData.releasetime ? ndetailData.releasetime.substring(0,10):"-"}}</span>
                    <span>状态：<span style="color: #336BEA">{{ ndetailData.demandprogressStr||"未知状态" }}</span></span>
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
                        <div style="padding-top:45px;"><span class="iconfont"  style="font-size:35px;">&#xe672;</span></div>
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
                            <div>{{ndetailData.subsidypolicyStr||"-"}}</div>

                        </div>
                        <div>
                            <div>有效期</div>
                            <div>{{ndetailData.periodValidity? ndetailData.periodValidity.substr(-10)+"止":"-"}}</div>
                        </div>
                        <div style="width: 100%;height:auto;min-height: 40px;">
                            <div>其他说明</div>
                            <div style="width: 80%;height:auto;word-wrap: break-word;margin-left: -10px;">{{ndetailData.remark||"-"}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <header>
                <div class="head-til" :title="ndetailData.title">{{ndetailData.title || "-"}}</div>
                <div class="tips">
                    <span>创建于{{ ndetailData.releasetime ? ndetailData.releasetime.substring(0,10):"-"}}</span>
                    <span>已有{{ ndetailData.intentionCount||"0" }}位用户发起意向</span>
                    <span>状态：<span style="color: #336BEA">{{ ndetailData.demandprogressStr||"未知状态" }}</span></span>
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
                        <template v-if="ndetailData.capacityCompany">
                            <div>
                                <div>运力归属</div>
                                <div>{{ndetailData.capacityCompany.airlnCd || "-"}}</div>
                            </div>
                        </template>
                        <template v-else>
                            <div>
                                <div>运力归属</div>
                                <div>-</div>
                            </div>
                        </template>
                            <div>
                                <div>运力基地</div>
                                <div>{{ ndetailData.dptNm ||"-"}}</div>
                            </div>
                        <div>
                            <div>出港时刻</div>
                            <div>{{ ndetailData.dptTimeresourcesStr||"-"}}</div>
                        </div>
                        <div>
                            <div>班期</div>
                            <div>{{ndetailData.days || "-"}}</div>
                        </div>
                        <div style="width: 100%;margin: 10px 0;">
                            <div>意向航线</div>
                            <div style="width: 95%;line-height: 8px;" v-if="ndetailData.intendedAirlines">
                                {{ndetailData.intendedAirlines[0].dptName||"—"}}
                                <span class="iconfont flyicon">&#xe672;</span>
                                {{ndetailData.intendedAirlines[0].pstName||"—"}}
                                <span class="iconfont flyicon">&#xe672;</span>
                                {{ndetailData.intendedAirlines[0].arrvName||"—"}}
                            </div>
                        </div><div style="display: none"></div>
                        <div>
                            <div>小时成本</div>
                            <div>{{ndetailData.hourscost?ndetailData.hourscost+" 万元":"-"}}</div>
                        </div>
                        <div v-if="ndetailData.airportForSchedulines" style="position: relative">
                            <div>接受调度</div>
                            <div style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;" @mouseover="schedShow=true" @mouseout="schedShow=false">{{ schedList.join(" / ") }}</div>
                            <div v-show="schedShow" class="extend-sched">
                                {{schedList.join(" / ")}}
                            </div>
                        </div>
                        <div v-else>
                            <div>接受调度</div>
                            <div>{{ ndetailData.schedulingStr || "-"}}</div>
                        </div>
                        <div>
                            <div>有效期</div>
                            <div>{{ndetailData.periodValidity? ndetailData.periodValidity.substr(-10)+" 止" :"-"}}</div>
                        </div>
                        <div style="width: 100%;height:auto;min-height: 40px;">
                            <div>其他说明</div>
                            <div style="width: 80%;height:auto;word-wrap: break-word;margin-left: -10px;">{{ndetailData.remark||"-"}}</div>
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
                progressState:{
                    '3': '关闭',
                    '5': '交易完成',
                    '6': '订单完成',
                    '7': '佣金支付'
                },
                schedulingList: ["接受","不接受"],
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
                },
                schedList:[],
                schedShow:false
            }
        },
        props:["ndetailData","type"],
        mounted:function () {
            /*
            this.ndetailData.airportForSchedulines = [
                {
                    "id":538,
                    "airlnCd":"广州白云",
                    "airlnCdName":"广州白云国际机场",
                    "airlinElhName":"Guangzhoubaiyun",
                    "airlinSpeSpl":"GZBY",
                    "iata":"CAN",
                    "icao":"ZGGG",
                    "inter":"是",
                    "airfieldlvl":"4F",
                    "city":"广州",
                    "province":"广东",
                    "cityCoordinateJ":"113.1835",
                    "cityCoordinateW":"23.2332",
                    "coordinateupdatetime":null,
                    "area":"中南管理局",
                    "airState":"启用",
                    "airpottype":"民用机场",
                    "warzone":"南部战区",
                    "airEle":"15.20",
                    "airpotcls":"非高原",
                    "coordinateairport":"是",
                    "coordinatetimelist":null,
                    "specialairport":"否",
                    "specialairportwhy":null,
                    "port":"是",
                    "releasepunctuality":"",
                    "firelvl":"",
                    "lightingconditions":"简易进近灯光",
                    "allowthetakeoffandlanding":"/",
                    "modelcanhandle":"AIRBUSA320-214 SHARKLETS,AIRBUSA330-343E,AIRBUSA320-214,AIRBUSA330-323E,BOEING737-800 WINGLETS,BOEING767-300,BOEING777-300ER,AIRBUSA330-243E,AIRBUSA330-223E,AIRBUSA321-231,BOEING787-8,BOEING767-300ER,AIRBUSA320-232 SHARKLETS,AIRBUSA319-131,AIRBUSA320-271N (NEO),AIRBUSA321-232,AIRBUSA321-231 SHARKLETS,AIRBUSA320-232,AIRBUSA321-211 SHARKLETS,AIRBUSA319-112,EMBRAERE190 LR,AIRBUSA319-132,AIRBUSA319-115,BOEING737-800,73G,BOEING737-700 WINGLETS,JET,BOEING737-700,AIRBUSA321-213,738,AIRBUSA319-133,AIRBUSA321-211,AIRBUSA330-342,BOEING777-200,BOEING747-400,BOEING787-9,AIRBUSA380-841,AIRBUSA321-232 SHARKLETS,AIRBUSA330-203E,BOEING757-200,737,73E,LMO",
                    "runwayarticlenumber":"3",
                    "airportshuttlemetro":"有",
                    "airportbus":"有",
                    "distancefromdowntown":"28公里",
                    "intheflight":"1143",
                    "international":"0",
                    "internationaltime":"2017-09-08",
                    "domestic":"115",
                    "intheport":null,
                    "intheflighttime":"2017-09-14",
                    "membershipgroup":"广东省机场管理集团",
                    "planepositionnumber":"183",
                    "departuretime":"2004-08-05",
                    "operator":"否",
                    "operatorinput":null,
                    "isrewardpolicy":"否",
                    "isrewardpolicytext":null,
                    "passengerThroughputs":null,
                    "goodsThroughputs":null,
                    "takeOffAndLandingFlights":null,
                    "years":null,
                    "runwayList":null,
                    "rewardPolicyList":null,
                    "opinions":null,
                    "compenys":null
                },
                {
                    "id":539,
                    "airlnCd":"成都双流",
                    "airlnCdName":"成都双流国际机场",
                    "airlinElhName":"Chengdushuangliu",
                    "airlinSpeSpl":"CDSL",
                    "iata":"CTU",
                    "icao":"ZUUU",
                    "inter":"是",
                    "airfieldlvl":"4F",
                    "city":"成都",
                    "province":"四川",
                    "cityCoordinateJ":"104.0030",
                    "cityCoordinateW":"30.3612",
                    "coordinateupdatetime":null,
                    "area":"西南管理局",
                    "airState":null,
                    "airpottype":"民用机场",
                    "warzone":"西部战区",
                    "airEle":"512.40",
                    "airpotcls":"非高原",
                    "coordinateairport":"是",
                    "coordinatetimelist":"48",
                    "specialairport":"否",
                    "specialairportwhy":null,
                    "port":"是",
                    "releasepunctuality":"",
                    "firelvl":"",
                    "lightingconditions":"简易进近灯光",
                    "allowthetakeoffandlanding":"/",
                    "modelcanhandle":"AIRBUSA320-214 SHARKLETS,AIRBUSA330-343E,BOEING737-800 WINGLETS,AIRBUSA321-231 SHARKLETS,AIRBUSA320-232,AIRBUSA321-211 SHARKLETS,BOEING767-300ER,AIRBUSA320-214,AIRBUSA330-243E,AIRBUSA321-231,AIRBUSA321-213,AIRBUSA319-115 SHARKLETS,AIRBUSA320-232 SHARKLETS,BOEING737-900,AIRBUSA321-232 SHARKLETS,AIRBUSA319-133,BOEING787-8,AIRBUSA330-323E,AIRBUSA319-115,BOMBARDIER (CANADAIR)CRJ900LR ENHANCED,BOEING737-800,JET,COMACARJ21 700,BOEING737-700 WINGLETS,737,AIRBUSA320-233,AIRBUSA330-342,B(MCDONNELL-DOUGLAS)MD-83,AIRBUSA319-112,AIRBUSA319-133 SHARKLETS,319,AIRBUSA319-132,AIRBUSA321-211,EMBRAERE190 LR,BOEING787-9,BOEING777-300ER,AIRBUSA330-302E,BOEING737-900ER WINGLETS,AIRBUSA321-232,BOEING757-200,BOEING777-200",
                    "runwayarticlenumber":"2",
                    "airportshuttlemetro":"有",
                    "airportbus":"有",
                    "distancefromdowntown":"16公里",
                    "intheflight":"1005",
                    "international":"0",
                    "internationaltime":"2017-09-08",
                    "domestic":"116",
                    "intheport":null,
                    "intheflighttime":"2017-09-14",
                    "membershipgroup":"四川省机场集团",
                    "planepositionnumber":"178",
                    "departuretime":"1938-12-25",
                    "operator":"否",
                    "operatorinput":null,
                    "isrewardpolicy":"否",
                    "isrewardpolicytext":null,
                    "passengerThroughputs":null,
                    "goodsThroughputs":null,
                    "takeOffAndLandingFlights":null,
                    "years":null,
                    "runwayList":null,
                    "rewardPolicyList":null,
                    "opinions":null,
                    "compenys":null
                },
                {
                    "id":540,
                    "airlnCd":"南京禄口",
                    "airlnCdName":"南京禄口国际机场",
                    "airlinElhName":"Nanjinglukou",
                    "airlinSpeSpl":"NJLK",
                    "iata":"NKG",
                    "icao":"ZSNJ",
                    "inter":"是",
                    "airfieldlvl":"4F",
                    "city":"南京",
                    "province":"江苏",
                    "cityCoordinateJ":"118.51432",
                    "cityCoordinateW":"31.44319",
                    "coordinateupdatetime":null,
                    "area":"华东管理局",
                    "airState":null,
                    "airpottype":"民用机场",
                    "warzone":"东部战区",
                    "airEle":"14.60",
                    "airpotcls":"非高原",
                    "coordinateairport":"是",
                    "coordinatetimelist":"38",
                    "specialairport":"否",
                    "specialairportwhy":null,
                    "port":"是",
                    "releasepunctuality":"",
                    "firelvl":"",
                    "lightingconditions":"简易进近灯光",
                    "allowthetakeoffandlanding":"/",
                    "modelcanhandle":"AIRBUSA321-231,AIRBUSA320-232,BOEING737-800 WINGLETS,AIRBUSA330-243E,AIRBUSA321-211 SHARKLETS,AIRBUSA320-214,JET,AIRBUSA321-211,AIRBUSA320-232 SHARKLETS,EMBRAERE190 LR,BOEING737-800,AIRBUSA321-213,320,AIRBUSA320-214 SHARKLETS,BOEING737-700 WINGLETS,AIRBUSA319-132,AIRBUSA319-132 SHARKLETS,AIRBUSA321-231 SHARKLETS,AIRBUSA320-233,AIRBUSA319-112,AIRBUSA330-342,190,AIRBUSA319-115 SHARKLETS,AIRBUSA319-133,EMBRAERE195 LR,BOMBARDIER (CANADAIR)CRJ900LR ENHANCED,BOEING747-400,AIRBUSA320-216 SHARKLETS,738,AIRBUSA319-115",
                    "runwayarticlenumber":"2",
                    "airportshuttlemetro":"有",
                    "airportbus":"有",
                    "distancefromdowntown":"35.8公里",
                    "intheflight":"559",
                    "international":"0",
                    "internationaltime":"2017-09-08",
                    "domestic":"69",
                    "intheport":null,
                    "intheflighttime":"2017-09-14",
                    "membershipgroup":"江苏省人民政府国有资产监督管理委员会",
                    "planepositionnumber":"53",
                    "departuretime":"1997-07-01",
                    "operator":"否",
                    "operatorinput":null,
                    "isrewardpolicy":"否",
                    "isrewardpolicytext":null,
                    "passengerThroughputs":null,
                    "goodsThroughputs":null,
                    "takeOffAndLandingFlights":null,
                    "years":null,
                    "runwayList":null,
                    "rewardPolicyList":null,
                    "opinions":null,
                    "compenys":null
                },
                {
                    "id":541,
                    "airlnCd":"武汉天河",
                    "airlnCdName":"武汉天河国际机场",
                    "airlinElhName":"Wuhantianhe",
                    "airlinSpeSpl":"WHTH",
                    "iata":"WUH",
                    "icao":"ZHHH",
                    "inter":"是",
                    "airfieldlvl":"4F",
                    "city":"武汉",
                    "province":"湖北",
                    "cityCoordinateJ":"114.3751",
                    "cityCoordinateW":"30.4027",
                    "coordinateupdatetime":null,
                    "area":"中南管理局",
                    "airState":null,
                    "airpottype":"民用机场",
                    "warzone":"中部战区",
                    "airEle":"34.50",
                    "airpotcls":"非高原",
                    "coordinateairport":"是",
                    "coordinatetimelist":"33",
                    "specialairport":"否",
                    "specialairportwhy":null,
                    "port":"是",
                    "releasepunctuality":"",
                    "firelvl":"",
                    "lightingconditions":"简易进近灯光",
                    "allowthetakeoffandlanding":"/",
                    "modelcanhandle":"BOEING737-800 WINGLETS,AIRBUSA320-214,BOEING737-800,AIRBUSA330-343E,AIRBUSA320-232,AIRBUSA320-214 SHARKLETS,738,AIRBUSA330-243E,AIRBUSA330-323E,BOEING777-300ER,AIRBUSA320-233,AIRBUSA321-213,EMBRAERE190 LR,BOEING737-700 WINGLETS,AIRBUSA321-211 SHARKLETS,AIRBUSA321-231 SHARKLETS,AIRBUSA319-133,AIRBUSA319-132,AIRBUSA321-231,AIRBUSA319-112,BOMBARDIER (CANADAIR)CRJ900LR ENHANCED,CAIC - CHINA AVIATION INDUSTRY CORPMA-60,JET,AIRBUSA319-115 SHARKLETS,BOEING737-700,320,AIRBUSA330-302E,73G,BOMBARDIER (CANADAIR)CRJ900LR",
                    "runwayarticlenumber":"2",
                    "airportshuttlemetro":"有",
                    "airportbus":"有",
                    "distancefromdowntown":"25公里",
                    "intheflight":"441",
                    "international":"0",
                    "internationaltime":"2017-09-08",
                    "domestic":"78",
                    "intheport":null,
                    "intheflighttime":"2017-09-14",
                    "membershipgroup":"湖北机场集团有限公司",
                    "planepositionnumber":"153",
                    "departuretime":"1995-04-15",
                    "operator":"否",
                    "operatorinput":null,
                    "isrewardpolicy":"否",
                    "isrewardpolicytext":null,
                    "passengerThroughputs":null,
                    "goodsThroughputs":null,
                    "takeOffAndLandingFlights":null,
                    "years":null,
                    "runwayList":null,
                    "rewardPolicyList":null,
                    "opinions":null,
                    "compenys":null
                },
                {
                    "id":543,
                    "airlnCd":"重庆江北",
                    "airlnCdName":"重庆江北国际机场",
                    "airlinElhName":"Chongqingjiabei",
                    "airlinSpeSpl":"CQJB",
                    "iata":"CKG",
                    "icao":"ZUCK",
                    "inter":"是",
                    "airfieldlvl":"4F",
                    "city":"重庆",
                    "province":"重庆",
                    "cityCoordinateJ":"106.38294",
                    "cityCoordinateW":"29.43084",
                    "coordinateupdatetime":null,
                    "area":"西南管理局",
                    "airState":null,
                    "airpottype":"民用机场",
                    "warzone":"西部战区",
                    "airEle":"415.60",
                    "airpotcls":"非高原",
                    "coordinateairport":"是",
                    "coordinatetimelist":"45",
                    "specialairport":"否",
                    "specialairportwhy":"",
                    "port":"是",
                    "releasepunctuality":"",
                    "firelvl":"",
                    "lightingconditions":"简易进近灯光",
                    "allowthetakeoffandlanding":"/",
                    "modelcanhandle":"AIRBUSA320-214 SHARKLETS,AIRBUSA320-214,BOEING737-800 WINGLETS,BOEING767-300,AIRBUSA321-211 SHARKLETS,BOEING737-800,JET,AIRBUSA321-231 SHARKLETS,737,AIRBUSA320-232,BOEING737-700,AIRBUSA321-231,AIRBUSA330-243E,AIRBUSA320-233,BOEING737-900,AIRBUSA319-133,AIRBUSA320-232 SHARKLETS,AIRBUSA319-131,AIRBUSA319-133 SHARKLETS,BOEING737-700 WINGLETS,BOEING787-8,AIRBUSA320-271N (NEO),AIRBUSA330-323E,AIRBUSA319-115,AIRBUSA319-132 SHARKLETS,BOMBARDIER (CANADAIR)CRJ900LR,AIRBUSA319-115 SHARKLETS,BOMBARDIER (CANADAIR)CRJ900LR ENHANCED,738,320,EMBRAERE190 LR,AIRBUSA319-132,AIRBUSA330-343E,BOEING747-8I,BOEING787-9,319",
                    "runwayarticlenumber":"3",
                    "airportshuttlemetro":"有",
                    "airportbus":"有",
                    "distancefromdowntown":"19公里",
                    "intheflight":"887",
                    "international":"0",
                    "internationaltime":"2017-09-08",
                    "domestic":"122",
                    "intheport":null,
                    "intheflighttime":"2017-09-14",
                    "membershipgroup":"重庆机场集团有限公司",
                    "planepositionnumber":"209",
                    "departuretime":"1990-01-22",
                    "operator":"否",
                    "operatorinput":null,
                    "isrewardpolicy":"否",
                    "isrewardpolicytext":"",
                    "passengerThroughputs":null,
                    "goodsThroughputs":null,
                    "takeOffAndLandingFlights":null,
                    "years":null,
                    "runwayList":null,
                    "rewardPolicyList":null,
                    "opinions":null,
                    "compenys":null
                }
            ]*/
            if(this.ndetailData.airportForSchedulines && this.ndetailData.airportForSchedulines.length>0){
                for(let item of this.ndetailData.airportForSchedulines){
                    this.schedList.push(item.airlnCd);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .plan-wrapper{
        right:0;
        width:100%;
        box-sizing:border-box;
        color:#605E7C;
        background-color:#fff;
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
            margin-top:30px;
            height:20px;
            line-height:20px;
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
    .table-form{
        width:100%;
        box-sizing:border-box;
        padding: 40px 50px 0 50px;
        flex-wrap: wrap;
        display: flex;
        .flyicon{
            display: inline-block;
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
        margin-bottom:0;
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
            .airplace{
                margin-top:20px;
                >div:nth-of-type(2){
                    height:45px;
                    font-size: 1.8rem;
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
    .extend-sched{
        position: absolute;
        left:30px;
        top:25px;
        width:200px;
        height:auto !important;
        padding:10px;
        border-radius: 4px ;
        box-shadow:0 2px 11px rgba(96,94,124,.37);
    }
</style>
