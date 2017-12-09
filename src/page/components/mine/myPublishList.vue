<template>
    <div>
        <div class="miList-wrapper">
            <div class="miList-container">
                <div class="title items">
                    <div class="list-a item">
                        发布时间
                        <div class="up-down" style="margin-left: 10px">
                            <span class="icon-item icon-up active">&#xe605;</span>
                            <span class="icon-item icon-down">&#xe605;</span>
                        </div>
                    </div>
                    <div class="list-b item" @click="typeShowFn">
                        {{typeWriting}}
                        <div class="triangle-little" style="margin-left: 10px"></div>
                        <ul class="type-list" v-show="typeShow">
                            <li v-for="item in type" @click="typeClickFn(item)">{{item}}</li>
                        </ul>
                    </div>
                    <div class="list-c item">
                        发布标题
                    </div>
                    <div class="list-d item" @click="stateShowFn">
                        <span>{{stateWriting}}</span>
                        <div class="triangle-little" style="margin-left: 10px"></div>
                        <stateList :state="state" v-show="stateShow" @stateClick="stateClickFn"></stateList>
                    </div>
                    <div class="list-e item"></div>
                    <div class="list-f item"></div>
                </div>
                <div class="lists-containt">
                    <!--点击列表展示发布详情-->
                    <div class="list items" v-for="(item,index) in myData" :class="{'list-active': listItemIndex === index}" @click="listClickFn(item,index)">
                        <div class="list-a item">
                            {{item.releasetime}}
                        </div>
                        <div class="list-b item">
                            {{item.demandtypeStr}}
                        </div>
                        <div class="list-c item color">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="list-d item">
                            {{item.demandprogress}}
                        </div>
                        <div class="list-e item">
                        <span class="icon-item talk-icon">&#xe602;
                            <span>1</span>
                        </span>
                        </div>
                        <div class="list-f item color">查看详情<span class="icon-item">&#xe686;</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <myPublish v-show="myPublishShow" @close-this="closeMyPublishShowFn"></myPublish>
        <myPublishTransportEntrust v-show="myPublishTransportEntrustShow" @close-this="closeMyPublishTransportEntrustFn"></myPublishTransportEntrust>
        <myPublishAirLineEntrust v-show="myPublishAirLineEntrustShow" @close-this="closeMyPublishAirLineEntrustFn"></myPublishAirLineEntrust>
    </div>
</template>
<script>
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';
    import stateList from './stateList.vue'
    import myPublish from './myPublishNeed.vue'
    import myPublishTransportEntrust from './myPublishTransportEntrust.vue'
    import myPublishAirLineEntrust from './myPublishAirLineEntrust.vue'

    export default {
        data() {
            return {
                typeShow: false,    //需求类型显示
                stateShow: false,   //状态显示
                typeWriting: '需求类型',
                stateWriting: '状态',
                //不同需求类型展现的状态不同
                type: ['运力投放','委托运力投放','航线需求','委托航线需求','运营托管'],
                state: [],
                state1: ['需求发布','意见征集','订单确认','关闭(审核不通过、下架、过期)','订单完成','佣金支付','交易完成'],
                state2: ['待处理','测评中','已接受','已拒绝','已关闭'],
                state3: ['待处理','处理中','意见征集','订单确认','订单完成','已拒绝','已完成','已关闭'],
                state4: ['需求发布','意见征集','订单确认','关闭(审核不通过、下架、过期)','交易完成'],
                myPublishShow: false,       // myPublish(我的发布-审核未通过)是否显示
                myPublishTransportEntrustShow: false, // myPublishEntrust（我的发布-发布的运力托管）是否显示
                myPublishAirLineEntrustShow: false,   //myPublishAirLineEntrust（我的发布-发布的航线托管）是否显示
                myData: [],                 // 将获取的数据，渲染到页面上
                listItemIndex: '',          // 被点击列的index，用来使其变成active
            }
        },
        mounted() {
            this.state = this.state1;
            this.$ajax({
                url:"/getTheReleaseDemandOfMine",
                method: 'post',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                params: {
                    page:1,
                    orderType: 1 //发布时间排序类型 0-倒序 1-正序
                }
            }) .then((response) => {
                console.info('myPublishList获取的数据:')
                console.info(response)
                this.myData = response.data.list.list;
            }).catch((error) => {
                console.log(error);
            });
        },
        methods: {
            typeShowFn: function () {
                this.typeShow = !this.typeShow;
            },
            stateShowFn: function () {
                this.stateShow = !this.stateShow;
            },
            typeClickFn: function (item) {
                this.typeWriting = item;
                if(item == '航线需求') {
                    this.state = this.state1;
                }if(item == '运营托管') {
                    this.state = this.state2;
                }if(item == '委托运力投放' || item == '委托航线需求') {
                    this.state = this.state3;
                }if(item == '运力投放') {
                    this.state = this.state4;
                }
            },
            stateClickFn: function (item) {
                this.stateWriting = item;
            },
            // 点击列表(list)，变成active状态, 确定哪个显示; 向myPublish.vue传参数
            listClickFn: function (item,index) {
                this.listItemIndex = index; //变成active状态
                console.info('listItem:')
                console.info(item)
                this.$ajax({
                    url:"/demandFind",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: {
                        demandId: item.id //发布时间排序类型 0-倒序 1-正序
                    }
                }) .then((response) => {
                    console.info('我的发布详情:')
                    console.info(response.data.data)
                    tabulationBoxTrigger.$emit('sendDataToMyPublish',response.data.data); //将item的参数传递给myPublishNeed.vue
                }).catch((error) => {
                    console.log(error);
                });

                //['运力投放','委托运力投放','航线需求','委托航线需求','运营托管'],
//                响应的需求种类共5种（0:航线需求、1:运力需求、2:运营托管、3:航线委托、4:运力委托）
//                 除去0和1两种状态, 其他状态不再地图上呈现，仅在太美角色个人中心的委托列表中呈现。
                if(item.demandtype == 2){
                    // 运营托管详情
                    this.myPublishTransportEntrustShow = true;
                    this.myPublishAirLineEntrustShow = false;
                    this.myPublishShow = false;
                }if(item.demandtype == 4 || item.demandtype == 3){
                    // 航线委托详情
                    this.myPublishTransportEntrustShow = false;
                    this.myPublishAirLineEntrustShow = true;
                    this.myPublishShow = false;
                }if(item.demandtype == 0 || item.demandtype == 1){
                    //  审核未通过，需求详情
                    /*this.myPublishTransportEntrustShow = false;
                    this.myPublishAirLineEntrustShow = false;
                    this.myPublishShow = true;*/
//                    this.myPublishTransportEntrustShow = true;
//                    this.myPublishAirLineEntrustShow = true;
                    this.myPublishShow = true;
                }

            },
            // 点击关闭:我的发布-审核未通过
            closeMyPublishShowFn: function () {
                this.myPublishShow = false;
                this.listItemIndex = '';
            },
            // 点击关闭:我的发布-发布的运力托管
            closeMyPublishTransportEntrustFn: function () {
                this.myPublishTransportEntrustShow = false;
                this.listItemIndex = '';
            },
            // 点击关闭:我的发布-发布的航线托管
            closeMyPublishAirLineEntrustFn: function () {
                this.myPublishAirLineEntrustShow = false;
                this.listItemIndex = '';
            }
        },
        components: {
            stateList,
            myPublish,
            myPublishTransportEntrust,
            myPublishAirLineEntrust
        }
    }
