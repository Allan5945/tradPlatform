<template>
    <div class="detail-wrapper">
         <header>
             <div class="top-til">{{detailData.demandtypeStr||'-'}}详情<span  class="iconfont" @click="closeDetail">&#xe62c;</span></div>
             <div class="head-til">{{detailData.title||'-'}}</div>
             <div class="tips">
                 <div style="width:156px;">创建于{{detailData.releasetime||'-'}}</div>
                 <div style="width:120px;">状态：<span>{{detailData.demandprogressStr||'-'}}</span></div>
                 <div style="width:237px;">关联需求：
                    <div class="back-link" @click="toBack">
                      <span class="til">{{title}}</span>
                      <span class="iconfont">&#xe679;</span>
                    </div>
                </div>
             </div>
          </header>
         <div class="intent">
              <div class="intent-detail" v-if="sonAirlineShow">
                        <div class="airline">
                                <div class="airplace">
                                    <div v-if="detailData.dptState =='0' ">始发机场</div>
                                    <div v-else>始发区域</div>
                                    <div>
                                        <div v-if="detailData.dptState =='0' ">{{detailData.dptNm||'-'}}</div>
                                        <div v-else>{{detailData.dpt||'-'}}</div>
                                        <div v-if="detailData.dptState =='0' ">{{detailData.dptAcceptnearairportStr||'-'}}临近机场</div>
                                    </div>
                                    <div class="resouse" v-if="detailData.dptState =='0' ">
                                        <div>出港资源</div>
                                        <div v-if="detailData.dptTimeresources == '0'">{{detailData.dptTime||'-'}}</div>
                                        <div v-else>{{detailData.dptTimeresourcesStr||'-'}}</div>
                                    </div>
                                </div>
                                <div style="padding-top:58px;"><span class="iconfont">&#xe672;</span></div>
                                <div class="airplace">
                                    <div v-if="detailData.pstState =='0' ">经停机场</div>
                                    <div v-else>经停区域</div>
                                    <div>
                                        <div v-if="detailData.pstState =='0' ">{{detailData.pstNm||'-'}}</div>
                                        <div v-else>{{detailData.pst||'-'}}</div>
                                         <div v-if="detailData.pstState =='0' ">{{detailData.pstAcceptnearairportStr||'-'}}临近机场</div>
                                    </div>
                                    <div class="resouse" v-if="detailData.pstState =='0' ">
                                        <div>出港资源</div>
                                        <div v-if="detailData.pstTimeresources == '0'">{{detailData.pstTime||'-'}}</div>
                                        <div v-else>{{detailData.pstTimeresourcesStr||'-'}}</div>
                                    </div>
                                </div>
                                <div style="padding-top:58px;"><span class="iconfont">&#xe672;</span></div>
                                <div class="airplace">
                                    <div v-if="detailData.arrvState =='0' ">到达机场</div>
                                    <div v-else>到达区域</div>
                                    <div>
                                        <div v-if="detailData.arrvState =='0' ">{{detailData.arrvNm||'-'}}</div>
                                        <div v-else>{{detailData.arrv||'-'}}</div>
                                        <div v-if="detailData.arrvState =='0' ">{{detailData.arrvAcceptnearairportStr||'-'}}临近机场</div>
                                    </div>
                                    <div class="resouse" v-if="detailData.arrvState =='0' ">
                                        <div>出港资源</div>
                                        <div v-if="detailData.arrvTimeresources == '0'">{{detailData.arrvTime||'-'}}</div>
                                        <div v-else>{{detailData.arrvTimeresourcesStr||'-'}}</div>
                                    </div>
                                </div>
                            </div>
                        <div class="table-form">
                                <div>
                                    <div>联系人</div>
                                    <div>{{detailData.contact||'-'}}</div>
                                </div>
                                <div>
                                    <div>联系方式</div>
                                    <div>{{detailData.iHome||'-'}}</div>
                                </div>
                                <div>
                                    <div>拟开时间</div>
                                    <div>{{detailData.sailingtime||'-'}}</div>
                                </div>
                                <div>
                                    <div>拟开班期</div>
                                    <div>{{detailData.days||'-'}}</div>
                                </div>
                                <div>
                                    <div>拟开机型</div>
                                    <div>{{detailData.aircrfttyp||'-'}}</div>
                                </div>
                                <div>
                                    <div>座位数</div>
                                    <div>{{detailData.seating||'-'}}</div>
                                </div>
                                <div>
                                    <div>客量期望</div>
                                    <div>{{detailData.avgguestexpect||'-'}}人/均班</div>
                                </div>
                                <div>
                                    <div>客座率期望</div>
                                    <div>{{detailData.loadfactorsexpect||'-'}}%</div>
                                </div>
                                <div>
                                    <div>补贴政策</div>
                                    <div>{{turnPolicyCode(detailData.subsidypolicy)||'-'}}</div>
                                </div>
                                <div>
                                    <div>有效期</div>
                                    <div v-if="detailData.periodValidity">{{detailData.periodValidity.split('-')[1]||'-'}}止</div>
                                </div>
                                <div class="tips">
                                    <div>其他说明</div>
                                    <div>{{detailData.remark||'-'}}</div>
                                </div>
                        </div>
              </div>
              <div class="intent-detail" v-if="sonTranShow">
                        <div class="trans-content">
                            <div>
                                <div>联系人</div>
                                <div>{{detailData.contact||'-'}}</div>
                            </div>
                            <div>
                                <div>联系方式</div>
                                <div>{{detailData.iHome||'-'}}</div>
                            </div>
                            <div>
                                <div>机型</div>
                                <div>{{detailData.aircrfttyp||'-'}}</div>
                            </div>
                             <div>
                                <div>座位布局</div>
                                <div>{{detailData.seating||'-'}}</div>
                            </div>
                            <div>
                                <div>运力归属</div>
                                <div v-if="detailData.capacityCompany">{{detailData.capacityCompany.airlnCd||'-'}}</div>
                            </div>
                             <div>
                                <div>运力基地</div>
                                <div>{{detailData.dptNm||'-'}}</div>
                            </div>
                            <div >
                                <div>出港时刻</div>
                                <div>{{detailData.dptTime||'-'}}</div>
                            </div>
                            <div>
                                <div>班期</div>
                                <div>{{detailData.days||'-'}}</div>
                            </div>
                           <div class="intent-airline" v-if="detailData.intendedAirlines">
                               <div>意向航线</div>
                               <div class="i-line">
                                 {{detailData.intendedAirlines[0].dptName||'-'}}<span class="iconfont">&#xe672;</span>
                                 {{detailData.intendedAirlines[0].pstName||'-'}}<span class="iconfont">&#xe672;</span>
                                 {{detailData.intendedAirlines[0].arrvName||'-'}}
                               </div>
                           </div>
                           <div class="intent-airline" v-else>
                               <div>意向航线</div>
                               <div class="i-line">-</div>
                           </div>
                            <div>
                                <div>小时成本</div>
                                <div>{{detailData.hourscost||'-'}}万/小时</div>
                            </div>
                            <div style="margin:0 0 0 40px;">
                                <div>接受调度</div>
                                <div>{{detailData.schedulingStr||'-'}}</div>
                            </div>
                            <div>
                                <div>有效期</div>
                                <div>{{detailData.periodValidity.split('-')[1]||'-'}}止</div>
                            </div>
                            <div class="note">
                                <div>其他说明</div>
                                <div class="note-text">{{detailData.remark||'-'}}</div>
                            </div>
                        </div>
              </div>
        </div>
        <myResponseList :responseData="responseData" :intentionCount="intentionCount" :detailData="detailData"></myResponseList>
        <footer v-if="btnShow">
            <div class="btn" @click="closeNeed">结束需求</div>
        </footer>
    </div>
