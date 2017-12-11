<template>
    <div class="container" v-show="thisShow">
        <div class="bg-color must">
            <div class="right item-child">
                <div style="display: flex;">
                    联系人　
                    <input class="input-mes" type="text" placeholder="请填写有效联系人" v-model="user" @keyup="warn1Show=false">
                </div>
                <div class="warn" v-show="warn1Show">*请填写联系人</div>
            </div>
            <div class="left item-child">
                <div style="display: flex;">
                    联系方式　
                    <input class="input-mes" type="text" placeholder="请填写有效联系方式" @blur="verifyPhon" v-model="phoneNum">
                </div>
                <div class="warn" v-show="warn2Show">*电话格式有误，请重新输入</div>
            </div>
        </div>
        <div class="choose">
            <div class="items bg-color">
                <div class="first">
                    <airAreaSearch class="airAreaSearch" v-show="airAreaSearchShow1" @li-click="getArea1"></airAreaSearch>
                    <airAreaSearch class="airAreaSearch" v-show="airAreaSearchShow2" @li-click="getArea2"></airAreaSearch>
                    <airAreaSearch class="airAreaSearch" v-show="airAreaSearchShow3" @li-click="getArea3"></airAreaSearch>
                    <div class="start item">
                        <div class="top" @click="space1 = !space1">
                            <span>{{space1ShowTitle}}</span>&nbsp;
                            <div class="triangle-little"></div>
                            <ul class="choose-type want-space" v-show="space1">
                                <li v-for="item in spaceList" @click="space1Fn(item)">{{item}}</li>
                            </ul>
                        </div>
                        <div class="bottom">
                            <input type="text" class="input-mes-a" :placeholder="space1Show" v-model="firArea" @focus="airportFn1" @blur="airportBlurFn1">
                            <airportS class="aisx" v-on:resData="resData1" :searchText="firArea" v-show="isSearch1"></airportS>
                        </div>
                        <div class="warn" v-show="warn3Show">*始发地不能为空</div>
                    </div>
                    <span class="icon-item" style="display: flex;align-items: flex-end;">&#xe672;</span>
                    <div class="pass item">
                        <div class="top" @click="space2 = !space2">
                            <span>{{space2ShowTitle}}</span>&nbsp;
                            <div class="triangle-little"></div>
                            <ul class="choose-type want-space" v-show="space2">
                                <li v-for="item in spaceList" @click="space2Fn(item)">{{item}}</li>
                            </ul>
                        </div>
                        <div class="bottom">
                            <input class="input-mes-a" type="text" :placeholder="space2Show" v-model="secArea" @focus="airportFn2" @blur="airportBlurFn2">
                            <airportS class="aisx" v-on:resData="resData2" :searchText="secArea" v-show="isSearch2"></airportS>
                        </div>
                    </div>
                    <span class="icon-item" style="display: flex;align-items: flex-end;">&#xe672;</span>
                    <div class="arrive item">
                        <div class="top" @click="space3 = !space3">
                            <span>{{space3ShowTitle}}</span>&nbsp;
                            <div class="triangle-little"></div>
                            <ul class="choose-type want-space" v-show="space3">
                                <li v-for="item in spaceList" @click="space3Fn(item)">{{item}}</li>
                            </ul>
                        </div>
                        <div class="bottom">
                            <input class="input-mes-a" type="text" :placeholder="space3Show" v-model="thirdArea" @focus="airportFn3" @blur="airportBlurFn3" >
                            <airportS class="aisx" v-on:resData="resData3" :searchText="thirdArea" v-show="isSearch3"></airportS>
                        </div>
                    </div>
                </div>
                <div class="second" v-show="secondShow">
                    <div class="start item" v-show="second1Show">
                        <div class="sec-accept">
                            <div class="top">是否接受临近机场</div>
                            <div class="bottom">
                                <div class="vertical-center">
                                    <input type="radio" class="magic-radio" name="airport-a" id="airAYes" @change="dptAcceptnearairport = 0"><label for="airAYes" class="input-label">是</label>
                                </div>
                                <div class="vertical-center">
                                    <input type="radio" class="magic-radio" name="airport-a" id="airANo" checked @change="dptAcceptnearairport = 1"><label for="airANo" class="input-label">否</label>
                                </div>
                            </div>
                        </div>
                        <div class="sec-resource">
                            <div class="top">出港资源</div>
                            <div class="resource-time">
                                <div class="vertical-center">
                                    <input type="radio" class="magic-radio" name="airport-a-res" id="airAResYes" checked @click="dptTimeresourcesFn0"><label for="airAResYes" class="input-label">有</label>
                                </div>
                                <div class="time-frame" @click="startTime1 = !startTime1">
                                    <span>{{startTime1Show}}</span>
                                    <ul class="choose-type start-time time-style" v-show="startTime1">
                                        <li v-for="item in timeList" @click="startTime1Fn(item)">{{item}}</li>
                                    </ul>
                                </div>
                                <span></span>
                                <div class="time-frame" @click="endTime1 = !endTime1">
                                    <span>{{endTime1Show}}</span>
                                    <ul class="choose-type end-time time-style" v-show="endTime1">
                                        <li v-for="item in timeList" @click="endTime1Fn(item)">{{item}}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="resource-others">
                                <div class="vertical-center">
                                    <input type="radio" class="magic-radio" name="airport-a-res" id="airAWait" @click="dptTimeresourcesFn1"><label for="airAWait" class="input-label">带协调</label>
                                </div>
                                <div class="vertical-center">
                                    <input type="radio" class="magic-radio" name="airport-a-res" id="airAEnough" @click="dptTimeresourcesFn2"><label for="airAEnough" class="input-label">时刻充足</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pass item" v-show="second2Show">
                        <div class="sec-accept">
                            <div class="top">是否接受临近机场</div>
                            <div class="bottom">
                                <div class="vertical-center">
                                    <input type="radio" class="magic-radio" name="airport-b" id="airBYes"@change="pstAcceptnearairport = 0"><label for="airBYes" class="input-label">是</label>
                                </div>
                                <div class="vertical-center">
                                    <input type="radio" class="magic-radio" name="airport-b" id="airBNo" checked @change="pstAcceptnearairport = 1"><label for="airBNo" class="input-label">否</label>
                                </div>
                            </div>
                        </div>
                        <div class="sec-resource">
                            <div class="top">出港资源</div>
                            <div class="resource-time">
                                <div class="vertical-center">
                                    <input type="radio" class="magic-radio" name="airport-b-res" id="airBResYes" checked @click="pstTimeresourcesFn0"><label for="airBResYes" class="input-label">有</label>
                                </div>
                                <div class="time-frame" @click="startTime2 = !startTime2">
                                    <span>{{startTime2Show}}</span>
                                    <ul class="choose-type start-time time-style" v-show="startTime2">
                                        <li v-for="item in timeList" @click="startTime2Fn(item)">{{item}}</li>
                                    </ul>
                                </div>
                                <span></span>
                                <div class="time-frame" @click="endTime2 = !endTime2">
                                    <span>{{endTime2Show}}</span>
                                    <ul class="choose-type end-time time-style" v-show="endTime2">
                                        <li v-for="item in timeList" @click="endTime2Fn(item)">{{item}}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="resource-others">
                                <div class="vertical-center">
                                    <input type="radio" class="magic-radio" name="airport-b-res" id="airBWait" @click="pstTimeresourcesFn1"><label for="airBWait" class="input-label">带协调</label>
                                </div>
                                <div class="vertical-center">
                                    <input type="radio" class="magic-radio" name="airport-b-res" id="airBEnough" @click="pstTimeresourcesFn2"><label for="airBEnough" class="input-label">时刻充足</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="arrive item" v-show="second3Show">
                        <div class="sec-accept">
                            <div class="top">是否接受临近机场</div>
                            <div class="bottom">
                                <div class="vertical-center">
                                    <input type="radio" class="magic-radio" name="airport-c" id="airCYes" @change="arrvAcceptnearairport = 0"><label for="airCYes" class="input-label">是</label>
                                </div>
                                <div class="vertical-center">
                                    <input type="radio" class="magic-radio" name="airport-c" id="airCNo" checked @change="arrvAcceptnearairport = 1"><label for="airCNo" class="input-label">否</label>
                                </div>
                            </div>
                        </div>
                        <div class="sec-resource">
                            <div class="top">出港资源</div>
                            <div class="resource-time">
                                <div class="vertical-center">
                                    <input type="radio" class="magic-radio" name="airport-c-res" id="airCResYes" checked @click="arrvTimeresourcesFn0"><label for="airCResYes" class="input-label">有</label>
                                </div>
                                <div class="time-frame" @click="startTime3 = !startTime3">
                                    <span>{{startTime3Show}}</span>
                                    <ul class="choose-type start-time time-style" v-show="startTime3">
                                        <li v-for="item in timeList" @click="startTime3Fn(item)">{{item}}</li>
                                    </ul>
                                </div>
                                <span></span>
                                <div class="time-frame" @click="endTime3 = !endTime3">
                                    <span>{{endTime3Show}}</span>
                                    <ul class="choose-type end-time time-style" v-show="endTime3">
                                        <li v-for="item in timeList" @click="endTime3Fn(item)">{{item}}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="resource-others">
                                <div class="vertical-center">
                                    <input type="radio" class="magic-radio" name="airport-c-res" id="airCWait" @click="arrvTimeresourcesFn1"><label for="airCWait" class="input-label">带协调</label>
                                </div>
                                <div class="vertical-center">
                                    <input type="radio" class="magic-radio" name="airport-c-res" id="airCEnough" @click="arrvTimeresourcesFn2"><label for="airCEnough">时刻充足</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="third items bg-color">
                <div class="third-a item">
                    <div class="right item-child">
                        <span class="margin-right">拟开时间</span>
                        <div class="choose-time" @click="calendarShow1=!calendarShow1" >
                            <div class="choose-time-icon">
                                <span class="icon-item">&#xe607;</span>
                            </div>
                            <div style="flex-grow: 1; text-align: center;">{{myDate1}}</div>
                        </div>
                        <div v-show="calendarShow1" class="calendar-box popup" style="top: 26px; left: 0;">
                            <div class="selec-data">
                                <input type="text" placeholder="开始时间" v-model="calendarInitDay1"><span>-</span>
                                <input type="text" placeholder="结束时间" v-model="calendarInitDay2">
                                <div class="confirm-btn btn" @click="getMyDate1">确定</div>
                                <div class="cancel-btn btn" @click="calendarShow1=!calendarShow1">取消</div>
                            </div>
                            <calendar v-on:changeDate="getDate1" :initDay="calendarInitDay1">
                                <!-- 可传入初始值 -->
                            </calendar>
                            <calendar v-on:changeDate="getDate2" :initDay="calendarInitDay2">
                                <!-- 可传入初始值 -->
                            </calendar>
                        </div>
                    </div>
                    <div class="left item-child">
                        <span class="margin-right">拟开班期</span>　
                        <div class="choose-border" style="align-items: center;" @click="schedule = !schedule">
                            <span style="margin-left: 3px;">{{scheduleShow}}</span>
                            <div class="triangle-big" style="position: absolute; top: 50%; right: 14px; margin-top: -3.5px;"></div>
                            <ul class="choose-type want-type" v-show="schedule">
                                <li v-for="item in scheduleList" @click="scheduleListFn(item)">{{item}}</li>
                            </ul>
                        </div>
                        <div class="warn" v-show="warn5Show" style="position: absolute;top: 26px; left: 0;">*班期不能为空</div>
                    </div>
                </div>
                <div class="third-b item">
                    <div class="right item-child">
                        <span class="margin-right">拟飞机型</span>　
                        <div class="choose-input">
                            <input class="input-mes" type="text" placeholder="输入选择机型" style="border: 0; line-height: 24px;" @focus="getAirType" @input="warn4Fn" v-model="typeChoose">
                        </div>
                        <ul class="choose-type air-type" v-show="airTypeShow">
                            <li v-for="item in airType" @click="chooseAirType(item)">{{item}}</li>
                        </ul>
                        <div class="warn" v-show="warn4Show" style="position: absolute; top: 26px; left: 0;">*机型不能为空</div>
                    </div>
                    <div class="left item-child">
                        <span class="margin-right">座位数</span>　
                        <div class="choose-input" style="width: 180px;">
                            <input class="input-mes" type="text" placeholder="填写举例：180" v-model="seatingNum" style="border: 0;"><span>人</span>
                        </div>
                    </div>
                </div>
                <div class="third-c item">
                    <div class="right item-child">
                        <span class="margin-right" style="white-space: nowrap">均班客量期望</span>
                        <div class="choose-input">
                            <input class="input-mes" type="text" placeholder="填写举例：80" v-model="avgguestExpect" style="border: 0;width: 136px;"><span>人</span>
                        </div>
                    </div>
                    <div class="left item-child">
                        <span>客座率期望</span>　
                        <div class="choose-input">
                            <input class="input-mes" type="text" placeholder="填写举例：80" v-model="loadfactorsExpect" style="border: 0;"><span>%</span>
                        </div>
                    </div>
                </div>
                <div class="third-d item">
                    <div class="right item-child">
                        <span>补贴政策</span>　
                        <div style="display: flex; flex-direction: column;">
                            <div class="vertical-center" style="margin-bottom: 10px;">
                                <input type="radio" class="magic-radio" name="subsidy" id="subsidyYes" checked/><label for="subsidyYes" class="input-label">有补贴</label>
                                <div class="choose-border" style="align-items: center; width: 118px;" @click="subsidy = !subsidy">
                                    <span style="margin-left: 12px;">{{subsidyShow}}</span>
                                    <div class="triangle-big" style="position: absolute; top: 50%; right: 11px; margin-top: -3.5px;"></div>
                                    <ul class="choose-type want-subsidy" v-show="subsidy">
                                        <li v-for="item in subsidyList" @click="subsidyListFn(item)">{{item}}</li>
                                    </ul>
                                </div>
                            </div>
                            <div style="display: flex">
                                <div class="vertical-center">
                                    <input type="radio" class="magic-radio" name="subsidy" id="subsidyNo" @click="subsidyClick1"/><label for="subsidyNo" class="input-label">无补贴</label>
                                </div>
                                <div class="vertical-center">
                                    <input type="radio" class="magic-radio" name="subsidy" id="subsidyTalk" @click="subsidyClick2"/><label for="subsidyTalk" class="input-label">可面谈</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left item-child">
                        <span class="margin-right">拦标价格</span>　
                        <div class="choose-input">
                            <input class="input-mes" type="text" placeholder="填写举例：100000" v-model="blockbidPrice" style="border: 0;"><span>元</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fourth items bg-color">
                <div class="top item-child">
                    <span class="margin-right">其他说明</span>　
                    <div class="choose-input">
                        <input class="input-mes" type="text" placeholder="可选填" v-model="remarkMsg" style="border: 0;"><span>0/35</span>
                    </div>
                </div>
                <div class="bottom item-child">
                    <span class="margin-right">发布有效期</span>　
                    <div class="choose-time" @click="calendarShow2 = !calendarShow2">
                        <div class="choose-time-icon">
                            <span class="icon-item">&#xe607;</span>
                        </div>
                        <div style="flex-grow: 1; text-align: center;">{{myDate2}}</div>
                    </div>
                    <div v-show="calendarShow2" class="calendar-box popup" style="left: 0; top: 47px;">
                        <div class="selec-data">
                            <input type="text" placeholder="开始时间" v-model="calendarInitDay3"><span>-</span>
                            <input type="text" placeholder="结束时间" v-model="calendarInitDay4">
                            <div class="confirm-btn btn" @click="getMyDate2">确定</div>
                            <div class="cancel-btn btn" @click="calendarShow2 = !calendarShow2">取消</div>
                        </div>
                        <calendar v-on:changeDate="getDate3" :initDay="calendarInitDay3">
                            <!-- 可传入初始值 -->
                        </calendar>
                        <calendar v-on:changeDate="getDate4" :initDay="calendarInitDay4">
                            <!-- 可传入初始值 -->
                        </calendar>
                    </div>
                </div>
            </div>
            <div class="sixth">
                <button class="btn-b btn-blue" @click="submitData">确认发布</button>
                <button class="btn-c btn-cancel">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
    import airAreaSearch from './airAreaSearch.vue'
    import airportS from '../reuseComponents/airportSearch.vue'
    import calendar from './calendar'

    export default {
        data() {
            return {
                thisShow: true,
                warn1Show: false,  //联系人警告
                warn2Show: false,  //联系方式警告
                warn3Show: false,  //始发地警告
                warn4Show: false,  //机型警告
                warn5Show: false,  //班期警告

                secondShow: false, //显示总的（三个）“是否接受临近机场”
                second1Show: false,//显示“是否接受临近机场”
                second2Show: false,//显示“是否接受临近机场”
                second3Show: false,//显示“是否接受临近机场”
                space1: false,
                space2: false,
                space3: false,
                startTime1: false,
                endTime1: false,
                startTime2: false,
                endTime2: false,
                startTime3: false,
                endTime3: false,
                schedule: false,
                subsidy: false,
                subsidyCode: '',//补贴类型
                airAreaSearchShow1: false,
                airAreaSearchShow2: false,
                airAreaSearchShow3: false,
                user: '', //联系人
                phoneNum: '', //电话号码
                firArea: '', //始发地 1的意向区域
                firAreaCode: '', //三字码（只有城市有）
                dptState: '',  //始发地类型（0：机场，1：区域）
                pstState: '',
                arrvState: '',
                secArea: '', //经停地 2的意向区域
                secAreaCode: '', //三字码（只有城市有）
                thirdArea: '', //到达地 3的意向区域
                thirdAreaCode: '', //三字码（只有城市有）

                areaInput1: '', //输入的机场或区域
                areaInput2: '', //输入的机场或区域
                areaInput3: '',
                typeChoose: '', //选中的机型
                airType: ['A320','A330','B737NG','E190/195','CRJ900','MA60','B787','B777','B767','E145','B757','B747','ARJ21'], //机型
                seatingNum: '',//座位数
                avgguestExpect: '',//均班客量期望
                loadfactorsExpect: '',//客座率期望
                blockbidPrice: '',//拦标价格
                remarkMsg: '',//其他说明
                dptAcceptnearairport: 1,//始发地是否接受临近机场（0：接受，1：不接受）
                pstAcceptnearairport: 1,//经停地是否接受临近机场（0：接受，1：不接受）
                arrvAcceptnearairport: 1,//到达地是否接受临近机场（0：接受，1：不接受）
                airTypeShow: false,
                directionPublicShow: false,//点击定向发布显示
                directionPublicCity: ['北京','上海','杭州'],
                /*机场查询*/
                qyCode1: "", //始发点机场三字码
                qyCode2: "", //经停地机场三字码
                qyCode3: "", //到达地机场三字码
                searchText: '',
                isSearch1: false,//机场搜索是否显示
                isSearch2: false,
                isSearch3: false,
                isSearchCode1: -1, //选择区域或机场 0为意向区域，1为意向机场
                isSearchCode2: -1,
                isSearchCode3: -1,
                /****************/

                inputRadio: '&#xe622;',

                dptTimeresources: 0,//始发地时刻资源，(时刻资源三种状态0:有时刻（直接呈现时刻）dpt_time字段存放具体时刻值， 1:待协调， 2:时刻充足。)
                pstTimeresources: 0,//经停地时刻资源，(时刻资源三种状态0:有时刻（直接呈现时刻）dpt_time字段存放具体时刻值， 1:待协调， 2:时刻充足。)
                arrvTimeresources: 0,//到达地时刻资源，(时刻资源三种状态0:有时刻（直接呈现时刻）dpt_time字段存放具体时刻值， 1:待协调， 2:时刻充足。)
                dptTime: '',        //存放具体时刻值
                pstTime: '',        //存放具体时刻值
                arrvTime: '',        //存放具体时刻值
                startTime1Show: '00:00',
                endTime1Show: '00:00',
                startTime2Show: '00:00',
                endTime2Show: '00:00',
                startTime3Show: '00:00',
                endTime3Show: '00:00',
                space1Show: '请先选择始发点类型',
                space2Show: '请先选择经停点类型（选填）',
                space3Show: '请先选择到达点类型',
                publicwayStrCode: 0,//公开方式

                calendarInitDay1: '', //日历
                calendarInitDay2: '',
                calendarInitDay3: '',
                calendarInitDay4: '',
                myDate1: '选择起止时间',
                myDate2: '选择起止时间',
                calendarShow1: false,
                calendarShow2: false,

                space1ShowTitle: '始发点类型',
                space2ShowTitle: '经停点类型',
                space3ShowTitle: '到达点类型',

//                sailingtime: '选择起止时间',//开航时间
//                periodValidity: '选择起止时间',//发布有效期

                scheduleShow: '选择班期类型',
                subsidyShow: '选择补贴类型',
                timeList: ['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','00:00'],
                spaceList: ['意向区域','意向机场'],
                scheduleList: ['待定','满排','半排'],
                subsidyList: ['保底','定补','按人头']
            }
        },
        components: {
            airAreaSearch,
            airportS,
            calendar
        },
        watch: {
            typeChoose: function () {
                this.warn4Show = false;
            }
        },
        computed: {
            sailingtime: function () {
                return this.calendarInitDay1 + ',' +this.calendarInitDay2;
            },
            periodValidity: function () {
                return this.calendarInitDay3 + ',' +this.calendarInitDay4;
            }
        },
        methods: {
            warn4Fn: function () {
                console.info(4)
                this.warn4Show = true;
            },
            //发送数据
            submitData: function () {
                //表单验证（部分）
                /*if(this.user == '') {
                    this.warn1Show = true;
                    return
                }if(this.phoneNum == '') {
                    this.warn2Show = true;
                    return
                }if(this.firArea == '') {
                    this.warn3Show = true;
                    return
                }if(this.typeChoose == '') {
                    this.warn4Show = true;
                    return
                }*/

                let sendData = {};
                sendData.demandtype = '3';      //必填 需求种类共3种（0:航线需求、1:运力需求、3:航线托管需求）
                sendData.contact = this.user;  //必填 联系人
                sendData.iHome = this.phoneNum;//必填 联系方式
                if(this.dptState == 0) {
                    sendData.dpt = this.qyCode1;//必填 机场传三字码，区域和省份传汉字
                }if(this.dptState == 1) {
                    sendData.dpt = this.firArea;//必填 机场传三字码，区域和省份传汉字
                }
//                sendData.dpt = this.firAreaCode;
                sendData.dptState = this.dptState;         //始发地类型（0：机场，1：区域）
//                sendData.dptCt = this.firAreaCode; //不传
                sendData.dptAcceptnearairport = this.dptAcceptnearairport; //必填 始发地是否接收临近机场(0:接收,1:不接收)
                sendData.dptTimeresources = this.dptTimeresources;        //选填 始发地时刻资源(时刻资源三种状态0:有时刻（直接呈现时刻）dpt_time字段存放具体时刻值， 1:待协调， 2:时刻充足。)
                sendData.pstTimeresources = this.pstTimeresources;        //选填 经停地时刻资源(时刻资源三种状态0:有时刻（直接呈现时刻）dpt_time字段存放具体时刻值， 1:待协调， 2:时刻充足。)
                sendData.arrvTimeresources = this.arrvTimeresources;        //选填 到达地时刻资源(时刻资源三种状态0:有时刻（直接呈现时刻）dpt_time字段存放具体时刻值， 1:待协调， 2:时刻充足。)
                this.dptTime = this.startTime1Show + ',' + this.endTime1Show;
                this.pstTime = this.startTime2Show + ',' + this.endTime2Show;
                this.arrvTime = this.startTime3Show + ',' + this.endTime3Show;
                sendData.dptTime = this.dptTime;
                sendData.pstTime = this.pstTime;
                sendData.arrvTime = this.arrvTime;
                sendData.aircrfttyp = this.typeChoose;  //必填 机型
                sendData.days = this.scheduleShow;      //必填 班期
                sendData.subsidypolicy = this.subsidyCode;   //必填 补贴有种状态：有补贴（0:定补、1:保底、2:人头补）3:待议4:无补贴
                sendData.sailingtime = this.sailingtime;      //必填 拟开行时间（起止时间）
                sendData.publicway = this.publicwayStrCode;   //必填 公开方式(0:对所有人公开,1:对认证用户公开,2:定向航司,3:定向机场), 3和4定位目标在下一个字段
                sendData.periodValidity = this.periodValidity; //必填 需求发布有效期
//                sendData.pst = this.secAreaCode;   //选填 经停地
                sendData.pstState = this.pstState;         //经停地类型（0：机场，1：区域）
                if(this.pstState == 0) {
                    sendData.pst = this.qyCode2;//选填 经停地，机场三字码
                }if(this.pstState == 1) {
                    sendData.pst = this.secArea;//选填 经停地
                }
//                sendData.pstCt = this.secAreaCode; //不传
                sendData.pstAcceptnearairport = this.pstAcceptnearairport; //选填 经停地是否接收临近机场(0:接收,1:不接受)
//                sendData.arrv = this.thirdAreaCode;//选填 到达地
                sendData.arrvState = this.arrvState;         //到达地类型（0：机场，1：区域）
                if(this.arrvState == 0) {
                    sendData.arrv = this.qyCode3;//选填 到达地，机场三字码
                }if(this.arrvState == 1) {
                    sendData.arrv = this.thirdArea//选填 到达地
                }
//                sendData.arrvCt = this.thirdAreaCode; //不传
                sendData.arrvAcceptnearairport = this.arrvAcceptnearairport; //选填 到达地是否接收临近机场(0:接收,1:不接受)
                sendData.blockbidprice = this.blockbidPrice; //选填 拦标价格
                sendData.loadfactorsexpect = this.loadfactorsExpect; //选填 客座率期望
                sendData.avgguestexpect = this.avgguestExpect; // 选填 均班客座期望
                sendData.seating = this.seatingNum;            // 选填 座位数
                sendData.remark = this.remarkMsg;              // 选填 备注说明

                console.info(sendData);
                this.$ajax({
                    url:"/demandAdd",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: sendData
                }) .then((response) => {
                    console.info(response.data)
//                    this.$store.dispatch('hybridData', response.data.list.list).then(() => {});
                }) .catch((error) => {
                    console.log(error);
                });
                this.thisShow = false;
            },
            //点击关闭所有下拉
            closeAll: function () {
                this.space1 = false;
                this.space2 = false;
                this.space3 = false;
                this.startTime1 = false;
                this.startTime2 = false;
                this.startTime3 = false;
                this.endTime1 = false;
                this.endTime2 = false;
                this.endTime3 = false;
                this.schedule = false;
                this.airTypeShow = false; //拟飞机型下拉
                this.subsidy = false;

            },
            // 电话号码验证
            verifyPhon: function () {
                if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phoneNum))){
                    this.warnShow = true;
                }else{
                    this.warnShow = false;
                }
            },
            //区域选择，获取点击的区域
            getArea1: function (areaMes) {
                this.firArea = areaMes.name;
                this.firAreaCode = areaMes.code; //三字码（只有城市有）
                this.airAreaSearchShow1 = false;
            },
            getArea2: function (areaMes) {
                this.secArea = areaMes.name;
                this.secAreaCode = areaMes.code; //三字码（只有城市有）
                this.airAreaSearchShow2 = false;
            },
            getArea3: function (areaMes) {
                this.thirdArea = areaMes.name;
                this.thirdAreaCode = areaMes.code; //三字码（只有城市有）
                this.airAreaSearchShow3 = false;
            },
            //时刻资源
            dptTimeresourcesFn0: function () {
                this.dptTimeresources = 0;
            },
            dptTimeresourcesFn1: function () {
                this.dptTimeresources = 1;
                this.dptTime = '';
            },
            dptTimeresourcesFn2: function () {
                this.dptTimeresources = 2;
                this.dptTime = '';
            },
            pstTimeresourcesFn0: function () {
                this.pstTimeresources = 0;
            },
            pstTimeresourcesFn1: function () {
                this.pstTimeresources = 1;
                this.pstTime = '';
            },
            pstTimeresourcesFn2: function () {
                this.pstTimeresources = 2;
                this.pstTime = '';
            },
            arrvTimeresourcesFn0: function () {
                this.arrvTimeresources = 0;
            },
            arrvTimeresourcesFn1: function () {
                this.arrvTimeresources = 1;
                this.arrvTime = '';
            },
            arrvTimeresourcesFn2: function () {
                this.arrvTimeresources = 2;
                this.arrvTime = '';
            },

            // 获取机型数据
            getAirType: function () {
                this.airTypeShow = true;
            },
            // 选中拟飞机型
            chooseAirType: function (item) {
                this.typeChoose = item;
                this.airTypeShow = false;
            },
            // 意向机场/意向区域（0为区域 1为机场），input得到焦点
            airportFn1: function () {
                if(this.isSearchCode1 == 1){
                    this.isSearch1 = true;
                    this.isSearch2 = false;
                    this.isSearch3 = false;

                }
                if(this.isSearchCode1 == 0){
                    this.airAreaSearchShow1 = true;
                    this.airAreaSearchShow2 = false;
                    this.airAreaSearchShow3 = false;

                }
            },
            // 意向机场/意向区域，input失去焦点
            airportBlurFn1: function () {
                this.space1 = false;
            },
            airportFn2: function () {
                if(this.isSearchCode2 == 1){
                    this.isSearch1 = false;
                    this.isSearch2 = true;
                    this.isSearch3 = false;

                }
                if(this.isSearchCode2 == 0){
                    this.airAreaSearchShow1 = false;
                    this.airAreaSearchShow2 = true;
                    this.airAreaSearchShow3 = false;
                }
            },
            airportBlurFn2: function () {
                this.space2 = false;
            },
            airportFn3: function () {
                if(this.isSearchCode3 == 1){
                    this.isSearch1 = false;
                    this.isSearch2 = false;
                    this.isSearch3 = true;
                }
                if(this.isSearchCode3 == 0){
                    this.airAreaSearchShow1 = false;
                    this.airAreaSearchShow2 = false;
                    this.airAreaSearchShow3 = true;
                }
            },
            airportBlurFn3: function () {
                this.space3 = false;
            },
            // 选中意向机场
            resData1: function (data) {
                this.isSearch1 = false;
                this.firArea = data.name;
                this.qyCode1 = data.code;
            },
            resData2: function (data) {
                this.isSearch2 = false;
                this.secArea = data.name;
                this.qyCode2 = data.code;
            },
            resData3: function (data) {
                this.isSearch3 = false;
                this.thirdArea = data.name;
                this.qyCode3 = data.code;
            },
            // 选择意向区域或意向机场 0为区域，1为机场
            space1Fn: function (item) {
                this.space1ShowTitle = item;
                this.firArea = '';
                if(item == '意向区域') {
                    this.space1Show = '请输入意向区域';
                    this.isSearchCode1 = 0;
                    this.second1Show = false;
                    this.isSearch1 = false;
                    this.isSearch2 = false;
                    this.isSearch3 = false;
                    this.dptState = 1;
                }if(item == '意向机场') {
                    this.space1Show = '请输入意向机场';
                    this.secondShow = true;
                    this.second1Show = true;
                    this.dptTime = this.startTime1Show + ',' + this.endTime1Show; //时刻资源
                    this.isSearchCode1 = 1;
                    this.airAreaSearchShow1 = false;
                    this.airAreaSearchShow2 = false;
                    this.airAreaSearchShow3 = false;
                    this.dptState = 0;
                }if(this.second1Show == false && this.second2Show == false && this.second3Show == false) {
                    this.secondShow = false;
//                    this.dptState = '';
                }
            },
            space2Fn: function (item) {
                this.space2ShowTitle = item;
                this.secArea = '';
                if(item == '意向区域') {
                    this.space2Show = '请输入意向区域';
                    this.isSearchCode2 = 0;
                    this.second2Show = false;
                    this.isSearch1 = false;
                    this.isSearch2 = false;
                    this.isSearch3 = false;
                    this.pstState = 1;
                }if(item == '意向机场') {
                    this.space2Show = '请输入意向机场';
                    this.secondShow = true;
                    this.second2Show = true;
                    this.isSearchCode2 = 1;
                    this.airAreaSearchShow1 = false;
                    this.airAreaSearchShow2 = false;
                    this.airAreaSearchShow3 = false;
                    this.pstState = 0;
                }if(this.second1Show == false && this.second2Show == false && this.second3Show == false) {
                    this.secondShow = false;
//                    this.pstState = '';
                }
            },
            space3Fn: function (item) {
                this.space3ShowTitle = item;
                this.thirdArea = '';
                if(item == '意向区域') {
                    this.space3Show = '请输入意向区域';
                    this.isSearchCode3 = 0;
                    this.second3Show = false;
                    this.isSearch1 = false;
                    this.isSearch2 = false;
                    this.isSearch3 = false;
                    this.arrvState = 1;
                }if(item == '意向机场') {
                    this.space3Show = '请输入意向机场';
                    this.secondShow = true;
                    this.second3Show = true;
                    this.isSearchCode3 = 1;
                    this.airAreaSearchShow1 = false;
                    this.airAreaSearchShow2 = false;
                    this.airAreaSearchShow3 = false;
                    this.arrvState = 0;
                }if(this.second1Show == false && this.second2Show == false && this.second3Show == false) {
                    this.secondShow = false;
//                    this.arrvState = '';
                }
            },
            scheduleListFn: function (item) {
                this.scheduleShow = item;
            },
            subsidyListFn: function (item) {
                this.subsidyShow = item;
                if(item == '定补'){
                    this.subsidyCode = 0;
                }if(item == '保底'){
                    this.subsidyCode = 1;
                }if(item == '人头补'){
                    this.subsidyCode = 2;
                }
            },
            // 点击删除小标签
            littleLabelClose: function (index) {
                this.directionPublicCity.splice(index,1);
            },
            // 日历
            getDate1: function(d){//获取组件返回的日期
                this.calendarInitDay1 = d.split('-').join('.');
            },
            getDate2: function(d){
                this.calendarInitDay2 = d.split('-').join('.');
            },
            getMyDate1: function(){//获取起始的日期
                if(this.calendarInitDay1 && this.calendarInitDay2){
                    this.myDate1 = this.calendarInitDay1 + "-" + this.calendarInitDay2;
                    this.calendarShow1 = false;
                }else{}
            },
            getDate3: function(d){
                this.calendarInitDay3 = d.split('-').join('.');
            },
            getDate4: function(d){
                this.calendarInitDay4 = d.split('-').join('.');
            },
            getMyDate2: function(){//获取起始的日期
                if(this.calendarInitDay3 && this.calendarInitDay4){
                    this.myDate2 = this.calendarInitDay3 + "-" + this.calendarInitDay4;
                    this.calendarShow2 = false;
                }else{}
            },
            //补贴点击，改变补贴码
            subsidyClick1: function () {
                this.subsidyCode = 4;
            },
            subsidyClick2: function () {
                this.subsidyCode = 3;
            },
            //点击定向发布
            directionPublic: function () {
                this.directionPublicShow = true;
                this.publicwayStrCode = 2;
            },
            // 起止时间显示到上方的框内
            startTime1Fn: function (item) {
                this.startTime1Show = item;
            },
            endTime1Fn: function (item) {
                this.endTime1Show = item;
            },
            startTime2Fn: function (item) {
                this.startTime2Show = item;
            },
            endTime2Fn: function (item) {
                this.endTime2Show = item;
            },
            startTime3Fn: function (item) {
                this.startTime3Show = item;
            },
            endTime3Fn: function (item) {
                this.endTime3Show = item;
            }

        }
    }
