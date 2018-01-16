<template>
    <div class="user-input">
      <input type="text"
        maxlength="6"
        @blur="setCode(false)"
        @focus="setCode(true)"
        @input="yanz"
        v-model="pas"
      >
      <span v-html="showTip ? tip[1] : tip[0]" class="user-tip" :class="{'user-tip-tran':showTip}"></span>
      <div @click="sendCode" class="btn btn-w" :class="{'dis-btn':dis}" v-text="num"></div>
    </div>
</template>
<script>
    export default { 
        data(){
            return{
                showTip:false,
                pas:"",
                dis:false,
                tip:['请输入验证码','验证码'],
                num:"发送验证码",
            }
        }, 
        props:['mes','verCode'],
        computed:{

        },
        filters:{
            capitalize: function (value) {
                return 6;
            }
        },
        methods:{
            yanz(){
                let reg = /^[0-9][0-9]*$/;
                if(!reg.test(this.pas)){
                    this.pas =  this.pas.substring(0,this.pas.length - 1);
                };
                this.$emit('setCode',this.pas);
            },
            setCode(t){
                if(this.pas == ""){
                    this.showTip = !this.showTip;
                };
            },
            sendCode(){
                if(this.num != "发送验证码"){
                    return false;
                };
                this.$ajax({
                method: 'post',
                url: '/getValidCode',
                params:{
                    contactWay:this.mes
                },
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                    }
                })
                .then((response) => {
                   if(response.data.opResult  == '0'){
                       this.$message({
                            showClose: true,
                            message: "发送验证码成功！",
                            type: 'success'
                        });
                       this.dis = true;
                        let num = 60;
                        let set = setInterval(()=>{
                            this.num = num-- +"秒";
                            if(num == 0){
                                this.num = "发送验证码";
                                this.dis = false;
                                clearInterval(set);
                            };
                        },1000);
                   }else{
                       this.$message({
                            showClose: true,
                            message: "发送验证码失败！",
                            type: 'error'
                        });
                   }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
            }
        }
    }
</script>
<style lang="scss" scoped>
    .user-tip-tran{
        // transform: translateY(-35px);
        transform: translate(-15px,-35px);
    }
    .user-tip{
        position: absolute;
        color: #989898;
        top: 12px;
        left:15px;
        transition: all .3s ease;
        z-index: -1;
        font-size: 1.2rem !important;
    }
    .user-input{
        position: relative;
        display: flex;
        border:1px solid #e9e9e9;  
        border-radius:19px;
        height: 38px;
        align-items: center;
        >span{
            position: absolute;
            font-family: iconfont;
            top: 9px;
            right:18px;
            font-size: 1.8rem;
            cursor: pointer;
            color:#989898;
        }
       >input{
        height: 30px;
        width: 180px;
        border: none;
        padding-left: 15px;
        outline: none;
        color: #605E7C;
        letter-spacing:3px;
        background-color: transparent;
        border-right:1px solid #e9e9e9;
        &::-webkit-input-placeholder{
            letter-spacing:0;
        }
       }
       >div{
           height: 38px;
           line-height: 38px;
           color: #605E7C;
           padding-left:10px;
           cursor: pointer;
           border: none;
           font-size: 1.2rem;
           flex: 1;
           border-radius:0 19px 19px 0;
           justify-content: center;
       }
       >span{
            position: absolute;
            color: #989898;
            top: 12px;
            left:15px;
            transition: all .3s ease;
            z-index: -1;
       }
    }
    .show-color{
        color:#4468fc !important;
    }
     .dis-btn{
        cursor: not-allowed;
        color: #989898;
    }
    
</style>