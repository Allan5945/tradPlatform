<template>
    <div id="app">
        <bmap></bmap>
        <navigation></navigation>
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

    export default {
        name: 'app',
        data() {
            return {
                name: 1
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
            messageBox
        }
    }
</script>
