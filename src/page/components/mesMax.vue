<template>
    <div class="mes-max popup">
        <div class="mes-head">
           <div class="mes-head-s">
               <div class="mes-head-t">需求列表</div>
               <div>
                   <div class="mes-cont-box" @mouseout="closeSearch" @click.stop>
                       <div class="mes-cont" @mouseout.stop>
                           <input :placeholder="holder" @input="openList('a')" type="text" @focus="history" :disabled="!search" v-model="searchText">
                           <span title="搜索" @mouseover.stop="openSearch" @click="query" v-if="!bgqy">&#xe6c3;</span>
                           <span class="search-ing" title="搜索中..." v-if="bgqy">&#xe620;</span>
                       </div>
                       <hisy class="ais" v-on:reshsy="reshsy" v-on:clear="clear" v-if="openHisy"></hisy>
                       <airportS class="aisx" v-on:resData="resData" :searchText="searchText" v-show="isSearch"></airportS>
                   </div>
                   <div class="screen">
                       <span @click="openScreen">&#xe6a7;</span>
                       <transition   name="bounce">
                           <screen class="screen-hs" v-if="screenHsShow" v-on:screenHs="screenHs"></screen>
                       </transition>
                   </div>
                   <div class="amplification">
                       <span @click="openMin">&#xe618;</span>
                   </div>
               </div>
           </div>
            <div>
                <span class="number-mes">1000</span>条需求对象
            </div>
        </div>
        <div></div>
    </div>
</template>
<script>
    import airportS from './airportSearch.vue'
    import hisy from './hisy.vue'
    import screen from './screen-hs.vue'
    export default {
        data(){
          return{
              screenHsShow:true,
              search: false,
              isSearch: false,
              holder: '',
              searchText: '',
              changeRed: 0,
              qyCode: "",
              bgqy: false,
              openHisy: false,
              elect: false
          }
        },
        methods:{
            clear: function () {
                this.openHisy = false;
            },
            openSearch: function () {
                this.holder = '搜索关键词';
                this.search = true;
            },
            openScreen:function () {
                this.screenHsShow = !this.screenHsShow;
            },
            openMin:function () {
                this.$emit('openMin','min')
            },
            screenHs:function () {
                this.screenHsShow = false;
            },
            closeSearch: function () {
                if (!this.isSearch) {
                    this.holder = '';
                };
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
        },
        components:{
            airportS,
            hisy,
            screen
        }
    }
</script>
<style scoped lang="scss">
    .mes-max{
        width: 1000px;
        height:100% ;
    }
    .mes-head{
        height:80px;
    }
    .mes-head-s{
        display: flex;
        flex-flow:row nowrap;
        padding: 10px 20px;
        justify-content: space-between;
    }
    .mes-head-t{
        color: #605E7C;
        font-size: 2rem;
    }
</style>