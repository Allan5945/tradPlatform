<template>
    <div class="login-box">
        <transition name="slide-fade">
            <span class="select-user" v-if="setU">账号</span>
        </transition>
        <userInput v-on:setUser="setUser" :arg="{text:'请输入账号、手机号或邮箱登陆'}"></userInput>
        <transition name="slide-fade">
            <span class="select-pas" v-if="setP">密码</span>
        </transition>
        <pasInput style="margin-top:30px;" v-on:setUser="setPas"></pasInput>
        <div class="operation">
            <el-checkbox v-model="checked" style="color:#605E7C">记住密码</el-checkbox>
            <button class="forget-pas" @click="openReg">忘记密码?</button>
        </div>
         <div class="occupies-prompt"> 
            <validation></validation>
            <div class="prompt"><span>&#xe632;</span>账号或密码错 误请重新输入</div>
        </div>
        <loginBtn :arg="{text:'登陆'}" style="margin-top:20px;"  :class="{'btn-b':dis}" v-on:to-login="logined"></loginBtn>
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
    
    
    export default { 
        data(){
            return {
                setU:false,
                setP:false,
                checked: true,
                mes:{
                    p:"1",
                    u:"jichang"
                }
            }
        },
        components:{
            userInput,
            pasInput,
            loginBtn,
            validation
        },
        methods:{
            setUser:function(data){
                let ty = data.t;
                if(!data.t){
                    if(data.n != "")ty = true;
                };
                this.setU = ty;
                this.mes.u = data.n;
            },
            setPas:function(data){
                 let ty = data.t;
                if(!data.t){
                    if(data.n != "")ty = true;
                };
                this.setP = ty;
                this.mes.p = data.n;
            },
            logined:function () {
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
                    if(response.data.obj != undefined){
                        this.$store.dispatch('role',response.data.obj).then((e) => {});
                        window.sessionStorage.setItem('isLogin','ok');
                        window.sessionStorage.setItem('role',JSON.stringify(response.data.obj));
                        this.$router.push("index");
                    }else{
                        alert('错了')
                    }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
            },
            openReg(){
                this.$emit('openClass',1);
            }
        },
        computed:{
            dis:function(){
                let ty = true;
                // if(){

                // }
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
        height:80px;
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