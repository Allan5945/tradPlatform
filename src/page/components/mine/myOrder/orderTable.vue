<template>
    <div>
        <div class="miList-wrapper" onselectstart="return false;">
            <div class="miList-container">
                <div class="title items">
                    <div class="list-a item cancheck">
                        发布时间
                        <div class="up-down" style="margin-left: 10px" @click="timeSort">
                            <span class="icon-item icon-up" :class="{'active':sorted===true}">&#xe605;</span>
                            <span class="icon-item icon-down" :class="{'active':sorted===false}">&#xe605;</span>
                        </div>
                    </div>
                    <div class="list-b item cancheck" @click="typeShowFn">
                        {{typeWriting}}
                        <div class="triangle-little" style="margin-left: 10px"></div>
                        <ul class="type-list" v-show="typeShow">
                            <li v-for="(item,key) in type" @click="typeClickFn(item,key)">{{item}}</li>
                        </ul>
                    </div>
                    <div class="list-c item">
                        发布标题
                    </div>
                    <div class="list-d item cancheck" @click="stateShowFn">
                        {{stateWriting}}
                        <div class="triangle-little" style="margin-left: 10px"></div>
                        <ul class="type-list" v-show="stateShow">
                            <li v-for="(item,key) in progressState" @click="stateClickFn(item,key)">{{item}}</li>
                        </ul>
                    </div>
                    <div class="list-e item"></div>
                    <div class="list-f item"></div>
                </div>
                <template v-if="detailsData">
                    <div class="list-container">
                        <div class="list items"   v-for="ditem in detailsData.list" @click="turnDetailPanel(ditem)">
                            <div class="list-a item">
                                {{ ditem.releaseTime }}
                            </div>
                            <div class="list-b item">
                                {{ typeCheckList[ditem.demandType]}}
                            </div>
                            <div class="list-c item color">
                                {{ ditem.title }}
                            </div>
                            <div class="list-d item">
                                {{ progressState[ditem.demandProgress] || "未知状态" }}
                            </div>
                            <div class="list-e item">
                                <span class="icon-item talk-icon" @click.stop="openChat(ditem)" v-if="ditem.responseEmployeeId">
                                    &#xe602;
                                    <!--<span>&nbsp;</span>-->
                                </span>
                            </div>
                            <div class="list-f item color" @click.stop="turnDetailPanel(ditem)">
                                查看详情<span class="icon-item">&#xe686;</span>
                            </div>
                        </div>
                    </div>
                </template>
                <el-pagination
                        class="pagination"
                        @size-change="handleSizeChange"
                        @current-change="pageChange"
                        :current-page="pageControl.now"
                        :page-size="getParams.pageNo"
                        layout="prev, pager, next, jumper, total"
                        :total="pageControl.totalData">
                </el-pagination>
            </div>
        </div>
        <transition name="slidex-fade">
            <panel v-if="detailsPanel.show" :detailData="detailsPanel.data" :roleType="roleType" v-on:closeAll="turnDetailPanel"></panel>
        </transition>
    </div>
