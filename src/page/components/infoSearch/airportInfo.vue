<template>
    <div class="info-wrapper">
        <div class="airport-info">
            <div class="hide-box"></div>
            <div class="top">
                <div class="name">{{myData.airlnCd}} {{myData.icao}}/{{myData.iata}}</div>
                <div class="icon" @click="close"><span class="iconfont">&#xe62c;</span></div>
            </div>
            <div class="content" v-if="dataShow" id="content">
                <div class="detail">
                    <div class="box" id="step1">
                        <div class="box-til"><span class="iconfont">&#xe627;</span>基本信息</div>
                        <ul class="box-item">
                            <li>
                                <div>机场基准点坐标及其在机场的位置</div>
                                <div @mouseover="overflowShow = true" @mouseout="overflowShow = false" class="over-flow">{{infoData.airportLocation.airportcoordinatesorattheairport||'-'}}</div>
                                <div class="list-wrapper" v-show='overflowShow' @mouseover="overflowShow = true" @mouseout="overflowShow = false">{{infoData.airportLocation.airportcoordinatesorattheairport||'-'}}</div>
                            </li>
                            <li>
                                <div>与城市的位置关系</div>
                                <div @mouseover="overflowShow1 = true" @mouseout="overflowShow1 = false" class="over-flow">{{infoData.airportLocation.citylocation||'-'}}</div>
                                <div class="list-wrapper" v-show='overflowShow1' @mouseover="overflowShow1 = true" @mouseout="overflowShow1 = false">{{infoData.airportLocation.citylocation||'-'}}</div>
                            </li>
                            <li>
                                <div>机场标高/基准温度</div>
                                <div>{{infoData.airportLocation.airportelevationorreferencetemperature||'-'}}</div>
                            </li>
                            <li>
                                <div>机场标高位置/高程异常</div>
                                <div>{{infoData.airportLocation.airportelevationorheightanomaly||'-'}}</div>
                            </li>
                            <li>
                                <div>磁差/年变率</div>
                                <div>{{infoData.airportLocation.variationorannualvariationrate||'-'}}</div>
                            </li>
                            <li>
                                <div>机场开放时间</div>
                                <div>{{infoData.airportLocation.openinghoursattheairport||'-'}}</div>
                            </li>
                            <li>
                                <div>允许飞行种类</div>
                                <div>{{infoData.airportLocation.allowedtoflyspecies||'-'}}</div>
                            </li>
                            <li>
                                <div>机场性质/飞行区指标</div>
                                <div @mouseover="overflowShow2 = true" @mouseout="overflowShow2 = false" class="over-flow">{{infoData.airportLocation.natureoftheairportorairfieldindicators||'-'}}</div>
                                <div class="list-wrapper" v-show='overflowShow2' @mouseover="overflowShow2 = true" @mouseout="overflowShow2 = false">{{infoData.airportLocation.natureoftheairportorairfieldindicators||'-'}}</div>
                            </li>
                            <li class="li-note">
                                <div>备注</div>
                                <div>{{infoData.airportLocation.note||'-'}}</div>
                            </li>
                            <li class="li-note">
                                <div>机场管理部门、地址、电话、地址</div>
                                <div class="over-oneline">{{infoData.airportLocation.airpormanagementdepartmentinfo||'-'}}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="box" id="step2">
                        <div class="box-til"><span class="iconfont">&#xe625;</span>地勤服务</div>
                        <ul class="box-item">
                            <li>
                                <div>货物装卸设施</div>
                                <div @mouseover="overflowShow3 = true" @mouseout="overflowShow3 = false" class="over-flow">{{infoData.groundServices.cargohandlingfacilities||'-'}}</div>
                                <div class="list-wrapper" v-show='overflowShow3' @mouseover="overflowShow3 = true" @mouseout="overflowShow3 = false">{{infoData.groundServices.cargohandlingfacilities||'-'}}</div>
                            </li>
                            <li>
                                <div>燃油、滑油牌号</div>
                                <div>{{infoData.groundServices.thefueloroilbrand||'-'}}</div>
                            </li>
                            <li>
                                <div>加油设施/能力</div>
                                <div @mouseover="overflowShow4 = true" @mouseout="overflowShow4 = false" class="over-flow">{{infoData.groundServices.refuelingfacilitiesorability||'-'}}</div>
                                <div class="list-wrapper" v-show='overflowShow4' @mouseover="overflowShow4 = true" @mouseout="overflowShow4 = false">{{infoData.groundServices.refuelingfacilitiesorability||'-'}}</div>
                            </li>
                            <li>
                                <div>除冰设施</div>
                                <div  @mouseover="overflowShow7 = true" @mouseout="overflowShow7 = false" class="over-flow">{{infoData.groundServices.deicingfacilities||'-'}}</div>
                                 <div class="list-wrapper" v-show='overflowShow7' @mouseover="overflowShow7 = true" @mouseout="overflowShow7 = false">{{infoData.groundServices.deicingfacilities||'-'}}</div>
                            </li>
                            <li>
                                <div>过站航空器机库</div>
                                <div @mouseover="overflowShow6 = true" @mouseout="overflowShow6 = false" class="over-flow">{{infoData.groundServices.standingaircrafthangar||'-'}}</div>
                                <div class="list-wrapper" v-show='overflowShow6' @mouseover="overflowShow6 = true" @mouseout="overflowShow6 = false" style="height:230px;">{{infoData.groundServices.standingaircrafthangar||'-'}}</div>
                            </li>
                            <li>
                                <div>过站航空器维修设施</div>
                                <div @mouseover="overflowShow8 = true" @mouseout="overflowShow8 = false" class="over-flow">{{infoData.groundServices.inaircraftmaintenancefacilities||'-'}}</div>
                                 <div class="list-wrapper" v-show='overflowShow8' @mouseover="overflowShow8 = true" @mouseout="overflowShow8 = false">{{infoData.groundServices.inaircraftmaintenancefacilities||'-'}}</div>
                            </li>
                            <li class="li-note">
                                <div>备注</div>
                                <div>{{infoData.groundServices.note||'-'}}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="box" id="step3">
                        <div class="box-til"><span class="iconfont">&#xe629;</span>消防救援</div>
                        <ul class="box-item">
                            <li>
                                <div>机场消防等级</div>
                                <div>{{infoData.rescue.airportfirerating||'-'}}</div>
                            </li>
                            <li>
                                <div>搬移受损航空器的能力</div>
                                <div @mouseover="overflowShow5 = true" @mouseout="overflowShow5 = false" class="over-flow">{{infoData.rescue.abilitytomovethedamagedaircraft||'-'}}</div>
                                <div class="list-wrapper" v-show='overflowShow5' @mouseover="overflowShow5 = true" @mouseout="overflowShow5 = false">{{infoData.rescue.abilitytomovethedamagedaircraft||'-'}}</div>
                            </li>
                            <li class="li-note">
                                <div>救援设备</div>
                                <div class="over-oneline">{{infoData.rescue.rescuefacilities||'-'}}</div>
                            </li>
                            <li class="li-note">
                                <div>备注</div>
                                <div>{{infoData.rescue.note||'-'}}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="box" id="step4">
                        <div class="box-til"><span class="iconfont">&#xe657;</span>停机坪、滑行道及矫正位置数据</div>
                        <ul class="box-item">
                            <li>
                                <div>高度表校正点的位置及其标高</div>
                                <div>{{infoData.apronTaxiway.altimetercalibrationpointpositionandelevation||'-'}}</div>
                            </li>
                            <li>
                                <div>VOR/INS校正点</div>
                                <div>{{infoData.apronTaxiway.vororinscalibrationpoints||'-'}}</div>
                            </li>
                            <li class="li-note">
                                <div>停机坪道面和强度</div>
                                <div class="over-oneline">{{infoData.apronTaxiway.airfieldpavementandintensity||'-'}}</div>
                            </li>
                            <li class="li-note">
                                <div>滑行道宽度、道面和强度</div>
                                <div class="over-oneline">{{infoData.apronTaxiway.taxiwaywidthpavementandstrength||'-'}}</div>
                            </li>
                            <li class="li-note">
                                <div>备注</div>
                                <div>{{infoData.apronTaxiway.note||'-'}}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="box" id="step5">
                        <div class="box-til"><span class="iconfont">&#xe626;</span>跑道特征</div>
                        <div class="table">
                            <ul class="t-head">
                                <li>跑道编号</li>
                                <li>真方位和磁方位</li>
                                <li>跑道长宽(m)</li>
                                <li>跑道强度(PCN) 跑道/停止面道面</li>
                                <!-- <li>跑道入口坐标及高程异常(m/f)</li> -->
                                <li>跑道入口坐标及大地水准面波幅(m/f)</li>
                                <li>跑道入口标高和精密进近跑道接地带最高标高(m/f)</li>
                                <li>跑道坡度</li>
                                <li>停止道长宽(m)</li>
                                <li>净空道长宽(m)</li>
                                <li>升降道长宽(m)</li>
                                <li>跑道端安全区长宽(m)</li>
                                <li>无障碍物区(m)</li>
                            </ul>
                            <ul class="c-list" v-for="item in infoData.physical">
                                <li>{{item.runno||'-'}}</li>
                                <li>{{item.orientation||'-'}}</li>
                                <li>{{item.trackwidth||'-'}}</li>
                                <li>{{item.runwayintensity||'-'}}</li>
                                <li>{{item.runwayentrance||'-'}}</li>
                                <li>{{item.runwayelevation||'-'}}</li>
                                <li>{{item.runwayslope||'-'}}</li>
                                <li>{{item.runwaystoplongwidth||'-'}}</li>
                                <li>{{item.runwaynetlongwide||'-'}}</li>
                                <li>{{item.runwayliftingbeltwidth||'-'}}</li>
                                <li>{{item.runwayendofrunwaysafetyaspect||'-'}}</li>
                                <li>{{item.runwaynoobstaclearea||'-'}}</li>
                            </ul>
                        </div>
                        <ul class="box-item">
                            <li class="li-note">
                                <div>备注</div>
                                <div v-if='infoData.runwayRek'>{{infoData.runwayRek.physicalcharacteristicsofrunwayrek||'-'}}</div>
                                <div v-else>-</div>
                            </li>
                            <li class="li-note">
                                <div>跑道坡度</div>
                                <div>{{''||'-'}}</div>
                            </li>
                        </ul>
                        <div class="table">
                            <ul class="t-head">
                                <li>跑道编号</li>
                                <li>可用起飞滑道距离(m)</li>
                                <li>可用起飞距离(m)</li>
                                <li>可用加速停止距离(m)</li>
                                <li>可用着陆距离(m)</li>
                                <li>备注</li>
                            </ul>
                            <ul class="c-list" v-for="item in infoData.physical">
                                <li>{{item.runno||'-'}}</li>
                                <li>{{item.runwayavailable||'-'}}</li>
                                <li>{{item.runwaytakedistance||'-'}}</li>
                                <li>{{item.runwaystoppingdistance||'-'}}</li>
                                <li>{{item.runwaylandingdistance||'-'}}</li>
                                <li>{{item.rek||'-'}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="box" id="step6">
                        <div class="box-til"><span class="iconfont">&#xe6ef;</span>进近灯光</div>
                        <div class="table">
                            <ul class="t-head">
                                <li>跑道编号</li>
                                <li>进近灯光类型<br/>有否SFL<br/>长度<br/>强度</li>
                                <li>入口灯颜色<br/>翼排灯</li>
                                <li>坡度灯类型<br/>位置<br/>仰角<br/>MEHT</li>
                                <li>接地带灯长度</li>
                                <li>跑道中线灯长度、间隔、颜色、强度</li>
                                <li>跑道边灯长度、间隔、颜色、强度</li>
                                <li>跑道末端灯颜色</li>
                                <li>停止道灯长度<br/>颜色</li>
                            </ul>
                            <ul class="c-list" v-for="item in infoData.physical">
                                <li>{{item.runno||'-'}}</li>
                                <li>{{item.lengthintensity||'-'}}</li>
                                <li>{{item.lightcolor||'-'}}</li>
                                <li>{{item.lamptype||'-'}}</li>
                                <li>{{item.engthstriplights||'-'}}</li>
                                <li>{{item.runwaycenterlinelightslength||'-'}}</li>
                                <li>{{item.runwayedgelengthlamp||'-'}}</li>
                                <li>{{item.runwayat||'-'}}</li>
                                <li>{{item.stoplamplength||'-'}}</li>
                            </ul>
                        </div>
                         <ul class="box-item">
                            <li class="li-note">
                                <div>备注</div>
                                <div v-if="infoData.intensityRek">{{infoData.intensityRek.lengthintensityrek||'-'}}</div>
                                <div v-else>-</div>
                            </li>
                        </ul>
                    </div>
                    <div class="box" id="step7" style="margin-bottom:150px;">
                        <div class="box-til"><span class="iconfont">&#xe669;</span>飞行程序</div>
                        <ul class="box-item">
                            <li class="li-note">
                                <div>总则</div>
                                <div>-</div>
                            </li>
                            <li class="li-note">
                                <div>起落航线</div>
                                <div>-</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="sidebar">
                    <ul class="sidebar-list">
                        <li :class="{active:step =='1'}" @click="getStep(1)"><span class="point" v-show="step =='1'"></span><span class="iconfont">&#xe627;</span>机场位置</li>
                        <li :class="{active:step =='2'}" @click="getStep(2)"><span class="point" v-show="step =='2'"></span><span class="iconfont">&#xe625;</span>地勤服务</li>
                        <li :class="{active:step =='3'}" @click="getStep(3)"><span class="point" v-show="step =='3'"></span><span class="iconfont">&#xe629;</span>消防救援</li>
                        <li :class="{active:step =='4'}" style="width:210px;" @click="getStep(4)"><span class="point" v-show="step =='4'"></span><span class="iconfont">&#xe657;</span>停机坪、滑行道及矫正位置数据</li>
                        <li :class="{active:step =='5'}" @click="getStep(5)"><span class="point" v-show="step =='5'"></span><span class="iconfont">&#xe626;</span>跑道特征</li>
                        <li :class="{active:step =='6'}" @click="getStep(6)"><span class="point" v-show="step =='6'"></span><span class="iconfont">&#xe6ef;</span>进近灯光</li>
                        <li :class="{active:step =='7'}" @click="getStep(7)"><span class="point" v-show="step =='7'"></span><span class="iconfont">&#xe669;</span>飞行程序</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                overflowShow:false,
                overflowShow1:false,
                overflowShow2:false,
                overflowShow3:false,
                overflowShow4:false,
                overflowShow5:false,
                overflowShow6:false,
                overflowShow7:false,
                overflowShow8:false,
                infoData:{},
                dataShow:false,
                step:'1'
            }
        },
        props:['myData'],
        computed:{

        },
        watch:{
            'infoData.runwayRek.physicalcharacteristicsofrunwayrek':function(val){
                 if(val){
                    var r = new RegExp('备注：', "ig");
                    this.infoData.runwayRek.physicalcharacteristicsofrunwayrek = val.replace(r,'');
                }
            },
            'infoData.intensityRek.lengthintensityrek':function(val){
                if(val){
                    var r = new RegExp('备注：', "ig");
                    this.infoData.intensityRek.lengthintensityrek = val.replace(r,'');
                }
            }
        },
        methods: {
            close(){
                this.$emit('closeDetail');
            },
            getStep(i){
                this.step = i;
                let content = document.getElementById('content');
                let step1 = document.getElementById('step1'),
                    step2 = document.getElementById('step2'),
                    step3 = document.getElementById('step3'),
                    step4 = document.getElementById('step4'),
                    step5 = document.getElementById('step5'),
                    step6 = document.getElementById('step6'),
                    step7 = document.getElementById('step7');
                    if(i== '1'){
                        content.scrollTop = 0;
                    }else if(i== '2'){
                        content.scrollTop = 360;
                    }else if(i== '3'){
                        content.scrollTop = 630;
                    }else if(i== '4'){
                        content.scrollTop = 850;
                    }else if(i== '5'){
                        content.scrollTop = 1100;
                    }else if(i== '6'){
                        content.scrollTop = 4130;
                    }else if(i== '7'){
                        content.scrollTop = 6000;
                    }

            },
             onScroll () {
              let scrolled = document.documentElement.scrollTop || document.body.scrollTop
              // 手动获取到各个锚点的距离
              if (scrolled >= 1960) {
                this.steps.active = 5
              } else if (scrolled < 1960 && scrolled >= 1660) {
                this.steps.active = 4
              } else if (scrolled < 1660 && scrolled >= 1260) {
                this.steps.active = 3
              } else if (scrolled < 1260 && scrolled >= 960) {
                this.steps.active = 2
              } else if (scrolled < 960 && scrolled >= 560) {
                this.steps.active = 1
              } else {
                this.steps.active = 0
              }
            },
            getData(){
                this.$ajax({
                method: 'post',
                url: '/loadAirportInfomation',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                     iata :this.myData.icao
                    }
                })
                .then((response) => {
                    if(response.data.opResult == "0"){
                        this.infoData = response.data.obj;
                        this.dataShow = true;
                    }else{

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
  ul,li{
        list-style:none;
        padding:0;
        margin:0;
    }
    .hide-box{
        width:100%;
        height:70px;
        visibility:hidden;
    }
    .info-wrapper{
        position: fixed;
        width: 100%;
        height:100%;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.5);
        z-index: 99;
        .airport-info{
            position:absolute;
            left:0;
            top:0;
            right:0;
            bottom:0;
            margin:auto;
            width:1350px;
            height:800px;
            z-index: 99;
            color:#605e7c;
            background-color:#ffffff;
        }
    }
    .top{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:70px;
        background-color:#3c78ff;
        display:flex;
        justify-content: space-between;
        box-sizing:border-box;
        padding:0 25px 0 17px;
        color:#fff;
        .name{
            line-height:70px;
            font-size:1.8rem;
        }
        .icon{
            width:20px;
            height:20px;
            margin:25px 0;
            line-height:20px;
            color:#3c78ff;
            text-align:center;
            background-color:#fff;
            border-radius:100%;
            cursor:pointer;
            .iconfont{
                font-size:1.2rem;
            }
        }
    }
    .content{
        width:100%;
        height:730px;
        overflow:hidden;
        overflow-y:scroll;
        display:flex;
        .detail{
            width:1100px;
            margin-right:250px;
        }
    }
    .box{
        .box-til{
            height:50px;
            line-height:50px;
            font-size:1.6rem;
            font-weight:bold;
            margin:20px 0 0 26px;
            border-bottom:1px solid #ccc;
            display:flex;
            justify-content: start;
            .iconfont{
                font-size:2.8rem;
                font-weight:normal;
            }
        }
        .box-item{
            width:100%;
            box-sizing:border-box;
            padding:37px 60px 0 0;
            display:flex;
            flex-wrap: wrap;
            li{
                width:520px;
                display:flex;
                height:40px;
                line-height:40px;
                position:relative;
                >div:first-of-type{
                    width:230px;
                    color:rgba(96, 94, 124, 0.7);
                    padding-right:10px;
                    text-align:right;
                     line-height:40px;
                }
                >div:nth-of-type(2){
                    width:270px;
                    font-size:1.4rem;
                    line-height:40px;
                    padding-left:10px;
                    //font-weight:800;
                }
                .over-flow{
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                .over-oneline{

                }
            }
            .li-note{
                width:100%;
                height:auto !important;
                line-height:26px;
                 >div:last-of-type{
                    width:790px;
                }
            }
        }
    }
    .table{
        margin:20px 0 0 26px;
        border:1px solid #bfbfbf;
        ul{
            display:flex;
            li{
                flex:1;
                padding:30px 5px;
                text-align:center;
                border-right:1px dashed #bfbfbf;
            }
            li:last-of-type{
                border-right:0;
            }
        }
        ul:nth-of-type(odd){
            background-color:#f5f5f5;
        }
    }
    .sidebar{
        width:240px;
        position:absolute;
        bottom:112px;
        right:0;
    }
    .sidebar-list{
        width:220px;
        padding:0 10px;
        border-left:1px solid #ccc;
        li{
            height:42px;
            width:83px;
            line-height:42px;
            display:flex;
            font-size:1.3rem;
            box-sizing:border-box;
            cursor:pointer;
            position:relative;
            span{
                font-size:2.2rem;
            }
            .point{
                color: #3c78ff;
                position:absolute;
                left:-13px;
                bottom:-4px;
                display:block;
                width:5px;
                height:5px;
                line-height:2px;
                border-radius:100%;
                background-color: #3c78ff;
            }
        }
        .active{
             border-bottom:2px solid #3c78ff;
        }
    }
    .list-wrapper {
        position: absolute;
        top: 30px;
        left: 245px;
        display: flex;
        padding: 10px;
        width: 260px;
        height:120px;
        line-height:24px !important;
        background: white;
        border-radius: 4px;
        //box-shadow: 0 2px 11px rgba(96,94,124,0.37);
        z-index: 3;
        border:1px solid #E3E3E3;
        font-size:1.4rem;
    }
</style>
