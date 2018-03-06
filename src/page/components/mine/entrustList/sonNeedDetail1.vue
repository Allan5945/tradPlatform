<template>
    <div>
        <div class="plan-wrapper scroll">
            <header>
               <div class="top-til">{{detailData.demandtypeStr||'-'}}详情<span  class="iconfont" @click="closeIntent">&#xe62c;</span></div>
               <div class="head-til">{{detailData.title||'-'}}</div>
               <div class="head-tips">
                   <div class="time">创建于{{detailData.releasetime||'-'}}</div>
                   <div class="progress">状态：<span>{{detailData.demandprogressStr||'-'}}</span></div>
                   <div class="link">关联需求：
                      <div class="back-link" @click="toBack">
                        <span class="til">{{acceptData.title||'-'}}</span>
                        <span class="iconfont">&#xe679;</span>
                      </div>
                  </div>
               </div>
               <div class="rep-btn" v-show="rePublish" @click="toPublish" v-if="this.acceptData.demandprogress !=='3'&&this.acceptData.demandprogress !=='6' ">重新发布</div>
           </header>
            <div class="content">
                <div class="table-form" v-if="transShow">
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
                        <div>{{detailData.hourscost? detailData.hourscost + '万/小时':'-'}}</div>
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
                        <div class="list-wrapper" v-show="schedulListShow">
                            <span v-for=" item in detailData.airportForSchedulines">{{item.airlnCd||'-'}}/</span>
                        </div>
                    </div>
                    <div>
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
                        <div>有效期</div>
                        <div v-if="detailData.periodValidity" style="display:flex;">
                            {{detailData.periodValidity.split('-')[1]||'-'}}止
                            <span class="iconfont" style="font-size:1.6rem;cursor:pointer;" @click="calendarShow=!calendarShow" v-if="changeValidityShow">&#xe653;</span>
                        </div>
                        <section v-if="calendarShow" class="calendar-box popup">
                           <div class="selec-data">
                             <input type="text" placeholder="开始时间" v-model="calendarInitDay1" readonly="readonly"><span>-</span>
                             <input type="text" placeholder="结束时间" v-model="calendarInitDay2" readonly="readonly">
                             <div class="confirm-btn btn" @click="getMyDate">确定</div>
                             <div class="cancel-btn btn" @click="calendarShow=!calendarShow">取消</div>
                           </div>
                           <calendar v-on:changeRangeDate="getDateRange" :initOpt="initdateData"></calendar>
                        </section>

                    </div>
                     <div class="tips">
                        <div>其他说明</div>
                        <div>{{detailData.remark||'-'}}</div>
                     </div>
                </div>
                <div class="intent air-detail" style="margin-bottom:0;" v-else>
                        <div class="airline" style="margin:40px 40px 0 40px;border:0;">
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
                        <div class="table-form" style="padding-left:40px;">
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
                                    <div>拟飞机型</div>
                                    <div>{{detailData.aircrfttyp||'-'}}</div>
                                </div>
                                <div>
                                    <div>座位数</div>
                                    <div>{{detailData.seating||'-'}}</div>
                                </div>
                                <div>
                                    <div>客量期望</div>
                                    <div>{{detailData.avgguestexpect? detailData.avgguestexpect+'人/均班':'-'}}</div>
                                </div>
                                <div>
                                    <div>客座率期望</div>
                                    <div>{{detailData.loadfactorsexpect ? detailData.loadfactorsexpect+'%':'-'}}</div>
                                </div>
                                <div>
                                    <div>合作方式</div>
                                    <div>{{detailData.subsidypolicyStr||'-'}}</div>
                                </div>
                                <div>
                                    <div>有效期</div>
                                    <div v-if="detailData.periodValidity" style="display:flex;">
                                        {{detailData.periodValidity.split('-')[1]||'-'}}止
                                        <span class="iconfont" style="font-size:1.6rem;cursor:pointer;" @click="calendarShow=!calendarShow" v-if="changeValidityShow">&#xe653;</span>
                                    </div>
                                    <section v-if="calendarShow" class="calendar-box popup" style="left:-300px;">
                                       <div class="selec-data">
                                         <input type="text" placeholder="开始时间" v-model="calendarInitDay1" readonly="readonly"><span>-</span>
                                         <input type="text" placeholder="结束时间" v-model="calendarInitDay2" readonly="readonly">
                                         <div class="confirm-btn btn" @click="getMyDate">确定</div>
                                         <div class="cancel-btn btn" @click="calendarShow=!calendarShow">取消</div>
                                       </div>
                                       <calendar v-on:changeRangeDate="getDateRange" :initOpt="initdateData"></calendar>
                                    </section>
                                </div>
                                <div class="tips">
                                    <div>其他说明</div>
                                    <div>{{detailData.remark||'-'}}</div>
                                </div>
                        </div>
                </div>
            <div class="intent" v-if="intentShow">
                <div class="intent-til">
                    <div>收到的意向</div>
                    <div>已有<span>{{this.intentionCount||'0' }}</span>位用户发起意向</div>
                </div>
                <div class="intent-form">
                    <div>
                        <div>收到时间
                          <span @click="orderSorted">
                              <span class="iconfont icon-up" :class="{active:sorted}">&#xe605;</span>
                              <span class="iconfont icon-down" :class="{active:!sorted}">&#xe605;</span>
                          </span>
                        </div>
                        <div>意向方</div>
                    </div>
                    <div class="intent-box" v-for=" (val,index) in planData" v-if="intentListShow">
                         <div class="intent-item">
                            <div class="time">{{val.responsedate||'-'}}</div>
                            <div class="person">
                              {{val.intentionCompanyName||'-'}}
                              <span class="iconfont" @click="chat(val)">&#xe602;</span>
                            </div>
                            <div class="progress">{{val.responseProgressStr}}</div>
                            <div class="detail" @click="closeDetail" v-if="showDetailIndex === index">收起详情</div>
                            <div class="detail" @click="openDetail(index)" v-else>查看详情</div>
                        </div>
                        <div class="intent-detail" v-show="showDetailIndex === index">
                            <div class="airline">
                                <div class="airplace">
                                    <div v-if="val.dptState =='0' ">始发机场</div>
                                    <div v-else>始发区域</div>
                                    <div>
                                        <div>{{val.dptNm||'-'}}</div>
                                        <div v-if="val.dptState =='0' ">{{val.dptAcceptnearairportStr||'-'}}临近机场</div>
                                    </div>
                                    <div class="resouse" v-if="val.dptState =='0' ">
                                        <div>出港资源</div>
                                        <div v-if="val.dptTimeresources == '0'">{{val.dptTime||'-'}}</div>
                                        <div v-else>{{val.dptTimeresourcesStr||'-'}}</div>
                                    </div>
                                </div>
                                <div style="padding-top:58px;"><span class="iconfont">&#xe672;</span></div>
                                <div class="airplace">
                                    <div v-if="val.pstState =='0' ">经停机场</div>
                                    <div v-else>经停区域</div>
                                    <div>
                                        <div>{{val.pstNm||'-'}}</div>
                                         <div v-if="val.pstState =='0' ">{{val.pstAcceptnearairportStr||'-'}}临近机场</div>
                                    </div>
                                    <div class="resouse" v-if="val.pstState =='0' ">
                                        <div>出港资源</div>
                                        <div v-if="val.pstTimeresources == '0'">{{val.pstTime||'-'}}</div>
                                        <div v-else>{{val.pstTimeresourcesStr||'-'}}</div>
                                    </div>
                                </div>
                                <div style="padding-top:58px;"><span class="iconfont">&#xe672;</span></div>
                                <div class="airplace">
                                    <div v-if="val.arrvState =='0' ">到达机场</div>
                                    <div v-else>到达区域</div>
                                    <div>
                                        <div>{{val.arrvNm||'-'}}</div>
                                        <div v-if="val.arrvState =='0' ">{{val.arrvAcceptnearairportStr||'-'}}临近机场</div>
                                    </div>
                                    <div class="resouse" v-if="val.arrvState =='0' ">
                                        <div>出港资源</div>
                                        <div v-if="val.arrvTimeresources == '0'">{{val.arrvTime||'-'}}</div>
                                        <div v-else>{{val.arrvTimeresourcesStr||'-'}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="table-form">
                                <div>
                                    <div>联系人</div>
                                    <div>{{val.contact||'-'}}</div>
                                </div>
                                <div>
                                    <div>联系方式</div>
                                    <div>{{val.ihome||'-'}}</div>
                                </div>
                                <div>
                                    <div>拟开时间</div>
                                    <div>{{val.sailingtime||'-'}}</div>
                                </div>
                                <div>
                                    <div>拟开班期</div>
                                    <div>{{val.days||'-'}}</div>
                                </div>
                                <div>
                                    <div>拟开机型</div>
                                    <div>{{val.aircrfttyp||'-'}}</div>
                                </div>
                                <div>
                                    <div>座位数</div>
                                    <div>{{val.seating||'-'}}</div>
                                </div>
                                <div>
                                    <div>客量预期</div>
                                    <div>{{val.avgguestexpect? val.avgguestexpect+'人/均班':'-'}}</div>
                                </div>
                                <div>
                                    <div>客座率预期</div>
                                    <div>{{val.loadfactorsexpect ? val.loadfactorsexpect+'%':'-'}}</div>
                                </div>
                                <div>
                                    <div>合作方式</div>
                                    <div>{{val.subsidypolicyStr||'-'}}</div>
                                </div>
                                <div>
                                    <div>小时成本</div>
                                    <div>{{val.hourscost? val.hourscost + '万元/小时':'-'}}</div>
                                </div>
                                <div>
                                    <div>运力归属</div>
                                    <div v-if="val.capacityCompany">{{val.capacityCompany.airlnCd||'-'}}</div>
                                </div>
                                <div>
                                    <div>运力基地</div>
                                    <div>{{val.capacityBaseNm||'-'}}</div>
                                </div>
                                 <div  class="tips" style="height:40px;">
                                      <div>是否调度</div>
                                      <div v-if="val.scheduling == '0' ">
                                      <span v-for=" item in val.airportForSchedulines">{{item.airlnCd||'-'}}</span>
                                      </div>
                                      <div v-else>不接受</div>
                                  </div>
                                <div class="tips">
                                    <div>其他说明</div>
                                    <div>{{val.remark||'-'}}</div>
                                </div>
                            </div>
                            <span class="selc-tips" v-if="!isIntentionMoney" v-show="(val.responseProgress !== '2')||(val.responseProgress !== '3')">*您还未缴纳意向金，缴纳后即可选定该意向</span>
                            <div v-if="isIntentionMoney">
                                <div v-if="selectBtnShow" v-show="val.responseProgress !== '2'">
                                    <div class="btns" v-if="val.releaseselected == '0' ">
                                        <div class="sel-btn" @click="toEdit(val)">已选定（点击此处可再次编辑）</div>
                                        <div class="cancel-btn" @click="cancelSel(val)">撤销选定</div>
                                    </div>
                                    <div class="sure-btn" @click="toSelect(val)" v-show="!selected" v-else>选定</div>
                                    <div class="sure-btn" v-show="selected" style="backgroundColor:#ccc;color:#fff;" v-if="val.releaseselected !== '0' ">选定</div>
                                </div>
                                <div v-if="val.responseProgress !== '2'">
                                    <div class="sure-btn complete-btn" v-if="val.responseselected == '0' ">已生成订单，无法更改</div>
                                    <div class="sure-btn" v-show="planComplete" style="backgroundColor:#ccc;color:#fff;" v-else>选定</div>
                                </div>
                            </div>
                            <div v-else>
                                 <div class="sure-btn" style="backgroundColor:#ccc;color:#fff;">选定</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div v-if="detailData.rek"  class="close-reason">审核未通过原因：{{detailData.rek}}</div>
            <footer v-show="footShow">
                <div class="btn">
                    <div class="col-btn btn-b" style="margin-right:10px;" @click="airlinePayFn" v-if='!isIntentionMoney' v-show="intentionMoneyBtnshow">点击此处缴纳意向金</div>
                    <div class="col-btn btn-w" style="color:#ccc;backgroundColor:#f5f5f5;" v-if="sureOderShow">结束需求</div>
                    <div class="col-btn btn-w" @click="closeNeed" v-else>结束需求</div>
                </div>
            </footer>
        </div>
        <myIntentForm v-if="myFormShow" @closeMyForm="closeMyForm" :acceptData = "selectData" @surePlan="surePlan"></myIntentForm>
        <sureForm v-if="sureFormShow" @close-this="closeSureForm" :acceptData = "editData"></sureForm>
        <reTransForm v-if='dataFormShow'@closeForm="closeDataForm" :acceptData = "detailData" :fatherId="acceptData.id"></reTransForm>
        <reAirlineForm v-if='dataFormShow1'@close-this="closeDataForm" :acceptData = "detailData" :fatherId="acceptData.id"></reAirlineForm>
        <airlinePay v-if="airlinePayShow" @cancel="closeAlPayFn" @sure="changeShowCodeP" :airlinePayId="detailData.id"></airlinePay>
    </div>
</template>
<script>
  import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js'
  import ln from '$src/public/js/tabulationBoxTrigger'
  import * as vx from 'vuex'
  import myIntentForm from './../../trans_detail/myIntentForm.vue'
  import sureForm from './../../trans_detail/sureForm1.vue'
  import reTransForm from './reTransForm.vue'
  import reAirlineForm from './reAirlineForm.vue'
  import airlinePay from '$src/page/components/trans_detail/dialog.vue'
  import calendar from './../../publicTools/calendar/calendarCP'
 export default {
     data(){
         return{
             showDetailIndex:'',
             intentShow:true,
             intentListShow:false,
             myFormShow:false,
             sureFormShow:false,
             dataFormShow:false,
             dataFormShow1:false,
             selected:false,
             planComplete:false,
             detailData:{},
             planData:{},
             editData:{},
             selectData:{},
             intentionCount:0,
             rePublish:false,
             footShow:true,
             selectBtnShow:true,
             transShow:false,
             sureOderShow:false,
             schedulListShow:false,
             airlinePayShow:false,
             isIntentionMoney:true,
             calendarShow:false,
             calendarInitDay1:'',
             calendarInitDay2:'',
             changeValidityShow:true,
             sorted:true,
             intentionMoneyBtnshow:true
         }
     },
     props:['sonId','acceptData'],
     methods:{
         chat:function (v) {
              let chatData = {};
              chatData.id = this.detailData.id;
              chatData.employeeId = this.detailData.employeeId;
              chatData.demandEmployeeId = v.employeeId;
              ln.$emit('addChat',chatData);
            },
         closeDetail:function(){
             this.showDetailIndex = '';
         },
          openDetail:function(index){
             this.showDetailIndex = index;
         },
         closeIntent:function(){
            this.$emit('closeDetail');
         },
         toSelect:function(val){
            this.sureFormShow = true;
            this.editData = val;
            this.editData.stateNum = '1';
        },
         toEdit:function(val,index){
            this.sureFormShow = true;
            this.editData = val;
            this.editData.stateNum = '2';
         },
         closeNeed:function(){
               this.$ajax({
                method: 'post',
                url: '/closeDemandById',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    id:this.detailData.id,
                    closeReason:'下架'
                }
                })
                .then((response) => {
                    if(response.data.opResult == "0"){
                    this.$message({
                        message: '结束需求成功!',
                        type: 'success',
                        duration:2000
                    });
                    this.init();
                  }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
         },
         toBack:function(){
                this.$emit("toBack");
            },
         cancelSel:function(val){
               this.selectData.id = val.id;
              this.selectData.employeeId = val.employeeId;
              this.selectData.demandId = val.demandId;
              this.selectData.releaseselected = '1';
              this.$ajax({
                    method: 'post',
                    url: '/selectedResponse',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                      params:this.selectData
                    })
                    .then((response) => {
                         if(response.data.opResult == "0"){
                          //alert("撤销选定成功!")
                          this.$message({
                            message: '撤销选定成功!',
                            type: 'success',
                            duration:2000
                          });
                          this.init();
                         }
                    })
                    .catch((error) => {
                            console.log(error);
                        }
                    );

         },
         closeMyForm:function(){
              this.myFormShow = false;
         },
          surePlan:function(){
              this.myFormShow = false;
              this.selected = true;
              this.sureOderShow = true;
         },
          closeSureForm:function(){
              this.sureFormShow = false;
              this.init();
         },
         closeDataForm:function(){
            this.dataFormShow = false;
            this.dataFormShow1 = false;
         },
         toDeal:function(){
            this.dialogShow =true;
         },
         toPublish:function(){
            if(this.detailData.demandtype == '1'){
                this.dataFormShow = true;
            }else if(this.detailData.demandtype == '0'){
                 this.dataFormShow1 = true;
            }
         },
          airlinePayFn: function () {
            this.airlinePayShow = true;
            tabulationBoxTrigger.$emit('responseText',this.detailData.id)//向dialog.vue传入响应Id
        },
        closeAlPayFn: function () {
            this.airlinePayShow = false;
        },
         changeShowCodeP: function () {
            this.init();
        },
        getMyDate: function(){//获取起始的日期
            if(this.calendarInitDay1 && this.calendarInitDay2){
                this.myDate = this.calendarInitDay1 + "-" + this.calendarInitDay2;
                this.calendarShow = false;
            }
            this.$ajax({
                        url:"/demandUpdate",
                        method: 'post',
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded'
                        },
                        params: {
                            periodValidity: this.myDate,
                            id: this.detailData.id
                        }
                    }) .then((response) => {
                        if(response.data.opResult === '0'){
                            this.init();
                            this.$message({
                                message: '修改有效期成功!',
                                type: 'success',
                                duration:2000
                            });
                        }else{

                        }
                    }) .catch((error) => {
                        console.log(error);
                    });
        },
        getDateRange:function(rd){
            this.calendarInitDay1 = rd[0];
            this.calendarInitDay2 = rd[1];
        },
        initDate: function() {
              //初始化
                let today = new Date(),
                day = today.getDate(), //号数
                mon = today.getMonth() + 1, //月份
                year = today.getFullYear();//年份
                if (mon < 10) mon = "0" + mon;
                if (day < 10) day = "0" + day;
                this.calendarInitDay1 = year+"."+mon+"."+day;

        },
         orderSorted:function(){
           this.sorted =!this.sorted;
            let orderType = this.sorted? '0':'1';
            this.$ajax({
                method: 'post',
                url: '/responseListOrder',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    demandId:this.detailData.id,
                    orderType:orderType

                  }
                })
                .then((response) => {
                     if(response.data.opResult == '0'){
                        this.planData = response.data.responseList;
                    }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
        },
        init:function(){
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
                    this.intentionCount = response.data.intentionCount;
                    this.detailData = response.data.data;
                    this.planData = response.data.responseList;

                    this.calendarInitDay1 = this.detailData.periodValidity.split('-')[0];
                    //this.initDate();
                     this.calendarInitDay2 = this.detailData.periodValidity.split('-')[1];

                    if(this.detailData.demandtype == '0'){
                        this.isIntentionMoney = response.data.isIntentionMoneyForThisDemand;
                    }
                    //判断状态
                    let progress = this.detailData.demandprogress;
                     if(progress == "3"||progress == "10"){//3.关闭（审核不通过、下架、过期）,10.已拒绝
                      this.rePublish = true;
                      this.footShow  = false;
                      this.selectBtnShow = false;
                      this.sureOderShow = false;
                      this.planComplete = false;
                      this.changeValidityShow = false;
                    }else if(progress == "4"||progress == "5"||progress == "6"){//4:订单完成、5:佣金支付、6:交易完成
                      this.rePublish = false;
                      this.footShow  = false;
                      this.selectBtnShow = false;
                      this.sureOderShow = false;
                      this.planComplete = true;
                      this.changeValidityShow = false;
                    }else if(progress == "2"){//2:订单确认
                      this.rePublish = false;
                      this.footShow  = true;
                      this.selectBtnShow = true;
                      this.sureOderShow = false;
                      this.planComplete = false;
                    }else{
                        this.rePublish = false;
                        this.footShow  = true;
                        this.selectBtnShow = true;
                        this.sureOderShow = false;
                        this.planComplete = false;
                    }
                    //有意向方显示列表信息
                    if(this.planData){
                      this.intentListShow = true;
                    }

                    if(progress == '0'){
                        this.intentionMoneyBtnshow = false;
                    }else{
                        this.intentionMoneyBtnshow = true;
                    }

                     //审核未通过
                    if(this.detailData.demandstate =='5'){
                        this.intentShow = false;
                      }else{
                        this.intentShow = true;
                      }

                    //是否有选定
                    if(this.planData && this.planData !== []){
                      let len = this.planData.length;
                      this.selected = false;
                      for(let i =0;i<len;i++){
                          if(this.planData[i].releaseselected == '0'){
                            this.selected = true;
                          }
                      }
                    }
                    //子需求发布详情判断
                    if(this.detailData.demandtype == '1'){
                        this.transShow = true;
                    }else{
                       this.transShow = false;
                    }

                })
                .catch((error) => {
                        console.log(error);
                    }
                );
        }

     },
      computed: {
            ...vx.mapGetters([
                'role'
            ]),
            initdateData: function(){
                let data = {};
                    data.start = this.calendarInitDay1;
                    data.end = this.calendarInitDay2;
                    data.isDis = false;
                return data;
            }
        },
      watch: {

      },
      mounted() {
            this.init();
     },
     components: {
            myIntentForm,
            sureForm,
            reTransForm,
            airlinePay,
            calendar,
            reAirlineForm
        }
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
        overflow: hidden;
        overflow-y:scroll;
        color:#605E7C;
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
        position:relative;
        .rep-btn{
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
        .top-til{
          justify-content: space-between;
          display: flex;
          height:41px;
          line-height:41px;
          color:rgba(96, 94, 124, 0.7);
          font-size:1.2rem;
          background-color:#fff;
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
        .head-tips{
          position:relative;
          height:12px;
          line-height:12px;
          color:rgba(96, 94, 124, 0.7);
          padding:20px 0 18px 40px;
          display:flex;
          >div{
            overflow:hidden;
            display:flex;
          }
          .time{
            width:120px;
          }
          .progress{
            width:160px;
            span{
                display:block;
                width:110px;
                overflow:hidden;
            }
          }
          .link{
            width:260px;
          }
          .back-link{
            display:flex;
            .til{
                display:block;
                max-width:180px;
                overflow:hidden;
                border-bottom:1px solid #3c78ff;
            }
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
    .tips{
        width:100%;
        >div:nth-of-type(2){
         width:440px;
         word-wrap: break-word;
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
    .intent{
        margin-bottom:140px;
        .intent-til{
            height:60px;
            width:100%;
            padding:20px 0;
            background-color:rgba(216,216,216,.2);
            >div:nth-of-type(1){
             font-size:2rem;
             font-weight:bold;
             height:40px;
             line-height:40px;
             padding-left:40px;
          }
          >div:nth-of-type(2){
             height:20px;
             color:rgba(96, 94, 124, 0.7);
             line-height:20px;
             padding-left:40px;
          }
          span{
             color:#3C78FF;
          }
        }
        .intent-detail{
            position:relative;
            .sure-btn{
                height:28px;
                line-height:28px;
                width:250px;
                border-radius:100px;
                margin:0 auto;
                color:#fff;
                background-color:#3C78FF;
                margin-top:12px;
                margin-bottom:25px;
                text-align:center;
                cursor:pointer;
            }
             .btns{
                height:28px;
                line-height:28px;
                display: flex;
                justify-content: center;
                margin-top:12px;
                margin-bottom:25px;
                cursor:pointer;
                .sel-btn{
                  width:250px;
                  color:#fff;
                  background-color:#3C78FF;
                  margin-right:10px;
                  border-radius:100px;
                  text-align:center;
                }
                .cancel-btn{
                  width:100px;
                  color:#fff;
                  background-color:#3C78FF;
                  border-radius:100px;
                  text-align:center;
                }
            }
        }
        .airline{
            display:flex;
            border-top:1px solid #ccc;
            margin: 0 20px;
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
            padding:40px 0 20px 20px;
            .tips{
                width:100%;
                height:100px;
                >div:nth-of-type(2){
                    width:440px;
                    word-wrap: break-word;
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
        .intent-form{
            >div:nth-of-type(1){
                position:relative;
                height:75px;
                width:100%;
                box-sizing:border-box;
                padding: 30px 0 25px 40px;
                >div{
                    display:inline-block;
                    width:80px;
                    padding-right:40px;
                }
                 .icon-up {
                    position: absolute;
                    bottom: 33px;
                    transform: rotate(180deg);
                    cursor:pointer;
                }
                .icon-down {
                    position: absolute;
                    top: 33px;
                    cursor:pointer;
                }
                 .active {
                    color: #3c78ff;
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
                .person{
                    display:flex;
                    flex:2;
                    span{
                        font-size:25px;
                        margin-left:10px;
                        cursor:pointer;
                    }

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
         .selc-tips{
            color:red;
            position:absolute;
            bottom:40px;
            left:20px;
          }

    .close-reason{
      margin:160px 40px 0 40px;
      color:red;
      width:500px;
      word-wrap: break-word;
    }
    footer{
        border-top: 1px solid #ccc;
        position:relative;

          .btn{
              height:40px;
              margin-top:28px;
              >div{
                  height:40px;
                  line-height:40px;
                  font-size:1.5rem;
                  /*color:#605E7C;*/
                  /*background-color:#fff;*/
                  text-align:center;
                  border-radius:100px;
                  cursor:pointer;
                  /*box-shadow: 1px 2px 18px rgba(60, 120, 255,0.5);*/
              }
               .col-btn{
                  width:250px;
                  /*&:hover{
                    color:#fff;
                    background-color: #3C78FF;
                  }*/
                }
              .deal-btn{
                  width:180px;
                    color:#fff;
                    background-color: #3C78FF;
                    margin-right:10px;
              }
          }
    }
</style>
<style scoped>
  .calendar-box{
    width: 540px;
    height:270px;
    position: absolute;
    top:20px;
    left:-20px;
    z-index: 10;
    padding:20px 10px 10px 10px;
    background-color: #FFF;
  }
  .calendar-box .selec-data{
    height:30px;
    font-size: 12px;
    margin-bottom:20px;
    position: relative;
  }
  .calendar-box .selec-data input{
    height: 100%;
    width: 75px;
    font-size: 12px;
    border:0;
    outline: none;
    border-bottom: 1px solid rgba(151, 151, 151, 0.3);
  }
  .calendar-box .selec-data span{
    display: inline-block;
    width:30px;
    text-align: center;
  }
  .selec-data .btn{
    position:absolute;
    top:0;
    height: 30px;
    line-height: 30px;
    border-radius: 100px;
    text-align: center;
    cursor: pointer;
  }
  .selec-data .confirm-btn{
    right:0;
    width:60px;
    color:#ffffff;
    background-color:#3c78ff;
  }
  .selec-data .cancel-btn{
    width:50px;
    color:rgba(96,94,124,.6);
    box-sizing: border-box;
    border:1px solid rgba(96,94,124,.6);
    right:64px;
  }
</style>



