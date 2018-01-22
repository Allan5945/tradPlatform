<template>
    <div class="registered-box" onselectstart="return false;">
        <header>
            <p>解绑邮箱 <span  class="iconfont closer" @click="closeThis">&#xe62c;</span></p>
        </header>
        <template v-if="active==0">
            <div class="process-body">
                <div class="process-main">
                    <pwdInput :par="pasArg" v-on:reqMes="pasReqMes" v-on:entered="iptEnter"></pwdInput>
                    <!--
                    <div class="full-btn">
                        <input :type="showpwd" v-model="userData.pwd" placeholder="输入登录密码" maxlength="16">
                        <span v-show="userData.pwd.length>1" @click="showpwd = showpwd==='text'?'password':'text'">&#xe693;</span>
                    </div>
                    -->
                </div>
                <footer v-show="show.footer">
                    <p class="wjmm"><span class="tips">{{ text.tipsText }}</span> <span @click="closeThis(true)">忘记密码？</span>&nbsp;</p>
                    <div class="step-btn">
                        <div class="btn btn-b" @click="next()">{{ text.btnText2 }}</div>
                        <div class="btn btn-w" @click="closeThis()">{{ text.canel1 }}</div>
                    </div>
                    <p class="lxkf">客服热线：0000-0000000</p>
                </footer>
            </div>
        </template>
        <div class="result" v-else>
            <div class="overPage" v-if="result">
                <div>
                    <h1>(*^__^*)解绑邮箱成功</h1>
                    <p>3秒后自动返回</p>
                </div>
            </div>
            <div class="overPage" v-else>
                <div>
                    <h1>(⊙v⊙)解绑邮箱失败</h1>
                    <p>3秒后自动返回</p>
                </div>
            </div>
            <footer>
                客服热线：000-0000000
            </footer>
        </div>
    </div>
