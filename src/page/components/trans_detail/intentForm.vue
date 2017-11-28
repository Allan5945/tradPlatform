<template>
     <div class="intent-form scroll popup">
        <div class="t-must">
            <div class="form-box">
                <div class="t-title">联系人<span style="color:red;padding-left:3px;">*</span></div><input type="text" placeholder="请填写有效联系人">
            </div>
            <div class="form-box" style="position:relative;">
                <div class="t-title">联系方式<span style="color:red;padding-left:3px;">*</span></div><input type="text" placeholder="请填写有效联系方式" v-on:keyup="verifyPhon" v-model="phoneNum">
                <div class="error" v-show="isError">*电话格式有误，请重新输入</div>
            </div>
            <div style="height:20px;width:100%;" v-if="isError"></div>
        </div>
        <div class="t-optional">
           
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                showBox: false,
                isSel: false,
                isError: false,
                tip: '',
                phoneNum:'',
            }
        },
          methods:{
             getNeed: function(i) {
                this.msg = this.needType[i];
                this.isSel = true;
            },
            verifyPhon: function () {
                if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phoneNum))){
                    this.isError = true;
                }else{
                    this.isError = false;
                }
            }   
        },
    }
</script>

<style lang="scss" scoped>
     input {
        outline:none;
        border: 0;
        font-size:1.2rem;
        color: #605E7C;
        box-sizing:border-box;
        padding-left:5px;
        border-bottom:1px solid rgba(151,151,151,.3);
    }
    .intent-form{
        position:absolute;
        left:0;
        right:0;
        top:0;
        bottom:0;
        margin:auto;
        z-index:99;
        box-sizing:border-box;
        overflow-y: scroll;
        font-size:1.2rem;
        padding:20px;
        width:620px;
        height:620px;
        color: #605E7C;
        border-radius:4px;
        background-color:#fff;
        .t-must,.t-optional{
            width:100%;
            box-sizing:border-box;
            display:flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding:0 20px;
            border-radius:5px;
            background-color:#FBFBFB;
        }
        .t-optional{
            margin-top:10px;
        }

    }
    .form-box{
        width:240px;
        height:26px;
        line-height:26px;
        padding:27px 0;
        display:flex;
        .t-title{
            width:60px;
            overflow:hidden;
        }
        >input{
            width:180px;
            height:26px;
            background-color: #FBFBFB;
        }
        .t-input{
            width:180px;
            border-bottom:1px solid rgba(151,151,151,.3);
            >input{
                width:164px;
                background-color: #FBFBFB;
                border:0;
            }
        }
    }
    .error{
        position:absolute;
        top:58px;
        right:36px;
        color:red;
      }

</style>