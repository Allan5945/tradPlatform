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
                    <div class="list-p item">发布人</div>
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
                          {{getProgress(val.demandProgress)}}
                        </div>
                        <div class="list-e item">
                            <span class="icon-item talk-icon">&#xe602;
                                <span>1</span>
                            </span>
                        </div>
                        <div class="list-f item color" @click="getDetail(val)">
                            查看详情<span class="icon-item">&#xe686;</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <agentDetail @close="closeAgentDetail" v-if="agentShow" :demandId="demandId"></agentDetail>
        <deleDetail @close="closeDeleDetail" v-if="deleShow" :demandId="demandId"></deleDetail>
    </div>
</template>
<script>
    import stateList from './stateList.vue'
    import agentDetail from './operAgentDetail.vue';
    import deleDetail from './operDeleDetail.vue';
    export default {
        data() {
            return {
                typeShow: false,    //需求类型显示
                stateShow: false,   //状态显示
                typeWriting: '需求类型',
                stateWriting: '状态',
                agentShow:false,
                deleShow:false,
                type:  ['航线委托','运力委托','托管'],
                state: [],
                state1: ['待处理','测评中','已接受','已拒绝','已关闭'],
                state2: ['待处理','处理中','需求征集','订单确认','订单完成','已拒绝','已完成','已关闭'],
                myList:null,
                sentData:{
                    page:1,
                    pageNo:4,
                    demandType: null,
                    demandProgress:null
                }
            }
        },
        mounted() {
            this.state = this.state1;
            this.getListData();
        },
        watch:{
            'sentData.demandType':function(){
                this.getListData();
            },
            'sentData.demandProgress':function(){
                this.getListData();
            }
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
                this.stateWriting = '状态';
                if(item == '航线委托') {
                    this.state = this.state2;
                    this.sentData.demandType = "3";
                }else if(item == '运力委托') {
                    this.state = this.state2;
                    this.sentData.demandType = "4";
                }else if(item == '托管') {
                    this.state = this.state1;
                    this.sentData.demandType = "2";
                }
            },
            stateClickFn: function (item) {
                this.stateWriting = item;
                this.sentData.demandProgress = this.turnProgress(item);
            },
            closeAgentDetail:function(){
                this.agentShow = false;
            },
            closeDeleDetail:function(){
                 this.deleShow = false;
            },
            getDetail:function(val){
                 this.demandId = val.id;
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
            getProgress:function(val){
                switch (val) {
                        case "1":
                            return "需求征集";
                            break;
                        case "2":
                            return "订单确认";
                            break;
                        case "3":
                            return "已关闭";
                            break;
                        case "4":
                            return "订单完成";
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
                            return "处理中";
                            break;
                        case "10":
                            return "已拒绝";
                            break;
                    }
            },
            turnProgress:function(val){
                 switch (val) {
                        case "需求征集":
                            return "1";
                            break;
                        case "订单确认":
                            return "2";
                            break;
                        case "已关闭":
                            return "3";
                            break;
                        case "订单完成":
                            return "4";
                            break;
                        case "已完成":
                            return "5";
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
                    }else{
                        that.myList = null;
                        alert('暂无返回，请稍后重试。')
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
