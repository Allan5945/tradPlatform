<template>
  <div id="app">
      <div>{{c_updated}}</div>
      <img src="./static/145.jpg"/>
      <router-view></router-view>
  </div>
</template>

<script>
    import * as vx from 'vuex'
    import index from './page/index.vue'
    import './static/css/all.scss'
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
      }
    }
</script>
