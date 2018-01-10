<template>
  <div class="login-steps popup">
        <titles v-on:clear="closeWindow" :arg="title"></titles>
        <loginBox v-if="setpes == 0 && !openErr" v-on:openClass="openClass" :loginErr.sync="openErr"></loginBox>
        <loginErr v-if="openErr" :loginErr.sync="openErr"></loginErr>
        <registered v-if="setpes == 1" v-on:openClass="openClass"></registered>
  </div>
</template>
<script>
import * as vx from 'vuex';
import titles from './components/title.vue';
import loginBox from './loginStepsComponents/loginBox.vue';
import registered from './loginStepsComponents/registered.vue';
import loginErr from './components/loginErr.vue';

export default {
        data () {
            return {
                setpes:0,  // 0,登录流程。1，找回密码流程。2，注册功能
                openErr:false, // 是否打开 登录失败的界面
            }
        },
        props:['foo'],
        methods:{
           openClass(c){
               this.setpes = c;
           },
           closeWindow(){
               this.$emit('update:stepOff', false)
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
                let t = "开启航线开通在线时代";
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
            registered,
            loginErr
        }
}
</script>
<style lang="scss" scoped>
    .login-steps{
        position: fixed;
        right:23%;
        top: 18%;
    }
</style>


