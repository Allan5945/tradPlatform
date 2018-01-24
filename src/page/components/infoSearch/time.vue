<template>
    <div>
        <timeHeader @search = "searchData"></timeHeader>
        <div class="wrapper">
            <div class="content" v-if="showDetail">
                <div class="banner">
                    <div class="airport-img"><img :src="img2" alt=""></div>
                    <div class="b-til">{{airportText}}</div>
                    <div class="sidebar">
                        <div><span class="iconfont">&#xe621;</span>时刻表</div>
                         <div><span class="iconfont">&#xe628;</span>时刻分布</div>
                    </div>
                </div>
                <div class="time-table">
                    <div class="table-til">
                        <div class="t-til"><span class="iconfont">&#xe621;</span>时刻表</div>
                        <div class="t-update" >
                            <span>数据更新时间</span>
                            <input type="text" v-model="inputData" readonly @click="showSelcList=!showSelcList">
                            <span class="iconfont update-icon" @click="showSelcList=!showSelcList">&#xe605;</span>
                            <div class="dropDown popup" v-show="showSelcList">
                                <div @click="getTime(index)" v-for="(value,index) in timeList">{{value}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="table-box">
                        <div class="box-head">
                            <div class="name">{{this.airportText}}班期时刻表</div>
                            <div class="export" @click="exportData"><span class="iconfont">&#xe654;</span>&nbsp;导出</div>
                        </div>
                        <div class="box-content">
                            <div class="table-header">
                                <div>出发地</div>
                                <div>到达地</div>
                                <div class="flight">航班号
                                    <div class="up-down" @click="flightSort">
                                        <span class="iconfont icon-up" :class="{active:sorted1}">&#xe605;</span>
                                        <span class="iconfont icon-down" :class="{active:!sorted1}">&#xe605;</span>
                                    </div>
                                </div>
                                <div>机型</div>
                                <div class="start-time">出发时间
                                    <div class="up-down" @click="startTimeSort">
                                        <span class="iconfont icon-up" :class="{active:sorted2}">&#xe605;</span>
                                        <span class="iconfont icon-down" :class="{active:!sorted2}">&#xe605;</span>
                                    </div>
                                </div>
                                <div>出发机场</div>
                                <div class="end-time">到达时间
                                    <div class="up-down" @click="endTimeSort">
                                        <span class="iconfont icon-up" :class="{active:sorted3}">&#xe605;</span>
                                        <span class="iconfont icon-down" :class="{active:!sorted3}">&#xe605;</span>
                                    </div>
                                </div>
                                <div>到达机场</div>
                                <div>班期</div>
                            </div>
                            <div class="scroll table-content">
                                <ul class="table-list" v-for="item in timeTableList">
                                    <li>{{item.dptAirptCd}}</li>
                                    <li>{{item.arrvAirptCd}}</li>
                                    <li>{{item.fltNbr}}</li>
                                    <li class="air-type">{{item.aircrftTyp}}</li>
                                    <li>{{item.lclDptTm}}</li>
                                    <li>{{item.dptAirptPot}}</li>
                                    <li>{{item.lclArrvTm}}</li>
                                    <li>{{item.arrvAirptPot}}</li>
                                    <li>{{item.days}}</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="time-table">
                      <div class="table-til">
                          <div class="t-til"><span class="iconfont">&#xe628;</span>时刻分布</div>
                      </div>
                      <div class="table-box">
                          <div class="box-head">
                              <div class="name">{{this.airportText}}班期时刻表</div>
                              <!-- <div class="pointer"></div> -->
                          </div>
                          <div class="distr-content">
                               <div class="distr-sidebar">
                                      <div style="height:56px;"></div>
                                      <div>周一</div>
                                      <div>周二</div>
                                      <div>周三</div>
                                      <div>周四</div>
                                      <div>周五</div>
                                      <div>周六</div>
                                      <div>周日</div>
                                </div>
                              <div class="distr-box">
                                  <div class="distr-header">
                                      <div><span>06:00</span><span>07:00</span></div>
                                      <div><span>08:00</span><span>09:00</span></div>
                                      <div><span>10:00</span><span>11:00</span></div>
                                      <div><span>12:00</span><span>13:00</span></div>
                                      <div><span>14:00</span><span>15:00</span></div>
                                      <div><span>16:00</span><span>17:00</span></div>
                                      <div><span>18:00</span><span>19:00</span></div>
                                      <div><span>20:00</span><span>21:00</span></div>
                                      <div><span>22:00</span><span>23:00</span></div>
                                      <div><span>24:00</span></div>
                                  </div>
                                  <div class="content-box">
                                      <ul class="box-list" v-for="item in distrList1">
                                          <li>{{item.monCnt}}</li>
                                          <li>{{item.tuesCnt}}</li>
                                          <li>{{item.wedCnt}}</li>
                                          <li>{{item.thursCnt}}</li>
                                          <li>{{item.friCnt}}</li>
                                          <li>{{item.staCnt}}</li>
                                          <li>{{item.sunCnt}}</li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                </div>

            </div>
            <div class="content" style="color:red;text-align:center;line-height:67px;" v-else>暂无内容,请重新搜索</div>
        </div>
    </div>
</template>

<script>
 import * as vx from 'vuex';
 import { Loading } from 'element-ui';
 import timeHeader from './timeHeader.vue'
 import myPic1 from '$src/static/img/Slice.png';
 import myPic2 from '$src/static/img/infobg.png';
    export default {
        data() {
            return {
                airportText:'',
                qyCode:'',
                timeTableList:[],
                timeList:[],
                timeIndex:'0',
                distrList:null,
                inputData:'',
                showSelcList:false,
                sorted1:false,
                sorted2:false,
                sorted3:false,
                showDetail:true
            }
        },
        watch: {
            "inputData": function(){
                this.updateData();
            },
            'qyCode':function(){
                this.getData();
                this.getClock(this.inputData,this.qyCode);
                this.airportText = this.searchInfo.searchText;
            }
        },
       computed:{
            ...vx.mapGetters([
                'searchInfo'
            ]),
            distrList1:function(){
                if(this.distrList){
                    let data = this.distrList.splice(0,1);
                    this.distrList.push(data[0]);
                }
                return this.distrList;
            },
             img1:function(){
                return myPic1;
            },
             img2:function(){
                return myPic2;
            }
        },
        methods: {
            searchData(qyCode){
               this.qyCode = qyCode;
            },
            getTime(i){
                this.inputData = this.timeList[i];
                this.showSelcList = false;
                this.timeIndex = i;
            },
            getData(){
                 this.loading = Loading.service({
                    text:"努力加载中..."
                });
                this.$ajax({
                method: 'post',
                url: '/getAirportTimeInfo',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                     itia:this.qyCode
                    }
                })
                .then((response) => {
                    if(response.data.opResult == "0"){
                         this.showDetail= true;
                       /* if(this.timeTableList.length == 0){
                            this.showDetail= false;
                        }*/
                        this.timeTableList = response.data.list;
                        this.timeList = response.data.timeList;
                        this.inputData = this.timeList[0];
                        this.loading.close();
                    }else{
                        this.loading.close();
                        this.showDetail= false;
                    }
                })
                .catch((error) => {
                        this.loading.close();
                        console.log(error);
                    }
                );
            },
            getClock(time,code){
                this.$ajax({
                method: 'post',
                url: '/getAirportTimeDistribution',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                     itia:code,
                     getTime: time
                    }
                })
                .then((response) => {
                    if(response.data.opResult == "0"){
                        this.distrList = response.data.list;
                        this.showDetail= true;
                    }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
            },
            updateData(){
                this.$ajax({
                method: 'post',
                url: '/getAirportTimeInfo',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                     itia:this.qyCode,
                     getTime: this.inputData
                    }
                })
                .then((response) => {
                    this.timeTableList = response.data.list;
                })
                .catch((error) => {
                        console.log(error);
                    }
                );

                this.getClock(this.inputData,this.qyCode);
            },
            sortData(name,type){
                this.$ajax({
                method: 'post',
                url: '/getAirportTimeInfo',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                     itia:this.qyCode,
                     getTime: this.inputData,
                     orderField:name,
                     orderType:type
                    }
                })
                .then((response) => {
                    this.timeTableList = response.data.list;
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
            },
            exportData(){
                let url = "/jxlExcel?itia=" + this.qyCode + "&getTime=" + this.timeList[this.timeIndex];
                window.location.href= url;
            },
            flightSort(){
                this.sorted1 = !this.sorted1;
                let ordertype = this.sorted1? 0:1;
                this.sortData('fltNbr',ordertype);
            },
            startTimeSort(){
                this.sorted2 = !this.sorted2;
                let ordertype = this.sorted2? 0:1;
                this.sortData('lclDptTm',ordertype);
            },
            endTimeSort(){
                this.sorted3 = !this.sorted3;
                let ordertype = this.sorted3? 0:1;
                this.sortData('lclArrvTm',ordertype);
            },
            showPoint(num){
                let point = {};
                 point.rate = num/100,
                 point.len = 34 * rate;
                return point;
            },
        },
        mounted(){
            this.airportText = this.searchInfo.searchText;
            this.qyCode = this.searchInfo.qyCode;
             if(this.qyCode == ''){
                this.showDetail=false;
            }
            this.getData();
            this.getClock(this.inputData,this.qyCode);

        },
        components:{
            timeHeader
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
        height:100%;
        top: 0;
        left: 0;
        background-color: #f5f5f5;
        z-index: 12;
        color:#605e7c;
        overflow-y: scroll;
    }
    .content{
        width:1100px;
        margin-left:250px;
        margin-top:160px;
        padding-bottom:50px;
        background-color: #fff;
    }
    .banner{
        width:100%;
        height:100px;
        position:relative;
        .airport-img{
            width:100%;
            height:100%;
            img{
                width:100%;
                height:100%;
            }
        }
        .b-til{
            position:absolute;
            left:0;
            top:0;
            width:210px;
            height:100px;
            color:#fff;
            text-align:center;
            line-height:100px;
            font-size:2.0rem;
            background-color:rgba(0,0,0,.3);
        }
    }
    .sidebar{
        position:absolute;
        top:12px;
        right:-100px;
        >div{
            height:42px;
            line-height:42px;
            font-size:1.6rem;
            width:100px;
            display:flex;
            cursor:pointer;
            border-top-right-radius:5px;
            border-bottom-right-radius:5px;
            span{
                font-size:2.6rem;
            }
            &:hover{
                color:#fff;
                background-color:#3c78ff;
            }
        }
    }
    .table-til{
        display:flex;
        justify-content: space-between;
        height:86px;
        line-height:86px;
        margin: 0 17px;
        border-bottom:1px solid #ccc;
        .t-til{
            font-size:1.6rem;
            display:flex;
        }
        .iconfont{
            font-size:2.2rem;
        }
        .t-update{
            position:relative;
            font-size:1.4rem;
            span{
                margin-right:10px;
            }
            input{
                height:26px;
                width:101px;
                padding-left:5px;
                border:1px solid rgba(153,153,153,.3);
                border-radius:5px;
                cursor:pointer;
            }
            .update-icon{
                position:absolute;
                right:0;
                top:0;
                margin-right:6px;
                color:#3c78ff;
                cursor:pointer;
            }
        }
    }
    .table-box{
            margin:28px 25px 0 25px;
            border:1px solid  rgba(208,208,208,.51);
        .box-head{
            height:50px;
            line-height:50px;
            font-size:1.4rem;
            display:flex;
            justify-content: space-between;
            border-bottom:1px solid rgba(208,208,208,.51);
             .name{
                padding-left:24px;
            }
            .export{
                width:80px;
                height:26px;
                line-height:26px;
                margin:12px 10px 0 0;
                border-radius:100px;
                background-color:#ffffff;
                text-align:center;
                box-shadow: 1px 2px 18px rgba(60, 120, 255,0.5);
                cursor:pointer;
            }
        }
    }
    .box-content{
        padding-top:27px;
        .table-header{
            display:flex;
            >div{
                flex:1;
                text-align:center;
                height:30px;
                line-height:30px;
            }
        }
        .flight,.start-time,.end-time{
             display:flex;
             justify-content: center;
             .up-down {
                position: relative;
                width: 20px;
                cursor:pointer;
                .active {
                    color: #3c78ff;
                }
                .icon-down {
                    position: absolute;
                    bottom: 4px;
                    left:5px;
                    transform: rotate(180deg);
                }
                .icon-up {
                    position: absolute;
                    top: 4px;
                    left:5px;
                }
            }
        }
        .table-content{
            height:500px;
            overflow:hidden;
            overflow-y:scroll;
           /*  &::-webkit-scrollbar-track {
             background: transparent;
           } */
            >ul:nth-of-type(odd){
                background-color:#f5f5f5;
            }
        }
        .table-list{
            display:flex;
            >li{
                flex:1;
                text-align:center;
                height:50px;
                line-height:50px;
            }

            .air-type{
                line-height:16px;
                padding-top:15px;
                box-sizing:border-box;
            }
        }

    }
    .distr-content{
        display:flex;
        .distr-sidebar{
            >div{
                width:75px;
                height:50px;
                line-height:50px;
                text-align:center;
            }
            >div:nth-of-type(even){
                background-color:#f5f5f5;
            }
        }
    }
        .distr-box{
            .distr-header{
                width:1000px;
                display:flex;
                >div{
                    width:100px;
                    height:56px;
                    line-height:56px;
                    text-align:center;
                    flex:1;
                    box-sizing:border-box;
                    display:flex;
                    justify-content: space-between;
                    padding:0 10px;
                    border-left:1px dashed rgba(151,151,151,.3);

                }
            }
        }
        .content-box{
            display:flex;
            width:975px;
            >ul{
                display:inline-block;
                li{
                    width:50px;
                    height:50px;
                    line-height:50px;
                    text-align:center;
                }
                >li:nth-of-type(odd){
                    background-color:#f5f5f5;
                }
            }
            >ul:nth-of-type(odd){
                li{
                    width:49px;
                }
                border-left:1px dashed rgba(151,151,151,.3);
            }
             >ul:last-of-type{
                 width:72px;
                li{
                     width:52px;
                     padding-right:20px;
                }
            }
        }
    .dropDown {
      position:absolute;
      top:60px;
      right:0;
      width:108px;
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
    .pointer{
        width:34px;
        height:34px;
        border-radius:100%;
        background-color:red;
    }
</style>
