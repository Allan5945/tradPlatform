<template>
    <div class="login-box">
        <div class="reg-box" v-if="!loginErrMesShow">
            <div class="dorp-list">
                <div class="dorp-list-head" @click="openList">{{collect.userType}}<span>&#xe605;</span></div>
                <div class="dorp-list-box popup" v-if="showOpenList">
                    <div @click="selectItem(key)" v-for="key in item" v-text="key"></div>
                </div>
                <span class="user-tip user-tip-tran">申请用户对象</span>
            </div>
            <userObj :arg="data1" v-on:resMes="resMes1"></userObj>
            <userObj :arg="data2" v-on:resMes="resMes2"></userObj>
            <userObj :arg="data3" v-on:resMes="resMes3" v-on:resCodeSycn="resCodeSycn"></userObj>
            <validation v-on:validation="validaon" v-if="validationTag"></validation>
            <verificationCode :mes="collect.tel" v-on:setCode="setCode" :verCode.sync="verCode" v-if="verCode"
                              style="margin-top:30px;"></verificationCode>
            <div>
                <el-checkbox v-model="checked" style="color:#605E7C">展开可选填内容，填写完整表单 </el-checkbox>
            </div>
            <userObj :arg="data4" v-on:resMes="resMes4" v-if="checked"></userObj>
            <userObj :arg="data5" v-on:resMes="resMes5" v-if="checked"></userObj>
            <userObj :arg="data6" v-on:resMes="resMes6" v-if="checked"></userObj>
            <userObj :arg="data7" v-on:resMes="resMes7" v-if="checked"></userObj>
            <userObj :arg="data8" v-on:resMes="resMes8" v-if="checked"></userObj>
        </div>
        <errTip :arg="tiperr" :sh.sync="showtip" v-if="showtip" style="bottom: 90px;left:20px;"></errTip>
        <div class="step-btn"  v-if="!loginErrMesShow">
            <div :class="{'btn-b':process ,'step-btn-dis':!process}" class="btn" @click="regUser">确认</div>
            <div class="btn btn-w" @click="openReg(0)">返回登录</div>
        </div>
        <div class="res-results" v-if="loginErrMesShow">
            <h3 class="loginErr-title" v-html="loginErrMes.tltle">></h3>
            <p class="loginErr-mes" v-text="loginErrMes.p"></p>
            <div class="cup">
                <cuPhone></cuPhone>
            </div>
        </div>
    </div>
