<template>
    <div class="wrapper" @click.self="closeThisFn">

        <div class="ald-container">
            <div class="first item-container">
                <span>{{myData.demandtypeStr}}详情</span>
                <span class="close-icon" @click="closeThisFn" style="cursor: pointer;">&times;</span>
            </div>
            <div class="second item-container">
                <div class="anew-publish" v-show="linkServiceShow" @click="linkServiceClickFn">
                    联系客服 <span class="icon-item">&#xe720;</span>
                </div>
                <div class="anew-publish" v-show="anewPublishShow" @click="anewPublishClickFn2">
                    重新发布
                </div>
                <div class="top">
                    <span style="height: 25px;">{{myData.title}}</span>
                </div>
                <div class="bottom">
                    <span class="font-gray" style="margin-right: 25px;">委托方　{{myData.cpyNm}}</span>
                    <span class="font-gray" style="margin-right: 30px;">创建于{{releasetime}}</span>
                    <span class="font-gray">状态:　<span  v-if="demandStateText == true" style="color: red; font-weight: bold;">{{myData.demandprogressStr}}</span>
                        <span v-else><span style="color: #3F7AFF;font-weight: bold;">{{myData.demandprogressStr}}</span></span>
                    </span>
                </div>
            </div>
            <div class="fourth item-container">
                <div class="items">
                    <div class="left item">
                        <div class="font-gray">航班号</div>
                    </div>
                    <div class="right item">
                        <div class="item-height">{{myData.fltNbr || '-'}}</div>
                    </div>
                </div>
                <div class="items">
                    <div class="left item">
                        <div class="font-gray">小时成本</div>
                    </div>
                    <div class="right item">
                        <div class="item-height">
                            <span v-if="myData.hourscost != null && myData.hourscost != ''">{{myData.hourscost}}万/小时</span>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="add-item item-container">
                <div class="left font-gray">其他说明</div>
                <div class="right">{{myData.remark}}</div>
            </div>
            <span class="line"></span>
            <div class="fifth item-container">
                <div class="items">
                    <div class="left item">
                        <div class="font-gray">联系人</div>
                    </div>
                    <div class="right item">
                        <div class="item-height">{{myData.contact}}</div>
                    </div>
                </div>
                <div class="items">
                    <div class="left item">
                        <div class="font-gray">联系方式</div>
                    </div>
                    <div class="right item">
                        <div class="item-height">{{myData.iHome}}</div>
                    </div>
                </div>
            </div>
            <div class="seventh item-container">
                <span class="danger" v-show="myData.rek != null">*{{myData.rek}}</span>
            </div>
            <span class="line" style="position:absolute; left: 20px; bottom: 100px;"></span>
            <div class="eighth">
                <div class="buttons" v-if="buttonShow">
                    <button class="btn btn-w" @click="recallFn">撤回该托管</button>
                </div>
                <!--<div class="buttons" v-else>
                    <button class="btn btn-w" style="width: 100px; margin-right: 12px; background: #cccccc; color: white;"  @click="anewPublishClickFn2(),closeThisFn()">重新发布</button>
                    <button class="btn btn-w" style="width: 100px;" @click="recallFn(),closeThisFn()">撤回该托管</button>
                </div>-->
            </div>
            <editOperationForm  v-if="editOperationFormShow" @close-this="changeShowCodeFn"></editOperationForm>
        </div>
    </div>
