<template>
    <div id="app" @click="initialize(test);close();" v-if="renderComponent">
        <bmap></bmap>
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
                allAirList:'',
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
//            this.$store.dispatch('initialize').then(() => {
//            });
            this.$ajax.post('/airList')
                .then((response) => {
                    this.allAirList = response.data.mes;
                    this.loadingData.airList = true;
                })
                .catch((error) => {
                    console.log(error);
                });
            this.$ajax.post('/getAllDemands')
                .then((response) => {
//                    console.log(response);
                    this.loadingData.demands = true;
                })
                .catch((error) => {
                    console.log(error);
                })
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
