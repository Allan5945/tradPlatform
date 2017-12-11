<template>
    <div class="wrap" @click.self="closeAll">
        <div class="box shadow">
            <p class="mgr-l">需求详情<span  class="iconfont closer" @click="closeAll">&#xe62c;</span></p>

            <airlineReq :ndetailData="metaData" :type="detailData.demandtype" v-if="metaData"></airlineReq>

            <footer class="footer flex-center">
                <template v-if="detailData.demandstate=='未处理'">
                    <span class="btn btn-prime" @click="postPass">通过</span>
                    <span class="btn btn-gray" @click="show.swrapper=true">不通过</span>
                </template>
                <template v-if="detailData.demandstate!=='未处理'">
                    <span class="tips tips-top">*拒绝原因</span>
                    <p v-text="detailData.name"></p>
                </template>
            </footer>
        </div>

        <transition name="fade">
            <div class="swrapper flex-center" v-show="show.swrapper">
                <div class="rsn-box shadow">
                    <h3>请填写不通过原因</h3>
                    <div class="rsn-body">
                        <span>原因:</span>
                        <textarea class="txtarea" maxlength="100" v-model="reason.text"></textarea>
                        <i class="letter-counter">{{reason.textLength}}/100</i>
                    </div>
                    <footer class="footer-s flex-center">
                        <span class="btn btn-prime" style="width: 150px;" @click="postReason">确认</span>
                        <span class="btn btn-gray" @click="closeReason">取消</span>
                    </footer>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import airlineReq from './detailListModule.vue'
    export default{
        data(){
            return {
                show:{
                    swrapper: false,
                },
                reason:{
                    text: '',
                    textLength:0,
                    ispas: true
                },
                metaData: null,
                fatherScroll:true
            }
        },
        components: {airlineReq},
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
            closeAll:function () {//关闭所有
                this.$emit("control",true);
            },
            postPass:function () {//提交通过
                //ajax
                this.detailData.status = true;
                this.postAjax(0);
            },
            //拒绝
            postReason:function () {//提交
                let that = this;
                this.show.swrapper = false;
                this.postAjax(1);
                //ajax
                //this.$emit("emit", that.reason.text);
            },
            postAjax: function (flag) {
                let data = this.reason,
                    id = this.detailData.id;
                this.$ajax({
                    method: 'GET',
                    url: '/checkDemand',
                    params: {
                        demandId : id,
                        demandState : flag,
                        rek: data.text,
                    }
                }).then(res=>{
                    that.metaData = res.data.data;
                }).catch(err=>{

                })
            },
            closeReason: function () {//取消
                this.reason.text = '';
                this.show.swrapper = false;
            },
            getScrollWidth: function () {
                var noScroll, scroll, oDiv = document.createElement("DIV");
                oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
                noScroll = document.body.appendChild(oDiv).clientWidth;
                oDiv.style.overflowY = "scroll";
                scroll = oDiv.clientWidth;
                document.body.removeChild(oDiv);
                return noScroll-scroll;
            }
        },
        created: function () {
            let fdom = document.querySelector('.my-center')
            if(fdom.offsetHeight===fdom.scrollHeight===fdom.clientHeight){
                this.fatherScroll = false;
                fdom.style.overflow = 'hidden';
                fdom.style.right = this.getScrollWidth()+'px';
            }
            //取出拒绝原因
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

            })
        },
        destroyed: function () {
            if(this.fatherScroll){
                let fdom = document.querySelector('.my-center')
                fdom.style.overflow = 'auto';
                fdom.style.right = '0';
            }
        }
    }
</script>

<style lang="scss" scoped>
　　.input textarea{border:none; text-indent:5px;line-height:20px;background:url(http://www.w3dev.cn/eg/linebg.gif) repeat;overflow:auto}
    $bt-c: #605e7c;
    $txt-c: #3c78ff;
    $bor-c: #efefef;
    $spt-c: #979797;
    /*通用設定*/
    *{
        box-sizing: border-box;
        letter-spacing: 2px;
    }
    h1,h2,h3,h4,h5,h6{
        color: $bt-c;
    }
    .mgr-l{
        color: rgba(96,94,124,.7);
        margin: 0 0 20px 30px;
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
        width: 40%;
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
    }
</style>
