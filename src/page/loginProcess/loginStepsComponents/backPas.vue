<template>
    <div class="back-pas-box">
        <userObj :arg="data1" v-on:resMes="resMes1" v-if="!newPas" v-on:resCodeSycn="resCodeSycn"></userObj>
        <validation v-on:validation="validaon" v-if="validationTag" style="width: 290px; margin-top: 30px"></validation>
        <verificationCode :mes="collect.tel" v-on:setCode="setCode" :verCode.sync="verCode" v-if="verCode"
                          style="margin-top:30px;width: 290px"></verificationCode>
        <userObj :arg="data2" v-on:resMes="resMes2" v-if="newPas"></userObj>
        <userObj :arg="data3" v-on:resMes="resMes3" v-if="newpas.pas1 != ''" style="margin-top: 30px"></userObj>
        <errTip :arg="tiperr" :sh.sync="showtip" v-if="showtip" style="bottom: 90px;left:20px;"></errTip>
        <div class="step-btn">
            <div v-if="!newPas" :class="{'btn-b':process ,'step-btn-dis':!process}" class="btn" @click="validCodefun">确认</div>
            <div v-if="newPas" :class="{'btn-b':reeq ,'step-btn-dis':!reeq}" class="btn" @click="updateEmployee">确认</div>
            <div class="btn btn-w" @click="openReg">返回登录</div>
        </div>
        <div class="lxkf">联系客户：0000-0000000</div>
    </div>
</template>
<script>
    import inputControl from '../components/inputControlX.vue';
    import errTip from '../components/errTip.vue';
    import validation from '../components/validation.vue';
    import verificationCode from '../components/verificationCode.vue';
    export default {
        data(){
            return{
                newPas:false,
                collect:{
                    tel:"",
                    validCode:""
                },
                data1: {
                    inputeType: "text", // 输入框的类型
                    inputMes: "",     // 输入框的值
                    showText: false,  // 是否显示密码
                    showErrInput: true, // 是否显示框错误
                    showSucInput: false, // 是否显示框正确
                    syncPhone:true,     // 是否验证手机
                    placeholderTip: ["请输入账号绑定的邮箱或手机号", "请输入账号绑定的邮箱或手机号"],
                    validation: 3,   // number,1、账号/邮箱，2、密码，3、..自己扩展
                },
                newpas:{
                    pas1:"",
                    pas2:""
                },
                data2: {
                    inputeType: "password", // 输入框的类型
                    inputMes: "",     // 输入框的值
                    showText: true,  // 是否显示密码
                    showErrInput: true, // 是否显示框错误
                    showSucInput: false, // 是否显示框正确
                    placeholderTip: ["新密码", "新密码"],
                    validation: 1,   // number,1、账号/邮箱，2、密码，3、..自己扩展
                },
                data3: {
                    inputeType: "password", // 输入框的类型
                    inputMes: "",     // 输入框的值
                    showText: true,  // 是否显示密码
                    showErrInput: true, // 是否显示框错误
                    showSucInput: false, // 是否显示框正确
                    placeholderTip: ["确认新密码", "确认新密码"],
                    validation: 1,   // number,1、账号/邮箱，2、密码，3、..自己扩展
                },
                validationTag: false,
                verCode: false,       // 是否显示短信/邮箱验证
                tiperr: "请输入正确的格式",
                showtip: false,
            }
        },
        methods:{
            resMes1(data) {
                this.verCode = false;
                if(data.t){
                    this.validationTag = true;
                    this.collect.tel = data.i;
                }else{
                    this.collect.tel = '';
                    this.validationTag = false;
                };
                if(data.steps == 1 && !data.t){
                    this.tiperr = '请输入正确的格式';
                    this.showtip = true;
                }
            },
            resCodeSycn(p){
                this.$ajax({
                    method: 'post',
                    url: '/validPhone',
                    params:{
                        phone:this.collect.tel,
                        validType:1
                    },
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then((response) => {
                        if(response.data.opResult  == '0'){
                            this.validationTag = true;
                            this.verCode = false;
                        }else{
//                                this.$message({
//                                    showClose: true,
//                                    message: "手机号不存在！",
//                                    type: 'error'
//                                });
                            this.validationTag = false;
                            this.tiperr = '手机号码不存在';
                            this.showtip = true;
                        }
                    })
                    .catch((error) => {
                            console.log(error);
                        }
                    );
            },
            resMes2(data) {
                if(data.t){
                    this.newpas.pas1 = data.i;
                }else{
                    this.newpas.pas1 = '';
                };
                if(data.steps == 1 && !data.t){
                    this.tiperr = '密码格式不正确';
                    this.showtip = true;
                }
            },
            resMes3(data) {
                if(data.t){
                    this.newpas.pas2 = data.i;
                }else{
                    this.newpas.pas2 = '';
                };
                if(data.steps == 1 && !data.t){
                    this.tiperr = '密码格式不正确';
                    this.showtip = true;
                }
            },
            validaon() {
                this.validationTag = false;
                this.verCode = true;


            },
            setCode: function (code) {
                if (code.length == 6) {
                    this.collect.validCode = code;
                } else {
                    this.collect.validCode = '';
                }
            },
            openReg(){
                this.$emit('openClass',0);
            },
            validCodefun(){
                if(!this.process)return;
//                this.newPas = true;
//                this.verCode = false;
//                return;
                this.$ajax({
                    method: 'post',
                    url: '/validCode',
                    params:{
                        contactWay:this.collect.tel,
                        code:this.collect.validCode
                    },
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then((response) => {
                        if(response.data.opResult == "0"){
                            this.newPas = true;
                            this.verCode = false;
                        }else{
                            this.tiperr = '验证码不匹配';
                            this.showtip = true;
                        }
                    })
                    .catch((error) => {
                            console.log(error);
                        }
                    );
            },
            updateEmployee(){
                if(this.reeq){
                    if(this.newpas.pas1 == this.newpas.pas2){
                        this.$ajax({
                            method: 'post',
                            url: '/resetPwd',
                            params:{
                                contactWay:this.collect.tel,
                                newPwd :this.newpas.pas2
                            },
                            headers: {
                                'Content-type': 'application/x-www-form-urlencoded'
                            }
                        })
                            .then((response) => {
                                if(response.data.opResult == "0"){
                                    this.newPas = true;
                                    this.$emit('pasChange',true,1)
                                }else{
                                    this.$emit('pasChange',false)
                                }
                            })
                            .catch((error) => {
                                    console.log(error);
                                }
                            );
                    }else{
                        this.tiperr = '两次密码不一样';
                        this.showtip = true;
                    }
                }
            }
        },
        computed:{
            process(){
                if(
                    this.collect.tel != ""
                    &&this.collect.validCode != ""
                ){
                    return true;
                }
                return false
            },
            reeq(){
                let t = false;
                if(this.newpas.pas1 != '' && this.newpas.pas2 != ''){
                    t = true;
                };
                return t;
            }
        },
        components:{
            userObj:inputControl,
            errTip,
            validation,
            verificationCode,
        }
    }
</script>
<style lang="scss" scoped>
    .lxkf{
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: rgba(0,0,0,.4);
        position: absolute;
        bottom: 0;
    }
    .back-pas-box{
        padding-top: 50px;
        width: 360px;
        height: 370px;
        display: flex;
        flex-flow: column;
        align-items: center;
    }
    .step-btn{
        position: absolute;
        bottom: 50px;
        color: white;
        display: flex;
        justify-content: space-between;
        width: 290px;
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
</style>