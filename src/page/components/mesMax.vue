<template>
    <div class="mes-max popup">
        <div class="mes-head">
            <div class="mes-head-s">
                <div class="mes-head-t">需求列表</div>
                <div class="mes-head-c" @click.stop>
                    <div class="mes-cont-box" @mouseout="closeSearch" @click="screenHsShow = false">
                        <div class="mes-cont mesContSet" @mouseout.stop>
                            <input :placeholder="holder" placeholder="搜索关键词" @input="openList('a')" type="text"
                                   @focus="history" :disabled="!search" v-model="searchText">
                            <span title="搜索" @click="query" v-if="!bgqy">&#xe6c3;</span>
                            <span class="search-ing" title="搜索中..." v-if="bgqy">&#xe620;</span>
                        </div>
                        <hisy class="ais" v-on:reshsy="reshsy" v-on:clear="clear" v-if="openHisy"></hisy>
                        <airportS class="aisx" v-on:resData="resData" :searchText="searchText"
                                  v-show="isSearch"></airportS>
                    </div>
                    <div class="screen">
                        <span @click="openScreen">&#xe6a7;</span>
                        <transition name="bounce">
                            <screen class="screen-hs" v-if="screenHsShow" v-on:screenHs="screenHs"></screen>
                        </transition>
                    </div>
                    <div class="amplification">
                        <span @click="openMin">&#xe61a;</span>
                    </div>
                </div>
            </div>
            <div class="mes-head-list">
                <div class="number-mes"><span>1000</span>条需求对象</div>
                <div class="match">
                    <singleElection :single.sync="match"></singleElection>
                    <!--<span @click="matching" :class="{'elect':elect,'initialization':!elect}"></span>-->
                    只看与我匹配的
                </div>
                <div class="number-tag">
                    <div class="btn-w">标记为已读</div>
                    <div class="btn-w">收藏</div>
                </div>
            </div>
        </div>
        <div class="mes-body">
            <div class="mes-body-h">
                <div class="mes-body-i0">
                    <singleElection :single.sync="single" class="mes-body-ix"></singleElection>
                    类型
                </div>
                <div class="mes-body-i1">航点/匹配度<order :order.sync="order" class="order-x"></order></div>
                <div class="mes-body-i2">发布时间<order :order.sync="order" class="order-x"></order></div>
                <div class="mes-body-i3">需求进度</div>
                <div class="mes-body-i3">时刻</div>
                <div class="mes-body-i3">班期</div>
                <div class="mes-body-i3">机型</div>
                <div class="mes-body-i4">补助</div>
                <div class="mes-body-i4">其他说明</div>
            </div>
            <demandList class="mes-body-b scroll"></demandList>
        </div>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import airportS from './airportSearch.vue'
    import hisy from './hisy.vue'
    import screen from './screen-hs.vue'
    import singleElection from './singleElection.vue'
    import order from './order.vue'
    import demandList from './demandList.vue'

    export default {
        data() {
            return {
                order:{
                    set: true
                },
                match: {  // 只看与我匹配的
                    set: false
                },
                screenHsShow: false,
                search: true,
                isSearch: false,
                holder: '',
                searchText: '',
                changeRed: 0,
                qyCode: "",
                bgqy: false,
                openHisy: false,
                elect: false,
                single: {
                    set: false
                }
            }
        },
        methods: {
            clear: function () {
                this.openHisy = false;
            },
            openScreen: function () {
                this.screenHsShow = !this.screenHsShow;
                this.openHisy = false;
                this.isSearch = false;
            },
            openMin: function () {
                this.$emit('openMin', 'min')
            },
            screenHs: function () {
                this.screenHsShow = false;
            },
            closeSearch: function () {
                if (!this.isSearch) {
                    this.holder = '';
                }
                ;
            },
            history: function () {
                let hisyData = localStorage.getItem('hisyData');
                if (hisyData != null) {
                    hisyData = hisyData.split(',');
                }
                if (this.searchText == '' && hisyData != null) {
                    this.openHisy = true;
                } else {
                    this.isSearch = true;
                }
            },
            resData: function (data) {
                this.isSearch = false;
                this.searchText = data.name;
                this.qyCode = data.code;
            },
            openList: function (type) {
                if (type == 'a') {
                    if (this.searchText != '') {
                        this.openHisy = false;
                        this.isSearch = true;
                    } else {
                        this.isSearch = false;
                    }
                } else {
                    this.isSearch = false;
                    this.openHisy = false;
                }
            },
            query: function () {
                if (this.qyCode != '') {
                    this.bgqy = true;
                } else {
                    alert('空-错误');
                }
            },
            reshsy: function (vl) {
                this.openList('m');
                this.searchText = vl;
            },
            matching: function () {
                this.elect = !this.elect;
                if (this.elect) {

                }
            },
        },
        computed: {
            ...vx.mapGetters([
                'close'
            ])
        },
        watch: {
            close: function () {
                this.isSearch = false;
                this.openHisy = false;
                this.screenHsShow = false;
            }
        },
        components: {
            airportS,
            hisy,
            screen,
            singleElection,
            order,
            demandList
        }
    }
