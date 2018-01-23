<template>
    <div class="wrapper" @click.self="closeDetail">
        <div class="detail-wrapper scroll" v-if="myShow">
            <header>
                <div class="top-til">{{detailData.demandtypeStr||'-'}}详情<span  class="iconfont" @click="closeDetail">&#xe62c;</span></div>
                <div class="head-til">{{detailData.title||'-'}}</div>
                <div class="contact" @click="chat">联系用户</div>
                <div class="tips">
                    <div>委托方&nbsp;{{CpyNm||'-'}}</div>
                    <div>创建于{{detailData.releasetime||'-'}}</div>
                    <div><span>{{getProgress(detailData.demandprogress)}}</span></div>
                </div>
            </header>
            <div class="airline-content" v-if="isAirline">
                <div class="airline">
                    <div class="air-box">
                        <div v-if="detailData.dptState =='0' ">始发机场</div>
                        <div v-else>始发区域</div>
                        <div  class="place">
                            <div v-if="detailData.dptState =='0' ">{{detailData.dptNm||'-'}}</div>
                            <div v-else>{{detailData.dpt||'-'}}</div>
                            <div v-if="detailData.dptState =='0' ">{{detailData.dptAcceptnearairportStr||'-'}}临近机场</div>
                        </div>
                        <div v-if="detailData.dptState =='0' ">
                            <div>出港资源</div>
                            <div v-if="detailData.dptTimeresources == '0'">{{detailData.dptTime||'-'}}</div>
                            <div v-else>{{detailData.dptTimeresourcesStr||'-'}}</div>
                       </div>
                    </div>
                    <div style="padding:58px 30px 0 0;"><span class="iconfont" style="font-size:3rem;">&#xe672;</span></div>
                    <div class="air-box">
                        <div v-if="detailData.pstState =='0' ">经停机场</div>
                        <div v-else>经停区域</div>
                        <div  class="place">
                            <div v-if="detailData.pstState =='0' ">{{detailData.pstNm||'-'}}</div>
                            <div v-else>{{detailData.pst||'-'}}</div>
                            <div v-if="detailData.pstState =='0' ">{{detailData.pstAcceptnearairportStr||'-'}}临近机场</div>
                        </div>
                        <div v-if="detailData.pstState =='0' ">
                            <div>出港资源</div>
                            <div v-if="detailData.pstTimeresources == '0'">{{detailData.pstTime||'-'}}</div>
                            <div v-else>{{detailData.pstTimeresourcesStr||'-'}}</div>
                       </div>
                    </div>
                    <div style="padding:58px 30px 0 0;"><span class="iconfont" style="font-size:3rem;">&#xe672;</span></div>
                    <div class="air-box">
                        <div v-if="detailData.arrvState =='0' ">到达机场</div>
                        <div v-else>到达区域</div>
                        <div class="place">
                            <div v-if="detailData.arrvState =='0' ">{{detailData.arrvNm||'-'}}</div>
                            <div v-else>{{detailData.arrv||'-'}}</div>
                            <div v-if="detailData.arrvState =='0' ">{{detailData.arrvAcceptnearairportStr||'-'}}临近机场</div>
                        </div>
                        <div v-if="detailData.arrvState =='0' ">
                            <div>出港资源</div>
                            <div v-if="detailData.arrvTimeresources == '0'">{{detailData.arrvTime||'-'}}</div>
                            <div v-else>{{detailData.arrvTimeresourcesStr||'-'}}</div>
                       </div>
                    </div>
                </div>
                <div class="content-box border">
                    <div >
                        <div>拟开时间</div>
                        <div>{{detailData.sailingtime||'-'}}</div>
                    </div>
                    <div>
                        <div>拟开班期</div>
                        <div>{{detailData.days||'-'}}</div>
                    </div>
                    <div>
                        <div>拟飞机型</div>
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
                        <div>{{turnPolicyCode(detailData.subsidypolicy)||'-' }}</div>
                    </div>
                    <div>
                        <div>有效期</div>
                        <div v-if="detailData.periodValidity">{{detailData.periodValidity.split('-')[1]||'-'}}止</div>
                    </div>
                    <div class="note">
                        <div>其他说明</div>
                        <div class="note-text">{{detailData.remark||'-'}}</div>
                    </div>
                </div>
                <div class="content-box ">
                    <div>
                        <div>联系人</div>
                        <div>{{detailData.contact||'-'}}</div>
                    </div>
                    <div>
                        <div>联系方式</div>
                        <div>{{detailData.iHome||'-'}}</div>
                    </div>
                </div>
            </div>
            <div class="trans-content" v-else>
                <div>
                    <div>联系人</div>
                    <div>{{detailData.contact||'-'}}</div>
                </div>
                <div class="padding-item">
                    <div>联系方式</div>
                    <div>{{detailData.iHome||'-'}}</div>
                </div>
                <div>
                    <div>机型</div>
                    <div>{{detailData.aircrfttyp||'-'}}</div>
                </div>
                 <div class="padding-item">
                    <div>座位布局</div>
                    <div>{{detailData.seating||'-'}}</div>
                </div>
                <div>
                    <div>运力归属</div>
                    <div v-if="detailData.capacityCompany">{{detailData.capacityCompany.airlnCd||'-'}}</div>
                </div>
                 <div class="padding-item">
                    <div>运力基地</div>
                    <div>{{detailData.dptNm||'-'}}</div>
                </div>
                <div>
                    <div>出港时刻</div>
                    <div>{{detailData.dptTime||'-'}}</div>
                </div>
                <div class="padding-item">
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
                <div class="padding-item">
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
            <div class="sub-need" v-show="orderShow">
                  <div class="need-til">关联的子需求</div>
                  <div class="need-btn" @click="newNeed">新建子需求</div>
            </div>
             <div class="son-need-list" v-if="sonListShow">
                <div class="intent-form">
                    <div class="intent-head">
                        <div>发布时间
                          <span class="iconfont icon-up active">&#xe605;</span>
                          <span class="iconfont icon-down">&#xe605;</span>
                        </div>
                        <div>发布标题</div>
                        <div class="need-til">需求状态</div>
                    </div>
                    <div class="intent-box" v-for="(val,index) in listSonDemands">
                         <div class="intent-item">
                            <div class="time">{{val.releasetime}}</div>
                            <div class="title">{{val.title}}</div>
                            <div class="progress">{{val.demandprogressStr}}</div>
                            <div class="detail" @click="getSonDetail(val)">查看详情</div>
                        </div>
                    </div>
                </div>
            </div>
             <footer v-if="isClose">
                <div class="foot-tips" v-if="tipShow">*拒绝原因：{{refuseText}}</div>
                <div class="btn" v-if="orderShow">
                    <div class="test-btn" @click="order" v-if="orderOver">订单完成</div>
                    <div class="can-btn canOper" @click="cancelDele" v-if="orderOver">取消委托</div>
                     <!-- <div class="can-btn canOper" @click="cancelDele" style="width:160px;" v-else>取消委托</div> -->
                </div>
                <div class="btn" v-else>
                    <div class="test-btn" @click="accept" v-if="!tipShow">接受委托</div>
                    <div class="can-btn" @click="refuse" v-if="!tipShow">拒绝</div>
                </div>
            </footer>
           <!--  <footer v-else>
               <div class="foot-tips" >*取消原因：{{refuseText}}</div>
           </footer> -->
        </div>
        <operDeleForm v-show="formShow" @closeForm="closeForm" ></operDeleForm>
        <sonNeedDetail :sonId = "sonId" :title="detailData.title" v-if="sondetailShow" @closeDetail="closeDetail" @toBack="toBack"></sonNeedDetail>
        <refuseDialog @sure="sureDialog" v-show="dialogShow" @cancel="cancelDialog" :msg='msg'></refuseDialog>
    </div>
