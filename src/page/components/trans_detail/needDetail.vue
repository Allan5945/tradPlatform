<template>
    <div class="detail-wrapper">
        <header>
            <div class="top-til">需求详情<span @click="closeDetail" class="iconfont">&#xe62c;</span></div>
            <div class="head-til">{{detailData.title}}</div>
            <div class="tips">
                <span>创建于{{detailData.releasetime}}</span>
                <span>已有{{intentionCount}}位用户发起意向</span>
            </div>
        </header>
        <div class="content">
            <div >
                <div>出港时刻</div>
                <div>{{detailData.dptTime}}</div>
            </div>
            <div>
                <div>班期</div>
                <div>{{detailData.days}}</div>
            </div>
            <div>
                <div>机型</div>
                <div>{{detailData.aircrfttyp}}</div>
            </div>
             <div>
                <div>运力基地</div>
                <div>{{detailData.dptNm}}</div>
            </div>
            <div>
                <div>运力归属</div>
                <div>***</div>
            </div>
            <div>
                <div>座位布局</div>
                <div>{{detailData.seating}}</div>
            </div>
            <div>
                <div>小时成本</div>
                <div>{{detailData.hourscost}}万/小时</div>
            </div>
            <div>
                <div>接受调度</div>
                <div>{{detailData.schedulingStr}}</div>
            </div>
            <div>
                <div>有效期</div>
                <div>{{detailData.periodValidity}}</div>
            </div>
        </div>
        <footer>
            <div>*隐藏信息在提交意向后可查看</div>
            <div class="btn">
                <div class="intent-btn" @click="haveInvent"><span class="iconfont">&#xe62f;</span>我有意向</div>
                <div class="col-btn" @click="collect" v-if="isCollect">收藏</div>
                <div class="col-btn"  v-else>已收藏</div>
            </div>
        </footer>
    </div>
</template>

<script>
 import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';
 import * as vx from 'vuex';
 export default {
     data(){
         return{
             getDetail:[],
             detailData:[],
             intentionCount:0,
             demandId:'',
             isCollect:true
         }
     },
     methods:{
         closeDetail:function(){
            this.$emit("closeDetail")
         },
         haveInvent:function(){
             this.$emit("formShow");
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
                  this.isCollect = false;
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
         }
     },
     computed: {
            ...vx.mapGetters([
                'role'
            ])
        },
      mounted() {
        tabulationBoxTrigger.$on('tabulationBoxTrigger', val => {
            if(val.data.demandtype == 1 && this.role.role == 1){
               console.log("demandtype"+val.data.demandtype);
                this.demandId = val.data.id;
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
                    if(response.data.opResult == "004"|| response.data.receiveIntention == null){
                        this.$emit("transShow");
                    }
                    this.intentionCount = response.data.intentionCount;
                    this.detailData = response.data.data;
                     if(response.data.isAlreadyCollect == 1){
                        this.isCollect = false;
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
    .detail-wrapper{
        position:absolute;
        top:0;
        right:0;
        z-index: 12;
        width:600px;
        height:100%;
        min-height:600px;
        color:#605E7C;
        background-color:#fff;
        header{
            width:100%;
            height:141px;
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
               >.col-btn{
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
