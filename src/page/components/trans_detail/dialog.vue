<template>
    <div class="dialog">
        <div class="dialog-wrapper">
            <div class="cancel" @click="cancelEvent"><span class="iconfont">&#xe62c;</span></div>
            <div class="dialog-tips">*您还未缴纳意向金，缴纳后可提交意向</div>
            <div class="dialog-content">是否确认缴纳意向金50000元</div>
            <div class="dialog-btns">
                <div class="btn btn-b sure-btn" @click="sureEvent">
                    <span v-text="Btext" v-if="!loadingShow"></span>
                    <loading class="search-ing" :arg="false" v-if="loadingShow"></loading>
                </div>
                <div class="btn cancel-btn" @click="cancelEvent">取消</div>
            </div>
            <div class="note">
                <div class="note1">*若交易失败，意向金将退回到您的账号</div>
                <div class="note2"><a>申请代付意向金></a></div>
            </div>
        </div>
        <transition-group name="fade">
            <paySuccess v-show="paySuccessShow" @cancel="closePaySucssFn" :key="1"></paySuccess>
            <payFailOfBalance v-show="payFailOfBalanceShow" @cancel="closePayFailOfBalance" :key="2"></payFailOfBalance>
        </transition-group>
    </div>
</template>

<script>
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';
    import paySuccess from '$src/page/components/trans_detail/paySuccess.vue'
    import payFailOfBalance from '$src/page/components/trans_detail/payFailOfBalance.vue'
    import loading from '$src/page/reuseComponents/locading.vue'
    export default {
        data(){
            return{
                Btext: '确认缴纳',
                sendData: {},
                paySuccessShow: false, // 支付成功
                payFailOfBalanceShow: false, // 余额不足
                loadingShow: false,
            }
        },
        created() {
            // 接收airlineDetailPayAfter.vue传来的参数
            tabulationBoxTrigger.$on('responseText',(val) => {
//                console.info('dialog接收airlineDetailPayAfter:');
//                console.info(val);
                this.sendData.demandId = val;
                this.loadingShow = false;
            })
        },
        components: {
            loading,
            paySuccess,
            payFailOfBalance
        },
        methods: {
            // 改变alert弹出样式
            open6(mes) {  // 成功弹出的提示
                this.$message({
                    showClose: true,
                    message: mes,
                    type: 'success'
                });
            },
            open8(mes) {  // 错误弹出的提示
                this.$message({
                    showClose: true,
                    message: mes,
                    type: 'error'
                });
            },
            cancelEvent(){
                this.$emit('cancel');
            },
            closePaySucssFn: function () { // 支付成功
                this.$emit('cancel');
                this.$emit('sure');
                this.paySuccessShow = false;
            },
            closePayFailOfBalance: function () {  // 余额不足
                this.$emit('cancel');
                this.payFailOfBalanceShow = false;
            },
            sureEvent(){
                this.sendData.intentionStatu = '0'; //0：交钱，1：未交费
                this.$ajax({
                    url: "/changeIntentionMoneyStatusForDemand", //机场向自己发的需求（查看意向）交意向金
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: this.sendData
                }).then((response) => {
                    if(response.data.opResult === '0'){
//                        alert('成功提交意向金！');
                        this.open6(`成功提交意向金！`);
                        this.paySuccessShow = true; //“缴纳完成”组件显示
                        setTimeout(() => {
                            this.closePaySucssFn();
                        }, 1000)
                    }else if(response.data.opResult === '4') { // 4: 余额不足
                        this.payFailOfBalanceShow = true;
                    }else{
//                        alert('错误代码：' + response.data.opResult);
                        this.open8(`错误代码：${response.data.opResult}`);
                    }
                }).catch((error) => {
                    console.log(error);
                });
                this.loadingShow = true;
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
    .search-ing {
        width: 23px;
        height: 30px;
        color: #3c78ff !important;
        display: inline-block;
        transform: scale(.25);
    }

</style>
