<template>
  <div class="login-steps popup">
        <titles></titles>
        <loginBox v-if="setpes == 0" v-on:openClass="openClass"></loginBox>
        <registered v-if="setpes == 1" v-on:openClass="openClass"></registered>
  </div>
</template>
<script>
import * as vx from 'vuex';
import titles from './components/title.vue';
import loginBox from './loginStepsComponents/loginBox.vue';
import registered from './loginStepsComponents/registered.vue';

export default {
        data () {
            return {
                setpes:0,  // 0,登录流程。1，找回密码流程。2，注册功能
            }
        },
        methods:{
           openClass(c){
               this.setpes = c;
           }
        },
        created:function () {
            window.sessionStorage.clear();
        },
        computed:{
            ...vx.mapGetters([
                'c_updated'
            ])
        },
        components:{
            titles,
            loginBox,
            registered
        }
}
</script>
<style lang="scss" scoped>
    .login-steps{
        position: fixed;
      
        /*right: 50px;*/
        /*top: 20px;*/
    }
</style>


