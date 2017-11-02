<template>
    <div id="app">
        <bmap></bmap>
        <navigation></navigation>
        <router-view></router-view>

    </div>
</template>

<script>
    import * as vx from 'vuex'
    import index from './page/index.vue'
    import bmap from './bmap/bmap.vue'
    import navigation from './page/components/navigation.vue'

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
            navigation
        }
    }
</script>
