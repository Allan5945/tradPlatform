<template>
    <div class="user-input">
      <input type="text" placeholder="请输入验证码"
        @blur="setCode(false)"
        @focus="setCode(true)"
        v-model="pas"
      >
      <div>发送验证码</div>
    </div>
</template>
<script>
    export default { 
        data(){
            return{
                pas:"",
                showPas:false,
                title:"开启航线开通在线时代"
            } 
        },
        computed:{
            ty:function(){
                let ty = 'password';
                if(this.showPas){
                    ty = 'text';
                };
                return ty; 
            }
        },
        methods:{
            setCode(t){
               this.$emit('setCode',{t:t,n:this.pas});
            }
        }
    }
</script>
<style lang="scss" scoped>
    .user-input{
        position: relative;
        display: flex;
        border:1px solid #e9e9e9;  
        border-radius:19px;
        height: 38px;
        align-items: center;
        overflow: hidden;
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
        width: 180px;
        border: none;
        padding-left: 15px;
        outline: none;
        color: #605E7C;
        letter-spacing:0;
        &::-webkit-input-placeholder{
            letter-spacing:0;
        }
       }
       >div{
           height: 30px;
           line-height: 30px;
           border-left:1px solid #d8d8d8;
           color: #605E7C;
           padding-left:10px;
           cursor: pointer;
       }
    }
    .show-color{
        color:#4468fc !important;
    }
    
    
</style>