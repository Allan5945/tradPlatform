<template>
    <div @click.self="closeDetail">
        <div class="box shadow">
            <div class="panel-header">
                <p class="mgr-l">需求详情<span  class="iconfont closer" @click="closeDetail">&#xe62c;</span></p>
            </div>
            <listModule :ndetailData="metaData" :type="typeList[detailData.demandtype]" v-if="metaData"></listModule>
            <template v-if="metaData">
                <footer class="footer flex-center">
                    <template v-if="detailData.demandstate=='4'">
                        <span class="btn btn-prime" @click="postPass">通过</span>
                        <span class="btn btn-gray" @click="show.swrapper=true">不通过</span>
                    </template>
                    <template v-if="detailData.demandstate==='5'">
                        <span class="tips tips-top">*拒绝原因</span>
                        <p v-text="metaData.rek || '无具体原因'"></p>
                    </template>
                    <template v-if="detailData.demandstate==='6'">
                        <span class="tips tips-pas">*已通过审核</span>
                        <p v-text="detailData.name"></p>
                    </template>
                </footer>
            </template>
        </div>
        <div class="swrapper flex-center" v-show="show.swrapper">
            <div class="rsn-box shadow">
                <h3>请填写不通过原因</h3>
                <div class="rsn-body">
                    <span>原因:</span>
                    <textarea class="txtarea" maxlength="100" v-model="reason.text" ></textarea>
                    <i class="letter-counter">{{reason.textLength}}/100</i>
                </div>
                <footer class="footer-s flex-center">
                    <span class="btn btn-prime" style="width: 150px;" @click="postReason">确认</span>
                    <span class="btn btn-gray" @click="closeReason">取消</span>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
    import listModule from './detailListModule.vue';
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js'

    export default{
        data(){
            return {
                show:{
                    swrapper: false,
                },
                reason:{
                    text: '',
                    textLength:0
                },
                metaData: null,
                typeList: ['航线需求','运力投放 ']
            }
        },
        components: {listModule},
        props: ["detailData"],
        watch:{
            reason:{
                handler: function (val,oval) {
                    if(val.length>100){
                        this.reason.text.splice(0,100);
                    }
                    this.reason.textLength = this.reason.text.length;
                },
                deep: true
            }
        },
        methods: {
            closeDetail:function () {//关闭所有
                this.$emit("closeAll");
            },
            changeState: function (state,reason) {
                let rsk = reason||'';
                return new Promise((resolve,reject)=>{
                    this.$ajax({
                        method: 'POST',
                        url: '/checkDemand',
                        params: {
                            demandId : this.detailData.id,
                            demandState: state,
                            rek: rsk
                        }
                    }).then(res=>{
                        if(res.data.opResult==0){
                            resolve(res.data.opResult);
                        }else{
                            reject("未处理成功");
                        }
                    }).catch(err=>{
                        reject(err);
                    })
                })
            },
            postPass:function () {//审核通过
                let that = this;
                that.changeState(0).then((val)=>{
                    that.detailData.demandstate = "6";
                    that.metaData.demandStateStr = "审核通过";
                    this.$message({
                        message: "审核通过成功",
                        type: 'success'
                    });
                },(err)=>{
                    this.$message({
                        message: "审核通过失败，请重试",
                        type: 'error'
                    });
                });
            },
            postReason:function () {//拒绝 提交
                let that = this;
                if(that.reason.textLength<1)return alert("请填写拒绝原因。");
                that.show.swrapper = false;
                that.changeState(1,that.reason.text).then((val)=>{
                    that.detailData.demandstate = "5";
                    that.metaData.rek = that.reason.text;
                    that.metaData.demandStateStr = "审核未通过";
                    this.$message({
                        message: "审核修改成功",
                        type: 'success'
                    });
                },(err)=>{
                    this.$message({
                        message: "审核修改失败，请重试",
                        type: 'error'
                    });
                });
            },
            closeReason: function () {//取消
                this.reason.text = '';
                this.show.swrapper = false;
            },
        },
        created: function () {
            let that = this;
            let id = this.detailData.id;
            this.$ajax({
                method: 'GET',
                url: '/demandFind',
                params: {
                    demandId : id
                }
            }).then(res=>{
                that.metaData = res.data.data;
            }).catch(err=>{
                this.$message({
                    message: "审核修改失败，请重试",
                    type: 'error'
                });
            })
        },
        mounted:function () {
            tabulationBoxTrigger.hierarchy = true;
        },
        destroyed: function () {
            tabulationBoxTrigger.hierarchy = false;
        }
    }
</script>

<style lang="scss" scoped>
　　.input,textarea{border:none; text-indent:5px;line-height:20px;background:url(http://www.w3dev.cn/eg/linebg.gif) repeat;overflow:auto}
    $bt-c: #605e7c;
    $txt-c: #3c78ff;
    $bor-c: #efefef;
    $spt-c: #979797;
    /*通用設定*/
    *{
        box-sizing: border-box;
    }
    h1,h2,h3,h4,h5,h6{
        color: $bt-c;
    }
    .panel-header{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-indent: 50px;
        color: rgba(96,94,124,.7);
        box-shadow: 0px 5px 15px rgba(216, 216, 216, 0.9);
        z-index: 1;
    }
    .mgr-l{
    }
    .flex-center{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .tips-top{
        color: red;
        position: absolute;
        top: -35%;
        left: 10px;
    }
    .tips-pas{
        color: green;
        position: absolute;
        top: -35%;
        left: 10px;
    }
    .closer{
        display: inline-block;
        position: absolute;
        right: 3%;
        top: 5px;
        margin-top:9px;
        width:22px;
        height:22px;
        line-height:22px;
        text-align:center;
        text-indent: 0;
        color:#3C78FF;
        border:1px solid #ededed;
        border-radius: 11px;
        cursor:pointer;
    }
    /*主體内容*/
    .wrap{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.2);
        z-index: 11;
    }
    .shadow{
        box-shadow: 0px 0px 15px #888;
    }
    .box{
        position: absolute;
        width: 600px;;
        height: 100%;
        top: 0;
        right: 0;
        background-color: #fff;
        padding: 20px 20px;
    }
    .footer{
        position: absolute;
        width: 95%;
        height: 120px;
        bottom: 0;
        border-top: 1px solid $spt-c;
    }
    .btn{
        display: inline-block;
        margin: 0 4px;
        text-align: center;
        border-radius: 20px;
        width: 120px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        cursor: pointer;
    }
    .btn-prime{
        width: 220px;
        background-color: #3c78ff;
        box-shadow: 1px 1px 6px rgba(60,120,255,.6);
    }
    .btn-gray{
        color: #000;
        width: 100px;
        border: 1px solid #ccc;
    }
    .swrapper{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.2);
    }
    .rsn-box{
        width: 620px;
        height: 370px;
        background-color: #fff;
        position: relative;
        padding: 20px 20px;
    }
    .rsn-body{
        position: relative;
        height: 172px;
        border-radius: 5px;
        background-color: $bor-c;
        padding: 10px 10px;
        .txtarea{
            resize:none;
            display: inline-block;
            position: absolute;
            width: 420px;
            height: 150px;
            margin: 0 10px;
        }
        .letter-counter{
            position: absolute;
            bottom: 5px;
            right: 10px;
        }
    }
    .footer-s{
        position: absolute;
        width: 90%;
        height: 120px;
        bottom: 0;
        color:rgba(23, 21, 21, 0);
    }
</style>