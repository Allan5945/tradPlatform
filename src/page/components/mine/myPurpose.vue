<template>
    <div class="plan-wrapper scroll" >
        <header>
            <div class="top-til">需求详情<span @click="closeThisFn" class="iconfont">&#xe62c;</span></div>
            <div class="head-til">{{detailData.title}}</div>
            <div class="tips">
                <span>创建于{{detailData.releasetime}}</span>
                <span>已有{{intentionCount}}位用户发起意向</span>
            </div>
        </header>
        <div class="content">
            <div class="table-form">
                <div >
                    <div>出港时刻</div>
                    <div>{{detailData.dptTime}}</div>
                </div>
                <div>
                    <div>班期</div>
                    <div>{{detailData.days}}</div>
                </div>
                <div>
                    <div>机型</div>
                    <div>{{detailData.aircrfttyp}}</div>
                </div>
                 <div>
                    <div>运力基地</div>
                    <div>{{detailData.dptNm}}</div>
                </div>
                <div>
                    <div>运力归属</div>
                    <div>{{detailData.capacitycompany}}</div>
                </div>
                <div>
                    <div>座位布局</div>
                    <div>{{detailData.seating}}</div>
                </div>
                <div>
                    <div>小时成本</div>
                    <div>{{detailData.hourscost}}万/小时</div>
                </div>
                <div>
                    <div>接受调度</div>
                    <div>{{detailData.schedulingStr}}</div>
                </div>
                <div>
                    <div>有效期</div>
                    <div>{{detailData.periodValidity}}</div>
                </div>
            </div>
            <div class="myplan">
                <div class="plan-til">
                    <div>我发出的方案</div>
                    <div><span class="iconfont" style="font-size:1.6rem;">&#xe653;</span>编辑</div>
                </div>
                <div class="airline">
                    <div class="airplace">
                        <div>始发机场</div>
                        <div>
                            <div>{{planData.dpt}}</div>
                            <div>接受临近机场</div>
                        </div>
                         <div class="resouse">
                            <div>出港资源</div>
                            <div>{{planData.dptTime}}</div>
                        </div>
                    </div>
                    <div style="padding-top:60px;"><span class="iconfont">&#xe672;</span></div>
                    <div class="airplace">
                        <div>经停机场</div>
                        <div>{{planData.pst}}</div>
                        <div class="resouse">
                            <div>出港资源</div>
                            <div>{{planData.pstTime}}</div>
                        </div>
                    </div>
                    <div style="padding-top:60px;"><span class="iconfont">&#xe672;</span></div>
                    <div class="airplace">
                        <div>到达区域</div>
                        <div>{{planData.arrv}}</div>
                        <div class="resouse">
                            <div>出港资源</div>
                            <div>{{planData.arrvTime}}</div>
                        </div>
                    </div>
                </div>
                <div class="table-form">
                    <div>
                        <div>拟开时间</div>
                        <div>{{planData.sailingtime}}</div>
                    </div>
                    <div>
                        <div>拟开班期</div>
                        <div>{{planData.days}}</div>
                    </div>
                    <div>
                        <div>拟开机型</div>
                        <div>{{planData.aircrfttyp}}</div>
                    </div>
                    <div>
                        <div>座位数</div>
                        <div>{{planData.seating}}</div>
                    </div>
                    <div>
                        <div>客量预期</div>
                        <div>{{planData.avgguestexpect}}</div>
                    </div>
                    <div>
                        <div>客座率预期</div>
                        <div>{{planData.loadfactorsexpect}}</div>
                    </div>
                    <div>
                        <div>补贴政策</div>
                        <div>{{planData.subsidypolicy}}</div>
                    </div>
                    <div>
                        <div>小时成本</div>
                        <div>{{planData.hourscost}}</div>
                    </div>
                     <div>
                        <div>运力归属</div>
                        <div>{{planData.capacitycompany}}</div>
                    </div>
                     <div>
                        <div>运力基地</div>
                        <div>{{planData.dpt}}</div>
                    </div>
                     <div>
                        <div>是否调度</div>
                        <div>{{planData.scheduling}}</div>
                    </div>
                    <div class="tips">
                        <div>其他说明</div>
                        <div>{{planData.remark}}</div>
                    </div>
                </div>

            </div>

        </div>
        <footer>
            <div class="buttons">
                <div class="btn btn-w cancel-btn">取消意向</div>
                <div class="btn btn-w col-btn">收藏</div>
            </div>
        </footer>
    </div>
</template>