</template>

<script>
import refuseDialog from './refuseDialog.vue';
import operDeleForm from './operDeleForm.vue'
import sonNeedDetail from './sonNeedDetail1.vue'
import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js'
import ln from './../../../../public/js/tabulationBoxTrigger';

 export default {
     data(){
         return{
            dialogShow:false,
            orderShow:false,
            formShow:false,
            isClose:true,
            detailData:{},
            CpyNm:'',//委托方
            sonListShow:true,
            sondetailShow:false,
            dialogShow:false,
            tipShow:false,
            orderOver:true,
            isAirline:true,
            myShow:true,
            listSonDemands:[],
            msg:'',
            refuseText:'',
            demandType:'',
            sonId:''

         }
     },
      props:['chatData'],
     methods:{
        chat:function () {
            ln.$emit('addChat',this.chatData);
        },
        closeDetail(){
          this.$emit("close");
        },
        refuse(){
          this.dialogShow = true;
          this.msg = "拒绝";
        },
        /*cancel(){
          this.dialogShow = true;
          this.msg = "取消";
        },*/
        newNeed(){
          this.formShow = true;
        },
        accept(){
             this.$ajax({
                method: 'post',
                url: '/checkCommissionedAndCustody',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    demandState:'0',
                    demandId:this.chatData.id,
                    demandEmployeeId:this.chatData.demandEmployeeId,
                    title:this.chatData.title,
                    demandType:this.chatData.demandType
                  }
                })
                .then((response) => {
                  if(response.data.opResult == '0'){
                   this.orderShow = true;
                  }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
        },
        order(){
             this.$ajax({
                method: 'post',
                url: '/finishCommissionedAndCustody',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    demandState:'0',
                    demandId:this.chatData.id,
                    demandEmployeeId:this.chatData.demandEmployeeId,
                    title:this.chatData.title,
                    demandType:this.chatData.demandType
                  }
                })
                .then((response) => {
                  if(response.data.opResult == '0'){
                    this.$emit("close");
                  }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
        },
        sureDialog(text){
            this.dialogShow = false;
            this.refuseText = text;
            if(this.msg == "拒绝"){
                this.refuseDele(text);
            }else if(this.msg == "取消"){
                this.cancelDele(text);
            }
        },
        cancelDialog(){
            this.dialogShow = false;
        },
        refuseDele(text){
             this.$ajax({
                method: 'post',
                url: '/checkCommissionedAndCustody',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    demandState:'1',
                    demandId:this.chatData.id,
                    demandEmployeeId:this.chatData.demandEmployeeId,
                    title:this.chatData.title,
                    demandType:this.chatData.demandType,
                    rek:text
                  }
                })
                .then((response) => {
                  if(response.data.opResult == '0'){
                   this.$emit("close");
                  }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
        },
        cancelDele(){
            this.$ajax({
                method: 'post',
                url: '/finishCommissionedAndCustody',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    demandState:'1',
                    demandId:this.chatData.id,
                    demandEmployeeId:this.chatData.demandEmployeeId,
                    title:this.chatData.title,
                    demandType:this.chatData.demandType,
                  }
                })
                .then((response) => {
                  if(response.data.opResult == '0'){
                   this.$emit("close");
                  }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
        },
        closeForm(){
          this.formShow =false;
          this.sonListShow = true;
        },
        turnPolicyCode(val){
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
        getProgress:function(progress){
            switch (progress) {
                case "0":
                    return "处理中";
                    break;
                case "1":
                    return "处理中";
                    break;
                case "2":
                    return "处理中";
                    break;
                case "4":
                    return "处理中";
                    break;
                case "5":
                    return "处理中";
                    break;
                case "3":
                    return "已关闭";
                    break;
                case "6":
                    return "已完成";
                    break;
                case "7":
                    return "待处理";
                    break;
                case "8":
                    return "已接受";
                    break;
                case "9":
                    return "处理中";
                    break;
                case "10":
                    return "已拒绝";
                    break;
                }
            },
        getSonDetail(val){
          this.sonId = val.id;
          this.myShow = false;
          this.sondetailShow = true;
        },
        toBack(){
          this.myShow = true;
          this.sondetailShow = false;
        }
     },
      mounted() {
          tabulationBoxTrigger.$emit('getSonId', this.chatData.id);
          tabulationBoxTrigger.hierarchy = true;
          this.$ajax({
                method: 'post',
                url: '/getCommissionedAndCustodyDemandDetails',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    id:this.chatData.id
                  }
                })
                .then((response) => {
                    this.CpyNm = response.data.CpyNm;
                    this.detailData = response.data.demandDetail;
                    this.listSonDemands = response.data.listSonDemands;
                     //状态处理
                      if(this.detailData.demandprogress == '0'||this.detailData.demandprogress == '1'||this.detailData.demandprogress == '2'||this.detailData.demandprogress == '4'||this.detailData.demandprogress == '5'){//子需求需求发布/意向征集/子订单确认/子订单完成/佣金支付
                          this.orderShow = true;
                          this.orderOver =true;
                      }else if(this.detailData.demandprogress == '6' ){//订单完成,最终完成（已完成）
                          this.orderShow = true;
                          this.isClose = false;
                      }else if(this.detailData.demandprogress == '9'){//处理中
                          this.orderShow = true;
                      }else if(this.detailData.demandprogress == '3'){//已关闭
                          this.isClose = false;
                          this.sonListShow = false;
                          //this.refuseText = this.detailData.rek;
                      }else if(this.detailData.demandprogress == '10'){//已拒绝
                          this.tipShow = true;
                          this.sonListShow = false;
                          this.refuseText = this.detailData.rek;
                      }else if(this.detailData.demandprogress == '7'){//待处理
                           this.sonListShow = false;
                      }

                      //显示运力或者航司详情
                      this.demandType = this.chatData.demandType;
                       if(this.demandType == '4'){
                            this.isAirline = false;
                        }else if(this.demandType == '3'){
                            this.isAirline = true;
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
     components: {
        operDeleForm,
        sonNeedDetail,
        refuseDialog
     }
}
</script>

<style lang="scss" scoped>
     /* .shadow{
         box-shadow: 0px 0px 15px #888;
     } */
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
        .airline-content{
            padding:40px 40px 0 40px;
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
        .contact{
            position:absolute;
            right:15px;
            top:60px;
            width:100px;
            height:20px;
            line-height:20px;
            color:#ffffff;
            text-align:center;
            background-color:#3c78ff;
            border-radius:100px;
            cursor:pointer;
            box-shadow: 1px 2px 18px rgba(60, 120, 255,0.5);
        }
        .tips{
          position:relative;
          height:12px;
          line-height:12px;
          color:rgba(96, 94, 124, 0.7);
          padding:20px 0 18px 40px;
          display:flex;
          div{
            margin-right:30px;
          }
          span{
            color:#3c78ff;
          }
        }
    }

    .airline{
      display:flex;
      margin-bottom:20px;
      justify-content: space-between;
      .air-box{
       width:140px;
       overflow:hidden;
        >div{
          margin-top:10px;
        }
        .place{
          height:45px;
          padding-bottom:20px;
          div:first-of-type{
            font-size:20px;
            font-weight:bold;
          }
        }
      }
    }

    .content-box{
      flex-wrap: wrap;
      display: flex;
      margin-bottom:20px;
      >div{
          width:240px;
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
      >div:nth-of-type(even){
          padding-left:40px;
          box-sizing:border-box;
      }
      >.note{
          width:520px;
          height:60px;
          .note-text{
            width:440px;
          }
      }
    }
    .border{
      padding-top:20px;
      border-top:1px solid #ccc;
      border-bottom:1px solid #ccc;
    }
    //运力详情样式
    .trans-content{
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
      >.padding-item{
          padding-left:40px;
          box-sizing:border-box;
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
    .sub-need{
      position:relative;
      width:100%;
      height:80px;
      margin-top:20px;
      background-color:rgba(216,216,216,.17);
      .need-til{
          height:80px;
          line-height:80px;
          margin-left:40px;
          font-size:20px;
          font-weight:bold;
      }
      .need-btn{
        position:absolute;
        top:20px;
        right:20px;
        width:100px;
         height:20px;
        line-height:20px;
        color:#ffffff;
        text-align:center;
        background-color:#3c78ff;
        border-radius:100px;
        cursor:pointer;
        box-shadow: 1px 2px 18px rgba(60, 120, 255,0.5);

      }
    }

     .intent-form{
            >.intent-head{
                position:relative;
                height:75px;
                width:100%;
                box-sizing:border-box;
                padding: 30px 0 25px 40px;
                >div{
                    display:inline-block;
                    width:80px;
                    padding-right:50px;
                }
                 .icon-up {
                    position: absolute;
                    bottom: 33px;
                    transform: rotate(180deg);
                }
                .icon-down {
                    position: absolute;
                    top: 33px;
                }
                .need-til{
                    margin-left:53px;
                }
            }
            .intent-box{
                 margin:0 20px 5px 20px;
                 border-radius:2px;
                 overflow:hidden;
                 background-color:rgba(216,216,216,.2);
            }
            .intent-item{
                display:flex;
                height:60px;
                line-height: 60px;
                .time{
                    margin:0 20px;
                   flex:1;
                    overflow:hidden;
                }
                .title{
                    flex:2;
                }
                .progress{
                    flex:1;
                }
                .detail{
                    flex:1;
                    color:#3C78FF;
                    cursor:pointer;
                }
            }

        }
    footer{
          border-top:1px solid #ccc;
          position:relative;
          .foot-tips{
            position:absolute;
            top:-30px;
            left:20px;
            color: red;
          }
          .btn{
              height:40px;
              margin:40px 0;
              .test-btn{
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
               .can-btn{
                  width:80px;
                  height:40px;
                  line-height:40px;
                  font-size:1.5rem;
                  color:rgba(96,94,124,.6);
                  background-color:#fff;
                  text-align:center;
                  border-radius:100px;
                  cursor:pointer;
                  box-sizing:border-box;
                  border:1px solid rgba(96,94,124,.6);
                   &:hover{
                    color:#fff;
                    background-color: #3C78FF;
                  }
              }
              .canOper{
                  width:100px;
              }
              .cancel-btn{
                  width:180px;
                  height:40px;
                  line-height:40px;
                  font-size:1.5rem;
                  color:rgba(96,94,124,.6);
                  background-color:#fff;
                  text-align:center;
                  border-radius:100px;
                  cursor:pointer;
                  border:1px solid rgba(96,94,124,.6);
                  box-shadow: 0px 0px 8px rgba(60, 120, 255,0.5);
                  &:hover{
                    color:#fff;
                    background-color: #3C78FF;
                  }
              }

          }
    }
</style>
