<template>
    <div class="dialog popup">
        <div class="dialog-wrapper">
            <div class="til">请填写{{msg}}原因</div>
            <div class="content">
                <div class="reson">{{msg}}原因</div>
                <div class="r-input">
                    <textarea class="txtarea" v-model="refuseText" maxlength="100" placeholder="必填" @keydown.enter.prevent></textarea>
                    <div class="tips-border"></div>
                    <div class="tips-border" style="top:22px;"></div>
                    <div class="tips-border" style="top:44px;"></div>
                    <div class="tips-border" style="top:66px;"></div>
                    <span class="num"><span >{{num}}</span>/100</span>
                </div>
            </div>
            <div class="btns">
                <div class="sure-btn active" @click="sure" v-if="isSend">确认</div>
                <div class="sure-btn" v-else="isSend">确认</div>
                <div class="cancel-btn" @click="cancel">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                refuseText:'',
                isSend:false
            }
        },
        watch:{
            "refuseText" :function(){
                this.refuseText = this.refuseText.replace(/^\s*/g,"");
                if(this.refuseText.length !== 0){
                    this.isSend =true;
                }else{
                    this.isSend =false;
                }
            }
        },
        computed:{
            num: function(){
                return this.refuseText.length <= 100? this.refuseText.length: 100;
            }
        },
        props:['msg'],
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
            margin-top:2px;
            font-size:1.2rem;
        }
      .r-input{
          width:460px;
          position:relative;
           .txtarea{
                resize:none;
                display: inline-block;
                position: relative;
                font-size:1.2rem;
                z-index:3;
                width: 100%;
                height: 100px;
                line-height:22px;
                border:0;
                outline:none;
                background:transparent;
            }
            .tips-border{
                width:100%;
                height:22px;
                box-sizing:border-box;
                position:absolute;
                left:0;
                top:0;
                z-index:1;
                border-bottom:1px solid rgba(151,151,151,.3);
            }
            .num{
                position:absolute;
                right:2px;
                top:68px;
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
            color:#ccc;
            background-color:#f5f5f5;
            margin-right:8px;
            cursor:pointer;
            border:1px solid #c0ccda;
        }
        .active{
            border:0;
            color:#ffffff;
            background-color:#3C78FF;
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
