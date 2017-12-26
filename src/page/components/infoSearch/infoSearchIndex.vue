<template>
    <div class="wrapper">
        <header></header>
        <div class="info-search">
            <div class="search-wrap">
                <div class="search-type-text">
                        <div  @click="getType(index)" v-for="(value,index) in typeList" :class="{active:selcIndex == index}">{{value}}</div>
                </div>
                <div class="search-box">
                    <input type="text" v-model="airportText" @focus="searchAirport" @blur="closeDialog">
                   <airportS1 class="aisx"  :searchText="airportText" v-on:resData="airportData" v-show="airportSearch" v-if="selcIndex == '2'||selcIndex == '3'"></airportS1>
                    <div class="airline popup scroll" v-show="airlineShow" v-else-if="selcIndex == '1' ">
                        <div v-for="(item,index) in airlineData" @click="getCompanyList(index)">
                        <span>{{item[0]}}</span>
                        <span>{{item[1]}}</span>
                        </div>
                    </div>
                </div>
                <div class="search-btn" @click="getInfo"><span class="iconfont">&#xe62e;</span></div>
            </div>
        </div>
        <div class="hots">
            <div class="airport">
                <div class="a-til">热门机场</div>
                <div class="a-content">
                    <div class="a-box">
                        <div class="img"><img :src="img" alt=""></div>
                        <div class="tips"><span>中国国际航空</span><span>327架客机</span></div>
                    </div>
                    <div class="a-box">
                        <div class="img"><img :src="img" alt=""></div>
                        <div class="tips"><span>中国国际航空</span><span>327架客机</span></div>
                    </div>
                    <div class="a-box">
                        <div class="img"><img :src="img" alt=""></div>
                        <div class="tips"><span>中国国际航空</span><span>327架客机</span></div>
                    </div>
                    <div class="a-box">
                        <div class="img"><img :src="img" alt=""></div>
                        <div class="tips"><span>中国国际航空</span><span>327架客机</span></div>
                    </div>
                </div>
            </div>
            <div class="airport">
                <div class="a-til">热门航司</div>
                <div class="a-content">
                    <div class="a-box">
                        <div class="img"><img :src="img" alt=""></div>
                        <div class="tips"><span>中国国际航空</span><span>327架客机</span></div>
                    </div>
                    <div class="a-box">
                        <div class="img"><img :src="img" alt=""></div>
                        <div class="tips"><span>中国国际航空</span><span>327架客机</span></div>
                    </div>
                    <div class="a-box">
                        <div class="img"><img :src="img" alt=""></div>
                        <div class="tips"><span>中国国际航空</span><span>327架客机</span></div>
                    </div>
                    <div class="a-box">
                        <div class="img"><img :src="img" alt=""></div>
                        <div class="tips"><span>中国国际航空</span><span>327架客机</span></div>
                    </div>
                </div>
            </div>
            <div class="airport">
                <div class="a-til">热门城市</div>
                <div class="a-content">
                    <div class="a-box">
                        <div class="img"><img :src="img" alt=""></div>
                        <div class="tips"><span>中国国际航空</span><span>327架客机</span></div>
                    </div>
                    <div class="a-box">
                        <div class="img"><img :src="img" alt=""></div>
                        <div class="tips"><span>中国国际航空</span><span>327架客机</span></div>
                    </div>
                    <div class="a-box">
                        <div class="img"><img :src="img" alt=""></div>
                        <div class="tips"><span>中国国际航空</span><span>327架客机</span></div>
                    </div>
                    <div class="a-box">
                        <div class="img"><img :src="img" alt=""></div>
                        <div class="tips"><span>中国国际航空</span><span>327架客机</span></div>
                    </div>
                </div>
            </div>
        </div>
        <timeIndex v-if="detailShow" :selcIndex ="selcIndex" :qyCode1="qyCode" :searchtText="airportText"></timeIndex>
    </div>
</template>

