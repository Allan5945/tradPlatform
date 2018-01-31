<template>
    <div>
      <div class="plan-wrapper scroll" v-if="responseShow">
          <header>
              <div class="top-til">{{detailData.demandtypeStr||'-'}}详情<span @click="closeDetail" class="iconfont close">&#xe62c;</span></div>
              <div class="head-til">{{detailData.title||'-'}}运力投放</div>
              <div class="tips">
                  <span>创建于{{detailData.releasetime||'-'}}</span>
                  <span>已有{{intentionCount||'0'}}位用户发起意向</span>
              </div>
              <div class="chatBox" v-if="chatShow" @click="toChat">发起对话</div>
          </header>
          <div class="content">
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
                      <div>小时成本</div>
                      <div>{{detailData.hourscost||'-'}}万/小时</div>
                  </div>
                   <div>
                      <div>运力基地</div>
                      <div>{{detailData.dptNm||'-'}}</div>
                  </div>
                  <div>
                      <div>接受调度</div>
                      <div class="schedul-airpot" style="width:120px;"
                            v-if="detailData.scheduling == '0'"
                          @mouseover="schedulListShow = true" @mouseout="schedulListShow = false">
                          <span v-for=" item in detailData.airportForSchedulines">{{item.airlnCd||'-'}}</span>
                      </div>
                      <div v-else>不接受</div>
                      <div class="list-wrapper" v-show="schedulListShow" v-if="detailData.scheduling == '0'">
                          <span v-for=" item in detailData.airportForSchedulines">{{item.airlnCd||'-'}}/</span>
                      </div>
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
                  <div>
                      <div>有效期</div>
                      <div v-if="detailData.periodValidity">{{detailData.periodValidity.split('-')[1]||'-'}}止</div>
                  </div>
                  <div class="note">
                      <div>其他说明</div>
                      <div>{{detailData.remark||'-'}}</div>
                  </div>
              </div>
              <div class="myplan">
                  <div class="plan-til">
                      <div>我发出的方案<span>{{planState}}</span></div>
                      <div style="cursor:pointer;" @click="getSureForm" v-if="editShow"><span class="iconfont" style="font-size:1.6rem;">&#xe653;</span>编辑</div>
                  </div>
                  <div class="airline">
                      <div class="airplace">
                          <div v-if="planData.dptState =='0' ">始发机场</div>
                          <div v-else>始发区域</div>
                          <div>
                             <div>{{planData.dptNm||'-'}}</div>
                             <div v-if="planData.dptState =='0' ">{{planData.dptAcceptnearairportStr||'-'}}临近机场</div>
                          </div>
                           <div class="resouse" v-if="planData.dptState =='0' ">
                              <div>出港资源</div>
                              <div v-if="planData.dptTimeresources == '0'">{{planData.dptTime||'-'}}</div>
                              <div v-else>{{planData.dptTimeresourcesStr||'-'}}</div>
                          </div>
                      </div>
                      <div style="padding-top:60px;"><span class="iconfont">&#xe672;</span></div>
                      <div class="airplace">
                          <div v-if="planData.pstState =='0' ">经停机场</div>
                          <div v-else>经停区域</div>
                          <div>
                            <div>{{planData.pstNm||'-'}}</div>
                            <div v-if="planData.pstState =='0' ">{{planData.pstAcceptnearairportStr||'-'}}临近机场</div>
                          </div>
                          <div class="resouse" v-if="planData.pstState =='0' ">
                              <div>出港资源</div>
                              <div v-if="planData.pstTimeresources == '0'">{{planData.pstTime||'-'}}</div>
                              <div v-else>{{planData.pstTimeresourcesStr||'-'}}</div>
                          </div>
                      </div>
                      <div style="padding-top:60px;"><span class="iconfont">&#xe672;</span></div>
                      <div class="airplace">
                          <div v-if="planData.arrvState =='0' ">到达机场</div>
                          <div v-else>到达区域</div>
                          <div>
                            <div>{{planData.arrvNm||'-'}}</div>
                            <div v-if="planData.arrvState =='0' ">{{planData.arrvAcceptnearairportStr||'-'}}临近机场</div>
                          </div>
                          <div class="resouse" v-if="planData.arrvState =='0' ">
                              <div>出港资源</div>
                              <div v-if="planData.arrvTimeresources == '0'">{{planData.arrvTime||'-'}}</div>
                              <div v-else>{{planData.arrvTimeresourcesStr||'-'}}</div>
                          </div>
                      </div>
                  </div>
                  <div class="table-form">
                       <div>
                          <div>联系人</div>
                          <div>{{planData.contact||'-'}}</div>
                      </div>
                      <div>
                          <div>联系方式</div>
                          <div>{{planData.ihome||'-'}}</div>
                      </div>
                      <div>
                          <div>拟开时间</div>
                          <div>{{planData.sailingtime||'-'}}</div>
                      </div>
                      <div>
                          <div>拟开班期</div>
                          <div>{{planData.days||'-'}}</div>
                      </div>
                      <div>
                          <div>拟开机型</div>
                          <div>{{planData.aircrfttyp||'-'}}</div>
                      </div>
                      <div>
                          <div>座位数</div>
                          <div>{{planData.seating||'-'}}人</div>
                      </div>
                      <div>
                          <div>客量预期</div>
                          <div>{{planData.avgguestexpect||'-'}}人</div>
                      </div>
                      <div>
                          <div>客座率预期</div>
                          <div>{{planData.loadfactorsexpect||'-'}}%</div>
                      </div>
                      <div>
                          <div>补贴政策</div>
                          <div>{{planData.subsidypolicyStr||'-'}}</div>
                      </div>
                      <div>
                          <div>小时成本</div>
                          <div>{{planData.hourscost||'-'}}万元/小时</div>
                      </div>
                       <div>
                          <div>运力归属</div>
                          <div v-if="planData.capacityCompany">{{planData.capacityCompany.airlnCd||'-'}}</div>
                      </div>
                       <div>
                          <div>运力基地</div>
                          <div>{{planData.capacityBaseNm||'-'}}</div>
                      </div>
                       <div class="note">
                          <div>是否调度</div>
                          <div v-if="planData.scheduling == '0' ">
                          <span v-for=" item in planData.airportForSchedulines">{{item.airlnCd||'-'}}</span>
                          </div>
                          <div v-else>不接受</div>
                      </div>
                      <div class="note">
                          <div>其他说明</div>
                          <div>{{planData.remark||'-'}}</div>
                      </div>
                  </div>

              </div>

          </div>
          <footer v-show="orderComplete">
              <div class="btn">
                  <div class="order" >已生成订单，无法更改</div>
              </div>
          </footer>
          <footer  v-if="footShow">
              <div class="btn" v-if="confirmShow">
                  <div class="cancel-btn"  @click="confirm">确认方案</div>
                  <div class="refuse-btn" @click="refuse">拒绝并撤回</div>
              </div>
              <div class="btn" v-else>
                  <div class="intent-btn"  @click="toIntent" v-if="withdraw">重新发起意向</div>
                  <div class="cancel-btn"  @click="cancelIntent" v-else>取消意向</div>
                  <div class="col-btn cancel " @click="cancelCollect" v-if="isCollect"
                  @mouseover="changeText(1)" @mouseout="changeText(2)">{{text}}</div>
                  <div class="col-btn" @click="collect" v-else>收藏</div>
              </div>
          </footer>
      </div>
     <needDetail  v-if="needShow"  @closeDetail= "closeDetail" :needData="needData"></needDetail>
    <sureForm v-if="sureFormShow" @close-this="closeSureForm" :acceptData = "planData" @refresh = "refresh"></sureForm>
    <reIntentForm v-if="reFormShow" @sumitForm="dialog = true" @close-this="closeReForm" :acceptData = "planData"></reIntentForm>
    <intentForm v-if="intentFormShow" @sumitForm="dialog = true" @closeForm="closeForm" :acceptData="detailData"></intentForm>
    <transDialog v-show="dialog"  @cancel="closeDialog" @sure="sureDialog"></transDialog>
    <paySuccess v-show="payDialog" @cancel="closePaySuccess" ></paySuccess>

    </div>
