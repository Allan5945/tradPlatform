<template>
    <div class="login-title">
        <span v-text="arg"></span>
        <div class="btn-w" @click="clear">&#xe62c;</div>
    </div>
</template>
<script>
    export default {
        props:['arg'],
        data(){
            return{
            } 
        },
        methods:{
            clear(){
                this.$emit('clear');
            }
        }
    }
</script>
<style lang="scss" scoped>
    .login-title{
        display: flex;
        height: 50px;
        width: 330px;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px 0 20px;
        box-shadow:0 3px 6px #f4f7ff;
        >div{
            font-family: iconfont;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
        }
        >span{
            color: #959595;
        }
    }
</style>