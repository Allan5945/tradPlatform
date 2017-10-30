<template>
  <div id="app">
      <bmap></bmap>
      <router-view></router-view>
  </div>
</template>

<script>
    import * as vx from 'vuex'
    import index from './page/index.vue'
    import bmap from './page/components/bmap.vue'
    export default {
      name: 'app',
      data () {
         return {
            name:1
         }
      },
      computed:{
        ...vx.mapGetters([
          'c_updated'
        ])
      },
        components:{
            bmap:bmap
        }
    }
</script>
