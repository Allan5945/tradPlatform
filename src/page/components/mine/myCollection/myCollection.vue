<template>
    <div>
        <div class="miList-wrapper">
            <div class="miList-container">
                <div class="title items">
                    <div class="list-a item">
                        发布时间
                        <div class="up-down" style="margin-left: 10px" @click="timeSort">
                            <span class="icon-item icon-up" :class="{active:sorted}">&#xe605;</span>
                            <span class="icon-item icon-down" :class="{active:!sorted}">&#xe605;</span>
                        </div>
                    </div>
                    <div class="list-b item" @click="typeShowFn" style="cursor:pointer;">
                        {{typeWriting}}
                        <div class="triangle-little" style="margin-left: 10px"></div>
                        <ul class="type-list" v-show="typeShow">
                            <li v-for="item in type" @click="typeClickFn(item)">{{item}}</li>
                        </ul>
                    </div>
                    <div class="list-c item">
                        发布标题
                    </div>
                    <div class="list-d item" @click="stateShowFn" style="cursor:pointer;">
                        <span>{{stateWriting}}</span>
                        <div class="triangle-little" style="margin-left: 10px"></div>
                        <stateList :state="state" v-show="stateShow" @stateClick="stateClickFn"></stateList>
                    </div>
                    <div class="list-e item"></div>
                    <div class="list-f item"></div>
                </div>
                <div class="lists-containt" v-if="collectList">
                    <!--点击列表展示发布详情-->
                    <div class="list items" :class="{'list-active':false}" v-for="val in collectList" >
                        <div class="list-a item">
                            {{val.releaseTime}}
                        </div>
                        <div class="list-b item">
                             {{myDemand(val.demandType)}}
                        </div>
                        <div class="list-c item color">
                            <span>{{val.title}}</span>
                        </div>
                        <div class="list-d item">
                            {{progress(val.demandProgress)}}
                        </div>
                        <div class="list-e item"  @click="chat(val)" v-if="val.wetherResponse">
                        <span class="icon-item talk-icon">&#xe602;
                           <span v-show="val.unreadNum !== 0 ">{{val.unreadNum}}</span>
                        </span>
                        </div>
                        <div class="list-e item" v-else></div>
                        <div class="list-f item color" @click="openDetail(val)">查看详情<span class="icon-item">&#xe686;</span>
                        </div>
                    </div>
                </div>
            </div>
            <el-pagination
                   class="pagination"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :page-size="numPrePage"
                   layout="prev, pager, next, jumper, total"
                   :total="totalCount">
                        </el-pagination>
        </div>
        <transition name="slidex-fade">
            <transDetail v-if="transShow" @closeDetail="closeDetail" @showDetail="showTrans" :needData="needData"></transDetail>
        </transition>
        <transition name="slidex-fade">
           <airlineDetail v-if="airlineShow" @close-this="closeDetail" :needData="needData"></airlineDetail>
        </transition>

    </div>
