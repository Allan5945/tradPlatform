<template>
        <header>
            <div class="search-box">
                <input type="text" v-model="airportText" @focus="searchAirport" @blur="closeDialog">
                <airportS1 class="aisx"  :searchText="airportText" v-on:resData="airportData" v-if="selcType == '时刻'||selcType == '机场' "  v-show="airportSearch"></airportS1>
                <cityS class="aisx"  :searchText="airportText" v-on:resData="cityData"  v-else-if="selcType == '城市' " v-show="citySearch"></cityS>
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
</template>

<script>
import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';
import airportS1 from '../../reuseComponents/airportSearch1.vue'
import cityS from '../../reuseComponents/citySearch.vue'
    export default {
        data() {
            return {
                airportText:'',
                qyCode:'',
                selcType:'',
                typeList:['城市','时刻','机场'],
                searchData:{},
                airportSearch:false,
                citySearch:false,
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
             cityData(data){
                this.airportText = data.name;
                this.qyCode = data.code;
                this.citySearch = false;
            },
            searchAirport(){
                this.airportSearch = true;
                this.citySearch = true;
            },
            getInfo(){
                if(this.selcType == '时刻'){

                }else if(this.selcType == '机场'){
                    let data = {};
                    data.qyCode = this.qyCode;
                    data.airportText = this.airportText;
                    this.$emit('searchData',this.qyCode)
                }else if(this.selcType == '航司'){

                }else if(this.selcType == '城市'){

                }
            }

        },
        mounted() {
           /* tabulationBoxTrigger.$on('searchData', val => {
                this.searchData =val;
                 console.log(this.searchData.qyCode)
            });*/
            //console.log(this.searchData)
        },
        components:{
            airportS1,
            cityS
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
                overflow:hidden;
                overflow-y: scroll;
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
