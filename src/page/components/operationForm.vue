<template>
    <div class="agent-form scroll popup">
        <div class="select-box">
            <div class="check-box"><input type="checkbox" id="zhankai2" v-model="allFormShow"></div>
            <label for="zhankai2">展开填写完整需求订单</label>
        </div>
        <div class="t-part" v-show="!allFormShow">
            <div class="form-box">
                <div class="t-title"><span style="color:red;padding-right:3px;">*</span>航班号</div>
                <input type="text" placeholder="填写需要托管的航班号" v-model="flightNum" maxlength="10" v-on:keyup="verifyFlightNum" @blur="verifyFlightNum">
                 <div class="error" v-show="isError3" style="left:60px;top:55px;">*请填写航班号</div>
            </div>
        </div>
        <div class="t-all" v-show="allFormShow">
            <div class="t-must">
                <div class="form-box post-til">
                    <div class="t-title">发布标题<span style="color:red;padding-left:3px;">*</span></div><input type="text" readonly="readonly" placeholder="标题会根据您的内容自动生成">
                </div>
                <div class="form-box">
                    <div class="t-title">联系人<span style="color:red;padding-left:3px;">*</span></div><input type="text" placeholder="请填写有效联系人" v-model="contact" maxlength="20" v-on:keyup="verifyContact" @blur="verifyContact">
                    <div class="error" v-show="isError1" style="left:60px;top:52px;">*请填写联系人</div>
                </div>
                <div class="form-box">
                    <div class="t-title">联系方式<span style="color:red;padding-left:3px;">*</span></div>
                    <input type="text" placeholder="请填写有效联系方式" @blur="verifyPhon" v-model="phoneNum" maxlength="11">
                    <div class="error" v-show="isError2">*电话格式有误，请重新输入</div>
                </div>
                <div style="height:20px;width:100%;" v-if="isError1||isError2"></div>
            </div>
            <div class="t-optional">
                <div class="form-box">
                    <div class="t-title">航班号<span style="color:red;padding-left:3px;">*</span></div>
                    <input type="text" placeholder="请输入" v-model="flightNum" maxlength="10">
                    <div class="error" v-show="isError3" style="left:60px;top:55px;">*请填写航班号</div>
                    <!-- <div class="num-list popup scroll" v-show="flightListShow">
                        <div v-for="(item,index) in flightData" @click="getflight(index)">{{item}}</div>
                    </div> -->
                </div>
                <div class="form-box pad">
                        <div class="t-title">小时成本</div>
                        <div class="t-input">
                            <input type="text" placeholder="填写举例：3.5" v-model="hourcost">
                            <span>万元</span>
                    </div>
                </div>
                <div class="form-box tips">
                    <div class="t-title">其他说明</div>
                    <textarea class="txtarea" v-model="tip" maxlength="200" placeholder="可选填"></textarea>
                    <div class="count"><span >{{countNum}}</span>/200</div>
                    <div class="tips-border"></div>
                    <div class="tips-border" style="top:44px;"></div>
                    <div class="tips-border" style="top:70px;"></div>
                    <div class="tips-border" style="top:95px;"></div>
                     <div class="tips-border" style="top:121px;"></div>
                </div>
            </div>
        </div>
        <div class="t-btn">
            <div class="confirm-btn" @click="submit">提交</div>
            <div class="cancel-btn" @click="cancel">取消</div>
        </div>
    </div>
</template>

<script>
 import * as vx from 'vuex'


 export default {
        data () {
            return{
                allFormShow:false,
                isSel: false,
                isError1: false,
                isError2: false,
                isError3:false,
                flightListShow:false,
                contact:'',
                hourcost:'',
                tip: '',
                phoneNum:'',
                flightNum:'',
                flightData:[]
            }
        },
        methods:{
            /* getNeed: function(i) {
                this.msg = this.needType[i];
                this.isSel = true;
            },*/
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
            verifyFlightNum:function(){
                 if(this.flightNum){
                     this.isError3 = false;
                }
                this.flightNum = this.flightNum.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'');
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
                }else if(this.flightNum == ''){
                    this.isError3 = true;
                }else{
                    if(!this.isError1 && !this.isError2 && !this.isError3){
                            this.$ajax({
                        url:"/demandAdd",
                        method: 'post',
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded'
                        },
                        params: demandData
                        }) .then((response) => {
                            if(response.data.opResult == "0"){
                                this.$emit("closeForm");
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
                this.$emit("closeForm");
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
            //敏感字屏蔽
            filter: function () {
              // 多个敏感词，这里直接以数组的形式展示出来
              var arrMg = ["fuck", "tmd", "妈的","毛泽东","老子","党","革命","共产主义","屌","逼","傻","张","李","王"];

              // 显示的内容--showContent
              var showContent = this.tip;

              // 正则表达式
              // \d 匹配数字
              for (var i = 0; i < arrMg.length; i++) {

                // 创建一个正则表达式
                var r = new RegExp(arrMg[i], "ig");

                showContent = showContent.replace(r, "*");
              }
              //匹配11位数字
              var n = new RegExp(/\d{11}$/, "igm");
                showContent = showContent.replace(n, "*");
              // 显示的内容
              this.tip = showContent;
            },
        },
        computed:{
             ...vx.mapGetters([
                'role'
            ]),
            countNum: function(){
                return this.tip.length <= 200? this.tip.length: 200;
            }
        },
        watch:{
            'tip':function(){
                this.filter();
            }
        },
        beforeMount:function () {
            this.contact = this.role.username;
            this.phoneNum = this.role.phone;
        }

    }
</script>

<style scoped lang="scss">
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
        position:absolute;
        top:65px;
        left:0;
        z-index:99;
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
        position:relative;
        width:580px;
        height:140px;
        padding:17px 0 20px 0;
        .tips-border{
            width:472px;
            height:26px;
            box-sizing:border-box;
            position:absolute;
            left:60px;
            top:18px;
            z-index:1;
            border-bottom:1px solid rgba(151,151,151,.3);
        }
        .txtarea{
            resize:none;
            display: inline-block;
            position: absolute;
            font-size:1.2rem;
            left:60px;
            top:16px;
            z-index:3;
            width: 472px;
            height: 130px;
            line-height:26px;
            border:0;
            outline:none;
            background:transparent;
            //background:url(http://www.w3dev.cn/eg/linebg.gif) repeat;
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
          opacity:40%;
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
        top:120px;
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