</template>
<script>
  import ln from './../../../../public/js/tabulationBoxTrigger';
  import * as vx from 'vuex'
  import myResponseList from './myResponseList'

    export default {
        data () {
            return{
              intentionCount:'',
              sonAirlineShow:false,
              sonTranShow:false,
              btnShow:true,
              detailData:{},
              responseData:[]
            }
        },
        props:['sonId','title'],
        computed:{
         ...vx.mapGetters([
                'role'
            ])
        },
        components: {
          myResponseList
        },
        methods:{
             turnPolicyCode:function(val){
                switch (val) {
                    case "0":
                        return "定补";
                        break;
                    case "1":
                        return "保底";
                        break;
                    case "2":
                        return "人头补";
                        break;
                    case "3":
                        return "待议";
                        break;
                    case "4":
                        return "无补贴";
                        break;
                }
            },
            closeDetail:function(){
                this.$emit("closeDetail");
            },
            toBack:function(){
                this.$emit("toBack");
            },
            closeNeed:function(){
               this.$ajax({
                method: 'post',
                url: '/closeDemandById',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    id:this.detailData.id
                }
                })
                .then((response) => {
                    if(response.data.opResult == "0"){
                    //alert("取消需求成功!")
                     this.$emit('closeDetail');
                  }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
          }
        },
        mounted(){
            this.$ajax({
                method: 'post',
                url: '/capacityRoutesDemandDetailFindById',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    demandId: this.sonId
                }
                })
                .then((response) => {
                    if(response.data.opResult == "004"|| response.data.receiveIntention == null){
                        //this.$emit('transShow');
                    }
                    this.intentionCount = response.data.intentionCount;
                    this.detailData = response.data.data;
                    this.responseData = response.data.responseList;

                    if(this.detailData.demandtype == '0'){
                      this.sonAirlineShow = true;
                    }else if(this.detailData.demandtype == '1'){
                      this.sonTranShow = true;
                    }

                    if(this.detailData.demandprogress == '3'){
                        this.btnShow = false;
                    }

                })
                .catch((error) => {
                        console.log(error);
                    }
                );
        }
    }