<script>
import airportS1 from '../../reuseComponents/airportSearch1.vue'
import timeIndex from './timeIndex.vue'
 import myPic from '$src/static/img/airport1.png';
    export default {
        data() {
            return {
                airportText:'',
                qyCode:'',
                selcIndex:'',
                selcType:'时刻',
                typeList:['城市','航司','机场','时刻'],
                airlineData:[],
                airlineShow:false,
                airportSearch:false,
                showType:false,
                detailShow:false
            }
        },
         computed:{
            img:function(){
                return myPic;
            }
        },
        methods: {
            getType(i){
                this.selcType = this.typeList[i];
                this.selcIndex = i;
            },
            closeDialog(){
                 let that =this;
               setTimeout(function(){
                that.airportSearch =false;
                that.airlineShow =false;
                },200);
            },
            airportData(data){
                this.airportText = data.name;
                this.qyCode = data.code;
                this.airportSearch = false;
            },
            searchAirport(){
                this.airportSearch = true;
                this.getAirCompany();
            },
            getInfo(){
                this.detailShow = true;
                /*window.open('http://localhost:8088/#/index/information')*/
            },
            getAirCompany: function(){
                this.$ajax({
                url:"/airCompenyList",
                method: 'post',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
            }) .then((response) => {
                response.data.list.forEach(item =>{
                    let airline = [];
                    airline.push(item.airlnCd);
                    airline.push(item.icao);
                    //airline.push(item.id);
                    this.airlineData.push(airline);
                })
            }).catch((error) => {
                    console.log(error);
                });
                this.airlineShow = true;
            },
            getCompanyList: function(i){
                this.airportText = this.airlineData[i][0];
                this.qyCode = this.airlineData[i][1];
                this.airlineShow = false;
            },

        },
        mounted() {
        },
        components:{
            airportS1,
            timeIndex
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
            height:120px;
            width:100%;
            background-color:#3c78ff;
        }
        .info-search{
            background-color:#3c78ff;
            padding-top:230px;
        }
    }
    .search-wrap{
         position:relative;
         display:flex;
         box-sizing:border-box;
         width:1000px;
         margin:0 auto;
         padding:0 100px 40px 100px;
         .search-type-text{
            position:absolute;
            top:-40px;
            left:104px;
            display:flex;
            div{
                height:40px;
                line-height:40px;
                width:60px;
                text-align:center;
                color:#fff;
                font-size:1.5rem;
                cursor:pointer;
                &:hover{
                    background-color:rgba(216,216,216,.32);
                }
            }
            .active{
                  background-color:rgba(216,216,216,.32);
            }
         }
        .search-box{
            position:relative;
            width:680px;
            height:40px;
            font-size:1.3rem;
            margin-right:5px;
            background-color:#ffffff;
            border-radius:5px;
            display:flex;
            input{
               display:block;
               box-sizing:border-box;
               width:680px;
               height:25px;
               margin:8px 0 7px 0;
               padding-left:17px;
            }
           .aisx{
               position:absolute;
               top:42px;
               left:0;
               width:680px;
               max-height:140px;
               overflow-y: scroll;
               overflow:hidden;
               z-index:1;
           }
        }
        .search-btn{
            height:40px;
            width:115px;
            background-color:#fff;
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
    .hots{
        width:1000px;
        margin:0 auto;
        padding-top:40px;
        .airport{
            padding-bottom:20px;
            .a-til{
                height:50px;
                line-height:50px;
                font-size:1.5rem;
                padding-left:6px;
            }
            .a-content{
                width:100%;
                display:flex;
                height:100px;
                >div:last-of-type{
                    margin-right:0 !important;
                }
            }
            .a-box{
                margin-right:4px;
                flex:1;
                position:relative;
                cursor:pointer;
                .img{
                    width:100%;
                    height:100px;
                }
                img{
                    width:100%;
                    height:100%;
                    border-radius:8px;
                }
                .tips{
                    width:100%;
                    box-sizing:border-box;
                    height:37px;
                    line-height:37px;
                    padding:0 10px;
                    background-color:rgba(0,0,0,.7);
                    border-radius:8px;
                    color:#fff;
                    display:flex;
                    justify-content: space-between;
                    position:absolute;
                    bottom:0;
                    left:0;
                    z-index:1;
                }
            }
        }
    }
    .dropDown {
          position:absolute;
          top:41px;
          right:0;
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
    .airline{
        position:absolute;
        left:0px;
        top:41px;
        width:680px;
        max-height:210px;
        cursor:pointer;
        z-index:10;
        overflow:hidden;
        overflow-y:scroll;
        div{
            justify-content: space-between;
            display: flex;
            padding: 0 14px;
            height:35px;
            line-height:35px;
            text-align:left;
            &:hover{
                background-color:rgba(235,235,235,.5);
            }
        }

    }
</style>
