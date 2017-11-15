<template>
  <div class="publish">
      <div class="publish-wrapper">
          <div class="p-table">
              <header class="tip">发布需求</header>
              <div class="p-title">
                  <div>
                      <span>发布标题</span>
                      <input type="text" >
                  </div>
                  <div>
                      <span>需求类型</span>
                      <div class="need-btn">
                      运力投放<span class="icon-item icon-item1">&#xe605;</span>

                      </div>
                  </div>
              </div>
              <div class="p-input">
                  <ul class="p-select">
                      <li><span>机型123</span><input type="text"></li>
                      <li><span>座位布局</span><input type="text"></li>
                      <li><span>运力归属航司</span><input type="text"></li>
                      <li><span>运力所在基地</span><input type="text"></li>
                      <li class="point" ><div @click="check = !check" :class="{'checked':check}"></div><span @click="check = !check">接受调度</span></li>
                      <li><span>小时成本</span><input type="text"></li>
                      <li><span>意向航线</span><input type="text"></li>
                      <li class="notes"><span>其他说明</span><input type="text"></li>
                  </ul>
                  <div class="checkbox">
                      <!-- <input name="check" type="radio" checked>
                      <span>对所有人公开</span>
                      <input name="check" type="radio">
                      <span>对认证用户公开</span>
                      <input name="check" type="radio">
                      <span>定向发布</span> -->
                      <el-radio v-model="radio" label="1">对所有人公开</el-radio>
                      <el-radio v-model="radio" label="2">对认证用户公开</el-radio>
                      <el-radio v-model="radio" label="3">定向发布</el-radio>
                  </div>
                  <div class="may-wanted">
                      <div v-show="isShow">东方航空<span>x</span></div>
                      <div v-show="isShow">东方航空<span>x</span></div>
                      <div v-show="isShow">东方航空<span>x</span></div>
                      <div v-show="isShow">东方航空<span>x</span></div>
                      <span class="clear" @click="isShow = false">清空</span>
                  </div>
              </div>
              <div class="p-btn">
                  <div class="confirm-btn">确认发布</div>
                  <div class="agent-btn">委托代理</div>
                  <div class="cancel-btn" @click="cancel">取消</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
    export default{
      data(){
        return{
            check :false,
            isShow: true,
            radio:'1'
        }
      },
      methods:{
        cancel: function(){
           this.$emit("toShow");
        }
      }
    }
</script>
<style scoped lang="scss">
    @mixin input-style{
        height:30px;
        line-height:30px;
        border:0;
        outline: none;
        border-bottom:1px solid #ccc;
    }
    .publish {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color:#ffffff;
        z-index:999;
        overflow-x: scroll;
        >.publish-wrapper{
            box-sizing:border-box;
            margin:0 auto;
            width:60%;
            height:100%;
            min-width:1300px;
            overflow:auto;
            background-color:#f8f8f8;
            padding: 0 80px;
            >.p-table{
                background-color:#ffffff;
            }
            .tip{
              height:100px;
              width:100%;
              line-height:100px;
              background-color:#f8f8f8;
            }
        }

    }
    .p-title{
        display:flex;
        height:100px;
        width:100%;
        color:#666;
        box-sizing:content-box;
        border-bottom:20px solid #f8f8f8;
        >div{
            flex:1;
            padding-left:30px;          
            >span{
                width:30%;
                height:30px;
                padding-right:10px;
                line-height:100px;
            }
            >input{
                width:60%;
                @include input-style;
            }
            >.need-btn{
                display:inline-block;
                height:30px;
                width:58%;
                line-height:30px;
                text-align:center;
                border:1px solid #ccc;
                border-radius:4px;
            }
        }
    }
    .need-btn{
        position:relative;
        >span{
            position:absolute;
            top:0;
            right:10px;
            height:30px;
        }
        .icon-item {
          font-size: 1.6rem;
          font-family: iconfont;
        }
        .icon-item1{
            color: #446cea;
        }
    }
    .p-select{
      display:block;
      padding-left: 30px;
      overflow:auto;
      color:#666;
      >li{
          display:block;
          float:left;
          width:33.333%;
          height:60px;
          line-height:60px;
          >input{
              width:40%;
              @include input-style;
          }
          >span{
              display:inline-block;
              box-sizing:border-box;
              text-align:left;
              width:20%;
              min-width:40px;
              line-height:60px;
          }
      }
      >.notes{
          width:100%;
          >input{
            width:80%;
          }
          >span{
            width:20%;
            max-width:73.9px;
          }
      }

    }
    .point{
        >div{
            display:inline-block;
            width:10px;
            height:10px;
            border:1px solid #ccc;
            border-radius:100%;
            margin-right:5px;
            cursor:pointer;
        }
        .checked{
            background-color:#4079fc;
        }
        >span{
            cursor:pointer;
        }
    }
    .checkbox{
        margin-left: 30px;
    }
    /*  .is-checked .el-radio__label{
         color:#ccc!important;
     } */

    .may-wanted{
      position:relative;
      margin-top:30px;
      width:100%;
      height:150px;
      color:#4079fc;
      background-color:#ededed;
      overflow:hidden;
      div{
        float:left;
        width:100px;
        height:30px;
        margin:15px;
        line-height:30px;
        text-align:left;
        padding-left:15px;
        border-radius:100px;
        background-color:#f3f3f7;
        span{
          display:block;
          width:16px;
          height:16px;
          text-align:center;
          line-height:16px;
          float:right;
          margin: 7px;
          background-color:#fff;
          border-radius:100%;
        }
      }
      .clear{
        position:absolute;
        top:30px;
        right:20px;
        cursor:pointer;
      }
    }
    .p-btn{
        font-size: 1.5rem;
        background-color:#fff;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        padding:80px 0;
        >div{
          width:90px;
          height:40px;
          line-height:40px;
          border-radius:100px;
          margin:0 10px;
          text-align:center;
          color:#ffffff;
          background-color:#4079fc;
          cursor:pointer;
        }
        .confirm-btn{
          padding:0 20px;
        }
        .cancel-btn{
          color:#8f8ea2;
          background-color:#fff;
          border: 1px solid #8f8ea2;
        }
    }
</style>

