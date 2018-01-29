<template>
    <div class="wrapper">
        <div class="agent-form scroll popup">
            <div class="select-box">
                <singleElection :single.sync="elect" class="checkbox-choose"></singleElection>
                <!--<div class="check-box"><input type="checkbox" v-model="allFormShow"></div>-->
                <div @click="checkboxClickFn" style="cursor:pointer;">展开填写完整需求订单</div>
            </div>
            <div class="t-part" v-show="!elect.set">
                <div class="form-box">
                    <div class="t-title"><span style="color:red;padding-right:3px;">*</span>航班号</div>
                    <input type="text" placeholder="填写需要托管的航班号" v-model="flightNum" maxlength="10">
                </div>
            </div>
            <div class="t-all" v-show="elect.set">
                <div class="t-must">
                    <div class="form-box post-til">
                        <div class="t-title">发布标题<span style="color:red;padding-left:3px;">*</span></div><input type="text" readonly="readonly" placeholder="标题会根据您的内容自动生成">
                    </div>
                    <div class="form-box">
                        <div class="t-title">联系人<span style="color:red;padding-left:3px;">*</span></div><input type="text" placeholder="请填写有效联系人" v-model="contact" maxlength="20" v-on:keyup="verifyContact" @blur="verifyContact">
                        <div class="error" v-show="isError1" style="left:60px;top:52px;">*请填写联系人</div>
                    </div>
                    <div class="form-box">
                        <div class="t-title">联系方式<span style="color:red;padding-left:3px;">*</span></div><input type="text" placeholder="请填写有效联系方式" @blur="verifyPhon" v-model="phoneNum">
                        <div class="error" v-show="isError2">*电话格式有误，请重新输入</div>
                    </div>
                    <div style="height:20px;width:100%;" v-if="isError1||isError2"></div>
                </div>
                <div class="t-optional">
                    <div class="form-box">
                        <div class="t-title">航班号</div>
                        <input type="text" placeholder="请输入" v-model="flightNum" maxlength="10">
                        <!-- <div class="num-list popup scroll" v-show="flightListShow">
                            <div v-for="(item,index) in flightData" @click="getflight(index)">{{item}}</div>
                        </div> -->
                    </div>
                    <div class="form-box pad">
                            <div class="t-title">小时成本</div>
                            <div class="t-input">
                                <input type="text" placeholder="填写举例：3.5" v-model="hourcost">
                                <span>元</span>
                        </div>
                    </div>
                    <div class="form-box tips">
                        <div class="t-title">其他说明</div>
                        <input type="text" placeholder="可选填" v-model="tip" maxlength="35">
                        <div class="count"><span >{{countNum}}</span>/35</div>
                    </div>
                </div>
            </div>
            <div class="t-btn">
                <div class="confirm-btn" @click="submit">提交</div>
                <div class="cancel-btn" @click="cancel">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
    import singleElection from '$src/page/components/demandListComponents/singleElection.vue'
 export default {
     props: ['acceptData'],
        data () {
            return{
                allFormShow:false,
                isSel: false,
                isError1: false,
                isError2: false,
                flightListShow:false,
                contact:'',
                hourcost:'',
                tip: '',
                phoneNum:'',
                flightNum:'',
                flightData:[],
                /*新增表单内容*/
                elect: {
                    set: false
                },
            }
        },
     mounted(){
         this.acceptDataFn();
     },
     components: {
         singleElection,
     },
        methods:{
            // 新增内容（我的，不删）
            checkboxClickFn: function () {
                this.elect.set = !this.elect.set;
            },
            /* getNeed: function(i) {
                this.msg = this.needType[i];
                this.isSel = true;
            },*/
            acceptDataFn: function () { // 表单绑定数据
                this.contact = this.acceptData.contact;
                this.phoneNum = this.acceptData.iHome;
                this.flightNum = this.acceptData.fltNbr;
                this.hourcost = this.acceptData.hourscost;
                this.tip = this.acceptData.remark;
            },
            verifyContact:function(){
                 if(this.contact){
                     this.isError1 = false;
                }
                this.contact = this.contact.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'');
            },
            verifyPhon: function () {
                if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(this.phoneNum))){
                    this.isError2 = true;
                }else{
                    this.isError2 = false;
                }
                if(this.phoneNum == ''){
                    this.isError2 = false;
                }
            },
            submit:function(){
                let demandData = { };
                demandData.demandtype = "2";
                demandData.contact = this.contact;
                demandData.iHome = this.phoneNum;
                demandData.fltNbr  = this.flightNum;
                demandData.hourscost = this.hourcost;
                demandData.remark = this.tip;
                //必填信息验证
                if(!this.contact){
                    this.isError1 = true;
                }else if(this.phoneNum == ''){
                    this.isError2 = true;
                }else{
                    if(!this.isError1 && !this.isError2){
                            this.$ajax({
                        url:"/demandAdd",
                        method: 'post',
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded'
                        },
                        params: demandData
                        }) .then((response) => {
                            if(response.data.opResult == "0"){
                                this.cancel();
                                this.$message({
                                  message: '发布成功!',
                                  type: 'success',
                                  duration:2000
                                });
                            }else{
                                 this.$message({
                                  message: '提交失败，请稍后再试!',
                                  type: 'warning',
                                  duration:2000
                                });
                            }
                        }) .catch((error) => {
                                console.log(error);
                            });

                    }
                }
            },
            cancel: function(){
                this.$emit("close-this");
            },
            getflight: function(i){
                this.flightNum = this.flightData[i];
                this.flightListShow = false;
            },
            getflightNum:function(){
                this.$ajax({
                url:"/getDemandsForCurrentEmployee",
                method: 'post',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                params: {
                    page:1
                }
            }) .then((response) => {
                response.data.list.list.forEach(item =>{
                    this.flightData.push(item.fltNbr);
                })
            }) .catch((error) => {
                    console.log(error);
                });
                this.flightListShow = true;
            },
        },
        computed:{
            countNum: function(){
                return this.tip.length <= 35? this.tip.length: 35;
            }
        },
        watch:{
            /*flightNum: function(val){
                if(!val){
                    this.flightListShow = !this.flightListShow;
                }
            }*/
        }

    }
