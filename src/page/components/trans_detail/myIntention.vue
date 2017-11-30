<template>
    <div class="plan-wrapper scroll" v-show="planShow" >
        <header>
            <div class="top-til">需求详情<span>X</span></div>
            <div class="head-til">成都新开找运力</div>
            <div class="note">
                <span>创建于2017.12.12</span>
                <span>状态：<span style="color:#3C78FF;">洽谈中</span></span>
            </div>
        </header>
        <div class="content">
            <div class="table-form">
                <div >
                    <div>出港时刻</div>
                    <div>08:00 - 12:00</div>
                </div>
                <div>
                    <div>班期</div>
                    <div>待定</div>
                </div>
                <div>
                    <div>机型</div>
                    <div>AA2222</div>
                </div>
                <div>
                    <div>运力基地</div>
                    <div>双流机场</div>
                </div>
                <div>
                    <div>运力归属</div>
                    <div>东方航空</div>
                </div>
                <div>
                    <div>座位布局</div>
                    <div>F8Y160</div>
                </div>
                <div>
                    <div>小时成本</div>
                    <div>1万元/小时</div>
                </div>
                <div>
                    <div>接受调度</div>
                    <div>武汉</div>
                </div>
                <div>
                    <div>有效期</div>
                    <div>2017.12.1 - 2018.12.1</div>
                </div>
                 <div class="tips">
                    <div>其他说明</div>
                    <div>说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容
                        说明内容说明内容说明内容说明内容说明内容说明内容容说明内容说明内容说明内容</div>
                    </div>
            </div>
            <div class="intent">
                <div class="intent-til">
                    <div>收到的意向</div>
                    <div>已有<span style="color:#3C78FF;font-weight:bold;">2</span>位用户发起意向</div>
                </div>
                <div class="intent-form">
                    <div>
                        <div>收到时间<span>--</span></div>
                        <div>意向方</div>
                    </div>
                    <div class="intent-box">
                         <div class="intent-item">
                            <div class="time">11.04.2017</div>
                            <div class="person">南方航空<span>--</span></div>
                            <div class="detail" @click="closeDetail">查看详情</div>
                        </div>
                        <div class="intent-detail" v-show="detailShow">
                            <div class="airline">
                                <div class="airplace">
                                    <div>始发机场</div>
                                    <div>
                                        <div>成都双流</div>
                                        <div>接受临近机场</div>
                                    </div>
                                    <div class="resouse">
                                        <div>出港资源</div>
                                        <div>08:00 - 12:00</div>
                                    </div>
                                </div>
                                <div><span>--</span></div>
                                <div class="airplace">
                                    <div>经停机场</div>
                                    <div>北京西苑</div>
                                    <div class="resouse">
                                        <div>出港资源</div>
                                        <div>带协调</div>
                                    </div>
                                </div>
                                <div><span>--</span></div>
                                <div class="airplace">
                                    <div>到达区域</div>
                                    <div>华北地区</div>
                                </div>
                            </div>
                            <div class="table-form">
                                <div>
                                    <div>拟开时间</div>
                                    <div>2017.11.11 - 2018.11.11</div>
                                </div>
                                <div>
                                    <div>拟开班期</div>
                                    <div>待定</div>
                                </div>
                                <div>
                                    <div>拟开机型</div>
                                    <div>AA2222</div>
                                </div>
                                <div>
                                    <div>座位数</div>
                                    <div>180</div>
                                </div>
                                <div>
                                    <div>客量预期</div>
                                    <div>80人/班</div>
                                </div>
                                <div>
                                    <div>客座率预期</div>
                                    <div>80人/班</div>
                                </div>
                                <div>
                                    <div>补贴政策</div>
                                    <div>80人/班</div>
                                </div>
                                <div>
                                    <div>小时成本</div>
                                    <div>80人/班</div>
                                </div>
                                <div>
                                    <div>运力归属</div>
                                    <div>80人/班</div>
                                </div>
                                <div>
                                    <div>运力基地</div>
                                    <div>80人/班</div>
                                </div>
                                <div>
                                    <div>是否调度</div>
                                    <div>华北地区</div>
                                </div>
                                <div class="tips">
                                    <div>其他说明</div>
                                    <div>说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容
                                    说明内容说明内容说明内容说明内容说明内容说明内容容说明内容说明内容说明内容</div>
                                </div>
                            </div>
                            <div class="sure-btn">选定</div>
                        </div>
                    </div>
                     <div class="intent-box">
                         <div class="intent-item">
                            <div class="time">11.04.2017</div>
                            <div class="person">南方航空<span>--</span></div>
                            <div class="detail" @click="closeDetail">查看详情</div>
                        </div>
                        <div class="intent-detail" v-show="detailShow">
                            <div class="airline">
                                <div class="airplace">
                                    <div>始发机场</div>
                                    <div>
                                        <div>成都双流</div>
                                        <div>接受临近机场</div>
                                    </div>
                                    <div class="resouse">
                                        <div>出港资源</div>
                                        <div>08:00 - 12:00</div>
                                    </div>
                                </div>
                                <div><span>--</span></div>
                                <div class="airplace">
                                    <div>经停机场</div>
                                    <div>北京西苑</div>
                                    <div class="resouse">
                                        <div>出港资源</div>
                                        <div>带协调</div>
                                    </div>
                                </div>
                                <div><span>--</span></div>
                                <div class="airplace">
                                    <div>到达区域</div>
                                    <div>华北地区</div>
                                </div>
                            </div>
                            <div class="table-form">
                                <div>
                                    <div>拟开时间</div>
                                    <div>2017.11.11 - 2018.11.11</div>
                                </div>
                                <div>
                                    <div>拟开班期</div>
                                    <div>待定</div>
                                </div>
                                <div>
                                    <div>拟开机型</div>
                                    <div>AA2222</div>
                                </div>
                                <div>
                                    <div>座位数</div>
                                    <div>180</div>
                                </div>
                                <div>
                                    <div>客量预期</div>
                                    <div>80人/班</div>
                                </div>
                                <div>
                                    <div>客座率预期</div>
                                    <div>80人/班</div>
                                </div>
                                <div>
                                    <div>补贴政策</div>
                                    <div>80人/班</div>
                                </div>
                                <div>
                                    <div>小时成本</div>
                                    <div>80人/班</div>
                                </div>
                                <div>
                                    <div>运力归属</div>
                                    <div>80人/班</div>
                                </div>
                                <div>
                                    <div>运力基地</div>
                                    <div>80人/班</div>
                                </div>
                                <div>
                                    <div>是否调度</div>
                                    <div>华北地区</div>
                                </div>
                                <div class="tips">
                                    <div>其他说明</div>
                                    <div>说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容说明内容
                                    说明内容说明内容说明内容说明内容说明内容说明内容容说明内容说明内容说明内容</div>
                                </div>
                            </div>
                            <div class="sure-btn">选定</div>
                        </div>
                    </div>

                </div>


            </div>

        </div>
        <footer>
            <div class="btn">
                <div class="agent-btn" >委托代理</div>
                <div class="col-btn">结束需求</div>
            </div>
        </footer>
    </div>
