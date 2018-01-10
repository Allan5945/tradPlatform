<template>
    <div class="login-box">
        <userInput :par="userArg" v-on:reqMes="userReqMes"></userInput>
        <pasInput :par="pasArg" style="margin-top:30px;" v-on:reqMes="pasReqMes" v-on:entered="entered"></pasInput>
        <div class="operation">
            <el-checkbox v-model="checked" style="color:#605E7C">记住密码</el-checkbox>
            <button class="forget-pas" @click="openReg">忘记密码?</button>
        </div>
         <div class="occupies-prompt"> 
            <validation v-if="loginTime >= 3" v-on:validation="validaon"></validation>
            <div class="prompt" v-if="showE"><span>&#xe632;</span>账号或密码错误请重新输入</div>
        </div>
        <loginBtn :arg="{text:'登录'}" :dis="dis" style="margin-top:20px;" v-on:to-login="logined" :lodings="lodings"></loginBtn>
        <div class="footer">
            <div>申请账号</div>
            <span>客户热线：0000-0000000</span>
        </div> 
    </div>
</template>
<script>
    import * as vx from 'vuex';
    import userInput from '../components/userInput.vue';
    import pasInput from '../components/pasInput.vue'; 
    import loginBtn from '../components/loginBtn.vue';
    import validation from '../components/validation.vue';  
    import inputControl from '../components/inputControl.vue'; 

    
    export default { 
        data(){
            return {
                userArg:{
                    defaultText:"jichang",     // 默认的值
                    inputType:true,   // 输入框类型，true、text。false、password
                    isJudge:false,  // 是否显示正确的绿钩  true、显示。false、不显示
                    isPrompt:false, // 是否密码显示功能 true、。false、
                    isshowErr:false, // 是否错误抖动 true、抖动。false、不抖动
                    tip:["请输入账号、手机号或者邮箱","账号"], // 1，输入框的placeholder值。2，显示值
                    openJudge:[],                   // 输入正则判断              
                    // openJudge:[/^1[34578]\d{9}$/,/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/],                   // 输入正则判断              
                },
                pasArg:{
                    defaultText:"1",     // 默认的值
                    inputType:false,   // 输入框类型，true、text。false、password
                    isJudge:false,  // 是否显示正确的绿钩  true、显示。false、不显示
                    isPrompt:true, // 是否密码显示功能 true、。false、
                    isshowErr:false, // 是否错误抖动 true、抖动。false、不抖动
                    tip:["请输入登录密码","密码"], // 1，输入框的placeholder值。2，显示值
                    openJudge:[],               
                },
                checked: true,
                loginTime:0,
                showE:false,
                mes:{
                    p:"1",
                    u:"jichang"
                },
                lodings:false,   // true 正在加载，false  
            }
        },
        props:['loginErr'],
        created:function(){
            let mes = JSON.parse(localStorage.getItem('remember'));
            if(mes != null){
                this.userArg.defaultText = mes.u;
                this.pasArg.defaultText = mes.p;
            };
        },
        mounted:function(){
          
        },
        components:{
            userInput:inputControl,
            pasInput:inputControl,
            loginBtn,
            validation,
        },
        methods:{
            entered(){
                if(this.dis)this.logined();
            },
            logined:function () {
                this.lodings = true;
                this.$ajax({
                    method: 'post',
                    url: '/login',
                    params:{
                        username:this.mes.u,//BKadmin*权限0 //KYadmin*权限1 //TGOadmin*权限2d
                        password:this.mes.p
                    },
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                })
                .then((response) => {
                    this.lodings = false;
                    if(response.data.obj != undefined){
                        if(this.checked){
                            localStorage.setItem("remember",JSON.stringify(this.mes))
                        }else{
                            localStorage.clear("remember");
                        };
                        this.$store.dispatch('role',response.data.obj).then((e) => {});
                        window.sessionStorage.setItem('isLogin','ok');
                        window.sessionStorage.setItem('role',JSON.stringify(response.data.obj));
                        this.$router.push("index");
                    }else{
                        if(response.data.opResult == '1'){
                            this.showE = true;
                            this.loginTime ++;
                            setTimeout(()=>{this.showE = false;},1500);
                        }else{
                            this.$emit('update:loginErr',true);
                        }
                    }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
            },
            openReg(){
                this.$emit('openClass',1);
            },
            userReqMes(mes){
                this.mes.u = mes.n; 
            },
            pasReqMes(mes){
                this.mes.p = mes.n;           
            },
            validaon(){
                setTimeout(()=>{this.loginTime = 0;},1000);
            }
        },
        computed:{
            dis:function(){
                let ty = false;
                if(this.mes.p != "" && this.mes.u && this.loginTime < 3){ty = true}
                return ty;
            },
            ...vx.mapGetters([
                'c_updated'
            ])
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
    
    .login-box{
        // display:flex;
        // flex-flow:column nowrap;
        // justify-content:center;
        // align-items: center;
        position: relative;
        padding:45px 35px 0 35px;
    }
    .select-user,.select-pas{
        position: absolute;
        top:20px;
        color:#989898;
    }
     .select-pas{
        top:95px;
    }
    .operation{ 
        display: flex;
        justify-content:space-between;
        padding:20px 10px 0 10px;
    }
    .forget-pas{
        background-color:transparent;
        border:none;
        outline:none;
        color:#409EFF;
        cursor:pointer;
        &:hover{ 
           color:#248cfa;
        }
    }
    .occupies-prompt{ 
        height:83px;
        padding-top: 28px;
        position: relative;
    }
    .prompt{
            position: absolute;
            bottom: 0px;
            color:#f36b6b;
            padding-left:10px;
            display: flex;
            align-items: center;
            >span{
                font-family: iconfont;
                font-size:1.8rem;
            }
    }
    .footer{
        display: flex;
        height: 50px;
        align-items: center;
        justify-content:space-between;
        >div{
            color: #3c77ff;
            cursor: pointer;
            &:active{
                 color: #1859f1;
            }
            &:hover{
                 color: #2663f3;
            }
        }
        >span{
            color: #605E7C;
        }
    }
   
</style>