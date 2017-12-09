<template>
    <div class="ald-container">
        <div class="first item-container">
            <span>{{myData.demandtypeStr}}详情</span>
            <span class="close-icon" @click="closeThisFn" style="cursor: pointer;">&times;</span>
        </div>
        <div class="second item-container">
            <div class="anew-publish" v-show="anewPublishShow" @click="anewPublishClickFn">
                重新发布
            </div>
            <div class="edit-publish btn-w" v-show="editPublishShow" @click="editPublishClickFn">
                <span class="icon-item">&#xe653;</span>编辑
            </div>
            <div class="top">
                <span style="height: 25px;">{{myData.title}}</span>
            </div>
            <div class="bottom">
                <span class="font-gray" style="margin-right: 46px;">创建于{{releasetime}}</span>
                <span class="font-gray">状态:　<span v-show="true">{{myData.demandprogressStr}}</span>
                    <span style="color: red; font-weight: bold;">审核未通过</span>
                </span>
            </div>
        </div>
        <div class="fourth item-container">
            <div class="items">
                <div class="left item">
                    <div class="font-gray">出港时刻</div>
                    <div class="font-gray">机型</div>
                    <div class="font-gray">运力归属</div>
                    <div class="font-gray">小时成本</div>
                    <div class="font-gray">有效期</div>
                </div>
                <div class="right item">
                    <div class="item-height">{{myData.dptTime}}</div>
                    <div class="item-height">{{myData.aircrfttyp}}</div>
                    <div class="item-height">{{myData.capacityCompany}}</div>
                    <div class="item-height">{{myData.hourscost}}万元/小时</div>
                    <div class="item-height" style="display: flex;">{{myData.periodValidity}}<span class="icon-item">&#xe653;</span></div>
                </div>
            </div>
            <div class="items">
                <div class="left item">
                    <div class="font-gray">班期</div>
                    <div class="font-gray">运力基地</div>
                    <div class="font-gray">座位布局</div>
                    <div class="font-gray">接受调度</div>
                </div>
                <div class="right item">
                    <div class="item-height">{{myData.days}}</div>
                    <div class="item-height"><span v-if="myData.dptState == 1">{{myData.dpt}}</span><span v-else>{{myData.dptNm}}</span></div>
                    <div class="item-height">{{myData.seating}}</div>
                    <div class="item-height">{{myData.schedulinePort}}</div>
                </div>
            </div>
        </div>
        <div class="fifth item-container">
            <div class="left font-gray">其他说明</div>
            <div class="right">{{myData.remark}}</div>
        </div>
        <div class="seventh item-container">
            <span class="danger" v-show="true">*XXXX事情有误，请重新输入</span>
        </div>
        <span class="line"></span>
        <div class="eighth">
            <div class="buttons">
                <button class="btn btn-w" v-show="false">结束需求</button>
            </div>
            <div class="buttons">
                <button class="btn btn-w" style="width: 100px; margin-right: 12px; background: #cccccc; color: white;">重新发布</button>
                <button class="btn btn-w" style="width: 100px;" @click="recallFn(),closeThisFn()">结束需求</button>
            </div>
        </div>
        <editTransportForm v-show="editTransportFormShow" @close-this="closeEditTransportForm"></editTransportForm>
    </div>
</template>
<script>
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js'
    import editTransportForm from './editTransportForm.vue'

    export default {
        data() {
            return {
                myData: {},             // 获取的数据渲染到页面上
                anewPublishShow: false, //“重新发布”是否显示
                editPublishShow: true, // “编辑”是否显示
                releasetime: '',        //创建时间
                editTransportFormShow: false, //编辑需求表单
                recallData: {},         //点击“撤回该托管”传的数据
            }
        },
        mounted() {
            // 从myPublishList获取参数，并渲染到页面上
            tabulationBoxTrigger.$on('sendDataToMyPublish',val => {
                console.info('从myPublishList获取的数据:');
                console.info(val);
                this.myData = val;
                //将创建时间顺序改变
                let time1 = this.myData.releasetime.split('.');
                let time2 = [];
                for(let i = time1.length - 1; i >= 0; i--){
                    time2.push(time1[i]);
                }
                this.releasetime = time2.join('.');
            });

            //判断审核是否通过,“重新发布”是否显示
        },
        computed: {
        },
        components: {
            editTransportForm
        },
        methods: {
            closeThisFn: function () {
                this.$emit('close-this');
            },
            //点击“重新发布”
            anewPublishClickFn: function () {
                alert('重新发布')
            },
            // 点击“编辑”
            editPublishClickFn: function () {
                this.editTransportFormShow = true
            },
            //关闭“编辑需求”表单
            closeEditTransportForm: function () {
                this.editTransportFormShow = false;
            },
            // 撤回该托管,调用修改接口，传id和demandprogress = 3（关闭）
            recallFn: function () {
                this.recallData.id = this.myData.id;
                this.recallData.demandprogress = 3;
                console.info(this.recallData);
                this.$ajax({
                    url:"/demandUpdate",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: this.recallData
                }) .then((response) => {
                    console.info(response.data)
//                    this.$store.dispatch('hybridData', response.data.list.list).then(() => {});
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
    .ald-container{
        position: absolute;
        top: 0px;
        right: 0px;
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
        margin-bottom: 50px;
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
        align-items: flex-start;
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
    .seventh {
        position: absolute;
        bottom: 125px;
    }
    .line {
        position: absolute;
        left: 20px;
        bottom: 110px;
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