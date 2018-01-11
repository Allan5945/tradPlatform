<template>
    <div class="registered-box">
        <div v-if="true">
            <transition name="slide-fade">
                <span class="select-pas" v-if="setU" style="top:23px;" v-on:setUser="setUser">请输入账号绑定的邮箱或手机号</span>
            </transition>
            <userInput :arg="{text:'请输入账号绑定的邮箱或手机号'}" v-on:setUser="setUser"></userInput>
            <div class="occupies-prompt"> 
                <validation></validation>
                <transition name="slide-fade">
                    <span class="select-pas" v-if="setC">验证码</span>
                </transition>
                <verificationCode v-on:setCode="setCode" style="margin-top:30px;"></verificationCode>
                <div class="prompt" v-if="showtip"><span>&#xe632;</span>{{tps}}</div>
            </div>
        </div>
        <div>
            <!-- <transition name="slide-fade">
                    <span class="select-pas" v-if="setC">验证码</span>
            </transition>
             <userInput :arg="{text:'请输入账号绑定的邮箱或手机号'}" v-on:tip="tip"></userInput> -->
        </div>
         <div class="step-btn">
             <div :class="{'btn-b':process !=0 ,'step-btn-dis':process == 0}" class="btn">确认</div>
             <div class="btn btn-w" @click="openReg">返回登录</div>
         </div>
         <div class="lxkf">联系客户：0000-0000000</div>
    </div>
</template>
<script>
import userInput from '../components/userInputClass1.vue';
import validation from '../components/validation.vue';  
import verificationCode from '../components/verificationCode.vue'; 

export default {
    data(){
        return{
            showtip:false,
            tps:"",
            process:0,
            setC:false,
            setU:false
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
        },
        setCode:function(data){
            let ty = data.t;
            if(!data.t){
                if(data.n != "")ty = true;
            };
            this.setC = ty;
        },
         setUser:function(data){
            let ty = data.t;
            if(!data.t){
                if(data.n != "")ty = true;
            };
            this.setU = ty;
        },
    },
  components:{
    userInput, 
    validation,
    verificationCode
  }
}
</script>
<style lang="scss" scoped>
    .slide-fade-enter-active,.slide-fade-leave-active {
        transition: all .3s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to
    {
        transform: translateY(10px);
        opacity: 0;
    }
    .registered-box{
        position: relative;
        padding:45px 35px 0 35px;
    }
    .occupies-prompt{ 
        height:180px;
        padding-top: 28px;
        position: relative;
    }
    .prompt{
        color:#f36b6b;
        padding-left:10px;
        position: absolute;
        bottom: 0;
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
    .step-btn-dis{
        cursor: not-allowed;
        background-color:#cccccc;
    }
    .lxkf{
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #605E7C;
    }
    .select-pas{
        position: absolute;
        top:65px;
        color:#989898;
    }
</style>


