<template>
    <div class="dialog popup">
        <div class="dialog-wrapper">
            <div class="til">是否确认提交申请</div>
            <div class="btns">
                <div class="sure-btn" @click="sure">确认申请</div>
                <div class="cancel-btn" @click="cancel">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                refuseText:''
            }
        },
        methods: {
            sure(){

            },
            cancel(){
                this.$emit('cancel');
            }
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
            background: #ffffff;
            border-radius: 5px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
            box-sizing: border-box;
        }
    }
    .til{
        height:40px;
        line-height:40px;
        text-align:center;
        color:#605E7C;
        font-size:1.8em;
        margin: 80px 40px;
    }

    .btns{
        margin-top:50px;
        height:35px;
        line-height:35px;
        display:flex;
        font-size:1.3rem;
        justify-content: center;
        .sure-btn{
            width:100px;
            text-align:center;
            border-radius:100px;
            color:#ffffff;
            background-color:#3C78FF;
            margin-right:8px;
            cursor:pointer;
            box-shadow: 1px 2px 18px rgba(60, 120, 255,0.5);
        }
        .cancel-btn{
            width:80px;
            text-align:center;
            border-radius:100px;
            cursor:pointer;
            background-color:#fff;
            border:1px solid #c0ccda;
        }
    }
</style>
