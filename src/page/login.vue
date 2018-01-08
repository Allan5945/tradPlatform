<template>
  <div class="content-box">
    <bannersPanel v-on:steps="steps"></bannersPanel>
    <loginSteps v-if="stepOff" :offType="offType"></loginSteps>
  </div>
</template>

<script>
    import * as vx from 'vuex';
    import bannersPanel from './loginProcess/bannersPanel.vue';
    import loginSteps from './loginProcess/loginSteps.vue';

    export default {
        data () {
            return {
                stepOff:true,
                offType:true
            }
        },
        methods:{
            steps:function (t) {
                this.stepOff = true;
                this.offType = t;
                if(t){

                }
            }
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

