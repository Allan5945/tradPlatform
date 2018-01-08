<template>
    <div class="user-input">
      <input 
        type="text" :placeholder="arg.text" 
        @input="yzgs"
        @blur="setUser(false)"
        @focus="setUser(true)"
        v-model="user"
      >
    </div>
</template>
<script>
    export default {
        data(){
            return{
                user:""
            } 
        },
        props:['arg'],
        methods:{
            yzgs(){
                
            },
            setUser(t){
                this.$emit('setUser',{t:t,n:this.user});
            } 
        }
    }
</script>
<style lang="scss" scoped>
    input{
        border:1px solid #e9e9e9; 
    }
    input:focus{ 
        border:1px solid #4b78e0;
    }
    .err-input{
        border:1px solid #deaaac;
    }
    .user-input{
       >input{
        width: 273px;
        height: 38px;
        border-radius:19px;
        padding-left: 15px;
        outline: none;
        color: #605E7C;
        // font-weight: bold;
        letter-spacing:0;
        &::-webkit-input-placeholder{
            letter-spacing:0;
        }
       }
    }
</style>