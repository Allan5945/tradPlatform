<template>
    <div class="registered-box" onselectstart="return false;">
        <header>
            <p>更换手机 <span  class="iconfont closer" @click="closeThis">&#xe62c;</span></p>
        </header>
        <template v-if="show.self">
            <template v-if="active<3">
                <div class="process-navi">
                    <div class="process-img">
                        <el-steps :active="active" align-center>
                            <el-step title="输入密码">
                                <i class="iconfont">&#xe62c;</i>
                            </el-step>
                            <el-step title="输入手机">
                                <i class="iconfont">&#xe62c;</i>
                            </el-step>
                            <el-step title="手机验证">
                                <i class="iconfont">&#xe62c;</i>
                            </el-step>
                            <el-step title="完成">
                                <i class="iconfont">&#xe62c;</i>
                            </el-step>
                        </el-steps>
                    </div>
                </div>
                <div class="process-body">
                    <div class="process-main" v-show="active==0">
                        <pwdInput :par="pasArg" v-on:reqMes="pasReqMes" v-on:entered="iptEnter()" v-if="active==0"></pwdInput>
                    </div>
                    <div class="process-main" v-show="active==1">
                        <pwdInput :par="oArg" v-on:reqMes="phoneReqMes" v-if="active==1"></pwdInput>
                        <validation v-if="active==1 && valiUseFlag" v-on:validation="validPass" style="margin-top:30px;"></validation>
                    </div>
                    <div class="process-main" v-if="active==2" style="margin-top: -25px;width: 230px;">
                        <p style="height:25px;color:#aaa;text-indent: 3px;">输入新手机号</p>
                        <div class="full-btn">
                            <input type="text" v-model="userData.phone" disabled placeholder="">
                            <span class="success">&#xe61f;</span>
                        </div>
                        <span v-show="show.yzmTip" class="yzm-tip">短信验证码已发送，请注意查收</span>
                        <div class="full-btn" style="margin-top: 40px;">
                            <input type="text" v-model="userData.code" placeholder="" maxlength="6">
                            <span class="yzm" @click="getCode">{{ code.tipText }}</span>
                        </div>
                    </div>
                    <footer v-show="show.footer">
                        <p class="wjmm"><span class="tips">{{ text.tipsText }}</span><span v-show="active==0" @click="closeThis(true)">忘记密码？</span>&nbsp;</p>
                        <div class="step-btn">
                            <div class="btn" :class="{'btn-b':text.status,'btn-blk':!text.status}" @click="next()">{{ text.status?text.btnText1:text.btnText2 }}</div>
                            <div v-show="active!=1" class="btn btn-w" @click="canelClick">{{ text.canelState?text.canel1:text.canel2 }}</div>
                        </div>
                        <p class="lxkf">客服热线：0000-0000000</p>
                    </footer>
                </div>
            </template>
            <div class="result" v-else>
                <div class="overPage" v-if="result">
                    <div>
                        <h1>(*^__^*)更换手机成功</h1>
                        <p>3秒后自动返回</p>
                    </div>
                </div>
                <div class="overPage" v-else>
                    <div>
                        <h1>(⊙v⊙)更换手机失败</h1>
                        <p>3秒后自动返回</p>
                    </div>
                </div>
                <footer>
                    客服热线：000-0000000
                </footer>
            </div>
        </template>
        <div class="result flex-center" v-else>
        </div>
    </div>