</template>

<script>
 export default {
     data(){
         return{
             planShow:true,
             detailShow:false
         }
     },
     methods:{
         closeDetail:function(){
             this.detailShow = !this.detailShow;
         },

     },
      mounted:function(){
          this.$ajax({
                method: 'post',
                url: '/capacitydemand/capacityDemandFindById',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
                .then((response) => {

                })
                .catch((error) => {
                        console.log(error);
                    }
                );
      }

}
</script>

<style lang="scss" scoped>
    .plan-wrapper{
        position:absolute;
        top:0;
        right:0;
        z-index: 12;
        width:600px;
        box-sizing:border-box;
        height:100%;
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
          font-size:20px;
          margin-top:30px;
          padding-left:40px;
          height:20px;
          line-height:20px;
        }
        .note{
          height:12px;
          line-height:12px;
          padding:20px 0 18px 40px;
          span{
            margin-right:30px;
          }
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
          >div{
              margin-bottom:20px;
              height:20px;
              line-height:20px;
          }
          >div:nth-of-type(1){
              width:80px;
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
              line-height:20px;
              padding-left:40px;
              color:#605E7C;
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
                height:75px;
                width:100%;
                box-sizing:border-box;
                padding: 30px 0 25px 40px;
                >div{
                    display:inline-block;
                    width:80px;
                    padding-right:40px;
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
                }
                .person{
                    width:120px;
                    span{
                        width:40px;
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
              }
              .agent-btn{
                  width:120px;
                  color:#fff;
                  background-color: #3C78FF;
                  margin-right:12px;
              }
               .col-btn{
                  width:100px;
              }
          }
    }
</style>
