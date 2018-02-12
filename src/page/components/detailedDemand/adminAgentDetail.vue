<template>
    <div>
        <div class="detail-wrapper">
            <header>
                <div class="top-til">运营托管详情<span  class="iconfont" @click="closeDetail">&#xe62c;</span></div>
                <div class="head-til">{{detailData.title||'-'}}</div>
                <div class="contact" @click="chat">联系用户</div>
                <div class="tips">
                    <div>委托方&nbsp;{{CpyNm||'-'}}</div>
                    <div>创建于{{detailData.releasetime||'-'}}</div>
                    <div>状态:
                        <span v-if="testingShow" class="testing">
                        {{detailData.demandprogressStr=="处理中"? "测评中" : detailData.demandprogressStr}}</span>
                        <span v-else class="refused">已拒绝</span>
                    </div>
                </div>
            </header>
            <div class="content">
                <div class="content-box">
                    <div >
                        <div>航班号</div>
                        <div>{{detailData.fltNbr||'-'}}</div>
                    </div>
                    <div>
                        <div>小时成本</div>
                        <div>{{detailData.hourscost? detailData.hourscost+'万/小时':'-'}}</div>
                    </div>
                    <div class="note">
                        <div>其他说明</div>
                        <div class="note-text">{{detailData.remark||'-'}}</div>
                    </div>
                </div>
                <div class="content-box border">
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
            <footer v-show="isAccept">
                <div class="foot-tips" v-if="testingShow"  v-show="isTest"></div>
                <div class="foot-tips" v-if="testingShow"  v-show="!isTest">*需求测评中...</div>
                <div class="foot-tips red" v-else>*拒绝原因：{{refuseText}}</div>
                <div class="btn">
                    <div class="test-btn" v-if="testingShow" @click="toTest" v-show="isTest">测评该需求</div>
                    <div class="test-btn" v-if="testingShow" @click="accepted" v-show="!isTest">接受委托</div>
                    <div class="can-btn" @click="cancel" v-if="testingShow">拒绝</div>
                </div>
            </footer>
            <footer v-if="canAgent">
                <!-- <div class="foot-tips red" v-if="!cancSuccess">*取消托管原因：{{refuseText}}</div> -->
                <div class="btn">
                    <div class="cancel-agent-btn can-btn" @click="cancelAgent" v-if="cancSuccess">取消托管</div>
                </div>
            </footer>
        </div>
        <refuseDialog @sure="sureDialog" v-show="dialogShow" @cancel="cancelDialog" :msg='msg'></refuseDialog>
    </div>
</template>

