<template>
    <div class="registered-box" onselectstart="return false;">
        <header>
            <p>修改密码 <span  class="iconfont closer" @click="closeThis">&#xe62c;</span></p>
        </header>
        <template v-if="active<2">
            <div class="process-body">
                <ul class="pwd-err-tip" v-show="show.pwdErr">
                    <li>· 长度为6-16个字符</li>
                    <li>· 支持数字、大小写字母和标点符号</li>
                    <li>· 不允许空格</li>
                </ul>
                <div class="process-main" v-show="active==0">
                    <pwdInput :par="pasArg" v-on:reqMes="pasReqMes0" v-on:entered="iptEnter" v-if="active==0"></pwdInput>
                    <!--
                    <div class="full-btn">
                        <input :type="iptType.showpwd0" v-model="userData.pwd" placeholder="输入登录密码" maxlength="16">
                        <span v-show="userData.pwd.length>0 && iptType.showpwd0==='password'" @click="iptType.showpwd0 ='text'">&#xe685;</span>
                        <span v-show="userData.pwd.length>0 && iptType.showpwd0==='text'" @click="iptType.showpwd0 = 'password'" style="line-height: 38px;">&#xe7d3;</span>
                    </div>
                    -->
                </div>
                <div class="process-main" v-show="active==1">
                    <pwdInput v-if="active==1" :par="npasArg" v-on:reqMes="pasReqMes1" @focus="show.pwdErr=false;"></pwdInput>
                    <pwdInput v-if="active==1" :par="vnpasArg" v-on:reqMes="pasReqMes2" style="margin-top:30px;"></pwdInput>
                    <!--
                    <div class="full-btn">
                        <input :type="iptType.showpwd1" v-model.trim="userData.npwd" placeholder="输入新密码" @focus="show.pwdErr=false;">
                        <span v-show="userData.npwd.length>0 && iptType.showpwd1==='password'" @click="iptType.showpwd1 ='text'">&#xe685;</span>
                        <span v-show="userData.npwd.length>0 && iptType.showpwd1==='text'" @click="iptType.showpwd1 = 'password'" style="line-height: 38px;">&#xe7d3;</span>
                    </div>

                    <div class="full-btn" style="margin-top: 30px;">
                        <input :type="iptType.showpwd2" v-model.trim="userData.vnpwd" placeholder="确认密码" @focus="show.pwdErr=false;">
                        <span v-show="userData.vnpwd.length>0 && userData.vnpwd.length===userData.npwd.length && userData.vnpwd===userData.npwd.replace(/ /g,'')"
                              style="pointer-events: none;color: rgb(125,220,13);">&#xe61f;</span>
                    </div>
                    -->
                </div>
                <div class="pwd-tips">

                </div>
                <footer v-show="show.footer">
                    <p class="wjmm"><span class="tips">{{ text.tipsText }}</span> <span v-show="active==0" @click="closeThis(true)">忘记密码？</span>&nbsp;</p>
                    <div class="step-btn">
                        <div class="btn btn-b" @click="next()">{{ text.btnText2 }}</div>
                        <div class="btn btn-w" @click="canelClick">{{ text.canelState?text.canel1:text.canel2 }}</div>
                    </div>
                    <p class="lxkf">客服热线：0000-0000000</p>
                </footer>
            </div>
        </template>
        <div class="result" v-else>
            <div class="overPage" v-if="result">
                <div>
                    <h1>(*^__^*)修改密码成功</h1>
                    <p>3秒后自动返回</p>
                </div>
            </div>
            <div class="overPage" v-else>
                <div>
                    <h1>(⊙v⊙)修改密码失败</h1>
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
                result: false,
                tps:"",
                show:{
                    footer: true,
                    pwdErr: false
                },
                userData: {
                    pwd: '',
                    npwd: '',
                    vnpwd: ''
                },
                iptType:{
                    showpwd0: 'password',
                    showpwd1: 'password',
                    showpwd2: 'password'
                },
                text:{
                    tipsText:'',
                    status: true,
                    btnText1: '下一步',
                    btnText2: '确定',
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
                    tip:["输入旧登录密码","输入旧登录密码"], // 1，输入框的placeholder值。2，显示值
                    openJudge:[],
                },
                npasArg:{
                    defaultText:"",     // 默认的值
                    inputType:false,   // 输入框类型，true、text。false、password
                    isJudge:false,  // 是否显示正确的绿钩  true、显示。false、不显示
                    isPrompt:true, // 是否密码显示功能 true、。false、
                    isshowErr:false, // 是否错误抖动 true、抖动。false、不抖动
                    tip:["输入新密码","新密码"], // 1，输入框的placeholder值。2，显示值
                    openJudge:[],
                },
                vnpasArg:{
                    defaultText:"",     // 默认的值
                    inputType:false,   // 输入框类型，true、text。false、password
                    isJudge:false,  // 是否显示正确的绿钩  true、显示。false、不显示
                    isPrompt:true, // 是否密码显示功能 true、。false、
                    isshowErr:false, // 是否错误抖动 true、抖动。false、不抖动
                    tip:["确认新密码","确认密码"], // 1，输入框的placeholder值。2，显示值
                    openJudge:[],
                },
            }
        },
        props: ['ud'],
        components:{
            "pwdInput": inputControl,
        },
        watch: {
            'active': function (n,o) {
                if(n==0){
                    this.userData.pwd = '';
                    this.text.canelState = true;
                    this.show.pwdErr = false;
                }else{
                    this.userData.code = '';
                    this.text.canelState = false;
                }
                this.showpwd = 'password';
            },
        },
        methods:{
            iptEnter(p){
                this.next();
            },
            pasReqMes0(p){
                this.userData.pwd = p.n;
            },
            pasReqMes1(p){
                this.userData.npwd =  p.n;
            },
            pasReqMes2(p){
                this.userData.vnpwd = p.n;
            },
            closeThis(f){
                this.$emit('subchange',{
                    name: 'pwd',
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
                },2000)
            },
            openErrTips(){
                this.show.pwdErr = true;
                setTimeout(()=>{
                    this.show.pwdErr = false;
                },2000)
            },
            test(val,type){  //格式校验
                let flag = false;
                if(val == ''){ // 空值 长度
                    return flag;
                }
                if(type === 0){ //密码校验
                    flag = true;
                    if(val!==val.replace(/ /g,'')){ //空格判断
                        flag = false;
                    }else if(val.length<6 || val.length>16){ //长度判断
                        flag = false;
                    }
                }else if(type === 1 ) { //手机校验
                    flag = true;
                }
                return flag;
            },
            checkPwd(){     //密码验证
                let that = this, ud = that.ud;
//                if(!that.test(that.userData.pwd,0))return that.openTips("*请输入正确的密码格式");
                if(that.userData.pwd===ud.pwd){
                    that.text.status = false;
                    that.active = 1;
                    that.openErrTips();
                }else{
                    that.openTips("*密码错误，请重新输入")
                }
            },
            checkNewPwd(){     //新密码验证
                let that = this,flag=false, pwd = that.userData.npwd, vpwd = that.userData.vnpwd, id = that.ud.id.toString();
                if(!that.test(pwd,0)){
                    that.openErrTips();
                    return that.openTips("*请输入正确的密码格式");
                }
                if(pwd== that.ud.pwd){
                    return that.openTips("*新旧密码不能相同");
                }
                //发送至后台
                if(pwd===vpwd){
                    let opt = {
                        employeeId: id,
                        password: pwd
                    }
                    this.$ajax({
                        method: 'GET',
                        url: '/updateEmployee',
                        params:{
                            id: id,
                            password: pwd
                        }
                    }).then(res=>{
                        if(res.data.opResult === '0'){
                            that.active = 2;
                            that.result = true;
                            that.ud.pwd = pwd;
                        }else if( res.data.opResult === '2' ){
                            that.active = 2;
                            that.result = false;
                        }
                        that.delayClose();
                    }).catch(err=>{
                        that.active = 2;
                        that.result = false;
                        that.delayClose();
                    })
                }else{
                    that.openErrTips();
                    that.openTips("*两次密码输入不一致，请重新输入")
                }
            },
            next() {
                let that = this;
                switch(this.active){
                    case 0:
                        that.checkPwd();
                        break;
                    case 1:
                        that.checkNewPwd();
                        break;
                }
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
        position: relative;
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
            .pwd-err-tip{
                position: absolute;
                width: 220px;
                height: 100px;
                top: 150px;
                right: -50px;
                border-radius: 8px;
                background-color: #fff;
                box-shadow: 0 0 15px rgba(150,150,150,.3);
                padding-top: 5px;
                padding-left: 20px;
                color: rgba(60,120,255,.8);
                z-index: 2;
                li{
                    line-height: 30px;
                }
            }
            .process-main{
                width:240px;
                height:150px;
                margin: 0 auto;
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
        input{
            appearance: none;
            background:none;
            outline:none;
            outline: none;

            display: inline-block;
            position: absolute;
            border-radius: 20px;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            text-indent: 10px;
            border: 1px solid #e9e9e9;
            &:focus{
                border: 1px solid #4b78e0;
            }
        }
        span{
            font-family: "iconfont";
            font-size: 18px;
            color: rgb(160,160,160);
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
            &:hover{
                color: #4b78e0;
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