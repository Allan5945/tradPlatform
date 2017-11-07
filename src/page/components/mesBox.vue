<template>
    <div class="message-box">
        <div class="message-head popup">
            <div class="mes-tip">
                <span class="number-mes">1000</span>条需求对象
            </div>
            <div class="mes-cont" :class="{mesContSet:search}" @blur.stop="closeSearch" @mouseover.stop="openSearch">
                <input :placeholder="holder" type="text" :disabled="!search" v-model="searchText">
                <span title="搜索">&#xe63a;</span>
                <airportS class="ais" :searchText.sync="searchText"></airportS>
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
    import airportS from './airportSearch.vue'
    export default {
        data() {
            return {
                search: false,
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
            }
        },
        methods: {
            openSearch: function () {
                this.holder = '搜索关键词';
                this.search = true;
            },
            closeSearch: function () {
                this.holder = '';
                this.search = false;
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
        padding: 0 14px;
        width: 260px;
        max-height: 210px;
        overflow-y: scroll;
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
        margin: 0 0 2px 0;
        padding: 0 20px;
    }

    .mes-tip {
        color: #959595;
    }

    .number-mes {
        color: #3c78ff;
    }

    .mes-cont {
        position: relative;
        width: 153px;
        margin-left: 10px;
        display: flex;
        border-radius: 10px;
        height: 25px;
        > input {
            padding-left: 10px;
            border: none;
            outline: none;
            width: 115px;
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
            width: 25px;
            text-align: center;
            line-height: 25px;
        }
    }

    .mes-cont-set {
        background-color: #f4f4f4;
    }

    .mesContSet {
        background-color: #f4f4f4;
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