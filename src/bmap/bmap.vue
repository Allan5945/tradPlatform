<template>
    <div id="map-warp"></div>
</template>

<script>
    import echarts from 'echarts';
    import '../static/js/bmap.js';
    import * as vx from 'vuex';
    import bmapExamples from './bmapExamples.js';
    import tabulationBoxTrigger from "$src/public/js/tabulationBoxTrigger.js";
    import {sy,zs,i1,i2,i3,i4,i5,i6,i7,planePath2} from "$src/bmap/bmapResources.js";

    export default {
        data() {
            return {}
        },
        props: ['allDot'],
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
                'close'
            ]),
        },
        mounted: function () {
            tabulationBoxTrigger.$on('routeNetwork',function (v) {
                if(!v){  // 打开航线网络图

                }
            });
            let a = [], // 航线需求列表
                d = [], // 我发出的需求 -无
                b = [], // 我的需求 -有
                code, // 三字码
                type; // 需求类型 0 = 航线需求，1 = 运力需求，2 = 航线需求和运力需求，3 = 我的需求
            this.allDot.forEach((v) => {
                let mes = this.$cityMes(this.cityList, v.dpt);
                let obj = v.obj.split(',');
                let demandType = v.demandType == null ? [] : v.demandType.split(',');  // 需求类型数组
                let quantity = '';
                let cityIcao = mes.cityIcao;
                let coor = mes.cityCoordinate.split(',');
                code = v.dpt;
                let qfType = false;
                let demand = {
                    tag: '',
                    dbSize: 16
                };
                let pj = ()=>{
                    if (demandType.indexOf('0') != -1 && demandType.indexOf('1') != -1) {
                        quantity = i1;
                        type = 2;
                    } else if (demandType.indexOf('0') != -1) {
                        type = 0;
                        if (v.num == 0) {
                            quantity = i2;
                        } else {
                            quantity = i3;
                        }
                    } else if (demandType.indexOf('1') != -1) {
                        type = 1;
                        if (v.num == 0) {
                            quantity = i4;
                        } else {
                            quantity = i5;
                        }
                    }
                };
                if (obj.indexOf('1') != -1 && obj.indexOf('0') != -1) {
                    demand.tag = i6;
                    demand.dbSize = 16;
                    qfType = true;
                    pj();
                } else if (obj.indexOf('0') != -1) { // 我发出的需求
                    demand.tag = i6;
                    demand.dbSize = 16;
                    qfType = true;
                } else if (obj.indexOf('1') != -1) {  // 别人发出的需求
                    demand.tag = i7;
                    demand.dbSize = 6;
                    pj();
                }
                if (
                    v.cityCoordinateJ != null &&
                    v.cityCoordinateW != null &&
//                    v.demandType != null &&
//                    v.newInfo != null &&
                    v.num != null &&
                    v.obj != null
                ) {
                    // 需求列表数据
                    let _d, // 无数据
                        _b; // 有新数据，自己发出
                    if (v.newInfo == 0) {
                        _b = {
                            name: mes.cityName,
                            value: [coor[0], coor[1]],
                            symbol: demand.tag,
                            symbolSize: demand.dbSize,
                            symbolOffset: [0, 0],
                            cityIcao,
                            code,
                            qfType,
                            type: 3,
                            num: v.num
                        };
                        b.push(_b);
                    } else {
                        _d = {
                            name: mes.cityName,
                            value: [coor[0], coor[1]],
                            symbol: demand.tag,
                            symbolSize: demand.dbSize,
                            symbolOffset: [0, 0],
                            code,
                            cityIcao,
                            qfType,
                            type: 3,
                            num: v.num
                        };
                        d.push(_d);
                    }
                    // 航线需求列表
                    let _a = {
                        name: mes.cityName,
                        value: [coor[0], coor[1]],
                        symbol: quantity,
                        symbolSize: 40,
                        code,
                        cityIcao,
                        qfType,
                        type,
                        symbolOffset: [0, -25],
                        num: v.num
                    };
                    if (quantity != '') {
                        a.push(_a);
                    }
                }
            });
            this.myChart = echarts.init(document.getElementById('map-warp'));
            let option = {
                "bmap": {
                    "center": ["110.47", "32.40"], //
                    "zoom": 6,
                    "color": "red",
                    "roam": "move",
                    "type": 'bmap',
                    "mapStyle": zs
                },
                "tooltip": {
                    trigger: function () {
                        return '';
                    }
                },
                legend:{
                    data:[{name:''}]
                },
                "series": [
                    {
                        'name': 'a',
                        "type": "scatter",
                        "coordinateSystem": "bmap",
                        "data": a,
                        "symbolSize": 50,
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
                            "emphasis": {
                                "borderColor": "#fff", "borderWidth": 1
                            }
                        }
                    },
                    {
                        'name': 'd',
                        "type": "scatter",
                        "coordinateSystem": "bmap",
                        "data": d,
                        "symbolSize": 50,
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
                            "emphasis": {
                                "borderColor": "#fff", "borderWidth": 1
                            }
                        }
                    },
                    {
                        'name': 'b',
                        "type": "effectScatter",
                        "coordinateSystem": "bmap",
                        "data": b,
                        "symbolSize": 500,
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
                            "emphasis": {
                                "borderColor": "#fff", "borderWidth": 1
                            }
                        }
                    },
                ]
            };
            this.myChart.setOption(option);
            this.$bExample.setmap(this.myChart.getModel().getComponent('bmap').getBMap());
            this.$bExample.setallNum(a);
            this.$bExample.init();
            this.myChart.on('click', (a) => {
                let type = 0; // 1 查询选择机场中由当前用户提出的需求 || 0 查询选择机场的所有需求
                if (a.data.type == 3) {
                    if (a.data.qfType) {
                        type = 1;
                    } else {
                        type = null;
                    }
                    setTimeout(() => {
                        let infMesBox = document.getElementById('inf-mes-box');
                        infMesBox.style.left = `${a.event.offsetX + 30}px`;
                        infMesBox.style.top = `${a.event.offsetY}px`;
                        infMesBox.style.display = 'block';
                    }, 50);
                }
                ;
                if (type != null) {
                    this.$ajax({
                        url: "/getDemandsForCurrentCheckedCity",
                        method: 'post',
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded'
                        },
                        params: {
                            itia: a.data.code,
                            page: 1,
                            type: type,
                            itiaType: 2
                        }
                    }).then((response) => {
                        if (response.data) {
                            this.$store.dispatch('monoData', {v: response.data.list, t: 1}).then(() => {
                            });
                        }
                    })
                        .catch((error) => {
                            console.log(error);
                        });
                }
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
