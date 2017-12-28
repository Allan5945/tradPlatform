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
                            <span>1</span>
                        </span>
                        </div>
                        <div class="list-e item" v-else></div>
                        <div class="list-f item color" @click="openDetail(val)">查看详情<span class="icon-item">&#xe686;</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition name="slidex-fade">
            <collectDetail v-if="detailShow" @closeDetail="closeDetail" :demandId="demandId"></collectDetail>
        </transition>
    </div>
</template>
<script>
    import stateList from './../stateList.vue'
    import collectDetail from './collectDetail.vue';
    import ln from './../../../../public/js/tabulationBoxTrigger';

    export default {
        data() {
            return {
                typeShow: false,    //需求类型显示
                stateShow: false,   //状态显示
                detailShow:false,
                sorted:true,
                typeWriting: '需求类型',
                stateWriting: '状态',
                //不同需求类型展现的状态不同
                type: ['运力投放','航线需求'],
                state: ['需求审核','需求发布','意向征集','订单确认','订单完成','关闭'],
                collectList:null,
                demandId:null,
                sentData:{
                    page: 1,
                    pageNo:4,
                    demandType: null,
                    demandProgress:null,
                    releaseTime:"Desc"
                }
            }
        },
        methods: {
            chat:function (v) {
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
                }
            },
            stateClickFn: function (item) {
                this.stateWriting = item;
                 this.sentData.demandProgress = this.turnProgress(item);
            },
             openDetail:function(val){
                this.demandId = val.id;
                this.detailShow = true;
            },
            closeDetail:function(){
                 this.detailShow = false;
                 //this.collectList.$delete(key);
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
        },
        mounted() {
            this.getListData();
         },
        components: {
            stateList,
            collectDetail
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
</style>
