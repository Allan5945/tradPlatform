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
            return {
                code:""
            }
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
                'demandList',
                'demandType'
            ]),
        },
        mounted: function () {
            let point= [],ar = [],enmap = {},enmapName = [];
            for(let key in this.routeNetwork){
                let er = [];
                this.routeNetwork[key].forEach((v)=>{
                    let selAir = this.$airMes(this.airList,v.dptIata);
                    let ourAir = this.$airMes(this.airList,v.arrvIata);
                    er.push({
                        fromName:selAir.cityName,
                        toName:ourAir.cityName,
                        coords:[[selAir.cityCoordinateJ,selAir.cityCoordinateW],[ourAir.cityCoordinateJ,ourAir.cityCoordinateW]]
                    })
                });

                network = {
                    "name": `${key}lines`,
                    "type": `lines`,
                    "coordinateSystem": "bmap",
                    "zlevel": 8,
                    "lineStyle": {
                        "normal": {"color": "#336BEA", "width": 1, "opacity": 0.4, "curveness": 0.2}
                    },
                    "data": er
                };
                enmap[key + 'lines'] = false;
                enmapName.push(`${key}lines`);
                ar.push(network);
            }
            this.airList.forEach(data =>{
                point.push( {
                    name: data.cityName,
                    value: [data.cityCoordinateJ,data.cityCoordinateW],
                    symbol: 'circle',
                    symbolSize: 4,
                    symbolOffset: [0, 0]
                })
            });
            let a = [], // 航线需求列表
                d = [], // 我发出的需求 -无
                b = [], // 我的需求 -有
                y = [], // 我的发布
                e = [], // 市场需求
                code, // 三字码
                type, // 需求类型 0 = 航线需求，1 = 运力需求，2 = 航线需求和运力需求，3 = 我的需求
                network = {
                    "name": "routeNetwork",
                    "type": "lines",
                    "coordinateSystem": "bmap",
                    "zlevel": 8,
                    "lineStyle": {
                        "normal": {"color": "#336BEA", "width": 1, "opacity": 0.4, "curveness": 0.2}
                    },
                    "data": ar
                },
                allPoint = {
                    "name": "allPoint",
                    "type": "scatter",
                    "coordinateSystem": "bmap",
                    "zlevel": 8,
                    itemStyle:{
                        normal:{
                            color:"#90aae3"
                        }
                    },
                    hoverAnimation:false,
                    cursor:"default",
                    "data": point
                }
            ;
            this.allDot.forEach((v) => {
                let mes = this.$airMes(this.airList, v.dpt);
                y.push({
                    name: v.cityName,
                    value: [v.cityCoordinateJ, v.cityCoordinateW],
                    symbol: 'circle',
                    symbolOffset: [0, 0],
                    mes,
                    type:4,
                    label:{
                        normal:{
                            formatter: [
                                // `{b|需求量：}{b1|${v.num}}`,
                                `{b|我的\n发布}{b1|${v.myNum}}`,
                                `{a|${mes.allData.airlnCd}}`,
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
                                    align:"left",
                                    lineHeight: 15,
                                    fontSize:12,
                                    position:'relative',
                                    verticalAlign:'middle'
                                },
                                 b1: {
                                     fontFamily: 'Microsoft YaHei',
                                     color: '#3c78ff',
                                     lineHeight: 15,
                                     fontSize:20,
                                     fontWeight:"bold",
                                     verticalAlign:'top',
                                     padding:[0,0,-13,10]
                                }
                            }
                        }
                    }
                });
                e.push({
                    name: v.cityName,
                    value: [v.cityCoordinateJ, v.cityCoordinateW],
                    symbol: 'circle',
                    symbolOffset: [0, 0],
                    mes,
                    type:4,
                    label:{
                        normal:{
                            formatter: [
                                `{b|市场\n需求}{b1|${v.num}}`,
                                `{a|${mes.allData.airlnCd}}`,
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
                                    align:"left",
                                    lineHeight: 15,
                                    fontSize:12,
                                    position:'relative',
                                    verticalAlign:'middle'
                                },
                                b1: {
                                    fontFamily: 'Microsoft YaHei',
                                    color: '#3c78ff',
                                    lineHeight: 15,
                                    fontSize:20,
                                    fontWeight:"bold",
                                    verticalAlign:'top',
                                    padding:[0,0,-13,10]
                                }
                            }
                        }
                    }
                });

                let obj = v.obj.split(',');
                let demandType = v.demandType == null ? [] : v.demandType.split(',');  // 需求类型数组
                let quantity = '';
                let cityIcao = mes.cityIcao;
                let coor = [mes.cityCoordinateJ,mes.cityCoordinateW];
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
                            mes,
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
                            mes,
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
                        mes,
                        type,
                        label:{
                            normal:{
                                formatter: [
                                    `{a|${v.num}}`
                                ].join('\n'),
                                rich: {
                                    a: {
                                        fontFamily: 'Microsoft YaHei',
                                        color: 'white',
                                        fontSize:12,
                                        lineHeight: 40,
                                        align:"center"
                                    }
                                }
                            }
                        },
                        symbolOffset: [0, -25],
                        num: v.num
                    };
                    if (quantity != '') {
                        a.push(_a);
                    }
                }
            });
            this.myChart = echarts.init(document.getElementById('map-warp'));
            let paoOrTag = this.role.viewMode === 0 ? true : false;

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
                    data: ['allPoint','pao','tags',...enmapName],
                    textStyle: {
                        color: '#fff'
                    },
                    selectedMode: 'multiple',
                    selected:{
                        // 'routeNetwork':false,
                        'allPoint':false,
                        'pao':paoOrTag && this.demandType,
                        'tags':!paoOrTag,
                        'paomyself':paoOrTag && !this.demandType,
                        ...enmap
                    }
                },
                "tooltip": {
                    formatter:'{b}'
                },
                "series": [
                    {
                        'name': 'paomyself',
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
                    {
                        'name': 'pao',
                        "type": "scatter",
                        "coordinateSystem": "bmap",
                        "data": e,
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
                    {
                        'name': 'tags',
                        "type": "scatter",
                        "coordinateSystem": "bmap",
                        "data": a,
                        "symbolSize": 50,
                        "zlevel": 10,
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
                        'name': 'tags',
                        "type": "scatter",
                        "coordinateSystem": "bmap",
                        "data": d,
                        zlevel:11,
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
                        'name': 'tags',
                        "type": "effectScatter",
                        "coordinateSystem": "bmap",
                        "data": b,
                        "symbolSize": 500,
                        zlevel:10,
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
                    allPoint,
                    ...ar
                ]
            };
            this.myChart.setOption(option);
            let _this = this;
            tabulationBoxTrigger.$on('routeNetwork',function ([v,code] = [...data]) {
                if(!v){
                    _this.code = code;
                    for (let key in enmap){
                        _this.myChart.dispatchAction({
                            type: 'legendUnSelect',
                            name:key
                        })
                    };
                }else{
                    _this.code = "";
                }

                if(!v){  // 打开航线网络图
                    _this.myChart.dispatchAction({
                        type: 'legendSelect',
                        name:`${code}lines`
                    })
                }else{
                    _this.myChart.dispatchAction({
                        type: 'legendUnSelect',
                        name:`${code}lines`
                    })
                }

            });
            tabulationBoxTrigger.$on('allPoint',function (v) {
                if(!v){  // 打开航线网络图
                    _this.myChart.dispatchAction({
                        type: 'legendSelect',
                        name:"allPoint"
                    })
                }else{
                    _this.myChart.dispatchAction({
                        type: 'legendUnSelect',
                        name:"allPoint"
                    })
                }
            });
            tabulationBoxTrigger.$on('paoOrTag',function (v) {
                _this.myChart.dispatchAction({
                    type: 'legendUnSelect',
                    name:"paomyself"
                });
                _this.myChart.dispatchAction({
                    type: 'legendUnSelect',
                    name:"pao"
                });
                let name = 'pao';
                if(!_this.demandType){
                    name = "paomyself";
                }
                if(v){  // 触发图标模式或者气泡模式
                    _this.myChart.dispatchAction({
                        type: 'legendSelect',
                        name
                    });
                    _this.myChart.dispatchAction({
                        type: 'legendUnSelect',
                        name:"tags"
                    })
                }else{
                    _this.myChart.dispatchAction({
                        type: 'legendSelect',
                        name:"tags"
                    })
                }
            });
            this.$bExample.setmap(this.myChart.getModel().getComponent('bmap').getBMap());
//            this.$bExample.setallNum(a);
            this.$bExample.init();
            this.myChart.on('click', (a) => {
                if(a.seriesName === "allPoint" || a.seriesName.includes("lines"))return;
                if(a.data.type != 1){
                    setTimeout(() => {  // 展开机场信息列表
                        tabulationBoxTrigger.$emit('tipBox',[a.data.mes.code,a.data.mes.code === this.code]);
                        let infMesBox = document.getElementById('inf-mes-box');
                        let caseBox = document.getElementById('case');
                        infMesBox.style.left = `${a.event.offsetX + 30}px`;
                        infMesBox.style.top = `${a.event.offsetY}px`;
                        infMesBox.style.display = 'block';
                        let lf = caseBox.clientWidth - infMesBox.clientWidth - 50;
                        if(a.event.offsetX > lf){
                            infMesBox.style.left = `${lf}px`;
                        };
                        let tp = caseBox.clientHeight - infMesBox.clientHeight - 100;
                        if(a.event.offsetY > tp){
                            infMesBox.style.top = `${tp}px`;
                        };
                    }, 50);
                }
                if(a.data.type == 3){  // 我发布的
                    tabulationBoxTrigger.$emit("tagModel",1)
                }else if(a.data.type == 1 || a.data.type == 0){  // 市场需求
                    tabulationBoxTrigger.$emit("tagModel",0)
                }
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
