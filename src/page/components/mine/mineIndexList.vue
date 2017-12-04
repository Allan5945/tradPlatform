<template>
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
                    {{stateWriting}}
                    <div class="triangle-little" style="margin-left: 10px"></div>
                    <stateList :state="state" v-show="stateShow" @stateClick="stateClickFn"></stateList>
                </div>
                <div class="list-e item"></div>
                <div class="list-f item"></div>
            </div>
            <div class="list items">
                <div class="list-a item">
                    11.04.2017
                </div>
                <div class="list-b item">
                    航线需求
                </div>
                <div class="list-c item color">
                    成都-北京航线新开 找运力，XXXXXXXXXX
                </div>
                <div class="list-d item">
                    需求审核
                </div>
                <div class="list-e item">
                    <span class="icon-item talk-icon">&#xe602;
                        <span>1</span>
                    </span>
                </div>
                <div class="list-f item color">
                    查看详情<span class="icon-item">&#xe686;</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import stateList from './stateList.vue'

    export default {
        data() {
            return {
                typeShow: false,    //需求类型显示
                stateShow: false,   //状态显示
                typeWriting: '需求类型',
                stateWriting: '状态',
                type: ['运力投放','委托运力投放','航线需求','委托航线需求','运营托管'],
                state: [],
                state1: ['需求审核','需求发布','意见征集','订单确认','已关闭','订单完成','佣金支付','交易完成'],
                state2: ['待处理','测评中','已接受','已拒绝','已关闭'],
                state3: ['待处理','处理中','意见征集','订单确认','订单完成','已拒绝','已完成','已关闭']
            }
        },
        mounted() {
            this.state = this.state1;
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
                if(item == '航线需求' || item == '运力投放') {
                    this.state = this.state1;
                }
                if(item == '运营托管') {
                    this.state = this.state2;
                }
                if(item == '委托运力投放' || item == '委托航线需求') {
                    this.state = this.state3;
                }
            },
            stateClickFn: function (item) {
                this.stateWriting = item;
            }
        },
        components: {
            stateList
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
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #F8F8F8;
    }
    .miList-container {
        margin: 0 auto;
        padding-top: 40px;
        width: 1000px;
        height: 340px;
        &::after {
            display: block;
            height: 60px;
            content: '';
        }
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
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .list-d {
            position: relative;
            width: 80px;
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
</style>