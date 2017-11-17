<template>
    <div id="app" @click="close;" v-if="renderComponent">
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
                }
            }
        },
        methods: {
            ...vx.mapActions([
                'close'
            ]),
            toShow() {
                this.show = !this.show;
            }
        },
        mounted: function () {
            this.$ajax.post('/airList')
                .then((response) => {
                console.log(response);
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
                'c_updated'
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
