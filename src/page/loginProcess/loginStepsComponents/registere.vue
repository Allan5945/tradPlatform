<template>
    <div class="login-box">
        <div class="reg-box">
            <div class="dorp-list">
                <div class="dorp-list-head" @click="openList">{{collect.userType}}<span>&#xe605;</span></div>
                <div class="dorp-list-box popup" v-if="showOpenList">
                    <div @click="selectItem(key)" v-for="key in item" v-text="key"></div>
                </div>
                <span class="user-tip user-tip-tran">申请用户对象</span>
            </div>
            <userObj :arg="data1" v-on:resMes="resMes1"></userObj>
            <userObj :arg="data2" v-on:resMes="resMes2"></userObj>
            <userObj :arg="data3" v-on:resMes="resMes3"></userObj>
            <validation v-on:validation="validaon"  v-if="validationTag"></validation>
            <verificationCode :mes="collect.tel" v-on:setCode="setCode" :verCode.sync="verCode" v-if="verCode" style="margin-top:30px;"></verificationCode>
            <div>
                <el-checkbox v-model="checked" style="color:#605E7C">展开可选填内容，填写完整表单 </el-checkbox>
            </div>
            <userObj :arg="data4" v-on:resMes="resMes4" v-if="checked"></userObj>
            <userObj :arg="data5" v-on:resMes="resMes5" v-if="checked"></userObj>
            <userObj :arg="data6" v-on:resMes="resMes6" v-if="checked"></userObj>
            <userObj :arg="data7" v-on:resMes="resMes7" v-if="checked"></userObj>
            <userObj :arg="data8" v-on:resMes="resMes8" v-if="checked"></userObj>
        </div>
        <div class="step-btn">
            <div :class="{'btn-b':process ,'step-btn-dis':!process}" class="btn" >确认</div>
            <div class="btn btn-w" @click="openReg(0)">返回登录</div>
        </div>
    </div>
</template>
<script>
//    import inputControl from '../components/inputControl.vue';
    import inputControl from '../components/inputControlX.vue';
    import validation from '../components/validation.vue';
    import verificationCode from '../components/verificationCode.vue';

