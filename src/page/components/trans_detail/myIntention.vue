<template>
    <div>
        <div class="plan-wrapper scroll">
            <header>
                <div class="top-til">{{detailData.demandtypeStr||'-'}}详情<span class="iconfont" @click="closeIntent">&#xe62c;</span></div>
                <div class="head-til">{{detailData.title||'-'}}运力投放</div>
                <div class="note">
                    <span>创建于{{detailData.releasetime||'-'}}</span>
                    <span>状态：<span style="color:#3C78FF;">{{detailData.demandprogressStr||'-'}}</span></span>
                </div>
                <div class="rep-btn" v-show="rePublish" @click="toPublish">重新发布</div>
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
                        <div v-if="detailData.periodValidity">{{detailData.periodValidity.split('-')[1]||'-'}}止</div>
                    </div>
                     <div class="tips">
                        <div>其他说明</div>
                        <div>{{detailData.remark||'-'}}</div>
                     </div>
                </div>
            <div class="intent">
                <div class="intent-til">
                    <div>收到的意向</div>
                    <div>已有<span>{{this.intentionCount||'0' }}</span>位用户发起意向</div>
                </div>
                <div class="intent-form" v-if="this.isSign">
                    <div>
                        <div>收到时间
                          <span class="iconfont icon-up active">&#xe605;</span>
                          <span class="iconfont icon-down">&#xe605;</span>
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
                                    <div>{{val.avgguestexpect||'-'}}人</div>
                                </div>
                                <div>
                                    <div>客座率预期</div>
                                    <div>{{val.loadfactorsexpect||'-'}}%</div>
                                </div>
                                <div>
                                    <div>补贴政策</div>
                                    <div>{{turnPolicyCode(val.subsidypolicy)||'-'}}</div>
                                </div>
                                <div>
                                    <div>小时成本</div>
                                    <div>{{val.hourscost||'-'}}万元/小时</div>
                                </div>
                                <div>
                                    <div>运力归属</div>
                                    <div v-if="val.capacityCompany">{{val.capacityCompany.airlnCd||'-'}}</div>
                                </div>
                                <div>
                                    <div>运力基地</div>
                                    <div>{{val.capacityBaseNm||'-'}}</div>
                                </div>
                                <div>
                                    <div>是否调度</div>
                                    <div>{{val.schedulingStr||'-'}}</div>
                                </div>
                                <div class="tips">
                                    <div>其他说明</div>
                                    <div>{{val.remark||'-'}}</div>
                                </div>
                            </div>
                            <div v-if="selectBtnShow">
                                <div class="btns" v-if="val.releaseselected == '0' ">
                                    <div class="sel-btn" @click="toEdit(val)">已选定（点击此次可再次编辑）</div>
                                    <div class="cancel-btn" @click="cancelSel(val)">撤销选定</div>
                                </div>
                                <div class="sure-btn" @click="toSelect(val)" v-show="!selected" v-else>选定</div>
                                <div class="sure-btn" v-show="selected" style="backgroundColor:#ccc;color:#fff;" v-if="val.releaseselected !== '0'&&(val.responseProgress !== '2') ">选定</div>
                            </div>
                            <div v-if="val.responseProgress !== '2'">
                                <div class="sure-btn complete-btn" v-if="val.responseselected == '0' ">已生成订单，无法更改</div>
                                <div class="sure-btn" v-show="planComplete" style="backgroundColor:#ccc;color:#fff;" v-else>选定</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <footer v-show="footShow">
                <div class="foot-tips" v-if="!isSign">*您还未签约，签约后可查看详细列表</div>
                <div class="btn">
                    <div class="deal-btn" v-if="!isSign" @click="toDeal">申请签约</div>
                    <div class="col-btn" style="color:#ccc;backgroundColor:#f5f5f5;" v-if="sureOderShow">结束需求</div>
                    <div class="col-btn" @click="closeNeed" v-else>结束需求</div>
                </div>
            </footer>
        </div>
        <myIntentForm v-if="myFormShow" @closeMyForm="closeMyForm" :acceptData = "selectData" @surePlan="surePlan"></myIntentForm>
        <sureForm v-if="sureFormShow" @closeForm="closeSureForm" :acceptData = "editData"></sureForm>
        <dataForm v-if='dataFormShow'@closeForm="closeDataForm" :acceptData = "detailData"></dataForm>
         <signDialog  v-show="dialogShow" @cancel="dialogShow = false"></signDialog>
    </div>
