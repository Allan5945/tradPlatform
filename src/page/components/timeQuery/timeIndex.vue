<template>
    <div class="wrapper">
        <header>
        <div class="search-box">
            <input type="text">
            <div class="s-type">时刻</div>
        </div>
        </header>
        <div class="content">
            <div class="time-table">
                <div class="table-til">
                    <div class="t-til"><span class="iconfont">&#xe621;</span>时刻表</div>
                    <div class="t-update" >
                        <span>数据更新时间</span>
                        <input type="text" v-model="inputData" readonly>
                        <span class="iconfont update-icon" @click="showSelcList=!showSelcList">&#xe605;</span>
                        <div class="selc-list dropDown popup" v-show="showSelcList">
                            <div @click="getTime(index)" v-for="(value,index) in timeList">{{value}}</div>
                        </div>
                    </div>
                </div>
                <div class="table-box">
                    <div class="box-head">
                        <div class="name">武当山时刻表</div>
                        <div class="export"><span class="iconfont">&#xe654;</span>&nbsp;导出</div>
                    </div>
                    <div class="box-content">
                        <div class="table-header">
                            <div>出发地</div>
                            <div>到达地</div>
                            <div>航班号<span>--</span></div>
                            <div>机型</div>
                            <div>出发时间<span>--</span></div>
                            <div>出发机场</div>
                            <div>到达时间<span>--</span></div>
                            <div>到达机场</div>
                            <div>班期</div>
                        </div>
                        <div class="scroll table-content">
                            <ul class="table-list" v-for="item in timeTableList">
                                <li>{{item.dptAirptCd}}</li>
                                <li>{{item.arrvAirptCd}}</li>
                                <li>{{item.fltNbr}}</li>
                                <li >{{item.aircrftTyp}}</li>
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
                          <div class="name">武当山时刻表</div>
                      </div>
                      <div class="distr-content">
                          <div class="distr-header">
                              <div></div>
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
                          <div class="distr-content">
                              <div class="content-sidebar">
                                  <div>周一</div>
                                  <div>周二</div>
                                  <div>周三</div>
                                  <div>周四</div>
                                  <div>周五</div>
                                  <div>周六</div>
                                  <div>周日</div>
                              </div>
                              <div class="content-box">
                                  <ul class=" " v-for="item in timeTableList">
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
            </div>

        </div>
    </div>
</template>

<script>
/*import reviewList from './reviewList/viewTable.vue'*/
    export default {
        data() {
            return {
                timeTableList:[],
                timeList:[],
                inputData:'',
                showSelcList:false
            }
        },
        watch: {
            "inputData": function(){
                this.getData(this.inputData)
            }
        },
        methods: {
            getTime(i){
                this.inputData = this.timeList[i];
                this.showSelcList = false;
            },
            getData(time){
                this.$ajax({
                method: 'post',
                url: '/getAirportTimeInfo',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                     itia:'CTU',
                     getTime: time
                    }
                })
                .then((response) => {
                    this.timeTableList = response.data.list;
                    this.timeList = response.data.timeList;
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
            },
            getClock(){
                this.$ajax({
                method: 'post',
                url: '/getAirportTimeDistribution',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                     itia:'CTU',
                     getTime: '2017.12.10'
                    }
                })
                .then((response) => {
                    this.timeTableList = response.data.list;
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
            }
        },
        mounted() {
            this.getData();
            this.getClock();
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
            overflow:hidden;
            background-color:#3c78ff;
        }
    }
    header{
        .search-box{
            width:680px;
            height:40px;
            font-size:1.3rem;
            margin:46px 0 34px 250px;
            background-color:#ffffff;
            border-radius:5px;
            display:flex;
            input{
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
                padding-left:20px;
            }

        }
    }
    .content{
        width:1100px;
        margin-left:250px;
        margin-top:120px;
        background-color: #fff;
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
</style>
