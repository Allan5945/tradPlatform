<template>
    <div>
      <div class="plan-wrapper scroll" v-if="responseShow">
          <header>
              <div class="top-til">{{detailData.demandtypeStr||'-'}}详情<span @click="closeDetail" class="iconfont close">&#xe62c;</span></div>
              <div class="head-til">
                  <span style="height: 25px; max-width: 400px; overflow: hidden;">
                      <lonSpan :txt="myTitle"></lonSpan>
                  </span>
              </div>
              <div class="tips">
                  <span>创建于{{detailData.releasetime | split}}</span>
                  <span>已有{{intentionCount||'0'}}位用户发起意向</span>
                  <span>状态:　
                        <span style="color: #3F7AFF;font-weight: bold;">{{detailData.demandprogressStr}}</span>
                    </span>
              </div>
              <div class="chatBox btn-b" v-if="chatShow" @click="toChat">发起对话</div>
          </header>
          <div class="content">
              <div class="table-form">
                    <div v-if="loadingPayShow">
                        <div>联系人</div>
                        <div>
                            <span style="display: block; height: 20px; max-width: 160px; overflow: hidden;">
                                <lonSpan :txt="detailData.contact"></lonSpan>
                            </span>
                        </div>
                    </div>
                    <div v-if="loadingPayShow">
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
                      <div v-else-if="!loadingPayShow">***</div>
                  </div>
                  <div>
                      <div>小时成本</div>
                      <div>{{detailData.hourscost?detailData.hourscost+'万/小时':'-'}}</div>
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
                  <div class="note" v-if="loadingPayShow">
                      <div>其他说明</div>
                      <div>{{detailData.remark||'-'}}</div>
                  </div>
              </div>
              <div class="myplan">
                  <div class="plan-til">
                      <div>我发出的方案
                          <span>({{planData.responseProgressStr}})</span>
                      </div>
                      <div @click="getSureForm" v-if="editShow"><span class="iconfont" style="font-size:1.6rem;">&#xe653;</span>编辑</div>
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
                          <div>{{planData.seating||'-'}}</div>
                      </div>
                      <div>
                          <div>客量预期</div>
                          <div>{{planData.avgguestexpect ? planData.avgguestexpect+'人/均班':'-'}}</div>
                      </div>
                      <div>
                          <div>客座率预期</div>
                          <div>{{planData.loadfactorsexpect? planData.loadfactorsexpect+'%':'-'}}</div>
                      </div>
                      <div>
                          <div>合作方式</div>
                          <div>{{planData.subsidypolicyStr||'-'}}</div>
                      </div>
                      <div>
                          <div>小时成本</div>
                          <div>{{planData.hourscost? planData.hourscost+'万元/小时':'-'}}</div>
                      </div>
                       <div>
                          <div>运力归属</div>
                          <div v-if="planData.capacityCompany">{{planData.capacityCompany.airlnCd||'-'}}</div>
                           <div v-else-if="!loadingPayShow">***</div>
                      </div>
                       <div>
                          <div>运力基地</div>
                          <div>{{planData.capacityBaseNm||'-'}}</div>
                      </div>
                       <div class="note" style="height:40px;">
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
                  <div class="order btn-w" >已生成订单，无法更改</div>
              </div>
          </footer>
          <footer v-if="footShow">
              <div class="btn" v-if="confirmShow">
                  <div class="cancel-btn btn-b" @click="confirm">确认方案</div>
                  <div class="refuse-btn btn-w" @click="refuse">拒绝并撤回</div>
              </div>
              <div class="btn" v-else>
                  <p v-if="payMoneyShow" style="position: absolute; bottom: 10px; left: 35px; color: red;">*若未及时支付保证金，当该条需求下架或完成时意向自动失效</p>
                  <div class="btn-b" v-if="payMoneyShow" @click="payMoneyFn" style="width: 150px; margin-right: 10px;">支付意向金</div>
                  <div class="intent-btn btn-b" @click="toIntent" v-if="withdraw">重新发起意向</div>
                  <div class="cancel-btn btn-w"  @click="cancelIntent" v-else>取消意向</div>
                  <div class="col-btn cancel btn-b" @click="cancelCollect" v-if="isCollect"
                       @mouseover="changeText(1)" @mouseout="changeText(2)">{{text}}</div>
                  <div class="col-btn btn-w" @click="collect" v-else>收藏</div>
              </div>
          </footer>
      </div>
     <needDetail  v-if="needShow"  @closeDetail= "closeDetail" :needData="needData"></needDetail>
    <sureForm v-if="sureFormShow" @sumitForm="dialog = true" @close-this="closeSureForm" :acceptData = "planData" @refresh = "refresh"></sureForm>
    <reIntentForm v-if="reFormShow" @sumitForm="dialog = true" @close-this="closeReForm" :acceptData = "planData"></reIntentForm>
    <intentForm v-if="intentFormShow" @sumitForm="dialog = true" @closeForm="closeForm" :acceptData="detailData"></intentForm>
    <transDialog v-show="dialog"  @cancel="closeDialog" @sure="sureDialog" @payFail="payFail"></transDialog>
    <paySuccess v-show="payDialog" @cancel="closePaySuccess" ></paySuccess>
    <payFailDialog @cancel="cancelPayFail" v-if="payFailShow"></payFailDialog>
    </div>
