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
                    <div class="list-p item">发布人</div>
                    <div class="list-c item">
                        发布标题
                    </div>
                    <div class="list-d item" @click="stateShowFn" style="cursor:pointer;">
                        {{stateWriting}}
                        <div class="triangle-little" style="margin-left: 10px"></div>
                        <stateList :state="state" v-show="stateShow" @stateClick="stateClickFn"></stateList>
                    </div>
                    <div class="list-e item"></div>
                    <div class="list-f item"></div>
                </div>
                <div v-if="myList">
                    <div class="list items" v-for="val in myList">
                        <div class="list-a item">
                            {{val.releaseTime}}
                        </div>
                        <div class="list-b item">
                           {{getDemand(val.demandType)}}
                        </div>
                         <div class="list-p item">
                            {{val.nickName}}
                        </div>
                        <div class="list-c item color">
                            {{val.title}}
                        </div>
                        <div class="list-d item">
                          {{getProgress(val.demandProgress,val.demandType)}}
                        </div>
                        <div class="list-e item" @click="chat(val)">
                            <span class="icon-item talk-icon">&#xe602;
                                <span v-show="val.unreadNum !== 0 ">{{val.unreadNum}}</span>
                            </span>
                        </div>
                        <div class="list-f item color" @click="getDetail(val)">
                            查看详情<span class="icon-item">&#xe686;</span>
                        </div>
                    </div>
                </div>
            </div>
            <div  style="float:right;padding-right:120px;">
              <el-pagination
                background
                layout="prev, pager, next"
                @current-change="pageChange"
                :total="totalCount*2">
              </el-pagination>
            </div>
        </div>
        <transition name="slidex-fade">
            <agentDetail @close="closeAgentDetail" v-if="agentShow" :chatData="chatData"></agentDetail>
        </transition>
        <transition name="slidex-fade">
            <deleDetail @close="closeDeleDetail" v-if="deleShow" :chatData="chatData"></deleDetail>
        </transition>
    </div>
</template>
<script>
    import stateList from './../stateList.vue'
    import agentDetail from './operAgentDetail.vue';
    import deleDetail from './operDeleDetail.vue';
    import ln from './../../../../public/js/tabulationBoxTrigger';

    import * as vx from 'vuex';
    export default {
        data() {
            return {
                typeShow: false,    //需求类型显示
                stateShow: false,   //状态显示
                typeWriting: '需求类型',
                stateWriting: '状态',
                agentShow:false,
                deleShow:false,
                sorted:true,
                type: [],
                type1:['航线委托'],
                type2:['运力委托'],
                type3:['需求类型','航线委托','运力委托','托管'],
                state: [],
                state1: ['状态','待处理','测评中','已接受','已拒绝','已关闭'],
                state2: ['状态','待处理','处理中','已拒绝','已完成','已关闭'],
                myList:null,
                demandId:null,
                totalCount:'',
                sentData:{
                    page:1,
                    pageNo:4,
                    demandType: '',
                    demandProgress:'',
                    releaseTime:"Desc"
                },
                chatData:{}
            }
        },
        mounted() {
            this.state = this.state2;
            this.getListData();
            if(this.role.role == 0){
                this.type = this.type2;
            }else if(this.role.role == 1){
                this.type = this.type1;
            }else if(this.role.role == 2){
                this.type = this.type3;
            }
        },
        computed: {
            ...vx.mapGetters([
                'role'
            ])
        },
        watch:{
            'sentData.demandType':function(){
                this.getListData();
            },
            'sentData.demandProgress':function(){
                this.getListData();
            },
             'sentData.releaseTime': function(){
                this.getListData();
            }
        },
        methods: {
            pageChange(page){
                this.sentData.page = page;
                this.getListData();
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
                if(item == '航线委托') {
                    this.state = this.state2;
                    this.sentData.demandType = "3";
                }else if(item == '运力委托') {
                    this.state = this.state2;
                    this.sentData.demandType = "4";
                }else if(item == '托管') {
                    this.state = this.state1;
                    this.sentData.demandType = "2";
                }else if(item == '需求类型') {
                    this.state = this.state2;
                    this.sentData.demandType = '';
                }
            },
            stateClickFn: function (item) {
                this.stateWriting = item;
                this.sentData.demandProgress = this.turnProgress(item);
            },
            closeAgentDetail:function(){
                this.agentShow = false;
                this.getListData();
            },
            closeDeleDetail:function(){
                 this.deleShow = false;
                 this.getListData();
            },
             timeSort:function(){
                this.sorted = !this.sorted;
                this.sentData.releaseTime = this.sorted? 'Desc': 'Asc';

            },
            getDetail:function(val){
                val.employeeId = this.role.id;
                 this.chatData = val;
                if(val.demandType == '2'){//托管详情
                    this.agentShow = true;
                }else{//委托详情
                      this.deleShow = true;
                }
            },
            getDemand:function(val){
               if(val == 2){
                    return "运营托管";
                }
                else if(val == 3){
                    return "航线委托";
                }
                else if(val == 4){
                    return "运力委托";
                }
            },
            getProgress:function(progress,demandType){
                    switch (progress) {
                        case "0":
                            return "处理中";
                            break;
                        case "1":
                            return "处理中";
                            break;
                        case "2":
                            return "处理中";
                            break;
                        case "4":
                            return "处理中";
                            break;
                        case "5":
                            return "处理中";
                            break;
                        case "3":
                            return "已关闭";
                            break;
                        case "6":
                            return "已完成";
                            break;
                        case "7":
                            return "待处理";
                            break;
                        case "8":
                            return "已接受";
                            break;
                        case "9":
                            return  demandType == '2'? "测评中":"处理中";
                            break;
                        case "10":
                            return "已拒绝";
                            break;
                    }
            },
            turnProgress:function(val){
                 switch (val) {
                        case "状态":
                            return '';
                            break;
                        case "已关闭":
                            return "3";
                            break;
                        case "已完成":
                            return "6";
                            break;
                        case "待处理":
                            return "7";
                            break;
                        case "已接受":
                            return "8";
                            break;
                        case "处理中":
                            return "9";
                            break;
                        case "测评中":
                            return "9";
                            break;
                        case "已拒绝":
                            return "10";
                            break;
                    }
            },
            getListData:function () {
                let that = this;
                this.$ajax({
                    method: 'GET',
                    url: '/selectCommissionedAndCustodyDemandList',
                    params: this.sentData
                }).then(res => {
                    if(res && res.data.opResult == 0){
                        that.myList = res.data.list.list;
                        this.totalCount = res.data.list.totalCount;
                    }else{
                        that.myList = null;
                    }
                }).catch( error => {
                        console.log(error);
                    }
                );
            }
        },
        components: {
            stateList,
            agentDetail,
            deleDetail
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
        .list-p{
            width: 120px;
            margin-right: 40px;
        }
        .list-c {
            margin-right: 40px;
            width: 160px;
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
</style>