</template>
<script>
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js'
    import editOperationForm from './editOperationForm.vue'
    export default {
        data() {
            return {
                myData: {},             // 获取的数据渲染到页面上
                anewPublishShow: false, //“重新发布”是否显示
                linkServiceShow: false, // "联系客服"是否显示
                editPublishShow: false, // “编辑”是否显示
                demandStateText: false, //"审核未通过"是否显示
                wrongTextShow: false,  // 错误提示是否显示
                buttonShow: true,      // 按钮显示一个或两个
                releasetime: '',        //创建时间
                editOperationFormShow: false, //编辑需求表单
//                editAirlineReqShow: false,
                recallData: {},         //点击“撤回该托管”传的数据
                id: '',                 // 点击列表获取这条需求id
            }
        },
        mounted() {
            // 从myPublishList获取参数，并渲染到页面上
            tabulationBoxTrigger.$on('sendDataToMyPublish',val => {
                this.id = val.id;
                this.$ajax({
                    url:"/demandFind",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: {
                        demandId: val.id //发布时间排序类型 0-倒序 1-正序
                    }
                }) .then((response) => {
                    if(response.data.opResult == 0) {
                        this.myData = response.data.data;
                        // 状态有误时显示的内容
                        // demandProgress:需求进度状态[0:需求发布、1:意向征集、2:订单确认、3:关闭（审核不通过、下架、过期）、
                        //                  4:订单完成、5:佣金支付、6:交易完成、7:待处理、8:已接受、9:处理中、10:已拒绝]
                        // demandState:需求状态(0:正常,1:完成,2:异常,3:删除,4:未处理,5:审核不通过,6,审核通过)
                        if(this.myData.demandstate == 2
                            || this.myData.demandstate == 3
                            || this.myData.demandstate == 5
                            || this.myData.demandprogress == 3
                            || this.myData.demandprogress == 8
                            || this.myData.demandprogress == 10){
                            this.buttonShow = false;
                        }else {
                            this.buttonShow = true;
                        }
                        if(this.myData.demandstate == 2
                            || this.myData.demandstate == 3
                            || this.myData.demandstate == 5
                            || this.myData.demandprogress == 3
                            || this.myData.demandprogress == 10){
                            this.wrongShow();
                        }else{
                            this.show();
                        }
                        //将创建时间顺序改变
                        let time1 = this.myData.releasetime.split('.');
                        let time2 = [];
                        for(let i = time1.length - 1; i >= 0; i--){
                            time2.push(time1[i]);
                        }
                        this.releasetime = time2.join('.');
                    }else {
                        alert(`错误代码：${response.data.opResult}`)
                    }

                }).catch((error) => {
                    console.log(error);
                });

            });

            //判断审核是否通过,“重新发布”是否显示
        },
        computed: {
        },
        components: {
            editOperationForm
        },
        methods: {
            // 格式无误时显示的内容
            show: function () {
                this.linkServiceShow = true; // 上方“联系客服”按钮
                this.editPublishShow = false;  // 上方“编辑”按钮
                this.anewPublishShow = false; //上方“重新发布”按钮
                this.demandStateText = false; //"审核未通过"是否显示
                this.wrongTextShow = false;  //警告信息
            },
            // “格式有误时显示的内容
            wrongShow: function () {
                this.linkServiceShow = false; // 上方“联系客服”按钮
                this.editPublishShow = false;  // 上方“编辑”按钮
                this.anewPublishShow = true; // 上方“重新发布”按钮
                this.demandStateText = true; //"审核未通过"是否显示
                this.wrongTextShow = true;   //警告信息
            },
            closeThisFn: function () {
                this.$emit('close-this');
            },
            // 点击“联系客服”
            linkServiceClickFn: function () {
                let chatObj = {};
                chatObj.id = null;
                tabulationBoxTrigger.$emit('addChat',chatObj);
            },
           /* //点击“重新发布”
            anewPublishClickFn: function () {
//                alert('重新发布')
                this.linkServiceShow = false; // 上方“联系客服”按钮
                this.editPublishShow = true;  // 上方“编辑”按钮
                this.anewPublishShow = false; //上方“重新发布”按钮
            },*/
            /*// 点击“编辑”
            editPublishClickFn: function () {

            },*/
            // 点击表单的“确认”后
            changeShowCodeFn: function () {
//                this.closeThisFn();
                this.editOperationFormShow = false;
            },

            //点击“重新发布”
            anewPublishClickFn2: function () {
                this.editOperationFormShow = true;
            },
            // 撤回该托管,调用修改接口，传id和demandprogress = 3（关闭）
            recallFn: function () {
                this.recallData.id = this.myData.id;
                this.recallData.demandprogress = 3;
                this.$ajax({
                    url: "closeDemandById",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
//                    params: this.recallData
                    params: {
                        id: this.myData.id
                    }
                }) .then((response) => {
                    if(response.data.opResult === '0'){
                        alert('成功撤回该托管！');
                        this.$emit('refresh');
                        this.closeThisFn();
                    }else{
                        alert('错误代码：' + response.data.opResult)
                    }
                }) .catch((error) => {
                    console.log(error);
                });
            },
        }
    }
