<template>
    <div id="app" @click="close">
        <bmap></bmap>
        <navigation @toShow="toShow"></navigation>
        <toPublish  v-show="show" @toShow="toShow"></toPublish>
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
                show:false
            }
        },
        methods:{
            ...vx.mapActions([
                'close'
            ]),
             toShow(){
                this.show = !this.show;
            }
        },
        computed: {
            ...vx.mapGetters([
                'c_updated'
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
