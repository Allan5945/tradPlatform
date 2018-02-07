<template>
    <div class="registered-box" onselectstart="return false;">
        <header>
            <p>找回密码 <span  class="iconfont closer" @click="closeThis">&#xe62c;</span></p>
        </header>
        <div class="result flex-center">
            <backPwd
                    v-on:openClass="closeThis"
                    :loginErr.sync="result"
                    v-on:pasChange="pasChange"></backPwd>
        </div>
    </div>
</template>
<script>
    import backPwd from '$src/page/loginProcess/loginStepsComponents/backPas.vue';

    export default {
        data(){
            return{
                result: false,
            }
        },
        props: ['ud'],
        components:{
            backPwd,
        },
        methods:{
            pasChange(ok,pwd){
                let that = this;
                if(ok){
                    that.$message({
                        showClose: true,
                        message: "修改密码成功,请重新登录",
                        type: 'success',
                        duration: 1500
                    });
                    return setTimeout(()=>{
                        that.$ajax.post('logout')
                            .then((res)=>{
                                if(res.data.opResult == 0){//修改成功后
                                    that.$chatSocket.ws.close();
                                }
                            })
                    },2000)
                    that.ud.pwd = pwd;
                }else{
                    that.$message({
                        showClose: true,
                        message: "修改失败，请稍后再试！",
                        type: 'error',
                        duration: 1500
                    });
                }
                setTimeout(that.closeThis,1500)
            },
            closeThis(){
                this.$emit('subchange',{
                    name: 'backPwd',
                    type : 2
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    $blue : #3c78ff;
    $lightblue : rgba(60,120,255,.15);
    *{
        box-sizing: border-box;
    }
    .registered-box{
        width:360px;
        height: 470px;
        overflow: hidden;
        position: relative;
        border-radius: 8px;
        background-color: #fff;
        header{
            height:50px;
            line-height: 50px;
            position: relative;
            box-shadow: 0 5px 15px $lightblue;
            z-index: 1;
            p{
                text-indent: 20px;
                color: #999;
                .closer{
                    display: inline-block;
                    position: absolute;
                    right: 3%;
                    top: 10px;
                    width:22px;
                    height:22px;
                    line-height:22px;
                    text-align:center;
                    text-indent: 0;
                    color: $blue;
                    border:1px solid #ededed;
                    border-radius: 11px;
                    cursor:pointer;
                }
            }
        }
    }
    .flex-center{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .result{
        height: 420px;
        position: relative;
    }
</style>