</template>

<script>
 import * as vx from 'vuex';
 import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js'
 import ln from '$src/public/js/tabulationBoxTrigger'
 /*import sureForm from './sureForm1.vue'*/
 import sureForm from './../mine/myIntention/myPurposeEdit.vue'
 import reIntentForm from './reIntentForm.vue'
 import intentForm from './intentForm.vue'
 import transDialog from './transDialog.vue'
 import paySuccess  from './paySuccess.vue'
 import needDetail from './needDetail.vue'

 export default {
     data(){
         return{
             needShow:false,
             planShow:true,
             isCollect:false,
             sureFormShow:false,
             editShow:true,
             withdraw:false,
             intentFormShow:false,
             dialog:false,
             payDialog:false,
             reFormShow:false,
             footShow:true,
             orderComplete:false,
             chatShow:true,
             confirmShow:false,
             schedulListShow:false,
             responseShow:false,
             planData:{},
             detailData:{},
             intentionCount:0,
             text:'已收藏',
             planState:'',
             needData:{}
         }
     },
     props:['demandId'],
      components: {
            sureForm,
            intentForm,
            transDialog,
            paySuccess,
            reIntentForm,
            needDetail
        },
      watch:{
          'demandId':function(){
             //console.log(this.demandId)
             this.getNeedDetail();
          }
        },
     methods:{
         toChat:function(){
            let chatData = {};
            chatData.id = this.detailData.id;
            chatData.employeeId = this.detailData.employeeId;
            chatData.demandEmployeeId = this.planData.employeeId;
            ln.$emit('addChat',chatData);
         },
         closeDetail:function(){
          this.$emit('responseClose');
         },
         getSureForm:function(){
          this.sureFormShow = true;
         },
        closeSureForm(){
          this.sureFormShow = false;
        },
        refresh(){
          this.sureFormShow = false;
          this.responseShow =false;
          this.$nextTick(() => {
             this.responseShow =true;
             this.getNeedDetail();
          });
        },
         cancelIntent:function(){
          this.$ajax({
                method: 'post',
                url: '/ResponseDel',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    id: this.planData.id,
                    demandId: this.planData.demandId
                }
                })
                .then((response) => {
                  if(response.data.opResult == "0"){
                    //alert("取消意向成功！")
                    this.$emit('responseClose');
                  }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
         },
         toIntent:function(){
             this.reFormShow = true;
         },
         confirm:function(){
          this.$ajax({
                method: 'post',
                url: '/selectedResponse',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    id: this.planData.id,
                    demandId: this.planData.demandId,
                    employeeId:this.planData.employeeId,
                    responseselected: '0',
                    releaseselected: '0'
                }
                })
                .then((response) => {
                  if(response.data.opResult == "0"){
                    //alert("确认方案成功！")
                    this.$emit('responseClose');
                  }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
         },
         refuse:function(){
            this.$ajax({
                method: 'post',
                url: '/selectedResponse',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    id: this.planData.id,
                    demandId: this.planData.demandId,
                    employeeId:this.planData.employeeId,
                    responseselected: '1',
                    releaseselected: '0'
                }
                })
                .then((response) => {
                  if(response.data.opResult == "0"){
                    //alert("撤回方案成功！")
                    this.$emit('responseClose');
                  }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
         },
         collect:function(){
             this.$ajax({
                method: 'post',
                url: '/addCollect',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    demandIds:this.planData.demandId
                }
                })
                .then((response) => {
                  if(response.data.opResult == "0"){
                    //alert("收藏成功！")
                    this.isCollect = true;
                  }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
         },
          cancelCollect:function(){
            this.$ajax({
                method: 'post',
                url: '/delCollectByDemandId',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    demandId:this.planData.demandId
                  }
                })
                .then((response) => {
                     if(response.data.opResult == "0"){
                      this.isCollect = false;
                  }
                })
                .catch((error) => {
                         console.log(error);
                    }
                );
         },
         changeText:function(i){
            if(i == '1'){
              this.text = "取消收藏";
            }else{
              this.text = "已收藏";
            }
         },
         closeForm:function(){
            this.intentFormShow = false;
         },
         closeReForm:function(){
             this.reFormShow = false;
         },
         closeDialog:function(){
            this.dialog = false;
         },
         sureDialog:function(){
            this.reFormShow = false;
            this.payDialog = true;
         },
         closePaySuccess:function(){
            this.payDialog = false;
            this.$emit('responseClose');
        },
        getNeedDetail(){
                this.$ajax({
                    method: 'post',
                    url: '/capacityRoutesDemandDetailFindById',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                      params: {
                        demandId: this.demandId
                    }
                })
                .then((response) => {
                  if(response.data.opResult == '0'){
                      this.needData = response.data;
                      if(response.data.receiveIntention == null){
                            this.needShow = false;
                            this.responseShow = false;
                            this.$nextTick(() => {
                             this.needShow = true;
                            });
                      }else if(response.data.receiveIntention !== null){
                          this.responseShow = true;
                          this.needShow = false;
                          this.init();
                      }
                  }
                 })
                .catch((error) => {
                        console.log(error);
                 });
           },
        init:function(){
                        this.intentionCount = this.needData.intentionCount;
                        this.detailData = this.needData.data;
                        this.planData = this.needData.receiveIntention;
                        //选定状态无法编辑
                        if(this.planData.responseselected == '0'||this.planData.releaseselected == '0'){
                            this.editShow = false;
                        }
                        //已撤回,意向征集，已落选,订单完成,需求关闭,交易完成/佣金支付，订单确认
                        let progress = this.planData.responseProgress;
                        if(progress == '2'){
                          this.editShow = false;
                          this.chatShow = false;
                          this.withdraw = true;
                          this.planState = "（已撤回）";
                          this.footShow = true;
                          this.orderComplete = false;
                          this.confirmShow = false;
                        }else if(progress == '0'){
                            this.editShow = true;
                            this.chatShow = true;
                            this.withdraw = false;
                            this.planState = " ";
                            this.footShow = true;
                            this.orderComplete = false;
                            this.confirmShow = false;
                        }else if(progress == '4'){
                            this.editShow = false;
                            this.chatShow = false;
                            this.footShow = false;
                            this.withdraw = false;
                            this.planState = "（已落选）";
                            this.orderComplete = false;
                            this.confirmShow = false;
                        }else if(progress == '6'){
                            this.editShow = false;
                            this.footShow = false;
                            this.chatShow = true;
                            this.planState = " ";
                            this.withdraw = false;
                            this.orderComplete = true;
                            this.confirmShow = false;
                        }else if(progress == '3'){
                            this.editShow = false;
                            this.footShow = false;
                            this.chatShow = false;
                            this.withdraw = false;
                            this.planState = " ";
                            this.orderComplete = false;
                             this.confirmShow = false;
                        }else if(progress == '5'||progress == '7'){
                            this.editShow = false;
                            this.footShow = false;
                            this.chatShow = true;
                            this.withdraw = false;
                            this.planState = " ";
                            this.orderComplete = false;
                            this.confirmShow = false;
                        }else if(progress == '1'){
                            this.confirmShow = true;
                            this.editShow = false;
                            this.footShow = true;
                            this.chatShow = true;
                            this.withdraw = false;
                            this.planState = " ";
                            this.orderComplete = false;
                        }

                        //是否收藏
                        if(this.needData.isAlreadyCollect == true){
                            this.isCollect = true;
                        }else if(this.needData.isAlreadyCollect == false){
                           this.isCollect = false;
                        }

        }

     },
      computed:{
         ...vx.mapGetters([
                'role'
            ])
      },
       mounted() {
          this.getNeedDetail();
     },

}
</script>

<style lang="scss" scoped>
    .plan-wrapper{
        position:absolute;
        top:0;
        right:0;
        z-index: 16;
        width:600px;
        box-sizing:border-box;
        height:100%;
        color:#605E7C;
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
          right:0;
          width:600px;
          background-color:#fff;
          height:100px;
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
        .chatBox{
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
          position:relative;
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
          .schedul-airpot{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          span{
            margin-right:10px;
          }
          .list-wrapper {
            position: absolute;
            top: 20px;
            left: 25px;
            display: flex;
            flex-wrap: wrap;
            padding: 10px;
            width: 200px;
            height:50px;
            background: white;
            border-radius: 4px;
            box-shadow: 0 2px 11px rgba(96,94,124,0.37);
            z-index: 3;
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
      .note{
          width:100%;
          >div:nth-of-type(2){
              width:440px;
          }
      }
    }
    .myplan{
        &::after {
            display: block;
            height: 140px;
            content: '';
        }
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

    .close{
        color:#3c78ff;
    }
    footer{
        border-top: 1px solid #ccc;
          .btn{
              height:40px;
              margin:20px 0 40px 0;
              >div{
                  height:40px;
                  line-height:40px;
                  font-size:1.5rem;
                  color:#605E7C;
                  background-color:#fff;
                  text-align:center;
                  border-radius:100px;
                  cursor:pointer;
                  box-shadow: 1px 2px 18px rgba(60, 120, 255,0.5);
                  &:hover{
                    background-color:#3c78ff;
                    color:#fff;
                  }
              }
              .cancel-btn{
                  width:100px;
                  margin-right:10px;
              }
              .intent-btn{
                  width:180px;
                  color:#fff;
                  margin-right:10px;
                  background-color:#3c78ff;
              }
               .col-btn{
                  width:80px;
              }
              .cancel{
                  color:#fff;
                  background-color:#3c78ff;

              }
              .refuse-btn{
                  width:100px;
              }
              .order{
                width:200px;
              }
          }
    }
</style>
