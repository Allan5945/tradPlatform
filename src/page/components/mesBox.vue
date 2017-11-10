<template>
    <div class="message-box" id="message-box">
        <div class="message-head popup">
            <div class="mes-tip">
                <span class="number-mes">1000</span>条需求对象
            </div>
            <div class="mes-cont-box" @mouseout="closeSearch" @click.stop>
                <div class="mes-cont" :class="{mesContSet:search}" @mouseout.stop>
                    <input :placeholder="holder" @input="openList('a')" type="text" @focus="history" :disabled="!search"
                           v-model="searchText">
                    <span title="搜索" @mouseover.stop="openSearch" @click="query" v-if="!bgqy">&#xe6c3;</span>
                    <span class="search-ing" title="搜索中..." v-if="bgqy">&#xe620;</span>
                </div>
                <hisy class="ais" v-on:reshsy="reshsy" v-on:clear="clear" v-if="openHisy"></hisy>
                <airportS class="aisx" v-on:resData="resData" :searchText="searchText" v-show="isSearch"></airportS>
            </div>
            <div class="screen">
                <span>&#xe6a7;</span>
            </div>
            <div class="amplification">
                <span>&#xe618;</span>
            </div>
        </div>
        <div class="popup tabulation" id="tabulation">
            <div class="tabulation-head">
               <div>
                   <div class="navSet">
                       <div class="navList" @click="setd(key,index)" :class="{setd:changeRed == index}"
                            v-for="(key,index) in navLists">{{key.text}}
                       </div>
                   </div>
                   <div class="match">
                       <span @click="matching" :class="{'elect':elect,'initialization':!elect}"></span>
                       只看与我匹配的
                   </div>
               </div>
            </div>
            <tabulationBox></tabulationBox>
        </div>
        <div></div>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import airportS from './airportSearch.vue'
    import hisy from './hisy.vue'
    import tabulationBox from './tabulationBox.vue'

    export default {
        data() {
            return {
                search: false,
                isSearch: false,
                holder: '',
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
                bgqy: false,
                openHisy: false,
                elect: false
            }
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
                this.closeSearch();
            }
        },
        methods: {
            matching: function () {
                this.elect = !this.elect;
                if(this.elect){

                }
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
                this.searchText = vl;
            },
            clear: function () {
                this.openHisy = false;
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
            query: function () {
                if (this.qyCode != '') {
                    this.bgqy = true;
                } else {
                    alert('空-错误');
                }
            },
            resData: function (data) {
                this.isSearch = false;
                this.searchText = data.airName;
                this.qyCode = data.code;
            },
            openSearch: function () {
                this.holder = '搜索关键词';
                this.search = true;
            },
            closeSearch: function () {
                if (!this.isSearch) {
                    this.holder = '';
                }
                ;
            },
            setd: function (key, index) {
                this.changeRed = index;
            }
        },
        components: {
            airportS,
            hisy,
            tabulationBox
        }
    }
</script>
<style scoped lang="scss">
    @keyframes myfirst {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
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

    .amplification {
        justify-content: flex-end;
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
    }

    .search-ing {
        color: #3c78ff !important;
        display: inline-block;
        animation: myfirst 1s linear infinite;
    }

    .message-box {
        position: absolute;
        top: 100px;
        left: 40px;
        width: 340px;
        height: 80%;
    }

    .tabulation {
        /*padding: 0 20px;*/
    }

    .message-head {
        height: 40px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        /*justify-content: space-between;*/
        margin: 0 0 2px 0;
        padding: 0 20px;

    }

    .mes-tip {
        color: #959595;
    }

    .number-mes {
        color: #3c78ff;
    }

    .mes-cont-box {
        width: 153px;
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
        > input {
            padding-left: 10px;
            border: none;
            outline: none;
            width: 100%;
            color: #605E7C;
            font-family: DemiLight;
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

    .mes-cont-set {
        background-color: #f4f4f4;
    }

    .mesContSet {
        background-color: #f4f4f4;
        width: 153px;
    }

    .tabulation-head {
        padding: 0 20px;
       >div{
           border-bottom: 2px solid #b4dbff;
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