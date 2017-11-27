<template>
    <div v-if="renderComponent">
        <bmap :allDot="allDot"></bmap>
        <navigation @toShow="toShow"></navigation>
        <toPublish v-show="show" @toShow="toShow"></toPublish>
        <tagIcon></tagIcon>
        <messageBox></messageBox>
    </div>
</template>

<script>
    import * as vx from 'vuex'
    import index from './../page/index.vue'
    import bmap from './../bmap/bmap.vue'
    import navigation from './../page/components/navigation.vue'
    import tagIcon from './../page/components/tagIcon.vue'
    import messageBox from './../page/components/mesBox.vue'
    import toPublish from './../page/components/toPublish.vue'
    import conversions from './../public/js/conversions'

    export default {
        data() {
            return {
                renderComponent:false,
                name: 1,
                show: false,
                loadingData: {
                    airList: false,
                    demands: false,
                    cityList: false,
                    data:{
                        airListData:null,
                        cityListData:null
                    }
                },
                allDot: '',
                test: 555
            }
        },
        methods: {
            ...vx.mapActions([
                'close',
                'initialize'
            ]),
            toShow() {
                this.show = !this.show;
            },
            init:function () {
                if(
                    this.loadingData.airList &&
                    this.loadingData.cityList &&
                    this.loadingData.demands &&
                    this.loadingData.data.airListData != null &&
                    this.loadingData.data.cityListData != null
                ){
                    this.$store.dispatch('initialize',this.loadingData.data).then(() => {
                        this.renderComponent = true;
                    });

                };
            }
        },
        beforeMount: function () {
            if (this.role == null) window.location.href = '#/login'
        },
        mounted: function () {
            this.$ajax({
                method: 'post',
                url: '/airList',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
                .then((response) => {
                    this.loadingData.data.airListData = conversions(response.data.mes);
                    this.loadingData.airList = true;
                    this.init();
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
            this.$ajax({
                method: 'post',
                url: '/getCityAllList',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
                .then((response) => {
                    this.loadingData.data.cityListData = response.data.list;
                    this.loadingData.cityList = true;
                    this.init();
                })
                .catch((error) => {
                        console.log(error);
                    }
                );

            this.$ajax({
                method: 'post',
                url: '/getAllDemands',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
                .then((response) => {
                    let arr = [];
                    response.data.data.forEach((val) => {
                        if (
                            val.cityCoordinateJ != null &&
                            val.cityCoordinateW != null &&
                            val.demandType != null &&
                            val.dpt != null &&
//                            val.newInfo != null &&
                            val.num != null &&
                            val.obj != null
                        ) {
                            arr.push(val)
                        }
                    });
                    this.allDot = arr;
                    this.loadingData.demands = true;
                    this.init();
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
        },
        computed: {
            ...vx.mapGetters([
                'c_updated',
                'airList',
                'role'
            ])
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
