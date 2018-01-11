<template>
  <div class="user-input-box">
    <input :type="arg.inputeType" class="user-input"
        :class="{'animated':arg.showErr,'shake':arg.showErr,'err-input':arg.showErrInput,'suc-input':arg.showSucInput}"
        @blur="blurTip()"
        @focus="focusTip()"
        @input="changeTip()"
        @keyup="entered($event)"
        v-model="arg.inputMes"
    >
    <span @click="toview" class="user-toview" :class="{'show-color':arg.showText}" v-html="arg.showText ? '&#xe685;':'&#xe7d3;'">&#xe685;</span>
    <span class="user-judge" v-if="false">&#xe61f;</span>
    <span v-html="arg.showPlaceholder ? arg.placeholderTip[1] : arg.placeholderTip[0]" class="user-tip" :class="{'user-tip-tran':arg.showPlaceholder}"></span>
  </div> 
</template>
<<script>
export default {
    data(){ 
        return{
            arg:{
                inputeType:"text", // 输入框的类型
                inputMes:"",     // 输入框的值
                showText:false,  // 是否显示密码
                showErr:false,   // 是否抖动
                showErrInput:false, // 是否显示框错误
                showSucInput:false, // 是否显示框正确
                showTip:true,   // 是否选中框
                placeholderTip:['1','2'],
                showPlaceholder:false,   // 是否开启输入框placeholder
                validation:0,   // number,1、账号/邮箱，2、密码，3、..自己扩展
                openJudge:[/^1[34578]\d{9}$/,/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/]
            }
        }
    },
    // props:['arg'],
    methods:{ 
      entered(e){   // 触发enter按键
          if(e.keyCode == 13)this.$emit('entered');
      },
      toview(){   // 切换密码是否显示
        this.arg.showText = !this.arg.showText;
      },
      changePlaceholder(){  // 切换placeholder的值
          if(this.arg.inputMes == ""){
              this.arg.showPlaceholder = !this.arg.showPlaceholder;
          }
      },
      focusTip(){
          this.changePlaceholder();
      },
      blurTip(){
          this.changePlaceholder();
      },
      changeTip(){
          let t = false,c = "";
          switch (this.arg.validation) {
                case 0:
                    let reg = [/^1[34578]\d{9}$/,/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/];
                    if(reg[0].test(this.arg.inputMes) || reg[1].test(this.arg.inputMes)){
                        t = true  
                    };
                  break;
                case 1:
                    if(this.arg.inputMes.length <= 16 && this.arg.inputMes.length >=6 && this.arg.inputMes.indexOf(" ") == -1){
                        t = true  
                    };
                  break;
          };
          if(!t){series(t)}
          if(t)c = this.arg.inputMes;
          this.$emit('resMes',{t,c})
      },
      series(){
          if(this.showErr){

          }
      }
    },
    mounted:function () {
    //    setTimeout(()=>{this.$emit("update:arg",{a:66874445})},5000)
    },
    computed:{
       
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
    .suc-input{
        border:1px solid #78c342;
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
</style>


