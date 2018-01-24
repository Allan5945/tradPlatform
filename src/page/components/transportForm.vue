<template>
    <div class="t-form scroll popup" id="transForm" @click="closeDialog">
        <div class="select-box">
            <div class="check-box"><input type="checkbox" v-model="allFormShow"></div>
            <div>展开填写完整需求订单</div>
        </div>
        <div class="t-part" v-show="!allFormShow">
            <div class="form-box">
                <div class="t-title"><span style="color:red;padding-right:3px;">*</span>拟飞机型</div><input type="text" placeholder="输入选择机型" v-model="airplaneTyp" @focus="getAirplaneTyp" @blur="closeDialog4">
                <div class="airpl-typ popup scroll" v-show="airplTypShow">
                    <div v-for="(item,index) in airTypData" @click="getAirType(index)">{{item}}</div>
                </div>
                <div class="error" v-show="isError5" style="left:58px;top:53px;">*请选择机型</div>
            </div>
            <div class="form-box se-place" >
                <div class="t-title"><span style="color:red;padding-right:3px;">*</span>运力基地</div><input type="text" placeholder="输入选择机场" v-model="searchText" @focus="openSearch" @blur="closeDialog5">
              <airportS1 class="aisx" v-on:resData="resData" :searchText="searchText" v-show="isSearch"></airportS1>
               <div class="error" v-show="isError6" style="left:58px;top:53px;">*请选择运力基地</div>
            </div>
        </div>
        <div class="t-all" v-show="allFormShow">
            <div class="t-must">
                <div class="form-box">
                    <div class="t-title">联系人</div><input type="text" placeholder="请填写有效联系人" v-model="contact" maxlength="20" v-on:keyup="verifyContact" @blur="verifyContact">
                    <div class="error" v-show="isError1" style="left:58px;top:58px;">*请填写联系人</div>
                </div>
                <div class="form-box">
                    <div class="t-title">联系方式</div><input type="text" placeholder="请填写有效联系方式" @blur="verifyPhon" v-model="phoneNum">
                    <div class="error" v-show="isError2" style="top:58px;right:36px;">*电话格式有误，请重新输入</div>
                </div>
                <div style="height:20px;width:100%;" v-if="isError1||isError2"></div>
            </div>
            <div class="t-optional">
                <div class="form-box">
                    <div class="t-title">出港时刻</div>
                    <div class="radio-box">
                        <div class="t-radio">
                            <input type="radio" class="magic-radio" id="timeYes" v-model="getTime" value="true" ><label for="timeYes">有&nbsp;</label>
                        </div>
                        <div class="selected" v-if="this.getTime == 'true'">
                            <div @click.stop="boxShow1=!boxShow1" :class="{selec:pickStart}">{{timeStart}}</div>
                            <span>-</span>
                            <div @click.stop="boxShow2=!boxShow2" :class="{selec:pickEnd}">{{timeEnd}}</div>
                          <div class="time-table popup time-start" v-show="boxShow1">
                              <div class="time-item" v-for="(num,index) in timeData" @click="pickTime1(index)">{{num}}</div>
                          </div>
                          <div class="time-table popup time-end" v-show="boxShow2">
                              <div class="time-item" v-for="(num,index) in timeData" @click="pickTime2(index)">{{num}}</div>
                          </div>
                        </div>
                        <div class="t-radio">
                            <input type="radio" class="magic-radio" id="timeNo" v-model="getTime" value="false"><label for="timeNo">无</label>
                        </div>
                    </div>
                </div>
                <div class="form-box">
                    <div class="t-title">是否有班期</div>
                    <div class="radio-box" @click="verifyFlight">
                        <div class="t-radio">
                            <input type="radio" class="magic-radio" id="flightYes" v-model="getFlight" value="true"><label for="flightYes">有&nbsp;</label>
                        </div>
                        <div class="selected border" @click="showBox=!showBox" v-show="this.getFlight == 'true'">
                            <!-- <span class="fl-til" v-text="msg" :class="{selec:isSel}"></span> -->
                            <span class="fl-til selec" v-text="msg" ></span>
                            <span class="icon-item icon-item1">&#xe605;</span>
                            <div class="dropDown popup" v-show="showBox">
                                <div @click="getNeed(index)" v-for="(value,index) in stateType">{{value}}</div>
                            </div>
                        </div>
                        <div class="t-radio">
                            <input type="radio" class="magic-radio" id="flightNo" v-model="getFlight" value="false"><label for="flightNo">无</label>
                        </div>
                    </div>
                    <div class="error" v-show="isError4" style="left:0;top:60px;">*请选择班期</div>
                </div>
                <div class="form-box air-route">
                    <div class="t-title"><span style="color:red;padding-right:3px;">*</span>意向航线</div>
                    <input type="text" placeholder="起飞机场" v-model="intendedDpt" @focus="openSearch3" @blur="closeDialog1"><span class="icon-item ">&#xe672;</span>
                    <airportS1 class="aisx" v-on:resData="dptData" :searchText="intendedDpt" v-show="dptSearch" style="left:-17px;top:48px;"></airportS1>
                    <input type="text" placeholder="经停机场（可选填）" v-model="intendedPst" @focus="openSearch4" @blur="closeDialog2"><span class="icon-item ">&#xe672;</span>
                    <airportS1 class="aisx" v-on:resData="pstData" :searchText="intendedPst" v-show="pstSearch" style="left:160px;top:48px;"></airportS1>
                    <input type="text" placeholder="目标机场（可选填）" v-model="intendedArrv" @focus="openSearch5" @blur="closeDialog3">
                    <airportS1 class="aisx" v-on:resData="arrvData" :searchText="intendedArrv" v-show="arrvSearch" style="left:300px;top:48px;"></airportS1>
                    <div class="error" v-show="isError3" style="left:58px;top:53px;">*请选择起飞机场</div>
                </div>
                <div class="form-box">
                    <div class="t-title"><span style="color:red;padding-right:3px;">*</span>拟飞机型</div><input type="text" placeholder="输入选择机型" v-model="airplaneTyp" @focus="getAirplaneTyp" @blur="closeDialog4">
                    <div class="airpl-typ popup scroll" v-show="airplTypShow">
                        <div v-for="(item,index) in airTypData" @click="getAirType(index)">{{item}}</div>
                    </div>
                    <div class="error" v-show="isError5" style="left:58px;top:53px;">*请选择机型</div>
                </div>
                <div class="form-box">
                    <div class="t-title">座位布局</div><input type="text" placeholder="填写举例：F8Y160" v-model="seat">
                </div>
                <div class="form-box pad1 taken">
                    <div class="t-title">小时成本</div><input type="text" placeholder="请填写小时成本" v-model="hourcost" v-on:keyup="verifyHourcost">
                    <span>w/h</span>
                </div>
                <div class="form-box pad1 taken">
                    <div class="t-title">运力归属</div><input type="text" placeholder="输入选择航司" v-model="airCompany" @focus="getAirCompany"  @blur="closeDialog6">
                    <airCompanyS class="aisx"  :searchText="airCompany" v-on:resData="airCompanyData" v-show="airCompanyShow" style="top:45px;left:47px;width:223px;"></airCompanyS>
                    <div class="error" v-show="isError7" style="left:58px;top:53px;">*请选择运力归属</div>
                </div>
                <div class="form-box se-place" >
                    <div class="t-title"><span style="color:red;padding-right:3px;">*</span>运力基地</div><input type="text" placeholder="输入选择机场" v-model="searchText" @focus="openSearch" @blur="closeDialog5">
                  <airportS1 class="aisx" v-on:resData="resData" :searchText="searchText" v-show="isSearch"></airportS1>
                   <div class="error" v-show="isError6" style="left:58px;top:53px;">*请选择运力基地</div>
                </div>
                <div class="form-box  dispatch">
                    <div class="t-checkbox">
                        <input type="checkbox" name=" " id="dispatch" class="magic-radio" v-model="dispatch"><label for="dispatch">接受调度</label>
                    </div>
                   <div class="choose-input" v-show="dispatch" style="width:170px;">
                       <div class="choose-item-list" v-show="dispatchAirportShow" @click="searchDispatch" style="width:150px;">
                           <div class="choose-item" v-for="(item,index) in searchData">
                               {{item.name}}
                               <span @click.stop="delItem(index)" class="iconfont">&#xe62c;</span>
                           </div>
                       </div>
                      <div class="more" @mouseover="disListShow = true" @mouseout="disListShow = false" style="left:150px;">
                           <span class="dot" v-show="moreDotShow">...</span>
                           <div  class="list-wrapper"  v-show="disListShow" style="width:260px;left:-240px;">
                               <div class="choose-item" v-for="(item,index) in searchData">
                                   {{item.name}}
                                    <span @click.stop="delItem(index)" class="iconfont">&#xe62c;</span>
                               </div>
                           </div>
                       </div>
                       <input type="text" v-model="dispatchText" @click.stop="openSearch1" @blur="closeDialog7" placeholder="选择调度机场">
                       <airportS1 class="aisx"  :searchText="dispatchText" v-on:resData="disData" v-show="dispatchSearch" style="top:30px;left:-68px;"></airportS1>
                   </div>
                    <div class="error" v-show="isError9" style="left:65px;top:53px;">*请选择调度机场</div>
                </div>
                <div class="form-box tips pad1">
                    <div class="t-title">其他说明</div>
                    <!-- <input type="text" placeholder="可选填" v-model="tip" maxlength="35"> -->
                    <textarea class="txtarea" v-model="tip" maxlength="200" placeholder="可选填"></textarea>
                    <div class="tips-border"></div>
                    <div class="tips-border" style="top:44px;"></div>
                    <div class="tips-border" style="top:70px;"></div>
                    <div class="tips-border" style="top:95px;"></div>
                     <div class="tips-border" style="top:121px;"></div>
                    <span class="num"><span >{{num}}</span>/200</span>
                </div>
                <div class="form-box get-time" ref="timeForm" @click="verifyDate" style="width:579px;">
                    <div class="t-title" ref="timeTitle" style="width:60px;">发布有效期</div>
                   <div class="calendar time-btn" ref="timeDate" style="width:213px;">
                     <div class="myslec"  @click="calendarShow=!calendarShow"><span class="icon-item ">&#xe607;</span>{{myDate}}</div>
                     <div v-show="calendarShow" class="calendar-box popup">
                       <div class="selec-data">
                         <input type="text" placeholder="开始时间" v-model="calendarInitDay1" readonly="readonly"><span>-</span>
                         <input type="text" placeholder="结束时间" v-model="calendarInitDay2" readonly="readonly">
                         <div class="confirm-btn btn" @click="getMyDate">确定</div>
                         <div class="cancel-btn btn" @click="calendarShow=!calendarShow">取消</div>
                       </div>
                       <calendar v-on:changeDate="getDate1" :initDay="calendarInitDay1"></calendar>
                       <calendar v-on:changeDate="getDate2" :initDay="calendarInitDay2"></calendar>
                     </div>
                   </div>
                    <div class="error" v-show="isError8" style="left:65px;top:55px;">*请选择发布有效期</div>
                </div>
            </div>
            <div class="post-type">
                <div class="t-radio">
                    <input type="radio" name="type" id="type1" class="magic-radio" v-model="post" value="0"><label for="type1">对所有人公开</label>
                </div>
                <div class="t-radio">
                    <input type="radio" name="type" id="type2" class="magic-radio" v-model="post" value="1"><label for="type2">对认证用户公开</label>
                </div>
                <div class="t-radio" style="margin-right:5px;">
                    <input type="radio" name="type" id="type3" class="magic-radio" v-model="post" value="3"><label for="type3">定向发布</label>
                </div>
                 <div class="choose-input" v-show="post == '3' ">
                    <div class="choose-item-list" v-show="directionPublicShow" @click="searchDirect">
                        <div class="choose-item" v-for="(item,index) in searchData1">
                            {{item.name}}
                            <span @click.stop="delItem1(index)" class="iconfont">&#xe62c;</span>
                        </div>
                    </div>
                   <div class="more" @mouseover="selectListShow = true" @mouseout="selectListShow = false">
                        <span class="dot" v-show="moreSpanShow">...</span>
                        <div  class="list-wrapper"  v-show="selectListShow">
                            <div class="choose-item" v-for="(item,index) in searchData1">
                                {{item.name}}
                                 <span @click.stop="delItem1(index)" class="iconfont">&#xe62c;</span>
                            </div>
                        </div>
                    </div>
                    <input type="text" v-model="directText" @click.stop="openSearch2" @blur="closeDialog8">
                    <airportS1 class="aisx"  :searchText="directText" v-on:resData="directData" v-show="directSearch" style="top:30px;"></airportS1>
                </div>
                <div class="error" v-show="isError10" style="left:230px;top:30px;">*请选择定向发布机场</div>
            </div>
        </div>
        <div class="t-btn">
            <div class="agent-btn " @click="confirm(4)" v-if="btnShow">委托代理</div>
            <div class="confirm-btn " @click="confirm(1)">确认发布</div>
            <div class="cancel-btn " @click="cancel">取消</div>
        </div>
    </div>
