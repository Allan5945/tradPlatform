<template>
  <div class="user-input-box">
    <input :type="inputeType" class="user-input"
        :class="{'animated':showErr,'shake':showErr,'err-input':showErrInput || errs}"
        @blur="focusTip(true)"
        @focus="focusTip()"
        @input="changeTip()"
        @keyup="entered($event)"
        v-model="inputMes"
    >
    <span @click="toview" class="user-toview" :class="{'show-color':showText}" v-html="showText ? '&#xe685;':'&#xe7d3;'" v-if="this.par.isPrompt">&#xe685;</span>
    <span class="user-judge" v-if="userJudge || mandatoryJudge">&#xe61f;</span>
    <span v-html="showTip ? par.tip[1] : par.tip[0]" class="user-tip" :class="{'user-tip-tran':showTip}"></span>
  </div> 
</template>
<<script>
export default {
    data(){ 
        return{
            showText:false,    // 是否显示 密码
            showTip:false,     // 是否显示 信息
            showErr:false,     // 显示输入错误，输入框抖动
            showErrDelay:false,  //
            showErrInput:false,  // 是否当前输入框格式错误
            inputeType:"",    // 输入框的类型值
            inputMes:"",     // 输入的内容
            // par:{
            //     defaultText:"",     // 默认的值
            //     inputType:true,   // 输入框类型，true、text。false、password
            //     isJudge:true,  // 是否显示正确的绿钩  true、显示。false、不显示
            //     isPrompt:true, // 是否密码显示功能 true、。false、
            //     isshowErr:true, // 是否错误抖动 true、抖动。false、不抖动
            //     tip:["请输入账号、手机号或者邮箱","账号"], // 1，输入框的placeholder值。2，显示值
            //     openJudge:[/^1[34578]\d{9}$/,/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/],                   // 输入正则判断
            // },
        }
    },
    props:['par','errs','mandatoryJudge'],
    methods:{ 
        entered(e){
            if(e.keyCode == 13){
                this.$emit('entered');
            }
        },
        initInput(){  // 初始化输入框
            this.inputMes = this.par.defaultText;
            if(this.inputMes != ""){
                 this.showTip = true;
            };
            if(this.par.inputType){
                this.inputeType = 'text';
            }else{
                this.inputeType = 'password';
            };
        },
        toview(){   // 如果输入框类型有显示密码功能则点击眼睛切换状态
            this.showText = !this.showText; 
            if(this.inputeType == "text"){
                this.inputeType = "password"
            }else{
                this.inputeType = "text"
            }
        },
        focusTip(t){
            if(this.inputMes == ""){
                this.showTip = !this.showTip;
            };
            if(t == true && this.par.isshowErr && this.inputMes != "" && this.showErrDelay){
                this.showErr = true;
                setTimeout(()=>{this.showErr = false;this.showErrDelay = false;},1000);
                this.$emit('reqMes',{n:"",p:'请输入正确的格式',i:false});
            }
        },
        changeTip(){
            if(this.par.class0){
                if(this.inputMes.length > 16 || this.inputMes.indexOf(" ") != -1){
                    this.showErrDelay = true;
                    this.showErrInput = true;
                    this.$emit('reqMes',{n:"",p:'请输入正确的格式',i:true});
                }else{
                    this.showErrInput = false;
                    this.showErrDelay = false;
                    this.$emit('reqMes',{n:this.inputMes,p:'',i:false});
                }
            }else{
                 let err = false;
                if(this.par.openJudge.length > 0){
                    this.par.openJudge.forEach(element => {
                        if((element).test(this.inputMes)){
                            err = true;
                        }
                    });
                }else{
                    // return false;
                };
                let mes = {};
                if(err == false && this.par.isshowErr){
                    this.showErrDelay = true;
                    mes = {n:this.inputMes,p:'',i:true};
                }else{
                    this.showErrDelay = true;
                    this.showErrInput = true;
                    mes = {n:this.inputMes,p:'',i:false};
                };
                this.$emit('reqMes',mes);
            }
        }
    },
    mounted:function () {
        this.initInput();
    },
    computed:{
        userJudge:function(){   // 输入的值类型正确
            if(!this.par.isJudge){return false};
            let ty = false;
            this.par.openJudge.forEach(element => {
                if((element).test(this.inputMes)){
                    ty = true;
                }
            });
            return ty;
        }
    }
}
</script>
<style lang="scss" scoped>
    .user-tip-tran{
        // transform: translateY(-35px);
        transform: translate(-15px,-35px);
    }

    input{
        border:1px solid #e9e9e9; 
    }
    input:focus{ 
        border:1px solid #4b78e0;
    }
    .err-input{
        border:1px solid #deaaac;
    }
    .err-input:focus{
        border:1px solid #deaaac;
    }
    .user-input-box{
        position: relative;
        width:290px;
    }
    .user-input{
        width: 273px;
        height: 38px;
        border-radius:19px;
        padding-left: 15px;
        outline: none;
        color: #605E7C;
        letter-spacing:0;
        background-color: transparent;
        &::-webkit-input-placeholder{
            letter-spacing:0;
        }
    }
    .user-toview{
        font-family: iconfont;
        position: absolute;
        top: 9px;
        right: 14px;
        font-size: 1.8rem;
        color: #989898;
        cursor: pointer;
    }
    .user-judge{
        font-family: iconfont;
        position: absolute;
        top: 9px;
        right: 14px;
        font-size: 1.8rem;
        color: #7ac13d;
    }
    .show-color{
        color:#4468fc !important;
    }
    .user-tip{
        position: absolute;
        color: #989898;
        top: 12px;
        left:15px;
        transition: all .3s ease;
        z-index: -1;
    }
    //  .user-input{
    //     position: relative;
    //     >span{
    //         position: absolute;
    //         font-family: iconfont;
    //         top: 9px;
    //         right:18px; 
    //         font-size: 1.8rem;
    //         cursor: pointer;
    //         color:#989898;
    //     }
    //    >input{
    //     width: 273px;
    //     height: 38px;
    //     border:1px solid #e9e9e9; 
    //     border-radius:19px;
    //     padding-left: 15px;
    //     outline: none;
    //     color: #605E7C;
    //     letter-spacing:0;
    //     &::-webkit-input-placeholder{
    //         letter-spacing:0;
    //     }
    //    }
    // }
    // .show-color{
    //     color:#4468fc !important;
    // }
</style>


