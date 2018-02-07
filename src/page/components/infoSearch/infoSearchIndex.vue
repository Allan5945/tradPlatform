<template>
    <div class="wrapper">
        <header></header>
        <div class="info-search">
            <div class="search-wrap">
                <div class="search-type-text">
                        <div  @click="getType(index)" v-for="(value,index) in typeList" :class="{active:selcIndex == index}">{{value}}</div>
                </div>
                <div class="search-box">
                    <input type="text" v-model="airportText" @focus="infoSearch" @blur="closeDialog" maxlength="20" :placeholder="searchTip">
                   <airportS1 class="aisx"  :searchText="airportText" v-on:resData="airportData" v-if="selcIndex == '2'||selcIndex == '3'"  v-show="airportShow"></airportS1>
                   <cityS class="aisx"  :searchText="airportText" v-on:resData="cityData" v-else-if="selcIndex == '0' " v-show="cityShow"></cityS>
                    <airCompanyS class="aisx"  :searchText="airportText" v-on:resData="airCompanyData"  v-show="airlineShow" v-else-if="selcIndex == '1' "></airCompanyS>
                </div>
                <div class="search-btn" @click="getInfo" v-if="search"><span class="iconfont">&#xe62e;</span></div>
                <div class="no-search-btn" v-else><span class="iconfont">&#xe62e;</span></div>
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
        <router-view></router-view>
    </div>
</template>

<script>
import airportS1 from '../../reuseComponents/airportSearch1.vue'
import cityS from '../../reuseComponents/citySearch.vue'
import airCompanyS from '../../reuseComponents/airCompanySearch.vue'//可匹配航司搜索
import * as vx from 'vuex'
import In from '$src/public/js/tabulationBoxTrigger.js';
import myPic from '$src/static/img/airport1.png';
    export default {
        data() {
            return {
                airportText:'',
                airportText1:'',
                qyCode:'',
                selcIndex:'0',
                selcType:'城市',
                typeList:['城市','航司','机场','时刻'],
                searchTip:'请输入城市进行查询',
                airlineShow:false,
                airportShow:false,
                cityShow:false,
                showType:false,
                search:false
            }
        },
         computed:{
            img:function(){
                return myPic;
            },
             ...vx.mapGetters([
                 'airList'
             ])
        },
        watch:{
           'airportText':function(){
                if(this.airportText){
                    this.search = true;
                }else{
                    this.search = false;
                }
           },
           'selcType':function(val){
                if(val == '城市'){
                    this.searchTip = "请输入城市进行查询";
                }else if(val == '航司'){
                     this.searchTip = "请输入航司进行查询";
                }else if(val == '机场'){
                     this.searchTip = "请输入机场进行查询";
                }else if(val == '时刻'){
                     this.searchTip = "请输入机场进行查询";
                }
           }
        },
        created(){
            In.$emit("closeDetailed");
        },
        methods: {
            getType(i){
                this.airportText = '';
                this.airportText1 = '';
                this.selcType = this.typeList[i];
                this.selcIndex = i;
            },
            closeDialog(){
                 let that =this;
               setTimeout(function(){
                that.airportShow =false;
                that.airlineShow =false;
                that.cityShow =false;
                that.airportText = (that.airportText == ''||that.qyCode == ''? '':that.airportText1);
                },200);
            },
            airportData(data){
                this.airportText = data.name;
                this.airportText1 = data.name;
                this.qyCode = data.code;
                this.airportShow = false;
            },
            cityData(data){
                this.airportText = data.name;
                this.airportText1 = data.name;
                //this.qyCode = data.code;
                this.qyCode = data.name;
                this.cityShow = false;
            },
            infoSearch(){
                this.airportShow = true;
                this.cityShow = true;
                this.airlineShow = true;
            },
            getInfo(){
                this.airportText = (this.airportText == ''||this.qyCode == ''? '':this.airportText1);
                if(this.qyCode !== ''&& this.airportText !== ''){
                    let data = {
                        qyCode : this.qyCode,
                        selcType :this.selcType,
                        searchText:this.airportText
                    };
                     this.$store.dispatch('searchInfo', data);
                     this.$local.clear();
                     this.$local.set(data);

                     if(this.selcType == '机场'){
                        this.$router.push({ path: '/index/information/airport'});
                    }else if(this.selcType == '航司'){
                        this.$router.push({ path: '/index/information/airline'});
                    }else if(this.selcType == '时刻'){
                        this.$router.push({ path: '/index/information/time'});
                    }else if(this.selcType == '城市'){
                        this.$router.push({ path: '/index/information/city'});
                    }
                }
                this.airportText = '';
                this.qyCode = '';
            },
            getAirCompany: function(){
                this.airlineShow = true;
            },
            airCompanyData: function(data){
                this.airportText = data.name;
                this.airportText1 = data.name;
                this.qyCode = data.code3;
                this.airlineShow = false;
            }
        },
        mounted() {
            let a;
            if(this.$route.query.code != undefined){
                a = this.$route.query.code.split('/')[0];
                let b = this.$airMes(this.airList,a);
                this.qyCode = b.code;
                this.selcType = "机场";
                this.airportText = b.cityName;
                this.getInfo();
            };
        },
        components:{
            airportS1,
            cityS,
            airCompanyS
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
               max-height:220px;
               overflow:hidden;
               overflow-y: scroll;
               z-index:10;
               font-size:1.3rem;
               >div{
                    height:40px !important;
               }
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
            color:#3c78ff;
            box-shadow: 0px 2px 16px rgba(4, 7, 156, 0.4);
            .iconfont{
                font-size:3.2rem;
            }
            &:hover{
                 background-color:#c7d8ff;
            }
             &:active {
                background-color: rgba(60,120,225,.9);
                color: white;
            }
        }
        .no-search-btn{
            height:40px;
            width:115px;
            background-color:#ccc;
            border-radius:5px;
            text-align:center;
            line-height:40px;
            cursor: pointer;
            color:rgba(256,256,256,.4);
            box-shadow: 0px 2px 16px rgba(4, 7, 156, 0.4);
            .iconfont{
                font-size:3.2rem;
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
   /*  .airline{
       position:absolute;
       left:0px;
       top:41px;
       width:680px;
       max-height:220px;
       cursor:pointer;
       z-index:10;
       overflow:hidden;
       overflow-y:scroll;
       div{
           justify-content: space-between;
           display: flex;
           padding: 0 14px;
           font-size:1.3rem;
           height:40px;
           line-height:40px;
           text-align:left;
           &:hover{
               background-color:rgba(235,235,235,.5);
           }
       }

   } */
</style>
