<template>
    <div class="wrapper">
        <header>
            <div class="search-box">
                <input type="text" v-model="airportText" @focus="searchAirport" @blur="closeDialog">
                <airportS1 class="aisx"  :searchText="airportText" v-on:resData="airportData" v-show="airportSearch"></airportS1>
                <div class="s-type"><span>时刻</span><span class="iconfont">&#xe605;</span></div>
            </div>
            <div class="search-btn" @click="getInfo"><span class="iconfont">&#xe62e;</span></div>
        </header>
        <timeSearch :qyCode="qyCode" :airportText="airportText" v-if="timeShow"></timeSearch>
        <infoSearch></infoSearch>
    </div>
</template>

<script>
import airportS1 from '../../reuseComponents/airportSearch1.vue'
import timeSearch from './timeSearch.vue'
import infoSearch from './airportInfoSearch.vue'
    export default {
        data() {
            return {
                airportText:'',
                qyCode:'',
                airportSearch:false,
                timeShow:false
            }
        },
        methods: {
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
                this.timeShow=true;
            }

        },
        mounted() {
        },
        components:{
            airportS1,
            timeSearch,
            infoSearch
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
                width:160px;
                height:40px;
                line-height:40px;
                box-sizing:border-box;
                padding:0 20px;
                display:flex;
                justify-content: space-between;
                .iconfont{
                    color:#3c78ff;
                }
            }
            .aisx{
                position:absolute;
                top:42px;
                left:0;
                width:400px;
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
</style>
