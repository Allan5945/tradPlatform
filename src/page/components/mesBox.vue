<template>
    <div class="message-box">
        <div class="message-head popup">
            <div class="mes-tip">
                <span class="number-mes">1000</span>条需求对象
            </div>
            <div class="mes-cont-box" @mouseout="closeSearch" @click.stop>
                <div class="mes-cont" :class="{mesContSet:search}" @mouseout.stop>
                    <input :placeholder="holder" type="text" @focus="isSearch = true" :disabled="!search" v-model="searchText">
                    <span title="搜索" @mouseover.stop="openSearch" @click="query" v-if="!bgqy">&#xe63a;</span>
                    <span class="search-ing" title="搜索中..." v-if="bgqy">&#xe620;</span>
                </div>
                <airportS class="ais" v-on:resData="resData" :searchText="searchText" v-if="isSearch"></airportS>
            </div>
            <div class="screen">
                <span>&#xe6a7;</span>
            </div>
            <div class="amplification">
                <span>&#xe607;</span>
            </div>
        </div>
        <div class="popup tabulation">
            <div class="tabulation-head">
                <div class="navSet">
                    <div class="navList" @click="setd(key,index)" :class="{setd:changeRed == index}" v-for="(key,index) in navLists">{{key.text}}</div>
                </div>
                <div class="match"><span></span>只看与我匹配的</div>
            </div>
        </div>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import airportS from './airportSearch.vue'
    export default {
        data() {
            return {
                search: false,
                isSearch:false,
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
                qyCode:"",
                bgqy:false
            }
        },
        computed:{
            ...vx.mapGetters([
                'close'
            ])
        },
        watch:{
            close:function () {
                this.isSearch = false;
                this.closeSearch();
            }
        },
        methods: {
            query:function () {
                if(this.qyCode != ''){
                    this.bgqy = true;
                }else{
                    alert('空-错误');
                }
            },
            resData:function (data) {
                this.isSearch = false;
                this.searchText = data.airName;
                this.qyCode = data.code;
            },
            openSearch: function () {
                this.holder = '搜索关键词';
                this.search = true;
            },
            closeSearch: function () {
                if(!this.isSearch){
                    this.holder = '';
//                    this.search = false;
                };
            },
            setd: function (key, index) {
                this.changeRed = index;
            }
        },
        components:{
            airportS
        }
    }
</script>
<style scoped lang="scss">
    @keyframes myfirst
    {
        from {transform:rotate(0deg);}
        to {transform:rotate(360deg);}
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
            font-size: 1.7rem;
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
    .ais{
        position: absolute;
        top: 25px;
        left: 0px;
        width: 260px;
        max-height: 210px;
        overflow-y: scroll;
    }
    .search-ing{
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
        padding: 0 20px;
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
    .mes-cont-box{
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
        border-radius: 10px;
        height: 25px;
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
            font-size: 2rem;
            color: #605E7C;
            border: none;
            background-color: transparent;
            padding: 0;
            cursor: pointer;
            display: inline-block;
            width:25px;
            text-align: center;
            line-height: 25px;
            &:hover{
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
        border-bottom: 2px solid #b4dbff;
        display: flex;
        height: 58px;
        align-items: center;
        justify-content:space-between ;
    }

    .navList{
        padding: 0 15px 0 0;
        font-size: 1.2rem;
        height: 100%;
        line-height: 58px;
        cursor: pointer;
    }
    .navList:hover {
        border-bottom: 2px solid #3774ff;
        color: #605E7C;
    }

    .setd {
        color: #3c78ff;
        border-bottom: 2px solid #3c78ff;
    }
    .navSet{
        display: flex;
    }
    .match{
        align-self:center ;
    }
</style>