</script>
<style scoped lang="scss">

    @keyframes bounce-in {
        0% {
            width: 0;
            height: 0;
        }
        100% {
            width: 280px;
            height: 420px;
        }
    }

    @keyframes myfirst {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .bounce-enter-active {
        animation: bounce-in .5s;
    }

    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }
    .mes-body{
        padding-top: 15px;
        color: #605E7C;
        flex: 1;
        display: flex;
        flex-flow: column nowrap;
    }
    .order-x{
        margin-left: 5px;
    }
    .mes-body-h {
        display: flex;
        flex-flow: row nowrap;
        padding: 0 20px 20px 20px;
        > div {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            margin-right: 20px;
            color: rgba( 96,94,124,.65);
        }
    }

    .mes-body-i0 {
        width: 60px;
    }

    .mes-body-i1 {
        width: 120px;
    }

    .mes-body-i2 {
        width: 80px;
    }

    .mes-body-i3 {
        width: 60px;
    }

    .mes-body-i4 {
        width: 161px;
    }

    .mes-body-ix {
        margin: 0 6px 0 9px;
    }

    .mes-head-list {
        padding: 0 20px;
        display: flex;
        flex-flow: row nowrap;
    }

    .elect:before {
        content: '\e724';
    }

    .initialization:before {
        content: '\e723';
    }

    .number-mes {
        display:flex;
        flex-flow:row nowrap;
        align-items:center;
        color: rgba(96, 94, 124, 0.65);
        > span {
            color: #3c78ff;
            font-size: 1.3rem;
        }
    }

    .mes-max {
        width: 1000px;
        height: 100%;
        background-color: rgba(248, 248, 248, .93) !important;
        border-radius: 8px;
        display: flex;
        flex-flow: column nowrap;
    }

    .mes-head {
        height: 80px;
    }

    .mesContSet {
        background-color: white;
        width: 153px;
    }

    .match {
        align-self: center;
        color:rgba(96, 94, 124, 0.65);
        display: flex;
        flex-flow: row nowrap;
        margin-left: 20px;
        align-items:center;
        > span {
            font-family: iconfont;
            font-size: 1.7rem;
            cursor: pointer;
            width: 17px;
            height: 19px;
            display: inline-block;
            margin-right: 5px;
        }
    }

    .mes-head-s {
        display: flex;
        flex-flow: row nowrap;
        padding: 10px 20px;
        justify-content: space-between;
    }

    .mes-head-t {
        color: #605E7C;
        font-size: 2rem;
        font-weight: bold;
    }

    .mes-head-c {
        display: flex;
        flex-flow: row nowrap;
    }

    .ais {
        position: absolute;
        top: 25px;
        left: 0px;
        width: 260px;
        max-height: 210px;
    }

    .aisx {
        position: absolute;
        top: 25px;
        left: 0px;
        width: 260px;
        max-height: 210px;
        overflow-y: scroll;
        z-index: 10;
    }

    .mes-cont-box {
        width: 153px;
        margin-left: 10px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        position: relative;
        margin-right: 6px;
    }

    .mes-cont {
        position: relative;
        /*width: 30px;*/
        display: flex;
        border-radius: 18px;
        height: 28px;
        transition: width .2s linear;
        > input {
            padding-left: 10px;
            border: none;
            outline: none;
            width: 100%;
            color: #605E7C;
            font-size: 1rem;
            background-color: transparent;
        }
        > span {
            font-family: iconfont;
            font-size: 2.3rem;
            color: #605E7C;
            border: none;
            background-color: transparent;
            padding: 0;
            cursor: pointer;
            display: inline-block;
            width: 33px;
            text-align: left;
            line-height: 30px;
            &:hover {
                color: #3c78ff;
            }
        }
    }

    .number-tag {
        display: flex;
        margin-left: 40px;
        align-items: center;
        > div {
            border-radius: 15px;
            margin-right: 13px;
            padding: 0 10px;
            color: rgba(96, 94, 124, 0.65);
            height: 20px;
            line-height: 20px;
        }
    }

    .search-ing {
        color: #3c78ff !important;
        display: inline-block;
        animation: myfirst 1s linear infinite;
    }

    .screen, .amplification {
        height: 28px;
        display: flex;
        width: 35px;
        justify-content: center;
        align-items: center;
        position: relative;
        > span {
            font-family: iconfont;
            color: #605E7C;
            font-size: 2rem;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            line-height: 25px;
            cursor: pointer;
        }
    }
    .screen-hs {
        position: absolute;
        top: 25px;
        right: -55px;
        z-index: 11;
    }
    .mes-body-b{
        flex: 1;
        overflow-y: scroll;
    }
</style>