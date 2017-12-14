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
                <div class="intent-box" v-for=" val in detailData">
                     <div class="intent-item">
                        <div class="time">2012.12.13</div>
                        <div class="person">{{val.intentionCompanyName}}<span class="iconfont">&#xe602;</span></div>
                        <div class="detail" @click="closeDetail">{{text}}</div>
                    </div>
                    <div class="intent-detail" v-show="detailShow">
                        <div class="airline">
                            <div class="airplace">
                                <div>始发机场</div>
                                <div>
                                    <div>{{val.dpt}}</div>
                                    <div v-if="val.dptAcceptnearairport == 0">接受临近机场</div>
                                </div>
                                <div class="resouse">
                                    <div>出港资源</div>
                                    <div>{{val.dptTime}}</div>
                                </div>
                            </div>
                            <div style="padding-top:58px;"><span class="iconfont">&#xe672;</span></div>
                            <div class="airplace">
                                <div>经停机场</div>
                                <div>
                                    <div>{{val.pst}}</div>
                                    <div v-if="val.pstAcceptnearairport == 0">接受临近机场</div>
                                </div>
                                <div class="resouse">
                                    <div>出港资源</div>
                                    <div>{{val.pstTime}}</div>
                                </div>
                            </div>
                            <div style="padding-top:58px;"><span class="iconfont">&#xe672;</span></div>
                            <div class="airplace">
                                <div>到达区域</div>
                                <div>
                                    <div>{{val.arrv}}</div>
                                    <div v-if="val.arrvAcceptnearairport == 0">接受临近机场</div>
                                </div>
                                <div class="resouse">
                                    <div>出港资源</div>
                                    <div>{{val.arrvTime}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="table-form">
                            <div>
                                <div>拟开时间</div>
                                <div>{{val.sailingtime}}</div>
                            </div>
                            <div>
                                <div>拟开班期</div>
                                <div>{{val.days}}</div>
                            </div>
                            <div>
                                <div>拟开机型</div>
                                <div>{{val.aircrfttyp}}</div>
                            </div>
                            <div>
                                <div>座位数</div>
                                <div>{{val.seating}}</div>
                            </div>
                            <div>
                                <div>客量预期</div>
                                <div>{{val.avgguestexpect}}人</div>
                            </div>
                            <div>
                                <div>客座率预期</div>
                                <div>{{val.loadfactorsexpect}}%</div>
                            </div>
                            <div>
                                <div>补贴政策</div>
                                <div>{{val.subsidypolicy}}</div>
                            </div>
                            <div>
                                <div>小时成本</div>
                                <div>{{val.hourscost}}万元/小时</div>
                            </div>
                            <div>
                                <div>运力归属</div>
                                <div>{{val.capacitycompany}}</div>
                            </div>
                            <div>
                                <div>运力基地</div>
                                <div>{{val.dpt}}</div>
                            </div>
                            <div>
                                <div>是否调度</div>
                                <div>{{val.scheduling}}</div>
                            </div>
                            <div class="tips">
                                <div>其他说明</div>
                                <div>{{val.remark}}</div>
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
              detailData:{}
            }
        },
        props:['demandId'],
        mounted() {
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
                    this.detailData = response.data.listSonDemands;
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
        },
        components:{

        },
        methods:{
             getNeed: function(i){

            },
            closeForm: function(){

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
                    margin:0 40px 0 20px;
                    width:80px;
                    overflow:hidden;
                }
                .person{
                    display:flex;
                    width:120px;
                    span{
                        font-size:25px;
                        margin-left:10px;
                    }

                }
                .detail{
                    width:60px;
                    margin-left:210px;
                    color:#3C78FF;
                    cursor:pointer;
                }
            }

        }
</style>


