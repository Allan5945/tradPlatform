<template>
    <div class="user-input">
        <input
            :class="{'animated':show,'shake':show,'err-input':show}"
            type="text" :placeholder="arg.text" 
            @blur="setUser(false);yzgs()"
            @focus="setUser(true)"
            v-model="user"
        >
     </div>
</template>
<script>
    export default {
        data(){
            return{
                user:"",
                show:false
            } 
        },
        props:['arg'],
        methods:{
            yzgs(){
                if(this.user == ''){return false};
                if(!(/^1[34578]\d{9}$/.test(this.user)) || !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/).test(this.user)){ 
                    this.show = true;
                    setTimeout(()=>{this.show = false;},1000);
                    this.$emit('tip','填写的格式错误！');
                } 
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