export default {
        data(){
            return{
                collect:{
                    userType:'航司',    // 航司
                    concat:"",          // 联系人
                    companyName:"",    //单位名称
                    tel:"",              // 电话
                    department:"",     // 部门
                    position:"",       // 职位
                    email:"",           // 邮箱
                    companyAddr:"",     // 地址
                    comment:""           // 备注
                },
                codeYz:'',          // 验证码
                verCode:false,       // 是否显示短信/邮箱验证
                validationTag:false,
                item:["航司","政府/机场","包机商","其他"],
                showOpenList:false,
                loginTime:0,
                checked:false,
                data1:{
                    inputeType:"text", // 输入框的类型
                    inputMes:"",     // 输入框的值
                    showText:false,  // 是否显示密码
                    showErrInput:false, // 是否显示框错误
                    showSucInput:false, // 是否显示框正确
                    placeholderTip:["联系人","联系人"],
                    validation:100,   // number,1、账号/邮箱，2、密码，3、..自己扩展
                },
                data2:{
                    inputeType:"text", // 输入框的类型
                    inputMes:"",     // 输入框的值
                    showText:false,  // 是否显示密码
                    showErrInput:false, // 是否显示框错误
                    showSucInput:false, // 是否显示框正确
                    placeholderTip:["单位全称","单位全称"],
                    validation:100,   // number,1、账号/邮箱，2、密码，3、邮箱
                },
                data3:{
                    inputeType:"text", // 输入框的类型
                    inputMes:"",     // 输入框的值
                    showText:false,  // 是否显示密码
                    showErrInput:false, // 是否显示框错误
                    showSucInput:false, // 是否显示框正确
                    placeholderTip:["联系方式（请输入电话或邮箱）","联系方式（请输入电话或邮箱）"],
                    validation:0,   // number,1、账号/邮箱，2、密码，3、..自己扩展
                },
                data4:{
                    inputeType:"text", // 输入框的类型
                    inputMes:"",     // 输入框的值
                    showText:false,  // 是否显示密码
                    showErrInput:false, // 是否显示框错误
                    showSucInput:false, // 是否显示框正确
                    placeholderTip:["部门","部门"],
                    validation:100,   // number,1、账号/邮箱，2、密码，3、..自己扩展
                },
                data5:{
                    inputeType:"text", // 输入框的类型
                    inputMes:"",     // 输入框的值
                    showText:false,  // 是否显示密码
                    showErrInput:false, // 是否显示框错误
                    showSucInput:false, // 是否显示框正确
                    placeholderTip:["职位","职位"],
                    validation:100,   // number,1、账号/邮箱，2、密码，3、..自己扩展
                },
                data6:{
                    inputeType:"text", // 输入框的类型
                    inputMes:"",     // 输入框的值
                    showText:false,  // 是否显示密码
                    showErrInput:false, // 是否显示框错误
                    showSucInput:false, // 是否显示框正确
                    placeholderTip:["邮箱","邮箱"],
                    validation:2,   // number,1、账号/邮箱，2、密码，3、..自己扩展
                },
                data7:{
                    inputeType:"text", // 输入框的类型
                    inputMes:"",     // 输入框的值
                    showText:false,  // 是否显示密码
                    showErrInput:false, // 是否显示框错误
                    showSucInput:false, // 是否显示框正确
                    placeholderTip:["地址","地址"],
                    validation:100,   // number,1、账号/邮箱，2、密码，3、..自己扩展
                },
                data8:{
                    inputeType:"text", // 输入框的类型
                    inputMes:"",     // 输入框的值
                    showText:false,  // 是否显示密码
                    showErrInput:false, // 是否显示框错误
                    showSucInput:false, // 是否显示框正确
                    placeholderTip:["备注说明","备注说明"],
                    validation:100,   // number,1、账号/邮箱，2、密码，3、..自己扩展
                }
            }
        },
        methods:{
            setCode:function(code){
                if(code.length == 6){
                    this.codeYz = code;
                }else{
                    this.codeYz = '';
                }
            },
            openList(){
                this.showOpenList = !this.showOpenList;
            },
            validaon(){
                this.validationTag = false;
                this.verCode = true;
            },
            openReg(n){
                this.$emit('openClass',n);
            },
            selectItem(k){
                this.showOpenList = false;
                this.collect.userType = k;
            },
            resMes(data){

            },
            resMes1(data){
                this.collect.concat  = data.i;
            },
            resMes2(data){
                this.collect.companyName  = data.i;
            },
            resMes3(data){
                if(data.t){
                    this.collect.tel  = data.i;
                }else{
                    this.collect.tel  = "";
                };
                this.validationTag = data.t;
            },
            resMes4(data){
                this.collect.department  = data.i;
            },
            resMes5(data){
                this.collect.position  = data.i;
            },
            resMes6(data){
                this.collect.email  = data.i;
            },
            resMes7(data){
                this.collect.companyAddr  = data.i;
            },
            resMes8(data){
                this.collect.comment  = data.i;
            }
        },
        components:{
            userObj:inputControl,
            validation:validation,
            verificationCode
        },
        computed:{
            process(){
                if(this.checked){
                    if(
                        this.collect.userType != "" &&
                        this.collect.concat != "" &&
                        this.collect.companyName != "" &&
                        this.collect.tel != "" &&
                        this.collect.department != "" &&
                        this.collect.position != "" &&
                        this.collect.email != "" &&
                        this.collect.companyAddr != "" &&
                        this.collect.comment != ""
                    ){
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    if(
                        this.collect.userType != "" &&
                        this.collect.concat != "" &&
                        this.collect.companyName != "" &&
                        this.collect.tel != ""
                    ){
                        return true;
                    }else{
                        return false;
                    }
                }

            }
        }
    }
</script>
<style scoped lang="scss">
    .dorp-list-box{
        background-color: white;
        overflow: hidden;
        >div{
            height: 38px;
            line-height: 38px;
            padding-left: 15px;
            &:hover{
                background-color: #f5f5f5;
                cursor: pointer;
            }
        }
    }
    .user-tip {
        position: absolute;
        color: #989898;
        top: 12px;
        left: 15px;
        transition: all .3s ease;
        z-index: -1;
    }
    .user-tip-tran {
        // transform: translateY(-35px);
        transform: translate(-15px, -35px);
    }
    .dorp-list{
        height: 38px;
        border: 1px solid #e9e9e9;
        border-radius: 19px;
        position: relative;
        z-index: 10;
    }
    .dorp-list-head{
        height: 38px;
        padding-left: 15px;
        line-height: 38px;
        color: #605E7C;
        position: relative;
        cursor: pointer;
        >span{
            position: absolute;
            right: 10px;
            font-family: iconfont;
            color: #3c78ff;
            font-size: 25px;
            &:hover{
                color: #204fff;
            }
        }
    }
    .step-btn-dis{
        cursor: not-allowed;
        background-color:#cccccc;
    }
    .login-box{
        position: relative;
        height: 550px;
        /*max-height: 550px;*/
        /*min-height:460px;*/
    }
    .reg-box{
        overflow: auto;
        height: 421px;
        padding: 20px 35px 0 35px;
        >div{
            margin-top: 30px;
        }
    }
    .step-btn{
        padding: 20px 35px 0 35px;
        width: 290px;
        color: white;
        display: flex;
        justify-content: space-between;
        margin: 41.5px 0 !important;
        bottom: 0px;
        position: absolute;
        >div{
            border-radius:25px;
            width: 135px;
            height: 45px;
            text-align: center;
            line-height: 45px;
        }
    }
</style>