<template>
    <div class="dialog">
        <div class="dialog-wrapper">
            <div class="cancel" @click="cancelEvent"><span class="iconfont">&#xe62c;</span></div>
            <div class="dialog-content">
            <div class="icon">
                <span class="iconfont">&#xe6cc;</span>
            </div>
            <div class="text">缴纳成功!</div>
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
        overflow: auto;
        background: rgba(0, 0, 0, .4);
        z-index:999;
        .dialog-wrapper {
            position: absolute;
            left: 0;
            top: 0;
            right:0;
            bottom:0;
            margin:auto;
            width: 480px;
            height:300px;
            font-size:1.2rem;
            background: #3C78FF;
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
    .icon{
        height:55px;
        line-height:55px;
        width:55px;
        background-color:#fff;
        margin:0 auto;
        text-align:center;
        margin-top:100px;
        border-radius:100%;
        span{
            display:block;
            font-size:45px;
            color:#3C78FF;
        }

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
    .text{
        margin-top:50px;
        color:#fff;
        font-size:1.8rem;
        text-align:center;
        font-weight:600;
    }
</style>
