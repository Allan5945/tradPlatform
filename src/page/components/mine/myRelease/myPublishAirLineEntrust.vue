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
                    <span class="font-gray" style="margin-right: 25px;">委托方　{{myData.employeeNm}}</span>
                    <span class="font-gray" style="margin-right: 30px;">创建于{{releasetime}}</span>
                    <span class="font-gray">状态:　<span  v-if="demandStateText == true" style="color: red; font-weight: bold;">{{myData.demandprogressStr}}</span>
                        <span v-else><span style="color: #3F7AFF;font-weight: bold;">{{myData.demandprogressStr}}</span></span>
                    </span>
                </div>
            </div>
            <div class="third item-container">
                <div class="start item">
                    <div class="item-a font-gray">始发<span v-if="myData.dptState == 1">区域</span><span v-else>机场</span>
                    </div>
                    <div class="item-b"><span v-if="myData.dptState == 1">{{myData.dpt}}</span><span v-else>{{myData.dptNm}}</span></div>
                    <div class="item-c font-gray">{{myData.dptAcceptnearairportStr}}临近机场</div>
                    <div class="item-d font-gray">出港资源</div>
                    <div class="item-e">{{myData.dptTimeresourcesStr}}</div>
                </div>
                <div class="pass item" style="display: flex; align-items: center;">
                    <span class="left-icon icon-item">&#xe6ad;</span>
                    <div class="border-dashed"></div>
                    <span class="right-icon icon-item">&#xe672;</span>
                </div>
                <div class="arrive item">
                    <div class="item-a font-gray">到达<span v-if="myData.arrvState == 1">区域</span><span v-else>机场</span>
                    </div>
                    <div class="item-b"><span v-if="myData.arrvState == 1">{{myData.arrv}}</span><span v-else>{{myData.arrvNm}}</span></div>

                    <!--下方有空格-->
                    <div class="item-c font-gray">&nbsp;<!--此处有空格--></div>
                    <div class="item-d font-gray">&nbsp;<!--此处有空格--></div>
                    <div class="item-e">&nbsp;<!--此处有空格--></div>
                </div>
            </div>
            <div class="line"></div>
            <div class="fourth item-container">
                <div class="items">
                    <div class="left item">
                        <div class="font-gray">拟开时间</div>
                        <div class="font-gray">拟飞机型</div>
                        <div class="font-gray">客量期望</div>
                        <div class="font-gray">补贴政策</div>
                    </div>
                    <div class="right item">
                        <div class="item-height">{{myData.sailingtime || '-'}}</div>
                        <div class="item-height">{{myData.aircrfttyp || '-'}}</div>
                        <div class="item-height">
                            <span v-if="myData.avgguestexpect != null && myData.avgguestexpect != ''">{{myData.avgguestexpect}}人/均班</span>
                            <span v-else>-</span>
                        </div>
                        <div class="item-height">{{myData.subsidypolicyStr || '-'}}</div>
                    </div>
                </div>
                <div class="items">
                    <div class="left item">
                        <div class="font-gray">拟开班期</div>
                        <div class="font-gray">座位数</div>
                        <div class="font-gray">客座率期望</div>
                        <div class="font-gray">有效期</div>
                    </div>
                    <div class="right item">
                        <div class="item-height">{{myData.days || '-'}}</div>
                        <div class="item-height">{{myData.seating || '-'}}</div>
                        <div class="item-height">
                            <span v-if="myData.loadfactorsexpect != null && myData.loadfactorsexpect != ''">{{myData.loadfactorsexpect}}%</span>
                            <span v-else>-</span>
                        </div>
                        <div class="item-height">{{myData.periodValidity || '-'}}</div>
                    </div>
                </div>
            </div>
            <div class="fifth item-container">
                <div class="left font-gray">其他说明</div>
                <div class="right">{{myData.remark}}</div>
            </div>
            <div class="line"></div>
            <div class="sixth item-container">
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
            <div class="eighth">
                <span class="line" style="position:absolute; top: 0px;"></span>
                <div class="buttons" v-if="buttonShow">
                    <button class="btn btn-w" @click="recallFn">撤回该托管</button>
                </div>
            </div>
            <!--委托运力投放-->
            <editAgentTransForm v-if="editAgentTransFormShow" @close-this="closeEditAgentTransForm" @change-showCode="changeShowCodeFn"></editAgentTransForm>
            <!--委托航线需求-->
            <editAirlineDelegation v-if="editAirlineDelegationShow" @close-this="closeEditAirlineDelegation" @change-showCode="changeShowCodeFn"></editAirlineDelegation>
        </div>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js'
    import editAgentTransForm from './editAgentTransForm.vue'
    import editAirlineDelegation from './editAirlineDelegation.vue'
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
                editAgentTransFormShow: false, //编辑需求表单
                editAirlineDelegationShow: false,
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
                        // demandProgress:需求进度状态[0:需求发布、1:意向征集、2:订单确认、3:关闭（审核不通过、下架、过期）、4:订单完成、5:佣金支付、6:交易完成、7:待处理、8:已接受、9:处理中、10:已拒绝]
                        // demandState:需求状态(0:正常,1:完成,2:异常,3:删除,4:未处理,5:审核不通过,6,审核通过)
                        if(this.myData.demandstate == 2
                            || this.myData.demandstate == 3
                            || this.myData.demandstate == 5
                            || this.myData.demandprogress == 3
                            || this.myData.demandprogress == 6
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
        },
        computed: {
            ...vx.mapGetters([
                'role'
            ]),
        },
        components: {
            editAgentTransForm, //委托航线需求
            editAirlineDelegation //委托运力投放
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
                this.anewPublishShow = true; //上方“重新发布”按钮
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
            // 点击表单的“确认”后
            changeShowCodeFn: function () {
                this.editPublishShow = false;
                this.anewPublishShow = false;
                this.wrongTextShow = false;
                tabulationBoxTrigger.$on('sendToMyPublish',(val) => {
                    this.myData = val;
                });
            },
            //关闭“编辑需求”表单
            closeEditAgentTransForm: function () {
                this.editAgentTransFormShow = false;
            },
            closeEditAirlineDelegation: function () {
                this.editAirlineDelegationShow = false;
            },
            //点击“重新发布”
            anewPublishClickFn2: function () {
                if(this.myData.demandtype == 3) {
                    this.editAirlineDelegationShow = true;
                }if(this.myData.demandtype == 4) {
                    this.editAgentTransFormShow = true;
                }
            },
            // 撤回该托管,调用修改接口，传id和demandprogress = 3（关闭）
            recallFn: function () {
                this.$ajax({
                    url: "closeDemandById",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
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
    /*虚线，弧线*/
    .border-dashed {
        width: 155px;
        height: 50px;
        border-top: 1px dashed #9E9E9E;
        border-radius: 100%;
    }
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
        /*display: flex;*/
        /*flex-direction: column;*/
        width: 600px;
        height: 100%;
        min-height: 900px;
        /*min-height: 700px;*/
        font-size: 1.2rem;
        background: white;
        overflow-y: scroll;
        z-index: 12;
    }
    .ald-container::-webkit-scrollbar {
        width: 7px;
    }
    .ald-container::-webkit-scrollbar-thumb {
        background: #D8D8D8;
        border-radius: 4px;
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
    .third {
        position: relative;
        justify-content: space-between;
        margin-bottom: 22px;
        .item {
            /*width: 140px;*/
            height: 160px;
            .item-a {
                margin: 25px 0 10px 0;
                height: 15px;
            }
            .item-b {
                height: 25px;
                font-size: 20px;
            }
            .item-c {
                margin-bottom: 23px;
                height: 15px;
            }
            .item-d {
                margin-bottom: 5px;
                height: 15px;
            }
            .item-e {
                height: 15px;
            }
        }
        .pass {
            position: relative;
            >span {
                position: absolute;
                top: 50%;
                margin-top: -35px;
                font-size: 2.6rem;
                color: #9E9E9E;
                &::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    left: 50%;
                    margin-left: -5px;
                    width: 10px;
                    height: 10px;
                    border-radius: 100%;
                    background: #D8D8D8;
                }
            }
            .left-icon {
                left: -11px;
            }
            .right-icon {
                right: -11px;
            }
        }
    }
    .fourth {
        justify-content: space-between;
        margin: 12px 0 15px 0;
        .items {
            display: flex;
            width: 240px;
            .item {
                line-height: 40px;
            }
            .left {
                width: 80px;
            }
            .right {
                width: 160px;
                .item-height {
                    height: 40px;
                }
            }
        }
    }
    .fifth {
        margin-top: 20px;
        height: 100px;
        .left {
            flex-shrink: 0;
            width: 80px;
            line-height: 20px;
        }
        .right {
            @include line-clamp(3);
        }
    }
    .sixth {
        justify-content: space-between;
        margin-top: 20px;
        margin-bottom: 110px;
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
        width: 560px;
        height: 2px;
        background: #f3f3f3;
    }
    .eighth {
        position: absolute;
        right: 0px;
        bottom: 0;
        display: flex;
        justify-content: center;
        /*align-items: center;*/
        width: 600px;
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