</script>

<style scoped lang="scss">
    .detail-wrapper{
        position:absolute;
        top:0;
        right:0;
        z-index: 20;
        width:607px;
        height:100%;
        min-height:600px;
        color:#605E7C;
        font-size:1.2rem;
        overflow: hidden;
        overflow-y:scroll;
        background-color:#fff;
        &::after {
            display: block;
            height: 160px;
            content: '';
        }
        header{
            width:100%;
            height:141px;
            background-color:rgba(216,216,216,.17);
            position:relative;
        }
        footer{
          position:fixed;
          bottom:0;
          right:0;
          width:600px;
          height:120px;
          background-color:#fff;
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
          position:relative;
          height:12px;
          line-height:12px;
          color:rgba(96, 94, 124, 0.7);
          padding:20px 0 18px 40px;
          display:flex;
          >div{
            margin-right:18px;
            overflow:hidden;
            display:flex;
          }
          .back-link{
            display:flex;
          }
          span{
            color:#3c78ff;
            cursor:pointer;
          }
          .iconfont{
            font-size:2.0rem;
          }
        }
    }
    .intent{
        .airline{
            display:flex;
            margin: 40px 40px 0 40px;
            border-bottom:1px solid #ccc;
            box-sizing:border-box;
            >div:nth-of-type(odd){
                height:160px;
                width:140px;
            }
            >div:nth-of-type(even){
                height:160px;
                width:50px;
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
     .table-form{
          width:100%;
          box-sizing:border-box;
          padding:40px 0 40px 40px;
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
          .tips{
                width:100%;
                height:60px;
                >div:nth-of-type(2){
                    width:440px;
                }
            }
     }
         //运力详情样式
    .trans-content{
      padding:40px 40px 0 40px;
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
      .note{
          width:520px;
          height:60px;
          .note-text{
             width:440px;
          }
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
      .btn{
          margin:0 auto;
          width:180px;
          height:40px;
          margin-top:40px;
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
</style>