</script>

<style scoped lang="scss">
    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .4);
        z-index: 20;
    }
    input {
        outline:none;
        border: 0;
        font-size:1.2rem;
        color: #605E7C;
        box-sizing:border-box;
        padding-left:5px;
        border-bottom:1px solid rgba(151,151,151,.3);
        background:transparent;
    }
    .agent-form{
        /*position:absolute;
        top:65px;
        left:0;
        z-index:99;*/
        box-sizing:border-box;
        overflow-y: scroll;
        font-size:1.2rem;
        padding:20px;
        width:620px;
        max-height:630px;
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
     .select-box{
        display:flex;
        justify-content: flex-end;
         align-items: center;
        >div{
            height:26px;
            margin-right:5px;
            line-height:26px;
        }
        input{
            display:block;
            height:100%;
        }
         .checkbox-choose {
             margin-right: 5px;
         }
    }
    .t-part{
        width:100%;
        box-sizing:border-box;
        display:flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding:0 20px;
        padding-bottom:20px;
        border-bottom:1px solid rgba(151,151,151,.3);
    }
    .form-box{
        position:relative;
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
        }
        .t-input{
            width:180px;
            border-bottom:1px solid rgba(151,151,151,.3);
            >input{
                width:150px;
                background-color: #FBFBFB;
                border:0;
            }
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
     /*  .dropDown {
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
     } */
      .tips{
        width:100%;
        position:relative;
        padding:17px 0 20px 0;
        input{
          width:473px;

        }
      }
      .error{
        position:absolute;
        top:58px;
        right:36px;
        color:red;
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
          opacity: 0.4;
          background-color:#fff;
          border: 1px solid rgba(96,94,124,.6);
        }
        .confirm-btn:hover{
           background-color: rgba(80, 139, 255,1);
          color: white !important;
          cursor: pointer;
          box-shadow: 1px 2px 18px rgba(60, 120, 255,0.5);
        }
        .cancel-btn:hover {
          background-color: rgba(256, 256, 256, .7);
          cursor: pointer;
          box-shadow: 1px 2px 18px rgba(60, 120, 255,0.5);
        }

    }
    .agent-form .pad{
      height:26px;
      padding:27px 0;
    }
    .count {
        position:absolute;
        top:18px;
        right:0;
    }
    .num-list{
        position:absolute;
        left:58px;
        top:58px;
        width:180px;
        max-height:210px;
        z-index:10;
        overflow:hidden;
        overflow-y:scroll;
        div{
            padding-left:14px;
            height:35px;
            line-height:35px;
            text-align:left;
            &:hover{
                background-color:rgba(235,235,235,.5);
            }
        }

    }
</style>
