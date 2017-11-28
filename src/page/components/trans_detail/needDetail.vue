<template>
    <div class="detail-wrapper" v-show="getDetail.transShow">
        <header>
            <div class="top-til">需求详情<span @click="closeDetail">X</span></div>
            <div class="head-til">成都新开找运力</div>
            <div class="tips">
                <span>创建于2017.12.12</span>
                <span>已有2位用户发起意向</span>
            </div>
        </header>
        <div class="content">
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
        </div>
        <footer>
            <div>*隐藏信息在提交意向后可查看</div>
            <div class="btn">
                <div class="intent-btn" @click="haveInvent"><span></span>我有意向</div>
                <div class="col-btn">收藏</div>
            </div>
        </footer>
    </div>
</template>

<script>
 export default {
     data(){
         return{
             getDetail:[],
             detailData:[]
         }
     },
     methods:{
         closeDetail:function(){
             
         },
         haveInvent:function(){
             console.log(this.getDetail.id)
             console.log( this.detailData)
         }
     },
    
      mounted:function(){
          this.getDetail = this.$store.getters.transDetail;
          this.$ajax({
                method: 'post',
                url: '/capacityRoutesDemandDetailFindById',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                  params: {
                    demandId: this.getDetail.id
                }
            })
                .then((response) => {
                    this.detailData = response.data.data;
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
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
        .tips{
          height:12px;
          line-height:12px;
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