</script>
<style lang="scss" scoped>
    $icon-color: #3c78ff;
    $font-color: #605e7c;
    $border-color: rgba(96,94,124,0.37);
    .icon-item {
        font-size: 1.6rem;
        font-family: iconfont;
    }
    input {
        margin: 0;
        padding: 0;
    }
    .input-mes-a {
        flex-grow: 1;
        line-height: 19px;
        background: transparent;
        outline: none;
        font-size: 1rem;
        border: 0;
        color: $font-color;
    }
    .time-style::-webkit-scrollbar {
        width: 7px;
    }
    .time-style::-webkit-scrollbar-thumb {
        height: 56px;
        background: #D8D8D8;
        border-radius: 4px;
    }
    .input-label {
        /*margin:  0 9px 0 8px;*/
        margin-right: 9px;
    }
    .vertical-center {
        position: relative;
        display: flex;
        align-items: center;
        .input-cover {
            position: absolute;
            width: 13px;
            height: 13px;
            top: 2px;
            left: -2px;
        }
        input {
            opacity: 0.5;
        }
    }

    .margin-right {
        margin-right: 10px;
    }

    .choose-time {
        display: flex;
        align-items: center;
        flex-grow: 1;
        color: $font-color;
        border: 1px solid $border-color;
        border-radius: 4px;
        cursor: pointer;
        .choose-time-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 24px;
            height: 24px;
            border-right: 1px solid $border-color;
        }
    }

    .choose-border {
        position: relative;
        display: flex;
        flex-grow: 1;
        color: $font-color;
        border: 1px solid $border-color;
        border-radius: 4px;
        cursor: pointer;
    }

    .choose-input {
        display: flex;
        justify-content: space-between;
        flex-grow: 1;
        color: $font-color;
        border-bottom: 1px solid $border-color;
    }

    .choose-type {
        position: absolute;
        margin: 0;
        padding: 0;
        list-style: none;
        border-radius: 4px;
        box-shadow: 0 2px 11px $border-color;
        background: white;
        overflow: hidden;
        z-index: 1;
        li {
            padding-left: 14px;
            height: 35px;
            line-height: 32px;
            font-size: 1.2rem;
            color: $font-color;
            cursor: pointer;
            &:hover {
                background: #F5F5F5;
            }
        }
    }

    .btn-blue {
        border: 0;
        border-radius: 20px;
        background: $icon-color;
        color: white;
        font-size: 1.5rem;
        box-shadow: -1px 2px 6px $icon-color;
        &:hover {
            opacity: 0.7;
        }
    }

    .btn-cancel {
        font-size: 1.5rem;
        border: 1px solid $font-color;
        border-radius: 20px;
        background: transparent;
    }

    .triangle-big {
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 7px solid $icon-color;
    }

    .triangle-little {
        width: 0;
        height: 0;
        border-left: 4.5px solid transparent;
        border-right: 4.5px solid transparent;
        border-top: 5px solid $icon-color;
    }

    .warn {
        height: 20px;
        color: #FF9393;
    }

    .input-mes {
        flex-grow: 1;
        padding-left: 10px;
        background: transparent;
        outline: none;
        font-size: 1rem;
        border: 0;
        color: $font-color;
        border-bottom: 1px solid $border-color;
    }
    /*横线上的小标签*/
    .little-label{
        display: flex;
        align-items: center;
        padding: 0 5px 0 10px;
        line-height: 23px;
        border-radius: 20px;
        color: $icon-color;
        background: #F5F5F5;
        white-space: nowrap;
    }
    .little-label-close {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
        width: 15px;
        height: 15px;
        font-family: iconfont;
        font-size: 10px;
        border-radius: 100%;
        background: white;
        cursor: pointer;
    }
    /***********/

    /****************radio样式更改******************/
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
            color: $font-color;
            content: '\e61c';
            border-radius: 50%;
        }
    }
    .magic-radio:checked + label {
        &:before {
            content: '\e622';
            color: $icon-color;
        }
    }
    /****************************/

    /*日历样式*/
    #search{
        padding-top: 100px;
    }
    .left-side-box{
        width: 400px;
        height: 400px;
        margin: 0 auto;
    }
    .calendar-box{
        position: absolute;
        width: 540px;
        height:270px;
        padding:20px 10px 10px 10px;
        z-index: 1;
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
        padding-left:15px;
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
    .popup {
        border-radius: 4px;
        opacity: 1;
        background-color: white;
        box-shadow: 0 5px 11px rgba(85, 85, 85, .1);
    }
    /*********/
    .container {
        position: absolute;
        top: 65px;
        right: 0px;
        padding: 20px 20px 0 20px;
        width: 580px;
        max-height: 630px;
        overflow-y: scroll;
        overflow-x: visible;
        border-radius: 4px;
        box-shadow: 0 2px 11px rgba(85,85,85,0.1);
        background: white;
        z-index: 2;
        .items {
            border-radius: 4px;
        }
    }
    .container::-webkit-scrollbar {
        width: 7px;
    }
    .container::-webkit-scrollbar-thumb {
        background: #D8D8D8;
        border-radius: 4px;
    }

    .bg-color {
        background: #FBFBFB;
    }

    .must {
        display: flex;
        justify-content: space-between;
        padding: 27px 20px;
        margin-bottom: 10px;
        border-radius: 4px;
        //  height: 26px;
        line-height: 26px;
        .item-child {
            display: flex;
            flex-direction: column;
            //      align-items: flex-start;
            width: 240px;
            //      height: 26px;
            line-height: 26px;
        }
    }

    .choose {
        //  padding: 0 20px;
    }

    .first {
        position: relative;
        display: flex;
        justify-content: space-between;
        /*align-items: flex-end;*/
        padding: 20px 20px 10px 20px;
        .airAreaSearch {
            left: 0px;
            top: 90px;
        }
        .item {
            display: flex;
            flex-direction: column;
            color: $font-color;
            .top {
                position: relative;
                display: flex;
                align-items: center;
                align-self: flex-start;
                padding: 0 4px;
                margin-bottom: 24px;
                width: 70px;
                height: 24px;
                line-height: 24px;
                border: 1px solid $border-color;
                border-radius: 4px;
                cursor: pointer;
                .triangle-little {
                    position: absolute;
                    top: 50%;
                    right: 3px;
                    margin-top: -2.5px;
                }
                .want-space {
                    top: 25px;
                    left: -1px;
                    width: 80px;
                    z-index: 3;
                }
            }
            .bottom {
                position: relative;
                display: flex;
                height: 19px;
                line-height: 19px;
                border-bottom: 1px solid $border-color;
            }
        }
        .start {
            width: 160px;
        }
        .pass {
            width: 160px;
        }
        .arrive {
            width: 160px;
        }
    }
    .aisx {
        position: absolute;
        top: 19px;
        left: -3px;
        width: 260px;
        max-height: 210px;
        overflow-y: scroll;
        z-index: 2;
    }
    .second {
        position: relative;
        display: flex;
        justify-content: space-between;
        padding: 10px 20px 20px 20px;
        height: 160px;
        .item {
            position: absolute;
            top: 10px;
        }
        .start {
            left: 20px;
            width: 160px;
        }
        .pass {
            left: 207px;
            width: 160px;
        }
        .arrive {
            right: 20px;
            width: 160px;
        }
    }

    .sec-accept {
        margin-bottom: 20px;
        .top {
            height: 20px;
        }
        .bottom {
            display: flex;
            height: 20px;
        }
    }

    .sec-resource {
        .top {
            height: 20px;
        }
        .resource-time {
            display: flex;
            align-items: center;
            height: 40px;
            .time-frame {
                position: relative;
                padding: 0 6px;
                height: 24px;
                line-height: 24px;
                border: 1px solid $border-color;
                border-radius: 4px;
                cursor: pointer;
                .start-time {
                    top: 25px;
                    left: -10px;
                    width: 60px;
                    height: 200px;
                    overflow-y: scroll;
                    z-index: 1;
                }
                .end-time {
                    top: 25px;
                    right: -10px;
                    width: 60px;
                    height: 200px;
                    overflow-y: scroll;
                    z-index: 1;
                }
            }
            >span {
                margin: 0 3px;
                height: 1px;
                width: 8px;
                background: black;
            }
        }
        .resource-others {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 20px;
        }
    }

    .third {
        padding: 0 20px;
        margin: 10px 0;
        .item {
            display: flex;
            justify-content: space-between;
            .item-child {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 240px;
                height: 26px;
                line-height: 24px;
            }
            .left {
                .want-type {
                    top: 25px;
                    left: -1px;
                    width: 180px;
                }
                .choose-input {
                    flex-grow: 0;
                    width: 180px;
                }
            }
        }
        .third-a {
            padding: 27px 0;
            height: 26px;
            line-height: 26px;
            .right {
                position: relative;
            }
        }
        .third-b {
            padding: 17px 0;
            .right {
                position: relative;
                .air-type {
                    top: 26px;
                    left: 58px;
                    width: 182px;
                    max-height: 153px;
                    overflow-y: scroll;
                }
                .air-type::-webkit-scrollbar {
                    width: 7px;
                }
                .air-type::-webkit-scrollbar-thumb {
                    height: 56px;
                    background: #D8D8D8;
                    border-radius: 4px;
                }
            }
        }
        .third-c {
            padding: 17px 0;
        }
        .third-d {
            padding: 17px 0 21px 0;
            height: 62px;
            .right {
                align-items: flex-start;
                .want-subsidy {
                    top: 25px;
                    left: -1px;
                    width: 120px;
                }
            }
        }
    }

    .fourth {
        display: flex;
        flex-direction: column;
        padding: 0 20px;
        margin-bottom: 10px;
        .item-child {
            display: flex;
            align-items: center;
            flex-grow: 1;
            height: 26px;
            line-height: 26px;
        }
        .top {
            padding: 27px 0;
        }
        .bottom {
            position: relative;
            padding: 20px 0 34px 0;
            width: 240px;
        }
    }

    .fifth {
        display: flex;
        padding: 40px 0 70px 0;
        height: 26px;
        line-height: 26px;
        > div {
            display: flex;
            align-items: center;
            margin-right: 20px;
        }
    }

    .sixth {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 44px;
        button {
            padding: 9px 20px;
            outline: none;
            font-size: 1.5rem;
            line-height: 20px;
            cursor: pointer;
        }
        .btn-b {
            margin-right: 10px;
            width: 160px;
        }
        .btn-c {
        }
    }
</style>
