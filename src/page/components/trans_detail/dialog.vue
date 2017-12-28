<template>
    <div class="dialog">
        <div class="dialog-wrapper">
            <div class="cancel"><span class="iconfont" @click="cancelEvent">&#xe62c;</span></div>
            <div class="dialog-tips">*您还未缴纳意向金，缴纳后可提交意向</div>
            <div class="dialog-content">是否确认缴纳意向金50000元</div>
            <div class="dialog-btns">
                <div class=" btn sure-btn" @click="sureEvent" v-text="Btext">确认缴纳</div>
                <div class="btn cancel-btn" @click="cancelEvent">取消</div>
                <span class="iconfont" v-show="iconShow">&#xe620;</span>
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
                Btext: '确认缴纳',
                iconShow:false,
                sendData: {}
            }
        },
        created() {
            // 接收airlineDetailPayAfter.vue传来的参数
            tabulationBoxTrigger.$on('responseText',(val) => {
                console.info('dialog接收airlineDetailPayAfter:');
                console.info(val);
                this.sendData.demandId = val;
            })
        },
        methods: {
            cancelEvent(){
                this.$emit('cancel');
            },
            sureEvent(){
                this.sendData.intentionStatu = '0'; //0：交钱，1：未交费
                console.info("dialog的sendData:");
                console.info(this.sendData)
                let that = this;
                this.$ajax({
                    url: "/changeIntentionMoneyStatusForDemand", //机场向自己发的需求（查看意向）交意向金
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: this.sendData
                }).then((response) => {
                    console.info('dialog:')
                    console.info(response)
                    if(response.data.opResult === '0'){
                        setTimeout(function(){
                            that.$emit('cancel');
                            that.$emit('sure');
                        },1000)
                        alert('成功提交意向金！')
                        tabulationBoxTrigger.$emit('responseListToPayAfter',response.data.responseList) //向payAfter的意向列表传参数
                    }else{
                        alert('错误代码：' + response.data.opResult)
                    }
                }).catch((error) => {
                    console.log(error);
                });
                this.iconShow = true;
                this.Btext = '';
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
            position:relative;
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
                 position:absolute;
                 top:10px;
                 left:194px;
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
