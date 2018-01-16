<template>
    <div class="dialog">
        <div class="dialog-wrapper">
            <div class="cancel" @click="cancelEvent"><span class="iconfont">&#xe62c;</span></div>
            <div class="dialog-text">
                <span>当前余额不足！</span>
                <span>请前往用户中心充值</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        methods: {
            cancelEvent(){
                this.$emit('cancel');
            },
        }
    }
</script>

<style lang="scss" scoped>
    .dialog {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: auto;
        background: rgba(0, 0, 0, .4);
        z-index:999;
        .dialog-wrapper {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 480px;
            height:300px;
            font-size:1.2rem;
            background: white;
            border-radius: 2px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
            box-sizing: border-box;
        }
    }
     .cancel{
        position:absolute;
        right:20px;
        top:10px;
        height:22px;
        width:22px;
        line-height:22px;
        text-align: center;
        border-radius:100%;
        background-color:#fff;
        border:1px solid #c0ccda;
        cursor:pointer;
        span{
            color:#3C78FF;
        };
    }
    .iconfont{
         font-size:16px;
         cursor:pointer;
         font-family:"iconfont" !important;
         font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        color:#fff;

    }
    .dialog-text {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
        line-height: 25px;
    }
</style>