</template>
<script>
    import inputControl from '$src/page/loginProcess/components/inputControl.vue';
    import validation from '$src/page/loginProcess/components/validation.vue';
    import {Steps,Step,Loading} from 'element-ui';

    export default {
        data(){
            return{
                active: 0,
                result: false,
                tps:"",
                show:{
                    self: true,
                    footer: true,
                    yzmTip: false
                },
                validFlag: false,
                userData: {
                    pwdmask: '',
                    pwd: '',
                    phone: '',
                    code: '',
                },
                code:{
                    control: true,
                    tipText:'获取验证码',
                    wait: 60,
                },
                showpwd: 'password',
                text:{
                    tipsText:'',
                    status: true,
                    btnText1: '下一步',
                    btnText2: '确定',
                    canelState: true,
                    canel1:'取消',
                    canel2:'上一步'
                },
                oArg:{
                    defaultText:"",     // 默认的值
                    inputType:true,   // 输入框类型，true、text。false、password
                    isJudge:false,  // 是否显示正确的绿钩  true、显示。false、不显示
                    isPrompt:false, // 是否密码显示功能 true、。false、
                    isshowErr:false, // 是否错误抖动 true、抖动。false、不抖动
                    tip:["输入新手机号","新手机号"], // 1，输入框的placeholder值。2，显示值
                    openJudge:[/^[1][3,4,5,7,8][0-9]{9}$/],
                },
                pasArg:{
                    defaultText:"",     // 默认的值
                    inputType:false,   // 输入框类型，true、text。false、password
                    isJudge:false,  // 是否显示正确的绿钩  true、显示。false、不显示
                    isPrompt:true, // 是否密码显示功能 true、。false、
                    isshowErr:false, // 是否错误抖动 true、抖动。false、不抖动
                    tip:["输入登录密码","登录密码"], // 1，输入框的placeholder值。2，显示值
                    openJudge:[],
                },
                valiUseFlag: false
            }
        },
        props: ['ud'],
        components:{
            validation,
            "inputControl": inputControl,
            "pwdInput": inputControl,
            "el-steps": Steps,
            "el-step": Step,
        },
        watch: {
            'active': function (n,o) {
                if(n==0){
                    this.userData.pwd = '';
                    this.text.canelState = true;
                }else{
                    this.userData.code = '';
                    this.text.canelState = false;
                }
            },
            'userData': {
                deep: true,
                handler:function (n,o) {
                    return ;
                    if(o.code !== n.code && n.code.length == 4){
                        return this.text.status = true;
                    }
                    if(o.phone !== n.phone && n.phone.length ==11){
                        return this.text.status = true;
                    }
                    if(o.pwd !== n.pwd && n.pwd.length > 0){
                        return this.text.status = true;
                    }
                    return this.text.status = false;
                }
            }
        },
        methods:{
            iptEnter(p){
                this.next();
            },
            pasReqMes(p){//密码
                this.userData.pwd = p.n;
            },
            phoneReqMes(p){//新手机号
                let np = p.n;
                this.userData.phone = p.n;
                this.valiUseFlag = false;
                this.validFlag = false;
                if(np.length == 11){
                    this.valiUseFlag = true;
                }
            },
            validPass(){//滑动验证通过
                let that = this, phone = this.userData.phone;
                that.$ajax({
                    method: 'GET',
                    url: '/validPhone',
                    params:{
                        phone,
                        validType: 0
                    }
                }).then((res)=>{
                    if(res.data.opResult== '0'){
                        that.validFlag = true;
                    }else{
                        that.validFlag = false;
                        that.valiUseFlag = false;
                        that.userData.phone = '';
                        that.openTips("*该手机已经绑定，请切换",3000);
                    }

                })
            },
            closeThis(f){//关闭
                this.$emit('subchange',{
                    name: 'phone',
                    type: f===true ? 1:0
                })
            },
            delayClose(){//延时关闭
                setTimeout(this.closeThis,3000)
            },
            openTips(txt, t){//错误提示
                t = t || 1000;
                this.text.tipsText = txt;
                setTimeout(()=>{
                    this.text.tipsText = '';
                }, t)
            },
            test(val,type){  //格式校验
                let flag = false;
                if(val == ''){ // 空值 长度
                    return flag;
                }
                if(type === 0){ //密码校验
                    flag = true;
                }else if(type === 1 ) { //手机校验
                    let reg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
                    flag = reg.test(val);
                }
                return flag;
            },
            checkPwd(){     //密码验证
                let that = this,flag=false;
                if(!that.test(that.userData.pwd,0))return that.openTips("*密码格式有误，请重新输入");
                //后台验证
                if(that.userData.pwd===that.ud.pwd){
                    flag = true;
                }else{
                    that.openTips("*密码错误，请重新输入")
                }
                if(flag){
                    that.userData.phone = '';
                    that.active = 1;
                    that.validFlag = false;
                }
            },
            checkNewPhone(){    //手机验证
                let that = this,flag = false;
                if(!that.test(that.userData.phone,1)){
                    return that.openTips("*手机号格式有误，请重新输入");
                }
                if(!that.validFlag){
                    return  that.openTips("*请通过验证");
                }
                //正则比较 + 后台验证
                if(that.userData.phone === that.ud.phone){
                    that.openTips("*更换手机号与现绑定手机号相同");
                }else{
                    flag = true;
                }
                if(flag){
                    that.text.status = true;
                    that.active = 2;
                }
            },
            calcTime(){//60s倒计时
                if(this.code.wait>1){
                    this.code.wait--;
                    this.code.tipText =  this.code.wait + "' 重新发送";
                    setTimeout(()=>{
                        this.calcTime();
                    },1000)
                }else{
                    this.code.wait = 60;
                    this.code.tipText =  "重新发送";
                }
            },
            getCode(e) {//获取验证码
                let that = this;
                if(that.code.wait === 60){
                    let ud = that.ud, np = that.userData.phone;
                    this.$ajax({
                        method: 'GET',
                        url: '/getValidCode',
                        params:{
                            contactWay: np
                        }
                    }).then(res=>{
                        if(res.data.opResult === '0'){
                            that.show.yzmTip = true;
                            that.calcTime();
                        }else{
                            let valt = window.localStorage.getItem("validCodeTime"), nowt = (new Date()).getTime();
                            nowt = nowt - valt;
                            if( nowt < 60000 ){
                                that.openTips("*验证码发送间隔不能小于1分钟");
                                that.code.wait = Math.ceil(nowt/1000);
                                that.calcTime();
                            }
                        }
                    })
                }
            },
            checkCode(){    //验证码判断
                let that = this,flag = false
                let np = that.userData.phone, code = that.userData.code;
                that.show.yzmTip = false;
                this.$ajax({
                    method: 'GET',
                    url: '/switchPhone',
                    params:{
                        phone: np,
                        validCode: code
                    }
                }).then(res=>{
                    if(res.data.opResult === '0'){
                        that.ud.phone = np;
                        that.delayClose();
                        that.result = true;
                        that.show.footer = false;
                        that.active = 3;
                    }else{
                        this.userData.code = '';
                        that.openTips("*短信验证码错误");
                    }
                }).catch(err=>{
                    that.result = false;
                    that.show.footer = false;
                    that.active = 3;
                })
            },
            next() {
                let that = this;
                if(!that.text.status)return;
                switch(this.active){
                    case 0:
                        that.checkPwd();
                        break;
                    case 1:
                        that.checkNewPhone();
                        break;
                    case 2:
                        that.checkCode();
                        break;
                }
                return ;
            },
            canelClick(){//取消按钮
                if(this.text.canelState){
                    this.closeThis();
                }else{
                    this.active--;
                    this.code.wait = 60;
                    this.code.tipText =  "获取验证码";
                    this.validFlag = false;
                    setTimeout(()=>{
                        this.valiUseFlag = false;
                    },30)
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
        height: 470px;
        overflow: hidden;
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
        .process-navi{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100px;
            .process-img{
                width: 80%;
                .is-success{
                    font-size: 12px !important;
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
                position: absolute;
                width: 290px;
                bottom: 0;
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
        justify-content: space-around;
        >div{
            border-radius:25px;
            width: 135px;
            height: 45px;
            text-align: center;
            line-height: 45px;
        }
    }
    .el-step__title{
        font-size: 12px !important;
    }
    .yzm-tip{
        display: inline-block;
        position: absolute;
        bottom: 43%;
        left: 18%;
        color: #aaa;
    }
    .full-btn{
        position: relative;
        width: 240px;
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
            left: 0;
            width: 100%;
            height: 100%;
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
            &.success{
                color: rgb(124,193,70);
            }
        }
    }
    .flex-center{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .btn-blk{
        background-color: rgb(204,204,204);
    }
    .result{
        height: 420px;
        position: relative;
        .overPage{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 370px;
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