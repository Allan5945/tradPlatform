<template>
    <div class="user-input">
      <input :type="ty" placeholder="请输入密码"
        @blur="setUser(false)"
        @focus="setUser(true)"
        v-model="pas"
      >
      <span @click="showp" :class="{'show-color':showPas}">&#xe685;</span>
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
            showp(){
                this.showPas = !this.showPas;
            },
            setUser(t){
               this.$emit('setUser',{t:t,n:this.pas});
            }
        }
    }
</script>
<style lang="scss" scoped>
    .user-input{
        position: relative;
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
        width: 273px;
        height: 38px;
        border:1px solid #e9e9e9; 
        border-radius:19px;
        padding-left: 15px;
        outline: none;
        color: #605E7C;
        letter-spacing:0;
        &::-webkit-input-placeholder{
            letter-spacing:0;
        }
       }
    }
    .show-color{
        color:#4468fc !important;
    }
    
</style>