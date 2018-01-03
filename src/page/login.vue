<template>
  <div class="content-box">
    <bannersPanel></bannersPanel>
    <loginSteps></loginSteps>
  </div>
</template>

<script>
    import * as vx from 'vuex';
    import bannersPanel from './loginProcess/bannersPanel.vue';
    import loginSteps from './loginProcess/loginSteps.vue';

    export default {
        data () {
            return {
               
            }
        },
        methods:{
          
        },
        created:function () {
        },
        computed:{
          
        },
        components:{
            bannersPanel,
            loginSteps
        }
    }
</script>
<style lang="scss" scoped>
    .content-box{
        overflow: hidden;
        position: relative;
    }
</style>