</template>
<script>
 import calendar from './calendar'
 import * as vx from 'vuex'
 import airportS from '../reuseComponents/airportSearch.vue'//可匹配机场和地区搜索
 import airportS1 from '../reuseComponents/airportSearch1.vue'//仅可匹配机场搜索
 import airCompanyS from '../reuseComponents/airCompanySearch.vue'//可匹配航司搜索
    export default {
        data () {
            return{
                allFormShow:false,
                showBox: false,
                boxShow1: false,
                boxShow2: false,
                isSel: false,
                isError1: false,
                isError2: false,
                isError3:false,
                isError4:false,
                isError5:false,
                isError6:false,
                isError7:false,
                isError8:false,
                isError9:false,
                isError10:false,
                phoneNum: '',
                getFlight: 'true',
                getTime: 'true',
                dispatch:false,
                pickStart:false,
                pickEnd:false,
                airplTypShow:false,
                airCompanyShow:false,
                btnShow:true,
                selecShow1:true,
                directionPublicShow:false,
                selectListShow:false,
                moreSpanShow:false,
                dispatchAirportShow:false,
                disListShow:false,
                moreDotShow:false,
                contact: '',
                intendedDpt:'',
                intendedDpt1:'',
                intendedPst:'',
                intendedPst1:'',
                intendedArrv:'',
                intendedArrv1:'',
                airplaneTyp:'',
                airplaneTyp1:'',
                airCompany:'',
                airCompany1:'',
                airCompanyId:'',
                dptState:[0,1],//运力基地：机场为0，地区为1
                seat:'',
                hourcost:'',
                post:'0',
                timeStart:'00:00',
                timeEnd:'00:00',
                timeStartIndex:0,
                timeEndIndex:0,
                tip: '',
                searchData:[],
                searchData1:[],
                msg:'满排',
                stateType:['待定','满排','半排'],
                myDate:'选择起始时间',
                calendarInitDay1: '',
                calendarInitDay2: '',
                calendarShow: false,
                timeData:['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00',
                '19:00','20:00','21:00','22:00','23:00','00:00'],
                timeShow: true,
                isSearch: false,
                searchText: '',
                searchText1:'',
                dispatchSearch:false,
                dispatchText:'',
                directSearch:false,
                directText:'',
                dptSearch:false,
                pstSearch:false,
                arrvSearch:false,
                qyCode: '',
                qyCode1:'',
                qyCode2:'',
                qyCode3:'',
                qyCode4:'',
                qyCode5:'',
                airTypData: ["A320","A330","B737NG","E190/195","CRJ900","MA60","B787","B777","B767","E145","B757","B747","ARJ21"],
                directionalgoal:'',
                schedulinePort:''
            }
        },
        components:{
            calendar,
            airportS,
            airportS1,
            airCompanyS
        },
        computed:{
            ...vx.mapGetters([
                'role'
            ]),
            num: function(){
                return this.tip.length <= 200? this.tip.length: 200;
            }
        },
        watch:{
            'intendedDpt':function(val){
                if(val){
                    if(val == this.intendedPst||val == this.intendedArrv){
                        this.intendedDpt = '';
                    }
                }
            },
            'intendedPst':function(val){
                if(val){
                    if(val == this.intendedDpt||val == this.intendedArrv){
                        this.intendedPst = '';
                    }
                }
            },
            'intendedArrv':function(val){
                if(val){
                    if(val == this.intendedDpt||val == this.intendedPst){
                        this.intendedArrv = '';
                    }
                }
            },
            'searchData1':function(val){
                if(val.length >1){
                    this.moreSpanShow = true;
                }else{
                    this.moreSpanShow = false;
                }
                if(val.length >0){
                    this.isError10 =false;
                }
            },
             'searchData':function(val){
                if(val.length >0){
                    this.moreDotShow = true;
                    this.isError9 =false;
                }else{
                    this.moreDotShow = false;
                }
            },
            'tip':function(){
                this.filter();
            },
            'qyCode':function(){
                if(!this.allFormShow){
                    this.intendedDpt = this.searchText;
                    this.qyCode3 = this.qyCode;
                }
            }

        },
        methods:{
             getNeed: function(i) {
                this.msg = this.stateType[i];
                this.isSel = true;
            },
             getDate1: function(d){//获取组件返回的日期
            this.calendarInitDay1 = d;
            },
             getDate2: function(d){//获取组件返回的日期
                this.calendarInitDay2 = d;
            },
            getMyDate: function(){//获取起始的日期
                if(this.calendarInitDay1 && this.calendarInitDay2){
                    this.myDate = this.calendarInitDay1 + "-" + this.calendarInitDay2;
                    this.calendarShow = false;
                   /* this.$refs.timeDate.style.width = "213px";
                    this.$refs.timeForm.style.width = "579px";
                     this.$refs.timeTitle.style.width = "60px";*/
                }else{

                }
            },
            openSearch: function(){
                this.isSearch =true;
            },
            /*closeSearch: function(){
                    this.isSearch = false;
            },*/
            openSearch1: function(){
                this.dispatchSearch =true;
            },
            /*closeSearch1: function(){
                    this.isSearch = false;
            },*/
             openSearch2: function(){
                this.directSearch =true;
            },
             openSearch3: function(){
                this.dptSearch =true;
            },

             openSearch4: function(){
                this.pstSearch =true;
            },
             openSearch5: function(){
                this.arrvSearch =true;
            },
             closeDialog1(){
                let that =this;
               setTimeout(function(){
                that.dptSearch =false;
                that.intendedDpt = (that.intendedDpt == ''||that.qyCode3 == ''? '':that.intendedDpt1);
                    if(that.qyCode3){
                     that.isError3 = false;
                    }
                },200);
            },
             closeDialog2(){
                let that =this;
               setTimeout(function(){
                that.pstSearch =false;
                that.intendedPst = (that.intendedPst == ''||that.qyCode4 == ''? '':that.intendedPst1);
                },200);
            },
             closeDialog3(){
                let that =this;
               setTimeout(function(){
                that.arrvSearch =false;
                that.intendedArrv = (that.intendedArrv == ''||that.qyCode5 == ''? '':that.intendedArrv1);
                },200);
            },
             closeDialog4(){
                let that =this;
               setTimeout(function(){
                that.airplTypShow =false;
                that.airplaneTyp = (that.airplaneTyp == ''? '':that.airplaneTyp1);
                if(that.airplaneTyp){
                  that.isError5 = false;
                }
              },200);
            },
             closeDialog5(){
                let that =this;
               setTimeout(function(){
                that.isSearch =false;
                that.searchText = (that.searchText == ''||that.qyCode == ''? '':that.searchText1);
                    if(that.qyCode){
                     that.isError6 = false;
                    }
                },200);
            },
             closeDialog6(){
                let that =this;
               setTimeout(function(){
                that.airCompanyShow =false;
                that.airCompany = (that.airCompany == ''||that.airCompanyId == ''? '':that.airCompany1);
                    if(that.airCompanyId){
                     that.isError7 = false;
                    }
                },200);
            },
             closeDialog7(){
                let that =this;
                this.dispatchAirportShow= true;
               setTimeout(function(){
                that.dispatchSearch =false;
                that.dispatchText = '';
                },200);
            },
             closeDialog8(){
                let that =this;
                this.directionPublicShow= true;
               setTimeout(function(){
                that.directSearch =false;
                that.directText = '';
                },200);
            },
            closeDialog(){
                 this.dispatchSearch = false;
                 this.directSearch =false;
                 this.directionPublicShow= true;
                 this.dispatchAirportShow= true;
                 this.boxShow1 = false;
                 this.boxShow2 = false;
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
            verifyHourcost:function(){
                this.hourcost =  this.hourcost.replace(/[^0-9.]/g,'');
                if(this.hourcost>100){
                    this.hourcost = '';
                }
            },
            verifyFlight:function(){
                let that =this;
               setTimeout(function(){
                    if(that.msg !== "选择班期类型"||that.getFlight == 'false'){
                        that.isError4 = false;
                    }
                },100);
            },
            verifyDate:function(){
                 let that =this;
               setTimeout(function(){
                    if(that.myDate !== '选择起始时间'){
                        that.isError8 = false;
                    }
                },100);
            },
            pickTime1: function(i) {
                this.timeStartIndex = i;
                this.timeStart = this.timeData[i];
                this.boxShow1 = false;
                this.pickStart = true;
                if(i > this.timeEndIndex||i == this.timeEndIndex){
                    this.timeEnd = " ";
                }
            },
             pickTime2: function(i) {
                this.timeEndIndex = i;
                if(i > this.timeStartIndex){
                    this.timeEnd = this.timeData[i];
                    this.boxShow2 = false;
                    this.pickEnd = true;
                }
            },
            delItem:function(i){
                this.searchData.splice(i,1);
            },
             delItem1:function(i){
                this.searchData1.splice(i,1);
            },
            cancel:function(){
                this.$emit("closeForm");
            },
            resData: function (data) {
                this.isSearch = false;
                this.searchText = data.name;
                this.searchText1 = data.name;
                this.qyCode = data.code;
            },
            disData: function(data){
                let len = this.searchData.length,
                    flag = true;
                if( len < 5){
                    for (let i = 0; i < len; i++) {
                        if ( this.searchData[i].id === data.id) {
                          flag = false;
                        }
                    }
                    if(flag){
                         this.searchData.push({
                            name: data.name,
                            id: data.id,
                        });
                    }
                }
                //this.qyCode1 = data.code;
                this.dispatchSearch = false;
                this.dispatchAirportShow = true;
            },
            searchDispatch:function(){
                 this.$nextTick(() => {
                    this.dispatchAirportShow = false;
                    this.dispatchSearch = true;
                });
            },
            directData: function(data){
                let len = this.searchData1.length,
                    flag = true;
                if( len < 5){
                    for (let i = 0; i < len; i++) {
                        if ( this.searchData1[i].id === data.id) {
                          flag = false;
                        }
                    }
                    if(flag){
                         this.searchData1.push({
                            name: data.name,
                            id: data.id,
                        });
                    }
                }
                //this.qyCode2 = data.code;
                this.directSearch = false;
                this.directionPublicShow = true;
            },
            searchDirect:function(){
                 this.$nextTick(() => {
                    this.directionPublicShow = false;
                    this.directSearch = true;
                });
            },
            dptData: function (data) {
                this.intendedDpt = data.name;
                this.intendedDpt1 = data.name;
                this.qyCode3 = data.code;
                this.dptSearch = false;
            },
            pstData: function (data) {
                this.intendedPst = data.name;
                this.intendedPst1 = data.name;
                this.qyCode4 = data.code;
                this.pstSearch = false;
            },
            arrvData: function (data) {
                this.intendedArrv = data.name;
                this.intendedArrv1 = data.name;
                this.qyCode5 = data.code;
                this.arrvSearch = false;
            },
            getAirType: function(i){
                this.airplaneTyp = this.airTypData[i];
                this.airplaneTyp1 = this.airTypData[i];
                this.airplTypShow = false;
            },
            airCompanyData: function(data){
                this.airCompany = data.name;
                this.airCompany1 = data.name;
                this.airCompanyId = data.id;
                this.airCompanyShow = false;
            },
            getAirplaneTyp:function(){
                this.airplTypShow = true;
            },
            getAirCompany: function(){
                this.airCompanyShow = true;
            },
            confirm:function(type){
                let trans = document.getElementById('transForm');
                //必填信息验证
                if(this.contact == ''){//联系人
                     this.isError1 = true;
                     trans.scrollTop = 0;
                     return false;
                }
                if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(this.phoneNum)) ){//联系方式
                    this.isError2 = true;
                    trans.scrollTop = 0;
                    return false;
                }
                if(this.getFlight =='true'&& this.msg == '选择班期类型'){//选择班期
                    this.isError4 = true;
                    trans.scrollTop = 0;
                    return false;
                }
                if(this.intendedDpt == ''){//起始机场
                    this.isError3 = true;
                     trans.scrollTop = 0;
                    return false;
                }
               /* if(this.airplaneTyp == ''){//飞机类型
                    this.isError5 = true;
                    trans.scrollTop = 0;
                    return false;
                }*/
                if(this.searchText == ''){//运力基地
                    this.isError6 = true;
                    trans.scrollTop = 0;
                    return false;
                }
                if(this.airCompany == ''){//运力归属
                    this.isError7 = true;
                    return false;
                }
                if(this.myDate == '选择起始时间'){//有效时间
                    this.isError8 = true;
                    return false;
                }
                if(this.dispatch){       //接受调度
                    if(this.searchData.length == '0'){
                        this.isError9 = true;
                        return false;
                    };
                }
                if(this.post == '3'){       //定向发布
                    if(this.searchData1.length == '0'){
                        this.isError10 = true;
                        return false;
                    };
                }
                let demandData = {},
                    time = (this.timeStart +'-'+ this.timeEnd) == '00:00-00:00'? "00:00": (this.timeStart +'-'+ this.timeEnd);
                    demandData.demandtype = type;
                    demandData.contact = this.contact;
                    demandData.iHome = this.phoneNum;
                    demandData.dptTime = this.getTime == 'true'? time:'无';
                    demandData.days   = this.getFlight =='true'? this.msg: '无';
                    demandData.intendedDpt = this.intendedDpt == '' ? '': this.qyCode3;
                    demandData.intendedPst = this.intendedPst == '' ? '': this.qyCode4;
                    demandData.intendedArrv = this.intendedArrv == '' ? '': this.qyCode5;
                    demandData.aircrfttyp = this.airplaneTyp;
                    demandData.dpt = this.qyCode;
                    demandData.dptState = this.dptState[0];
                    demandData.capacitycompany = this.airCompanyId;
                    demandData.seating = this.seat;
                    demandData.hourscost = this.hourcost;
                    demandData.remark = this.tip;
                    demandData.periodValidity = this.myDate;

                    //调度机场
                    demandData.schedulingStr = this.dispatch == false? '不接受':'接受';
                    demandData.scheduling = this.dispatch == false? '1':'0';
                    if(this.searchData.length == '0'){
                         this.schedulinePort = '';
                    }else {
                        let array= [];
                        this.searchData.forEach((val) => {
                            array.push(val.id);
                        });
                        this.schedulinePort = array.join(',');
                    }
                    if(this.dispatch){
                        demandData.schedulinePort  = this.schedulinePort;
                    }
                    //定向发布
                    demandData.publicway = this.post;
                    if(this.searchData1.length == '0'){
                         this.directionalgoal = '';
                    }else {
                        let array= [];
                        this.searchData1.forEach((val) => {
                            array.push(val.id);
                        });
                        this.directionalgoal = array.join(',');
                    }
                     if(this.post == '3'){
                        demandData.directionalgoal = this.directionalgoal;
                    }

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
            initDate: function() {
              //初始化
                let today = new Date(),
                day = today.getDate(), //号数
                mon = today.getMonth() + 1, //月份
                year = today.getFullYear(), //年份
                date = today.setMonth(today.getMonth()+3), //三个月后的时间
                mon2 =  today.getMonth(date) + 1,
                year2 =  today.getFullYear(date),
                day2 =  today.getDate(date);
                if (mon < 10) mon = "0" + mon;
                if (mon2 < 10) mon2 = "0" + mon2;
                if (day < 10) day = "0" + day;
                if (day2 < 10) day2 = "0" + day2;

                this.calendarInitDay1 = year+"."+mon+"."+day;
                this.calendarInitDay2 = year2+"."+mon2+"."+day2;
            }
        },
        beforeMount:function () {
            this.initDate();
            this.getMyDate();
            if(this.role.role == 2){
                this.btnShow = false;
            }
            this.contact = this.role.username;
            this.phoneNum = this.role.phone;
            this.airCompany = this.role.companyName;
        }

    }
