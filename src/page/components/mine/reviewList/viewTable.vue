<template>
    <div>
        <div class="miList-wrapper">
            <div class="miList-container">
                <div class="title items">
                    <div class="list-a item cancheck" @click="timeSort">
                        发布时间
                        <div class="up-down" style="margin-left: 10px;">
                            <span class="icon-item icon-up" :class="{'active':sorted===true}">&#xe605;</span>
                            <span class="icon-item icon-down" :class="{'active':sorted===false}">&#xe605;</span>
                        </div>
                    </div>
                    <div class="list-b item cancheck" @click="typeShowFn">
                        {{typeWriting}}
                        <div class="triangle-little" style="margin-left: 10px;"></div>
                        <ul class="type-list" v-show="typeShow">
                            <li v-for="(item,key) in type" @click="typeClickFn(item,key)">{{item}}</li>
                        </ul>
                    </div>
                    <div class="list-p item">发布人</div>
                    <div class="list-c item">
                        发布标题
                    </div>
                    <div class="list-d item cancheck" @click="stateShowFn">
                        {{stateWriting}}
                        <div class="triangle-little" style="margin-left: 10px;"></div>
                        <ul class="type-list" v-show="stateShow">
                            <li v-for="(item,key) in progressState" @click="stateClickFn(item,key)">{{item}}</li>
                        </ul>
                    </div>
                    <div class="list-e item"></div>
                    <div class="list-f item"></div>
                </div>
                <template v-if="detailsData">
                    <div class="list-container">
                        <div class="list items"   v-for="ditem in detailsData.list">
                            <div class="list-a item">
                                {{ ditem.releasetime }}
                            </div>
                            <div class="list-b item">
                                {{ type[ditem.demandtype]}}
                            </div>
                            <div class="list-p item">
                                {{ ditem.employeeNm }}
                            </div>
                            <div class="list-c item color">
                                {{ ditem.title }}
                            </div>
                            <div class="list-d item">
                                {{ progressState[ditem.demandstate] || "未知状态" }}
                            </div>
                            <div class="list-e item">
                            </div>
                            <div class="list-f item color" @click="turnDetailPanel(ditem)">
                                查看详情<span class="icon-item">&#xe686;</span>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <transition name="slidex-fade">
            <panel v-if="detailsPanel.show" :detailData="detailsPanel.data" v-on:closeAll="turnDetailPanel"></panel>
        </transition>
    </div>
</template>
<script>
    import panel from './panel.vue';

    export default {
        data() {
            return {
                sorted: null,
                filterDelay: true,
                typeShow: false,    //需求类型显示
                stateShow: false,   //状态显示
                typeWriting: '需求类型',
                stateWriting: '状态',
                //不同需求类型展现的状态不同
                type: ['航线需求','运力投放'],
                progressState:{
                    '4': '未处理',
                    '5': '审核未通过',
                    '6': '审核通过'
                },
                demandId:null,
                detailsPanel:{
                    data:null,
                    show:false,
                },
                detailsData: null,
                getParams: {    //请求参数
                    demandType : '' ,
                    demandState : '',
                    page: 1,
                    orderType : 0
                }
            }
        },
        methods: {
            delayChange: function () {  // 1000ms延迟
                this.filterDelay = false;
                setTimeout(()=>{
                    this.filterDelay = true;
                },1000)
            },
            typeShowFn: function () {
                this.typeShow = !this.typeShow;
            },
            stateShowFn: function () {
                this.stateShow = !this.stateShow;
            },
            timeSort:function(){    //日期排序
                if(this.filterDelay){
                    this.delayChange();
                    this.sorted = !this.sorted;
                    let s = this.sorted ? '1' : '0';
                    this.getParams.orderType = s;
                    this.getListData();
                }
            },
            typeClickFn: function (item,k) {    //筛选-需求类型
                if(this.filterDelay && k!==this.getParams.demandType){
                    this.typeWriting = item;
                    this.delayChange();
                    let s = this.sorted;
                    this.getParams.demandType = k;
                    this.getListData();
                }
            },
            stateClickFn: function (item,k) {   //筛选-状态
                if(this.filterDelay && k!==this.getParams.demandState){
                    this.stateWriting = item;
                    this.delayChange();
                    let s = this.sorted;
                    this.getParams.demandState = k;
                    this.getListData();
                }
            },
            turnDetailPanel: function (item) {
                this.detailsPanel.data = item;
                this.detailsPanel.show = !this.detailsPanel.show;
            },
            getListData: function () {
                let that = this,
                    params = that.getParams;
                this.$ajax({
                    method: 'GET',
                    url: '/getDemandOfReviewList',
                    params: params
                }).then(res=>{
                    if(res && res.data.opResult==0){
                        that.detailsData = res.data.list;
                    }else{
                        that.detailsData = null;
                        alert('暂无返回，请稍后重试。')
                    }
                }).catch(err=>{
                    that.detailsPanel.show = false;
                })
            }
        },
        mounted() {
            this.getListData();
        },
        components: {
            panel,
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
        width: 100%;
        background: #F8F8F8;
        font-size:1.2rem;
    }
    .miList-container {
        margin: 0 auto;
        padding-top: 40px;
        width: 1000px;
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
        }
        .list-p{
            width: 120px;
            margin-right: 40px;
        }
        .type-list {
            top: 40px;
            left: 0;
            li {
                display: flex;
                align-items: center;
                width: 103px;
            }
        }
        .list-c {
            margin-right: 40px;
            width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
        }
        .list-d {
            position: relative;
            width: 80px;
        }
        .list-e {
            width: 140px;
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
    .cancheck{
        cursor: pointer;
    }
    .list-container{
        height: 280px;
        overflow-y: auto;
    }
</style>