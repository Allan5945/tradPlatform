<template>
    <div id="map-warp"></div>
</template>

<script>
    import echarts from 'echarts'
    import '../static/js/bmap.js'

    export default {
        data () {
            return {
            }
        },
        mounted:function () {
            this.myChart = echarts.init(document.getElementById('map-warp'));
            console.log(this.myChart)
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
                "tooltip":{ trigger: 'item'},
                "series":[]
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