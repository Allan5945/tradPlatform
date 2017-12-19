<template>
    <div class="wrapper" @click.self="closeDetail">
        <div class="detail-wrapper"  v-if="detailData">
            <header>
                <div class="top-til">需求详情<span @click="closeDetail" class="iconfont">&#xe62c;</span></div>
                <div class="head-til">{{detailData.title}}</div>
                <div class="tips">
                    <span>创建于{{detailData.releasetime}}</span>
                    <span class="intent-count">已有{{intentionCount}}位用户发起意向</span>
                </div>
            </header>
            <div class="content airport">
                <div>
                <div>机型</div>
                <div>{{detailData.aircrfttyp}}</div>
                </div>
                 <div>
                    <div>座位布局</div>
                    <div>{{detailData.seating}}</div>
                </div>
                <div>
                    <div>运力归属</div>
                    <div>***</div>
                </div>
                 <div>
                    <div>运力基地</div>
                    <div>{{detailData.dptNm}}</div>
                </div>
                <div >
                    <div>出港时刻</div>
                    <div>{{detailData.dptTime}}</div>
                </div>
                <div>
                    <div>班期</div>
                    <div>{{detailData.days}}</div>
                </div>
               <div class="intent-airline" v-if="detailData.intendedAirlines">
                   <div>意向航线</div>
                   <div class="i-line">
                     {{detailData.intendedAirlines[0].dptName}}<span class="iconfont">&#xe672;</span>
                     {{detailData.intendedAirlines[0].pstName}}<span class="iconfont">&#xe672;</span>
                     {{detailData.intendedAirlines[0].arrvName}}
                   </div>
               </div>
                <div>
                    <div>小时成本</div>
                    <div>{{detailData.hourscost}}万/小时</div>
                </div>
                <div style="margin:0 0 0 40px;">
                    <div>接受调度</div>
                    <div>{{detailData.schedulingStr}}</div>
                </div>
                <div>
                    <div>有效期</div>
                    <div>{{detailData.periodValidity}}</div>
                </div>
            </div>
              <!-- <div class="airline">
                    <div class="airline-detail">
                        <div class="airline">
                            <div class="airplace">
                                <div>始发机场</div>
                                <div>
                                    <div>{{detailData.dpt}}</div>
                                    <div v-if="val.dptAcceptnearairport == 0">接受临近机场</div>
                                </div>
                                <div class="resouse">
                                    <div>出港资源</div>
                                    <div>{{detailData.dptTime}}</div>
                                </div>
                            </div>
                            <div style="padding-top:58px;"><span class="iconfont">&#xe672;</span></div>
                            <div class="airplace">
                                <div>经停机场</div>
                                <div>
                                    <div>{{detailData.pst}}</div>
                                    <div v-if="detailData.pstAcceptnearairport == 0">接受临近机场</div>
                                </div>
                                <div class="resouse">
                                    <div>出港资源</div>
                                    <div>{{detailData.pstTime}}</div>
                                </div>
                            </div>
                            <div style="padding-top:58px;"><span class="iconfont">&#xe672;</span></div>
                            <div class="airplace">
                                <div>到达区域</div>
                                <div>
                                    <div>{{detailData.arrv}}</div>
                                    <div v-if="detailData.arrvAcceptnearairport == 0">接受临近机场</div>
                                </div>
                                <div class="resouse">
                                    <div>出港资源</div>
                                    <div>{{detailData.arrvTime}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="table-form">
                            <div>
                                <div>拟开时间</div>
                                <div>{{detailData.sailingtime}}</div>
                            </div>
                            <div>
                                <div>拟开班期</div>
                                <div>{{detailData.days}}</div>
                            </div>
                            <div>
                                <div>拟飞机型</div>
                                <div>{{detailData.aircrfttyp}}</div>
                            </div>
                            <div>
                                <div>座位数</div>
                                <div>{{detailData.seating}}</div>
                            </div>
                            <div>
                                <div>客量期望</div>
                                <div>{{detailData.avgguestexpect}}人</div>
                            </div>
                            <div>
                                <div>客座率期望</div>
                                <div>{{detailData.loadfactorsexpect}}%</div>
                            </div>
                            <div>
                                <div>补贴政策</div>
                                <div>{{detailData.subsidypolicy}}</div>
                            </div>
                            <div>
                                <div>有效期</div>
                                <div>{{detailData.periodValidity}}</div>
                            </div>
                        </div>
                    </div>
              </div> -->
            <footer>
                <div>*隐藏信息在提交意向后可查看</div>
                <div class="btn">
                    <div class="intent-btn" @click="haveInvent"><span class="iconfont">&#xe62f;</span>我有意向</div>
                    <div class="col-btn" @click="cancelCollect">取消收藏</div>
                </div>
            </footer>
        </div>
      <!--  <intentForm v-show="intentFormShow" @closeForm="closeForm"></intentForm> -->
    </div>
</template>

<script>
  import * as vx from 'vuex';
 /* import intentForm from './../trans_detail/intentForm.vue'*/
  import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js'

  export default {
     data(){
         return{
             detailData:null,
             intentionCount:0,
             intentFormShow:false
         }
     },
     methods:{
         cancelCollect:function(){
            this.$ajax({
                method: 'post',
                url: '/delCollectByDemandId',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    demandId:this.demandId
                  }
                })
                .then((response) => {
                     this.$emit("closeDetail");
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
         },
         closeDetail:function(){
              this.$emit("closeDetail");
         },
         haveInvent:function(){
            this.intentFormShow = true;
         },
         closeForm:function(){
            this.intentFormShow = false;
         }
     },
    props:['demandId'],

    mounted() {
          tabulationBoxTrigger.hierarchy = true;
          let that =this;
          this.$ajax({
                method: 'post',
                url: '/capacityRoutesDemandDetailFindById',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    demandId:that.demandId
                  }
                })
                .then((response) => {
                    if(response){
                        that.intentionCount = response.data.intentionCount;
                        that.detailData = response.data.data;
                    } else{
                        that.detailData = null;
                        alert('暂无返回，请稍后重试。')
                    }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );

     },
    destroyed: function () {
        tabulationBoxTrigger.hierarchy = false;
    },
    components:{
        /*intentForm*/
     }
}
</script>

<style lang="scss" scoped>
     .wrapper{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.2);
        z-index: 11;
    }
    .detail-wrapper{
        position:absolute;
        top:0;
        right:0;
        z-index: 20;
        width:600px;
        height:100%;
        font-size:1.2rem;
        min-height:600px;
        color:#605E7C;
        background-color:#fff;
        header{
            width:100%;
            height:141px;
            background-color:rgba(216,216,216,.17);
        }
        footer{
          position:absolute;
          bottom:0;
          left:0;
          width:100%;
          height:140px;
        }
    }
    header{
        .top-til{
          justify-content: space-between;
          display: flex;
          height:41px;
          line-height:41px;
          color:rgba(96, 94, 124, 0.7);
          font-size:1.2rem;
          background-color:#fff;
          padding:0 15px 0 40px;
          span{
            display:block;
            box-sizing:border-box;
            margin-top:9px;
            width:22px;
            height:22px;
            line-height:22px;
            text-align:center;
            color:#3C78FF;
            border:1px solid #ededed;
            border-radius:100%;
            cursor:pointer;
          }
        }
        .head-til{
          font-size:2rem;
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
          .intent-count{
            color:#3c78ff;
          }
        }
    }
    .content{
      height:260px;
      padding:60px 40px 0 40px;
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
      .intent-airline{
          width:100%;
          .i-line{
              width:440px;
              margin-right:0;
              display: flex;
              .iconfont{
                display:block;
                margin:0 25px;
              }
          }
      }
    }
    footer{
        >div:nth-of-type(1){
              margin: 0 20px;
              padding-left:20px;
              height:40px;
              color:rgba(96, 94, 124, 0.7);
              box-sizing:border-box;
              border-bottom:1px solid #ccc;
          }
          .btn{
              height:40px;
              margin:18px 0 42px 0;
              >.intent-btn{
                  width:230px;
                  height:40px;
                  line-height:40px;
                  font-size:1.5rem;
                  color:#fff;
                  background-color:#3c78ff;
                  text-align:center;
                  border-radius:100px;
                  margin-right:10px;
                  cursor:pointer;
                  box-shadow: 1px 2px 18px rgba(60, 120, 255,0.5);
                  span{
                    font-size:1.8rem;
                    margin-right:15px;
                  }
              }
               >.col-btn{
                  width:100px;
                  height:40px;
                  line-height:40px;
                  font-size:1.5rem;
                  color:#605E7C;
                  background-color:#fff;
                  text-align:center;
                  border-radius:100px;
                  cursor:pointer;
                  box-shadow: 1px 2px 18px rgba(60, 120, 255,0.5);
              }
          }
    }
</style>
