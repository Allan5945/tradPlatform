<template>
    <div class="wrapper">
        <div class="container" id="airlineReq" @click="closeAll">
            <div class="container-top">
                <span class="title">请填写完整方案</span>
                <span class="close-icon iconfont" @click="closeThis">&#xe62c</span>
            </div>
            <div class="simplify-msg">
                <div class="check-box">
                    <singleElection :single.sync="elect" class="checkbox-choose"></singleElection>
                    <span @click="checkboxClickFn" style="cursor:pointer;">展开填写完整需求订单</span>
                </div>
                <div v-show="!elect.set">
                    <div class="s-first first">
                        <div class="warn" v-show="warn8Show" style="position: absolute; left: 20px; bottom: 0;">*始发地为意向区域时，经停地或到达地必须有一个为意向机场！</div>
                        <div class="warn" v-show="warn9Show" style="position: absolute; left: 20px; bottom: 0;">*始发地、经停地、到达地不能相同！</div>
                        <span style="height: 20px; width: 70px; line-height: 18px; white-space: nowrap;">
                            <span class="warn">* </span>意向航线
                        </span>
                        <div class="start item">
                            <div class="bottom">
                                <input type="text" class="input-mes-a" :placeholder="space1Show" v-model="firArea" @click.stop="airportFn1" @focus="airportFn1">
                                <airportS class="aisx" v-on:resData="resData1" :searchText="firArea" v-show="isSearch1"></airportS>
                            </div>
                            <div class="warn" v-show="warn3Show">*始发地不能为空</div>
                        </div>
                        <div style="display: flex;flex-direction: column; justify-content: flex-end;">
                            <span class="icon-item">&#xe672;</span>
                            <span v-show="warn3Show" style="height: 20px">　</span>
                        </div>
                        <div class="pass item">
                            <div class="bottom">
                                <input class="input-mes-a" type="text" :placeholder="space2Show" v-model="secArea" @click.stop="airportFn2" @focus="airportFn2" >
                                <airportS class="aisx" v-on:resData="resData2" :searchText="secArea" v-show="isSearch2"></airportS>
                            </div>
                        </div>
                        <div style="display: flex;flex-direction: column; justify-content: flex-end;">
                            <span class="icon-item">&#xe672;</span>
                            <span v-show="warn3Show" style="height: 20px">　</span>
                        </div>
                        <div class="arrive item">
                            <div class="bottom">
                                <input class="input-mes-a" type="text" :placeholder="space3Show" v-model="thirdArea" @click.stop="airportFn3" @focus="airportFn3">
                                <airportS class="aisx" style="left: -80px;" v-on:resData="resData3" :searchText="thirdArea" v-show="isSearch3"></airportS>
                            </div>
                        </div>
                    </div>
                    <div class="s-second third items">
                        <div class="third-d item" style="position: relative;">
                            <div class="right item-child" style="width: 100%;">
                                <span style="height: 26px; width: 70px; line-height: 26px; white-space: nowrap;">
                                    <span class="warn">* </span>合作方式
                                </span>　
                                <div style="display: flex;">
                                    <div class="vertical-center input-label">
                                        <div class="choose-border" style="align-items: center; width: 118px;" @click.stop="clickClose12Fn ">
                                            <span style="margin-left: 12px;">{{subsidyShow}}</span>
                                            <div class="triangle-big" style="position: absolute; top: 50%; right: 11px; margin-top: -3.5px;"></div>
                                            <ul class="choose-type want-subsidy" v-show="subsidy">
                                                <li v-for="item in subsidyList" @click="subsidyListFn(item)">{{item}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="warn" v-show="warn12Show" style="position: absolute; bottom: 0; left: 0;">*请选择合作方式</div>
                        </div>
                    </div>
                    <div class="s-third third items" style="margin-bottom: 50px;">
                        <div class="third-a item">
                            <div class="right item-child" style="width: 240px;">
                            <span style="height: 26px; width: 70px; line-height: 26px; white-space: nowrap;">
                                <span class="warn">* </span>拟开时间
                            </span>
                                <div class="choose-time" @click.stop="clickClose10Fn " >
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
                                        <div class="cancel-btn btn" @click="calendarShow1Fn">取消</div>
                                    </div>
				                    <calendarCP :initOpt="opt0" @changeRangeDate="getDateRange0"></calendarCP>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-show="nullShow" style="height: 300px;"></div>
                </div>
            </div>
            <!--<transition name="slidey-fade">-->
            <div v-show="elect.set">
                <div class="bg-color must">
                    <div class="right item-child">
                        <div style="display: flex;">
                            <span>联系人<span class="warn"> *</span>　</span>
                            <input class="input-mes" type="text" placeholder="请填写有效联系人" v-model="user" maxlength="20" @keyup="warn1Show=false">
                        </div>
                        <div class="warn" v-show="warn1Show">*请填写联系人</div>
                    </div>
                    <div class="left item-child">
                        <div style="display: flex;">
                            <span>联系方式<span class="warn"> *</span>　</span>
                            <input class="input-mes" type="text" placeholder="请填写有效联系方式" @blur="verifyPhon" v-model="phoneNum">
                        </div>
                        <div class="warn" v-show="warn2Show">*电话格式有误，请重新输入</div>
                    </div>
                </div>
                <div class="choose">
                    <div class="items bg-color" style="position: relative; padding-bottom: 20px;">
                        <div class="warn" v-show="warn8Show" style="position: absolute; left: 20px; bottom: 7px;">*始发地为意向区域时，经停地或到达地必须有一个为意向机场！</div>
                        <div class="warn" v-show="warn9Show" style="position: absolute; left: 20px; bottom: 7px;">*始发地、经停地、到达地不能相同！</div>
                        <div class="first">
                            <airAreaSearch class="airAreaSearch" v-show="airAreaSearchShow1" @li-click="getArea1" style="left: 0;"></airAreaSearch>
                            <airAreaSearch class="airAreaSearch" v-show="airAreaSearchShow2" @li-click="getArea2" style="left: 71px;"></airAreaSearch>
                            <airAreaSearch class="airAreaSearch" v-show="airAreaSearchShow3" @li-click="getArea3" style="right: 0;"></airAreaSearch>
                            <div class="start item">
                                <div class="top" @click.stop="clickClose1Fn">
                                    <span>{{space1ShowTitle}}</span>&nbsp;
                                    <div class="triangle-little"></div>
                                    <ul class="choose-type want-space" v-show="space1">
                                        <li v-for="item in spaceList" @click="space1Fn(item)">{{item}}</li>
                                    </ul>
                                </div>
                                <div class="bottom">
                                    <input type="text" class="input-mes-a" :placeholder="space1Show" v-model="firArea" @click.stop="airportFn1" @focus="airportFn1">
                                    <airportS class="aisx" v-on:resData="resData1" :searchText="firArea" v-show="isSearch1"></airportS>
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
                                    <input class="input-mes-a" type="text" :placeholder="space2Show" v-model="secArea" @click.stop="airportFn2" @focus="airportFn2" >
                                    <airportS class="aisx" v-on:resData="resData2" :searchText="secArea" v-show="isSearch2"></airportS>
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
                                    <input class="input-mes-a" type="text" :placeholder="space3Show" v-model="thirdArea" @click.stop="airportFn3" @focus="airportFn3">
                                    <airportS class="aisx" style="left: -63px;" v-on:resData="resData3" :searchText="thirdArea" v-show="isSearch3"></airportS>
                                </div>
                            </div>
                        </div>
                        <div class="second" v-show="secondShow">
                            <div class="start item" v-show="second1Show">
                                <div class="sec-accept">
                                    <div class="top">是否接受临近机场</div>
                                    <div class="bottom">
                                        <div class="vertical-center">
                                            <input type="radio" class="magic-radio" name="airport-a" id="alRWairAYes" :checked="accept11Checked" @change="dptAcceptnearairportFn0"><label for="alRWairAYes" class="input-label">是</label>
                                        </div>
                                        <div class="vertical-center">
                                            <input type="radio" class="magic-radio" name="airport-a" id="alRWairANo" :checked="accept12Checked" @change="dptAcceptnearairportFn1" autocomplete="off"><label for="alRWairANo" class="input-label">否</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="sec-resource">
                                    <div class="top">出港资源</div>
                                    <div class="resource-time">
                                        <div class="vertical-center">
                                            <input type="radio" class="magic-radio" name="airport-a-res" id="alRWairAResYes" :checked="time11Checked" @click="dptTimeresourcesFn0"><label for="alRWairAResYes" class="input-label">有</label>
                                        </div>
                                        <div class="time-frame" @click.stop="clickClose4Fn">
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
                                            <input type="radio" class="magic-radio" name="airport-a-res" id="alRWairAWait" :checked="time12Checked" @click="dptTimeresourcesFn1"><label for="alRWairAWait" class="input-label">待协调</label>
                                        </div>
                                        <div class="vertical-center">
                                            <input type="radio" class="magic-radio" name="airport-a-res" id="alRWairAEnough" :checked="time13Checked" @click="dptTimeresourcesFn2"><label for="alRWairAEnough" class="input-label">时刻充足</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="pass item" v-show="second2Show">
                                <div class="sec-accept">
                                    <div class="top">是否接受临近机场</div>
                                    <div class="bottom">
                                        <div class="vertical-center">
                                            <input type="radio" class="magic-radio" name="airport-b" id="alRWairBYes" :checked="accept21Checked" @change="pstAcceptnearairportFn0"><label for="alRWairBYes" class="input-label">是</label>
                                        </div>
                                        <div class="vertical-center">
                                            <input type="radio" class="magic-radio" name="airport-b" id="alRWairBNo" :checked="accept22Checked" @change="pstAcceptnearairportFn1"><label for="alRWairBNo" class="input-label">否</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="sec-resource">
                                    <div class="top">出港资源</div>
                                    <div class="resource-time">
                                        <div class="vertical-center">
                                            <input type="radio" class="magic-radio" name="airport-b-res" id="alRWairBResYes" :checked="time21Checked" @click="pstTimeresourcesFn0"><label for="alRWairBResYes" class="input-label">有</label>
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
                                            <input type="radio" class="magic-radio" name="airport-b-res" id="alRWairBWait" :checked="time22Checked" @click="pstTimeresourcesFn1"><label for="alRWairBWait" class="input-label">待协调</label>
                                        </div>
                                        <div class="vertical-center">
                                            <input type="radio" class="magic-radio" name="airport-b-res" id="alRWairBEnough" :checked="time23Checked" @click="pstTimeresourcesFn2"><label for="alRWairBEnough" class="input-label">时刻充足</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="arrive item" v-show="second3Show">
                                <div class="sec-accept">
                                    <div class="top">是否接受临近机场</div>
                                    <div class="bottom">
                                        <div class="vertical-center">
                                            <input type="radio" class="magic-radio" name="airport-c" id="alRWairCYes" :checked="accept31Checked" @change="arrvAcceptnearairportFn0"><label for="alRWairCYes" class="input-label">是</label>
                                        </div>
                                        <div class="vertical-center">
                                            <input type="radio" class="magic-radio" name="airport-c" id="alRWairCNo" :checked="accept32Checked" @change="arrvAcceptnearairportFn1"><label for="alRWairCNo" class="input-label">否</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="sec-resource">
                                    <div class="top">出港资源</div>
                                    <div class="resource-time">
                                        <div class="vertical-center">
                                            <input type="radio" class="magic-radio" name="airport-c-res" id="alRWairCResYes" :checked="time31Checked" @click="arrvTimeresourcesFn0"><label for="alRWairCResYes" class="input-label">有</label>
                                        </div>
                                        <div class="time-frame" @click.stop="clickClose8Fn ">
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
                                            <input type="radio" class="magic-radio" name="airport-c-res" id="alRWairCWait" :checked="time32Checked" @click="arrvTimeresourcesFn1"><label for="alRWairCWait" class="input-label">待协调</label>
                                        </div>
                                        <div class="vertical-center">
                                            <input type="radio" class="magic-radio" name="airport-c-res" id="alRWairCEnough" :checked="time33Checked" @click="arrvTimeresourcesFn2"><label for="alRWairCEnough">时刻充足</label>
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
                                <div class="choose-time" @click.stop="clickClose10Fn " >
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
                                        <div class="cancel-btn btn" @click="calendarShow1Fn">取消</div>
                                    </div>
                                    <calendarCP :initOpt="opt0" @changeRangeDate="getDateRange0"></calendarCP>
                                </div>
                            </div>
                            <div class="left item-child">
                                <span class="margin-right">拟开班期</span>　
                                <div class="choose-border" style="align-items: center; height: 24px;" @click.stop="clickClose11Fn ">
                                    <span style="margin-left: 3px;height: 24px;">{{scheduleShow}}</span>
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
                                    <input class="input-mes" type="text" readonly placeholder="输入选择机型" style="border: 0; line-height: 24px;" @click.stop="getAirType" v-model="typeChoose">
                                </div>
                                <ul class="choose-type air-type" v-show="airTypeShow">
                                    <li v-for="item in airType" @click="chooseAirType(item)">{{item}}</li>
                                </ul>
                                <div class="warn" v-show="warn4Show" style="position: absolute; top: 26px; left: 0;">*机型不能为空</div>
                            </div>
                            <div class="left item-child" style="position:relative;">
                                <span class="margin-right">座位数</span>　
                                <div class="choose-input" style="width: 180px;">
                                    <input class="input-mes" type="text" placeholder="填写举例：180" v-model="seatingNum" maxlength="5" style="border: 0;"><span>人</span>
                                </div>
                                <div class="warn" v-show="warn13Show" style="position: absolute; top: 26px; left: 0;">*请输入数字！</div>
                            </div>
                        </div>
                        <div class="third-c item">
                            <div class="right item-child" style="position:relative;">
                                <span class="margin-right" style="white-space: nowrap">均班客量期望</span>
                                <div class="choose-input">
                                    <input class="input-mes" type="text" placeholder="填写举例：80" v-model="avgguestExpect" maxlength="5" style="border: 0;width: 136px;"><span>人</span>
                                </div>
                                <div class="warn" v-show="warn14Show" style="position: absolute; top: 26px; left: 0;">*请输入数字！</div>
                            </div>
                            <div class="left item-child" style="position: relative;">
                                <span>客座率期望</span>　
                                <div class="choose-input">
                                    <input class="input-mes" type="text" placeholder="填写举例：80" v-model="loadfactorsExpect" maxlength="5" style="border: 0;"><span>%</span>
                                </div>
                                <div class="warn" v-show="warn15Show" style="position: absolute; top: 26px; left: 0;">*请输入数字！</div>
                            </div>
                        </div>
                        <div class="third-d item" style="position: relative;">
                            <div class="right item-child" style="justify-content: flex-start;">
                                <span style="margin-right: 10px; width: 72px;">合作方式</span>
                                    <div class="vertical-center" style="margin-bottom: 10px;">
                                        <div class="choose-border" style="align-items: center; width: 118px; height: 24px;" @click.stop="clickClose12Fn ">
                                            <span style="margin-left: 12px;">{{subsidyShow}}</span>
                                            <div class="triangle-big" style="position: absolute; top: 50%; right: 11px; margin-top: -3.5px;"></div>
                                            <ul class="choose-type want-subsidy" v-show="subsidy">
                                                <li v-for="item in subsidyList" @click="subsidyListFn(item)">{{item}}</li>
                                            </ul>
                                        </div>
                                    </div>
                            </div>
                            <div class="left item-child" style="position:relative;">
                                <span class="margin-right">拦标价格</span>　
                                <div class="choose-input">
                                    <input class="input-mes" type="text" placeholder="填写举例：100000" v-model="blockbidPrice" maxlength="10" style="border: 0;"><span>元</span>
                                </div>
                                <div class="warn" v-show="warn16Show" style="position: absolute; top: 26px; left: 0;">*请输入数字！</div>
                            </div>
                            <div class="warn" v-show="warn12Show" style="position: absolute; bottom: 0; left: 0;">*请选择合作方式</div>
                        </div>
                    </div>
                    <div class="fourth items bg-color">
                        <div class="top item-child">
                            <span class="margin-right" style="flex-shrink: 0">其他说明</span>　
                            <div class="choose-input" style="position: relative; border: none;">
                                <!--<input class="input-mes" type="text" placeholder="可选填" v-model="remarkMsg" maxlength="35" style="border: 0;"><span>{{num}}/35</span>-->
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
                        <div class="bottom item-child">
                            <span class="margin-right">发布有效期</span>　
                            <div class="choose-time" @click.stop="clickClose13Fn ">
                                <div class="choose-time-icon">
                                    <span class="icon-item">&#xe607;</span>
                                </div>
                                <div style="flex-grow: 1; text-align: center;">{{myDate2}}</div>
                            </div>
                            <div class="warn" v-show="warn7Show" style="position: absolute;top: 46px; left: 0;">*发布有效期不能为空</div>
                            <div v-if="calendarShow2" class="calendar-box popup" @click.stop style="left: 0; top: 48px;">
                                <div class="selec-data">
                                    <input type="text" placeholder="开始时间" readonly v-model="calendarInitDay3"><span>-</span>
                                    <input type="text" placeholder="结束时间" readonly v-model="calendarInitDay4">
                                    <div class="confirm-btn btn" @click="getMyDate2">确定</div>
                                    <div class="cancel-btn btn" @click="calendarShow2 = !calendarShow2">取消</div>
                                </div>
                                <calendarCP :initOpt="opt" @changeRangeDate="getDateRange"></calendarCP>
                            </div>
                        </div>
                    </div>
                    <div class="fifth" v-show="submitData2Click == false">
                        <div class="vertical-center">
                            <input type="radio" class="magic-radio" name="open-type" id="alRWopenAll" checked @change="publicwayFn0"/><label for="alRWopenAll" class="input-label">对所有人公开</label>
                        </div>
                        <div class="vertical-center">
                            <input type="radio" class="magic-radio" name="open-type" id="alRWopenUser" @change="publicwayFn1"/><label for="alRWopenUser" class="input-label">对认证用户公开</label>
                        </div>
                        <div class="vertical-center" style="margin-right: 0;">
                            <input type="radio" class="magic-radio" name="open-type" id="alRWopenOnly" @change="publicwayFn3"/><label for="alRWopenOnly" class="input-label">定向发布</label>
                        </div>
                        <div class="choose-input" v-show="directionPublicShow" style="position: relative;justify-content: flex-start;">
                            <div class="little-label-wrapper" v-show="directionPublicCityShow" ref="littleLabelWrapper" @click="labelWrapperClick">
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
                            <input class="input-mes-a" type="text" v-model="fourthArea" @click.stop="airportFn4" >
                            <airCompanySearch class="aisx" v-on:resData="resData4" :searchText="fourthArea" v-show="isSearch4" style="top: 26px;left: -8px;"></airCompanySearch>
                        </div>
                    </div>
                </div>
            </div>
            <!--</transition>-->
            <div class="sixth" v-if="submitData2Click == false">
                <button class="btn-a btn-blue" @click="submitData2ClickFn" v-show="role.role != 2">委托代理</button>
                <button class="btn-b btn-blue" @click.stop="submitData">确认发布</button>
                <button class="btn-c btn-cancel" @click="closeThis">取消</button>
            </div>
            <div class="sixth" v-else>
                <button class="btn-b btn-blue" @click.stop="submitData2">确认发布</button>
                <button class="btn-c btn-cancel" @click="closeThis">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import airAreaSearch from './airAreaSearch.vue'
    import airportS from '../reuseComponents/airportSearch1.vue'
    import airCompanySearch from '../reuseComponents/airCompanySearch.vue'
    import calendar from './calendar'
    import singleElection from '$src/page/components/demandListComponents/singleElection.vue'
    import calendarCP from '$src/page/components/publicTools/calendar/calendarCP.vue'

    export default {
        props: ['acceptData'],
        data() {
            return {
                thisShow: true,
                warn1Show: false,  //联系人警告
                warn2Show: false,  //联系方式警告
                warn3Show: false,  //始发地警告
                warn4Show: false,  //机型警告
                warn5Show: false,  //班期警告
                warn6Show: false,  //拟开航时间警告
                warn7Show: false,  //需求有效期警告
                warn8Show: false,  //始发地为区域，经停、到达必须有一个为意向机场
                warn9Show: false,  // 始发地、经停地、到达地不能相同
                warn12Show: false,  //补贴政策警告
                warn13Show: false,  //座位数
                warn14Show: false,  //均班客量期望
                warn15Show: false,  //客座率期望
                warn16Show: false,  //拦标价格

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
                firAreaBus: '', // 始发地-中转站
                firAreaCode: '', //三字码（只有城市有）
                dptState: 0,  //始发地类型（0：机场，1：区域）
                pstState: 0,
                arrvState: 0,
                secArea: '', //经停地 2的意向区域
                secAreaBus: '', // 经停地-中转站
                secAreaCode: '', //三字码（只有城市有）
                thirdArea: '', //到达地 3的意向区域
                thirdAreaBus: '', // 到达地-中转站
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
                directionPublicCityShow: false, // 定向发布小标签那一行
                directionPublicCity: [],
                fourthArea: '', //“定向发布”input输入的信息
                /*机场查询*/
                qyCode1: "", //始发点机场三字码
                qyCode2: "", //经停地机场三字码
                qyCode3: "", //到达地机场三字码
                searchText: '',
                isSearch1: false,//机场搜索是否显示
                isSearch2: false,
                isSearch3: false,
                isSearch4: false,
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
                publicwayStrCode: 0,//公开方式(0:对所有人公开,1:对认证用户公开,2:定向航司,3:定向机场), 3和4定位目标在下一个字段

                calendarInitDay1: '', //日历
                calendarInitDay2: '',
                calendarInitDay3: '',
                calendarInitDay4: '',
                myDate1: '选择起止时间',
                myDate2: '选择起止时间',
                calendarShow1: false,
                calendarShow2: false,

                /*始发经停到达均默认选择意向机场*/
//                space1ShowTitle: '始发点类型',
//                space2ShowTitle: '经停点类型',
//                space3ShowTitle: '到达点类型',
                space1ShowTitle: '意向机场',
                space2ShowTitle: '意向机场',
                space3ShowTitle: '意向机场',

//                sailingtime: '选择起止时间',//开航时间
//                periodValidity: '选择起止时间',//发布有效期

                scheduleShow: '待定', //选择班期类型
                subsidyShow: '选择合作方式',
                timeList: ['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'],
                spaceList: ['意向区域','意向机场'],
                scheduleList: ['待定','满排','半排'],
                subsidyList: ['保底','定补','人头补','无补贴','其他'],
                sendData: {},
                directionalgoal: '', // 定向发布（id）
                directionalgoalArry: [],
                getEnterMsg: {}, //当前登录机场信息
                moreShow: false, // 定向发布长度是否超出显示范围
                littleListWrapperShow: false, // 多条显示
                submitData2Click: false,  // “委托代理”按钮是否已经被点击
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
                opt: {      //发布有效期
                    start: '',
                    end: '',
                    isDis: false,
                },
                opt0: {     //拟开时间
                    start: '',
                    end: '',
                    isDis: false,
                },
                calendarInitDay: '',
                nullShow: false,
            }
        },
        components: {
            airAreaSearch,
            airportS,
            calendar,
            airCompanySearch,
            singleElection,
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
                    }
                }
            },
            blockbidPrice: function() {
                if(this.blockbidPrice == '' || this.blockbidPrice == null) {
                    this.warn16Show = false;
                }else {
//                    let blockbidPrice = this.blockbidPrice.replace(/(^\s*)|(\s*$)/g,"");
                    if (/^[0-9]+\.?[0-9]{0,9}$/.test(this.blockbidPrice) || this.blockbidPrice == '') { // 输入必须为数字的判断
                        this.warn16Show = false;
                    } else {
                        this.warn16Show = true;
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
            calendarInitDay3: function () {
                this.setOptFn();
            },
            calendarInitDay4: function () {
                this.setOptFn();
            },
        },
        mounted() {
            if(this.acceptData.chongXinWeiTuo == '1') {
                this.submitData2ClickFn();
            }
            this.space1Fn();
            this.space2Fn();
            this.space3Fn();
            this.myDate2Fn();
            this.acceptDataFn();
            this.setOptFn();
            this.setOptFn0();
        },
       /* updated() {
            this.moreShowFn();
        },*/
        computed: {
            num: function () { // 其他说明中已输入的字数
                return this.remarkMsg.length;
            },
            ...vx.mapGetters([
                'role','airList','companyList'
            ])
            /*sailingtime: function () {
                return this.calendarInitDay1 + ',' +this.calendarInitDay2;
            },
            periodValidity: function () {
                return this.calendarInitDay3 + ',' +this.calendarInitDay4;
            }*/
        },
        methods: {
            /*日历点击“取消”事件*/
            calendarShow1Fn: function () {
                this.calendarShow1 = false;
                this.nullShow = false;
            },
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
            getDateRange: function (rd) {  // 发布有效期
//                this.calendarInitDay = rd;
                this.calendarInitDay3 = rd[0];
                this.calendarInitDay4 = rd[1];
            },
            setOptFn: function () {
                this.opt.start = this.calendarInitDay3;
                this.opt.end = this.calendarInitDay4;
            },
            /*新增表单内容*/
            checkboxClickFn: function () {
                this.elect.set = !this.elect.set;
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
            // 数据初始化：获取当前登录机场信息
            getEnterMsgFn: function () {
                this.user = this.role.username;  // 联系人
                this.phoneNum = this.role.phone; // 联系方式
                this.airList.forEach((val) => {
                    if(val.code == this.role.airlineretrievalcondition) {
                        this.getEnterMsg = val.allData;
                    }
                });
                this.firArea = this.getEnterMsg.airlnCdName;
                this.firAreaBus = this.getEnterMsg.airlnCdName;
                this.qyCode1 = this.getEnterMsg.iata;
            },
            // 从父组件接受数据,并绑定到表单上
            acceptDataFn: function () {
                /*单选按钮是否选定*/
                let alRWairAYes = document.getElementById('alRWairAYes');
                let alRWairANo = document.getElementById('alRWairANo');
                let alRWairAResYes = document.getElementById('alRWairAResYes');
                let alRWairAWait = document.getElementById('alRWairAWait');
                let alRWairAEnough = document.getElementById('alRWairAEnough');
                let alRWairBYes = document.getElementById('alRWairBYes');
                let alRWairBNo = document.getElementById('alRWairBNo');
                let alRWairBResYes = document.getElementById('alRWairBResYes');
                let alRWairBWait = document.getElementById('alRWairBWait');
                let alRWairBEnough = document.getElementById('alRWairBEnough');
                let alRWairCYes = document.getElementById('alRWairCYes');
                let alRWairCNo = document.getElementById('alRWairCNo');
                let alRWairCResYes = document.getElementById('alRWairCResYes');
                let alRWairCWait = document.getElementById('alRWairCWait');
                let alRWairCEnough = document.getElementById('alRWairCEnough');
                let alRWsubsidyYes = document.getElementById('alRWsubsidyYes');
                let alRWsubsidyNo = document.getElementById('alRWsubsidyNo');
                let alRWsubsidyTalk = document.getElementById('alRWsubsidyTalk');
                let alRWopenAll = document.getElementById('alRWopenAll');
                let alRWopenUser = document.getElementById('alRWopenUser');
                let alRWopenOnly = document.getElementById('alRWopenOnly');
                this.user = this.acceptData.contact;  // 联系人
                this.phoneNum = this.acceptData.iHome; // 联系方式

                this.scheduleShow = this.acceptData.days; // 拟开班期
                this.typeChoose = this.acceptData.aircrfttyp; // 拟开机型
                this.seatingNum = this.acceptData.seating; // 座位数
                this.avgguestExpect = this.acceptData.avgguestexpect; // 均班客量期望
                this.loadfactorsExpect = this.acceptData.loadfactorsexpect; // 客座率期望
                this.remarkMsg = this.acceptData.remark; // 其他说明
                this.blockbidPrice = this.acceptData.blockbidprice; // 拦标价格
                // 判断始发类型（0：机场，1：区域）
                // 机场传三字码，区域和省份传汉字
                this.dptAcceptnearairport = this.acceptData.dptAcceptnearairport;
                this.pstAcceptnearairport = this.acceptData.pstAcceptnearairport;
                this.arrvAcceptnearairport = this.acceptData.arrvAcceptnearairport;
                this.dptTimeresources = this.acceptData.dptTimeresources;        //选填 始发地时刻资源(时刻资源三种状态0:有时刻（直接呈现时刻）dpt_time字段存放具体时刻值， 1:待协调， 2:时刻充足。)
                this.pstTimeresources = this.acceptData.pstTimeresources;        //选填 经停地时刻资源(时刻资源三种状态0:有时刻（直接呈现时刻）dpt_time字段存放具体时刻值， 1:待协调， 2:时刻充足。)
                this.arrvTimeresources = this.acceptData.arrvTimeresources;        //选填 到达地时刻资源(时刻资源三种状态0:有时刻（直接呈现时刻）dpt_time字段存放具体时刻值， 1:待协调， 2:时刻充足。)
                this.dptTime = this.acceptData.dptTime;
                this.pstTime = this.acceptData.pstTime;
                this.arrvTime = this.acceptData.arrvTime;
                this.publicwayStrCode = this.acceptData.publicway;   //必填 公开方式(0:对所有人公开,1:对认证用户公开,2:定向航司,3:定向机场), 3和4定位目标在下一个字段
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
                // 补贴状态：有补贴（0:定补、1:保底、2:人头补、3:其他）4:待议5:无补贴
                this.subsidyCode = this.acceptData.subsidypolicy;
                this.subsidypolicyFn(this.acceptData.subsidypolicy);

                // publicway 公开方式(0:对所有人公开,1:对认证用户公开,2:定向航司,3:定向机场), 3和4定位目标在下一个字段
                if(this.acceptData.publicway === "0") {
                    alRWopenAll.checked = true;
                }else if(this.acceptData.publicway === "1") {
                    alRWopenUser.checked = true;
                }else if(this.acceptData.publicway === "2" || this.acceptData.publicway === "3") {
                    alRWopenOnly.checked = true;
                    this.directionPublicShow = true;
                    this.directionalgoalChangeFn();
                    this.moreShowFn();
                }
            },
            // 将航司id转换成汉字
            directionalgoalChangeFn: function () {
                this.directionPublicCity = [];
                this.companyList.forEach((val) => {
                    if(this.acceptData.directionalgoal.indexOf(val.id) != '-1') {
                        this.directionPublicCity.push({
                            name: val.companyName,
                            id: val.id,
                        });
                    }
                });
            },
            // 将补贴类型从数字变成汉字
            subsidypolicyFn: function (index) {
                if(index === '0'){
                    this.subsidyShow = '定补';
                }else if(index === '1') {
                    this.subsidyShow = '保底';
                }else if(index === '2') {
                    this.subsidyShow = '人头补';
                }else if(index === '3' || index === '4') {
                    this.subsidyShow = '其他';
                }else if(index === '5') {
                    this.subsidyShow = '无补贴';
                }
            },
            warn4Fn: function () {
//                console.info(4)
                this.warn4Show = true;
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
            // 传送的数据
            sendDataFn: function () {
                this.sendData.contact = this.user;  //必填 联系人
                this.sendData.iHome = this.phoneNum;//必填 联系方式
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
                if(this.myDate1 == '选择起止时间' || this.myDate1 == '') { // 拟开时间
                    this.sendData.sailingtime = '';      //必填 拟开行时间（起止时间）
                }else {
                    this.sendData.sailingtime = this.myDate1;      //必填 拟开行时间（起止时间）
                }
                if(this.scheduleShow == '选择班期类型') { //班期
                    this.sendData.days = '';
                }else {
                    this.sendData.days = this.scheduleShow;      //必填 班期
                }
                if(this.myDate2 == '选择起止时间') { // 发布有效期
                    this.sendData.periodValidity = '';
                }else {
                    this.sendData.periodValidity = this.myDate2; //必填 需求发布有效期
                }
                this.sendData.subsidypolicy = this.subsidyCode;   //必填 补贴有种状态：有补贴（0:定补、1:保底、2:人头补、3:其他）4:待议 5:无补贴
                this.sendData.publicway = this.publicwayStrCode;   //必填 公开方式(0:对所有人公开,1:对认证用户公开,2:定向航司,3:定向机场), 3和4定位目标在下一个字段
                this.sendData.pstState = this.pstState;         //经停地类型（0：机场，1：区域）
                this.sendData.pstAcceptnearairport = this.pstAcceptnearairport; //选填 经停地是否接收临近机场(0:接收,1:不接受)
                this.sendData.arrvState = this.arrvState;         //到达地类型（0：机场，1：区域）
                this.sendData.arrvAcceptnearairport = this.arrvAcceptnearairport; //选填 到达地是否接收临近机场(0:接收,1:不接受)
                this.sendData.blockbidprice = this.blockbidPrice; //选填 拦标价格
                this.sendData.loadfactorsexpect = this.loadfactorsExpect; //选填 客座率期望
                this.sendData.avgguestexpect = this.avgguestExpect; // 选填 均班客座期望
                this.sendData.seating = this.seatingNum;            // 选填 座位数
                this.sendData.remark = this.remarkMsg;              // 选填 备注说明
                if(this.directionPublicCity.length != 0){
                    this.directionPublicCity.forEach((val) => {
                        this.directionalgoalArry.push(val.id);
                    });
                    this.directionalgoal = this.uniqueFn(this.directionalgoalArry).join(',');
                }else {
                    this.directionalgoal = '';
                }
                this.sendData.directionalgoal = this.directionalgoal; // 定向发布
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
            //发送数据
            submitData: function () {
                this.replaceAreaBus();
                this.sendStateMsgFn();
                let req = document.getElementById('airlineReq'); //控制滚动条的位置
                //联系人/联系方式/始发地/区域/运力所在基地/机型/班期/拟开航时间/需求有效时间/接受邻近机场/公开方式/
                //表单验证（部分）
                if(this.user == '') { // 联系人
                    this.warn1Show = true;
                    req.scrollTop = 0;
                    return
                }if(this.phoneNum == '' || this.phoneNum == null || this.warn2Show == true) { // 联系方式
                    this.warn2Show = true;
                    req.scrollTop = 0;
                    return
                }if(this.firArea == '') { // 始发地
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
                if(this.myDate1 == '选择起止时间' || this.myDate1 == '') { // 拟开时间
                    this.warn6Show = true;
                    req.scrollTop = 100;
                    return
                }if(this.scheduleShow == '选择班期类型') { //班期
                    this.warn5Show = true;
                    req.scrollTop = 100;
                    return
                }if(this.myDate2 == '选择起止时间') { // 发布有效期
                    this.warn7Show = true;
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
                if(this.blockbidPrice == '' || this.blockbidPrice == null) {
                    this.warn16Show = false;
                }else {
                    let blockbidPrice = this.blockbidPrice.replace(/(^\s*)|(\s*$)/g,"");
                    if(/^[0-9]+\.?[0-9]{0,9}$/.test(blockbidPrice) || blockbidPrice == '') { // 输入必须为数字的判断
                        this.warn16Show = false;
                    }else {
                        this.warn16Show = true;
                        req.scrollTop = 500;
                        return
                    }
                }
                this.sendDataFn();
                this.sendData.demandtype = '0';      //必填 需求种类共3种（0:航线需求、1:运力需求、2:航线托管需求）

//                console.info(this.sendData);
                this.$ajax({
                    url:"/demandAdd",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: this.sendData
                }) .then((response) => {
                    if(response.data.opResult === '0'){
//                        alert('成功发布！')
                        this.open6(`成功发布！`)
                        this.$emit("close-this");
                    }else{
//                        alert('错误代码：' + response.data.opResult)
                        this.open8(`错误代码：${response.data.opResult}`);
                    }
                }) .catch((error) => {
                    console.log(error);
                });
            },
            // 委托发布
            submitData2ClickFn: function () { // 点击“委托发布”
                let req = document.getElementById('airlineReq'); //控制滚动条的位置
                req.scrollTop = 0;
                this.submitData2Click = true; // “委托发布”按钮是否已经点击，false：还未点击，true：已点击
                this.warn3Show = false;
                this.warn4Show = false;
                this.warn5Show = false;
                this.warn6Show = false;
                this.warn7Show = false;
                this.$emit('changeTitle');
            },
            closeSubmitData2: function () { // 点“委托发布”后的“取消”按钮
                if(this.acceptData.chongXinWeiTuo == '1') {
                    this.closeThis();
                }else {
                    this.submitData2Click = false;
                }
            },
            submitData2: function () {
                this.replaceAreaBus();
                this.sendStateMsgFn();
                let req = document.getElementById('airlineReq'); //控制滚动条的位置
                //表单验证（部分）
                if(this.user == '') {
                    this.warn1Show = true;
                    req.scrollTop = 0;
                    return
                }if(this.phoneNum == '' || this.phoneNum == null || this.warn2Show == true) {
                    this.warn2Show = true;
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
                }if(this.subsidyCode === '') {
                    this.warn12Show = true;
                    req.scrollTop = 550;
                    return
                }
                if(this.myDate1 == '选择起止时间') { // 拟开时间
                    this.warn6Show = true;
                    req.scrollTop = 100;
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
                if(this.blockbidPrice == '' || this.blockbidPrice == null) {
                    this.warn16Show = false;
                }else {
                    let blockbidPrice = this.blockbidPrice.replace(/(^\s*)|(\s*$)/g,"");
                    if(/^[0-9]+\.?[0-9]{0,9}$/.test(blockbidPrice) || blockbidPrice == '') { // 输入必须为数字的判断
                        this.warn16Show = false;
                    }else {
                        this.warn16Show = true;
                        req.scrollTop = 500;
                        return
                    }
                }
                this.sendDataFn();
                this.sendData.demandtype = '3';      //必填 需求种类共5种（0:航线需求、1:运力需求、2:运营托管、3:航线委托、4:运力委托）
                this.$ajax({
                    url:"/demandAdd",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: this.sendData
                }) .then((response) => {
                    if(response.data.opResult === '0'){
//                        alert('成功委托！')
                        this.open6(`成功委托！`);
                        this.$emit("close-this");
                    }else{
//                        alert('错误代码：' + response.data.opResult)
                        this.open8(`错误代码：${response.data.opResult}`);
                    }
                }) .catch((error) => {
                    console.log(error);
                });
            },
            closeThis: function () {
                this.$emit("close-this");
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
                this.calendarInitDay1 = this.calendarInitDay2 = this.calendarInitDay3 = year+"."+mon+"."+day;
                this.calendarInitDay4 = year2+"."+mon2+"."+day2;
                this.myDate2 = this.calendarInitDay3 + "-" + this.calendarInitDay4;
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
                this.nullShow = false;
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
                this.nullShow = false;
                this.schedule = false;
                this.subsidy = false;
                this.calendarShow2 = false;
                this.closeTimeFrameFn();
            },
            clickClose2Fn: function () {
                this.space2 = !this.space2;
                this.space1 = false;
                this.space3 = false;
                this.calendarShow1 = false;
                this.nullShow = false;
                this.schedule = false;
                this.subsidy = false;
                this.calendarShow2 = false;
                this.closeTimeFrameFn();
            },
            clickClose3Fn: function () {
                this.space3 = !this.space3;
                this.space1 = false;
                this.space2 = false;
                this.calendarShow1 = false;
                this.nullShow = false;
                this.schedule = false;
                this.subsidy = false;
                this.calendarShow2 = false;
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
                this.nullShow = !this.nullShow;
                this.schedule = false;
                this.subsidy = false;
                this.calendarShow2 = false;
            },
            clickClose11Fn: function () {
                this.closeAll1();
                this.schedule = !this.schedule;
                this.calendarShow1 = false;
                this.nullShow = false;
                this.subsidy = false;
                this.calendarShow2 = false;
            },
            clickClose12Fn: function () {
                this.closeAll1();
                this.subsidy = !this.subsidy;
                this.schedule = false;
                this.calendarShow1 = false;
                this.nullShow = false;
                this.calendarShow2 = false;
            },
            clickClose13Fn: function () {
                this.closeAll1();
                this.calendarShow2 = !this.calendarShow2;
                this.subsidy = false;
                this.schedule = false;
                this.calendarShow1 = false;
                this.nullShow = false;
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
                this.calendarShow2 = false;
                this.space1 = false;
                this.space2 = false;
                this.space3 = false;
                this.calendarShow1 = false;
                this.nullShow = false;
                this.schedule = false;
                this.subsidy = false;
            },
            // 电话号码验证
            verifyPhon: function () {
                if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(this.phoneNum))){
                    this.warn2Show = true;
                }else{
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
                this.warn8Show = false;
                this.warn9Show = false;
            },
            getArea3: function (areaMes) {
                this.thirdAreaBus = areaMes.name;
                this.thirdArea = areaMes.name;
//                this.thirdArea = areaMes.name;
                this.thirdAreaCode = areaMes.code; //三字码（只有机场有）
                this.airAreaSearchShow3 = false;
                this.warn8Show = false;
                this.warn9Show = false;
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

            // 获取机型数据
            getAirType: function () {
                this.closeAll();
                this.airTypeShow = true;
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
                if(this.isSearchCode1 == 0){
                    this.airAreaSearchShow1 = true;
                    /*this.airAreaSearchShow2 = false;
                    this.airAreaSearchShow3 = false;*/
                }
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
            airportFn3: function () {
                this.closeAll();
                if(this.isSearchCode3 == 1){
                    this.isSearch3 = true;
                }
                if(this.isSearchCode3 == 0){
                    this.airAreaSearchShow3 = true;
                }
            },
            airportFn4: function () {
                this.isSearch4 = true;
                this.directionPublicCityShow = false;
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
            resData4: function (data) { // 定向发布，点击下拉选择定向航司
                this.isSearch4 = false;
                this.fourthArea = ''; // 讲定向发布输入框置空
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
            // 选择意向区域或意向机场 0为区域，1为机场(始发经停到达均默认选择意向机场)
            space1Fn: function (item = '意向机场') {
                this.space1ShowTitle = item;
                this.firArea = '';
                this.firAreaBus = '';
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
                }
            },
            space2Fn: function (item = '意向机场') {
                this.space2ShowTitle = item;
                this.secArea = '';
//                this.secAreaBus = '';
                if(item == '意向区域') {
                    this.space2Show = '请输入意向区域（选填）';
                    this.isSearchCode2 = 0;
                    this.second2Show = false;
                    this.isSearch1 = false;
                    this.isSearch2 = false;
                    this.isSearch3 = false;
                    this.pstState = 1;
                }if(item == '意向机场') {
                    this.space2Show = '请输入意向机场（选填）';
                    this.secondShow = true;
                    this.second2Show = true;
                    this.isSearchCode2 = 1;
                    this.airAreaSearchShow1 = false;
                    this.airAreaSearchShow2 = false;
                    this.airAreaSearchShow3 = false;
                    this.pstState = 0;
                }if(this.second1Show == false && this.second2Show == false && this.second3Show == false) {
                    this.secondShow = false;
                }
            },
            space3Fn: function (item = '意向机场') {
                this.space3ShowTitle = item;
                this.thirdArea = '';
                if(item == '意向区域') {
                    this.space3Show = '请输入意向区域（选填）';
                    this.isSearchCode3 = 0;
                    this.second3Show = false;
                    this.isSearch1 = false;
                    this.isSearch2 = false;
                    this.isSearch3 = false;
                    this.arrvState = 1;
                }if(item == '意向机场') {
                    this.space3Show = '请输入意向机场（选填）';
                    this.secondShow = true;
                    this.second3Show = true;
                    this.isSearchCode3 = 1;
                    this.airAreaSearchShow1 = false;
                    this.airAreaSearchShow2 = false;
                    this.airAreaSearchShow3 = false;
                    this.arrvState = 0;
                }if(this.second1Show == false && this.second2Show == false && this.second3Show == false) {
                    this.secondShow = false;
                }
            },
            scheduleListFn: function (item) {
                this.scheduleShow = item;
                this.warn5Show = false;
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
                    this.isSearch4 = true;
                    this.directionPublicCityShow = false;
                });
            },
            // 日历
            getMyDate1: function(){//获取起始的日期
                if(this.calendarInitDay1 && this.calendarInitDay2){
                    this.myDate1 = this.calendarInitDay1 + "-" + this.calendarInitDay2;
                    this.calendarShow1 = false;
                    this.nullShow = false;
                    this.warn6Show = false;
                }else{}
            },
            getMyDate2: function(){//获取起始的日期
                if(this.calendarInitDay3 && this.calendarInitDay4){
                    this.myDate2 = this.calendarInitDay3 + "-" + this.calendarInitDay4;
                    this.calendarShow2 = false;
                    this.warn7Show = false;
                }else{}
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
            kemiantan: function () {
//                console.info('label')
            },
            //发布方式
            publicwayFn0: function () {
                this.publicwayStrCode = 0;
                this.directionPublicShow = false;
            },
            publicwayFn1: function () {
                this.publicwayStrCode = 1;
                this.directionPublicShow = false;
            },
            publicwayFn3: function () {
                this.directionPublicShow = true;
                this.publicwayStrCode = 2;
                this.directionPublicCityShow = true;
                this.$nextTick(() => {
                    this.moreShowFn();
                })
            },
            moreShowFn: function () { // 判断省略号是否显示
                /*if(this.$refs.littleLabelWrapper.offsetWidth >= 195) {
                    this.moreShow = true;
                }else {
                    this.moreShow = false;
                }*/
                if(this.directionPublicCity.length > 0) {
                    this.moreShow = true;
                }else {
                    this.moreShow = false;
                }
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
    /********↓↓↓↓↓↓新增样式↓↓↓↓↓↓↓********/
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
    /******checkbox样式更改*****/
    .magic-checkbox {
        position: absolute;
        display: none;
    }
    .magic-checkbox + label {
        display: flex;
        align-items: center;
        cursor: pointer;
        vertical-align: middle;
        &::before {
            padding-right: 5px;
            font-family: iconfont;
            font-size: 1.7rem;
            color: $font-color;
            content: '\e723';
            border-radius: 50%;
        }
    }
    .magic-checkbox:checked + label {
        &::before {
            content: '\e724';
            color: $icon-color;
            font-weight: bold;
        }
    }
    /********/
    .simplify-msg {
        position: relative;
        padding: 67px 0 0 0;
        .check-box {
            position: absolute;
            top: 0;
            right: 20px;
            display: flex;
            align-items: center;
            .checkbox-choose {
                margin-right: 5px;
            }
        }
        .s-first,.first {
            padding: 0 20px 23px 20px;
            .start {
                width: 142px;
            }
            .pass {
                width: 142px;
            }
            .arrive {
                width: 142px;
            }
        }
        .s-second,.third {
            margin: 0;
            .item {
                .item-child {
                    justify-content: flex-start;
                    width: 100%;
                }
            }
            .third-d {
                padding: 23px 0;
                height: 26px;
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
        .s-third,.third {
            margin: 0;
            .item {
                .item-child {
                    justify-content: flex-start;
                    width: 240px;
                }
            }
            .third-a {
                padding: 23px 0 0 0;
                height: 26px;
                line-height: 26px;
                .right {
                    position: relative;
                }
            }
        }
    }
    /*************↑↑↑↑↑新增样式↑↑↑↑↑************/
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
        position: relative;
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
    .little-label-wrapper {
        position: absolute;
        top: 0;
        display: flex;
        max-width: 196px;
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
        right: 0px;
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
        z-index: 11;
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
        z-index: 12;
    }
    .container {
        /*position: absolute;
        top: 65px;
        right: 0px;*/
        padding: 20px 20px 0 20px;
        width: 580px;
        max-height: 630px;
        overflow-y: scroll;
        /*overflow-x: visible;*/
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
           /* display: flex;
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
        padding: 10px 20px 0 20px;
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
            padding: 17px 0 27px 0;
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
            padding: 9px 20px;
            outline: none;
            font-size: 1.5rem;
            line-height: 20px;
            cursor: pointer;
        }
        .btn-a {
            margin-right: 30px;
        }
        .btn-b {
            margin-right: 10px;
            width: 160px;
        }
        .btn-c {
        }
    }
</style>