<script>
import refuseDialog from './../mine/entrustList/refuseDialog.vue';
import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js'
import ln from '$src/public/js/tabulationBoxTrigger.js'
import * as vx from 'vuex'

 export default {
     data(){
         return{
            dialogShow:false,
            testingShow:true,
            isTest:true,
            isAccept:true,
            canAgent:false,
            cancSuccess:true,
            detailData:{},
            refuseText:'',
            CpyNm:'',
            msg:''
         }
     },
      props:['mes'],
      watch:{
          'mes.demand':function(){
             this.init();
          }
        },
     methods:{
        chat:function () {
            let chatData = {};
              chatData.id = this.detailData.id;
              chatData.demandEmployeeId = this.detailData.employeeId;
              chatData.employeeId = this.role.id;
              ln.$emit('addChat',chatData);
            },
        closeDetail:function(){
          this.$emit("closewindow");
        },
        cancel:function(){
          this.dialogShow = true;
          this.msg = "拒绝";
        },
        toTest:function(){
            //this.isTest =false;
            this.$ajax({
                method: 'post',
                url: '/demandUpdate',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    id:this.mes.demand,
                    demandprogress:'9'
                  }
                })
                .then((response) => {
                  if(response.data.opResult == '0'){
                   this.init();
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
              this.testingShow =false;
              this.refuseAgent(text);
          }else if(this.msg == "取消"){
              this.cancelAgent(text);
          }
        },
        refuseAgent(text){
            this.$ajax({
                method: 'post',
                url: '/demandUpdate',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    id:this.mes.demand,
                    demandprogress:'10',
                    rek: text
                  }
                })
                .then((response) => {
                   if(response.data.opResult == '0'){
                    this.init();
                  }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
        },
        accepted(){
              this.$ajax({
                method: 'post',
                url: '/demandUpdate',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    id:this.mes.demand,
                    demandprogress:'8',
                  }
                })
                .then((response) => {
                   if(response.data.opResult == '0'){
                   this.init();
                  }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
        },
       /* getDialog(){
            this.dialogShow = true;
            this.msg = "取消";
        },*/
        cancelAgent(){
              this.$ajax({
                method: 'post',
                url: '/finishCommissionedAndCustody',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    demandState:'1',
                    demandId:this.mes.demand,
                    demandType:this.mes.demandType,
                    //rek: text
                  }
                })
                .then((response) => {
                   if(response.data.opResult == '0'){
                    this.init();
                  }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
        },
        cancelDialog(){
          this.dialogShow = false;
        },
        init(){
          this.$ajax({
                method: 'post',
                url: '/getCommissionedAndCustodyDemandDetails',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    id:this.mes.demand,
                    orderType:'0'
                  }
                })
                .then((response) => {
                  if(response.data.opResult == '0'){
                    this.CpyNm = response.data.CpyNm;
                    this.detailData = response.data.demandDetail;
                    this.demandprogress =  this.detailData.demandprogress;
                      //状态处理
                      if(this.detailData.demandprogress == '9'){//测评中
                          this.isTest = false;
                          this.isAccept =true;
                          this.testingShow =true;
                          this.canAgent = false;
                      }else if(this.detailData.demandprogress == '10'){//已拒绝
                         this.isTest = true;
                          this.isAccept =true;
                          this.canAgent = false;
                          this.testingShow =false;
                          this.refuseText = this.detailData.rek;
                      }else if(this.detailData.demandprogress == '8'){//已接受
                          this.isAccept =false;
                          this.canAgent = true;
                      }else if(this.detailData.demandprogress == '3'){//已关闭
                          //this.canAgent = true;
                          //this.cancSuccess =false;
                          this.isAccept =false;
                          this.canAgent = false;
                          //this.refuseText = this.detailData.rek;
                      }else if(this.detailData.demandprogress == '7'){//待处理
                          this.isTest = true;
                          this.testingShow =true;
                          this.isAccept = true;
                          this.canAgent = false;
                      }
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
            ])
    },
      mounted() {
          tabulationBoxTrigger.hierarchy = true;
          this.init();
     },
    destroyed: function () {
        tabulationBoxTrigger.hierarchy = false;
    },
     components: {
          refuseDialog
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
        min-height:600px;
        color:#605E7C;
        font-size:1.2rem;
        background-color:#fff;
        header{
            width:100%;
            height:141px;
            background-color:rgba(216,216,216,.17);
            position:relative;
        }
        .content{
            padding:60px 40px 0 40px;
        }
        footer{
          position:absolute;
          bottom:0;
          left:0;
          width:100%;
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
          .testing{
            color:#3c78ff;
          }
          .refused{
            color:red;
          }
        }
    }

    .content-box{
      flex-wrap: wrap;
      display: flex;
      margin-bottom:40px;
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
      >div:nth-of-type(odd){
          margin-right:40px;
      }
      .note{
          width:520px;
          height:40px;
          .note-text{
            width:440px;
          }
      }
    }

    .border{
      padding-top:40px;
      border-top:1px solid #ccc;
    }
    footer{
          .foot-tips{
            height:50px;
            margin:0 20px;
            border-bottom:1px solid #ccc;
            color: rgba(96, 94, 124, 0.7);
          }
          .red{
            color:red;
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
                  color:#605E7C;
                  background-color:#fff;
                  text-align:center;
                  border-radius:100px;
                  cursor:pointer;
                  box-shadow: 1px 2px 18px rgba(60, 120, 255,0.5);
                  &:hover{
                    color:#fff;
                    background-color: #3C78FF;
                  }
              }
              .cancel-agent-btn{
                  width:150px;
              }
          }
    }
</style>
