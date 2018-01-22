<template>
    <div class="message-box" id="message-box">
        <div class="message-head">
            <div class="mes-tip">
                <span class="number-mes">{{dataL}}</span>条需求对象
            </div>
            <div class="mes-cont-box" @click.stop="screenHsShow = false">
                <div class="mes-cont" :class="{mesContSet:true}" @mouseout.stop>
                    <input id="close-input" :class="{'search-set':searchSet}" placeholder="搜索关键词" @blur="lose()"
                           @input="openList('a')" type="text"
                           @focus="history" :disabled="searchSet"
                           v-model="searchText">
                    <span class="search" title="搜索" @mouseover.stop="openSearch" @click="query"
                          v-if="bgqy">&#xe6c3;</span>
                    <loading class="search-ing" title="搜索中..." v-if="bgqying"></loading>
                    <span v-if="bgqyed" class="search-ed btn-w" @click="removeSearchSet">&#xe62c;</span>
                </div>
                <hisy class="ais" v-on:reshsy="reshsy" v-on:clear="clear" v-if="openHisy"></hisy>
                <airportS class="aisx" v-on:resData="resData" :searchText="searchText" v-show="isSearch"></airportS>
            </div>
        </div>
        <div class="tabulation" id="tabulation">
            <div class="tabulation-head">
                <div>
                    <div class="navSet">
                        <div class="navList font-bold" @click="setd(key,index)" :class="{setd:changeRed == index}"
                             v-for="(key,index) in navLists">{{key.text}}
                        </div>
                    </div>
                    <div class="match">
                        <singleElection :single.sync="elect" class="mes-body-ix"></singleElection>
                        只看与我匹配的
                    </div>
                </div>
            </div>
            <tabulationBox v-on:renderDataLength="renderDataLength"></tabulationBox>
        </div>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import airportS from '../../reuseComponents/airportSearch.vue'
    import hisy from './hisy.vue'
    import tabulationBox from './mintabulationBox.vue'
    import screen from './screen-hs.vue'
    import singleElection from './singleElection.vue'
    import loading from '$src/page/reuseComponents/locading.vue'
    import In from '$src/public/js/tabulationBoxTrigger.js'

    export default {
        data() {
            return {
                dataL: 0,
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
            renderDataLength: function (v) {
                this.dataL = v;
            },
            removeSearchSet: function () {
                this.searchSet = false;
                this.bgqy = true;
                this.bgqying = false;
                this.bgqyed = false;
                this.searchText = '';
                this.qyCode = "";
                this.$store.dispatch('hybridData', {v: ''}).then(() => {
                });
            },
            openMax: function () {
                this.$emit('openMax', 'max');
            },
            lose: function () {
                setTimeout(() => {
                    if (this.$airMes(this.airList, this.searchText) == '' && this.$cityMes(this.cityList, this.searchText) == '') {
                        this.searchText = '';
                    }
                }, 200);
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
            openScreen: function () {
                this.screenHsShow = !this.screenHsShow;
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
            reshsy: function (vl) {
                this.openList('m');
                this.searchText = vl.name;
                this.qyCode = vl;
            },
            clear: function () {
                this.openHisy = false;
            },
            history: function () {
                let hisyData = localStorage.getItem('hisyData');
                if (hisyData != null && hisyData != '') {
                    hisyData = hisyData.split(',');
                } else {
                    hisyData = null;
                }
                if (this.searchText == '' && hisyData != null) {
                    this.openHisy = true;
                } else {
                    this.isSearch = true;
                }
            },
            query: function () {
                if (this.qyCode != '') {
                    this.bgqy = false;
                    this.bgqying = true;
                    this.bgqyed = false;
                    this.searchSet = true;
                    let url = '/getOthersDemandListIndex';
                    if(!this.demandType)url = '/getDemandsByCurrentCheckedAirportForEmployee';
                    this.$ajax({
                        url,
                        method: 'post',
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded'
                        },
                        params: {
                            itia: this.qyCode.code,
                            page: 1,
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
                        this.$store.dispatch('monoData', {v: ar, t: 1,n:this.qyCode}).then(() => {
                        });
                    })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
//                    alert('空-错误');
                }
            },
            resData: function (data) {
                this.isSearch = false;
                this.searchText = data.name;
                this.qyCode = data;
            },
            openSearch: function () {
                this.search = true;
            },
            setd: function (key, index) {
                this.changeRed = index;
            }
        },
        components: {
            loading,
            airportS,
            hisy,
            tabulationBox,
            screen,
            singleElection
        },
        computed: {
            ...vx.mapGetters([
                'close',
                'demandList',
                'airList',
                'cityList',
                'demandType'
            ])
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
            if (this.demandList.monoName != '') {
                this.searchText = this.demandList.monoName.name;
                this.qyCode = this.demandList.monoName;
                this.searchSet = true;
                this.search = true;
                this.bgqy = false;
                this.bgqying = false;
                this.bgqyed = true;
            }
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
            transform: rotate(-360deg);
        }
    }

    .bounce-enter-active {
        animation: bounce-in .3s;
    }

    .search-set {
        color: #3c78ff !important;
    }

    .bounce-leave-active {
        animation: bounce-in .3s reverse;
    }

    .elect:before {
        content: '\e724';
    }

    .initialization:before {
        content: '\e723';
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
            &:hover{
                color: #3c78ff;
            }
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
        max-height: 210px;
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
        flex: 1;
        display: flex;
        flex-flow:column nowrap;
    }

    .tabulation {
        /*padding: 0 20px;*/
        flex: 1;
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