</template>
<script>
    import panel from './panel.vue';
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';
    import * as vx from 'vuex'

    export default {
        data() {
            return {
                roleType: '', //角色
                filterDelay: true,  //限制连续点击
                sorted:null,    // Desc/Asc
                typeShow: false,    //需求类型显示
                typeWriting: '需求类型',
                stateShow: false,   //状态显示
                stateWriting: '状态',
                //不同需求类型展现的状态不同
                type: {
                    "t":'全部',
                    "t0":'航线需求',
                    "t1":'运力投放',
                },
                typeCheckList: {
                    "0":'航线需求',
                    "1":'运力投放',
                    "3":'委托航线需求',
                    "4":'委托运力投放',
                },
                progressState: {
                    '0': '全部',
                    '3': '关闭',
                    '5': '交易完成',
                    '6': '订单完成',
                    '7': '佣金支付'
                },
                demandId:null,
                detailsPanel:{
                    data:null,
                    show:false,
                },
                detailsData: null,
                superUser:{
                    typeList: {
                        "t":'全部',
                        "t0":'航线需求',
                        "t1":'运力投放',
                        "t3":'委托航线需求',
                        "t4":'委托运力投放',
                    },
                    state: ['需求审核','需求发布','意向征集','订单确认','订单完成','佣金支付','交易完成','关闭'],
                    progressState: {
                        '0': '全部',
                        '3': '关闭',
                        '5': '交易完成',
                        '6': '订单完成',
                        '7': '佣金支付'
                    },
                },
                getParams:{     //请求参数
                    page: 1,
                    pageNo : 5,
                    demandType : '' ,
                    releaseTime: '',
                    demandProgress : ''
                },
                pageControl:{
                    totalPage: -1,
                    now: -1,
                    totalData: -1
                }
            }
        },
        computed:{
            ...vx.mapGetters([
                'role'
            ]),
        },
        components: {
            panel,
        },
        methods: {
            delayChange: function () {  // 500ms延迟，防止快速切换状态
                this.filterDelay = false;
                setTimeout(()=>{
                    this.filterDelay = true;
                },500)
            },
            typeShowFn: function () {
                this.typeShow = !this.typeShow;
            },
            stateShowFn: function () {
                this.stateShow = !this.stateShow;
            },
            typeClickFn: function (item,k) {
                k=k.replace('t','');
                if(this.filterDelay && k!==this.getParams.demandType){
                    this.typeWriting = item;
                    this.delayChange();
                    let s = this.sorted;
                    this.getParams.demandType = k;
                    this.getListData();
                }
            },
            stateClickFn: function (item,k) {
                k = k==="0"? "":k;
                if(this.filterDelay && k!==this.getParams.demandProgress){
                    this.stateWriting = item;
                    this.delayChange();
                    let s = this.sorted;
                    this.getParams.demandProgress = k;
                    this.getListData();
                }
            },
            openChat: function (p) {    // 聊天功能(传：demandEmployeeId（需求用户id）,employeeId（用户id）,id（此条id）)
                let chatObj = {
                    demandEmployeeId: p.demandEmployeeId,
                    employeeId: p.responseEmployeeId,
                    id: p.id,
                };
                tabulationBoxTrigger.$emit('addChat',chatObj);
            },
            timeSort:function(){
                if(this.filterDelay){
                    this.delayChange();
                    this.sorted = !this.sorted;
                    let s = this.sorted;
                    this.getParams.releaseTime = s? 'Asc' : 'Desc';
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
                    url: '/selectMyOrderList',
                    params: params
                }).then(res=>{
                    if(res && res.data.opResult==0){
                        that.detailsData = res.data.list;
                        that.pageControl.totalPage = res.data.list.pageCount;
                        that.pageControl.now = res.data.list.pageNo;
                        that.pageControl.totalData = res.data.list.totalCount;
                    }
                }).catch(err=>{
                    that.detailsPanel.show = false;
                })
            },
            pageChange(p){
                if(this.getParams.page !== p){
                    this.getParams.page = p;
                    this.getListData();
                }
            },
            handleSizeChange(p){
            }
        },
        mounted() {
            let role = this.role.role;
            if(role == "2") { // 太美
                this.type = this.superUser.typeList;
            }else if(role == "1"){//机场
                this.type["t3"] = '委托航线需求'
            }else if(role == "0"){//航司
                this.type["t4"] = '委托运力需求';
                delete this.progressState["6"]; //隐藏订单完成
                delete this.progressState["7"]; //隐藏佣金支付
            }
            this.roleType = role;
            this.getListData();
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
            width: 320px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
        }
        .list-d {
            position: relative;
            width: 80px;
        }
        .list-e {
            width: 180px;
            .talk-icon {
                position: relative;
                font-size: 2.5rem;
                cursor: pointer;
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
    .pagination{
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>