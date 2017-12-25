<template>
    <div class="wrapper">
        <header>
            <div class="search-box">
                <input type="text" v-model="airportText" @focus="searchAirport" @blur="closeDialog">
                <airportS1 class="aisx"  :searchText="airportText" v-on:resData="airportData" v-show="airportSearch"></airportS1>
                <div class="s-type" @click="showType = !showType">
                    <span>{{selcType}}</span>
                    <span class="iconfont">&#xe605;</span>
                </div>
                <div class="selc-list dropDown popup" v-show="showType">
                    <div @click="getType(index)" v-for="(value,index) in typeList">{{value}}</div>
                </div>
            </div>
            <div class="search-btn" @click="getInfo"><span class="iconfont">&#xe62e;</span></div>
        </header>
        <timeSearch :qyCode="qyCode" :airportText="airportText" v-if="timeShow"></timeSearch>
        <airportInfo :qyCode="qyCode" v-if="airportShow"></airportInfo>
        <airlineInfo  v-if="airlineShow"></airlineInfo>
    </div>
</template>

<script>
import airportS1 from '../../reuseComponents/airportSearch1.vue'
import timeSearch from './timeSearch.vue'
import airportInfo from './airportInfoSearch.vue'
import airlineInfo from './airlineInfoSearch.vue'
    export default {
        data() {
            return {
                airportText:'',
                qyCode:'',
                selcType:'时刻',
                typeList:['时刻','机场','航司'],
                airportSearch:false,
                timeShow:false,
                airportShow:false,
                airlineShow:false,
                showType:false
            }
        },
        methods: {
            getType(i){
                this.selcType = this.typeList[i];
                this.showType = false;
            },
            closeDialog(){
                 let that =this;
               setTimeout(function(){
                that.airportSearch =false;
                },200);
            },
            airportData(data){
                this.airportText = data.name;
                this.qyCode = data.code;
                this.airportSearch = false;
            },
            searchAirport(){
                this.airportSearch = true;
            },
            getInfo(){
                if(this.selcType == '时刻'){
                   this.timeShow = true;
                   this.airportShow = false;
                   this.airlineShow = false;
                }else if(this.selcType == '机场'){
                    this.airportShow = true;
                    this.timeShow = false;
                    this.airlineShow = false;
                }else if(this.selcType == '航司'){
                    this.airlineShow = true;
                    this.airportShow = false;
                    this.timeShow = false;
                }
            }

        },
        mounted() {
        },
        components:{
            airportS1,
            timeSearch,
            airportInfo,
            airlineInfo
        }
    }
</script>

<style lang="scss" scoped>
    input{
        border:0;
        outline:0;
    }
    ul,li{
        list-style:none;
        padding:0;
        margin:0;
    }
    .wrapper{
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        background-color: #f5f5f5;
        z-index: 11;
        color:#605e7c;
        header{
            position: fixed;
            top: 0;
            left: 0;
            z-index:1;
            height:120px;
            width:100%;
            background-color:#3c78ff;
            display:flex;
        }
    }
    header{
        .search-box{
            position:relative;
            width:680px;
            height:40px;
            font-size:1.3rem;
            margin:46px 0 34px 250px;
            background-color:#ffffff;
            border-radius:5px;
            display:flex;
            input{
               display:block;
               box-sizing:border-box;
               width:520px;
               height:25px;
               margin:8px 0 7px 0;
               padding-left:17px;
               border-right:1px solid #ccc;
            }
            .s-type{
                position:relative;
                width:160px;
                height:40px;
                line-height:40px;
                box-sizing:border-box;
                padding:0 20px;
                display:flex;
                justify-content: space-between;
                cursor:pointer;
                .iconfont{
                    color:#3c78ff;
                }
            }
            .aisx{
                position:absolute;
                top:42px;
                left:0;
                width:520px;
                max-height:175px;
                overflow-y: scroll;
                overflow:hidden;
            }

        }
        .search-btn{
            height:40px;
            width:115px;
            background-color:#fff;
            margin:46px 0 34px 5px;
            border-radius:5px;
            text-align:center;
            line-height:40px;
            cursor: pointer;
            .iconfont{
                font-size:3.2rem;
                color:#3c78ff;
            }
        }
    }
    .dropDown {
          position:absolute;
          top:41px;
          right:0;
          width:160px;
          background-color: #fff;
          border-radius: 4px;
          z-index:999;
           >div {
            width: 100%;
            height:35px;
            box-sizing: border-box;
            line-height:35px;
            padding-left: 14px;
            color: #605E7C;
            font-size: 1.2rem;
            cursor:pointer;
            &:hover{
                background-color:rgba(235,235,235,.5);
            }
          }
    }
</style>