</template>

<script>
  import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js'
  import ln from '$src/public/js/tabulationBoxTrigger'
  import * as vx from 'vuex'
  import myIntentForm from './myIntentForm.vue'
  import sureForm from './sureForm1.vue'
  import dataForm from './dataForm.vue'
  import  signDialog from './signDialog.vue'
 export default {
     data(){
         return{
             showDetailIndex:'',
             intentListShow:false,
             myFormShow:false,
             sureFormShow:false,
             dataFormShow:false,
             dialogShow:false,
             selected:false,
             planComplete:false,
             detailData:{},
             planData:{},
             editData:{},
             selectData:{},
             intentionCount:0,
             isSign:false,
             rePublish:false,
             footShow:true,
             selectBtnShow:true,
             sureOderShow:false,
             schedulListShow:false,
         }
     },
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
            this.$emit('closeIntent');
         },
         toSelect:function(val){
            this.myFormShow = true;
            this.selectData = val;
         },
         toEdit:function(val,index){
            this.editData = val;
            this.sureFormShow = true;
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
                    //alert("取消需求成功!")
                     this.$emit('closeIntent');
                  }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
         },
         cancelSel:function(val){
              this.selectData = val;
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
                          this.selected = false;
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
         },
         closeDataForm:function(){
            this.dataFormShow = false;
         },
         toDeal:function(){
            this.dialogShow =true;
         },
         toPublish:function(){
            this.dataFormShow = true;
         },
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
        }



     },
      computed: {
            ...vx.mapGetters([
                'role'
            ])
        },
      watch: {

      },
      mounted() {
        tabulationBoxTrigger.$on('tabulationBoxTrigger', val => {

            //console.log("demandtype"+val.data.demandtype);
            if(val.data.demandtype == 1 && this.role.role == 0){
                this.$ajax({
                method: 'post',
                url: '/capacityRoutesDemandDetailFindById',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    demandId: val.data.id
                }
                })
                .then((response) => {
                    this.intentionCount = response.data.intentionCount;
                    this.detailData = response.data.data;
                    this.planData = response.data.responseList;
                    //判断状态
                    let progress = this.detailData.demandprogress;
                    if(progress == "3"||progress == "10"){//3.关闭（审核不通过、下架、过期）,10.已拒绝
                      this.rePublish = true;
                      this.footShow  = false;
                      this.selectBtnShow = false;
                      this.sureOderShow = false;
                      this.planComplete = false;
                    }else if(progress == "4"||progress == "5"||progress == "6"){//4:订单完成、5:佣金支付、6:交易完成
                      this.rePublish = false;
                      this.footShow  = false;
                      this.selectBtnShow = false;
                      this.sureOderShow = false;
                      this.planComplete = true;
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
                    //是否有选定
                    if(this.planData !== {}){
                      let len = this.planData.length;
                      this.selected = false;
                      for(let i =0;i<len;i++){
                          if(this.planData[i].releaseselected == '0'){
                            this.selected = true;
                          }
                      }
                    }
                    //判断是否签约用户
                    if(this.role.role == "2"){
                        this.isSign = true;
                    }else{
                        this.isSign = response.data.isSign;
                    }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
             this.$emit("openIntent");
            };
        });


     },
     components: {
            myIntentForm,
            signDialog,
            sureForm,
            dataForm
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
        .top-til{
          justify-content: space-between;
          display: flex;
          height:41px;
          line-height:41px;
          font-size:1.2rem;
          color:rgba(96, 94, 124, 0.7);
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
        .note{
          height:12px;
          line-height:12px;
          color:rgba(96, 94, 124, 0.7);
          padding:20px 0 18px 40px;
          span{
            margin-right:30px;
          }
        }
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
    }

    .table-form{
      width:100%;
      box-sizing:border-box;
      padding:60px 0 60px 40px;
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
                height:60px;
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
                }
                .icon-down {
                    position: absolute;
                    top: 33px;
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
    footer{
        border-top: 1px solid #ccc;
        position:relative;
          .foot-tips{
            color:red;
            position:absolute;
            top:-30px;
            left:40px;
          }
          .btn{
              height:40px;
              margin-top:28px;
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
              }
               .col-btn{
                  width:250px;
                  &:hover{
                    color:#fff;
                    background-color: #3C78FF;
                  }
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
