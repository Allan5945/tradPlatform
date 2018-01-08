<template>
    <div>
      <div class="plan-wrapper scroll">
          <header>
              <div class="top-til">{{detailData.demandtypeStr||'-'}}详情<span @click="closeDetail" class="iconfont close">&#xe62c;</span></div>
              <div class="head-til">{{detailData.title||'-'}}运力投放</div>
              <div class="tips">
                  <span>创建于{{detailData.releasetime||'-'}}</span>
                  <span>已有{{intentionCount||'0'}}位用户发起意向</span>
              </div>
          </header>
          <div class="content">
              <div class="table-form">
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
                  <div>
                      <div>小时成本</div>
                      <div>{{detailData.hourscost||'-'}}万/小时</div>
                  </div>
                  <div>
                      <div style="margin:0 0 0 40px;">接受调度</div>
                      <div>{{detailData.schedulingStr||'-'}}</div>
                  </div>
                  <div>
                      <div>有效期</div>
                      <div>{{detailData.periodValidity||'-'}}</div>
                  </div>
              </div>
              <div class="myplan">
                  <div class="plan-til">
                      <div>我发出的方案</div>
                      <div style="cursor:pointer;" @click="getSureForm" v-show="planData.responseselected !== '0' "><span class="iconfont" style="font-size:1.6rem;">&#xe653;</span>编辑</div>
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
                       <div>
                          <div>是否调度</div>
                          <div>{{planData.schedulingStr||'-'}}</div>
                      </div>
                      <div class="tips">
                          <div>其他说明</div>
                          <div>{{planData.remark||'-'}}</div>
                      </div>
                  </div>

              </div>

          </div>
          <footer v-if="planData.responseselected == '0' ">
              <div class="btn">
                  <div class="order" >已生成订单，无法更改</div>
              </div>
          </footer>
          <footer v-else>
              <div class="btn" v-if="planData.releaseselected == '0' ">
                  <div class="cancel-btn"  @click="confirm">确认方案</div>
                  <div class="refuse-btn" @click="refuse">拒绝并撤回</div>
              </div>
              <div class="btn" v-else>
                  <div class="cancel-btn"  @click="cancelIntent">取消意向</div>
                  <div class="col-btn" @click="collect" v-if="!isCollect">收藏</div>
                  <div class="col-btn"  v-if="isCollect">已收藏</div>
              </div>
          </footer>
      </div>
    <sureForm v-show="sureFormShow" @closeForm="closeSureForm" :acceptData = "planData"></sureForm>
    </div>
</template>

<script>
 import * as vx from 'vuex';
 import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';
 import sureForm from './sureForm1.vue'
 export default {
     data(){
         return{
             planShow:true,
             isCollect:false,
             sureFormShow:false,
             planData:{},
             detailData:{},
             intentionCount:0,
             demandData:{}
         }
     },
      components: {
            sureForm
        },
     methods:{
         closeDetail:function(){
          this.$emit('responseClose');
         },
         getSureForm:function(){
          this.sureFormShow = true;
         },
        closeSureForm(){
          this.sureFormShow = false;
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
         }

     },
      computed:{
         ...vx.mapGetters([
                'role'
            ])
      },
       mounted() {
        tabulationBoxTrigger.$on('tabulationBoxTrigger', val => {
            if(val.data.demandtype == 1 && this.role.role == 1){
               //console.log("demandtype"+val.data.demandtype);
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
                    if(response.data.opResult == "003"&& response.data.receiveIntention !== null){
                        this.$emit('responseShow');
                        this.isIntentionMoney = response.data.isIntentionMoney;
                        this.intentionCount = response.data.intentionCount;
                        this.detailData = response.data.data;
                        this.planData = response.data.receiveIntention;

                        if(response.data.isAlreadyCollect == true){
                            this.isCollect = true;
                        }else if(response.data.isAlreadyCollect == false){
                           this.isCollect = false;
                        }
                    }

                })
                .catch((error) => {
                        console.log(error);
                    }
                );

            };
        });

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
            .tips{
                width:100%;
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
               .col-btn{
                  width:80px;
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
