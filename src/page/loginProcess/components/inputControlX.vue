<template>
    <div class="user-input-box">
        <input :type="arg.inputeType" class="user-input"
               :class="{'err-input':showErrInputPerform}"
               @input="changeInputMes()"
               @blur="changePlaceholder(false);blused();"
               @focus="changePlaceholder(true)"
               @keyup="entered($event)"
               :maxlength="maxL"
               v-model="arg.inputMes"
        >
        <!--密码可见-->
        <span @click="toview" class="user-toview" v-if="arg.showText" :class="{'show-color':showTextPlaceholder}"
              v-html="showTextPlaceholder ? '&#xe685;':'&#xe7d3;'">&#xe685;</span>
        <!--正确钩钩-->
        <span class="user-judge" v-if="judgePlaceholder && arg.validation == 0">&#xe61f;</span>
        <!--提示的模拟Placeholder-->
        <span v-html="arg.showPlaceholder ? arg.placeholderTip[1] : arg.placeholderTip[0]" class="user-tip"
              :class="{'user-tip-tran':showPlaceholder}"></span>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                staging:"",       // 暂存区
                errsd:false,
                showErrInputPerform: false, // 执行显示框错误
                showPlaceholder: false,   // 是否开启输入框placeholder
                judgePlaceholder:false,   //  是否打开绿×
                showTextPlaceholder:false,
                nowArg:{}
            }
        },
        mounted:function () {
            this.nowArg = Object.assign({},this.arg);
            if(this.arg.inputMes != ""){
                this.showPlaceholder = true;
                this.staging = {t:true,c:"",i:this.arg.inputMes,steps:1}
            }
        },
        computed:{
            maxL(){
                return this.arg.maxLenght != undefined ? this.arg.maxLenght : 1000;
            }
        },
        props: ['arg','useNames'],
        methods: {
            blused(){
                if(this.staging.t){
                    this.showErrInputPerform = false;
                    if(this.staging.i != "" && this.arg.syncPhone){
                        this.$emit('resCodeSycn',this.staging.i);
                        return;
                    }
                }else{
                    this.showErrInputPerform = true;
                }
                let mes = this.staging;
                mes.steps = 1;
                if(mes.i == ""){
                    mes = {
                        steps:1,
                        i:"",
                        t:false,
                        c:""
                    }
                }
                this.$emit('resMes',mes);
            },
            entered(e) {   // 触发enter按键
                if (e.keyCode == 13) this.$emit('entered', {type: 'entered'});
            },
            toview() {   // 切换密码是否显示
                this.showTextPlaceholder = !this.showTextPlaceholder;
                if (!this.showTextPlaceholder) {
                    this.arg.inputeType = "password";
                } else {
                    this.arg.inputeType = "text";
                }
            },
            changePlaceholder(t) {  // 切换placeholder的值
                if (this.arg.inputMes == "") {
                    this.staging = {t:true,i:""};
                    this.showPlaceholder = t;
                }else{
                    this.showPlaceholder = true;
                };
            },
            changeInputMes() {    // 输入框改变验证是否通过
                this.showPlaceholder = true;
//                if(this.arg.inputMes == ''){
//                    this.showErrInputPerform = false;
//                    this.judgePlaceholder = false;
//                    return;
//                };
                this.arg.inputMes = this.arg.inputMes.replace(/ /g,'');
                if(!this.arg.cia){
                    this.arg.inputMes = this.arg.inputMes.replace(/[\u4e00-\u9fa5]/g,'');
                }
                let t = false, c = "",reg; //  t,表示验证是否通过，c 代表具体内容
                switch (this.arg.validation) {
                    case 0:   // 账号
                        reg = [/^1[34578]\d{9}$/, /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/];
                        if (reg[0].test(this.arg.inputMes) || reg[1].test(this.arg.inputMes)) {
                            t = true
                        }else{
                            c = "请输入正确的格式";
                        };
                        break;
                    case 4:   // 电话
                        reg = [/^1[34578]\d{9}$/];
                        if (reg[0].test(this.arg.inputMes)) {
                            t = true
                        }else{
                            c = "请输入正确的格式";
                        };
                        break;
                    case 1:   // 长度
                        if (this.arg.inputMes.length <= 16 && this.arg.inputMes.length >= 6 && this.arg.inputMes.indexOf(" ") == -1) {
                            t = true
                        }else{
                            c = "请输入正确的格式";
                        };
                        break;
                    case 2:   //
                        reg = [ /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/];
                        if (reg[0].test(this.arg.inputMes)) {
                            t = true
                        }else{
                            c = "请输入正确的格式";
                        };
                        break;
                    case 3:   // 账号
                        reg = [/^1[34578]\d{9}$/, /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/];
                        if (reg[0].test(this.arg.inputMes) || reg[1].test(this.arg.inputMes)) {
                            t = true
                        }else{
                            c = "请输入正确的格式";
                        };
                        break;
                    case 100:   // 不验证
                        if(this.useNames){this.arg.inputMes = this.arg.inputMes.replace(/[^\w\d\.\@]/ig,'');}
                        t = true;
                        break;
                    default:
                        // 执行报错
                };
                this.control({t,c,i:this.arg.inputMes,steps:0});
            },
            control(data){
                this.staging = data;
                if(data.t){
                    this.showErrInputPerform = false;
                    if(this.arg.validation == 0){this.judgePlaceholder = true;}
                }else{
                    this.judgePlaceholder = false;
                };
                this.sendMes();
            },
            sendMes(){
                this.$emit('resMes',this.staging)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .user-tip-tran {
        // transform: translateY(-35px);
        transform: translate(-15px, -35px);
    }

    input {
        border: 1px solid #e9e9e9;
    }

    input:focus {
        border: 1px solid #4b78e0;
    }

    .suc-input {
        border: 1px solid #78c342;
    }

    .err-input {
        border: 1px solid #deaaac;
    }

    .err-input:focus {
        border: 1px solid #deaaac;
    }

    .user-input-box {
        position: relative;
        width: 290px;
    }

    .user-input {
        width: 273px;
        height: 38px;
        border-radius: 19px;
        padding-left: 15px;
        outline: none;
        color: #605E7C;
        letter-spacing: 0;
        background-color: transparent;
        &::-webkit-input-placeholder {
            letter-spacing: 0;
        }
    }

    .user-toview {
        font-family: iconfont;
        position: absolute;
        top: 9px;
        right: 14px;
        font-size: 1.8rem;
        color: #989898;
        cursor: pointer;
    }

    .user-judge {
        font-family: iconfont;
        position: absolute;
        top: 9px;
        right: 14px;
        font-size: 1.8rem;
        color: #7ac13d;
    }

    .show-color {
        color: #4468fc !important;
    }

    .user-tip {
        position: absolute;
        color: #989898;
        top: 12px;
        left: 15px;
        transition: all .3s ease;
        pointer-events: none;
    }
</style>