</template>
<script>
    //    import inputControl from '../components/inputControl.vue';
    import inputControl from '../components/inputControlX.vue';
    import validation from '../components/validation.vue';
    import verificationCode from '../components/verificationCode.vue';
    import errTip from '../components/errTip.vue';
    import cuPhone from "../components/customerPHone.vue"

    export default {
        data() {
            return {
                loginErrMes:{
                    tltle:"(oﾟ▽ﾟ)o申请提交成功",
                    p:"审核结果将以短信方式发送，请注意查收",
                },
                loginErrMesShow:false,
                tiperr: "请输入正确的格式",
                showtip: false,
                collect: {
                    userType: '航司',    // 航司
                    concat: "",          // 联系人
                    companyName: "",    //单位名称
                    tel: "",              // 电话
                    department: "",     // 部门
                    position: "",       // 职位
                    email: "",           // 邮箱
                    companyAddr: "",     // 地址
                    comment: "",          // 备注
                    validCode: ""       // 验证码参数
                },
                codeYz: '',          // 验证码
                verCode: false,       // 是否显示短信/邮箱验证
                validationTag: false,
                item: ["航司", "政府/机场", "包机商", "其他"],
                showOpenList: false,
                loginTime: 0,
                checked: false,
                data1: {
                    inputeType: "text", // 输入框的类型
                    inputMes: "",     // 输入框的值
                    showText: false,  // 是否显示密码
                    showErrInput: false, // 是否显示框错误
                    showSucInput: false, // 是否显示框正确
                    placeholderTip: ["联系人", "联系人"],
                    validation: 100,   // number,1、账号/邮箱，2、密码，3、..自己扩展,
                    cia:true             // 是否支持中文输入
                },
                data2: {
                    inputeType: "text", // 输入框的类型
                    inputMes: "",     // 输入框的值
                    showText: false,  // 是否显示密码
                    showErrInput: false, // 是否显示框错误
                    showSucInput: false, // 是否显示框正确
                    placeholderTip: ["单位全称", "单位全称"],
                    validation: 100,   // number,1、账号/邮箱，2、密码，3、邮箱
                    cia:true             // 是否支持中文输入
                },
                data3: {
                    inputeType: "text", // 输入框的类型
                    inputMes: "",     // 输入框的值
                    showText: false,  // 是否显示密码
                    showErrInput: false, // 是否显示框错误
                    showSucInput: false, // 是否显示框正确
                    placeholderTip: ["联系方式（请输入电话）", "联系方式（请输入电话）"],
                    validation: 4,   // number,1、账号/邮箱，2、密码，3、..自己扩展
                    syncPhone:true,     // 是否验证手机
                },
                data4: {
                    inputeType: "text", // 输入框的类型
                    inputMes: "",     // 输入框的值
                    showText: false,  // 是否显示密码
                    showErrInput: false, // 是否显示框错误
                    showSucInput: false, // 是否显示框正确
                    placeholderTip: ["部门", "部门"],
                    validation: 100,   // number,1、账号/邮箱，2、密码，3、..自己扩展
                },
                data5: {
                    inputeType: "text", // 输入框的类型
                    inputMes: "",     // 输入框的值
                    showText: false,  // 是否显示密码
                    showErrInput: false, // 是否显示框错误
                    showSucInput: false, // 是否显示框正确
                    placeholderTip: ["职位", "职位"],
                    validation: 100,   // number,1、账号/邮箱，2、密码，3、..自己扩展
                },
                data6: {
                    inputeType: "text", // 输入框的类型
                    inputMes: "",     // 输入框的值
                    showText: false,  // 是否显示密码
                    showErrInput: false, // 是否显示框错误
                    showSucInput: false, // 是否显示框正确
                    placeholderTip: ["邮箱", "邮箱"],
                    validation: 2,   // number,1、账号/邮箱，2、密码，3、..自己扩展
                },
                data7: {
                    inputeType: "text", // 输入框的类型
                    inputMes: "",     // 输入框的值
                    showText: false,  // 是否显示密码
                    showErrInput: false, // 是否显示框错误
                    showSucInput: false, // 是否显示框正确
                    placeholderTip: ["地址", "地址"],
                    validation: 100,   // number,1、账号/邮箱，2、密码，3、..自己扩展
                },
                data8: {
                    inputeType: "text", // 输入框的类型
                    inputMes: "",     // 输入框的值
                    showText: false,  // 是否显示密码
                    showErrInput: false, // 是否显示框错误
                    showSucInput: false, // 是否显示框正确
                    placeholderTip: ["备注说明", "备注说明"],
                    validation: 100,   // number,1、账号/邮箱，2、密码，3、..自己扩展
                }
            }
        },
        methods: {
            regUser() {
                if (!this.process) return;
                this.$ajax({
                    method: 'post',
                    url: '/register',
                    params: this.collect,
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then((response) => {
                        if (response.data.opResult == "0") {
                            this.loginErrMes = {
                                tltle:"(oﾟ▽ﾟ)o申请提交成功",
                                p:"审核结果将以短信方式发送，请注意查收",
                            };
                        }else{
                            this.loginErrMes = {
                                tltle:"(╯︵╰)因为某种神秘力量<br>您的申请提交失败",
                                p:"请稍后再试，或拨打客服热线",
                            };
                        };
                        this.loginErrMesShow = true;
                    })
                    .catch((error) => {
                            console.log(error);
                        }
                    );
            },
            setCode: function (code) {
                if (code.length == 6) {
                    this.collect.validCode = code;
                } else {
                    this.collect.validCode = '';
                }
            },
            openList() {
                this.showOpenList = !this.showOpenList;
            },
            validaon() {
                this.validationTag = false;
                this.verCode = true;
            },
            openReg(n) {
                this.$emit('openClass', n);
            },
            selectItem(k) {
                this.showOpenList = false;
                this.collect.userType = k;
            },
            resMes(data) {

            },
            resMes1(data) {
                this.collect.concat = data.i;
            },
            resMes2(data) {
                this.collect.companyName = data.i;
            },
            resMes3(data) {
                if (data.t) {
                    this.collect.tel = data.i;
                } else {
                    this.collect.tel = "";
                }
                ;
                this.validationTag = data.t;
                if (data.steps == 1) {
                    this.showtip = true;
//                    this.setTime = setTimeout(()=>{this.showtip = false;},1500);
                }
            },
            resCodeSycn(p){
                this.$ajax({
                    method: 'post',
                    url: '/validPhone',
                    params:{
                        phone:this.collect.tel,
                        validType: 0
                    },
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then((response) => {
                        if(response.data.opResult  == '0'){
                            this.validationTag = false;
                            this.tiperr = '您的手机号码已经注册过！';
                            this.showtip = true;
                        }else{
//                                this.$message({
//                                    showClose: true,
//                                    message: "手机号不存在！",
//                                    type: 'error'
//                                });
                            this.validationTag = true;
                            this.verCode = false;
                        }
                    })
                    .catch((error) => {
                            console.log(error);
                        }
                    );
            },
            resMes4(data) {
                this.collect.department = data.i;
            },
            resMes5(data) {
                this.collect.position = data.i;
            },
            resMes6(data) {
                if (data.t) {
                    this.collect.email = data.i;
                } else {
                    this.collect.email = "";
                }
                ;
                if (data.steps == 1) {
                    this.showtip = true;
                }
            },
            resMes7(data) {
                this.collect.companyAddr = data.i;
            },
            resMes8(data) {
                this.collect.comment = data.i;
            }
        },
        components: {
            userObj: inputControl,
            validation: validation,
            verificationCode,
            errTip,
            cuPhone
        },
        computed: {
            process() {
                if (this.checked) {
                    if (
                        this.collect.userType != "" &&
                        this.collect.concat != "" &&
                        this.collect.companyName != "" &&
                        this.collect.tel != "" &&
                        this.collect.department != "" &&
                        this.collect.position != "" &&
                        this.collect.email != "" &&
                        this.collect.companyAddr != "" &&
                        this.collect.comment != "",
                        this.collect.validCode != ""
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (
                        this.collect.userType != "" &&
                        this.collect.concat != "" &&
                        this.collect.companyName != "" &&
                        this.collect.validCode != "" &&
                        this.collect.tel != ""
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                }

            }
        }
    }
</script>
<style scoped lang="scss">
    .res-results{
        height: 527px;
        width: 360px;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .loginErr-title{
        font-size:2rem;
        letter-spacing: 1px;
        color:#605E7C;
        text-align: center;
        padding-bottom: 33px;
    }
    .loginErr-mes{
        text-align: center;
        line-height: 20px;
        color:#959595;
    }
    .cup{
        position: absolute;
        bottom: 0;
    }
    .dorp-list-box {
        background-color: white;
        overflow: hidden;
        border-top: 1px solid rgba(0, 0, 0, .05);
        > div {
            height: 38px;
            line-height: 38px;
            padding-left: 15px;
            &:hover {
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

    .dorp-list {
        height: 38px;
        border: 1px solid #e9e9e9;
        border-radius: 19px;
        position: relative;
        z-index: 10;
    }

    .dorp-list-head {
        height: 38px;
        padding-left: 15px;
        line-height: 38px;
        color: #605E7C;
        position: relative;
        cursor: pointer;
        > span {
            position: absolute;
            right: 10px;
            font-family: iconfont;
            color: #3c78ff;
            font-size: 25px;
            &:hover {
                color: #204fff;
            }
        }
    }

    .step-btn-dis {
        cursor: not-allowed;
        background-color: #cccccc;
    }

    .login-box {
        position: relative;
        height: 550px;
        /*max-height: 550px;*/
        /*min-height:460px;*/
    }

    .reg-box {
        overflow: auto;
        height: 421px;
        padding: 20px 35px 0 35px;
        > div {
            margin-top: 30px;
        }
    }

    .step-btn {
        padding: 20px 35px 0 35px;
        width: 290px;
        color: white;
        display: flex;
        justify-content: space-between;
        margin: 41.5px 0 !important;
        bottom: 0px;
        position: absolute;
        > div {
            border-radius: 25px;
            width: 135px;
            height: 45px;
            text-align: center;
            line-height: 45px;
        }
    }
</style>