</script>

<style scoped lang="scss">
    input {
        outline:none;
        border: 0;
        color: #605E7C;
        font-size:1.2rem;
        box-sizing:border-box;
        padding-left:5px;
        border-bottom:1px solid rgba(151,151,151,.3);
        background:transparent;
    }
    .t-form{
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
        width:240px;
        height:26px;
        line-height:26px;
        padding:27px 0;
        display:flex;
        position: relative;
        .t-title{
            width:60px;
            overflow:hidden;
        }
        .radio-box{
            width:180px;
            display:flex;
        }
        >input{
            width:180px;
            height:26px;
        }
    }
    .t-form .reset{
        height:26px;
        padding:17px 0;
    }
    .air-route{
        width:580px;
        padding:20px 0 34px 0;
        >input{
            width:138px;
            height:26px;
        }
        >span{
            dispaly:inline-block;
            width:30px;
            text-align:center;
        }
    }
    .se-place{
        position:relative;
    }
    .tips{
        position:relative;
        width:580px;
        height:100px;
       /*  >input{
           width:470px;
       } */
        .num{
            position:absolute;
            right:2px;
            top:122px;
        }
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
    }
    .txtarea{
            resize:none;
            display: inline-block;
            position: absolute;
            font-size:1.2rem;
            left:60px;
            right:0;
            z-index:3;
            width: 472px;
            height: 130px;
            line-height:26px;
            border:0;
            outline:none;
            background:transparent;
            //background:url(http://www.w3dev.cn/eg/linebg.gif) repeat;
        }
    .get-time .time-btn{
        box-sizing:border-box;
        position:relative;
        height:26px;
        width:146px;
        margin-left:14px;
        border:1px solid rgba(151,151,151,.3);
        border-radius:5px;
        padding:0 22px 0 44px;
        cursor:pointer;
    }
    .myslec span{
        position:absolute;
        left:0;
        top:0;
        width:20px;
        text-align:center;
        border-right:1px solid rgba(151,151,151,.3);
    }
    .post-type{
        position: relative;
        display: flex;
        margin: 40px 0 70px 0;
        .t-radio{
            margin-right:12px;
            height:26px;
            line-height:26px;
        }
    }
    .t-btn{
        font-size: 1.5rem;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items: center;
        margin:20px 0;
        >div{
          height:40px;
          line-height:40px;
          border-radius:100px;
          text-align:center;
          color:#ffffff;
          background-color:#3c78ff;
          cursor:pointer;

        }
        .agent-btn{
             width:100px;
             box-shadow: 1px 1px 6px rgba(60, 120, 255, .6);
        }
        .confirm-btn{
          width:190px;
          margin:0 10px 0 30px;
          box-shadow: 1px 1px 6px rgba(60, 120, 255, .6);
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
    .agent-btn:hover{
          background-color: rgba(80, 139, 255,1);
          color: white;
          cursor: pointer;
          box-shadow: 1px 2px 18px rgba(60, 120, 255,0.5);
    }
    .confirm-btn:hover{
          background-color: rgba(80, 139, 255,1);
          color: white;
          cursor: pointer;
          box-shadow: 1px 2px 18px rgba(60, 120, 255,0.5);
    }
    .cancel-btn:hover {
      background-color: rgba(256, 256, 256, .7);
      cursor: pointer;
      box-shadow: 1px 2px 18px rgba(60, 120, 255,0.5);
    }
    .pad1{
        padding:20px 0 34px 0;
    }
    .selected{
        position:relative;
        width:100px;
        height:26px;
        line-height:26px;
        margin-left:5px;
        display:flex;
        cursor:pointer;
        >div{
            width:40px;
            text-align:center;
            color:rgba(96,94,124,.4);
            border:1px solid rgba(151,151,151,.3);
            border-radius:5px;
        }
        >span{
            padding:0 3px;
        }
    }
    .icon-item {
        font-size: 1.6rem;
        font-family: iconfont;
    }
    .icon-item1{
        padding-left:14px;
        color: #446cea;
        line-height: 26px;
    }
    .border{
        border:1px solid rgba(151,151,151,.3);
        border-radius:5px;
        padding-left:5px;
    }
  .selected .dropDown {
        position:absolute;
        top:28px;
        left:0;
        width:107px;
        border:0 !important;
        border-radius: 4px;
        z-index:99;
        >div {
            width: 107px;
            height:35px;
            box-sizing: border-box;
            line-height:35px;
            background-color: #fff;
            padding-left: 14px;
            text-align:left;
            color: #605E7C;
            font-size: 1.2rem;
            cursor:pointer;
            &:hover{
                background-color:#f5f5f5;
            }
        }
    }
    .fl-til{
        display:inline-block;
        width:80px;
        color:rgba(96,94,124,.4);
    }
    .selec{
        color:#605E7C !important;
    }
    .taken{
        position:relative;
        >span{
            position:absolute;
            right:0;
            top:20px;
        }
    }

    .magic-radio {
        position: absolute;
        display: none;
    }
    .magic-radio + label {
        display: flex;
        align-items: center;
        cursor: pointer;
        vertical-align: middle;
        &:before {
            padding-right: 5px;
            font-family: iconfont;
            font-size: 1.7rem;
            color: gray;
            content: '\e61c';
            border-radius: 50%;
        }
    }
    .magic-radio:checked + label {
        &:before {
            content: '\e622';
            color: #3c78ff;
        }
    }
    .error{
        position:absolute;
        color:red;
    }
    .aisx {
        position: absolute;
        top: 58px;
        left: 0px;
        width: 260px;
        max-height: 210px;
        overflow-y: scroll;
        z-index: 10;
    }

    .radio-box .selected .time-table{
        position: absolute;
        height:210px;
        width: 53px;
        border:0;
        overflow: hidden;
        overflow-y: scroll;
        z-index: 1;
        >.time-item {
            width: 100%;
            height:35px;
            line-height:35px;
            background-color: #fff;
            text-align:center;
            color: #605E7C;
            cursor:pointer;
            &:hover{
                background-color: rgba(235, 235, 235, 0.5);
            }
        }
    }
    .time-start{
        top:26px;
        left:-5px;
    }
    .time-end{
        top:26px;
        left:50px;
    }
    .time-table::-webkit-scrollbar {
        width: 4px;
    }
    .time-table::-webkit-scrollbar-thumb {
        height: 56px;
        background: #D8D8D8;
        border-radius: 4px;
    }

    .dispatch{
        >input{
            width:162px;
            padding-left:8px;
        }
    }
    .choose-input{
        position:relative;
        width:260px;
        height:26px;
        display:flex;
        align-content: flex-start;
        .choose-item-list{
          /* display:flex;
          align-content: flex-start; */
          width:242px;
          white-space: nowrap;
          overflow:hidden;
          position:absolute;
          top:-3px;
          left:5px;
        }
        input{
            width:260px;
            border-bottom:1px solid rgba(151,151,151,.3);
        }
        .more{
            position:absolute;
            left:240px;
            top:-3px;
            z-index:5;
            .dot{
                display:block;
                height:30px;
                width:30px;
                text-align:center;
                cursor:pointer;
                color:#3c78ff;
                //background-color:#fff;
            }
        }
        .choose-item{
            display:inline-block;
            margin-bottom:5px;
            background-color:#f3f3f7;
            border-radius:100px;
            color:#3c78ff;
            font-weight:800;
            height:26px;
            line-height:26px;
            padding-left: 6px;
            margin-right:6px;
            span{
                display:inline-block;
                width:12px;
                height:12px;
                line-height:12px;
                text-align:center;
                cursor:pointer;
                background-color:#fff;
                border-radius:100%;
                margin-right:5px;
                font-size:1.2rem;
            }
        }
        .list-wrapper {
            position: absolute;
            top: 30px;
            left: -260px;
            display: flex;
            flex-wrap: wrap;
            padding: 10px;
            width: 270px;
            background: white;
            border-radius: 4px;
            box-shadow: 0 2px 11px rgba(96,94,124,0.37);
            z-index: 3;
        }
    }
    .airpl-typ{
        position:absolute;
        left:58px;
        top:58px;
        width:180px;
        max-height:210px;
        cursor:pointer;
        z-index:10;
        overflow:hidden;
        overflow-y:scroll;
        div{
            justify-content: space-between;
            display: flex;
            padding: 0 14px;
            height:35px;
            line-height:35px;
            text-align:left;
            &:hover{
                background-color:rgba(235,235,235,.5);
            }
        }

    }
    .popup-x1{
        border:0 !important;
    }
</style>

<style scoped>
  .calendar-box{
    width: 540px;
    height:270px;
    position: relative;
    top: 0px;
    left:-134px;
    z-index: 10;
    padding:20px 10px 10px 10px;
  }
  .calendar-box .selec-data{
    height:30px;
    font-size: 12px;
    margin-bottom:20px;
    position: relative;
  }
  .calendar-box .selec-data input{
    height: 100%;
    width: 75px;
    font-size: 12px;
    border:0;
    outline: none;
    border-bottom: 1px solid rgba(151, 151, 151, 0.3);
  }
  .calendar-box .selec-data span{
    display: inline-block;
    width:30px;
    text-align: center;
  }
  .selec-data .btn{
    position:absolute;
    top:0;
    height: 30px;
    line-height: 30px;
    border-radius: 100px;
    text-align: center;
    cursor: pointer;
  }
  .selec-data .confirm-btn{
    right:0;
    width:60px;
    color:#ffffff;
    background-color:#3c78ff;
  }
  .selec-data .cancel-btn{
    width:50px;
    color:rgba(96,94,124,.6);
    box-sizing: border-box;
    border:1px solid rgba(96,94,124,.6);
    right:64px;
  }
</style>
