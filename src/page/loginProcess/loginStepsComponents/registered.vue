<template>
    <div class="registered-box">
        <userInput :arg="{text:'请输入账号绑定的邮箱或手机号'}" v-on:tip="tip"></userInput>
        <div class="occupies-prompt"> 
            <validation></validation>
            <div class="prompt" v-if="showtip"><span>&#xe632;</span>{{tps}}</div>
        </div>
         <div class="step-btn">
             <div class="btn btn-b">确认</div>
             <div class="btn btn-w" @click="openReg">返回登录</div>
         </div>
         <div class="lxkf">联系客户：0000-0000000</div>
    </div>
</template>
<script>
import userInput from '../components/userInputClass1.vue';
import validation from '../components/validation.vue'; 

export default {
    data(){
        return{
            showtip:false,
            tps:""
        }
    },
    methods:{
      tip(tip){
        this.tps = tip;
         this.showtip = true;
         setTimeout(()=>{this.showtip = false;},1500); 
      },
       openReg(){
            this.$emit('openClass',0);
        }
    },
  components:{
    userInput, 
    validation
  }
}
</script>
<style lang="scss" scoped>
    .registered-box{
        position: relative;
        padding:45px 35px 0 35px;
    }
    .occupies-prompt{ 
        height:180px;
        display:flex;
        flex-flow: column nowrap;
        justify-content:space-between;
        padding-top: 28px;
    }
    .prompt{
        color:#f36b6b;
        padding-left:10px;
        display: flex;
        align-items: center;
        >span{
            font-family: iconfont;
            font-size:1.8rem;
        }
    }
    .step-btn{
        color: white;
        display: flex;
        justify-content: space-between;
        >div{
            border-radius:25px;
            width: 135px;
            height: 45px;
            text-align: center;
            line-height: 45px;
        }
    }
    .lxkf{
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #605E7C;
    }
</style>


