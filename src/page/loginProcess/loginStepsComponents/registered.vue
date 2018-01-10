<template>
    <div class="registered-box">
        <div v-if="!newPas">
            <userInput :par="userArg" v-on:reqMes="reqEmail"></userInput>
            <div class="occupies-prompt"> 
                <validation v-if="validationTag" v-on:validation="validaon"></validation>
                <verificationCode :mes="emailOrPhone" v-on:setCode="setCode" :verCode.sync="verCode" v-if="verCode" style="margin-top:30px;"></verificationCode>
                <errTip :arg="tiperr" :sh.sync="showtip" v-if="showtip"></errTip>
            </div>
        </div>
        <div>
            <userInput :par="newPas0" v-on:reqMes="reqnewPas0"></userInput>
        </div>
         <div class="step-btn">
             <div v-if="!newPas" :class="{'btn-b':process ,'step-btn-dis':!process}" class="btn" @click="bgyanz">确认</div>
             <div v-if="newPas" :class="{'btn-b':true ,'step-btn-dis':!true}" class="btn">确认</div>
             <div class="btn btn-w" @click="openReg">返回登录</div>
         </div>
         <div class="lxkf">联系客户：0000-0000000</div>
    </div>
</template>
<script>
import userInput from '../components/userInputClass1.vue';
import validation from '../components/validation.vue'; 
import verificationCode from '../components/verificationCode.vue'; 
import inputControl from '../components/inputControl.vue'; 
import errTip from '../components/errTip.vue'; 
 
export default {
    data(){
        return{
            userArg:{
                defaultText:"",     // 默认的值
                inputType:true,   // 输入框类型，true、text。false、password
                isJudge:false,  // 是否显示正确的绿钩  true、显示。false、不显示
                isPrompt:false, // 是否密码显示功能 true、。false、
                isshowErr:true, // 是否错误抖动 true、抖动。false、不抖动
                tip:["请输入账号绑定的邮箱或手机号","请输入账号绑定的邮箱或手机号"], // 1，输入框的placeholder值。2，显示值
                openJudge:[/^1[34578]\d{9}$/,/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/],  // 输入正则判断              
            },
            showtip:false,
            codeYz:'',          // 验证码
            tiperr:"",  
            verCode:false,       // 是否显示短信/邮箱验证
            emailOrPhone:"",      // 输入的具体邮箱或者手机值
            validationTag:false,  // 滑动验证

            //      新密码 
            newPas:true,     // 是否填写新密码
           newPas0:{
                defaultText:"",     // 默认的值
                inputType:false,   // 输入框类型，true、text。false、password
                isJudge:true,  // 是否显示正确的绿钩  true、显示。false、不显示
                isPrompt:false, // 是否密码显示功能 true、。false、
                isshowErr:true, // 是否错误抖动 true、抖动。false、不抖动
                tip:["请输入新密码","新密码"], // 1，输入框的placeholder值。2，显示值
                openJudge:[],  // 输入正则判断       、
                class0:true,   // 定制判断，用于判断密码格式      
            },
        }
    },
    watch:{
        emailOrPhone(){
            if(this.emailOrPhone != ""){
                this.validationTag = true;
                this.verCode = false;
            }else{
                this.validationTag = false;
            }
        }
    },
    methods:{
        bgyanz(){
            // 验证验证码
        },
        reqEmail(data){  // 获取传递的值
            if(data.i){
                this.verCode = false;
                this.validationTag = false;
                this.codeYz = "";
                return;
            };
            if(data.n != ''){
                this.emailOrPhone = data.n;
            }else{
                this.emailOrPhone = "";
                this.tiperr = data.p;
                this.showtip = true;
                this.verCode = false;
                this.validationTag = false;
            }
        },
        tip(tip){
            this.tps = tip;
            this.showtip = true;
            setTimeout(()=>{this.showtip = false;},1500); 
        },
        openReg(){
            this.$emit('openClass',0);
        },
        setCode:function(code){
            if(code.length == 6){
                this.codeYz = code;
            }else{
                this.codeYz = '';
            }
        },
        validaon:function(){
            this.validationTag = false;
            this.verCode = true;
        },
        reqnewPas0(d){
            console.log(d);
            
        }
    },
  components:{
    userInput:inputControl, 
    validation,
    verificationCode,
    errTip
  },
  computed:{
      process(){
            let re = false;
            if(this.verCode && this.codeYz != ""){
                re = true;
            }
            return re;
      }
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
        height: 375px;
        padding:45px 35px 0 35px;
    }
    .occupies-prompt{ 
        height:210px;
        padding-top: 28px;
        position: relative;
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


