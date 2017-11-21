<template>
    <div class="agent-form scroll popup">
        <div class="t-must">
            <div class="form-box post-til">
                <div class="t-title">发布标题</div><input type="text" placeholder="标题会根据您的内容自动生成">
            </div>
            <div class="form-box">
                <div class="t-title">联系人</div><input type="text" placeholder="请填写有效联系人">
            </div>
            <div class="form-box">
                <div class="t-title">联系方式</div><input type="text" placeholder="请填写有效联系方式">
                <div class="error" v-show="isError">*电话格式有误，请重新输入</div>
            </div>
        </div>
        <div class="t-optional">
            <div class="form-box">
                <div class="t-title">需求类型</div>
                <div class="need-btn"  @click="showBox=!showBox">
                    <div class="title" v-text="msg" :class="{selected:isSel}"></div>
                    <span class="icon-item icon-item1">&#xe605;</span>
                    <div class="selc-list dropDown popup" v-show="showBox">
                        <div @click="getNeed(index)" v-for="(value,index) in needType">{{value}}</div>
                    </div>
                </div>
            </div>
            <div class="form-box">
                <div class="t-title">航班号</div><input type="text" placeholder="请输入选择">
            </div>
            <div class="form-box pad">
                <div class="t-title">小时成本</div><input type="text" placeholder="填写举例：3.5">
                <span>元</span>
            </div>
            <div class="form-box tips">
                <div class="t-title">其他说明</div><input type="text" placeholder="可选填" v-model="tip">
                <span class="num"><span >{{num}}</span>/35</span>
            </div>
        </div>
        <div class="t-btn">
            <div class="confirm-btn">提交</div>
            <div class="cancel-btn">取消</div>
        </div>
    </div>
</template>

<script>
 export default {
        data () {
            return{
                showBox: false,
                isSel: false,
                isError: false,
                tip: '',
                msg:'选择需求类型',
                needType:['运力投放','航线需求']
            }
        },
        methods:{
             getNeed: function(i) {
                this.msg = this.needType[i];
                this.isSel = true;
            }
        },
        computed:{
            num: function(){
                return this.tip.length <= 35? this.tip.length: 35;
            }
        },
        watch:{
            /*tip: function(val,oldVal){
                let len = oldVal.length;
                if(len>35){
                    val = oldVal.slice(1,3);
                }
            }*/
        }

    }
</script>

<style scoped lang="scss">
    input {
        outline:none;
        border: 0;
        color: #605E7C;
        border-bottom:1px solid rgba(151,151,151,.3);
    }
    .agent-form{
        position:absolute;
        top:65px;
        left:0;
        z-index:99;
        box-sizing:border-box;
        overflow-y: scroll;
        font-size:1.2rem;
        padding:20px;
        width:620px;
        height:630px;
        color: #605E7C;
        border-radius:4px;
        background-color:#fff;
        .t-must,.t-optional{
            width:100%;
            box-sizing:border-box;
            display:flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding:0 20px;
            border-radius:5px;
            background-color:#FBFBFB;
        }
        .t-optional{
            margin-top:10px;
        }

    }
    .form-box{
        width:240px;
        height:26px;
        line-height:26px;
        padding:27px 0;
        display:flex;
        .t-title{
            width:60px;
            overflow:hidden;
        }
        >input{
            width:180px;
            height:26px;
            background-color: #FBFBFB;
        }
    }
    .post-til{
      width:100%;
      input{
        width:473px;
      }
    }
    .need-btn{
            position: relative;
            box-sizing:border-box;
            height:26px;
            width:180px;
            display:flex;
            justify-content: space-between;
            padding-left:10px;
            line-height:26px;
            border: 1px solid rgba(96,94,124,.4);
            border-radius: 4px;
            cursor:pointer;
            .title{
                color: rgba(96,94,124,.4);
                font-size:1.2rem;
            }
            .selected{
                color:#605E7C;
            }
            .icon-item {
                font-size: 1.6rem;
                font-family: iconfont;
            }
            .icon-item1{
                color: #446cea;
                padding-right:14px;
            }
            .selc-list{
                position:absolute;
                top:26px;
                left:0;
            }
       }
      .dropDown {
          width:180px;
          background-color: #fff;
          border-radius: 4px;
          z-index:999;
          >div {
            width: 100%;
            height:35px;
            box-sizing: border-box;
            line-height:35px;
            padding-left: 14px;
            color: #605E7C;
            font-size: 1.2rem;
            cursor:pointer;
            &:hover{
                background-color:rgba(235,235,235,.5);
            }
          }
      }
      .tips{
        width:100%;
        padding:17px 0 20px 0;
        input{
          width:473px;

        }
      }
      .t-btn{
        width:100%;
        font-size: 1.5rem;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items: center;
        margin-top:70px;
        >div{
          height:40px;
          line-height:40px;
          border-radius:100px;
          text-align:center;
          color:#ffffff;
          cursor:pointer;
        }
        .confirm-btn{
          background-color:#3c78ff;
          width:120px;
          margin:0 10px;
        }
        .cancel-btn{
          width:80px;
          color:rgba(96,94,124,.6);
          box-sizing:border-box;
          opacity:40%;
          background-color:#fff;
          border: 1px solid rgba(96,94,124,.6);
        }
    }
    .agent-form .pad{
      height:26px;
      padding:17px 0;
    }
</style>
