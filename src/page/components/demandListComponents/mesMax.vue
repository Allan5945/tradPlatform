<template>
    <div class="mes-max popup">
        <div class="mes-head">
            <div class="mes-head-s">
                <div class="mes-head-t"></div>
                <div class="mes-head-c" @click.stop>
                    <div class="mes-cont-box" @mouseout="closeSearch" @click="screenHsShow = false">
                        <div class="mes-cont" :class="{mesContSet:true}" @mouseout.stop>
                            <input id="close-input" :class="{'search-set':searchSet}" placeholder="搜索关键词" @blur="lose()"
                                   @input="openList('a')" type="text"
                                   @focus="history" :disabled="searchSet"
                                   v-model="searchText">
                            <span class="search" title="搜索" @mouseover.stop="openSearch" @click="query" v-if="bgqy">&#xe6c3;</span>
                            <loading class="search-ing" title="搜索中..." v-if="bgqying"></loading>
                            <span v-if="bgqyed" class="search-ed btn-w" @click="removeSearchSet">&#xe62c;</span>
                        </div>
                        <hisy class="ais" v-on:reshsy="reshsy" v-on:clear="clear" v-if="openHisy"></hisy>
                        <airportS class="aisx" v-on:resData="resData" :searchText="searchText"
                                  v-show="isSearch"></airportS>
                    </div>
                </div>
            </div>
            <div class="mes-head-list">
                <div class="number-mes"><span>{{dataL}}</span>条需求对象</div>
                <div class="match">
                    <singleElection :single.sync="match"></singleElection>
                    只看与我匹配的
                </div>
                <div class="number-tag">
                    <div class="btn-w" @click="batchRed">标记为已读</div>
                </div>
            </div>
        </div>
        <div class="mes-body">
            <div class="mes-body-h">
                <div class="mes-body-i0">
                    <span @click="seted()" class="acquiescence mes-body-ix" :class="{'acquiescenceSet':single.set}">&#xe723;</span>
                    类型
                </div>
                <div class="mes-body-i1">航点/匹配度
                </div>
                <div class="mes-body-i2">发布时间
                    <order :order="orderTime" v-on:order="orderTimeHandling" class="order-x"></order>
                </div>
                <div class="mes-body-i3">需求进度</div>
                <div class="mes-body-i3">班期</div>
                <div class="mes-body-i3">机型</div>
                <div class="mes-body-i3">补助</div>
                <div class="mes-body-i4">其他说明</div>
                <div class="mes-body-i3">收藏</div>
            </div>
            <tabulationBox class="mes-body-b scroll" v-on:renderDataLength="renderDataLength"
                           v-on:resetSingleSet="resetSingleSet" :singled="single"></tabulationBox>
        </div>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import airportS from '../../reuseComponents/airportSearch.vue'
    import hisy from './hisy.vue'
    import screen from './screen-hs.vue'
    import singleElection from './singleElection.vue'
    import order from '../../reuseComponents/order.vue'
    import loading from '$src/page/reuseComponents/locading.vue'
    import tabulationBox from './maxtabulationBox.vue'
    import In from '$src/public/js/tabulationBoxTrigger.js'

    export default {
        data() {
            return {
                dataL: 0,
                orderTime: {
                    set: true
                },
                match: {set: false},  // 只看与我匹配的
                holder: '',
                single: {set: false},  // 类型选择
                screenHsShow: false,
                search: false,
                searchSet: false,
                isSearch: false,
//                holder: '',
                searchText: '',
                navLists: [
                    {
                        "text": "发布时间"
                    },
                    {
                        "text": "匹配度"
                    }
                ],
                changeRed: 0,
                qyCode: "",
                bgqy: true,
                bgqying: false,
                bgqyed: false,
                openHisy: false,
                elect: {set: false},
            }
        },
        methods: {
            orderTimeHandling:function () {
                this.orderTime.set = ! this.orderTime.set;
                this.$store.dispatch('changeOrder');
            },
            batchRed: function () {
                let ob = (this.demandList.type ? this.demandList.hybridData.list : this.demandList.monoData.list),
                    ar = [];
                ob.forEach((v) => {
                    if (v.set) ar.push(v.id);
                });
                if (ar.length != 0) {
                    this.$ajax({
                        method: 'post',
                        url: '/employeeDemandAdd',
                        params: {
                            employeeDemandIds: ar.join(',')
                        },
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded'
                        }
                    })
                        .then((response) => {
                            if (response.data.opResult == '0') {
                                this.$store.dispatch('changeRenew', ar);
                            }
                        })
                        .catch((error) => {
                                console.log(error);
                            }
                        );
                }
            },
            tagRead: function () {
                let v = [];
                if (this.demandList.type) {
                    this.demandList.hybridData.list.forEach((vl) => {
                        if (vl.set) {
                            v.push(vl.id)
                        }
                    });
                } else {
                    this.demandList.monoData.list.forEach((vl) => {
                        if (vl.set) {
                            v.push(vl.id);
                        }
                    });
                }
                if (v.length == 0) return false;
                this.$ajax({
                    method: 'post',
                    url: "/addCollect",
                    params: {
                        demandIds: v.join(','),
                    },
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then((response) => {
                        if (response.data.opResult == '0') {
                            debugger
                            this.$store.dispatch('tagread', {t: true, v:response.data.list});
                        }
                    })
                    .catch((error) => {

                        }
                    );
            },
            renderDataLength: function (v) {
                this.dataL = v;
            },
            resetSingleSet: function () {
                this.single.set = false;
            },
            lose: function () {
                setTimeout(() => {
                    if (this.$airMes(this.airList, this.searchText) == '' && this.$cityMes(this.cityList, this.searchText) == '') {
                        this.searchText = '';
                    }
                }, 200);
            },
            seted: function () {
                this.single.set = !this.single.set;
                this.$store.dispatch('setelect', {t: this.single.set, a: true}).then(() => {
                });
            },
            removeSearchSet: function () {
                this.searchSet = false;
                this.bgqy = true;
                this.bgqying = false;
                this.bgqyed = false;
                this.searchText = '';
                this.qyCode = "";
                this.$emit('serah');
//                this.$store.dispatch('hybridData', {v: '', t: 1}).then(() => {
//                });
            },
            openSearch: function () {
                this.search = true;
            },
            clear: function () {
                this.openHisy = false;
            },
            openScreen: function () {
                this.screenHsShow = !this.screenHsShow;
                this.openHisy = false;
                this.isSearch = false;
            },
            reshsy: function (vl) {
                this.openList('m');
                this.searchText = vl.name;
                this.qyCode = vl;
            },
            openMin: function () {
                this.$emit('openMin', 'min')
            },
            screenHs: function (t) {
                if (!t) {
                    this.$store.dispatch('setCity', {v: '$&', t: false}).then(() => {
                    });
                    this.$store.dispatch('openScreen', false).then(() => {
                    });
                }
                ;
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
                    this.bgqy = false;
                    this.bgqying = true;
                    this.bgqyed = false;
                    this.searchSet = true;

                    let url = '/getOthersDemandListIndex';
                    let page = this.demandList.hybridPage;
                    if(!this.demandType)url = '/getDemandsByCurrentCheckedAirportForEmployee';
                    if(!this.demandType)page = this.demandList.monoPage;
                    this.$ajax({
                        url,
                        method: 'post',
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded'
                        },
                        params: {
                            itia: this.qyCode.code,
                            page
                        }
                    }).then((response) => {
                        let ar = [];
                        this.bgqy = false;
                        this.bgqying = false;
                        this.bgqyed = true;
                        if (response.data) {
                            if(response.data.opResult == '0'){
                                ar = response.data.list;
                            };
                        };
                        this.$store.dispatch('setMonoNata', {n:this.qyCode,t:ar}).then(() => {
                        });
                    })
                } else {
//                    alert('空-错误');
                }
            },
            matching: function () {
                this.elect = !this.elect;
                if (this.elect) {

                }
            },
        },
        computed: {
            ...vx.mapGetters([
                'close',
                'demandList',
                'airList',
                'cityList',
                'conditionsOpen',
                'demandType'
            ]),
            renderData: function () {
                return this.demandList.hybridData.list.length;
            }
        },
        mounted: function () {
            let _this = this;
            In.$on('setCode',v => {
                let mes = this.$airMes(this.airList, v);
                _this.searchText = mes.cityName;
                _this.qyCode = v;
                _this.qyCode = {
                    code: v,
                    type: 0,
                    name:mes.cityName
                };
                _this.query();
            });
            if(this.demandList.conditions.order){
                this.orderTime.set = false;
            }
            if (this.demandList.monoName != '') {
                this.searchText = this.demandList.monoName.name;
                this.qyCode = this.demandList.monoName;
                this.searchSet = true;
                this.search = true;
                this.bgqy = false;
                this.bgqying = false;
                this.bgqyed = true;
            }
        },
        watch: {
            close: function () {
                this.isSearch = false;
                this.openHisy = false;
                this.screenHsShow = false;
            },
            demandType:function () {
                this.query();
            }
        },
        components: {
            airportS,
            hisy,
            screen,
            singleElection,
            order,
            tabulationBox,
            loading
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
        animation: bounce-in .3s;
    }

    .bounce-leave-active {
        animation: bounce-in .3s reverse;
    }

    @mixin user-select {
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
    }

    .acquiescence {
        @include user-select;
        font-family: iconfont;
        font-size: 1.7rem;
        cursor: pointer;
        width: 17px;
        height: 19px;
        display: inline-block;
        position: relative;
    }

    .acquiescenceSet:before {
        width: 17px;
        height: 19px;
        content: '\e6cc';
        font-size: 1.4rem;
        position: absolute;
        display: inline-block;
        top: 3px;
        left: 0;
        color: #3c78ff;
    }

    .search-ing {
        width: 23px;
        height: 30px;
        color: #3c78ff !important;
        display: inline-block;
        transform: scale(.25);
    }

    .mes-body {
        padding-top: 15px;
        color: #605E7C;
        flex: 1;
        display: flex;
        flex-flow: column nowrap;
    }

    .order-x {
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
            align-items: center;
            margin-right: 20px;
            color: rgba(96, 94, 124, .65);
        }
    }

    .mes-body-i0 {
        width: 60px;
    }

    .mes-body-i1 {
        width: 174px;
    }

    .mes-body-i2 {
        width: 80px;
    }

    .mes-body-i3 {
        width: 60px;
    }

    .mes-body-i4 {
        width: 170px;
        margin-right: 0 !important;
    }

    .mes-body-ix {
        margin: 0 6px 0 9px;
    }

    .mes-head-list {
        padding: 0 20px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    }

    .elect:before {
        content: '\e724';
    }

    .initialization:before {
        content: '\e723';
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

    .mes-body-b {
        /*flex: 1;*/
        overflow-y: auto;
    }

    /*-------------------*/

    .bounce-enter-active {
        animation: bounce-in .3s;
    }

    .search-set {
        color: #3c78ff !important;
    }

    .screen, .amplification {
        height: 25px;
        display: flex;
        width: 25px;
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
            &:hover{ color: #3c78ff; }
        }
    }

    .screen-hs {
        position: absolute;
        top: 33px;
        left: 5px;
        z-index: 11;
    }

    .amplification {
        justify-content: flex-end;
    }

    .ais {
        position: absolute;
        top: 25px;
        left: 0px;
        width: 260px;
        /*max-height: 210px;*/
        z-index: 1;
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

    .search {
        font-family: iconfont;
        font-size: 2.3rem;
        color: #605E7C;
        border: none;
        background-color: transparent;
        padding: 0;
        cursor: pointer;
        display: inline-block;
        text-align: left;
        line-height: 30px;
        position: absolute;
        right: 5px;
        width: 23px;
        &:hover {
            color: #3c78ff;
        }
    }

    .search-ing {
        width: 23px;
        height: 30px;
        color: #3c78ff !important;
        display: inline-block;
        transform: scale(.25);
    }

    .search-ed {
        font-family: iconfont;
        font-size: 1.2rem;
        color: #3c78ff;
        border: none;
        padding: 0;
        cursor: pointer;
        display: inline-block;
        text-align: center;
        line-height: 15px;
        position: absolute;
        right: 10px;
        width: 15px;
        top: 6px;
        height: 15px;
        background-color: white;
        border-radius: 50%;
    }

    .message-box {
        width: 340px;
        height: 100%;
    }

    .tabulation {
        /*padding: 0 20px;*/
    }

    .message-head {
        height: 40px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        margin: 0 0 2px 0;
        padding: 0 20px;

    }

    .mes-tip {
        color: #959595;
        white-space: nowrap;
    }
    .number-mes {
        color: #3c78ff;
    }
    .mes-cont-box {
        width: 200px;
        margin-left: 10px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        position: relative;
    }
    .mes-cont {
        position: relative;
        width: 30px;
        display: flex;
        border-radius: 18px;
        height: 28px;
        transition: width .2s linear;
        flex-flow: row nowrap;
        align-items: center;
        > input {
            padding-left: 10px;
            border: none;
            outline: none;
            width: 100%;
            color: #605E7C;
            font-size: 1rem;
            background-color: transparent;
            padding-right: 26px;
        }
    }

    .mes-cont-set {
        background-color: #f4f4f4;
    }

    .mesContSet {
        background-color: #f4f4f4;
        width: 200px;
    }

    .tabulation-head {
        padding: 0 20px;
        > div {
            border-bottom: 1px solid #c1d3e461;
            display: flex;
            height: 58px;
            align-items: center;
            justify-content: space-between;
        }
    }

    .navList {
        padding: 0 15px 0 0;
        font-size: 1.2rem;
        height: 100%;
        line-height: 58px;
        cursor: pointer;
        color: #605E7C;

    }

    .navList:hover {
        border-bottom: 2px solid #3774ff;
        color: #605E7C;
    }

    .setd {
        color: #3c78ff;
        border-bottom: 2px solid #3c78ff;
    }

    .navSet {
        display: flex;
    }

    .match {
        align-self: center;
        color: #605E7C;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        > span {
            margin-left: 20px;
            font-family: iconfont;
            font-size: 1.7rem;
            cursor: pointer;
            width: 17px;
            height: 19px;
            display: inline-block;
            margin-right: 5px;
        }
    }

    .matching {

    }
</style>