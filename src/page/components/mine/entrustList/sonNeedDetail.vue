<template>
    <div>
         <div class="intent">
            <div class="intent-form">
                <div>
                    <div>发布时间
                      <span class="iconfont icon-up active">&#xe605;</span>
                      <span class="iconfont icon-down">&#xe605;</span>
                    </div>
                    <div>发布标题</div>
                    <div>需求状态</div>
                </div>
                <div class="intent-box" v-for="(val,index) in detailData">
                     <div class="intent-item">
                        <div class="time">{{val.releasetime}}</div>
                        <div class="title">{{val.title}}</div>
                        <div class="progress">{{val.demandprogressStr}}<span class="iconfont">&#xe602;</span></div>
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
                                    <div>{{val.subsidypolicyStr||'-'}}</div>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return{
              showDetailIndex:'',
            }
        },
        props:['detailData'],
        methods:{
              closeDetail:function(){
                 this.showDetailIndex = '';
             },
              openDetail:function(index){
                 this.showDetailIndex = index;
             }
        }
    }
</script>

<style scoped lang="scss">
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
                    padding-left:20px;
                    width:140px;
                    overflow:hidden;
                }
                .title{
                    width:140px;
                    overflow:hidden;
                }
                .progress{
                    padding-left:40px;
                    display:flex;
                    width:200px;
                    span{
                        font-size:25px;
                        margin-left:10px;
                    }

                }
                .detail{
                    width:140px;
                    color:#3C78FF;
                    cursor:pointer;
                }
            }

        }
</style>


