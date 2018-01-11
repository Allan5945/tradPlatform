<template>
    <div class="wrapper" @click.self="closeDetail">
        <div class="detail-wrapper">
            <header>
                <div class="top-til">{{detailData.demandtypeStr||'-'}}详情<span @click="closeDetail" class="iconfont">&#xe62c;</span></div>
                <div class="head-til">{{detailData.title||'-'}}运力投放</div>
                <div class="tips">
                    <span>创建于{{detailData.releasetime||'-'}}</span>
                    <span>已有{{intentionCount||'0'}}位用户发起意向</span>
                </div>
            </header>
            <div class="content">
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
                    <div>***</div>
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
                    <div>{{detailData.periodValidity||'-'}}</div>
                </div>
            </div>
            <footer>
                <div>*隐藏信息在提交意向后可查看</div>
                <div class="btn">
                    <div class="intent-btn" @click="haveInvent"><span class="iconfont">&#xe62f;</span>我有意向</div>
                    <div class="col-btn cancel " @click="cancelCollect" v-if="isCollect" @mouseover="changeText(1)" @mouseout="changeText(2)">{{text}}</div>
                    <div class="col-btn" @click="collect" v-else>收藏</div>
                </div>
            </footer>
        </div>
        <intentForm v-if="intentFormShow" @sumitForm="dialog = true" @closeForm="closeForm" :demandId="demandId"></intentForm>
        <transDialog v-show="dialog"  @cancel="closeDialog" @sure="sureDialog"></transDialog>
        <paySuccess @cancel="closePaySuccess" v-show="payDialog"></paySuccess>
    </div>
</template>

<script>
 import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';
 import * as vx from 'vuex';
 import intentForm from '$src/page/components/trans_detail/intentForm.vue'
 import transDialog from '$src/page/components/trans_detail/transDialog.vue'
 import paySuccess  from '$src/page/components/trans_detail/paySuccess.vue'

 export default {
     data(){
         return{
             getDetail:[],
             detailData:{},
             intentionCount:0,
             demandId:'',
             text:'已收藏',
             isCollect:false,
             intentFormShow:false,
             dialog:false,
             payDialog:false
         }
     },
     methods:{
         closeDetail:function(){
            this.$emit('closeThis');
         },
         closeForm:function(){
            this.intentFormShow = false;
         },
         closeDialog:function(){
            this.dialog = false;
         },
         sureDialog:function(){
            this.intentFormShow = false;
            this.payDialog = true;
         },
         closePaySuccess:function(){
            this.payDialog = false;
            this.$emit('closeThis');
        },
         haveInvent:function(){
            this.intentFormShow = true;
         },
         collect:function(){
             this.$ajax({
                method: 'post',
                url: '/addCollect',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    demandIds: this.demandId
                }
                })
                .then((response) => {
                  if(response.data.opResult == "0"){
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
                    demandId:this.demandId
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
         }
     },
     computed: {
            ...vx.mapGetters([
                'role'
            ])
        },
      mounted() {
        tabulationBoxTrigger.$on('sendToCompany', val => {
            if((val.demandType == '运力需求' || val.demandType == '运力投放')){
               //console.log("demandtype"+val.data.demandtype);
                this.demandId = val.demandId;
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
                    if(response.data.opResult == "004"|| response.data.receiveIntention == null){
                        this.$emit('transShow');
                    }
                    this.intentionCount = response.data.intentionCount;
                    this.detailData = response.data.data;
                     if(response.data.isAlreadyCollect == true){
                        this.isCollect = true;
                    }else if(response.data.isAlreadyCollect == false){
                        this.isCollect = false;
                    }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
            };
        });
     },
      components: {
            intentForm,
            transDialog,
            paySuccess
        }
}
</script>

<style lang="scss" scoped>
    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .4);
        z-index: 30;
    }
    .detail-wrapper{
        position:absolute;
        top:0;
        right:0;
        z-index: 16;
        width:600px;
        height:100%;
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
                      background-color:#3c78ff;
                  }
              }
              >.cancel{
                  color:#fff;
                  background-color:#3c78ff;

              }
          }
    }
</style>