</script>
<style lang="scss" scoped>
    $icon-color: #3c78ff;
    $font-color: #605e7c;
    $border-color: rgba(96,94,124,0.37);
    ul {
        position: absolute;
        margin: 0;
        padding: 0;
        list-style: none;
        border-radius: 4px;
        box-shadow: 0 2px 11px $border-color;
        background: white;
        z-index: 2;
        li {
            padding-left: 17px;
            height: 35px;
            font-size: 1.2rem;
            color: $font-color;
            cursor: pointer;
            &:hover {
                background: #F5F5F5;
            }
        }
    }

    .icon-item {
        font-size: 1.6rem;
        font-family: iconfont;
    }
    .triangle-little {
        width: 0;
        height: 0;
        border-left: 4.5px solid transparent;
        border-right: 4.5px solid transparent;
        border-top: 5px solid $icon-color;
    }
    .color {
        color: #3c78ff;
    }
    .miList-wrapper {
        /*position: absolute;
        bottom: 0;
        left: 0;*/
        width: 100%;
        /*height: 434px;*/
        font-size: 1.2rem;
        background: #F8F8F8;
    }
    .miList-container {
        margin: 0 auto;
        padding-top: 40px;
        width: 1000px;
        height: 340px;
        .lists-containt {
            height: 280px;
            overflow-y: scroll;
        }
        .lists-containt::-webkit-scrollbar {
            width: 7px;
        }
        .lists-containt::-webkit-scrollbar-thumb {
            height: 56px;
            background: #D8D8D8;
            border-radius: 4px;
        }
        /*&::after {
            display: block;
            height: 60px;
            content: '';
        }*/
    }
    .items {
        display: flex;
        margin-bottom: 10px;
        padding: 0 40px;
        .item {
            display: flex;
            align-items: center;
            flex-shrink: 0;
        }
        .list-a {
            width: 100px;
            .up-down {
                position: relative;
                width: 20px;
                .active {
                    color: $icon-color;
                }
                .icon-up {
                    position: absolute;
                    bottom: -4px;
                    transform: rotate(180deg);
                }
                .icon-down {
                    position: absolute;
                    top: -4px;
                }
            }
        }
        .list-b {
            position: relative;
            margin-right: 40px;
            width: 100px;
            .type-list {
                top: 40px;
                left: 0;
                li {
                    display: flex;
                    align-items: center;
                    width: 103px;
                }
            }
        }
        .list-c {
            margin-right: 40px;
            width: 320px;
            >span {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .list-d {
            position: relative;
            width: 80px;
            >span {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .list-e {
            margin-right: 160px;
            width: 20px;
            .talk-icon {
                position: relative;
                font-size: 2.5rem;
                >span {
                    position: absolute;
                    top: -1px;
                    right: -1px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-width: 12px;
                    height: 12px;
                    font-size: 1.0rem;
                    color: white;
                    background: red;
                    border-radius: 20px;
                }
            }
        }
        .list-f {
            width: 60px;
            white-space: nowrap;
        }
    }
    .title {
        height: 40px;
    }
    .list {
        height: 58px;
        border: 1px solid transparent;
        border-radius: 4px;
        background: white;
        &:hover {
            background: #ebebeb;
        }
        &:active {
            border: 1px solid #d0d0d0;
            background: #ebebeb;
        }
        .list-f {
            cursor: pointer;
        }
    }
    .list-active {
        border: 1px solid #d0d0d0;
        background: #ebebeb;
    }
</style>