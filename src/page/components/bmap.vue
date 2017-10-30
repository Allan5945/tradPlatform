<template>
    <div id="map-warp"></div>
</template>

<script>
    import echarts from 'echarts'
    import './../../static/js/bmap.js'


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
                            "featureType":"water",
                            "elementType":"all",
                            "stylers":{
                                "color":"#071327",
                                "visibility":"on"
                            }
                        },
                            {
                                "featureType":"land",
                                "elementType":"all",
                                "stylers":{
                                    "color":"#223350",
                                    "visibility":"on"
                                }
                            },
                            {
                                "featureType":"boundary",
                                "elementType":"all",
                                "stylers":{
                                    "color":"#465b6c",
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

            setTimeout(()=>{
                this.myChart.setOption(option);
            },3000);
            setTimeout(()=>{
                this.myChart.setOption(option);
            },5000)
        }
    }
</script>
<style>
    #map-warp{
        width: 100%;
        height: 100%;
    }
</style>