<script>
 import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';
 export default {
     data(){
         return{
             planShow:true,
             planData:[],
             detailData:[],
             intentionCount:0,
             demandData:{}
         }
     },
     methods:{
         closeThisFn: function () {
             this.$emit('close-this');
         },
     },
      computed:{ },
      mounted:function(){
            tabulationBoxTrigger.$on('getdemandData', val => {
                this.demandData = val;
                if(this.demandData.responseId){
                     this.$ajax({
                          method: 'post',
                          url: '/capacityRoutesDemandDetailFindById',
                          headers: {
                              'Content-type': 'application/x-www-form-urlencoded'
                          },
                            params: {
                              demandId: this.demandData.demandId
                          }
                          })
                          .then((response) => {
                              this.intentionCount = response.data.intentionCount;
                              this.detailData = response.data.data;
                          })
                          .catch((error) => {
                                  console.log(error);
                              }
                          );
                     this.$ajax({
                          method: 'post',
                          url: '/changeIntentionMoneyStatusForResponse',
                          headers: {
                              'Content-type': 'application/x-www-form-urlencoded'
                          },
                            params: {
                              id:this.demandData.responseId,
                              intentionStatu:'0'

                          }
                      })
                          .then((response) => {
                             this.planData = response.data.data;
                             console.log(this.planData)

                          })
                          .catch((error) => {
                                  console.log(error);
                              }
                          );
                          }
                      });

      }

}
</script>

<style lang="scss" scoped>
    .btn-w {
        outline: none;
    }
    .plan-wrapper{
        position:absolute;
        top:0;
        right:0;
        z-index: 12;
        width:600px;
        box-sizing:border-box;
        height:100%;
        min-height: 700px;
        color:#605E7C;
        font-size: 1.2rem;
        overflow: hidden;
        overflow-y:scroll;
        background-color:#fff;
        header{
            width:100%;
            height:141px;
            background-color:rgba(216,216,216,.2);
        }
        footer{
          position:fixed;
          bottom:0;
          right:0px;
          width:600px;
          background-color:#fff;
          height:110px;
        }
    }
    header{
        .top-til{
          justify-content: space-between;
          display: flex;
          height:41px;
          line-height:41px;
          font-size:1.2rem;
          background-color:#fff;
          color:rgba(96, 94, 124, 0.7);
          padding:0 15px 0 40px;
          span{
            display:block;
            box-sizing:border-box;
            margin-top:9px;
            width:22px;
            height:22px;
            line-height:22px;
            text-align:center;
            border:1px solid #ededed;
            border-radius:100%;
            cursor:pointer;
          }
        }
        .head-til{
          font-size:20px;
          font-weight:bold;
          margin-top:30px;
          padding-left:40px;
          height:20px;
          line-height:20px;
        }
        .tips{
          height:12px;
          line-height:12px;
          color:rgba(96, 94, 124, 0.7);
          padding:20px 0 18px 40px;
          span{
            margin-right:30px;
          }
        }
    }
    .table-form{
      width:100%;
      box-sizing:border-box;
      padding:60px 0 40px 40px;
      flex-wrap: wrap;
      display: flex;
      >div{
          width:240px;
          height:40px;
          display: flex;
          >div{
              margin-bottom:20px;
              height:20px;
              line-height:20px;
          }
          >div:nth-of-type(1){
              width:80px;
              color:rgba(96, 94, 124, 0.7);
          }
          >div:nth-of-type(2){
              width:160px;
          }
      }
      >div:nth-of-type(odd){
          margin-right:40px;
      }
    }
    .myplan{
        margin-bottom:140px;
        .plan-til{
            height:80px;
            width:100%;
            display:flex;
            justify-content: space-between;
            background-color:rgba(216,216,216,.2);
            >div:nth-of-type(1){
             font-size:2rem;
             color:#605E7C;
             font-weight:bold;
             height:80px;
             line-height:80px;
             padding-left:40px;
          }
          >div:nth-of-type(2){
              width:70px;
              height:26px;
              line-height:26px;
              margin: 25px 30px 29px 0;
              color:#605E7C;
              text-align: center;
              border-radius:100px;
              background-color:#fff;
          }
        }
        .airline{
            display:flex;
            padding:20px 0 0 40px;
            margin: 0 40px;
            box-sizing:border-box;
            border-bottom:1px solid #ccc;
            >div:nth-of-type(odd){
                height:160px;
                width:140px;
            }
            >div:nth-of-type(even){
                height:160px;
                width:50px;
            }

        }
        .table-form{
            padding:40px 0 0 40px;
            .tips{
                width:100%;
                >div:nth-of-type(2){
                    width:440px;
                }
            }
        }
    }
      .airplace{
            margin-top:20px;
             >div:nth-of-type(2){
               height:45px;
               font-size:2rem;
               font-weight:bold;
               padding-top:15px;
               >div:nth-of-type(2){
                   font-size:1rem;
                   font-weight:normal;
               }
            }
              .resouse{
              margin:20px 0;
            }
        }
    footer{
        border-top: 1px solid #ccc;
          .buttons{
              display: flex;
              justify-content: center;
              height:40px;
              margin-top:30px;
              >div{
                  height:40px;
                  line-height:40px;
                  font-size:1.5rem;
                  color:#605E7C;
                  background-color:#fff;
                  text-align:center;
                  border-radius:100px;
                  cursor:pointer;
              }
              .cancel-btn{
                  width:100px;
                  margin-right:10px;
              }
               .col-btn{
                  width:80px;
              }
          }
    }
</style>
