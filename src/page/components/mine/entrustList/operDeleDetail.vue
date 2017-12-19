<template>
    <div class="wrapper" @click.self="closeDetail">
        <div class="detail-wrapper scroll" >
            <header>
                <div class="top-til">{{detailData.demandtypeStr}}详情<span  class="iconfont" @click="closeDetail">&#xe62c;</span></div>
                <div class="head-til">{{detailData.title}}</div>
                <div class="contact" v-if="!isUser">联系用户</div>
                 <div class="contact" v-else>联系客服</div>
                <div class="tips">
                    <div>委托方&nbsp;{{CpyNm}}</div>
                    <div>创建于{{detailData.releasetime}}</div>
                    <div><span>{{detailData.demandprogressStr}}</span></div>
                </div>
            </header>
            <div class="content">
                <div class="airline">
                    <div class="air-box">
                        <div>始发机场</div>
                        <div  class="place">
                            <div>{{detailData.dptNm}}</div>
                            <div>{{detailData.dptAcceptnearairportStr}}临近机场</div>
                        </div>
                        <div>
                            <div>出港时刻</div>
                            <div>{{detailData.dptTime}}</div>
                       </div>
                    </div>
                    <div class="air-box">
                        <div>到达机场</div>
                        <div class="place">
                            <div>{{detailData.arrvNm}}</div>
                            <div>{{detailData.arrvAcceptnearairportStr}}临近机场</div>
                        </div>
                        <div>
                            <div>出港时刻</div>
                            <div>{{detailData.arrvTime}}</div>
                       </div>
                    </div>
                </div>
                <div class="content-box border">
                    <div >
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
                        <div>座位布局</div>
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
                        <div>{{detailData.subsidypolicynumber }}</div>
                    </div>
                    <div>
                        <div>有效期</div>
                        <div>{{detailData.periodValidity}}</div>
                    </div>
                    <div class="note">
                        <div>其他说明</div>
                        <div class="note-text">{{detailData.remark}}</div>
                    </div>
                </div>
                <div class="content-box ">
                    <div>
                        <div>联系人</div>
                        <div>{{detailData.contact}}</div>
                    </div>
                    <div>
                        <div>联系方式</div>
                        <div>{{detailData.iHome}}</div>
                    </div>
                </div>
            </div>
            <div class="sub-need" v-show="orderShow" v-if="!isUser">
                  <div class="need-til">关联的子需求</div>
                  <div class="need-btn" @click="newNeed">新建子需求</div>
            </div>
            <div class="sub-need" v-if="isUser" v-show="!showBtn">
                <div class="need-til">关联的子需求</div>
            </div>
            <div v-if="isUser" v-show="!showBtn">
                <div class="user-need">
                    <div>发布时间
                      <span class="iconfont icon-up active">&#xe605;</span>
                      <span class="iconfont icon-down">&#xe605;</span>
                    </div>
                    <div>发布标题</div>
                    <div>需求状态</div>
                </div>
                <div class="user-need-content" v-for ="val in sonList">
                    <div class="time">{{val.releasetime}}</div>
                    <div class="title">{{val.title}}</div>
                    <div class="progress">{{val.demandprogressStr}}</div>
                </div>
            </div>
           <sonNeedDetail :demandId = "demandId" v-if="!isUser" v-show="sondetailShow"></sonNeedDetail>
            <footer v-if="isUser" v-show="showBtn">
                <div class="foot-tips"></div>
                <div class="btn">
                    <div class="cancel-btn" @click="canceldele">撤回该托管</div>
                </div>
            </footer>
             <footer v-if="!isUser" v-show="isClose">
                <div class="foot-tips"></div>
                <div class="btn" v-if="orderShow">
                    <div class="test-btn" @click="order" >订单完成</div>
                    <div class="can-btn" @click="cancel">取消</div>
                </div>
                <div class="btn" v-else>
                    <div class="test-btn" @click="accept">接受委托</div>
                    <div class="can-btn" @click="refuse">拒绝</div>
                </div>
            </footer>
        </div>
        <operDeleForm v-show="formShow" @closeForm="closeForm" ></operDeleForm>
    </div>
</template>

<script>
import operDeleForm from './operDeleForm.vue'
import sonNeedDetail from './sonNeedDetail.vue'
import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js'
import * as vx from 'vuex';
 export default {
     data(){
         return{
            dialogShow:false,
            orderShow:false,
            isUser:true,
            formShow:false,
            showBtn:false,
            isClose:true,
            detailData:{},
            CpyNm:'',//委托方
            sondetailShow:false,
            sonList:[]
         }
     },
      props:['demandId'],
     methods:{
        closeDetail(){
          this.$emit("close");
        },
        canceldele(){
          this.$ajax({
                method: 'post',
                url: '/closeDemandById',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    id:this.demandId
                  }
                })
                .then((response) => {
                    if(response.data.opResult == "0"){
                      alert("取消委托成功")
                    }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
        },
        refuse(){

        },
        newNeed(){
          this.formShow = true;
        },
        accept(){
            this.orderShow = true;
        },
        order(){

        },
        cancel(){

        },
        closeForm(){
          this.formShow =false;
          this.sondetailShow = true;
        }
     },
      computed: {
            ...vx.mapGetters([
                'role'
            ])
        },
      mounted() {
          tabulationBoxTrigger.$emit('getSonId', this.demandId);
          tabulationBoxTrigger.hierarchy = true;
          this.$ajax({
                method: 'post',
                url: '/getCommissionedAndCustodyDemandDetails',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    id:this.demandId
                  }
                })
                .then((response) => {
                    this.CpyNm = response.data.CpyNm;
                    this.detailData = response.data.demandDetail;
                    this.sonList = response.data.listSonDemands;
                     //状态处理
                      if(this.detailData.demandprogress == '7'){
                          this.showBtn = true;
                      }else if(this.detailData.demandprogress == '6' ){
                          this.orderShow = true;
                          this.sondetailShow = true;
                      }else if(this.detailData.demandprogress == '9'){
                          this.orderShow = true;
                      }else if(this.detailData.demandprogress == '3'){
                          this.isClose = false;
                      }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );

          if(this.role.role == "2"){
              this.isUser = false;
          }

     },
    destroyed: function () {
        tabulationBoxTrigger.hierarchy = false;
    },
     components: {
        operDeleForm,
        sonNeedDetail
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
        .content{
            padding:40px 40px 0 40px;
        }
        footer{
          position:fixed;
          bottom:0;
          right:0;
          width:600px;
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
      >div:nth-of-type(odd){
          margin-right:40px;
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
    .user-need{
        position:relative;
        height:75px;
        width:100%;
        color:rgba(96, 94, 124, 0.7);
        box-sizing:border-box;
        display:flex;
        padding: 30px 0 25px 40px;
        >div{
            flex:1;
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
    }
    .user-need-content{
        height:50px;
        width:100%;
        box-sizing:border-box;
        padding-left: 40px;
        margin-bottom:10px;
        display:flex;
        background-color:rgba(216,216,216,.17);
        >div{
            flex:1;
            overflow:hidden;
            padding-right:50px;
            line-height:50px;
        }
    }
    footer{
          .foot-tips{
            height:40px;
            margin:0 20px;
            border-bottom:1px solid #ccc;
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
                  border:1px solid rgba(96,94,124,.6);
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
              }
          }
    }
</style>
