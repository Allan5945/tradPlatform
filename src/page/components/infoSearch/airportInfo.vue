<template>
    <div class="info-wrapper">
        <div class="airport-info">
            <div class="hide-box"></div>
            <div class="top">
                <div class="name">{{myData.airlnCd}} {{myData.icao}}/{{myData.iata}}</div>
                <div class="icon" @click="close"><span class="iconfont">&#xe62c;</span></div>
            </div>
            <div class="content" v-if="dataShow">
                <div class="detail">
                    <div class="box">
                        <div class="box-til"><span class="iconfont">&#xe627;</span>基本信息</div>
                        <ul class="box-item">
                            <li>
                                <div>机场基准点坐标及其在机场的位置</div>
                                <div>{{infoData.airportLocation.airportcoordinatesorattheairport||'-'}}</div>
                            </li>
                            <li>
                                <div>与城市的位置关系</div>
                                <div>{{infoData.airportLocation.citylocation||'-'}}</div>
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
                                <div>{{infoData.airportLocation.natureoftheairportorairfieldindicators||'-'}}</div>
                            </li>
                            <li class="li-note">
                                <div>备注</div>
                                <div>{{infoData.airportLocation.note||'-'}}</div>
                            </li>
                            <li class="li-note">
                                <div>机场管理部门、地址、电话、地址</div>
                                <div>{{infoData.airportLocation.airpormanagementdepartmentinfo||'-'}}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="box">
                        <div class="box-til"><span class="iconfont">&#xe625;</span>地勤服务</div>
                        <ul class="box-item">
                            <li>
                                <div>货物装卸设施</div>
                                <div>{{infoData.groundServices.cargohandlingfacilities||'-'}}</div>
                            </li>
                            <li>
                                <div>燃油、滑油牌号</div>
                                <div>{{infoData.groundServices.thefueloroilbrand||'-'}}</div>
                            </li>
                            <li>
                                <div>加油设施/能力</div>
                                <div>{{infoData.groundServices.refuelingfacilitiesorability||'-'}}</div>
                            </li>
                            <li>
                                <div>除冰设施</div>
                                <div>{{infoData.groundServices.deicingfacilities||'-'}}</div>
                            </li>
                            <li>
                                <div>过站航空器机库</div>
                                <div>{{infoData.groundServices.standingaircrafthangar||'-'}}</div>
                            </li>
                            <li>
                                <div>过站航空器维修设施</div>
                                <div>{{infoData.groundServices.inaircraftmaintenancefacilities||'-'}}</div>
                            </li>
                            <li class="li-note">
                                <div>备注</div>
                                <div>{{infoData.groundServices.note||'-'}}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="box">
                        <div class="box-til"><span class="iconfont">&#xe629;</span>消防救援</div>
                        <ul class="box-item">
                            <li>
                                <div>机场消防等级</div>
                                <div>{{infoData.rescue.airportfirerating||'-'}}</div>
                            </li>
                            <li>
                                <div>搬移受损航空器的能力</div>
                                <div>{{infoData.rescue.abilitytomovethedamagedaircraft||'-'}}</div>
                            </li>
                            <li class="li-note">
                                <div>救援设备</div>
                                <div>{{infoData.rescue.rescuefacilities||'-'}}</div>
                            </li>
                            <li class="li-note">
                                <div>备注</div>
                                <div>{{infoData.rescue.note||'-'}}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="box">
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
                                <div>{{infoData.apronTaxiway.airfieldpavementandintensity||'-'}}</div>
                            </li>
                            <li class="li-note">
                                <div>滑行道宽度、道面和强度</div>
                                <div>{{infoData.apronTaxiway.taxiwaywidthpavementandstrength||'-'}}</div>
                            </li>
                            <li class="li-note">
                                <div>备注</div>
                                <div>{{infoData.apronTaxiway.note||'-'}}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="box">
                        <div class="box-til"><span class="iconfont">&#xe626;</span>跑道特征</div>
                        <div class="table">
                            <ul class="t-head">
                                <li>跑道编号</li>
                                <li>真方位和磁方位</li>
                                <li>跑道长宽(m)</li>
                                <li>跑道强度(PCN) 跑道/停止面道面</li>
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
                                <div>{{infoData.physical[0].rek||'-'}}</div>
                            </li>
                            <li class="li-note">
                                <div>跑道坡度</div>
                                <div>{{infoData.physical[0].runwayslope||'-'}}</div>
                            </li>
                        </ul>
                        <div class="table">
                            <ul class="t-head">
                                <li>跑道编号</li>
                                <li>可用起飞滑道距离(m)</li>
                                <li>可用起飞距离(m)</li>
                                <li>可用加速停止距离</li>
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
                    <div class="box">
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
                    </div>
                     <div class="box">
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
                        <li><span class="point"></span><span class="iconfont">&#xe627;</span>机场位置</li>
                        <li><span class="iconfont">&#xe625;</span>地勤服务</li>
                        <li><span class="iconfont">&#xe629;</span>消防救援</li>
                        <li style="width:210px;"><span class="iconfont">&#xe657;</span>停机坪、滑行道及矫正位置数据</li>
                        <li><span class="iconfont">&#xe626;</span>跑道特征</li>
                        <li><span class="iconfont">&#xe6ef;</span>进近灯光</li>
                        <li><span class="iconfont">&#xe669;</span>飞行程序</li>
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
                infoData:{},
                dataShow:false
            }
        },
        props:['myData'],
        computed:{

        },
        methods: {
            close(){
                this.$emit('closeDetail');
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
        z-index: 20;
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
                >div:first-of-type{
                    width:230px;
                    color:rgba(96, 94, 124, 0.7);
                    padding-right:10px;
                    text-align:right;
                }
                >div:last-of-type{
                    width:270px;
                    font-size:1.4rem;
                    padding-left:10px;
                    overflow : hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
            }
            .li-note{
                width:100%;
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
            border-bottom:2px solid #3c78ff;
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
    }
</style>
