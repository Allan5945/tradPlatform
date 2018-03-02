<template>
  <div class="login-steps popup">
        <titles v-on:clear="closeWindow" :arg="title"></titles>
        <loginBox v-if="setpes == 0 && !loginErr" v-on:openClass="openClass" :ags.sync="ags" :loginErr.sync="loginErr"></loginBox>
        <loginErr v-if="loginErr" :loginErr.sync="loginErr" :ags="ags" style="width: 290px;"></loginErr>
        <backPas v-if="setpes == 1" v-on:openClass="openClass" :loginErr.sync="loginErr" v-on:pasChange="pasChange"></backPas>
        <registere v-if="setpes == 2" v-on:openClass="openClass"></registere>
  </div>
</template>
<script>
import * as vx from 'vuex';
import titles from './components/title.vue';
import loginBox from './loginStepsComponents/loginBox.vue';
import backPas from './loginStepsComponents/backPas.vue';
import registere from './loginStepsComponents/registere.vue';
import loginErr from './components/loginErr.vue';

export default {
        data () {
            return {
                loginErr:false, // 是否打开 登录失败的界面
                ags:{
                    tltle:"(╯︵╰)登录失败",
                    text:"登录异常，请稍后再试或者拨打客服服务热线"
                }
            }
        },
        props:['foo','setpes'],
        methods:{
           openClass(c){
               this.$emit("update:setpes",c)
           },
           closeWindow(){
               this.$emit('update:stepOff', false)
           },
           pasChange(t){
               if(t){
                    this.ags = {
                    tltle:"(oﾟ▽ﾟ)o修改成功",
                    text:""
                  }
               }else{
                   this.ags = {
                    tltle:"(╯︵╰)修改失败",
                    text:"请稍后再试或者拨打客服服务热线"
                  }
                 
               }
               this.$emit("update:setpes",0)
                this.loginErr = true;
           }
        },
        created:function () {
            window.sessionStorage.clear();
        },
        mounted:function(){
        },
        computed:{
            ...vx.mapGetters([
                'c_updated'
            ]),
            title(){
                let t = "航线交易，可遇可求。";
                switch(this.setpes){
                    case 1:
                    t = "找回密码"
                    break;
                    case 2:
                    t = "注册账号"
                    break;
                }
                return t;
            }
        },
        components:{
            titles,
            loginBox,
            registere,
            loginErr,
            backPas
        }
}
</script>
<style lang="scss" scoped>
    .login-steps{
        position: fixed;
        right:23%;
        top: 18%;
        z-index: 15;
        /*width: 360px;*/
    }
</style>