</template>

<script>
 import * as vx from 'vuex';
 import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js'
 import ln from '$src/public/js/tabulationBoxTrigger'
 /*import sureForm from './sureForm1.vue'*/
 import sureForm from './../mine/myIntention/myPurposeEditjichang.vue'
 import reIntentForm from './reIntentForm.vue'
 import intentForm from './intentForm1.vue'
 import transDialog from './transDialog.vue'
 import paySuccess  from './paySuccess.vue'
 import payFailDialog  from './payFailOfBalance.vue'
 import needDetail from './needDetail.vue'
 import lonSpan from '$src/page/components/publicTools/scrollTxt.vue';

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
             payFailShow:false,
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
             needData:{},
             myTitle: '',
             loadingPayShow: true,
             payMoneyShow: false,
         }
     },
     props:['demandId'],
      components: {
            sureForm,
            intentForm,
            transDialog,
            paySuccess,
            reIntentForm,
            needDetail,
            payFailDialog,
            lonSpan,
      },
      watch:{
          'demandId':function(){
             //console.log(this.demandId)
             this.getNeedDetail();
          }
        },
     methods:{
         addArgumentsFn: function () {
             if(this.planData.responseProgress == '-1') {
                 this.planData.daizhifu = true;
             }else {
                 this.planData.daizhifu = false;
             }
             if(this.planData.responseProgress == '-2') {
                 this.planData.yishixiao = true;
             }else {
                 this.planData.yishixiao = false;
             }
         },
         payMoneyFn: function () {  // 点击“支付意向金”按钮
             this.sureFormShow = true;
             this.planData.bianji = false;
             this.addArgumentsFn();
         },
         toChat:function(){
            let chatData = {};
            chatData.id = this.detailData.id;
            chatData.demandEmployeeId = this.detailData.employeeId;
            chatData.employeeId = this.planData.employeeId;
            ln.$emit('addChat',chatData);
         },
         closeDetail:function(){
          this.$emit('responseClose');
         },
         getSureForm:function(){   // 点击“编辑”按钮
             this.sureFormShow = true;
             this.planData.bianji = true;
             this.addArgumentsFn();
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
                     this.$message({
                          message: '取消意向成功!',
                          type: 'success',
                          duration:2000
                      });
                    this.$emit('responseClose');
                  }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
         },
         toIntent:function(){  // 点击“重新发起意向”按钮
             this.reFormShow = true;
             this.addArgumentsFn();
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
                     this.$message({
                          message: '确认方案成功!',
                          type: 'success',
                          duration:2000
                      });
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
                     this.$message({
                          message: '撤回方案成功!',
                          type: 'success',
                          duration:2000
                      });
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
                    this.$message({
                          message: '收藏成功!',
                          type: 'success',
                          duration:2000
                      });
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
                       this.$message({
                          message: '取消收藏成功!',
                          type: 'success',
                          duration:2000
                      });
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
          payFail:function(){
            this.reFormShow = false;
            this.dialog = false;
            this.payFailShow = true;
         },
         cancelPayFail:function(){
             this.payFailShow = false;
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
                        this.myTitle = `${response.data.data.title}运力投放`;
                        if(response.data.receiveIntention == null){
                            this.needShow = false;
                            this.responseShow = false;
                            this.$nextTick(() => {
                             this.needShow = true;
                            });
                        }else if(response.data.receiveIntention !== null){
                          this.init();
                          this.responseShow = true;
                          this.needShow = false;
                          if(this.planData.responseProgress == '-1' || this.planData.responseProgress == '-2') {
                              this.loadingPayShow = false;
                          }else {
                              this.loadingPayShow = true;
                          }
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
            // -2:已失效、-1:待支付、0:意向征集、1:订单确认、2:已撤回、3:需求关闭、4:落选状态 5:交易完成,6:订单完成,7:佣金支付
            let progress = this.planData.responseProgress;
            this.editShow = false;  // “编辑”按钮
            this.chatShow = false;  // “发起对话”按钮
            this.withdraw = false;  // “重新发起意向(v-if)/取消意向”
            this.footShow = false;  //  底部按钮
            this.orderComplete = false;   // “已生成订单，无法修改”按钮
            this.confirmShow = false;     // 显示“确认方案”或者“重新发起意向”
            this.payMoneyShow = false;
            if(progress == '2'){
              this.withdraw = true;
              this.footShow = true;
            }else if(progress == '0'){
                this.editShow = true;
                this.chatShow = true;
                this.footShow = true;
            }else if(progress == '4'){

            }else if(progress == '6'){
                this.chatShow = true;
                this.orderComplete = true;
            }else if(progress == '3'){

            }else if(progress == '5'||progress == '7'){
                this.chatShow = true;
            }else if(progress == '1'){
                this.confirmShow = true;
                this.footShow = true;
                this.chatShow = true;
            }else if (progress == '-1') {
                this.editShow = true;  // “编辑”按钮
                this.footShow = true;  //  底部按钮
                this.payMoneyShow = true;
            }else if(progress == '-2') {
                this.withdraw = true;  // 重新发起意向
                if(this.detailData.demandprogress == 0 || this.detailData.demandprogress == 1 || this.detailData.demandprogress == 2) {
                    this.footShow = true;
                }
            }
            //是否收藏
            if(this.needData.isAlreadyCollect == true){
                this.isCollect = true;
            }else if(this.needData.isAlreadyCollect == false){
               this.isCollect = false;
            }

            // 新增“待支付”状态，需要显示“编辑”按钮

        }

     },
      computed:{
         ...vx.mapGetters([
                'role'
            ])
      },
     filters: {
         split: function (value) {
             if(!value) return '-';
             return value.split(' ')[0]
         }
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
        z-index: 33;
        width:600px;
        box-sizing:border-box;
        height:100%;
        color:#605E7C;
        overflow: hidden;
        overflow-y:scroll;
        background-color:#fff;
        box-shadow: 0px 0px 15px #888;
        header{
            width:100%;
            /*height:141px;*/
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
        padding-top: 41px;
        .top-til{
            position: fixed;
            top: 0;
            right: 0;
            width: 545px;
            background: white;
            z-index: 2;
          justify-content: space-between;
          display: flex;
          height:41px;
          line-height:41px;
          font-size:1.2rem;
          color:rgba(96, 94, 124, 0.7);
          padding:0 15px 0 40px;
           box-shadow: 0px 5px 15px rgba(216, 216, 216, 0.9);
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
            padding-left:40px;
            display: flex;
            margin: 30px 0 15px 0;
            height: 25px;
            max-width: 400px;
            font-size: 20px;
            font-weight: bold;
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
      padding:60px 0 90px 40px;
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
              word-wrap: break-word;
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
              box-sizing:border-box;
              padding-left:13px;
              height:26px;
              line-height:26px;
              margin: 25px 30px 29px 0;
              color:#605E7C;
              text-align: center;
              border-radius:100px;
              background-color:#fff;
              cursor:pointer;
              display:flex;
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
            padding:40px 0 60px 40px;
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
                  text-align:center;
                  border-radius:100px;
                  cursor:pointer;
                  /*box-shadow: 1px 2px 18px rgba(60, 120, 255,0.5);*/
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
                  width:100px;
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