</template>
<script>
    import stateList from './../stateList.vue';
    import * as vx from 'vuex';
    import transDetail from './transDetail.vue';
    import airlineDetail from './airlineDetail.vue';
    import ln from './../../../../public/js/tabulationBoxTrigger';
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';

    export default {
        data() {
            return {
                typeShow: false,    //需求类型显示
                stateShow: false,   //状态显示
                sorted:true,
                transShow:false,
                airlineShow:false,
                typeWriting: '需求类型',
                stateWriting: '状态',
                //不同需求类型展现的状态不同
                type: ['需求类型','运力投放','航线需求'],
                state: ['状态','需求审核','需求发布','意向征集','订单确认','订单完成','关闭'],
                collectList:null,
                needData:null,
                numPrePage:1,
                totalCount: 0,
                pageCount: 1,
                sentData:{
                    page: 1,
                    pageNo:5,
                    demandType:'',
                    demandProgress:null,
                    releaseTime:"Desc"
                }
            }
        },
        computed:{
         ...vx.mapGetters([
                'role'
            ])
        },
        methods: {
            handleSizeChange(val) {
//            console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(page) {
//                console.log(`当前页: ${val}`);
                this.sentData.page = page;
            },
            chat:function (v) {
                v.employeeId = this.role.id;
                ln.$emit('addChat',v);
            },
            typeShowFn: function () {
                this.typeShow = !this.typeShow;
            },
            stateShowFn: function () {
                this.stateShow = !this.stateShow;
            },
            typeClickFn: function (item) {
                this.typeWriting = item;
                this.stateWriting = '状态';
                this.sentData.demandProgress = '';
                if(item == '航线需求') {
                    this.sentData.demandType = "0";
                }else if(item == '运力投放') {
                    this.sentData.demandType = "1";
                }else if(item == '需求类型') {
                    this.sentData.demandType = null;
                }
            },
            stateClickFn: function (item) {
                this.stateWriting = item;
                 this.sentData.demandProgress = this.turnProgress(item);
            },
             openDetail:function(val){
                this.needData = val;
                if(val.demandType == 1){
                    this.transShow = true;
                }if(val.demandType == 0){
                    this.airlineShow = true;
                }
            },
            timeSort:function(){
                this.sorted = !this.sorted;
                this.sentData.releaseTime = this.sorted? 'Desc': 'Asc';

            },
            myDemand:function(val){
               if(val == '0'){
                    return "航线需求";
               }
               else if(val == '1'){
                    return "运力投放";
               }
            },
            progress:function(val){
                switch (val) {
                        case "0":
                            return "需求发布";
                            break;
                        case "1":
                            return "意向征集";
                            break;
                        case "2":
                            return "订单确认";
                            break;
                        case "3":
                            return "关闭";
                            break;
                        case "4":
                            return "订单完成";
                            break;
                         case "6":
                            return "交易完成";
                            break;
                        case "9":
                            return "需求审核";
                            break;
                    }
            },
            turnProgress:function(val){
                    switch (val) {
                        case "状态":
                            return null;
                            break;
                        case "需求发布":
                            return "0";
                            break;
                        case "意向征集":
                            return "1";
                            break;
                        case "订单确认":
                            return "2";
                            break;
                        case "关闭":
                            return "3";
                            break;
                        case "订单完成":
                            return "4";
                            break;
                        case "需求审核":
                            return "9";
                            break;

                    }
            },
            getListData:function(){
                    let that = this;
                    this.$ajax({
                        method: 'GET',
                        url: '/selectCollectList',
                        params: this.sentData
                    }).then(res => {
                        if(res && res.data.opResult == 0){
                            that.totalCount = res.data.list.totalCount;
                            that.pageCount = res.data.list.pageCount;
                            that.numPrePage = res.data.list.numPrePage;
                            that.collectList = res.data.list.list;
                        }else{
                            that.collectList = null;
                            alert('暂无返回，请稍后重试。')
                        }
                    }).catch( error => {
                            console.log(error);
                        }
                    );
            },
            closeDetail(){
                this.transShow = false;
                this.airlineShow = false;
                this.getListData();
            },
            showTrans(){
                this.transShow = true;
            }
        },
        watch:{
            'sentData.releaseTime': function(){
                this.getListData();
            },
            'sentData.demandType':function(){
                this.getListData();
            },
             'sentData.demandProgress':function(){
                this.getListData();
            },
            'sentData.page':function(){
                this.getListData();
            }
        },
        mounted() {
            this.getListData();
            if(this.role.role == 1){//机场
                this.type = ['运力投放'];
            }else if(this.role.role == 0){//航司
                this.type = ['航线需求'];
            }
         },
        components: {
            stateList,
            transDetail,
            airlineDetail
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
                cursor:pointer;
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
                cursor:pointer;
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
    .pagination{
        text-align:center;
        padding-bottom:20px;
    }
</style>
