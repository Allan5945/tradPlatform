<template>
    <div class="login-box">
        <userObj :arg="data2" v-on:resMes="resMes2"></userObj>
        <userObj :arg="data3" v-on:resMes="resMes3" style="margin-top: 30px"></userObj>
        <div class="operation">
            <el-checkbox v-model="mes.checked">记住密码</el-checkbox>
            <button class="forget-pas" @click="openReg(1)">忘记密码?</button>
        </div>
         <div class="occupies-prompt"> 
            <validation v-if="loginTime >= 3" v-on:validation="validaon"></validation>
            <div class="prompt" v-if="showE"><span>&#xe632;</span>账号或密码错误请重新输入</div>
        </div>
        <loginBtn :arg="{text:'登录'}" :dis="dis" style="margin-top:20px;" v-on:to-login="logined" :lodings="lodings"></loginBtn>
        <div class="footer">
            <div @click="openReg(2)">申请账号</div>
            <span>客户热线：0000-0000000</span>
        </div> 
    </div>
</template>
<script>
    import * as vx from 'vuex';
    import loginBtn from '../components/loginBtn.vue';
    import validation from '../components/validation.vue';
    import inputControl from '../components/inputControlX.vue';

    
    export default { 
        data(){
            return {
                data2: {
                    inputeType: "text", // 输入框的类型
                    inputMes: "",     // 输入框的值
                    showText: false,  // 是否显示密码
                    showErrInput: false, // 是否显示框错误
                    showSucInput: false, // 是否显示框正确
                    placeholderTip: ["请输入账号、手机号或者邮箱","账号"],
                    validation: 100,   // number,1、账号/邮箱，2、密码，3、..自己扩展
                },
                data3: {
                    inputeType: "password", // 输入框的类型
                    inputMes: "",     // 输入框的值
                    showText: true,  // 是否显示密码
                    showErrInput: false, // 是否显示框错误
                    showSucInput: false, // 是否显示框正确
                    placeholderTip: ["请输入登录密码","密码"],
                    validation: 100,   // number,1、账号/邮箱，2、密码，3、..自己扩展
                },
                loginTime:0,
                showE:false,
                mes:{
                    p:"1",
                    u:"jichang",
                    checked:false
                },
                lodings:false,   // true 正在加载，false  
            }
        },
        props:['loginErr'],
        created:function(){
            let mes = JSON.parse(localStorage.getItem('remember'));
            if(mes != null){
                this.data2.inputMes = mes.u;
                this.data3.inputMes = mes.p;
                this.mes = mes;
            };
        },
        mounted:function(){
          
        },
        components:{
            userObj:inputControl,
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
                        if(this.mes.checked){
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
                            this.$emit('update:ags',{  tltle:"(╯︵╰)登录失败",text:"登录异常，请稍后再试或者拨打客服服务热线"});
                            this.$emit('update:loginErr',true);
                        }
                    }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
            },
            openReg(n){
                this.$emit('openClass',n);
            },
            validaon(){
                setTimeout(()=>{this.loginTime = 0;},1000);
            },
            resMes2(data){
                this.mes.u = data.i;
            },
            resMes3(data){
                this.mes.p = data.i;
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

    .el-checkb{

    }
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
        width: 290px;
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
        color:#508bff;
        cursor:pointer;
        font-size: 1.2rem;
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
            color: rgba(0,0,0,.4);
        }
    }
   
</style>