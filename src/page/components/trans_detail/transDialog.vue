<template>
    <div class="dialog">
        <div class="dialog-wrapper">
            <div class="cancel"><span class="iconfont" @click="cancelEvent">&#xe62c;</span></div>
            <div class="dialog-tips">*您还未缴纳意向金，缴纳后可提交意向</div>
            <div class="dialog-content">是否确认缴纳意向金50000元</div>
            <div class="dialog-btns">
                <div class="btn sure-btn" v-if="iconShow">
                    <span class="iconfont">&#xe620;</span>
                </div>
                <div class="btn sure-btn" v-else @click.once="sureEvent">确认缴纳</div>
                <div class="btn cancel-btn" @click="cancelEvent">取消</div>
            </div>
            <div class="note">
                <div class="note1">*若交易失败，意向金将退回到您的账号</div>
                <div class="note2"><a>申请代付意向金></a></div>

            </div>
        </div>
    </div>
</template>

<script>
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';
    export default {
        data(){
            return{
                iconShow:false,
                sendData: {},
                myData:{
                    data:{
                        demandtype:'',
                        id: ''
                    }
                }
            }
        },
        created() {
            // 接收表单数据
            tabulationBoxTrigger.$on('postResponseData',(val) => {
                this.sendData= val;
            })
            //触发意向更新
           /* this.myData.data.id = this.sendData.demandId;
            this.myData.data.demandtype = "1";
            tabulationBoxTrigger.$emit('tabulationBoxTrigger', this.myData);*/

        },
        methods: {
            cancelEvent(){
                this.$emit('cancel');
            },
            sureEvent(){
                let that = this;
                this.$ajax({
                    url: "/responseAdd",
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: this.sendData
                }).then((response) => {
                         that.iconShow = true;
                        if(response.data.opResult == '0'){
                            setTimeout(function(){
                                that.$emit('cancel');
                                that.$emit('sure');
                                that.iconShow = false;
                            },1000);
                         /*   that.$message({
                                message: '发布成功!',
                                type: 'success',
                                duration:2000
                            });*/
                        }else if(response.data.opResult == '4'){
                             setTimeout(function(){
                                that.iconShow = false;
                                that.$emit('payFail');
                            },1000);
                        }else{
                            setTimeout(function(){
                                that.$emit('cancel');
                                that.iconShow = false;
                                that.$message({
                                    message: '缴纳失败，请稍后再试!',
                                    type: 'warning'
                                });
                            },1000);

                        }

                }).catch((error) => {
                    console.log(error);
                });
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
            background: #fff;
            border-radius: 2px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
            box-sizing: border-box;
        }
        .dialog-tips {
            position:absolute;
            top:75px;
            color:pink;
            left:120px;
        }
        .dialog-content {
            padding: 100px 0 80px 0;
            color: #605E7C;
            font-weight: bold;
            font-size: 20px;
            text-align: center;
            p{
                font-size: 14px;
                margin-top: 10px;
            }
        }
        .dialog-btns {
            text-align: center;
            display:flex;
            justify-content: center;
           .btn {
                height:35px;
                line-height:35px;
                text-align:center;
                font-size: 14px;
                outline:0;
                border-radius:100px;
                cursor: pointer;
            }
            .cancel-btn {
                width: 80px;
                background: #fff;
                border: 1px solid #c0ccda;
                color: #1f2d3d;
            }
            .sure-btn {
                width: 150px;
                margin-left: 8px;
                border:0;
                background-color: #3c78ff;
                color: #fff;
                margin-right:8px;
            }
            span{
                 color:#ffffff;
                 font-size:16px;
                 cursor:pointer;
            }
        }
    }
    .note{
        display:flex;
        justify-content: space-between;
        padding:30px 15px 0 15px;
        .note1{
            color:#c0ccda;
        }
        .note2{
           color: #3c78ff;
           cursor: pointer;
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
        color:#3c78ff;
        border:1px solid #c0ccda;
        cursor:pointer;
    }

</style>
