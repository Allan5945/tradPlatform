<template>
    <div class="wrapper" @click.self="closeDetail">
        <div class="detail-wrapper" v-if="myShow1">
            <header>
                <div class="top-til">{{detailData.demandtypeStr||'-'}}详情<span @click="closeDetail" class="iconfont">&#xe62c;</span></div>
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
            </header>
            <div class="content">
              <div v-if="role.role == 2">
                  <div>联系人</div>
                  <div>{{detailData.contact||'-'}}</div>
              </div>
              <div v-if="role.role == 2">
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
               <div v-if="role.role == 2">
                    <div>运力归属</div>
                    <div v-if="detailData.capacityCompany">{{detailData.capacityCompany.airlnCd||'-'}}</div>
                </div>
                <div v-else>
                    <div>运力归属</div>
                    <div>***</div>
                </div>
                <div>
                    <div>小时成本</div>
                    <div>{{detailData.hourscost? detailData.hourscost+'万/小时':'-'}}</div>
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
                    <div class="list-wrapper" v-show="schedulListShow"  v-if="detailData.scheduling == '0'">
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
               <div class="intent-airline" v-else>
                   <div>意向航线</div>
                   <div class="i-line">-</div>
               </div>
                <div>
                    <div>有效期</div>
                    <div v-if="detailData.periodValidity">{{detailData.periodValidity.split('-')[1]||'-'}}止</div>
                </div>
                 <div class="note" v-if="role.role == 2">
                    <div>其他说明</div>
                    <div>{{detailData.remark||'-'}}</div>
                </div>
            </div>
            <footer>
                <div v-if="role.role == 2"></div>
                <div v-else>*隐藏信息在提交意向后可查看</div>
                <div class="btn">
                    <div class="intent-btn btn-b" @click="haveInvent" v-if="inventBtnShow"><span class="iconfont">&#xe62f;</span>我有意向</div>
                     <div class="col-btn cancel btn-b" :class="{active: !inventBtnShow}" @click="cancelCollect" v-if="isCollect" @mouseover="changeText(1)" @mouseout="changeText(2)">{{text}}</div>
                    <div class="col-btn btn-w" :class="{active: !inventBtnShow}" @click="collect" v-else>收藏</div>
                </div>
            </footer>
        </div>
        <myResponse v-if="myShow2" @responseClose="closeDetail" :resData="resData"></myResponse>
        <intentForm v-if="intentFormShow" @sumitForm="dialog = true" @closeForm="closeForm" :acceptData="detailData"></intentForm>
        <transDialog v-show="dialog"  @cancel="closeDialog" @sure="sureDialog" @payFail="payFail"></transDialog>
        <paySuccess @cancel="closePaySuccess" v-show="payDialog"></paySuccess>
        <payFailDialog @cancel="cancelPayFail" v-if="payFailShow"></payFailDialog>
    </div>
</template>

<script>
 import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';
 import * as vx from 'vuex';
 import intentForm from '$src/page/components/trans_detail/intentForm1.vue'
 import transDialog from '$src/page/components/trans_detail/transDialog.vue'
 import paySuccess  from '$src/page/components/trans_detail/paySuccess.vue';
 import payFailDialog  from '$src/page/components/trans_detail/payFailOfBalance.vue'

 import myResponse from './myResponse.vue'
 import lonSpan from '$src/page/components/publicTools/scrollTxt.vue';

 export default {
     data(){
         return{
             getDetail:[],
             detailData:{},
             intentionCount:0,
             demandId:'',
             resData:{},
             text:'已收藏',
             schedulListShow:false,
             myShow1:false,
             myShow2:false,
             isCollect:false,
             intentFormShow:false,
             dialog:false,
             payDialog:false,
             inventBtnShow:false,
             payFailShow:false,
             myTitle: '',
             receiveIntention: {},
             loadingPayShow: true,
         }
     },
     props:['needData'],
     methods:{
         closeDetail:function(){
            this.$emit('closeDetail');
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
          payFail:function(){
            this.intentFormShow = false;
            this.dialog = false;
            this.payFailShow = true;
         },
         cancelPayFail:function(){
            this.payFailShow = false;
         },
        closePaySuccess:function(){
            this.payDialog = false;
            this.$emit('closeDetail');
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
                  this.isCollect = true;
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
                      this.$emit('closeDetail');
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
         init:function(){
              if(this.needData.demandType == 1){
                this.demandId = this.needData.id;
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
                    this.myTitle = `${response.data.data.title}运力投放`;
                    this.receiveIntention = response.data.receiveIntention;
                    if(response.data.receiveIntention == null){
                        this.myShow1 = true;
                        this.intentionCount = response.data.intentionCount;
                        this.detailData = response.data.data;

                        let progress = this.detailData.demandprogress;
                         //需求发布、意向征集、订单确认
                        if(progress == '0'||progress == '1'||progress == '2'){
                            this.inventBtnShow = true;
                        }else{
                            this.inventBtnShow = false;
                        }

                    }else if( response.data.receiveIntention !== null){
                        this.myShow2 = true;
                        this.resData = response.data;
                    }

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
         }
     },
     computed: {
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
            tabulationBoxTrigger.hierarchy = true;
            this.init();
     },
    destroyed: function () {
        tabulationBoxTrigger.hierarchy = false;
    },
      components: {
            intentForm,
            transDialog,
            paySuccess,
            myResponse,
            payFailDialog,
          lonSpan,
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
        z-index: 16;
        width:600px;
        height:100%;
        min-height:600px;
        color:#605E7C;
        background-color:#fff;
        header{
            width:100%;
            /*height:141px;*/
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
        padding-top: 41px;
        .top-til{
            position: fixed;
            top: 0;
            right: 0;
            width: 545px;
            background: white;
            z-index:2;
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
                  /*color:#fff;*/
                  /*background-color:#3c78ff;*/
                  text-align:center;
                  border-radius:100px;
                  margin-right:10px;
                  cursor:pointer;
                  /*box-shadow: 1px 2px 18px rgba(60, 120, 255,0.5);*/
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
                  /*color:#605E7C;*/
                  /*background-color:#fff;*/
                  text-align:center;
                  border-radius:100px;
                  cursor:pointer;
                  /*box-shadow: 1px 2px 18px rgba(60, 120, 255,0.5);*/
                  &:hover{
                      color:#fff;
                      background-color:#3c78ff;
                  }
              }
              >.cancel{
                  color:#fff;
                  background-color:#3c78ff;

              }
              >.active{
                width:180px;
              }

          }
    }
</style>