</script>
<style lang="scss" scoped>
    /*多行省略号，兼容多个浏览器*/
    @mixin line-clamp($lines, $line-height: 20px) {
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: $lines; // number of lines to show
        overflow: hidden;
        line-height: $line-height;
        max-height: $line-height * $lines;
    }
    /**************************/
    .font-gray {
        color: rgba(96, 94, 124, 0.7);
    }
    .danger {
        color: #FF9393;
    }
    .icon-item {
        font-size: 1.6rem;
        font-family: iconfont;
    }
    .btn-b {
        outline: none;
        border: 0;
    }
    .btn-w {
        outline: none;
    }
    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .4);
        z-index: 30;
    }
    .ald-container{
        position: absolute;
        top: 0px;
        right: 0px;
        display: flex;
        flex-direction: column;
        /*padding-bottom: 100px;*/
        width: 600px;
        height: 100%;
        min-height: 700px;
        font-size: 1.2rem;
        background: white;
        z-index: 12;
    }
    .item-container {
        display: flex;
        padding: 0 40px;
    }
    .first {
        position: relative;
        justify-content: space-between;
        align-items: center;
        height: 41px;
        font-size: 12px;
        .close-icon {
            position: absolute;
            right: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            border: 1px solid gray;
            border-radius: 100%;
        }
    }
    .second {
        position: relative;
        flex-direction: column;
        margin-bottom: 35px;
        height: 100px;
        background: rgba(216,216,216, .17);
        .anew-publish {
            position: absolute;
            top: 25px;
            right: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 20px;
            color: white;
            border-radius: 20px;
            background: #3C78FF;
            cursor: pointer;
        }
        .edit-publish {
            position: absolute;
            top: 25px;
            right: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 72px;
            height: 27px;
            border-radius: 20px;
            cursor: pointer;
        }
        .top {
            display: flex;
            margin: 30px 0 15px 0;
            font-size: 20px;
        }
        .bottom {
            margin-left: 3px;
        }
    }
    .fourth {
        justify-content: space-between;
        /*margin-bottom: 30px;*/
        .items {
            display: flex;
            width: 240px;
            .item {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                line-height: 40px;
                .item-height {
                    height: 40px;
                }
            }
            .left {
                width: 80px;
            }
            .right {
                width: 160px;
            }
        }
    }
    .add-item {
        display: flex;
        margin-top: 15px;
        height: 80px;
        .left {
            flex-shrink: 0;
            width: 80px;
            line-height: 20px;
        }
        .right {
            @include line-clamp(3);
        }
    }
    .fifth {
        justify-content: space-between;
        /*margin-top: 20px;*/
        height: 100px;
        .items {
            display: flex;
            width: 240px;
            .item {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                line-height: 40px;
                .item-height {
                    height: 40px;
                }
            }
            .left {
                width: 80px;
            }
            .right {
                width: 160px;
            }
        }
    }
    .seventh {
        position: absolute;
        bottom: 125px;
    }
    .line {
        /*position: absolute;
        left: 20px;
        bottom: 110px;*/
        margin: 0 auto;
        margin-top: 30px;
        margin-bottom: 20px;
        width: 560px;
        height: 2px;
        background: #f3f3f3;
    }
    .eighth {
        position: absolute;
        left: 20px;
        bottom: 0;
        display: flex;
        justify-content: center;
        /*align-items: center;*/
        width: 560px;
        height: 100px;
        background: white;
        .buttons {
            display: flex;
            margin-top: 18px;
            height: 40px;
            >.btn-b {
                margin-right: 14px;
                width: 300px;
                border-radius: 20px;
            }
            >.btn-w {
                width: 200px;
                border-radius: 20px;
            }
        }
    }
</style>