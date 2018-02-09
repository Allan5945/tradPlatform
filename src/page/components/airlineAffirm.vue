<template>
    <div class="wrapper">
        <div class="container" id="airlineAffirm" @click="closeAll">
            <div class="container-top">
                <span class="title">请确认以下方案</span>
                <span class="close-icon iconfont" @click="closeThis">&#xe62c</span>
            </div>
            <div class="bg-color must">
                <div class="right item-child">
                    <div style="display: flex;">
                        <span>联系人<span class="warn"> *</span>　</span>
                        <input class="input-mes" type="text" placeholder="请填写有效联系人" v-model="user"
                               @keyup="warn1Show=false" disabled>
                    </div>
                    <div class="warn" v-show="warn1Show">*请填写联系人</div>
                </div>
                <div class="left item-child">
                    <div style="display: flex;">
                        <span>联系方式<span class="warn"> *</span>　</span>
                        <input class="input-mes" type="text" placeholder="请填写有效联系方式" @blur="verifyPhon"
                               v-model="phoneNum" disabled>
                    </div>
                    <div class="warn" v-show="warn2Show">*电话格式有误，请重新输入</div>
                </div>
            </div>
            <div class="choose">
                <div class="items bg-color" style="position: relative; padding-bottom: 20px;">
                    <div class="warn" v-show="warn8Show" style="position: absolute; left: 20px; bottom: 7px;">*始发地为意向区域时，经停地或到达地必须有一个为意向机场！</div>
                    <div class="warn" v-show="warn9Show" style="position: absolute; left: 20px; bottom: 7px;">*始发地、经停地、到达地不能相同！</div>
                    <div class="first">
                        <airAreaSearch class="airAreaSearch" v-show="airAreaSearchShow1"
                                       @li-click="getArea1" style="left: 0;"></airAreaSearch>
                        <airAreaSearch class="airAreaSearch" v-show="airAreaSearchShow2"
                                       @li-click="getArea2" style="left: 71px;"></airAreaSearch>
                        <airAreaSearch class="airAreaSearch" v-show="airAreaSearchShow3"
                                       @li-click="getArea3" style="right: 0;"></airAreaSearch>
                        <div class="start item">
                            <div class="top" @click.stop="clickClose1Fn">
                                <span>{{space1ShowTitle}}</span>&nbsp;
                                <div class="triangle-little"></div>
                                <ul class="choose-type want-space" v-show="space1">
                                    <li v-for="item in spaceList" @click="space1Fn(item)">{{item}}</li>
                                </ul>
                            </div>
                            <div class="bottom">
                                <input type="text" class="input-mes-a" :placeholder="space1Show" v-model="firArea"
                                       @click.stop="airportFn1" @focus="airportFn1" @blur="airportBlurFn1">
                                <airportS class="aisx" v-on:resData="resData1" :searchText="firArea"
                                          v-show="isSearch1"></airportS>
                            </div>
                            <div class="warn" v-show="warn3Show">*始发地不能为空</div>
                        </div>
                        <div style="display: flex;flex-direction: column; justify-content: flex-end;">
                            <span class="icon-item">&#xe672;</span>
                            <span v-show="warn3Show" style="height: 20px">　</span>
                        </div>
                        <div class="pass item">
                            <div class="top" @click.stop="clickClose2Fn ">
                                <span>{{space2ShowTitle}}</span>&nbsp;
                                <div class="triangle-little"></div>
                                <ul class="choose-type want-space" v-show="space2">
                                    <li v-for="item in spaceList" @click="space2Fn(item)">{{item}}</li>
                                </ul>
                            </div>
                            <div class="bottom">
                                <input class="input-mes-a" type="text" :placeholder="space2Show" v-model="secArea"
                                       @click.stop="airportFn2" @focus="airportFn2" @blur="airportBlurFn2">
                                <airportS class="aisx" v-on:resData="resData2" :searchText="secArea"
                                          v-show="isSearch2"></airportS>
                            </div>
                        </div>
                        <div style="display: flex;flex-direction: column; justify-content: flex-end;">
                            <span class="icon-item">&#xe672;</span>
                            <span v-show="warn3Show" style="height: 20px">　</span>
                        </div>
                        <div class="arrive item">
                            <div class="top" @click.stop="clickClose3Fn ">
                                <span>{{space3ShowTitle}}</span>&nbsp;
                                <div class="triangle-little"></div>
                                <ul class="choose-type want-space" v-show="space3">
                                    <li v-for="item in spaceList" @click="space3Fn(item)">{{item}}</li>
                                </ul>
                            </div>
                            <div class="bottom">
                                <input class="input-mes-a" type="text" :placeholder="space3Show" v-model="thirdArea"
                                       @click.stop="airportFn3" @focus="airportFn3" @blur="airportBlurFn3">
                                <airportS class="aisx" v-on:resData="resData3" :searchText="thirdArea"
                                          v-show="isSearch3" style="left: -65px;"></airportS>
                            </div>
                        </div>
                    </div>
                    <div class="second" v-show="secondShow">
                        <div class="start item" v-show="second1Show">
                            <div class="sec-accept">
                                <div class="top">是否接受临近机场</div>
                                <div class="bottom">
                                    <div class="vertical-center">
                                        <input type="radio" class="magic-radio" name="airport-a" id="alAairAYes" :checked="accept11Checked" @change="dptAcceptnearairportFn0"><label for="alAairAYes" class="input-label">是</label>
                                    </div>
                                    <div class="vertical-center">
                                        <input type="radio" class="magic-radio" name="airport-a" id="alAairANo" :checked="accept12Checked" @change="dptAcceptnearairportFn1"><label for="alAairANo" class="input-label">否</label>
                                    </div>
                                </div>
                            </div>
                            <div class="sec-resource">
                                <div class="top">出港资源</div>
                                <div class="resource-time">
                                    <div class="vertical-center">
                                        <input type="radio" class="magic-radio" name="airport-a-res" id="alAairAResYes" :checked="time11Checked" @click="dptTimeresourcesFn0"><label for="alAairAResYes" class="input-label">有</label>
                                    </div>
                                    <div class="time-frame" @click.stop="clickClose4Fn ">
                                        <span>{{startTime1Show}}</span>
                                        <ul class="choose-type start-time time-style" v-show="startTime1 && time11Checked">
                                            <li v-for="item in timeList" @click="startTime1Fn(item)">{{item}}</li>
                                        </ul>
                                    </div>
                                    <span></span>
                                    <div class="time-frame" @click.stop="clickClose5Fn ">
                                        <span>{{endTime1Show}}</span>
                                        <ul class="choose-type end-time time-style" v-show="endTime1 && time11Checked">
                                            <li v-for="item in timeList" @click="endTime1Fn(item)">{{item}}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="resource-others">
                                    <div class="vertical-center">
                                        <input type="radio" class="magic-radio" name="airport-a-res" id="alAairAWait" :checked="time12Checked" @click="dptTimeresourcesFn1"><label for="alAairAWait" class="input-label">待协调</label>
                                    </div>
                                    <div class="vertical-center">
                                        <input type="radio" class="magic-radio" name="airport-a-res" id="alAairAEnough" :checked="time13Checked" @click="dptTimeresourcesFn2"><label for="alAairAEnough" class="input-label">时刻充足</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pass item" v-show="second2Show">
                            <div class="sec-accept">
                                <div class="top">是否接受临近机场</div>
                                <div class="bottom">
                                    <div class="vertical-center">
                                        <input type="radio" class="magic-radio" name="airport-b" id="alAairBYes" :checked="accept21Checked" @change="pstAcceptnearairportFn0"><label for="alAairBYes" class="input-label">是</label>
                                    </div>
                                    <div class="vertical-center">
                                        <input type="radio" class="magic-radio" name="airport-b" id="alAairBNo" :checked="accept22Checked" @change="pstAcceptnearairportFn1"><label for="alAairBNo" class="input-label">否</label>
                                    </div>
                                </div>
                            </div>
                            <div class="sec-resource">
                                <div class="top">出港资源</div>
                                <div class="resource-time">
                                    <div class="vertical-center">
                                        <input type="radio" class="magic-radio" name="airport-b-res" id="alAairBResYes" :checked="time21Checked" @click="pstTimeresourcesFn0"><label for="alAairBResYes" class="input-label">有</label>
                                    </div>
                                    <div class="time-frame" @click.stop="clickClose6Fn ">
                                        <span>{{startTime2Show}}</span>
                                        <ul class="choose-type start-time time-style" v-show="startTime2 && time21Checked">
                                            <li v-for="item in timeList" @click="startTime2Fn(item)">{{item}}</li>
                                        </ul>
                                    </div>
                                    <span></span>
                                    <div class="time-frame" @click.stop="clickClose7Fn ">
                                        <span>{{endTime2Show}}</span>
                                        <ul class="choose-type end-time time-style" v-show="endTime2 && time21Checked">
                                            <li v-for="item in timeList" @click="endTime2Fn(item)">{{item}}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="resource-others">
                                    <div class="vertical-center">
                                        <input type="radio" class="magic-radio" name="airport-b-res" id="alAairBWait" :checked="time22Checked" @click="pstTimeresourcesFn1"><label for="alAairBWait" class="input-label">待协调</label>
                                    </div>
                                    <div class="vertical-center">
                                        <input type="radio" class="magic-radio" name="airport-b-res" id="alAairBEnough" :checked="time23Checked" @click="pstTimeresourcesFn2"><label for="alAairBEnough" class="input-label">时刻充足</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="arrive item" v-show="second3Show">
                            <div class="sec-accept">
                                <div class="top">是否接受临近机场</div>
                                <div class="bottom">
                                    <div class="vertical-center">
                                        <input type="radio" class="magic-radio" name="airport-c" id="alAairCYes" :checked="accept31Checked" @change="arrvAcceptnearairportFn0"><label for="alAairCYes" class="input-label">是</label>
                                    </div>
                                    <div class="vertical-center">
                                        <input type="radio" class="magic-radio" name="airport-c" id="alAairCNo" :checked="accept32Checked" @change="arrvAcceptnearairportFn1"><label for="alAairCNo" class="input-label">否</label>
                                    </div>
                                </div>
                            </div>
                            <div class="sec-resource">
                                <div class="top">出港资源</div>
                                <div class="resource-time">
                                    <div class="vertical-center">
                                        <input type="radio" class="magic-radio" name="airport-c-res" id="alAairCResYes" :checked="time31Checked" @click="arrvTimeresourcesFn0"><label for="alAairCResYes" class="input-label">有</label>
                                    </div>
                                    <div class="time-frame"  @click.stop="clickClose8Fn ">
                                        <span>{{startTime3Show}}</span>
                                        <ul class="choose-type start-time time-style" v-show="startTime3 && time31Checked">
                                            <li v-for="item in timeList" @click="startTime3Fn(item)">{{item}}</li>
                                        </ul>
                                    </div>
                                    <span></span>
                                    <div class="time-frame" @click.stop="clickClose9Fn ">
                                        <span>{{endTime3Show}}</span>
                                        <ul class="choose-type end-time time-style" v-show="endTime3 && time31Checked">
                                            <li v-for="item in timeList" @click="endTime3Fn(item)">{{item}}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="resource-others">
                                    <div class="vertical-center">
                                        <input type="radio" class="magic-radio" name="airport-c-res" id="alAairCWait" :checked="time32Checked" @click="arrvTimeresourcesFn1"><label for="alAairCWait" class="input-label">待协调</label>
                                    </div>
                                    <div class="vertical-center">
                                        <input type="radio" class="magic-radio" name="airport-c-res" id="alAairCEnough" :checked="time33Checked" @click="arrvTimeresourcesFn2"><label for="alAairCEnough">时刻充足</label>
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
                            <div class="choose-time" @click.stop="clickClose10Fn ">
                                <div class="choose-time-icon">
                                    <span class="icon-item">&#xe607;</span>
                                </div>
                                <div style="flex-grow: 1; text-align: center;">{{myDate1}}</div>
                            </div>
                            <div class="warn" v-show="warn6Show" style="position: absolute;top: 26px; left: 0;">*拟开时间不能为空</div>
                            <div v-if="calendarShow1" class="calendar-box popup" @click.stop style="top: 26px; left: 0;">
                                <div class="selec-data">
                                    <input type="text" placeholder="开始时间" readonly v-model="calendarInitDay1"><span>-</span>
                                    <input type="text" placeholder="结束时间" readonly v-model="calendarInitDay2">
                                    <div class="confirm-btn btn" @click="getMyDate1">确定</div>
                                    <div class="cancel-btn btn" @click="calendarShow1=!calendarShow1">取消</div>
                                </div>
 				<calendarCP :initOpt="opt0" @changeRangeDate="getDateRange0"></calendarCP>

                            </div>
                        </div>
                        <div class="left item-child">
                            <span class="margin-right">拟开班期</span>　
                            <div class="choose-border" style="align-items: center; height: 24px;" @click.stop="clickClose11Fn ">
                                <span style="margin-left: 3px;">{{scheduleShow}}</span>
                                <div class="triangle-big"
                                     style="position: absolute; top: 50%; right: 14px; margin-top: -3.5px;"></div>
                                <ul class="choose-type want-type" v-show="schedule">
                                    <li v-for="item in scheduleList" @click="scheduleListFn(item)">{{item}}</li>
                                </ul>
                            </div>
                            <div class="warn" v-show="warn5Show" style="position: absolute;top: 26px; left: 0;">
                                *班期不能为空
                            </div>
                        </div>
                    </div>
                    <div class="third-b item">
                        <div class="right item-child">
                            <span class="margin-right">拟飞机型</span>　
                            <div class="choose-input">
                                <input class="input-mes" type="text" placeholder="输入选择机型"
                                       style="border: 0; line-height: 24px;" @click.stop="clickClose13Fn" readonly
                                       v-model="typeChoose">
                            </div>
                            <ul class="choose-type air-type" v-show="airTypeShow">
                                <li v-for="item in airType" @click="chooseAirType(item)">{{item}}</li>
                            </ul>
                            <div class="warn" v-show="warn4Show" style="position: absolute; top: 26px; left: 0;">
                                *机型不能为空
                            </div>
                        </div>
                        <div class="left item-child" style="position: relative;">
                            <span class="margin-right">座位数</span>　
                            <div class="choose-input" style="width: 180px;">
                                <input class="input-mes" type="text" placeholder="填写举例：180" v-model="seatingNum" maxlength="5"
                                       style="border: 0;"><span>人</span>
                            </div>
                            <div class="warn" v-show="warn13Show" style="position: absolute; top: 26px; left: 0;">*请输入数字！</div>
                        </div>
                    </div>
                    <div class="third-c item">
                        <div class="right item-child" style="position: relative;">
                            <span class="margin-right" style="white-space: nowrap">均班客量期望</span>
                            <div class="choose-input">
                                <input class="input-mes" type="text" placeholder="填写举例：80" v-model="avgguestExpect" maxlength="5"
                                       style="border: 0;width: 136px;"><span>人</span>
                            </div>
                            <div class="warn" v-show="warn14Show" style="position: absolute; top: 26px; left: 0;">*请输入数字！</div>
                        </div>
                        <div class="left item-child" style="position: relative;">
                            <span>客座率期望</span>　
                            <div class="choose-input">
                                <input class="input-mes" type="text" placeholder="填写举例：80" v-model="loadfactorsExpect" maxlength="5"
                                       style="border: 0;"><span>%</span>
                            </div>
                            <div class="warn" v-show="warn15Show" style="position: absolute; top: 26px; left: 0;">*请输入数字！</div>
                        </div>
                    </div>
                    <div class="third-d item" style="position: relative;">
                        <div class="right item-child" style="justify-content: flex-start;">
                            <span style="margin-right: 10px; width: 72px;">合作方式</span>　
                            <div style="display: flex; flex-direction: column;">
                                <div class="vertical-center" style="margin-bottom: 10px;">
                                    <div class="choose-border" style="align-items: center; width: 118px; height: 24px;" @click.stop="clickClose12Fn ">
                                        <span style="margin-left: 12px;">{{subsidyShow}}</span>
                                        <div class="triangle-big"
                                             style="position: absolute; top: 50%; right: 11px; margin-top: -3.5px;"></div>
                                        <ul class="choose-type want-subsidy" v-show="subsidy">
                                            <li v-for="item in subsidyList" @click="subsidyListFn(item)">{{item}}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="left item-child">
                            <div class="vertical-center">
                                <input type="checkbox" class="magic-radio" id="alAacceptDispatch" v-model="schedulingShow" @click="schedulingShowFn"/>
                                <label for="alAacceptDispatch" class="input-label" style="white-space: nowrap;">接受调度</label>
                            </div>
                            <div class="choose-input" v-show="schedulingShow" style="position: relative;">
                                <div class="little-label-wrapper"  v-show="directionPublicCityShow" ref="littleLabelWrapper" @click="labelWrapperClick">
                                    <span class="little-label" v-for="(item,index) in directionPublicCity">
                                        {{item.name}}
                                        <span class="little-label-close" @click.stop="littleLabelClose(index)">&#xe62c;</span>
                                    </span>
                                </div>
                                <span class="more-show" v-show="moreShow" @mouseover="littleListWrapperShow = true" @mouseout="littleListWrapperShow = false">
                                    <span class="dot">...</span>
                                    <div class="little-list-wrapper" v-show="littleListWrapperShow">
                                        <span class="little-label" v-for="(item,index) in directionPublicCity">
                                            {{item.name}}
                                            <span class="little-label-close" @click.stop="littleLabelClose(index)">&#xe62c;</span>
                                        </span>
                                    </div>
                                </span>
                                <input class="input-mes" type="text" placeholder="输入选择机场" v-model="fifthArea"
                                       @click.stop="clickClose14Fn" style="border: 0;">
                                <airportS class="aisx" v-on:resData="resData5" :searchText="fifthArea" v-show="isSearch5"
                                          style="top: 25px;left: -73px;"></airportS>
                            </div>
                        </div>
                        <div class="warn" v-show="warn12Show" style="position: absolute; bottom: 0; left: 0;">*请选择合作方式</div>
                    </div>
                    <div class="third-e item">
                        <div class="right item-child">
                            <span class="margin-right" style="white-space: nowrap">运力归属</span>
                            <div class="choose-input">
                                <input class="input-mes" type="text" placeholder="输入选择航司" v-model="airCompany"
                                       @click.stop="clickClose15Fn" readonly style="border: 0;width: 136px;">
                                <airCompanySearch class="aisx" v-on:resData="resData6" :searchText="airCompany" v-show="isSearch6"
                                          style="top: 25px; left: 0;"></airCompanySearch>
                            </div>
                            <div class="warn" v-show="warn10Show" style="position: absolute;top: 26px; left: 0;">*运力归属不能为空</div>
                        </div>
                        <div class="left item-child">
                            <span>运力基地</span>　
                            <div class="choose-input" style="position: relative;">
                                <input class="input-mes" type="text" placeholder="输入选择机场" v-model="fourArea"
                                       @click.stop="clickClose16Fn" readonly style="border: 0;">
                                <airportS class="aisx" v-on:resData="resData4" :searchText="fourArea" v-show="isSearch4"
                                          style="top:25px; left: -55px;"></airportS>
                            </div>
                            <div class="warn" v-show="warn11Show" style="position: absolute;top: 26px; left: 0;">*运力基地不能为空</div>
                        </div>
                    </div>
                    <div class="third-f item">
                        <div class="right item-child" style="position: relative;">
                            <span class="margin-right" style="white-space: nowrap">小时成本</span>
                            <div class="choose-input">
                                <input class="input-mes" type="text" placeholder="填写举例：10" v-model="hourConst" maxlength="5"
                                       style="border: 0;width: 136px;"><span style="white-space: nowrap">万元/小时</span>
                            </div>
                            <div class="warn" v-show="warn16Show" style="position: absolute; top: 26px; left: 0;">*请输入数字！</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fourth items bg-color">
                <div class="top item-child">
                    <span class="margin-right" style="flex-shrink: 0;">其他说明</span>　
                    <div class="choose-input" style="position: relative; border: none; height: auto;">
                        <textarea class="text-area" v-model="remarkMsg" maxlength="200" @keydown.enter.prevent></textarea>
                        <span class="background-line" style="top: 26px;"></span>
                        <span class="background-line" style="top: 52px;"></span>
                        <span class="background-line" style="top: 78px;"></span>
                        <span class="background-line" style="top: 104px;"></span>
                        <span class="background-line" style="top: 130px;"></span>
                        <span class="background-line" style="top: 156px;"></span>
                        <span style="position: absolute; bottom: 0px; right: 0;">{{num}}/200</span>
                    </div>
                </div>
            </div>
            <div class="sixth">
                <button class="btn-b" @click.stop="submitData">确认选定该意向</button>
                <button class="btn-w" @click="closeThis">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';
    import airAreaSearch from '$src/page/components/airAreaSearch.vue'
    import airportS from '$src/page/reuseComponents/airportSearch1.vue'
    import airCompanySearch from '$src/page/reuseComponents/airCompanySearch.vue'
    import calendar from '$src/page/components/calendar'
    import calendarCP from '$src/page/components/publicTools/calendar/calendarCP.vue'
    import singleElection from '$src/page/components/demandListComponents/singleElection.vue'

    export default {
        props: ['acceptData'],
        data() {
            return {
                warn1Show: false,  //联系人警告
                warn2Show: false,  //联系方式警告
                warn3Show: false,  //始发地警告
                warn4Show: false,  //机型警告
                warn5Show: false,  //班期警告
                warn6Show: false,  //拟开航时间警告
                warn7Show: false,  //需求有效期警告
                warn8Show: false,  //始发地为区域，经停、到达必须有一个为意向机场
                warn9Show: false,  // 始发地、经停地、到达地不能相同
                warn10Show: false,  //运力归属警告
                warn11Show: false,  //运力基地警告
                warn12Show: false,  //补贴政策警告
                warn13Show: false,  //座位数
                warn14Show: false,  //均班客量期望
                warn15Show: false,  //客座率期望
                warn16Show: false,  //小时成本

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
                secArea: '', //经停地 2的意向区域
                secAreaCode: '', //三字码（只有城市有）
                thirdArea: '', //到达地 3的意向区域
                firAreaBus: '', // 始发地-中转站
                secAreaBus: '', // 经停地-中转站
                thirdAreaBus: '', // 到达地-中转站
                thirdAreaCode: '', //三字码（只有城市有）
                fourArea: '', // 运力基地
                fifthArea: '', // 接受调度
                fifthAreaCode: '', //三字码（只有城市有）

                fourAreaCode: '', //三字码（只有城市有）

                dptState: 0,  //始发地类型（0：机场，1：区域）
                pstState: 0,
                arrvState: 0,

                areaInput1: '', //输入的机场或区域
                areaInput2: '', //输入的机场或区域
                areaInput3: '',
                typeChoose: '', //选中的机型
                airType: ['A320', 'A330', 'B737NG', 'E190/195', 'CRJ900', 'MA60', 'B787', 'B777', 'B767', 'E145', 'B757', 'B747', 'ARJ21'], //机型
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
                directionPublicCity: [],
                /*机场查询*/
                qyCode1: "", //始发点机场三字码
                qyCode2: "", //经停地机场三字码
                qyCode3: "", //到达地机场三字码
                qyCode4: "", //运力基地三字码
                qyCode5: '', //接受调度id
                searchText: '',
                isSearch1: false,//机场搜索是否显示
                isSearch2: false,
                isSearch3: false,
                isSearch4: false,
                isSearch5: false,
                isSearch6: false,
                isSearchCode1: -1, //选择区域或机场 0为意向区域，1为意向机场
                isSearchCode2: -1,
                isSearchCode3: -1,
                /****************/

                dptTimeresources: 1,//始发地时刻资源，(时刻资源三种状态0:有时刻（直接呈现时刻）dpt_time字段存放具体时刻值， 1:待协调， 2:时刻充足。)
                pstTimeresources: 1,//经停地时刻资源，(时刻资源三种状态0:有时刻（直接呈现时刻）dpt_time字段存放具体时刻值， 1:待协调， 2:时刻充足。)
                arrvTimeresources: 1,//到达地时刻资源，(时刻资源三种状态0:有时刻（直接呈现时刻）dpt_time字段存放具体时刻值， 1:待协调， 2:时刻充足。)
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
                space3Show: '请先选择到达点类型（选填）',
                publicwayStrCode: 0,//公开方式

                calendarInitDay1: '', //日历
                calendarInitDay2: '',
                calendarInitDay3: '',
                calendarInitDay4: '',
                myDate1: '选择起止时间',
                calendarShow1: false,
                calendarShow2: false,

                /*始发经停到达均默认选择意向机场*/
                space1ShowTitle: '意向机场',
                space2ShowTitle: '意向机场',
                space3ShowTitle: '意向机场',

                scheduleShow: '待定',
                subsidyShow: '选择合作方式',
                timeList: ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00'],
                spaceList: ['意向区域', '意向机场'],
                scheduleList: ['待定', '满排', '半排'],
                subsidyList: ['保底', '定补', '人头补','无补贴','其他'],
//                sendData: {},
                responseId: '',
                airCompany: '',//运力归属
                hourConst: '',             //小时成本
                airCompanyData: [], //航司内容
                airCompanyShow: false, //下拉列表是否显示
                airCompanyId: '',    //航司3字码
                scheduling: 1,     // 是否接受调度 0:接收,1:不接收
                schedulingShow: false,
                directionPublicCityShow: false, // 定向发布小标签那一行
                moreShow: false,        // 定向发布长度是否超出显示范围，省略号是否显示
                url: '',            // 数据接口
                alertMsg: '',
                littleListWrapperShow: false, // 多条显示
                qyCode5Arr: [],     // 存储接受调度的id的数组
                /*新增表单内容*/
                elect: {
                    set: false
                },
                subsidy1: false,  // 补贴政策单选按钮
                subsidy2: false,
                subsidy3: true,
                time11Checked: false,  // 出港资源单选按钮
                time12Checked: true,
                time13Checked: false,
                time21Checked: false,
                time22Checked: true,
                time23Checked: false,
                time31Checked: false,
                time32Checked: true,
                time33Checked: false,
                accept11Checked: false, // 是否接受临近机场
                accept12Checked: true,
                accept21Checked: false,
                accept22Checked: true,
                accept31Checked: false,
                accept32Checked: true,

                opt0: {     //拟开时间
                    start: '',
                    end: '',
                    isDis: false,
                },

            }
        },
        components: {
            airAreaSearch,
            airportS,
            calendar,
            airCompanySearch,
	    calendarCP,
        },
        watch: {
            seatingNum: function() {
                if(this.seatingNum == '' || this.seatingNum == null) {
                    this.warn13Show = false;
                }else {
                    let seatingNum = this.seatingNum.replace(/(^\s*)|(\s*$)/g,"");
                    if(/^[0-9]+\.?[0-9]{0,9}$/.test(seatingNum) || seatingNum == '') { // 输入必须为数字的判断
                        this.warn13Show = false;
                    }else {
                        this.warn13Show = true;
                    }
                }
            },
            avgguestExpect: function() {
                if(this.avgguestExpect == '' || this.avgguestExpect == null) {
                    this.warn14Show = false;
                }else{
                    let avgguestExpect = this.avgguestExpect.replace(/(^\s*)|(\s*$)/g,"");
                    if(/^[0-9]+\.?[0-9]{0,9}$/.test(avgguestExpect) || avgguestExpect == '') { // 输入必须为数字的判断
                        this.warn14Show = false;
                    }else {
                        this.warn14Show = true;
                        return
                    }
                }
            },
            loadfactorsExpect: function() {
                if(this.loadfactorsExpect == '' || this.loadfactorsExpect == null) {
                    this.warn15Show = false;
                }else {
                    let loadfactorsExpect = this.loadfactorsExpect.replace(/(^\s*)|(\s*$)/g,"");
                    if(/^[0-9]+\.?[0-9]{0,9}$/.test(loadfactorsExpect) || loadfactorsExpect == '') { // 输入必须为数字的判断
                        this.warn15Show = false;
                    }else {
                        this.warn15Show = true;
                        return
                    }
                }
            },
            hourConst: function() {
                if(this.hourConst == '' || this.hourConst == null) {
                    this.warn16Show = false;
                }else {
                    let hourConst = this.hourConst.replace(/(^\s*)|(\s*$)/g,"");
                    if (/^[0-9]+\.?[0-9]{0,9}$/.test(hourConst) || hourConst == '') { // 输入必须为数字的判断
                        this.warn16Show = false;
                    } else {
                        this.warn16Show = true;
                        return
                    }
                }
            },
            typeChoose: function () {
                this.warn4Show = false;
            },
            calendarInitDay1: function () {
                this.setOptFn0();
            },
            calendarInitDay2: function () {
                this.setOptFn0();
            },

        },
        computed: {
            num: function () { // 其他说明中已输入的字数
                return this.remarkMsg.length;
            },
            sendData: function () {
                let obj = {};
                obj = JSON.parse(JSON.stringify(this.acceptData));
                return obj;
            },
            ...vx.mapGetters([
                'role'
            ])
        },
        /*created() {
            this.sendData = this.acceptData;
        },*/
        mounted() {
            this.space1Fn();
            this.space2Fn();
            this.space3Fn();
            this.myDate2Fn();
            this.setOptFn0();
            this.acceptDataFn();
        },
        methods: {
            /*是否接受临近机场*/
            dptAcceptnearairportFn0: function () {
                this.dptAcceptnearairport = 0;
                this.accept11Checked = true;
                this.accept12Checked = false;
            },
            dptAcceptnearairportFn1: function () {
                this.dptAcceptnearairport = 1;
                this.accept11Checked = false;
                this.accept12Checked = true;
            },
            pstAcceptnearairportFn0: function () {
                this.pstAcceptnearairport = 0;
                this.accept21Checked = true;
                this.accept22Checked = false;
            },
            pstAcceptnearairportFn1: function () {
                this.pstAcceptnearairport = 1;
                this.accept21Checked = false;
                this.accept22Checked = true;
            },
            arrvAcceptnearairportFn0: function () {
                this.arrvAcceptnearairport = 0;
                this.accept31Checked = true;
                this.accept32Checked = false;
            },
            arrvAcceptnearairportFn1: function () {
                this.arrvAcceptnearairport = 1;
                this.accept31Checked = false;
                this.accept32Checked = true;
            },
            /*双日历*/
            getDateRange0: function (rd) {  // 拟开时间
                this.calendarInitDay1 = rd[0];
                this.calendarInitDay2 = rd[1];
            },
            setOptFn0: function () {
                this.opt0.start = this.calendarInitDay1;
                this.opt0.end = this.calendarInitDay2;
            },
            // 改变alert弹出样式
            open6(mes) {  // 成功弹出的提示
                this.$message({
                    message: mes,
                    type: 'success',
                    duration: 2000,
                });
            },
            open8(mes) {  // 错误弹出的提示
                this.$message({
                    message: mes,
                    type: 'error',
                    duration: 2000,
                });
            },
            // 从父组件接受数据,并绑定到表单上
            acceptDataFn: function () {
                /*单选按钮是否选定*/
                let alAairAYes = document.getElementById('alAairAYes');
                let alAairANo = document.getElementById('alAairANo');
                let alAairAResYes = document.getElementById('alAairAResYes');
                let alAairAWait = document.getElementById('alAairAWait');
                let alAairAEnough = document.getElementById('alAairAEnough');
                let alAairBYes = document.getElementById('alAairBYes');
                let alAairBNo = document.getElementById('alAairBNo');
                let alAairBResYes = document.getElementById('alAairBResYes');
                let alAairBWait = document.getElementById('alAairBWait');
                let alAairBEnough = document.getElementById('alAairBEnough');
                let alAairCYes = document.getElementById('alAairCYes');
                let alAairCNo = document.getElementById('alAairCNo');
                let alAairCResYes = document.getElementById('alAairCResYes');
                let alAairCWait = document.getElementById('alAairCWait');
                let alAairCEnough = document.getElementById('alAairCEnough');
                let alAsubsidyYes = document.getElementById('alAsubsidyYes');
                let alWsubsidyNo = document.getElementById('alWsubsidyNo');
                let alWsubsidyTalk = document.getElementById('alWsubsidyTalk');
                let alAacceptDispatch = document.getElementById('alAacceptDispatch');

                this.user = this.acceptData.contact;  // 联系人
                this.phoneNum = this.acceptData.ihome; // 联系方式
                this.myDate1 = this.acceptData.sailingtime; // 拟开时间
                this.calendarInitDay1 = this.acceptData.sailingtime.split('-')[0];
                this.calendarInitDay2 = this.acceptData.sailingtime.split('-')[1];
                this.scheduleShow = this.acceptData.days; // 拟开班期
                this.typeChoose = this.acceptData.aircrfttyp; // 拟开机型
                this.seatingNum = this.acceptData.seating; // 座位数
                this.avgguestExpect = this.acceptData.avgguestexpect; // 均班客量期望
                this.loadfactorsExpect = this.acceptData.loadfactorsexpect; // 客座率期望
                if(this.acceptData.capacityCompany != null){
                    this.airCompany = this.acceptData.capacityCompany.airlnCd; // 运力归属
                }
                this.hourConst = this.acceptData.hourscost; // 小时成本
                this.remarkMsg = this.acceptData.remark; // 其他说明
                // 判断始发类型（0：机场，1：区域）
                // 机场传三字码，区域和省份传汉字
                if(this.acceptData.dptState === "0") {
                    this.space1ShowTitle = this.spaceList[1];
                    this.space1Fn(this.spaceList[1]);
                    if(this.acceptData.dptNm != null) {
                        this.firArea = this.acceptData.dptNm;
                        this.firAreaBus = this.acceptData.dptNm;
                    }
                    this.qyCode1 = this.acceptData.dpt;
                    this.dptTimeresources = this.acceptData.dptTimeresources;
                    this.dptAcceptnearairport = this.acceptData.dptAcceptnearairport;
                    /*单选按钮：是否接受邻近机场 0:接收,1:不接收*/
                    if(this.acceptData.dptAcceptnearairport === "0") {
                        this.accept11Checked = true;
                        this.accept12Checked = false;
                    }else if(this.acceptData.dptAcceptnearairport === "1") {
                        this.accept11Checked = false;
                        this.accept12Checked = true;
                    }
                    /*单选按钮：时刻资源 0:有时刻（直接呈现时刻）dpt_time字段存放具体时刻值，
                        1:待协调，2:时刻充足。*/
                    if(this.acceptData.dptTimeresources === "0") {
                        this.time11Checked = true;
                        this.time12Checked = false;
                        this.time13Checked = false;
                        this.startTime1Show = this.acceptData.dptTime.split(',')[0];
                        this.endTime1Show = this.acceptData.dptTime.split(',')[1];
                    }else if(this.acceptData.dptTimeresources === "1") {
                        this.time11Checked = false;
                        this.time12Checked = true;
                        this.time13Checked = false;
                    }else if(this.acceptData.dptTimeresources === "2") {
                        this.time11Checked = false;
                        this.time12Checked = false;
                        this.time13Checked = true;
                    }
                }else if(this.acceptData.dptState === "1") {
                    this.space1ShowTitle = this.spaceList[0];
                    this.space1Fn(this.spaceList[0]);
                    this.firArea = this.acceptData.dpt;
                    this.firAreaBus = this.acceptData.dpt;
                }
                // 判断经停类型（0：机场，1：区域）
                if(this.acceptData.pstState === "0") {
                    this.space2ShowTitle = this.spaceList[1];
                    this.space2Fn(this.spaceList[1]);
                    if(this.acceptData.pstNm != null) {
                        this.secArea = this.acceptData.pstNm;
                        this.secAreaBus = this.acceptData.pstNm;
                    }
                    this.qyCode2 = this.acceptData.pst;
                    this.pstTimeresources = this.acceptData.pstTimeresources;
                    this.pstAcceptnearairport = this.acceptData.pstAcceptnearairport;
                    /*单选按钮：是否接受邻近机场 0:接收,1:不接收*/
                    if(this.acceptData.pstAcceptnearairport === "0") {
                        this.accept21Checked = true;
                        this.accept22Checked = false;
                    }else if(this.acceptData.pstAcceptnearairport === "1") {
                        this.accept21Checked = false;
                        this.accept22Checked = true;
                    }
                    /*单选按钮：时刻资源 0:有时刻（直接呈现时刻）dpt_time字段存放具体时刻值，
                        1:待协调，2:时刻充足。*/
                    if(this.acceptData.pstTimeresources === "0") {
                        this.time21Checked = true;
                        this.time22Checked = false;
                        this.time23Checked = false;
                        this.startTime2Show = this.acceptData.pstTime.split(',')[0];
                        this.endTime2Show = this.acceptData.pstTime.split(',')[1];
                    }else if(this.acceptData.pstTimeresources === "1") {
                        this.time21Checked = false;
                        this.time22Checked = true;
                        this.time23Checked = false;
                    }else if(this.acceptData.pstTimeresources === "2") {
                        this.time21Checked = false;
                        this.time22Checked = false;
                        this.time23Checked = true;
                    }
                }else if(this.acceptData.pstState === "1") {
                    this.space2ShowTitle = this.spaceList[0];
                    this.space2Fn(this.spaceList[0]);
                    this.secArea = this.acceptData.pst;
                    this.secAreaBus = this.acceptData.pst;
                }
                // 判断到达类型（0：机场，1：区域）
                if(this.acceptData.arrvState === "0") {
                    this.space3ShowTitle = this.spaceList[1];
                    this.space3Fn(this.spaceList[1]);
                    if(this.acceptData.arrvNm != null) {
                        this.thirdArea = this.acceptData.arrvNm;
                        this.thirdAreaBus = this.acceptData.arrvNm;
                    }
                    this.qyCode3 = this.acceptData.arrv;
                    this.arrvTimeresources = this.acceptData.arrvTimeresources;
                    this.arrvAcceptnearairport = this.acceptData.arrvAcceptnearairport;
                    /*单选按钮：是否接受邻近机场 0:接收,1:不接收*/
                    if(this.acceptData.arrvAcceptnearairport === "0") {
                        this.accept31Checked = true;
                        this.accept32Checked = false;
                    }else if(this.acceptData.arrvAcceptnearairport === "1") {
                        this.accept31Checked = false;
                        this.accept32Checked = true;
                    }
                    /*单选按钮：时刻资源 0:有时刻（直接呈现时刻）dpt_time字段存放具体时刻值，
                        1:待协调，2:时刻充足。*/
                    if(this.acceptData.arrvTimeresources === "0") {
                        this.time31Checked = true;
                        this.time32Checked = false;
                        this.time33Checked = false;
                        this.startTime3Show = this.acceptData.arrvTime.split(',')[0];
                        this.endTime3Show = this.acceptData.arrvTime.split(',')[1];
                    }else if(this.acceptData.arrvTimeresources === "1") {
                        this.time31Checked = false;
                        this.time32Checked = true;
                        this.time33Checked = false;
                    }else if(this.acceptData.arrvTimeresources === "2") {
                        this.time31Checked = false;
                        this.time32Checked = false;
                        this.time33Checked = true;
                    }
                }else if(this.acceptData.arrvState === "1") {
                    this.space3ShowTitle = this.spaceList[0];
                    this.space3Fn(this.spaceList[0]);
                    this.thirdArea = this.acceptData.arrv;
                    this.thirdAreaBus = this.acceptData.arrv;
                }
                // 是否接收调度(0:接收,1:不接收)，
                this.scheduling = this.acceptData.scheduling;
                if(this.scheduling === "0") {
                    alAacceptDispatch.checked = true;
                    this.schedulingShow = true;
                    if(this.acceptData.airportForSchedulines != null
                        && this.acceptData.airportForSchedulines.length != 0) {
                        this.directionPublicCity = [];
                        this.acceptData.airportForSchedulines.forEach((val) => {
                            this.directionPublicCity.push({
                                name: val.airlnCdName,
                                id: val.id
                            })
                        });
                        this.directionPublicCityShow = true;
                        this.$nextTick(() => {
                            this.moreShowFn();
                        })
                    }else {
                        this.directionPublicCity = [];
                    }
                    this.qyCode5 = this.acceptData.schedulineport;
                }else if(this.scheduling === "1") {
                    alAacceptDispatch.checked = false;
                    this.schedulingShow = false;
                }
                // 运力基地
                if(this.acceptData.capacityBaseNm != null) {
                    this.fourArea = this.acceptData.capacityBaseNm;
                }else {
                    this.fourArea = '';
                }
                this.qyCode4 = this.acceptData.capacityBase;
                // 补贴状态：有补贴（0:定补、1:保底、2:人头补、3:其他）4:待议5:无补贴
                this.subsidyCode = this.acceptData.subsidypolicy;
                this.subsidypolicyFn(this.acceptData.subsidypolicy);
            },
            // 将补贴类型从数字变成汉字
            subsidypolicyFn: function (index) {
                if(index === '0'){
                    this.subsidyShow = '定补';
                }else if(index === '1') {
                    this.subsidyShow = '保底';
                }else if(index === '2') {
                    this.subsidyShow = '人头补';
                }else if(index === '3') {
                    this.subsidyShow = '其他';
                }else if(index === '5') {
                    this.subsidyShow = '无补贴';
                }
            },
            warn4Fn: function () {
                this.warn4Show = false;
            },
            // 判断传值：始发、经停、到达
            sendStateMsgFn: function () {
                if(this.dptState == 0) {
                    this.sendData.dpt = this.qyCode1;//必填 机场传三字码，区域和省份传汉字
                }else if(this.dptState == 1) {
                    this.sendData.dpt = this.firArea;//必填 机场传三字码，区域和省份传汉字
                }
                if(this.secArea.replace(/(^\s*)|(\s*$)/g,"") != '') {
                    if(this.pstState == 0) {
                        this.sendData.pst = this.qyCode2;//选填 经停地，机场三字码
                    }else if(this.pstState == 1) {
                        this.sendData.pst = this.secArea;//选填 经停地
                    }
                }else {
                    this.sendData.pst = '';
                }
                if(this.thirdArea.replace(/(^\s*)|(\s*$)/g,"") != '') {
                    if(this.arrvState == 0) {
                        this.sendData.arrv = this.qyCode3;//选填 到达地，机场三字码
                    }else if(this.arrvState == 1) {
                        this.sendData.arrv = this.thirdArea;//选填 到达地
                    }
                }else {
                    this.sendData.arrv = '';
                }
            },
            // 数组去重
            uniqueFn: function (arr) {
                let newArr = [],
                    len = arr.length;
                for(let i = 0; i < len; i++) {
                    if(newArr.indexOf(arr[i]) != '-1') {
                        continue
                    }else {
                        newArr.push(arr[i]);
                    }
                }
                return newArr;
            },
            //发送数据
            submitData: function () {
                this.replaceAreaBus();
                let req = document.getElementById('airlineAffirm'); //控制滚动条的位置
                this.sendStateMsgFn();
                //表单验证（部分）
                if(this.user.replace(/(^\s*)|(\s*$)/g,"") == '') { // 联系人
                    this.warn1Show = true;
                    req.scrollTop = 0;
                    return
                }if(this.phoneNum == '' || this.phoneNum == null || this.warn2Show == true) { // 联系方式
                    this.warn2Show = true;
                    req.scrollTop = 0;
                    return
                }if(this.firArea.replace(/(^\s*)|(\s*$)/g,"") == '') { // 始发地
                    this.warn3Show = true;
                    req.scrollTop = 0;
                    return
                }if(this.dptState == 1) { //始发地类型（0：机场，1：区域）
                    if((this.pstState == 0 && this.sendData.pst != '')
                        || (this.arrvState == 0 && this.sendData.arrv != '')){ // 始发为区域时，经停或到达必须有一个为意向机场
                        this.warn8Show = false;
                    }else{
                        this.warn8Show = true;
                        req.scrollTop = 0;
                        return
                    }
                }if(this.sendData.pst != '' || this.sendData.arrv != '') { //始发、经停、到达不能相同
                    if(this.sendData.dpt == this.sendData.pst
                        || this.sendData.dpt == this.sendData.arrv
                        || this.sendData.pst == this.sendData.arrv) {
                        this.warn9Show = true;
                        req.scrollTop = 0;
                        return
                    }else {
                        this.warn9Show = false;
                    }
                }
                if(this.subsidyCode === '') {
                    this.warn12Show = true;
                    req.scrollTop = 550;
                    return
                }
                if(this.myDate1 == '选择起止时间') { // 拟开时间
                    this.warn6Show = true;
                    req.scrollTop = 150;
                    return
                }if(this.scheduleShow == '选择班期类型') { //班期
                    this.warn5Show = true;
                    req.scrollTop = 150;
                    return
                }if(this.airCompany.replace(/(^\s*)|(\s*$)/g,"") == '') {
                    this.warn10Show = true;
                    req.scrollTop = 550;
                    return
                }if(this.fourArea.replace(/(^\s*)|(\s*$)/g,"") == '') {
                    this.warn11Show = true;
                    req.scrollTop = 550;
                    return
                }
                /*数字验证*/
                if(this.seatingNum == '' || this.seatingNum == null) {
                    this.warn13Show = false;
                }else{
                    let seatingNum = this.seatingNum.replace(/(^\s*)|(\s*$)/g,"");
                    if(/^[0-9]+\.?[0-9]{0,9}$/.test(seatingNum) || seatingNum == '') { // 输入必须为数字的判断
                        this.warn13Show = false;
                    }else {
                        this.warn13Show = true;
                        req.scrollTop = 300;
                        return
                    }
                }
                if(this.avgguestExpect == '' || this.avgguestExpect == null) {
                    this.warn14Show = false;
                }else{
                    let avgguestExpect = this.avgguestExpect.replace(/(^\s*)|(\s*$)/g,"");
                    if(/^[0-9]+\.?[0-9]{0,9}$/.test(avgguestExpect) || avgguestExpect == '') { // 输入必须为数字的判断
                        this.warn14Show = false;
                    }else {
                        this.warn14Show = true;
                        req.scrollTop = 300;
                        return
                    }
                }
                if(this.loadfactorsExpect == '' || this.loadfactorsExpect == null) {
                    this.warn15Show = false;
                }else {
                    let loadfactorsExpect = this.loadfactorsExpect.replace(/(^\s*)|(\s*$)/g,"");
                    if(/^[0-9]+\.?[0-9]{0,9}$/.test(loadfactorsExpect) || loadfactorsExpect == '') { // 输入必须为数字的判断
                        this.warn15Show = false;
                    }else {
                        this.warn15Show = true;
                        req.scrollTop = 300;
                        return
                    }
                }
                if(this.hourConst == '' || this.hourConst == null) {
                    this.warn16Show = false;
                }else {
                    let hourConst = this.hourConst.replace(/(^\s*)|(\s*$)/g,"");
                    if(/^[0-9]+\.?[0-9]{0,9}$/.test(hourConst) || hourConst == '') { // 输入必须为数字的判断
                        this.warn16Show = false;
                    }else {
                        this.warn16Show = true;
                        req.scrollTop = 500;
                        return
                    }
                }
                delete this.sendData.airportForSchedulines;
                this.sendData.contact = this.user;  //必填 联系人
                this.sendData.ihome = this.phoneNum;//必填 联系方式
                this.sendData.dptState = this.dptState;         //始发地类型（0：机场，1：区域）
                this.sendData.dptAcceptnearairport = this.dptAcceptnearairport; //必填 始发地是否接收临近机场(0:接收,1:不接收)
                this.sendData.dptTimeresources = this.dptTimeresources;        //选填 始发地时刻资源(时刻资源三种状态0:有时刻（直接呈现时刻）dpt_time字段存放具体时刻值， 1:待协调， 2:时刻充足。)
                this.sendData.pstTimeresources = this.pstTimeresources;        //选填 经停地时刻资源(时刻资源三种状态0:有时刻（直接呈现时刻）dpt_time字段存放具体时刻值， 1:待协调， 2:时刻充足。)
                this.sendData.arrvTimeresources = this.arrvTimeresources;        //选填 到达地时刻资源(时刻资源三种状态0:有时刻（直接呈现时刻）dpt_time字段存放具体时刻值， 1:待协调， 2:时刻充足。)
                this.dptTime = this.startTime1Show + ',' + this.endTime1Show;
                this.pstTime = this.startTime2Show + ',' + this.endTime2Show;
                this.arrvTime = this.startTime3Show + ',' + this.endTime3Show;
                this.sendData.dptTime = this.dptTime;
                this.sendData.pstTime = this.pstTime;
                this.sendData.arrvTime = this.arrvTime;
                this.sendData.aircrfttyp = this.typeChoose;  //必填 机型
                this.sendData.days = this.scheduleShow;      //必填 班期
                this.sendData.subsidypolicy = this.subsidyCode;   //必填 补贴有种状态：有补贴（0:定补、1:保底、2:人头补）3:待议4:无补贴
                this.sendData.sailingtime = this.myDate1;      //必填 拟开行时间（起止时间）
                this.sendData.publicway = this.publicwayStrCode;   //必填 公开方式(0:对所有人公开,1:对认证用户公开,2:定向航司,3:定向机场), 3和4定位目标在下一个字段
                this.sendData.pstState = this.pstState;         //经停地类型（0：机场，1：区域）
                this.sendData.pstAcceptnearairport = this.pstAcceptnearairport; //选填 经停地是否接收临近机场(0:接收,1:不接受)
                this.sendData.arrvState = this.arrvState;         //到达地类型（0：机场，1：区域）
                this.sendData.arrvAcceptnearairport = this.arrvAcceptnearairport; //选填 到达地是否接收临近机场(0:接收,1:不接受)
                this.sendData.loadfactorsexpect = this.loadfactorsExpect; //选填 客座率期望
                this.sendData.avgguestexpect = this.avgguestExpect; // 选填 均班客座期望
                this.sendData.seating = this.seatingNum;            // 选填 座位数
                this.sendData.remark = this.remarkMsg;              // 选填 备注说明
                this.sendData.capacitycompany = this.airCompanyId;   //运力归属
                if(this.fourArea.replace(/(^\s*)|(\s*$)/g,"") == '') {
                    this.qyCode4 = '';
                }
                this.sendData.capacityBase = this.qyCode4;   //运力基地
                this.sendData.scheduling = this.scheduling;    // 接受调度（0:接收,1:不接收）
                if(this.directionPublicCity.length != 0){
                    this.directionPublicCity.forEach((val) => {
                        this.qyCode5Arr.push(val.id);
                    });
                    this.qyCode5 = this.uniqueFn(this.qyCode5Arr).join(',');
                }else {
                    this.qyCode5 = '';
                }
                this.sendData.schedulineport = this.qyCode5;   //接受调度三字码
                this.sendData.hourscost = this.hourConst;   //小时成本
                //stateNum: 1:selectedResponse(选定)，2:updateResponseSelective(已选定-编辑)
                if(this.acceptData.stateNum == 1){
                    this.url = "/selectedResponse";
                    this.sendData.releaseselected = 0;          //发布者是否已选定 0:表示选定,1:表示未选定
                    this.alertMsg = '成功选定该意向！';
                }else if(this.acceptData.stateNum == 2) {
                    this.url = "/updateResponseSelective";
                    this.sendData.releaseselected = this.acceptData.releaseselected;
                    this.alertMsg = '成功编辑该意向！';
                }
                let that = this;
                this.$ajax({
                    url: that.url, // 我有意向
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: this.sendData
                }).then((response) => {
                    if(response.data.opResult === '0'){
                        this.open6(this.alertMsg);
                        this.$emit('change-showCode');
                        this.closeThis();
                    }else{
                        this.open8(`错误代码：${response.data.opResult}`);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            closeThis: function () {
                this.$emit('close-this');
            },
	    // 设置发布有效期默认值（后延三个月）
            myDate2Fn: function () {
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
                this.calendarInitDay1 = this.calendarInitDay2 = year+"."+mon+"."+day;
            },
            replaceAreaBus: function () {
                // 始发、经停、到达中转站
                this.firArea = this.firAreaBus;
                if(this.secArea.replace(/(^\s*)|(\s*$)/g,"") != '') {
                    this.secArea = this.secAreaBus;
                }else {
                    this.secArea = '';
                    this.secAreaBus = '';
                    this.qyCode2 = '';
                }
                if(this.thirdArea.replace(/(^\s*)|(\s*$)/g,"") != '') {
                    this.thirdArea = this.thirdAreaBus;
                }else {
                    this.thirdArea = '';
                    this.thirdAreaBus = '';
                    this.qyCode3 = '';
                }
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
                this.airAreaSearchShow1 = false; // 区域搜索组件
                this.airAreaSearchShow2 = false;
                this.airAreaSearchShow3 = false;
                this.isSearch1 = false;          // 机场搜索组件
                this.isSearch2 = false;
                this.isSearch3 = false;
                this.isSearch4 = false;
                this.isSearch5 = false;
                this.isSearch6 = false;
                this.directionPublicCityShow = true;  //定向发布小标签那一行
                this.calendarShow1 = false;      //日历组件
                this.calendarShow2 = false;
                this.warn1Show = false;
//                this.warn2Show = false;
                this.warn3Show = false;
                this.warn4Show = false;
                this.warn5Show = false;
                this.warn6Show = false;
                this.warn7Show = false;
                this.warn8Show = false;
                this.warn9Show = false;
                this.warn10Show = false;
                this.warn11Show = false;
                this.warn12Show = false;
                this.warn13Show = false;
                this.warn14Show = false;
                this.warn15Show = false;
                this.warn16Show = false;
                this.replaceAreaBus();
            },
            closeAll1: function () {
                this.space1 = false;
                this.space2 = false;
                this.space3 = false;
                this.startTime1 = false;
                this.startTime2 = false;
                this.startTime3 = false;
                this.endTime1 = false;
                this.endTime2 = false;
                this.endTime3 = false;
                this.airTypeShow = false; //拟飞机型下拉
                this.airAreaSearchShow1 = false; // 区域搜索组件
                this.airAreaSearchShow2 = false;
                this.airAreaSearchShow3 = false;
                this.isSearch1 = false;          // 机场搜索组件
                this.isSearch2 = false;
                this.isSearch3 = false;
                this.isSearch4 = false;
                this.isSearch5 = false;
                this.isSearch6 = false;
                this.directionPublicCityShow = true;  //定向发布小标签那一行
                this.warn1Show = false;
                this.warn3Show = false;
                this.warn4Show = false;
                this.warn5Show = false;
                this.warn6Show = false;
                this.warn7Show = false;
                this.warn8Show = false;
                this.warn9Show = false;
                this.warn10Show = false;
                this.warn11Show = false;
                this.warn12Show = false;
                this.warn13Show = false;
                this.warn14Show = false;
                this.warn15Show = false;
                this.warn16Show = false;
            },
            clickClose1Fn: function () {
                this.space1 = !this.space1;
                this.space2 = false;
                this.space3 = false;
                this.calendarShow1 = false;
                this.schedule = false;
                this.subsidy = false;
                this.airTypeShow = false;
                this.isSearch5 = false;
                this.isSearch6 = false;
                this.isSearch4 = false;
                this.closeTimeFrameFn();
            },
            clickClose2Fn: function () {
                this.space2 = !this.space2;
                this.space1 = false;
                this.space3 = false;
                this.calendarShow1 = false;
                this.schedule = false;
                this.subsidy = false;
                this.airTypeShow = false;
                this.isSearch5 = false;
                this.isSearch6 = false;
                this.isSearch4 = false;
                this.closeTimeFrameFn();
            },
            clickClose3Fn: function () {
                this.space3 = !this.space3;
                this.space1 = false;
                this.space2 = false;
                this.calendarShow1 = false;
                this.schedule = false;
                this.subsidy = false;
                this.airTypeShow = false;
                this.isSearch5 = false;
                this.isSearch6 = false;
                this.isSearch4 = false;
                this.closeTimeFrameFn();
            },
            clickClose4Fn: function () {
                this.startTime1 = !this.startTime1;
                this.endTime1 = false;
                this.startTime2 = false;
                this.endTime2 = false;
                this.startTime3 = false;
                this.endTime3 = false;
                this.closeUnTimeFrameFn();
            },
            clickClose5Fn: function () {
                this.endTime1 = !this.endTime1;
                this.startTime1 = false;
                this.startTime2 = false;
                this.endTime2 = false;
                this.startTime3 = false;
                this.endTime3 = false;
                this.closeUnTimeFrameFn();
            },
            clickClose6Fn: function () {
                this.startTime2 = !this.startTime2;
                this.startTime1 = false;
                this.endTime1 = false;
                this.endTime2 = false;
                this.startTime3 = false;
                this.endTime3 = false;
                this.closeUnTimeFrameFn();
            },
            clickClose7Fn: function () {
                this.endTime2 = !this.endTime2;
                this.startTime1 = false;
                this.endTime1 = false;
                this.startTime2 = false;
                this.startTime3 = false;
                this.endTime3 = false;
                this.closeUnTimeFrameFn();
            },
            clickClose8Fn: function () {
                this.startTime3 = !this.startTime3;
                this.startTime1 = false;
                this.endTime1 = false;
                this.startTime2 = false;
                this.endTime2 = false;
                this.endTime3 = false;
                this.closeUnTimeFrameFn();
            },
            clickClose9Fn: function () {
                this.endTime3 = !this.endTime3;
                this.startTime1 = false;
                this.endTime1 = false;
                this.startTime2 = false;
                this.endTime2 = false;
                this.startTime3 = false;
                this.closeUnTimeFrameFn();
            },
            clickClose10Fn: function () {
                this.closeAll1();
                this.calendarShow1 = !this.calendarShow1;
                this.schedule = false;
                this.subsidy = false;
                this.calendarShow2 = false;
            },
            clickClose11Fn: function () {
                this.closeAll1();
                this.schedule = !this.schedule;
                this.calendarShow1 = false;
                this.subsidy = false;
                this.calendarShow2 = false;
            },
            clickClose12Fn: function () {
                this.closeAll1();
                this.subsidy = !this.subsidy;
                this.schedule = false;
                this.calendarShow1 = false;
                this.calendarShow2 = false;
            },
            clickClose13Fn: function () {
                this.airTypeShow = true;
                this.space1 = false;
                this.space2 = false;
                this.space3 = false;
                this.calendarShow1 = false;
                this.schedule = false;
                this.subsidy = false;
                this.isSearch5 = false;
                this.isSearch6 = false;
                this.isSearch4 = false;
                this.closeTimeFrameFn();
            },
            clickClose14Fn: function () {
                this.isSearch5 = true;
                this.space1 = false;
                this.space2 = false;
                this.space3 = false;
                this.calendarShow1 = false;
                this.schedule = false;
                this.subsidy = false;
                this.airTypeShow = false;
                this.isSearch6 = false;
                this.isSearch4 = false;
                this.closeTimeFrameFn();
            },
            clickClose15Fn: function () {
                this.isSearch6 = true;
                this.space1 = false;
                this.space2 = false;
                this.space3 = false;
                this.calendarShow1 = false;
                this.schedule = false;
                this.subsidy = false;
                this.airTypeShow = false;
                this.isSearch5 = false;
                this.isSearch4 = false;
                this.closeTimeFrameFn();
            },
            clickClose16Fn: function () {
                this.isSearch4 = true;
                this.space1 = false;
                this.space2 = false;
                this.space3 = false;
                this.calendarShow1 = false;
                this.schedule = false;
                this.subsidy = false;
                this.airTypeShow = false;
                this.isSearch5 = false;
                this.isSearch6 = false;
                this.closeTimeFrameFn();
            },
            closeTimeFrameFn: function () {
                this.startTime1 = false;
                this.endTime1 = false;
                this.startTime2 = false;
                this.endTime2 = false;
                this.startTime3 = false;
                this.endTime3 = false;
            },
            closeUnTimeFrameFn: function () {
                this.isSearch4 = false;
                this.space1 = false;
                this.space2 = false;
                this.space3 = false;
                this.calendarShow1 = false;
                this.schedule = false;
                this.subsidy = false;
                this.airTypeShow = false;
                this.isSearch5 = false;
                this.isSearch6 = false;
            },
            // 电话号码验证
            verifyPhon: function () {
                if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(this.phoneNum))) {
                    this.warn2Show = true;
                } else {
                    this.warn2Show = false;
                }
            },
            //区域选择，获取点击的区域
            getArea1: function (areaMes) {
                this.firAreaBus = areaMes.name;
                this.firArea = areaMes.name;
                this.firAreaCode = areaMes.code; //三字码（只有机场有）
                this.airAreaSearchShow1 = false;
                this.warn3Show = false;
            },
            getArea2: function (areaMes) {
                this.secAreaBus = areaMes.name;
                this.secArea = areaMes.name;
//                this.secArea = areaMes.name;
                this.secAreaCode = areaMes.code; //三字码（只有机场有）
                this.airAreaSearchShow2 = false;
            },
            getArea3: function (areaMes) {
                this.thirdAreaBus = areaMes.name;
                this.thirdArea = areaMes.name;
//                this.thirdArea = areaMes.name;
                this.thirdAreaCode = areaMes.code; //三字码（只有机场有）
                this.airAreaSearchShow3 = false;
            },
            //时刻资源
            dptTimeresourcesFn0: function () {
                this.dptTimeresources = 0;
                this.time11Checked = true;
                this.time12Checked = false;
                this.time13Checked = false;
            },
            dptTimeresourcesFn1: function () {
                this.dptTimeresources = 1;
                this.dptTime = '';
                this.time11Checked = false;
                this.time12Checked = true;
                this.time13Checked = false;
            },
            dptTimeresourcesFn2: function () {
                this.dptTimeresources = 2;
                this.dptTime = '';
                this.time11Checked = false;
                this.time12Checked = false;
                this.time13Checked = true;
            },
            pstTimeresourcesFn0: function () {
                this.pstTimeresources = 0;
                this.time21Checked = true;
                this.time22Checked = false;
                this.time23Checked = false;
            },
            pstTimeresourcesFn1: function () {
                this.pstTimeresources = 1;
                this.pstTime = '';
                this.time21Checked = false;
                this.time22Checked = true;
                this.time23Checked = false;
            },
            pstTimeresourcesFn2: function () {
                this.pstTimeresources = 2;
                this.pstTime = '';
                this.time21Checked = false;
                this.time22Checked = false;
                this.time23Checked = true;
            },
            arrvTimeresourcesFn0: function () {
                this.arrvTimeresources = 0;
                this.time31Checked = true;
                this.time32Checked = false;
                this.time33Checked = false;
            },
            arrvTimeresourcesFn1: function () {
                this.arrvTimeresources = 1;
                this.arrvTime = '';
                this.time31Checked = false;
                this.time32Checked = true;
                this.time33Checked = false;
            },
            arrvTimeresourcesFn2: function () {
                this.arrvTimeresources = 2;
                this.arrvTime = '';
		this.time31Checked = false;
                this.time32Checked = false;
                this.time33Checked = true;
            },
            // 选中拟飞机型
            chooseAirType: function (item) {
                this.typeChoose = item;
                this.airTypeShow = false;
            },
            // 意向机场/意向区域（0为区域 1为机场），input得到焦点
            airportFn1: function () {
                this.closeAll();
                if(this.isSearchCode1 == 1){
                    this.isSearch1 = true;
                    /*this.isSearch2 = false;
                    this.isSearch3 = false;*/
                }
                if (this.isSearchCode1 == 0) {
                    this.airAreaSearchShow1 = true;
                    /*this.airAreaSearchShow2 = false;
                    this.airAreaSearchShow3 = false;*/
                }
            },
            // 接受调度复选按钮点击（0:接收,1:不接收）
            schedulingShowFn: function () {
                this.schedulingShow = !this.schedulingShow;
                if(this.schedulingShow == true){
                    this.scheduling = 0;
                }else {
                    this.scheduling = 1;
                }
            },
            /***********↓↓↓↓↓↓↓接受调度↓↓↓↓**********************/
            // 接受调度复选按钮点击（0:接收,1:不接收）
            schedulingShowFn: function () {
                this.schedulingShow = !this.schedulingShow;
                if(this.schedulingShow == true){
                    this.scheduling = 0;
                }else {
                    this.scheduling = 1;
                }
            },
            // 点击删除小标签
            littleLabelClose: function (index) {
                this.directionPublicCity.splice(index,1);
                this.$nextTick(() => {
                    this.moreShowFn();
                })
            },
            labelWrapperClick: function () {
                this.$nextTick(() => {
                    this.isSearch5 = true;
                    this.directionPublicCityShow = false;
                });
            },
            moreShowFn: function () { // 判断省略号是否显示
//                console.info(this.$refs.littleLabelWrapper.offsetWidth);
                if(this.$refs.littleLabelWrapper.offsetWidth >= 148) {
                    this.moreShow = true;
                }else {
                    this.moreShow = false;
                }
            },
            /***********↑↑↑接受调度↑↑↑**********************/
            // 意向机场/意向区域，input失去焦点
            airportBlurFn1: function () {
                this.space1 = false;
            },
            airportFn2: function () {
                this.closeAll();
                if(this.isSearchCode2 == 1){
                    this.isSearch2 = true;
                }
                if(this.isSearchCode2 == 0){
                    this.airAreaSearchShow2 = true;
                }
            },
            airportBlurFn2: function () {
                this.space2 = false;
            },
            airportFn3: function () {
                this.closeAll();
                if(this.isSearchCode3 == 1){
                    this.isSearch3 = true;
                }
                if(this.isSearchCode3 == 0){
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
                this.firAreaBus = data.name;
                this.qyCode1 = data.code;
                this.warn3Show = false;
            },
            resData2: function (data) {
                this.isSearch2 = false;
                this.secArea = data.name;
                this.secAreaBus = data.name;
                this.qyCode2 = data.code;
                this.warn8Show = false;
                this.warn9Show = false;
                this.sendStateMsgFn();
                if(this.sendData.pst != '' || this.sendData.arrv != '') { //始发、经停、到达不能相同
                    if(this.sendData.dpt == this.sendData.pst
                        || this.sendData.dpt == this.sendData.arrv
                        || this.sendData.pst == this.sendData.arrv) {
                        this.warn9Show = true;
                    }else {
                        this.warn9Show = false;
                    }
                }
            },
            resData3: function (data) {
                this.isSearch3 = false;
                this.thirdArea = data.name;
                this.thirdAreaBus = data.name;
                this.qyCode3 = data.code;
                this.warn8Show = false;
                this.warn9Show = false;
                this.sendStateMsgFn();
                if(this.sendData.pst != '' || this.sendData.arrv != '') { //始发、经停、到达不能相同
                    if(this.sendData.dpt == this.sendData.pst
                        || this.sendData.dpt == this.sendData.arrv
                        || this.sendData.pst == this.sendData.arrv) {
                        this.warn9Show = true;
                    }else {
                        this.warn9Show = false;
                    }
                }
            },
            resData4: function (data) {
                this.isSearch4 = false;
                this.fourArea = data.name;
                this.qyCode4 = data.code;
            },
            resData5: function (data) {
                this.isSearch5 = false;
                this.fifthArea = '';
                this.directionPublicCityShow = true;
                if(this.directionPublicCity.length < 5) {
                    let len = this.directionPublicCity.length;
                    let flag = true;
                    for(let i = 0; i < len; i++) {
                        if(this.directionPublicCity[i].id === data.id) {
                            flag = false;
                        }
                    }
                    if (flag) {
                        this.directionPublicCity.push({
                            name: data.name,
                            id: data.id,
                        });
                    }
                }
                this.$nextTick(() => {
                    this.moreShowFn();
                })
            },
            resData6: function (data) {
                this.isSearch6 = false;
                this.airCompany = data.name;
                this.airCompanyId = data.id;
            },
            // 选择意向区域或意向机场 0为区域，1为机场
            space1Fn: function (item = '意向机场') {
                this.space1ShowTitle = item;
                this.firArea = '';
                this.firAreaBus = '';
                if (item == '意向区域') {
                    this.space1Show = '请输入意向区域';
                    this.isSearchCode1 = 0;
                    this.second1Show = false;
                    this.isSearch1 = false;
                    this.isSearch2 = false;
                    this.isSearch3 = false;
                    this.dptState = 1;
                }
                if (item == '意向机场') {
                    this.space1Show = '请输入意向机场';
                    this.secondShow = true;
                    this.second1Show = true;
                    this.dptTime = this.startTime1Show + ',' + this.endTime1Show; //时刻资源
                    this.isSearchCode1 = 1;
                    this.airAreaSearchShow1 = false;
                    this.airAreaSearchShow2 = false;
                    this.airAreaSearchShow3 = false;
                    this.dptState = 0;
                }
                if (this.second1Show == false && this.second2Show == false && this.second3Show == false) {
                    this.secondShow = false;
                }
            },
            space2Fn: function (item = '意向机场') {
                this.space2ShowTitle = item;
                this.secArea = '';
                if (item == '意向区域') {
                    this.space2Show = '请输入意向区域（选填）';
                    this.isSearchCode2 = 0;
                    this.second2Show = false;
                    this.isSearch1 = false;
                    this.isSearch2 = false;
                    this.isSearch3 = false;
                    this.pstState = 1;
                }
                if (item == '意向机场') {
                    this.space2Show = '请输入意向机场（选填）';
                    this.secondShow = true;
                    this.second2Show = true;
                    this.isSearchCode2 = 1;
                    this.airAreaSearchShow1 = false;
                    this.airAreaSearchShow2 = false;
                    this.airAreaSearchShow3 = false;
                    this.pstState = 0;
                }
                if (this.second1Show == false && this.second2Show == false && this.second3Show == false) {
                    this.secondShow = false;
                }
            },
            space3Fn: function (item = '意向机场') {
                this.space3ShowTitle = item;
                this.thirdArea = '';
                if (item == '意向区域') {
                    this.space3Show = '请输入意向区域（选填）';
                    this.isSearchCode3 = 0;
                    this.second3Show = false;
                    this.isSearch1 = false;
                    this.isSearch2 = false;
                    this.isSearch3 = false;
                    this.arrvState = 1;
                }
                if (item == '意向机场') {
                    this.space3Show = '请输入意向机场（选填）';
                    this.secondShow = true;
                    this.second3Show = true;
                    this.isSearchCode3 = 1;
                    this.airAreaSearchShow1 = false;
                    this.airAreaSearchShow2 = false;
                    this.airAreaSearchShow3 = false;
                    this.arrvState = 0;
                }
                if (this.second1Show == false && this.second2Show == false && this.second3Show == false) {
                    this.secondShow = false;
                }
            },
            scheduleListFn: function (item) {
                this.scheduleShow = item;
                this.warn5Show = false;
            },
            // 日历
            getDate1: function (d) {//获取组件返回的日期
                this.calendarInitDay1 = d;
            },
            getDate2: function (d) {
                this.calendarInitDay2 = d;
            },
            getMyDate1: function () {//获取起始的日期
                if (this.calendarInitDay1 && this.calendarInitDay2) {
                    this.myDate1 = this.calendarInitDay1 + "-" + this.calendarInitDay2;
                    this.calendarShow1 = false;
                    this.warn6Show = false;
                } else {}
            },
            getDate3: function (d) {
                this.calendarInitDay3 = d;
            },
            getDate4: function (d) {
                this.calendarInitDay4 = d;
            },
            //补贴点击，改变补贴码
            subsidyListFn: function (item) {
                this.subsidyShow = item;
                if(item == '定补'){
                    this.subsidyCode = 0;
                }if(item == '保底'){
                    this.subsidyCode = 1;
                }if(item == '人头补'){
                    this.subsidyCode = 2;
                }if(item == '其他'){
                    this.subsidyCode = 3;
                }if(item == '无补贴'){
                    this.subsidyCode = 5;
                }
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
    $border-color: rgba(96, 94, 124, 0.37);
    /*其他说明*/
    .text-area {
        width: 475px;
        height: 162px;
        font-size: 12px;
        line-height: 26px;
        color: #605E7C;
        background: transparent;
        outline: none;
        border: none;
        resize: none;
    }
    .background-line {
        position: absolute;
        left: 0;
        width: 475px;
        height: 1px;
        background: $border-color;
    }


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
        height: 25px;
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

    /*.btn-blue {
        border: 0;
        border-radius: 20px;
        background: $icon-color;
        color: white;
        font-size: 1.5rem;
        box-shadow: -1px 2px 6px $icon-color;
        &:hover {
            opacity: 0.7;
        }
    }*/

    /*.btn-cancel {
        font-size: 1.5rem;
        border: 1px solid $font-color;
        border-radius: 20px;
        background: transparent;
    }*/

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
        line-height: 19px;
        border: 0;
        color: $font-color;
        border-bottom: 1px solid $border-color;
    }

    /*横线上的小标签*/
    .little-label-wrapper {
        position: absolute;
        top: 0;
        display: flex;
        max-width: 148px;
        overflow: hidden;
        z-index: 3;
    }
    .little-list-wrapper {
        position: absolute;
        top: 25px;
        left: -260px;
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        width: 290px;
        background: white;
        border-radius: 4px;
        box-shadow: 0 2px 11px $border-color;
        z-index: 3;
        .little-label {
            margin: 0 3px 3px 0;
        }
    }
    .little-label{
        display: flex;
        align-items: center;
        padding: 0 5px 0 10px;
        line-height: 23px;
        border-radius: 20px;
        color: $icon-color;
        background: #F5F5F5;
        white-space: nowrap;
        font-weight: bold;
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
    .more-show {
        position: absolute;
        top: 0px;
        right: -7px;
        width: 25px;
        height: 25px;
        color: $icon-color;
        background: white;
        cursor: pointer;
        z-index: 10;
    }
    .dot {
        position: absolute;
        top: -3px;
        right: 5px;
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
        &::before {
            padding-right: 5px;
            font-family: iconfont;
            font-size: 1.7rem;
            color: $font-color;
            content: '\e61c';
            border-radius: 50%;
        }
    }
    .magic-radio:checked + label {
        &::before {
            content: '\e622';
            color: $icon-color;
        }
    }
    /****************************/

    /*日历样式*/
    #search {
        padding-top: 100px;
    }

    .left-side-box {
        width: 400px;
        height: 400px;
        margin: 0 auto;
    }

    .calendar-box {
        position: absolute;
        width: 540px;
        height: 270px;
        padding: 20px 10px 10px 10px;
        z-index: 10;
    }

    .calendar-box .selec-data {
        height: 30px;
        font-size: 12px;
        margin-bottom: 20px;
        position: relative;
    }

    .calendar-box .selec-data input {
        height: 100%;
        width: 75px;
        font-size: 12px;
        padding-left: 15px;
        border: 0;
        outline: none;
        border-bottom: 1px solid rgba(151, 151, 151, 0.3);
    }

    .calendar-box .selec-data span {
        display: inline-block;
        width: 30px;
        text-align: center;
    }

    .selec-data .btn {
        position: absolute;
        top: 0;
        height: 30px;
        line-height: 30px;
        border-radius: 100px;
        text-align: center;
        cursor: pointer;
    }

    .selec-data .confirm-btn {
        right: 0;
        width: 60px;
        color: #ffffff;
        background-color: #3c78ff;
    }

    .selec-data .cancel-btn {
        width: 50px;
        color: rgba(96, 94, 124, .6);
        box-sizing: border-box;
        border: 1px solid rgba(96, 94, 124, .6);
        right: 64px;
    }

    .popup {
        border-radius: 4px;
        opacity: 1;
        background-color: white;
        box-shadow: 0 5px 11px rgba(85, 85, 85, .37);
    }

    /*********/
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
        z-index: 17;
    }

    .container {
        /*position: absolute;
        top: 100px;
        right: 100px;*/
        padding: 20px 20px 0 20px;
        width: 580px;
        height: 590px;
        overflow-y: scroll;
        overflow-x: visible;
        border-radius: 4px;
        box-shadow: 0 2px 11px rgba(85, 85, 85, 0.1);
        background: white;
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

    .container-top {
        position: relative;
        margin: 10px 0 30px 20px;
        .title {
            width: 140px;
            height: 20px;
            line-height: 20px;
            font-size: 16px;
        }
        .close-icon {
            position: absolute;
            top: -2px;
            right: 0;
            /*display: flex;
            align-items: center;
            justify-content: center;*/
            width: 22px;
            height: 22px;
            line-height: 22px;
            text-align: center;
            box-sizing:border-box;
            color:#3C78FF;
            border: 1px solid #ededed;
            border-radius: 100%;
            cursor: pointer;
        }
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
        top: 20px;
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
            > span {
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
            padding: 27px 0 17px 0;
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
            /*height: 62px;*/
            .right {
                align-items: flex-start;
                .want-subsidy {
                    top: 25px;
                    left: -1px;
                    width: 120px;
                }
            }
        }
        .third-e {
            padding: 17px 0;
            .air-company {
                top: 26px;
                left: 0px;
                width: 260px;
                max-height: 210px;
                overflow-y: scroll;
            }
            .air-company::-webkit-scrollbar {
                width: 7px;
            }
            .air-company::-webkit-scrollbar-thumb {
                height: 56px;
                background: #D8D8D8;
                border-radius: 4px;
            }
        }
        .third-f {
            padding: 17px 0 27px 0;
        }
    }

    .fourth {
        display: flex;
        flex-direction: column;
        padding: 0 20px;
        margin-bottom: 10px;
        .item-child {
            display: flex;
            flex-grow: 1;
            line-height: 26px;
        }
        .top {
            padding: 27px 0;
        }
        .bottom {
            position: relative;
            align-items: center;
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
        padding-top: 20px;
        border-top: 1px solid $border-color;
        button {
            padding: 9px 0;
            outline: none;
            font-size: 1.5rem;
            line-height: 20px;
            cursor: pointer;
        }
        .btn-b {
            margin-left: 120px;
            margin-right: 20px;
            width: 200px;
            color: white;
            border-radius: 20px;
            border: 0;
            outline: none;
            &:hover {
                background: rgba(60, 120, 255, 0.7);
            }
            &:active {
                background: #336bea;
            }
        }
        .btn-w {
            width: 100px;
            border-radius: 20px;
            border: 0;
            outline: none;
        }
    }
</style>
