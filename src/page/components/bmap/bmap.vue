<template>
    <div id="map-warp"></div>
</template>

<script>
    import echarts from 'echarts';
    import '../../../static/js/bmap.js';
    import * as vx from 'vuex';
    import bmapExamples from './bmapExamples.js';
    import tabulationBoxTrigger from "$src/public/js/tabulationBoxTrigger.js";
    import {sy,zs,i1,i2,i3,i4,i5,i6,i7,planePath2} from "./bmapResources";

    export default {
        data() {
            return {}
        },
        props: ['allDot','mapCode'],
        watch: {
            close: function () {
                let infMesBox = document.getElementById('inf-mes-box');
                infMesBox.style.display = 'none';
            }
        },
        computed: {
            ...vx.mapGetters([
                'c_updated',
                'airList',
                'cityList',
                'close',
                'routeNetwork',
                'role',
                'demandList'
            ]),
        },
        mounted: function () {
            let ar = [];
            this.routeNetwork.forEach((v)=>{
                let selAir = this.$airMes(this.airList,v.dptIata);
                let ourAir = this.$airMes(this.airList,v.arrvIata);
                ar.push({
                    fromName:selAir.cityName,
                    toName:ourAir.cityName,
                    coords:[[selAir.cityCoordinateJ,selAir.cityCoordinateW],[ourAir.cityCoordinateJ,ourAir.cityCoordinateW]]
                })
            });
            let a = [], // 航线需求列表
                d = [], // 我发出的需求 -无
                b = [], // 我的需求 -有
                y = [], // 全部圆形
                code, // 三字码
                type, // 需求类型 0 = 航线需求，1 = 运力需求，2 = 航线需求和运力需求，3 = 我的需求
                network = {
                    "name": "routeNetwork",
                    "type": "lines",
                    "coordinateSystem": "bmap",
                    "zlevel": 10,
                    "lineStyle": {
                        "normal": {"color": "#336BEA", "width": 1, "opacity": 0.4, "curveness": 0.2}
                    },
                    "data": ar
                };
            this.allDot.forEach((v) => {
                let mes = this.$airMes(this.airList, v.dpt);
                y.push({
                    name: v.cityName,
                    value: [v.cityCoordinateJ, v.cityCoordinateW],
                    symbol: 'circle',
                    symbolOffset: [0, 0],
                    mes,
                    label:{
                        normal:{
                            formatter: [
                                `{a|${mes.cityName}}`,
                                `{b|需求量：}{b1|${v.num}}`,
                                `{b|我的发布：}{b1|${v.myNum}}`,
                            ].join('\n'),
                            rich: {
                                a: {
                                    fontFamily: 'Microsoft YaHei',
                                    color: 'white',
                                    fontSize:14,
                                    lineHeight: 40,
                                    align:"center"
                                },
                                b: {
                                    fontFamily: 'Microsoft YaHei',
                                    color: 'white',
                                    align:"center",
                                    lineHeight: 25,
                                    fontSize:12,
                                },
                                 b1: {
                                    fontFamily: 'Microsoft YaHei',
                                    color: '#3c78ff',
                                     align:"center",
                                     lineHeight: 25,
                                    fontSize:12,
                                     fontWeight:"bold"
                                }
                            }
                        }
                    }
                })
            });
            this.myChart = echarts.init(document.getElementById('map-warp'));
            let option = {
                "bmap": {
                    "center": ["110.47", "32.40"], //
                    "zoom": 6,
                    "color": "red",
                    "roam": "true",
                    "type": 'bmap',
                    "mapStyle": zs
                },
                legend: {
                    show:false,
                    data: ['routeNetwork'],
                    textStyle: {
                        color: '#fff'
                    },
                    selectedMode: 'multiple',
                    selected:{
                        'routeNetwork':false
                    }
                },
                "tooltip": {
                    trigger: function () {
                        return '';
                    }
                },
                "series": [
                    {
                        'name': 'a',
                        "type": "scatter",
                        "coordinateSystem": "bmap",
                        "data": y,
                        "zlevel": 10,
                        "symbolSize": 120,
                        "label": {
                            "normal": {
                                "show": true,
                                color: 'white',
                                "formatter": function (v) {
                                    return '';
                                },
                                offset: [0, -2]

                            },
                            "emphasis": {"show": false},
                        },
                        "itemStyle": {
                            normal:{
                                "color":"#fdbc22"
                            }

                        }
                    },
                    network
                ]
            };
            this.myChart.setOption(option);
            let _this = this;
            tabulationBoxTrigger.$on('routeNetwork',function (v) {
                if(!v){  // 打开航线网络图
                    _this.myChart.dispatchAction({
                        type: 'legendSelect',
                        name:"routeNetwork"
                    })
                }else{
                    _this.myChart.dispatchAction({
                        type: 'legendUnSelect',
                        name:"routeNetwork"
                    })
                }
            });
            this.$bExample.setmap(this.myChart.getModel().getComponent('bmap').getBMap());
            this.$bExample.setallNum(a);
            this.$bExample.init();
            this.myChart.on('click', (a) => {
                setTimeout(() => {  // 展开机场信息列表
                    tabulationBoxTrigger.$emit('tipBox',a.data.mes.code);
                    let infMesBox = document.getElementById('inf-mes-box');
                    infMesBox.style.left = `${a.event.offsetX + 30}px`;
                    infMesBox.style.top = `${a.event.offsetY}px`;
                    infMesBox.style.display = 'block';
                }, 50);
                tabulationBoxTrigger.$emit('setCode',a.data.mes.code);
            })
        }
    }
</script>
<style>
    #map-warp {
        width: 100%;
        height: 100%;
    }
</style>