</template>
<script>
    import {Loading} from 'element-ui';
    import inputControl from '$src/page/loginProcess/components/inputControl.vue';

    export default {
        data(){
            return{
                active: 0,
                result: true,
                tps:"",
                show:{
                    footer: true
                },
                userData: {
                    pwd: '',
                    npwd: '',
                    vnpwd: ''
                },
                showpwd: 'password',
                text:{
                    tipsText:'',
                    status: true,
                    btnText1: '下一步',
                    btnText2: '确定解绑',
                    canelState: true,
                    canel1:'取消',
                    canel2:'上一步'
                },
                pasArg:{
                    defaultText:"",     // 默认的值
                    inputType:false,   // 输入框类型，true、text。false、password
                    isJudge:false,  // 是否显示正确的绿钩  true、显示。false、不显示
                    isPrompt:true, // 是否密码显示功能 true、。false、
                    isshowErr:false, // 是否错误抖动 true、抖动。false、不抖动
                    tip:["输入登录密码","输入登录密码"], // 1，输入框的placeholder值。2，显示值
                    openJudge:[],
                },
            }
        },
        props: ['ud'],
        components:{
            "pwdInput": inputControl,
        },
        methods:{
            iptEnter(){
                this.next();
            },
            pasReqMes(p){
                this.userData.pwd = p.n;
            },
            closeThis(f){
                this.$emit('subchange',{
                    name: 'unbindMail',
                    type: f===true ? 1:0
                })
            },
            delayClose(){
                setTimeout(this.closeThis,3000)
            },
            openTips(txt){
                this.text.tipsText = txt;
                setTimeout(()=>{
                    this.text.tipsText = '';
                },1000)
            },
            test(val,type){  //格式校验
                let flag = false;
                if(val == ''){ // 空值 长度
                    return flag;
                }
                if(type === 0){ //密码校验
                    flag = true;
                }else if(type === 1 ) { //手机校验
                    flag = true;
                }
                return flag;
            },
            unbind(){
                let that = this;
                this.$ajax({
                    method: 'GET',
                    url: '/unbindMail',
                }).then(res=>{
                    that.active = 1;
                    if(res.data.opResult === '0'){
                        //that.text.status = false;
                        that.result = true;
                        that.ud.mail = '';
                    }else{
                        that.result = false;
                    }
                    that.delayClose();
                }).catch(err=>{
                    alert('不知道4##还是5##');
                    that.delayClose();
                })
            },
            checkPwd(){     //密码验证
                let that = this,flag=false, ud = that.ud;
//                if(!that.test(that.userData.pwd,0))return that.openTips("*请输入正确的密码格式");
                //后台验证
                if(that.userData.pwd===that.ud.pwd){
                    that.unbind();
                }else{
                    that.openTips("*密码错误，请重新输入")
                }
            },
            next() {
                let that = this;
                //if(!that.text.status)return;
                that.checkPwd();
                return ;
                const loading = Loading.service({
                    lock: true,
                    target: '.btn-b',
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                });
                setTimeout(() => {
                    loading.close();
                }, 500);
            },
            canelClick(){
                if(this.text.canelState){
                    this.closeThis();
                }else{
                    this.active--;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    $blue : #3c78ff;
    $lightblue : rgba(60,120,255,.15);
    *{
        box-sizing: border-box;
    }
    .registered-box{
        width:360px;
        height: 370px;
        position: absolute;
        overflow: hidden;
        border-radius: 8px;
        background-color: #fff;
        header{
            height:50px;
            line-height: 50px;
            position: relative;
            box-shadow: 0 5px 15px $lightblue;
            z-index: 1;
            p{
                text-indent: 20px;
                color: #999;
                .closer{
                    display: inline-block;
                    position: absolute;
                    right: 3%;
                    top: 10px;
                    width:22px;
                    height:22px;
                    line-height:22px;
                    text-align:center;
                    text-indent: 0;
                    color: $blue;
                    border:1px solid #ededed;
                    border-radius: 11px;
                    cursor:pointer;
                }
            }
        }
        .process-body{
            padding:50px 35px 0 35px;
            .process-main{
                width:240px;
                height:150px;
                margin: 0 auto;
                .occupies-prompt{
                    height:30px;
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
            }
            footer{
                color: $blue;
                .wjmm{
                    cursor: pointer;
                    text-align: right;
                    .tips{
                        position: absolute;
                        left: 0;
                        color: red;
                        text-indent: 40px;
                    }
                }
                .lxkf{
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                }
            }
        }
    }
    .step-btn{
        margin-top: 5px;
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
    .full-btn{
        position: relative;
        width: 260px;
        height: 40px;
        margin: 0 auto;
        line-height: 40px;
        border-radius: 20px;
        border: 1px solid #e9e9e9;
        overflow: hidden;
        input{
            appearance: none;
            background:none;
            outline:none;
            border: 1px solid rgba(0,0,0,0);
            outline: none;

            display: inline-block;
            position: absolute;
            border-radius: 20px;
            top: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            text-indent: 10px;
            &:focus{
                border: 1px solid #4b78e0;
            }
        }
        span{
            font-family: "iconfont";
            font-size: 18px;
            display: inline-block;
            height:100%;
            padding: 0 8px;
            position: absolute;
            right: 4%;
            cursor: pointer;
            &.yzm{
                width: 100px;
                right: 0;
                border-left: 1px solid #aaa;
                text-align: center;
                font-size: 12px;
                &:hover{
                    background: #aaa;
                    color: #fff;
                }
            }
        }
    }
    .btn-blk{
        background-color: rgb(204,204,204);
    }
    .result{
        height: 320px;
        position: relative;
        .overPage{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 270px;
            div{
                text-align: center;
                width: 80%;
                h1{
                    color: rgb(97,94,114);
                }
                p{
                    margin-top: 20px;
                    color: #a9a9a9;
                }
            }
        }
        footer{
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: #888;
        }
    }
</style>