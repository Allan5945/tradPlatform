<template>
    <div class="dialog popup">
        <div class="dialog-wrapper">
            <div class="til">请填写拒绝原因</div>
            <div class="content">
                <div class="reson">拒绝原因</div>
                <div class="r-input"><input type="text" placeholder="可选填" v-model="refuseText"></div>
            </div>
            <div class="btns">
                <div class="sure-btn" @click="sure">确认</div>
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
                this.$emit('sure', this.refuseText);
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
        background: rgba(0, 0, 0, .1);
        z-index:999;
        .dialog-wrapper {
            position: absolute;
            left: 0;
            top: 0;
            right:0;
            bottom:0;
            margin:auto;
            width: 620px;
            height:370px;
            font-size:1.2rem;
            background: #ffffff;
            border-radius: 5px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
            box-sizing: border-box;
        }
    }
    .til{
        height:80px;
        line-height:80px;
        color:#605E7C;
        font-size:1.5rem;
        margin: 0 40px;
    }
    .content{
        height:170px;
        width:580px;
        margin:0 20px;
        box-sizing:border-box;
        padding:42px 20px 0 20px;
        background-color:rgba(216,216,216,.17);
        border-radius:5px;
        display:flex;
        .reson{
            width:60px;
            padding-right:20px;
            font-size:1.2rem;
        }
        .r-input{
            width:460px;
            input{
                border:0;
                outline:none;
                width:100%;
                background:transparent;
                border-bottom:1px solid rgba(151,151,151,.3);
            }

        }
    }
    .btns{
        margin-top:50px;
        height:35px;
        line-height:35px;
        display:flex;
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
