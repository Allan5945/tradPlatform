<template>
  <div class="loginErr-box">
        <h3 class="loginErr-title" v-text="ags.tltle"></h3>
        <p class="loginErr-mes">{{ags.text}}</br>{{time}}s后自动返回登录</p>
        <div class="btn btn-b back-btn" @click="backLogin">返回登录</div>
        <div class="cup">
            <cuPhone></cuPhone>
        </div>
  </div>
</template>
<script>
import cuPhone from './customerPHone.vue';
export default {
    data(){
        return{
            time:5
        }
    },
    props:['loginErr','ags'],
    methods:{
        backLogin(){
            this.$emit('update:loginErr',false);
        }
    },
   mounted:function(){
        sessionStorage.removeItem("isLogin");
        setInterval(()=>{
            this.time --;
            if(this.time == 0){
                this.backLogin();
            }
        },1000);
    },
  components:{
          cuPhone
      }
}
</script>
<style lang="scss" scoped>
    .loginErr-box{
        height: 297px;
        padding: 120px 35px 0 35px;
    }
    .cup{
        height: 50px;
    }
    .back-btn{
        border-radius: 25px;
        height: 45px;
        color: white;
        letter-spacing: 3px;
        display: flex;
    }
    .loginErr-title{
        font-size:2rem;
        letter-spacing: 1px;
        color:#605E7C;
        text-align: center;
        padding-bottom: 33px;
    }
    .loginErr-mes{
        text-align: center;
        line-height: 20px;
        color:#959595;
        padding-bottom:107px;
    }
</style>



