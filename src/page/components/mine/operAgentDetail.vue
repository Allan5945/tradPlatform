<template>
    <div>
        <div class="detail-wrapper">
            <header>
                <div class="top-til">运营托管详情<span  class="iconfont" @click="closeDetail">&#xe62c;</span></div>
                <div class="head-til">运营托管详情1111</div>
                <div class="contact">联系用户</div>
                <div class="tips">
                    <div>委托方&nbsp;成都双流机场</div>
                    <div>创建于2017.12.12</div>
                    <div>状态: <span>已拒绝</span></div>
                </div>
            </header>
            <div class="content">
                <div class="content-box">
                    <div >
                        <div>航班号</div>
                        <div>HU8888</div>
                    </div>
                    <div>
                        <div>小时成本</div>
                        <div>6.5万/小时</div>
                    </div>
                    <div>
                        <div>其他说明</div>
                        <div>无补贴政策</div>
                    </div>
                </div>
                <div class="content-box border">
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
            <footer>
                <div class="foot-tips">*拒绝原因</div>
                <div class="btn">
                    <div class="test-btn">测评该需求</div>
                    <div class="can-btn" @click="cancel">拒绝</div>
                </div>
            </footer>
        </div>
        <refuseDialog @sure="sureDialog" v-show="dialogShow" @cancel="cancelDialog"></refuseDialog>
    </div>
</template>

<script>
import refuseDialog from './refuseDialog.vue';
 export default {
     data(){
         return{
            dialogShow:false
         }
     },
     methods:{
        closeDetail:function(){
          this.$emit("close");
        },
        cancel:function(){
          this.dialogShow = true;
        },
        sureDialog(){
          this.dialogShow = false;
        },
        cancelDialog(){
          this.dialogShow = false;
        }
     },
     computed: {

        },
      mounted() {

     },
     components: {
          refuseDialog
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
          span{
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
    }
    .border{
      padding-top:40px;
      border-top:1px solid #ccc;
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
                  color:#605E7C;
                  background-color:#fff;
                  text-align:center;
                  border-radius:100px;
                  cursor:pointer;
                  box-shadow: 1px 2px 18px rgba(60, 120, 255,0.5);
              }
          }
    }
</style>
