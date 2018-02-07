<template>
    <div class="ald-container" v-cloak>
        <div class="first-show" v-show="firstShow">
            <div class="first item-container">
                <span class="font-gray">需求详情</span>
                <span class="close-icon" @click="closeThisFn">&times;</span>
            </div>
            <div class="second item-container">
                <div class="sec-top">
                    {{myData.title}}航线需求
                </div>
                <div class="sec-bottom font-gray">
                    <span style="margin-right: 40px;">创建于{{releaseTime}}</span>
                    <span style="margin-right: 30px;" v-show="userNumShow">已有{{userNum}}位用户发起意向</span>
                    <span class="font-gray">状态:　
                        <span v-if="demandState5" style="color: red; font-weight: bold;">{{myData.demandprogressStr}}</span>
                        <span v-else><span style="color: #3F7AFF;font-weight: bold;">{{myData.demandprogressStr}}</span></span>
                    </span>
                    <div class="anew-publish btn-b" v-show="demandState5 && isSelf == true" @click="anewPublishClickFn">
                        重新发布
                    </div>
                    <div class="anew-publish btn-b"
                         v-if="(myplanBtnShow && (receiveIntention.responseProgress != 2
                            && receiveIntention.responseProgress != 3
                            && receiveIntention.responseProgress != 4)
                            && myData.demandprogress != 3)" @click="beginTalkClickFn">
                        发起对话
                    </div>
                </div>
            </div>
            <div class="third item-container">
                <div class="start item">
                    <div class="item-a font-gray">始发<span v-show="myData.dptState == 0">机场</span><span v-show="myData.dptState == 1">区域</span></div>
                    <div class="item-b">
                        <h2>
                            <span v-show="myData.dptState == 0">{{myData.dptNm}}</span>
                            <span v-show="myData.dptState == 1">{{myData.dpt}}</span>
                        </h2>
                    </div>
                    <div class="item-c font-gray" v-show="myData.dptState == 0 && myData.dptNm != null && myData.dptNm != ''">
                        <span v-if="myData.dptAcceptnearairport === '0'">接受</span>
                        <span v-else>不接受</span>临近机场
                    </div>
                    <div class="item-d font-gray" v-show="myData.dptState == 0 && myData.dptNm != null && myData.dptNm != ''">出港资源</div>
                    <div class="item-e" v-show="myData.dptState == 0 && myData.dptNm != null && myData.dptNm != ''">
                        <span v-show="myData.dptTimeresources == 0">{{myData.dptTime}}</span>
                        <span v-show="myData.dptTimeresources == 1">待协调</span>
                        <span v-show="myData.dptTimeresources == 2">时刻充足</span>
                    </div>
                </div>
                <div class="item-icon">
                    <span class="icon-item">&#xe672;</span>
                </div>
                <div class="pass item">
                    <div class="item-a font-gray">经停<span v-show="myData.pstState == 0">机场</span><span v-show="myData.pstState == 1">区域</span></div>
                    <div class="item-b">
                        <h2>
                            <span v-show="myData.pstState == 0">{{myData.pstNm}}</span>
                            <span v-show="myData.pstState == 1">{{myData.pst}}</span>
                        </h2>
                    </div>
                    <div class="item-c font-gray" v-show="myData.pstState == 0 && myData.pstNm != null && myData.pstNm != ''">
                        <span v-if="myData.pstAcceptnearairport === '0'">接受</span>
                        <span v-else>不接受</span>临近机场
                    </div>
                    <div class="item-d font-gray" v-show="myData.pstState == 0 && myData.pstNm != null && myData.pstNm != ''">出港资源</div>
                    <div class="item-e" v-show="myData.pstState == 0 && myData.pstNm != null && myData.pstNm != ''">
                        <span v-show="myData.pstTimeresources == 0">{{myData.pstTime}}</span>
                        <span v-show="myData.pstTimeresources == 1">待协调</span>
                        <span v-show="myData.pstTimeresources == 2">时刻充足</span>
                    </div>
                </div>
                <div class="item-icon">
                    <span class="icon-item">&#xe672;</span>
                </div>
                <div class="arrive item">
                    <div class="item-a font-gray">到达<span v-show="myData.arrvState == 0">机场</span><span v-show="myData.arrvState == 1">区域</span></div>
                    <div class="item-b">
                        <h2>
                            <span v-show="myData.arrvState == 0">{{myData.arrvNm}}</span>
                            <span v-show="myData.arrvState == 1">{{myData.arrv}}</span>
                        </h2>
                    </div>
                    <!--下方有空格-->
                    <div class="item-c font-gray" v-show="myData.arrvState == 0 && myData.arrvNm != null && myData.arrvNm != ''">
                        <span v-if="myData.arrvAcceptnearairport === '0'">接受</span>
                        <span v-else>不接受</span>临近机场
                    </div>
                    <div class="item-d font-gray" v-show="myData.arrvState == 0 && myData.arrvNm != null && myData.arrvNm != ''">出港资源</div>
                    <div class="item-e" v-show="myData.arrvState == 0 && myData.arrvNm != null && myData.arrvNm != ''">
                        <span v-show="myData.arrvTimeresources == 0">{{myData.arrvTime}}</span>
                        <span v-show="myData.arrvTimeresources == 1">待协调</span>
                        <span v-show="myData.arrvTimeresources == 2">时刻充足</span>
                    </div>
                </div>
            </div>
            <div class="fourth item-container">
                <div class="items">
                    <div class="left item font-gray">
                        <div v-show="contactMsgShow">联系人</div>
                        <div>拟开时间</div>
                        <div>拟飞机型</div>
                        <div>客量期望</div>
                        <div>合作方式</div>
                    </div>
                    <div class="right item">
                        <div class="item-a" v-show="contactMsgShow">{{myData.contact}}</div>
                        <div class="item-a">{{myData.sailingtime || '-'}}</div>
                        <div class="item-b">{{myData.aircrfttyp || '-'}}</div>
                        <div class="item-c">
                            <span v-if="myData.avgguestexpect != null && myData.avgguestexpect != ''">{{myData.avgguestexpect}}人/均班</span>
                            <span v-else>-</span>
                        </div>
                        <div class="item-d">{{subsidypolicyFn(myData.subsidypolicyStr)}}</div>
                        <!--<div>有补贴</div>-->
                    </div>
                </div>
                <div class="items">
                    <div class="left item font-gray">
                        <div v-show="contactMsgShow">联系方式</div>
                        <div>拟开班期</div>
                        <div>座位数</div>
                        <div>客座率期望</div>
                        <div>有效期</div>
                    </div>
                    <div class="right item">
                        <div class="item-a" v-show="contactMsgShow">{{myData.iHome}}</div>
                        <div class="item-a">{{myData.days || '-'}}</div>
                        <div class="item-b">{{myData.seating || '-'}}</div>
                        <div class="item-c">
                            <span v-if="myData.loadfactorsexpect != null && myData.loadfactorsexpect != ''">{{myData.loadfactorsexpect}}%</span>
                            <span v-else>-</span>
                        </div>
                        <div class="item-d" style="display: flex; position: relative;">{{periodValidity1 || '-'}}止
                            <span class="icon-item" v-if="secondShow &&
                                (myData.demandprogress == 0
                                    || myData.demandprogress == 1
                                    || myData.demandprogress == 2)" @click="editCalendarFn" style="cursor:pointer;">&#xe653;</span>
                            <div v-if="calendarShow1" class="calendar-box popup" style="top: 26px; left: -370px;">
                                <div class="selec-data">
                                    <input type="text" placeholder="开始时间" v-model="calendarInitDay3"><span>-</span>
                                    <input type="text" placeholder="结束时间" v-model="calendarInitDay4">
                                    <div class="confirm-btn btn" @click="getMyDate1">确定</div>
                                    <div class="cancel-btn btn" @click="calendarShow1=!calendarShow1">取消</div>
                                </div>
                                <calendarCP :initOpt="opt" @changeRangeDate="getDateRange"></calendarCP>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fifth item-container">
                <div class="left font-gray">其他说明</div>
                <div class="right">{{myData.remark}}</div>
            </div>
        </div>
        <div class="myplan" v-if="myplanShow">
            <div class="plan-til">
                <div>
                    我发出的方案
                    <span v-show="receiveIntention.responseProgress == 2
                        || receiveIntention.responseProgress == 4">({{receiveIntention.responseProgressStr}})</span>
                </div>
                <div @click="EditFn" v-show="receiveIntention.releaseselected == 1
                        && (receiveIntention.responseProgress == 0 || receiveIntention.responseProgress == 1)
                        && (myData.demandprogress != 3 && myData.demandprogress != 4 && myData.demandprogress != 5
                            && myData.demandprogress != 6)" style="cursor:pointer;">
                    <span class="iconfont" style="font-size:1.6rem;">&#xe653;</span>编辑
                </div>
            </div>
            <div class="airline">
                <div class="airplace">
                    <div>始发
                        <span v-show="receiveIntention.dptState == 0">机场</span>
                        <span v-show="receiveIntention.dptState == 1">区域</span>
                    </div>
                    <div>
                        <div v-if="receiveIntention.dptState == 0">{{receiveIntention.dptNm}}</div>
                        <div v-else-if="receiveIntention.dptState == 1">{{receiveIntention.dpt}}</div>
                        <!--<div>成都双流</div>-->
                        <div v-show="receiveIntention.dptState == 0 && receiveIntention.dptNm != null && receiveIntention.dptNm != ''">
                            <span v-if="receiveIntention.dptAcceptnearairport === '0'">接受</span>
                            <span v-else>不接受</span>临近机场
                        </div>
                    </div>
                    <div class="resouse" v-show="receiveIntention.dptState == 0 && receiveIntention.dptNm != null && receiveIntention.dptNm != ''">
                        <div>出港资源</div>
                        <!--<div>{{receiveIntention.dptTime}}</div>-->
                        <div>
                            <span v-show="receiveIntention.dptTimeresources == 0">{{receiveIntention.dptTime}}</span>
                            <span v-show="receiveIntention.dptTimeresources == 1">待协调</span>
                            <span v-show="receiveIntention.dptTimeresources == 2">时刻充足</span>
                        </div>
                        <!--<div>08:00-12:00</div>-->
                    </div>
                </div>
                <div style="padding-top:60px;"><span class="iconfont">&#xe672;</span></div>
                <div class="airplace">
                    <div>经停
                        <span v-show="receiveIntention.pstState == 0">机场</span>
                        <span v-show="receiveIntention.pstState == 1">区域</span>
                    </div>
                    <div>
                        <div v-if="receiveIntention.pstState == 0">{{receiveIntention.pstNm}}</div>
                        <div v-else-if="receiveIntention.pstState == 1">{{receiveIntention.pst}}</div>
                        <!--<div>北京南苑</div>-->
                        <div v-show="receiveIntention.pstState == 0 && receiveIntention.pstNm != null && receiveIntention.pstNm != ''">
                            <span v-if="receiveIntention.pstAcceptnearairport === '0'">接受</span>
                            <span v-else>不接受</span>临近机场
                        </div>
                    </div>
                    <div class="resouse" v-show="receiveIntention.pstState == 0
                        && receiveIntention.pstNm != null
                        && receiveIntention.pstNm != ''">
                        <div>出港资源</div>
                        <!--<div>{{receiveIntention.pstTime}}</div>-->
                        <div>
                            <span v-show="receiveIntention.pstTimeresources == 0">{{receiveIntention.pstTime}}</span>
                            <span v-show="receiveIntention.pstTimeresources == 1">待协调</span>
                            <span v-show="receiveIntention.pstTimeresources == 2">时刻充足</span>
                        </div>
                        <!--<div>待协调</div>-->
                    </div>
                </div>
                <div style="padding-top:60px;"><span class="iconfont">&#xe672;</span></div>
                <div class="airplace">
                    <div>到达
                        <span v-show="receiveIntention.arrvState == 0">机场</span>
                        <span v-show="receiveIntention.arrvState == 1">区域</span>
                    </div>
                    <div>
                        <div v-if="receiveIntention.arrvState == 0">{{receiveIntention.arrvNm}}</div>
                        <div v-else-if="receiveIntention.arrvState == 1">{{receiveIntention.arrv}}</div>
                        <!--<div>华北地区</div>-->
                        <div v-show="receiveIntention.arrvState == 0 && receiveIntention.arrvNm != null && receiveIntention.arrvNm != ''">
                            <span v-if="receiveIntention.arrvAcceptnearairport === '0'">接受</span>
                            <span v-else>不接受</span>临近机场
                        </div>
                    </div>
                    <div class="resouse" v-show="receiveIntention.arrvState == 0 && receiveIntention.arrvNm != null && receiveIntention.arrvNm != ''">
                        <div>出港资源</div>
                        <!--<div>{{receiveIntention.arrvTime}}</div>-->
                        <div>
                            <span v-show="receiveIntention.arrvTimeresources == 0">{{receiveIntention.arrvTime}}</span>
                            <span v-show="receiveIntention.arrvTimeresources == 1">待协调</span>
                            <span v-show="receiveIntention.arrvTimeresources == 2">时刻充足</span>
                        </div>
                        <!--<div></div>-->
                    </div>
                </div>
            </div>
            <div class="table-form">
                <div>
                    <div>联系人</div>
                    <div>{{receiveIntention.contact || '-'}}</div>
                    <!--<div>2017.11.11-2018.11.11</div>-->
                </div>
                <div>
                    <div>联系方式</div>
                    <div>{{receiveIntention.ihome || '-'}}</div>
                    <!--<div>2017.11.11-2018.11.11</div>-->
                </div>
                <div>
                    <div>拟开时间</div>
                    <div>{{receiveIntention.sailingtime || '-'}}</div>
                    <!--<div>2017.11.11-2018.11.11</div>-->
                </div>
                <div>
                    <div>拟开班期</div>
                    <div>{{receiveIntention.days || '-'}}</div>
                    <!--<div>待定</div>-->
                </div>
                <div>
                    <div>拟开机型</div>
                    <div>{{receiveIntention.aircrfttyp || '-'}}</div>
                    <!--<div>AA222</div>-->
                </div>
                <div>
                    <div>座位数</div>
                    <div>{{receiveIntention.seating || '-'}}</div>
                    <!--<div>180</div>-->
                </div>
                <div>
                    <div>客量预期</div>
                    <div>
                        <span v-if="receiveIntention.avgguestexpect != null && receiveIntention.avgguestexpect != ''">{{receiveIntention.avgguestexpect}}人/均班</span>
                        <span v-else>-</span>
                    </div>
                    <!--<div>80</div>-->
                </div>
                <div>
                    <div>客座率预期</div>
                    <div>
                        <span v-if="receiveIntention.loadfactorsexpect != null && receiveIntention.loadfactorsexpect != ''">{{receiveIntention.loadfactorsexpect}}%</span>
                        <span v-else>-</span>
                    </div>
                    <!--<div>80%</div>-->
                </div>
                <div>
                    <div>合作方式</div>
                    <div>{{subsidypolicyFn(receiveIntention.subsidypolicyStr)}}</div>
                    <!--<div>按人头</div>-->
                </div>
                <div>
                    <div>小时成本</div>
                    <div>
                        <span v-if="receiveIntention.hourscost != null && receiveIntention.hourscost != ''">{{receiveIntention.hourscost}}万元/小时</span>
                        <span v-else>-</span>
                    </div>
                    <!--<div>8</div>-->
                </div>
                <div>
                    <div>运力归属</div>
                    <div>
                        <span v-if="receiveIntention.capacityCompany != null && receiveIntention.capacityCompany != ''">{{receiveIntention.capacityCompany.airlnCd}}</span>
                        <span v-else>-</span>
                    </div>
                    <!--<div>东方航空</div>-->
                </div>
                <div>
                    <div>运力基地</div>
                    <div>{{receiveIntention.capacityBaseNm || '-'}}</div>
                    <!--<div>成都双流</div>-->
                </div>
                <div>
                    <div>接受调度</div>
                    <div v-if="receiveIntention.scheduling === '0' && receiveIntention.airportForSchedulines != null">接受</div>
                    <div v-else>不接受</div>
                    <!--<div>华北地区</div>-->
                </div>
                <div class="tips" v-if="receiveIntention.scheduling === '0' && receiveIntention.airportForSchedulines != null">
                    <div>调度机场</div>
                    <div>
                        <span v-for="item in receiveIntention.airportForSchedulines" style="margin-right: 10px;">{{item.airlnCdName}}</span>
                    </div>
                </div>
                <div class="tips">
                    <div>其他说明</div>
                    <div>{{receiveIntention.remark}}</div>
                    <!--<div>其他说明其他说明其他说明其他说明其他说明</div>-->
                </div>
            </div>
        </div>
        <div class="second-show" v-if="secondShow">
            <div class="sixth item-container">
                <h2>收到的意向</h2>
                <span class="font-gray">已有<span style="font-weight: bold;color: #3c78ff;">{{userNum}}</span>位用户发起意向</span>
            </div>
            <div class="seventh item-container" v-show="isSelf && myData.demandprogress == 3">
                <span class="danger" v-show="myData.demandprogress == 3">*需求已下架，无法查看详细列表</span>
            </div>
        </div>
        <div class="tenth item-container danger" v-if="myData.demandstate == 5 || myData.demandProgress == 10">
            <span>原因：</span>
            <span>{{myData.rek}}</span>
        </div>
        <div class="third-show" v-if="thirdShow">
            <div class="eighth item-container">
                <div class="left font-gray">
                    收到时间
                </div>
                <div class="up-down" @click="timeUpDownClick">
                    <span class="icon-item icon-up" :class="{active: timeUpDown == true}">&#xe605;</span>
                    <span class="icon-item icon-down" :class="{active: timeUpDown == false}">&#xe605;</span>
                </div>
                <div class="right font-gray">
                    意向方
                </div>
            </div>
            <div class="ninth">
                <div class="nine-item" v-for="(item,index) in listData">
                    <div class="item-first">
                        <div class="left">{{item.responsedate}}</div>
                        <div class="center-left">{{item.intentionCompanyName}}</div>
                        <div class="center-right" @click="chat(item)">
                            <span class="icon-item" style="cursor:pointer;">&#xe602; <span class="reminder" v-show="item.unreadNum != 0 && item.unreadNum != null"></span></span>
                        </div>
                        <div style="width: 60px;margin-right: 80px;">{{responseProgressFn(item.responseProgress)}}</div>
                        <div v-if="checkDetailIndex !== index" class="right" style="color: #3c78ff; cursor: pointer;" @click="checkDetail(item,index)">查看详情</div>
                        <div v-else class="right" style="color: #3c78ff; cursor: pointer;" @click="checkDetailUp(item,index)">收起详情</div>
                    </div>
                    <div v-show="checkDetailIndex === index">
                        <div class="item-second">
                            <div class="start item">
                                <div class="item-a font-gray">始发<span v-show="item.dptState == 0">机场</span>
                                    <span v-show="item.dptState == 1">区域</span></div>
                                <div class="item-b">
                                    <h2>
                                        <span v-show="item.dptState == 0">{{item.dptNm}}</span>
                                        <span v-show="item.dptState == 1">{{item.dpt}}</span>
                                    </h2>
                                </div>
                                <div class="item-c font-gray" v-show="item.dptState === '0' && item.dptNm != null && item.dptNm != ''">
                                    <span v-if="item.dptAcceptnearairport === '0'">接受</span>
                                    <span v-else>不接受</span>临近机场
                                </div>
                                <div class="item-d font-gray" v-show="item.dptState === '0' && item.dptNm != null && item.dptNm != ''">出港资源</div>
                                <div class="item-e" v-show="item.dptState === '0' && item.dptNm != null && item.dptNm != ''">
                                    <span v-show="item.dptTimeresources == 0">{{item.dptTime}}</span>
                                    <span v-show="item.dptTimeresources == 1">待协调</span>
                                    <span v-show="item.dptTimeresources == 2">时刻充足</span>
                                </div>
                            </div>
                            <div class="item-icon">
                                <span class="icon-item">&#xe672;</span>
                            </div>
                            <div class="pass item">
                                <div class="item-a font-gray">经停
                                    <span v-show="item.pstState == 0">机场</span>
                                    <span v-show="item.pstState == 1">区域</span></div>
                                <div class="item-b">
                                    <h2>
                                        <span v-show="item.pstState == 0">{{item.pstNm}}</span>
                                        <span v-show="item.pstState == 1">{{item.pst}}</span>
                                    </h2>
                                </div>
                                <div class="item-c font-gray" v-show="item.pstState === '0' && item.pstNm != null && item.pstNm != ''">
                                    <span v-if="item.pstAcceptnearairport === '0'">接受</span>
                                    <span v-else>不接受</span>临近机场
                                </div>
                                <div class="item-d font-gray" v-show="item.pstState === '0' && item.pstNm != null && item.pstNm != ''">出港资源</div>
                                <div class="item-e" v-show="item.pstState === '0' && item.pstNm != null && item.pstNm != ''">
                                    <span v-show="item.pstTimeresources == 0">{{item.pstTime}}</span>
                                    <span v-show="item.pstTimeresources == 1">待协调</span>
                                    <span v-show="item.pstTimeresources == 2">时刻充足</span>
                                </div>
                            </div>
                            <div class="item-icon">
                                <span class="icon-item">&#xe672;</span>
                            </div>
                            <div class="arrive item">
                                <div class="item-a font-gray">到达
                                    <span v-show="item.arrvState == 0">机场</span>
                                    <span v-show="item.arrvState == 1">区域</span></div>
                                <div class="item-b">
                                    <h2>
                                        <span v-show="item.arrvState == 0">{{item.arrvNm}}</span>
                                        <span v-show="item.arrvState == 1">{{item.arrv}}</span>
                                    </h2>
                                </div>
                                <div class="item-c font-gray" v-show="item.arrvState === '0' && item.arrvNm != null && item.arrvNm != ''">
                                    <span v-if="item.arrvAcceptnearairport === '0'">接受</span>
                                    <span v-else>不接受</span>临近机场
                                </div>
                                <div class="item-d font-gray" v-show="item.arrvState === '0' && item.arrvNm != null && item.arrvNm != ''">出港资源</div>
                                <div class="item-e" v-show="item.arrvState === '0' && item.arrvNm != null && item.arrvNm != ''">
                                    <span v-show="item.arrvTimeresources == 0">{{item.arrvTime}}</span>
                                    <span v-show="item.arrvTimeresources == 1">待协调</span>
                                    <span v-show="item.arrvTimeresources == 2">时刻充足</span>
                                </div>
                            </div>
                        </div>
                        <div class="item-third">
                            <div class="items">
                                <div class="left item font-gray">
                                    <div>联系人</div>
                                    <div>拟开时间</div>
                                    <div>拟飞机型</div>
                                    <div>客量期望</div>
                                    <div>合作方式</div>
                                    <div>运力归属</div>
                                    <div>接受调度</div>
                                </div>
                                <div class="right item">
                                    <div class="item-a item-height">{{item.contact || '-'}}</div>
                                    <div class="item-a item-height">{{item.sailingtime || '-'}}</div>
                                    <div class="item-b item-height">{{item.aircrfttyp || '-'}}</div>
                                    <div class="item-c item-height">
                                        <span v-if="item.avgguestexpect != null && item.avgguestexpect != ''">{{item.avgguestexpect}}人/均班</span>
                                        <span v-else>-</span>
                                    </div>
                                    <div class="item-d item-height">{{subsidypolicyFn(item.subsidypolicyStr)}}</div>
                                    <div class="item-height">
                                        <span v-if="item.capacityCompany != null && item.capacityCompany != ''">{{item.capacityCompany.airlnCd}}</span>
                                        <span v-else>-</span>
                                    </div>
                                    <div class="item-height">
                                        <span v-if="item.scheduling === '0' && item.airportForSchedulines != null">接受</span>
                                        <span v-else>不接受</span>
                                    </div>
                                </div>
                            </div>
                            <div class="items">
                                <div class="left item font-gray">
                                    <div>联系方式</div>
                                    <div>拟开班期</div>
                                    <div>座位数</div>
                                    <div>客座率期望</div>
                                    <div>小时成本</div>
                                    <div>运力基地</div>
                                </div>
                                <div class="right item">
                                    <div class="item-height">{{item.ihome || '-'}}</div>
                                    <div class="item-height">{{item.days || '-'}}</div>
                                    <div class="item-height">{{item.seating || '-'}}</div>
                                    <div class="item-height">
                                        <span v-if="item.loadfactorsexpect != null && item.loadfactorsexpect != ''">{{item.loadfactorsexpect}}%</span>
                                        <span v-else>-</span>
                                    </div>
                                    <div class="item-height" style="display: flex;">
                                        <span v-if="item.hourscost != null && item.hourscost != ''">{{item.hourscost}}万元/小时</span>
                                        <span v-else>-</span>
                                    </div>
                                    <div class="item-height">{{item.capacityBaseNm || '-'}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="item-seventh" v-if="item.scheduling === '0' && item.airportForSchedulines != null">
                            <div class="left font-gray">调度机场</div>
                            <div class="right">
                                <span v-for="key in item.airportForSchedulines" style="margin-right: 10px;">{{key.airlnCdName}}</span>
                            </div>
                        </div>
                        <div class="item-fourth">
                            <div class="left font-gray">其他说明</div>
                            <div class="right">
                                {{item.remark}}
                            </div>
                        </div>
                        <div v-if="item.responseselected == '0'">
                            <div class="item-sixth" style="left: 150px;">
                                <div class="btn btn-w cancel-btn" style="width: 250px;">已生成订单，无法更改</div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="item-fifth" v-if="item.releaseselected === '1' && item.responseProgress !== '2'">
                                <div v-show="secondButtonShow && myData.demandprogress != 3" style="position: absolute; left: -130px; bottom: 50px;">
                                    <span class="danger" v-show="demandState6">*您还未缴纳意向金，缴纳后可选定该意向</span>
                                </div>
                                <button class="btn btn-disable" v-show="unPayMoneyShow">选定</button>
                                <button class="btn btn-b" v-show="!btnDisableShow && !unPayMoneyShow" @click="airlineAffirmFn(item,index)">选定</button>
                            </div>
                            <div class="item-sixth" v-if="item.releaseselected === '0'">
                                <button class="btn btn-w btn-change" @click="airlineAffirmFn2(item,index)">已选定（点击此处可再次编辑）</button>
                                <button class="btn btn-w btn-revocation" @click="airlineAffirmUnchooseFn(item,index)">撤销选定</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="first-button" v-if="firstButtonShow">
            <span style="width: 560px;height: 1px;background: black;"></span>
            <div class="buttons">
                <button class="btn btn-b" v-if="demand3BtnShow" @click="airlineWriteFn"><span class="icon-item">&#xe609;</span>我有意向</button>
                <button class="btn btn-w" v-if="isAlreadyCollect == false" @click="addCollectFn">收藏</button>
                <button class="btn btn-b" v-if="isAlreadyCollect == true" @click="cancelCollectFn" @mouseover="cancelCollectOver1Fn" @mouseout="cancelCollectOut1Fn" ref="cancelCollect1" style="width: 120px;">已收藏</button>
            </div>
        </div>
        <div class="second-button" v-if="secondButtonShow">
            <span style="width: 560px;height: 1px;background: #ccc;"></span>
            <div class="buttons">
                <button class="btn btn-b" @click="airlinePayFn" v-show="demandState6">点击此处缴纳意向金</button>
                <button class="btn btn-w" @click="endNeed">结束需求</button>
            </div>
        </div>
        <div class="myplan-buttons" v-if="myplanBtnShow && receiveIntention.responseProgress != 4 && myData.demandprogress != 3">
            <div v-if="receiveIntention.responseselected == '0'">
                <div class="buttons">
                    <div class="btn btn-w cancel-btn" style="width: 220px;">已生成订单，无法更改</div>
                    <div class="btn btn-w cancel-btn" v-show="isAlreadyCollect == false" @click="addCollectFn">收藏</div>
                    <div class="btn btn-b cancel-btn" v-show="isAlreadyCollect == true" @click="cancelCollectFn" @mouseover="cancelCollectOver2Fn" @mouseout="cancelCollectOut2Fn" ref="cancelCollect2" style="width: 120px;">已收藏</div>
                </div>
            </div>
            <div v-else>
                <div class="buttons" v-if="receiveIntention.releaseselected === '0'">
                    <div class="btn btn-w btn-b" @click="queRenClickFn">确认方案</div>
                    <div class="btn btn-w cancel-btn" @click="juJueFn">拒绝并撤回</div>
                </div>
                <div class="buttons" v-if="receiveIntention.releaseselected !== '0'
                        && (myData.demandprogress === '0' || myData.demandprogress == '1' || myData.demandprogress == '2')">
                    <button class="btn btn-b" v-if="receiveIntention.responseProgress == 2" @click="airlineWriteFn2">重新发起意向</button>
                    <div class="btn btn-w cancel-btn" v-else @click="deleteClickFn">取消意向</div>
                    <div class="btn btn-w cancel-btn" v-show="isAlreadyCollect == false" @click="addCollectFn">收藏</div>
                    <div class="btn btn-b cancel-btn" v-show="isAlreadyCollect == true" @click="cancelCollectFn" @mouseover="cancelCollectOver2Fn" @mouseout="cancelCollectOut2Fn" ref="cancelCollect2" style="width: 120px;">已收藏</div>
                </div>
            </div>
        </div>
        <div class="bottom" v-if="fifthButtonShow">
            <span style="width: 560px;height: 1px;background: #ccc;"></span>
            <div class="buttons">
                <button class="btn btn-w" @click="endNeed">结束需求</button>
            </div>
        </div>
        <div class="bottom" v-show="!fifthButtonShow
            && !(myplanBtnShow && receiveIntention.responseProgress != 4 && myData.demandprogress != 3)
            && !secondButtonShow && !firstButtonShow">
            <span style="width: 560px;height: 1px;background: #ccc;"></span>
            <div class="buttons">
                <div class="btn btn-w cancel-btn" v-show="isAlreadyCollect == false" @click="addCollectFn">收藏</div>
                <div class="btn btn-b cancel-btn" v-show="isAlreadyCollect == true" @click="cancelCollectFn" @mouseover="cancelCollectOver2Fn" @mouseout="cancelCollectOut2Fn" ref="cancelCollect2" style="width: 120px;">已收藏</div>
            </div>
        </div>
        <!--航司点击“我有意向”显示 运力表单-->
        <airlineWrite v-if="airlineWriteShow" :acceptData="myData" @change-showCode="changeShowCodeW" @close-this="closeAlWriteFn"></airlineWrite>

        <!--点击“重新发起意向”-->
        <airlineWrite2 v-if="airlineWrite2Show" :acceptData="receiveIntention" @change-showCode="changeShowCodeW" @close-this="closeAlWrite2Fn"></airlineWrite2>

        <!--航司点击 我发出的方案“编辑”显示 运力表单-->
        <myPurposeEdit v-if="myPurposeEditShow" :acceptData="receiveIntention" @refresh="refreshFn" @close-this="closeMyPurposeEdit"></myPurposeEdit>

        <!--机场点击 “选定”显示 运力表单-->
        <airlineAffirm v-if="airlineAffirmShow" :acceptData="airlineAffirmData" @close-this="closeAlAffirmFn" @change-showCode="changeShowCodeA"></airlineAffirm>

        <!--机场点击“重新发布”显示 航线表单-->
        <airlineReqWrapper v-if="airlineReqWrapperShow" :acceptData="myData" @refresh="refreshFn" @close-this="closeAirlineReqWrapper"></airlineReqWrapper>

        <!--<paySuccess v-show="paySuccessShow" @cancel="closePaySucssFn"></paySuccess>-->
        <airlinePay v-if="airlinePayShow" :airlinePayId="airlinePayId" @cancel="closeAlPayFn" @sure="changeShowCodeP"></airlinePay>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';

    import airlineWrite from '$src/page/components/airlineWrite.vue'
    import airlineWrite2 from '$src/page/components/airlineWrite2.vue'
    import airlineAffirm from '$src/page/components/airlineAffirm.vue'
    import myPurposeEdit from '$src/page/components/mine/myIntention/myPurposeEdit.vue'
    import airlineReqWrapper from '$src/page/components/airlineReqWrapper.vue'

    import paySuccess from '$src/page/components/trans_detail/paySuccess.vue'
    import airlinePay from '$src/page/components/trans_detail/dialog.vue'
    import calendarCP from '$src/page/components/publicTools/calendar/calendarCP.vue'

    export default {
        props:['mes'],
        data() {
            return {
                firstShow: false,
                secondShow: false,
                thirdShow: false,
                fourthShow: false,
                purposeDetailShow: false, //意向列表，点击展开意向详情
                firstButtonShow: false, //code为0时的按钮显示
                secondButtonShow: false,//code为1时的按钮显示

                /*新增的：我发出的方案*/
                myplanShow: false,     // 我发出的方案是否显示
                myplanBtnShow: false,  // 我发出的方案按钮显示
                receiveIntention: {}, //我发出的方案（只有isSelf为false时才有此参数，也就是只有航司登录时才有此参数）null、{}
                /************************/

                thirdButtonShow: false,
                fourthButtonShow: false,//code为1时的按钮显示
                fifthButtonShow: false, //委托代理

                airlineAffirmShow: false, // 发布方点击“选定”时，弹出“请确认以下方案”
                airlineReqWrapperShow: false, // 发布方点击“重新发布”弹出
                airlineWriteShow: false, // 意向方点击“我有意向”时，弹出“请填写完整方案”
                airlineWrite2Show: false, // "重新发起意向"
                myPurposeEditShow: false, // 意向方对我发出的方案，点击“编辑”时，弹出“请填写完整方案”

                airlinePayShow: false,   //组件“缴纳意向金”显示
                paySuccessShow: false,    //组件“缴纳完成”显示
                dialogShow: false,        //组件“缴纳意向金”显示
                showCode: '',

                userNum: '',  //发起意向的用户数量
                myData: {},  //获取的数据
                releaseTime: '',  //发布时间
                dptTime0: '',     //时刻资源
                dptTime1: '',
                pstTime0: '',
                pstTime1: '',
                sailingtime0: '',
                sailingtime1: '',
                periodValidity0: '',
                periodValidity1: '',
                isIntentionMoney: '',
                isSelf: '', // 是否是自己发布（我写的航线详情，只能机场发布，所以可以同过isSelf判断是哪个用户登陆）
                subsidypolicy: '',//合作方式
                listData: [],    //下方的列表详情
                id: '',
                checkDetailIndex: '', //点击“查看详情”对应的展开
                airlineAffirmUnchooseData: {}, //“撤销选定”发的对象
                /*日历*/
                calendarShow1: false,
                myDate1: '',
                demandState5: false, //"审核未通过"是否显示 demandState 0:正常,1:完成,2:异常,3:删除,4:未处理,5:审核不通过,6,审核通过
                demandState6: false, //是否为"审核通过"
                userNumShow: true, // 已有{{userNum}}位用户发起意向
                airlineAffirmData: {}, // 向airlineAffirm传递的对象
                airlnCd: '',            // 运力归属
                isAlreadyCollect: false, // 是否已收藏
                btnDisableShow: false,       // 禁止点击按钮
                btnDisableShowArry: [],    // 存储获取的releaseselected参数
                contactMsgShow: false,     // 发布方联系人、联系方式是否显示
                timeUpDown: true,          // 按时间排序样式
                timeUpDownOrderType: 0,    // 按时间排序传参  0:降序；1:升序
                opt: {          //发布有效期
                    start: '',
                    end: '',
                    isDis: false,
                },
                calendarInitDay3: '',
                calendarInitDay4: '',
                unPayMoneyShow: false,  // 未缴纳意向金时显示的无法点击的“选定”按钮
                airlinePayId: '',
                demand3BtnShow: true,
            }
        },
        watch: {
            'mes.demand': function () {
                this.creatFn();
            },
            timeUpDown: function () {
                this.timeUpDownOrderType = this.timeUpDown ? 0 : 1;
                this.timeUpDownAjax();
            },
            calendarInitDay3: function () {
                this.setOptFn();
            },
            calendarInitDay4: function () {
                this.setOptFn();
            },
        },
        created() {
            this.creatFn();

        },
        computed: {
            ...vx.mapGetters([
                'role'
            ])
        },
        methods: {
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
            creatFn: function () {
                this.id = this.mes.demand;
                this.getData();
                this.setOptFn();
            },
            /*双日历组件*/
            getDateRange: function (rd) {  // 发布有效期
                this.calendarInitDay3 = rd[0];
                this.calendarInitDay4 = rd[1];
            },
            setOptFn: function () {
                this.opt.start = this.calendarInitDay3;
                this.opt.end = this.calendarInitDay4;
            },
            // 通过“发布时间”排序
            timeUpDownAjax: function () {
                this.$ajax({
                    url: "/responseListOrder",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: {
                        demandId: this.id,
                        orderType: this.timeUpDownOrderType,  // 按时间排序传参  0:降序；1:升序
                    }
                }) .then((response) => {
                    if(response.data.opResult == 0) {
                        this.listData = response.data.responseList;   //获取意向列表
                    }else {
                        this.open8(`错误代码：${response.data.opResult}`);
                    }
                }) .catch((error) => {
                    console.log(error);
                });
            },
            timeUpDownClick: function () {
                this.timeUpDown = !this.timeUpDown;
            },
            // ajax获取的数据，并渲染
            getData: function () {
                this.$ajax({
                    method: 'post',
                    url: '/capacityRoutesDemandDetailFindById',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: {
                        demandId: this.id
                    }
                })
                    .then((response) => {
                        this.isSelf = response.data.isSelf;
                        this.isAlreadyCollect = response.data.isAlreadyCollect; // 是否收藏
                        this.receiveIntention = response.data.receiveIntention; // 获取我发布的数据(意向方数据)
                        this.isIntentionMoney = response.data.isIntentionMoneyForThisDemand;
                        this.userNum = response.data.intentionCount;
                        this.myData = response.data.data;
                        this.releaseTime = this.myData.releasetime.split(" ")[0];
                        this.dptTime0 = this.myData.dptTime;
                        this.periodValidity1 = this.myData.periodValidity.split('-')[1];
                        this.calendarInitDay3 = this.myData.periodValidity.split('-')[0];
                        this.calendarInitDay4 = this.myData.periodValidity.split('-')[1];
                        // 修改this.showCode
                        if(this.myData.demandstate == 5
                            || this.myData.demandprogress == 10) {  // “关闭”状态
                            this.showCode = 5;
                            this.show();
                        }else {
                            if (this.isSelf == true && this.isIntentionMoney == false) {
//                                console.info('payAfter:' + 1)
                                this.showCode = 1;
                                this.show();
                                this.listData = response.data.responseList;   //获取意向列表
                                this.unPayMoneyShow = true;
                            }if (this.isSelf == true && this.isIntentionMoney == true) {
//                                console.info('payAfter:' + 3)
                                this.showCode = 3;
                                this.show();
                                this.unPayMoneyShow = false;
                                if(this.myData.demandprogress == 4
                                    || this.myData.demandprogress == 5
                                    || this.myData.demandprogress == 6) { // 判断“结束需求”按钮是否显示
                                    this.fifthButtonShow = false;
                                }
                                this.listData = response.data.responseList;   //获取意向列表
                                this.btnDisableShowArry = [];
                                this.listData.forEach((v) => {
                                    if(v.releaseselected === '0') {
                                        this.btnDisableShowArry.push('0');
                                    }else {
                                        this.btnDisableShowArry.push('1');
                                    }
                                });
                                // 判断当中有没有已选定的 1：未选定，0：已选定
                                if(this.btnDisableShowArry.indexOf('0') == '-1') {
                                    this.btnDisableShow = false; // 显示“选定”按钮
                                }else{
                                    this.btnDisableShow = true;  // 不显示“选定”按钮
                                }
                            }if (this.isSelf == false && this.receiveIntention == null) { //我发出的方案为空，即没有发出方案
                                this.showCode = 0;
                                this.show();
                            }if (this.isSelf == false && this.receiveIntention != null) { //我发出的方案不为空，为发出方案的内容
                                this.showCode = 4;
                                this.show();
                            }
                            // 判断demandState是否通过（6）demandState  0:正常,1:完成,2:异常,3:删除,4:未处理,5:审核不通过,6,审核通过
                            if (this.myData.demandstate == 6) {
                                this.demandState6 = true;
                            }else {
                                this.demandState6 = false;
                            }
                            if(this.isSelf == true) {  //发布方联系人、联系方式是否显示
                                this.contactMsgShow = true;
                            }else {
                                if(this.receiveIntention != null) {
                                    this.contactMsgShow = true;
                                }else {
                                    this.contactMsgShow = false;
                                }
                            }
                            //  this.myData.demandprogress == 3  关闭（审核不通过、下架、过期）
                            if(this.myData.demandprogress == 3 && this.isSelf == true) {
                                this.thirdShow = false;
                                this.secondButtonShow = false;
                                this.demandState5 = true;
                            }else if(this.myData.demandprogress == 3 && this.isSelf == false) {
                                this.demand3BtnShow = false;
                            }
                        }
                    })
                    .catch((error) => {
                            console.log(error);
                        }
                    );
            },
            // 将补贴类型从数字变成汉字
            subsidypolicyFn: function (index) {
                if(index == '' || index == null){
                    return '-';
                }else {
                    return index;
                }
            },
            // 卡片新增功能：意向列表上添加状态信息
            // responseProgress：（0:意向征集、1:订单确认、2:已撤回、3:需求关闭、4:落选状态 5:交易完成,6:订单完成,7:佣金支付）
            responseProgressFn: function (index) {
                if(index == 0) {
                    return '意向征集';
                }else if(index == 1) {
                    return '订单确认';
                }else if(index == 2) {
                    return '已撤回';
                }else if(index == 3) {
                    return '需求关闭';
                }else if(index == 4) {
                    return '落选状态';
                }else if(index == 5) {
                    return '交易完成';
                }else if(index == 6) {
                    return '订单完成';
                }else if(index == 7) {
                    return '佣金支付';
                }else {
                    return '';
                    console.info('responseProgress状态为空！');
                }
            },
            // 聊天功能(传：demandEmployeeId（需求用户id）,employeeId（用户id）,id（此条意向id）)
            chat:function (item) {
                let chatObj = {};
                chatObj.demandEmployeeId = this.myData.employeeId;
                chatObj.id = this.myData.id;
                chatObj.employeeId = item.employeeId;
//                console.info(this.$store.getters.role.id)
                tabulationBoxTrigger.$emit('addChat',chatObj);
            },
            // “重新发布”按钮点击
            anewPublishClickFn: function () {
                this.myData.chongXinWeiTuo = '0';  // “重新发布”，弹出airlineReqWrapper 0: 不是委托，1: 是委托
                this.airlineReqWrapperShow = true;
            },
            // “发起对话”按钮点击,弹出对话框
            beginTalkClickFn: function () {
                let chatObj = {};
                chatObj.demandEmployeeId = this.myData.employeeId;
                chatObj.id = this.receiveIntention.demandId;
                chatObj.employeeId = this.receiveIntention.employeeId;
//                console.info(this.$store.getters.role.id)
                tabulationBoxTrigger.$emit('addChat',chatObj);
            },
            // 关闭
            closeAirlineReqWrapper: function () {
                this.airlineReqWrapperShow = false;
            },
            /*新增：我发出的方案*/
            // 关闭表单
            closeMyPurposeEdit: function () {
                this.myPurposeEditShow = false;
            },
            // 刷新页面
            refreshFn: function () {
                this.getData();
            },
            // 航司点击“编辑”,弹出表单
            EditFn: function () {
                this.myPurposeEditShow = true;
            },
            /*************/

            closeThisFn: function () {
//                this.$emit('closeThis')
//                this.mes.demandType = -1;
                this.$emit('closewindow');
            },
            // 点击“结束需求”按钮
            endNeed: function () {
                this.$ajax({
                    url: "/closeDemandById",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
//                    params: this.recallData
                    params: {
                        id: this.id,
                        closeReason: '下架'
                    }
                }) .then((response) => {
//                    console.info(response.data)
                    if(response.data.opResult === '0'){
                        this.open6(`成功结束该需求！`);
                        this.closeThisFn();
                    }else{
                        this.open8(`错误代码：${response.data.opResult}`);
                    }
//                    this.$store.dispatch('hybridData', response.data.list.list).then(() => {});
                }) .catch((error) => {
                    console.log(error);
                });
            },
            show: function () {
                this.demandState5 = false;
                this.userNumShow = false;
                this.firstShow = false;
                this.secondShow = false;
                this.thirdShow = false;
                this.firstButtonShow = false;
                this.secondButtonShow = false;
                this.fifthButtonShow = false;
                this.checkDetailIndex = ''; // 列表收起来
                this.myplanBtnShow = false;
                this.myplanShow = false;
                if (this.showCode == 0) {  //我发出的方案为空，即没有发出方案
                    this.userNumShow = true;
                    this.firstShow = true;
                    this.firstButtonShow = true;
                }if (this.showCode == 1) {  // 是自己发布 + 未缴纳意向金
                    this.userNumShow = true;
                    this.firstShow = true;
                    this.secondShow = true;
                    this.secondButtonShow = true;
                    this.thirdShow = true;
                }if (this.showCode == 3) {  // 是自己发布 + 已经缴纳意向金
                    this.userNumShow = true;
                    this.firstShow = true;
                    this.secondShow = true;
                    this.thirdShow = true;
                    this.fifthButtonShow = true;
                }if (this.showCode == 4) {     // 我发出的方案部分
                    this.userNumShow = true;
                    this.firstShow = true;
                    this.myplanBtnShow = true;
                    this.myplanShow = true;
                }if (this.showCode == 5) {     // 审核未通过展示的内容  “审核不通过”+“已拒绝”状态
                    this.demandState5 = true;
                    this.firstShow = true;
                }
            },
            // 日历
            editCalendarFn: function () {
                this.calendarShow1 = !this.calendarShow1;
            },
            getMyDate1: function () {//我发布的需求，修改有效期
                if (this.calendarInitDay3 && this.calendarInitDay4) {
                    this.periodValidity0 = this.calendarInitDay3 + "-" + this.calendarInitDay4;
                    this.calendarShow1 = false;
                    let editDate = {};
                    editDate.id = this.id;
                    editDate.periodValidity = this.periodValidity0;
                    this.$ajax({
                        url:"/demandUpdate",
                        method: 'post',
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded'
                        },
                        params: editDate
                    }) .then((response) => {
                        if(response.data.opResult === '0'){
                            this.open6(`有效期修改成功！`);
                            this.refreshFn();
                        }else{
                            this.open8(`错误代码：${response.data.opResult}`);
                        }
//                    this.$store.dispatch('hybridData', response.data.list.list).then(() => {});
                    }) .catch((error) => {
                        console.log(error);
                    });
                } else {
                }
            },
            // 点击“确认方案”
            queRenClickFn: function () {
                this.$ajax({
                    method: 'post',
                    url: '/selectedResponse',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: {
                        id: this.receiveIntention.id,
                        employeeId: this.receiveIntention.employeeId,
                        demandId: this.receiveIntention.demandId,
                        responseselected: '0',
                        releaseselected: '0'
                    }
                })
                    .then((response) => {
                        if(response.data.opResult == "0"){
//                        alert("确认方案成功！");
                            this.open6(`确认方案成功！`);
                            this.closeThisFn();
                        }
                    })
                    .catch((error) => {
                            console.log(error);
                        }
                    );
            },
            // 点击“拒绝并撤回”
            juJueFn: function () {
                this.$ajax({
                    method: 'post',
                    url: '/selectedResponse',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: {
                        id: this.receiveIntention.id,
                        employeeId: this.receiveIntention.employeeId,
                        demandId: this.receiveIntention.demandId,
                        responseselected: '1',
                        releaseselected: '0'
                    }
                })
                    .then((response) => {
                        if(response.data.opResult == "0"){
//                        alert("撤回方案成功！");
                            this.open6(`撤回方案成功！`);
                            this.closeThisFn();
                        }
                    })
                    .catch((error) => {
                            console.log(error);
                        }
                    );
            },
            // 航司点击“我有意向”，弹出airlineWrite：请填写完整方案
            airlineWriteFn: function () {
                this.myData.chongXinFaQi = '0';
                this.airlineWriteShow = true;
            },
            // "重新发起意向"，弹出airlineWrite：请填写完整方案,chongXinFaQi = 0:不是重新发起，chongXinFaQi = 1：是重新发起
            airlineWriteFn2: function () {
                this.receiveIntention.chongXinFaQi = '1';
                this.airlineWrite2Show = true;
            },
            // 航司点击“取消意向”
            deleteClickFn: function () {
                delete this.receiveIntention.airportForSchedulines;
                this.$ajax({
                    url: "/ResponseDel", // 取消意向
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: this.receiveIntention
                }).then((response) => {
                    if(response.data.opResult === '0'){
                        this.open6(`成功取消该意向！`);
                        this.closeThisFn();
                    }else{
                        this.open8(`错误代码：${response.data.opResult}`);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            // 点击“收藏”
            addCollectFn: function () {
                this.$ajax({
                    url:"/addCollect",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: {
                        demandIds: this.id
                    }
                }) .then((response) => {
                    if(response.data.opResult === '0'){
                        this.open6(`收藏成功！`);
                        this.refreshFn();
                    }else{
                        this.open8(`错误代码：${response.data.opResult}`);
                    }
                }) .catch((error) => {
                    console.log(error);
                });
            },
            // 取消收藏
            cancelCollectFn:function(){
                this.$ajax({
                    method: 'post',
                    url: '/delCollectByDemandId',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: {
                        demandId:this.id
                    }
                })
                    .then((response) => {
                        if(response.data.opResult === '0'){
                            this.open6(`取消收藏成功！`);
                            this.refreshFn();
                        }else{
                            this.open8(`错误代码：${response.data.opResult}`);
                        }
                    })
                    .catch((error) => {
                            console.log(error);
                        }
                    );
            },
            cancelCollectOver1Fn: function () {
                this.$refs.cancelCollect1.innerHTML = '取消收藏';
            },
            cancelCollectOut1Fn:function () {
                this.$refs.cancelCollect1.innerHTML = '已收藏';
            },
            cancelCollectOver2Fn: function () {
                this.$refs.cancelCollect2.innerHTML = '取消收藏';
            },
            cancelCollectOut2Fn:function () {
                this.$refs.cancelCollect2.innerHTML = '已收藏';
            },
            //点击“请填写完整方案”里的“提交意向”，this.showCode变成1
            changeShowCodeW: function () {
                this.refreshFn(); // 重新获取、渲染数据
            },
            //点击“缴纳意向金”，组件“缴纳意向金”显示
            airlinePayFn: function () {
                this.airlinePayShow = true;
                this.airlinePayId = this.id;
            },
            //点击“确认缴纳”，this.showCode变成2
            changeShowCodeP: function () {
//                this.paySuccessShow = true; //“缴纳完成”组件显示
                this.refreshFn();
            },
            //点击“选定”，组件“请确认以下方案”显示
            airlineAffirmFn: function (item,index) {
                this.airlineAffirmShow = true;
                item.index = index;
                this.airlineAffirmData = item;
                this.airlineAffirmData.stateNum = 1; //stateNum: 1:selectedResponse(选定)，2:updateResponseSelective(已选定-编辑)
//                console.info('item:')
//                console.info(item)
//                tabulationBoxTrigger.$emit('sendToAffirm',item) //向airlineAffirm.vue传递数据
            },
            // 点击“已选定”
            airlineAffirmFn2: function (item,index) {
                this.airlineAffirmShow = true;
                item.index = index;
                this.airlineAffirmData = item;
                this.airlineAffirmData.stateNum = 2; //stateNum: 1:selectedResponse(选定)，2:updateResponseSelective(已选定-编辑)
//                console.info('item:')
//                console.info(item)
//                tabulationBoxTrigger.$emit('sendToAffirm',item) //向airlineAffirm.vue传递数据
            },
            //点击弹出框“请确认以下方案”里的“确认选定该意向”，this.showCode变成3
            changeShowCodeA: function (index) {//发布者是否已选定 0:表示选定,1:表示未选定,确定显示的按钮是一个还是两个
                this.refreshFn(); // 重新获取数据
            },
            //点击“撤销选定”，showCode变成2状态
            airlineAffirmUnchooseFn: function (item,index) {
                this.airlineAffirmUnchooseData = item;
                delete this.airlineAffirmUnchooseData.airportForSchedulines;
                this.airlineAffirmUnchooseData.releaseselected = 1;
                this.airlineAffirmUnchooseData.responseselected = 1;
                this.airlineAffirmUnchooseData.id = item.id;
                this.airlineAffirmUnchooseData.employeeId = item.employeeId;
                this.airlineAffirmUnchooseData.demandId = item.demandId;
//                console.info(this.airlineAffirmUnchooseData);
                this.$ajax({
                    url:"/selectedResponse",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params:  this.airlineAffirmUnchooseData
                }) .then((response) => {
                    if(response.data.opResult === '0'){
                        this.open6(`成功撤销选定!`);
//                        this.btnDisableShow = false;
                        this.refreshFn();
                    }else{
                        this.open8(`错误代码：${response.data.opResult}`);
                    }
                }) .catch((error) => {
                    console.log(error);
                });
            },
            // 点击意向列表的“查看详情”
            checkDetail: function (item,index) {
                this.checkDetailIndex = '';
                this.checkDetailIndex = index;
                //发布者是否已选定 0:表示选定,1:表示未选定,确定显示的按钮是一个还是两个
            },
            //点击“收起详情”
            checkDetailUp: function (item,index) {
                this.checkDetailIndex = '';
//                this.checkDetailShow = true;
            },
            //父子组件间信息的传递，点击x号关闭组件
            closeAlWriteFn: function () {
                this.airlineWriteShow = false;
            },
            closeAlWrite2Fn: function () {
                this.airlineWrite2Show = false;
            },
            closeAlPayFn: function () {
                this.airlinePayShow = false;
            },
            closeAlAffirmFn: function () {
                this.airlineAffirmShow = false;
//                console.info('取消')
            },
        },
        components: {
            airlineWrite,
            airlineWrite2,
            airlineAffirm,
            paySuccess,
            airlinePay,
            myPurposeEdit,
            airlineReqWrapper,
            calendarCP,
        }
    }
</script>
<style lang="scss" scoped>
    [v-cloak] {
        display: none;
    }
    $icon-color: #3c78ff;
    $font-color: #605e7c;
    /*多行省略号，兼容多个浏览器*/
    @mixin line-clamp($lines, $line-height: 20px) {
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: $lines; // number of lines to show
        overflow: hidden;
        line-height: $line-height;
        max-height: $line-height * $lines;
    }

    /**************************/
    h2 {
        margin: 0;
        font-size: 18px;
        line-height: 20px;
    }

    .font-gray {
        color: rgba(96, 94, 124, 0.7);
    }

    .font-bold {
        font-weight: bold;
    }

    .danger {
        color: #FF9393;
    }

    .icon-item {
        position: relative;
        font-size: 1.6rem;
        font-family: iconfont;
        .reminder {
            position: absolute;
            top: 0;
            right: 0;
            width: 10px;
            height: 10px;
            background: red;
            border-radius: 100%;
        }
    }

    /*.btn-b {
        outline: none;
        border: 0;
    }

    .btn-w {
        outline: none;
    }*/

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
        z-index: 1;
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

        /*min-height: 600px;*/
        /*max-height: 700px;*/
    }

    .ald-container {
        position: absolute;
        top: 0px;
        right: 0px;
        /*padding-bottom: 100px;*/
        padding-bottom: 0;
        box-sizing: border-box;
        width: 600px;
        height: 100%;
        overflow-y: scroll;
        background: white;
        color: $font-color;
        font-size: 1.2rem;
        /*transform:translate(0,0);*/
        z-index: 100;
    }
    .ald-container::after {
        display: block;
        height: 100px;
        content: '';

    }

    .ald-container::-webkit-scrollbar {
        width: 7px;
    }

    .ald-container::-webkit-scrollbar-thumb {
        /*height: 56px;*/
        background: #D8D8D8;
        border-radius: 4px;
    }

    .item-container {
        display: flex;
        padding: 0 40px;
    }

    .first {
        position: fixed;
        top: 0;
        right: 0;
        justify-content: space-between;
        align-items: center;
        width: 520px;
        height: 41px;
        font-size: 12px;
        background: white;
        box-shadow: 0px 5px 15px rgba(216, 216, 216, 0.9);
        z-index: 10;
        .close-icon {
            position: absolute;
            right: 12px;
            top: 50%;
            margin-top: -11px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            border: 1px solid gray;
            border-radius: 100%;
            cursor: pointer;
        }
    }

    .second {
        position: relative;
        flex-direction: column;
        margin-top: 41px;
        height: 100px;
        background: rgba(216, 216, 216, .17);
        .sec-top {
            margin: 30px 0 15px 0;
            height: 25px;
            max-width: 400px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 20px;
            font-weight: bold;
        }
        .sec-bottom {
            margin-left: 3px;
        }
    }

    /*“重新发布”按钮*/
    .anew-publish {
        position: absolute;
        top: 25px;
        right: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 20px;
        color: white;
        border-radius: 20px;
        background: #3C78FF;
        cursor: pointer;
    }

    .third {
        position: relative;
        justify-content: space-between;
        margin: 20px 0;
        .item {
            width: 140px;
            height: 160px;
            .item-a {
                margin: 25px 0 10px 0;
            }
            .item-b {
                height: 20px;
                font-size: 20px;
            }
            .item-c {
                margin-bottom: 23px;
                height: 15px;
            }
            .item-d {
                margin-bottom: 5px;
                height: 15px;
            }
            .item-e {
                height: 15px;
            }
        }
        .item-icon {
            position: relative;
            > span {
                position: absolute;
                top: 55px;
                left: 50%;
                margin-left: -8px;
            }
        }
    }

    .fourth {
        justify-content: space-between;
        .items {
            display: flex;
            width: 240px;
            .item {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                >div {
                    display: flex;
                    align-items: center;
                    height: 40px;
                }
            }
            .left {
                width: 80px;
            }
            .right {
                width: 160px;
            }
        }
    }
    .myplan{
        margin-top: 35px;
        margin-bottom:140px;
        .table-form{
            width:100%;
            box-sizing:border-box;
            padding:60px 0 40px 40px;
            flex-wrap: wrap;
            display: flex;
            >div{
                width:240px;
                min-height:40px;
                display: flex;
                >div{
                    margin-bottom:20px;
                    /*height:20px;*/
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
        .plan-til{
            height:80px;
            width:100%;
            display:flex;
            justify-content: space-between;
            background-color:rgba(216,216,216,.2);
            >div:nth-of-type(1){
                font-size:2rem;
                color:#605E7C;
                font-weight:bold;
                height:80px;
                line-height:80px;
                padding-left:40px;
            }
            >div:nth-of-type(2){
                width:70px;
                height:26px;
                line-height:26px;
                margin: 25px 30px 29px 0;
                color:#605E7C;
                text-align: center;
                border-radius:100px;
                background-color:#fff;
            }
        }
        .airline{
            display:flex;
            padding-top:20px;
            margin: 0 40px;
            box-sizing:border-box;
            border-bottom:1px solid #ccc;
            >div:nth-of-type(odd){
                height:160px;
                width:140px;
            }
            >div:nth-of-type(even){
                height:120px;
                width:50px;
            }

        }
        .table-form{
            padding:40px 0 0 40px;
            .tips{
                width:100%;
                >div:nth-of-type(2){
                    width:440px;
                }
            }
        }
        .airplace{
            margin-top:20px;
            >div:nth-of-type(2){
                height:45px;
                font-size:2rem;
                font-weight:bold;
                padding-top:15px;
                >div:nth-of-type(2){
                    font-size:1rem;
                    font-weight:normal;
                }
            }
            .resouse{
                margin:20px 0;
            }
        }
    }
    .myplan-buttons{
        position: fixed;
        right: 20px;
        bottom: 0;
        width: 560px;
        border-top: 1px solid #ccc;
        background: white;
        .buttons{
            display: flex;
            justify-content: center;
            height:40px;
            margin-top:30px;
            margin-bottom: 43px;
            >div{
                height:40px;
                line-height:40px;
                font-size:1.5rem;
                color:#605E7C;
                background-color:#fff;
                text-align:center;
                border: 0;
                border-radius:100px;
                cursor:pointer;
            }
            .cancel-btn{
                width:100px;
                margin-right:14px;
            }
            .col-btn{
                width:80px;
            }
            .btn-b {
                margin-right: 14px;
                width: 150px;
                border-radius: 20px;
                /*color: white;
                background: #3c78ff;
                &:hover {
                    background: rgba(60, 120, 255, 0.7);
                }
                &:active {
                    background: #336bea;
                }*/
            }
            .col-btn2 {
                width: 150px;
            }
        }
    }
    .fifth {
        padding-top: 20px;
        /*height: 120px;*/
        min-height: 80px;
        max-height: 120px;
        .left {
            flex-shrink: 0;
            width: 80px;
            line-height: 20px;
        }
        .right {
            @include line-clamp(6);
        }
    }

    .sixth {
        flex-direction: column;
        margin: 20px 0;
        height: 100px;
        background: rgba(216, 216, 216, .17);
        h2 {
            margin: 30px 0 20px 0;
        }
        span {
            line-height: 12px;
        }
    }

    .seventh {
        margin-bottom: 40px;
    }

    .eighth {
        margin: 30px 0 25px 0;
        line-height: 20px;
        .left {
            width: 60px;
        }
        .up-down {
            position: relative;
            margin-right: 40px;
            width: 20px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            cursor: pointer;
            .active {
                color: $icon-color;
            }
            .icon-up {
                position: absolute;
                top: -4px;
                transform: rotate(180deg);
            }
            .icon-down {
                position: absolute;
                bottom: -4px;
            }
        }
        .right {
            width: 60px;
        }
    }

    .ninth {
        padding: 0 20px;
        .nine-item {
            position: relative;
            margin-bottom: 6px;
            /*padding-bottom: 95px;*/
            background: rgba(216, 216, 216, .17);
            .item-first {
                display: flex;
                align-items: center;
                padding: 0 20px;
                height: 59px;
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
                border-bottom: 1px solid #E4E4E4;
                .left {
                    margin-right: 40px;
                    width: 80px;
                    height: 15px;
                    overflow-y: hidden;
                }
                .center-left {
                    width: 80px;
                }
                .center-right {
                    margin-right: 80px;
                    width: 40px;
                    .icon-item {
                        font-size: 3.0rem;
                    }
                }
                .right {
                    width: 60px;
                    height: 58px;
                    line-height: 58px;
                }
            }
            .item-second {
                position: relative;
                display: flex;
                justify-content: space-between;
                margin: 20px 0;
                padding: 0 20px;
                .item {
                    width: 140px;
                    height: 160px;
                    .item-a {
                        margin: 25px 0 10px 0;
                    }
                    .item-b {
                        height: 20px;
                        font-size: 20px;
                    }
                    .item-c {
                        margin-bottom: 23px;
                        height: 15px;
                    }
                    .item-d {
                        margin-bottom: 5px;
                        height: 15px;
                    }
                    .item-e {
                        height: 15px;
                    }
                }
                .item-icon {
                    position: relative;
                    > span {
                        position: absolute;
                        top: 55px;
                        left: 50%;
                        margin-left: -8px;
                    }
                }
            }
            .item-third {
                display: flex;
                justify-content: space-between;
                padding: 0 20px;
                .items {
                    display: flex;
                    width: 240px;
                    .item {
                        line-height: 40px;
                    }
                    .left {
                        width: 80px;
                    }
                    .right {
                        width: 160px;
                        .item-height {
                            height: 40px;
                        }
                    }
                }
            }
            .item-seventh {
                display: flex;
                /*margin-bottom: 95px;*/
                padding: 11px 20px 0 20px;
                /*min-height: 40px;*/
                .left {
                    flex-shrink: 0;
                    width: 80px;
                    line-height: 20px;
                }
            }
            .item-fourth {
                display: flex;
                /*margin-bottom: 95px;*/
                padding: 20px 20px 95px 20px;
                height: 80px;
                .left {
                    flex-shrink: 0;
                    width: 80px;
                    line-height: 20px;
                }
                .right {
                    @include line-clamp(3);
                }
            }
            .item-fifth {
                position: absolute;
                left: 150px;
                bottom: 30px;
                display: flex;
                height: 28px;
                > .btn-b {
                    width: 250px;
                    border-radius: 20px;
                    /*color: white;
                    background: #3c78ff;
                    &:hover {
                        background: rgba(60, 120, 255, 0.7);
                    }
                    &:active {
                        background: #336bea;
                    }*/
                }
                > .btn-disable {
                    width: 250px;
                    border-radius: 20px;
                    color: #A6A6A6;
                    background: #cccccc;
                    outline: none;
                    border: 0;
                    /*&:hover {
                        background: rgba(60, 120, 255, 0.7);
                    }
                    &:active {
                        background: #336bea;
                    }*/
                }
            }
            .item-sixth {
                position: absolute;
                left: 100px;
                bottom: 30px;
                display: flex;
                height: 28px;
                > .btn-w {
                    border-radius: 20px;
                }
                .btn-change {
                    margin-right: 10px;
                    width: 250px;
                }
                .btn-revocation {
                    width: 100px;
                }
            }
        }
    }

    .tenth {
        position: absolute;
        bottom: 130px;
        @include line-clamp(3);
    }

    .first-button {
        position: fixed;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 600px;
        height: 100px;
        background: white;
        z-index: 2;
        .buttons {
            display: flex;
            margin-top: 18px;
            height: 40px;
            > .btn-b {
                margin-right: 14px;
                width: 230px;
                /*color: white;*/
                border-radius: 20px;
                /*background: #3c78ff;
                &:hover {
                    background: rgba(60, 120, 255, 0.7);
                }
                &:active {
                    background: #336bea;
                }*/
            }
            > .btn-w {
                width: 80px;
                border-radius: 20px;
            }
        }
    }

    .second-button {
        position: fixed;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        /*justify-content: center;*/
        align-items: center;
        width: 600px;
        height: 100px;
        background: white;
        z-index: 2;
        .buttons {
            display: flex;
            margin-top: 18px;
            /*margin-left: 90px;*/
            height: 40px;
            > .btn-b {
                margin-right: 14px;
                width: 300px;
                /*color: white;*/
                border-radius: 20px;
                /* background: #3c78ff;
                 &:hover {
                     background: rgba(60, 120, 255, 0.7);
                 }
                 &:active {
                     background: #336bea;
                 }*/
            }
            > .btn-w {
                width: 100px;
                border-radius: 20px;
            }
        }
    }

    .bottom {
        position: fixed;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        /*justify-content: center;*/
        width: 600px;
        height: 100px;
        background: white;
        z-index: 2;
        .buttons {
            display: flex;
            margin-top: 18px;
            /*margin-left: 140px;*/
            height: 40px;
            > .btn-b {
                margin-right: 14px;
                width: 200px;
                /*color: white;*/
                border-radius: 20px;
                /*background: #3c78ff;
                &:hover {
                    background: rgba(60, 120, 255, 0.7);
                }
                &:active {
                    background: #336bea;
                }*/
            }
            > .btn-w {
                width: 100px;
                border-radius: 20px;
            }
        }
    }
</style>
