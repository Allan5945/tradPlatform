<template>
  <div class="content-box">
    <bannersPanel v-on:steps="steps"></bannersPanel>
    <transition name="fade">
        <loginSteps v-if="stepOff" :stepOff.sync="stepOff"></loginSteps>
    </transition>
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
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    };

    .content-box{
        overflow: hidden;
        position: relative;
    }
</style>

