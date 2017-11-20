<template>
    <div id="app" @click="close();" v-if="renderComponent">
        <bmap :allDot="allDot"></bmap>
        <navigation @toShow="toShow"></navigation>
        <toPublish v-show="show" @toShow="toShow"></toPublish>
        <tagIcon></tagIcon>
        <messageBox></messageBox>
        <router-view></router-view>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import index from './page/index.vue'
    import bmap from './bmap/bmap.vue'
    import navigation from './page/components/navigation.vue'
    import tagIcon from './page/components/tagIcon.vue'
    import messageBox from './page/components/mesBox.vue'
    import toPublish from './page/components/toPublish.vue'

    export default {
        name: 'app',
        data() {
            return {
                name: 1,
                show: false,
                loadingData:{
                    airList:false,
                    demands:false
                },
                allDot:'',
                test:555
            }
        },
        methods: {
            ...vx.mapActions([
                'close',
                'initialize'
            ]),
            toShow() {
                this.show = !this.show;
            }
        },
        mounted: function () {
            this.$ajax.post('/airList')
                .then((response) => {
                    this.$store.dispatch('initialize',response.data.mes).then(() => {});
                    this.loadingData.airList = true;
                })
                .catch((error) => {
                    console.log(error);
                });
            this.$ajax.post('/getAllDemands')
                .then((response) => {
                    let a = {
                        "data":
                            [
                                {"dpt":"CTU","cityCoordinateJ":"30.48","cityCoordinateW":"103.96","num":3,"demandType":"0","obj":"0,1","newInfo":"0"},
                                {"dpt":"LZO","cityCoordinateJ":"28.84","cityCoordinateW":"105.38","num":4,"demandType":"0,1","obj":"1","newInfo":null},
                                {"dpt":"NKG","cityCoordinateJ":"31.738884","cityCoordinateW":"118.877696","num":4,"demandType":"1","obj":"0,1","newInfo":"0"},
                                {"dpt":"PEK","cityCoordinateJ":"40.06","cityCoordinateW":"116.62","num":2,"demandType":"0","obj":"1","newInfo":null},
                                {"dpt":"SJW","cityCoordinateJ":"38.287809","cityCoordinateW":"114.704385","num":2,"demandType":"0","obj":"1","newInfo":null},
                                {"dpt":"TNA","cityCoordinateJ":"36.858313","cityCoordinateW":"117.220309","num":3,"demandType":"0","obj":"0","newInfo":null},
                                {"dpt":"XIY","cityCoordinateJ":"34.2778","cityCoordinateW":"108.953098","num":2,"demandType":"0","obj":"1","newInfo":null}
                                ],"msg":"查询成功"}

                    this.allDot = a;
//                    this.allDot = response.data;
                    this.loadingData.demands = true;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        computed: {
            ...vx.mapGetters([
                'c_updated',
                'airList'
            ]),
            renderComponent:function () {
                if(this.loadingData.airList && this.loadingData.demands){
                    return true;
                }else{
                    return false;
                };
            }
        },
        components: {
            bmap,
            navigation,
            tagIcon,
            messageBox,
            toPublish
        }
    }
</script>
