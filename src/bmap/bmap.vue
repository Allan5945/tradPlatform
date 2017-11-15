<template>
    <div id="map-warp"></div>
</template>

<script>
    import echarts from 'echarts'
    import '../static/js/bmap.js'
    var planePath2 = 'path://M786.496 161.163l-3.537-3.507C713.308 88.89 617.627 46.381 511.992 46.381c-105.507 0-201.123 42.418-270.76 111.073l-3.926 3.911c-68.646 69.668-111.074 165.237-111.074 270.775 0 105.633 42.495 201.295 111.275 270.965l3.522 3.508 270.978 271.006 271.169-271.146 3.132-3.164c68.889-69.697 111.459-165.424 111.459-271.164C897.772 326.521 855.277 230.86 786.496 161.163L786.496 161.163zM512.008 541.766c-74.545 0-134.974-60.447-134.974-134.977 0-30.806 10.283-59.152 27.614-81.856 24.663-32.299 63.574-53.151 107.359-53.151 74.55 0 134.978 60.463 134.978 135.008C646.985 481.318 586.558 541.766 512.008 541.766L512.008 541.766zM512.008 541.766';

    export default {
        data () {
            return {
            }
        },
        mounted:function () {
            this.myChart = echarts.init(document.getElementById('map-warp'));
            var option={
                "bmap":{
                    "center":["110.47","32.40"],
                    "zoom":6,
                    "color":"red",
                    "roam":"move",
                    "type":'bmap',
                    "mapStyle":{
                        "styleJson":[{
                            "featureType":"water",  // 水
                            "elementType":"all",
                            "stylers":{
                                "color":"#d6d6d5",
                                "visibility":"on"
                            }
                        },
                            {
                                "featureType":"land",  // 陆地
                                "elementType":"all",
                                "stylers":{
                                    "color":"#f6f6f6",
                                    "visibility":"on"
                                }
                            },
                            {
                                "featureType":"boundary",  //边境线
                                "elementType":"all",
                                "stylers":{
                                    "color":"#bdbdbd",
                                    "visibility":"on"
                                }
                            },
                            {
                                "featureType":"arterial",
                                "elementType":"all",
                                "stylers":{
                                    "visibility":"off"
                                }
                            },
                            {
                                "featureType":"highway",
                                "elementType":"all",
                                "stylers":{
                                    "visibility":"off"
                                }
                            },
                            {
                                "featureType":"label",
                                "elementType":"all",
                                "stylers":{
                                    "visibility":"off"
                                }
                            }]
                    }
                },
                legend: {
                    orient: 'vertical',
                    y: 'bottom',
                    x: 'right',
                    data: ['pm2.5'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                "tooltip":{ trigger: 'item'},
                "series":[
                    {
                        "type":"scatter",
                        "coordinateSystem":"geo",
                        "data":[
                            {"name":"海门","value":[121.15,31.89,90]}
                        ],
                        "symbolSize":12,"label":{"normal":{"show":false},"emphasis":{"show":false}},"itemStyle":{"emphasis":{"borderColor":"#fff","borderWidth":1}}
                    }
                ]
            };
            this.myChart.setOption(option);
        }
    }
</script>
<style>
    #map-warp{
        width: 100%;
        height: 100%;
    }
</style>