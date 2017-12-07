<template>
    <div>
        <div class="detail-wrapper">
            <header>
                <div class="top-til">航线委托详情<span  class="iconfont" @click="closeDetail">&#xe62c;</span></div>
                <div class="head-til">成都-北京-上海航线需求</div>
                <div class="contact">联系用户</div>
                <div class="tips">
                    <div>委托方&nbsp;成都双流机场</div>
                    <div>创建于2017.12.12</div>
                    <div v-show="orderShow"><span>委托响应中</span></div>
                </div>
            </header>
            <div class="content">
                <div class="airline">
                    <div class="air-box">
                        <div>始发机场</div>
                        <div  class="place">
                            <div>成都双流</div>
                            <div>接受临近机场</div>
                        </div>
                        <div>
                            <div>出港时刻</div>
                            <div>08:00-12:00</div>
                       </div>
                    </div>
                    <div class="air-box">
                        <div>到达机场</div>
                        <div class="place">
                            <div>成都双流</div>
                            <div>接受临近机场</div>
                        </div>
                        <div>
                            <div>出港时刻</div>
                            <div>08:00-12:00</div>
                       </div>
                    </div>
                </div>
                <div class="content-box border">
                    <div >
                        <div>拟开时间</div>
                        <div>HU8888</div>
                    </div>
                    <div>
                        <div>拟开班期</div>
                        <div>6.5万/小时</div>
                    </div>
                    <div>
                        <div>拟飞机型</div>
                        <div>无补贴政策</div>
                    </div>
                     <div>
                        <div>座位布局</div>
                        <div>无补贴政策</div>
                    </div>
                     <div>
                        <div>客量期望</div>
                        <div>无补贴政策</div>
                    </div>
                    <div>
                        <div>客座率期望</div>
                        <div>80%</div>
                    </div>
                    <div>
                        <div>补贴政策</div>
                        <div>按人头</div>
                    </div>
                    <div>
                        <div>有效期</div>
                        <div>201711.11-2018.11.11</div>
                    </div>
                    <div class="note">
                        <div>其他说明</div>
                        <div class="note-text">有补贴有补贴有补贴有补贴有补贴有补贴有补贴有补贴有补贴有
                        补贴有补贴有补贴有补贴有补贴有补贴有补贴</div>
                    </div>
                </div>
                <div class="content-box ">
                    <div>
                        <div>联系人</div>
                        <div>张三</div>
                    </div>
                    <div>
                        <div>联系方式</div>
                        <div>5409095445</div>
                    </div>
                </div>
            </div>
            <div class="sub-need" v-show="orderShow">
                  <div class="need-til">关联的子需求</div>
                  <div class="need-btn">新建子需求</div>
            </div>
            <footer>
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
        <!-- <operDeleForm></operDeleForm> -->
    </div>
</template>

<script>
import operDeleForm from './operDeleForm.vue'
 export default {
     data(){
         return{
            dialogShow:false,
            orderShow:false
         }
     },
     methods:{
        closeDetail:function(){
          this.$emit("close");
        },
        refuse:function(){

        },
        accept(){
            this.orderShow = true;
        },
        order(){

        },
        cancel(){

        }
     },
     computed: {

        },
      mounted() {

     },
     components: {
        operDeleForm
     }
}
</script>

<style lang="scss" scoped>
    .detail-wrapper{
        position:absolute;
        top:0;
        right:0;
        z-index: 12;
        width:600px;
        height:100%;
        min-height:600px;
        color:#605E7C;
        font-size:1.2rem;
        overflow: hidden;
        overflow-y:scroll;
        background-color:#fff;
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
          }
    }
</style>
