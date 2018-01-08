<template>
    <div class="wrapper" @click.self="closeThisFn">
        <div class="ald-container">
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
                        <span class="font-gray">状态:　<span  v-if="demandState5 == true" style="color: red; font-weight: bold;">{{myData.demandprogressStr}}</span>
                            <span v-else><span style="color: #3F7AFF;font-weight: bold;">{{myData.demandprogressStr}}</span></span>
                        </span>
                        <div class="anew-publish" v-show="demandState5 == true && isSelf == true" @click="anewPublishClickFn">
                            重新发布
                        </div>
                    </div>
                </div>
                <div class="third item-container">
                    <div class="start item">
                        <div class="item-a font-gray">始发<span v-show="myData.dptState == 0">机场</span><span v-show="myData.dptState == 1">区域</span></div>
                        <div class="item-b"><h2>
                                <span v-show="myData.dptState == 0">{{myData.dptNm}}</span>
                                <span v-show="myData.dptState == 1">{{myData.dpt}}</span>
                            </h2>
                        </div>
                        <div class="item-c font-gray">
                            <span v-if="myData.dptAcceptnearairport === 0">接收</span>
                            <span v-else>不接收</span>临近机场</div>
                        <div class="item-d font-gray">出港资源</div>
                        <div class="item-e">
                            <span v-show="myData.dptTimeresources == 0">{{dptTime0}}</span>
                            <span v-show="myData.dptTimeresources == 1">待协调</span>
                            <span v-show="myData.dptTimeresources == 2">时刻充足</span>
                        </div>
                    </div>
                    <div class="item-icon">
                        <span class="icon-item">&#xe672;</span>
                    </div>
                    <div class="pass item">
                        <div class="item-a font-gray">经停<span v-show="myData.pstState == 0">机场</span><span v-show="myData.pstState == 1">区域</span></div>
                        <div class="item-b"><h2>
                                <span v-show="myData.pstState == 0">{{myData.pstNm}}</span>
                                <span v-show="myData.pstState == 1">{{myData.pst}}</span>
                            </h2>
                        </div>
                        <div class="item-c font-gray">&nbsp;<!--此处有空格--></div>
                        <div class="item-d font-gray">出港资源</div>
                        <div class="item-e">
                            <span v-show="myData.pstTimeresources == 0">{{pstTime0}}-{{pstTime1}}</span>
                            <span v-show="myData.pstTimeresources == 1">待协调</span>
                            <span v-show="myData.pstTimeresources == 2">时刻充足</span>
                        </div>
                    </div>
                    <div class="item-icon">
                        <span class="icon-item">&#xe672;</span>
                    </div>
                    <div class="arrive item">
                        <div class="item-a font-gray">到达<span v-show="myData.arrvState == 0">机场</span><span v-show="myData.arrvState == 1">区域</span></div>
                        <div class="item-b"><h2>
                                <span v-show="myData.arrvState == 0">{{myData.arrvNm}}</span>
                                <span v-show="myData.arrvState == 1">{{myData.arrv}}</span>
                            </h2>
                        </div>
                        <!--下方有空格-->
                        <div class="item-c font-gray">&nbsp;<!--此处有空格--></div>
                        <div class="item-d font-gray">&nbsp;<!--此处有空格--></div>
                        <div class="item-e">&nbsp;<!--此处有空格--></div>
                    </div>
                </div>
                <div class="fourth item-container">
                    <div class="items">
                        <div class="left item font-gray">
                            <div>联系人</div>
                            <div>拟开时间</div>
                            <div>拟飞机型</div>
                            <div>客量期望</div>
                            <div>补贴政策</div>
                        </div>
                        <div class="right item">
                            <div class="item-a">{{myData.contact}}</div>
                            <div class="item-a">{{sailingtime0}}-{{sailingtime1}}</div>
                            <div class="item-b">{{myData.aircrfttyp}}</div>
                            <div class="item-c">{{myData.loadfactorsexpect}}人/均班</div>
                            <div class="item-d">{{subsidypolicyFn(myData.subsidypolicy)}}</div>
                            <!--<div>有补贴</div>-->
                        </div>
                    </div>
                    <div class="items">
                        <div class="left item font-gray">
                            <div>联系方式</div>
                            <div>拟开班期</div>
                            <div>座位数</div>
                            <div>客座率期望</div>
                            <div>有效期</div>
                        </div>
                        <div class="right item">
                            <div class="item-a">{{myData.iHome}}</div>
                            <div class="item-a">{{myData.days}}</div>
                            <div class="item-b">{{myData.seating}}</div>
                            <div class="item-c">{{myData.loadfactorsexpect}}%</div>
                            <div class="item-d" style="display: flex; position: relative;">{{periodValidity1}}止
                                <span class="icon-item" v-show="secondShow" @click="editCalendarFn" style="cursor:pointer;">&#xe653;</span>
                                <div v-show="calendarShow1" class="calendar-box popup" style="top: 26px; left: -370px;">
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
                    <div>我发出的方案</div>
                    <div @click="EditFn" v-show="receiveIntention.releaseselected == 1" style="cursor:pointer;"><span class="iconfont" style="font-size:1.6rem;">&#xe653;</span>编辑</div>
                </div>
                <div class="airline">
                    <div class="airplace">
                        <div>始发<span v-show="receiveIntention.dptState == 0">机场</span>
                            <span v-show="receiveIntention.dptState == 1">区域</span>
                        </div>
                        <div>
                            <div v-if="receiveIntention.dptState == 0">{{receiveIntention.dptNm}}</div>
                            <div v-else-if="receiveIntention.dptState == 1">{{receiveIntention.dpt}}</div>
                            <!--<div>成都双流</div>-->
                            <div>
                                <span v-if="receiveIntention.dptAcceptnearairport === 0">接收</span>
                                <span v-else>不接收</span>临近机场
                            </div>
                        </div>
                        <div class="resouse">
                            <div>出港资源</div>
                            <div>{{receiveIntention.dptTime}}</div>
                            <!--<div>08:00-12:00</div>-->
                        </div>
                    </div>
                    <div style="padding-top:60px;"><span class="iconfont">&#xe672;</span></div>
                    <div class="airplace">
                        <div>经停<span v-show="receiveIntention.pstState == 0">机场</span>
                            <span v-show="receiveIntention.pstState == 1">区域</span>
                        </div>
                        <div v-if="receiveIntention.pstState == 0">{{receiveIntention.pstNm}}</div>
                        <div v-else-if="receiveIntention.pstState == 1">{{receiveIntention.pst}}</div>
                        <!--<div>北京南苑</div>-->
                        <div class="resouse">
                            <div>出港资源</div>
                            <div>{{receiveIntention.pstTime}}</div>
                            <!--<div>待协调</div>-->
                        </div>
                    </div>
                    <div style="padding-top:60px;"><span class="iconfont">&#xe672;</span></div>
                    <div class="airplace">
                        <div>到达<span v-show="receiveIntention.arrvState == 0">机场</span>
                            <span v-show="receiveIntention.arrvState == 1">区域</span>
                        </div>
                        <div v-if="receiveIntention.arrvState == 0">{{receiveIntention.arrvNm}}</div>
                        <div v-else-if="receiveIntention.arrvState == 1">{{receiveIntention.arrv}}</div>
                        <!--<div>华北地区</div>-->
                        <div class="resouse">
                            <div>出港资源</div>
                            <div>{{receiveIntention.arrvTime}}</div>
                            <!--<div></div>-->
                        </div>
                    </div>
                </div>
                <div class="table-form">
                    <div>
                        <div>联系人</div>
                        <div>{{receiveIntention.contact}}</div>
                        <!--<div>2017.11.11-2018.11.11</div>-->
                    </div>
                    <div>
                        <div>联系方式</div>
                        <div>{{receiveIntention.ihome}}</div>
                        <!--<div>2017.11.11-2018.11.11</div>-->
                    </div>
                    <div>
                        <div>拟开时间</div>
                        <div>{{receiveIntention.sailingtime}}</div>
                        <!--<div>2017.11.11-2018.11.11</div>-->
                    </div>
                    <div>
                        <div>拟开班期</div>
                        <!--<div>{{receiveIntention.days}}</div>-->
                        <div>待定</div>
                    </div>
                    <div>
                        <div>拟开机型</div>
                        <div>{{receiveIntention.aircrfttyp}}</div>
                        <!--<div>AA222</div>-->
                    </div>
                    <div>
                        <div>座位数</div>
                        <!--<div>{{receiveIntention.seating}}</div>-->
                        <div>180</div>
                    </div>
                    <div>
                        <div>客量预期</div>
                        <div>{{receiveIntention.avgguestexpect}}</div>
                        <!--<div>80</div>-->
                    </div>
                    <div>
                        <div>客座率预期</div>
                        <div>{{receiveIntention.loadfactorsexpect}}</div>
                        <!--<div>80%</div>-->
                    </div>
                    <div>
                        <div>补贴政策</div>
                        <div>{{subsidypolicyFn(receiveIntention.subsidypolicy)}}</div>
                        <!--<div>按人头</div>-->
                    </div>
                    <div>
                        <div>小时成本</div>
                        <div>{{receiveIntention.hourscost}}</div>
                        <!--<div>8</div>-->
                    </div>
                    <div>
                        <div>运力归属</div>
                        <div>
                            <span v-if="receiveIntention.capacityCompany != null">{{receiveIntention.capacityCompany.airlnCd}}</span>
                        </div>
                        <!--<div>东方航空</div>-->
                    </div>
                    <div>
                        <div>运力基地</div>
                        <div>{{receiveIntention.capacityBaseNm}}</div>
                        <!--<div>成都双流</div>-->
                    </div>
                    <div>
                        <div>是否调度</div>
                        <div v-if="receiveIntention.scheduling === '0'">{{receiveIntention.airportForSchedulines[0].airlnCdName}}</div>
                        <div v-else>否</div>
                        <!--<div>华北地区</div>-->
                    </div>
                    <div class="tips">
                        <div>其他说明</div>
                        <div>{{receiveIntention.remark}}</div>
                        <!--<div>其他说明其他说明其他说明其他说明其他说明</div>-->
                    </div>
                </div>
            </div>
            <div class="second-show" v-show="secondShow">
                <div class="sixth item-container">
                    <h2>收到的意向</h2>
                    <span class="font-gray">已有<span style="font-weight: bold;color: #3c78ff;">{{userNum}}</span>位用户发起意向</span>
                </div>
                <div class="seventh item-container" v-show="secondButtonShow">
                    <span class="danger" v-show="demandState6">*您还未缴纳意向金，缴纳后可查看详细列表</span>
                </div>
            </div>
            <!--<div class="seventh item-container">
                <span class="danger">*拒绝原因</span>
                <span class="line"></span>
            </div>-->
            <div class="third-show" v-show="thirdShow">

                <div class="eighth item-container">
                    <div class="left font-gray">
                        收到时间
                    </div>
                    <div class="up-down">
                        <span class="icon-item icon-up active">&#xe605;</span>
                        <span class="icon-item icon-down">&#xe605;</span>
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
                                <span class="icon-item" style="cursor:pointer;">&#xe602; <span class="reminder" v-show="item.unreadNum != 0"></span></span>
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
                                    <div class="item-b"><h2>
                                        <span v-show="item.dptState == 0">{{item.dptNm}}</span>
                                        <span v-show="item.dptState == 1">{{item.dpt}}</span>
                                    </h2>
                                    </div>
                                    <div class="item-c font-gray">
                                        <span v-if="item.dptAcceptnearairport === 0">接收</span>
                                        <span v-else>不接收</span>临近机场</div>
                                    <div class="item-d font-gray">出港资源</div>
                                    <div class="item-e">
                                        <span v-show="item.dptTimeresources == 0">{{item.dptTime}}</span>
                                        <span v-show="item.dptTimeresources == 1">待协调</span>
                                        <span v-show="item.dptTimeresources == 2">时刻充足</span>
                                    </div>
                                </div>
                                <div class="item-icon">
                                    <span class="icon-item">&#xe672;</span>
                                </div>
                                <div class="pass item">
                                    <div class="item-a font-gray">经停<span v-show="item.pstState == 0">机场</span>
                                        <span v-show="item.pstState == 1">区域</span></div>
                                    <div class="item-b"><h2>
                                        <span v-show="item.pstState == 0">{{item.pstNm}}</span>
                                        <span v-show="item.pstState == 1">{{item.pst}}</span>
                                    </h2>
                                    </div>
                                    <div class="item-c font-gray">&nbsp;<!--此处有空格--></div>
                                    <div class="item-d font-gray">出港资源</div>
                                    <div class="item-e">
                                        <span v-show="item.pstTimeresources == 0">{{item.pstTime}}</span>
                                        <span v-show="item.pstTimeresources == 1">待协调</span>
                                        <span v-show="item.pstTimeresources == 2">时刻充足</span>
                                    </div>
                                </div>
                                <div class="item-icon">
                                    <span class="icon-item">&#xe672;</span>
                                </div>
                                <div class="arrive item">
                                    <div class="item-a font-gray">到达<span v-show="item.arrvState == 0">机场</span>
                                        <span v-show="item.arrvState == 1">区域</span></div>
                                    <div class="item-b"><h2>
                                        <span v-show="item.arrvState == 0">{{item.arrvNm}}</span>
                                        <span v-show="item.arrvState == 1">{{item.arrv}}</span>
                                    </h2>
                                    </div>
                                    <!--下方有空格-->
                                    <div class="item-c font-gray">&nbsp;<!--此处有空格--></div>
                                    <div class="item-d font-gray">&nbsp;<!--此处有空格--></div>
                                    <div class="item-e">&nbsp;<!--此处有空格--></div>
                                </div>
                            </div>
                            <div class="item-third">
                                <div class="items">
                                    <div class="left item font-gray">
                                        <div>联系人</div>
                                        <div>拟开时间</div>
                                        <div>拟飞机型</div>
                                        <div>客量期望</div>
                                        <div>补贴政策</div>
                                        <div>运力归属</div>
                                        <div>是否调度</div>
                                    </div>
                                    <div class="right item">
                                        <div class="item-a item-height">{{item.contact}}</div>
                                        <div class="item-a item-height">{{item.sailingtime}}</div>
                                        <div class="item-b item-height">{{item.aircrfttyp}}</div>
                                        <div class="item-c item-height">{{item.loadfactorsexpect}}人/均班</div>
                                        <div class="item-d item-height">{{subsidypolicyFn(item.subsidypolicy)}}</div>
                                        <div class="item-height">
                                            <span v-if="item.capacityCompany != null">{{item.capacityCompany.airlnCd}}</span>
                                        </div>
                                        <div class="item-height">
                                            <span v-if="item.scheduling === '0'">{{item.airportForSchedulines[0].airlnCdName}}</span>
                                            <span v-else>否</span>
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
                                        <div class="item-height">{{item.ihome}}</div>
                                        <div class="item-height">{{item.days}}</div>
                                        <div class="item-height">{{item.seating}}</div>
                                        <div class="item-height">{{item.loadfactorsexpect}}%</div>
                                        <div class="item-height" style="display: flex;">{{item.hourscost}}万元/小时</div>
                                        <div class="item-height">{{item.capacityBaseNm}}</div>
                                    </div>
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
                                <div class="item-fifth" v-if="releaseselectedShow">
                                    <button class="btn btn-b" @click="airlineAffirmFn(item,index)">选定</button>
                                </div>
                                <div class="item-sixth" v-else>
                                    <button class="btn btn-w btn-change" @click="airlineAffirmFn2(item,index)">已选定（点击此处可再次编译）</button>
                                    <button class="btn btn-w btn-revocation" @click="airlineAffirmUnchooseFn(item,index)">撤销选定</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="first-button" v-show="firstButtonShow">
                <span style="width: 560px;height: 2px;background: black;"></span>
                <div class="buttons">
                    <button class="btn btn-b" @click="airlineWriteFn"><span class="icon-item">&#xe609;</span>我有意向</button>
                    <button class="btn btn-w" @click="addCollectFn">收藏</button>
                </div>
            </div>
            <div class="second-button" v-show="secondButtonShow">
                <div class="buttons">
                    <button class="btn btn-b" @click="airlinePayFn" v-show="demandState6">点击此处缴纳意向金</button>
                    <button class="btn btn-w" @click="endNeed">结束需求</button>
                </div>
            </div>
            <div class="myplan-buttons" v-if="myplanBtnShow">
                <div v-if="receiveIntention.responseselected == '0'">
                    <div class="buttons">
                        <div class="btn btn-w cancel-btn" style="width: 220px;">已生成订单，无法更改</div>
                    </div>
                </div>
                <div v-else>
                    <div class="buttons" v-if="receiveIntention.releaseselected == '0'">
                        <div class="btn btn-w btn-b" @click="queRenClickFn">确认方案</div>
                        <div class="btn btn-w cancel-btn" @click="juJueFn">拒绝并撤回</div>
                    </div>
                    <div class="buttons" v-else>
                        <div class="btn btn-w cancel-btn" @click="deleteClickFn">取消意向</div>
                        <div class="btn btn-w col-btn" @click="addCollectFn">收藏</div>
                    </div>
                </div>

            </div>
            <div class="bottom" v-show="fifthButtonShow">
                <div class="buttons">
                    <!--<button class="btn btn-b" @click="entrustFn(),closeThisFn()">委托代理</button>-->
                    <button class="btn btn-w" @click="endNeed">结束需求</button>
                </div>
            </div>
            <!--航司点击“我有意向”显示 运力表单-->
            <airlineWrite v-if="airlineWriteShow" :acceptData="myData" @change-showCode="changeShowCodeW" @close-this="closeAlWriteFn"></airlineWrite>

            <!--航司点击 我发出的方案“编辑”显示 运力表单-->
            <myPurposeEdit v-if="myPurposeEditShow" :acceptData="receiveIntention" @refresh="refreshFn" @close-this="closeMyPurposeEdit"></myPurposeEdit>

            <!--机场点击 “选定”显示 运力表单-->
            <airlineAffirm v-if="airlineAffirmShow" :acceptData="airlineAffirmData" @close-this="closeAlAffirmFn" @change-showCode="changeShowCodeA"></airlineAffirm>

            <!--机场点击“重新发布”显示 航线表单-->
            <airlineReqWrapper v-if="airlineReqWrapperShow" :acceptData="myData" @refresh="refreshFn" @close-this="closeAirlineReqWrapper"></airlineReqWrapper>

            <paySuccess v-show="paySuccessShow" @cancel="closePaySucssFn"></paySuccess>
            <airlinePay v-show="airlinePayShow" @cancel="closeAlPayFn" @sure="changeShowCodeP"></airlinePay>
        </div>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';

    import airlineWrite from '$src/page/components/airlineWrite.vue'
    import airlineAffirm from '$src/page/components/airlineAffirm.vue'
    import myPurposeEdit from '$src/page/components/mine/myIntention/myPurposeEdit.vue'
    import airlineReqWrapper from '$src/page/components/airlineReqWrapper.vue'

    import paySuccess from '$src/page/components/trans_detail/paySuccess.vue'
    import airlinePay from '$src/page/components/trans_detail/dialog.vue'
    import calendar from '$src/page/components/calendar'

    export default {
        props:['sendDataToMyPurpose'],
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
                myPurposeEditShow: false, // 意向方对我发出的方案，点击“编辑”时，弹出“请填写完整方案”

                airlinePayShow: false,   //组件“缴纳意向金”显示
                paySuccessShow: false,    //组件“缴纳完成”显示
                dialogShow: false,        //组件“缴纳意向金”显示
                showCode: '', //0,1,2,3对应firstShow，secondShow，thirdShow，fourthShow

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
                subsidypolicy: '',//补贴政策
                listData: [],    //下方的列表详情
                id: '',
                checkDetailIndex: '', //点击“查看详情”对应的展开
                releaseselectedShow: true,  //发布者是否已选定 0:表示选定,1:表示未选定
                airlineAffirmUnchooseData: {}, //“撤销选定”发的对象
                /*日历*/
                calendarInitDay1: '', //日历
                calendarInitDay2: '',
                calendarShow1: false,
                myDate1: '',
                demandState5: false, //"审核未通过"是否显示 demandState 0:正常,1:完成,2:异常,3:删除,4:未处理,5:审核不通过,6,审核通过
                demandState6: false, //是否为"审核通过"
                userNumShow: true, // 已有{{userNum}}位用户发起意向
                airlineAffirmData: {}, // 向airlineAffirm传递的对象
                airlnCd: '',            // 运力归属
            }
        },
        created() {
            let val = this.sendDataToMyPurpose;
            this.id = val.demandId;
            if (val.demand.demandtype == 0) {
                this.getData();
            }
            tabulationBoxTrigger.$on('responseListToPayAfter',(val) => { //获取意向列表（监听了两个事件：airlineDetailPayAfter和dialog（已废弃）两个文件的）
                this.listData = val;   //获取意向列表
            })
        },
        computed: {
            ...vx.mapGetters([
                'role'
            ])
        },
        methods: {
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
//                    console.info('response:')
//                    console.info(response)
//                            console.info(response.data.responseList)
                    this.isSelf = response.data.isSelf;
                    this.receiveIntention = response.data.receiveIntention; // 获取我发布的数据(意向方数据)
                    this.isIntentionMoney = response.data.isIntentionMoneyForThisDemand;
//                            this.intentionCount = response.data.intentionCount;
//                            this.detailData = response.data.data;
//                            this.listData = response.data.responseList;   //获取意向列表
                    this.userNum = response.data.intentionCount;
                    this.myData = response.data.data;
                    this.releaseTime = this.myData.releasetime.split(" ")[0];
//                            this.dptTime0 = this.myData.dptTime.split(',')[0];
//                            this.dptTime1 = this.myData.dptTime.split(',')[1];
                    this.dptTime0 = this.myData.dptTime;
                    this.pstTime0 = this.myData.pstTime.split(',')[0];
                    this.pstTime1 = this.myData.pstTime.split(',')[1];
                    this.sailingtime0 = this.myData.sailingtime.split(',')[0];
                    this.sailingtime1 = this.myData.sailingtime.split(',')[1];
//                    this.periodValidity0 = this.myData.periodValidity;
//                    this.periodValidity0 = this.myData.periodValidity.split(',')[0];
                    this.periodValidity1 = this.myData.periodValidity.split(',')[1];
                    if (this.myData.subsidypolicy == 0) {
                        this.subsidypolicy = '定补'
                    }
                    if (this.myData.subsidypolicy == 1) {
                        this.subsidypolicy = '保底'
                    }
                    if (this.myData.subsidypolicy == 2) {
                        this.subsidypolicy = '人头补'
                    }
                    if (this.myData.subsidypolicy == 3) {
                        this.subsidypolicy = '待议'
                    }
                    if (this.myData.subsidypolicy == 3) {
                        this.subsidypolicy = '无补贴'
                    }
                    // 修改this.showCode
                    if(this.myData.demandstate == 5 || this.myData.demandstate == 3 || this.myData.demandprogress == 3 || this.myData.demandprogress == 10) {
                        this.showCode = 5; // “关闭”状态
                    }else {
                        if (this.isSelf == true && this.isIntentionMoney == false) {
//                                console.info('payAfter:' + 1)
                            this.showCode = 1;
                        }if (this.isSelf == true && this.isIntentionMoney == true) {
//                                console.info('payAfter:' + 3)
                            this.showCode = 3;
                            tabulationBoxTrigger.$emit('responseListToPayAfter',response.data.responseList) //向airlineDetailPayAfter的意向列表传参数
                        }if (this.isSelf == false && this.receiveIntention == null) { //我发出的方案为空，即没有发出方案
//                        console.info('000000')
                            this.showCode = 0;
                        }if (this.isSelf == false && this.receiveIntention != null) { //我发出的方案不为空，为发出方案的内容
//                        console.info('payAfter:' + 4)
                            this.showCode = 4;
                        }
                        // 判断demandState是否通过（6）demandState  0:正常,1:完成,2:异常,3:删除,4:未处理,5:审核不通过,6,审核通过
                        if (this.myData.demandstate == 6) {
                            this.demandState6 = true;
                        }else {
                            this.demandState6 = false;
                        }
                    }
//                    this.showCode = 5; // 模拟“关闭”状态
                    this.show();
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
            },
            // 将补贴类型从数字变成汉字
            subsidypolicyFn: function (index) {
                if(index === '0'){
                    return '定补';
                }else if(index === '1') {
                    return '保底';
                }else if(index === '2') {
                    return '人头补';
                }else if(index === '3') {
                    return '待议';
                }else if(index === '4') {
                    return '无补贴';
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
                this.airlineReqWrapperShow = true;
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
                this.$emit('close-this')
            },
            // 点击“结束需求”按钮
            endNeed: function () {
                this.$ajax({
                    url: "closeDemandById",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
//                    params: this.recallData
                    params: {
                        id: this.id
                    }
                }) .then((response) => {
//                    console.info(response.data)
                    if(response.data.opResult === '0'){
                        alert('成功结束该需求！');
                        this.$emit('refresh')
                        this.closeThisFn();
                    }else{
                        alert('错误代码：' + response.data.opResult)
                    }
//                    this.$store.dispatch('hybridData', response.data.list.list).then(() => {});
                }) .catch((error) => {
                    console.log(error);
                });
            },
            show: function () {
                if (this.showCode === 0) {
                    this.demandState5 = false;
                    this.userNumShow = true;
                    this.firstShow = true;
                    this.secondShow = false;
                    this.thirdShow = false;
                    this.firstButtonShow = true;
                    this.secondButtonShow = false;
//                    this.thirdButtonShow = false;
//                    this.fourthButtonShow = false;
                    this.fifthButtonShow = false;
                    this.checkDetailIndex = ''; // 列表收起来
                    this.myplanBtnShow = false;
                    this.myplanShow = false;
                }if (this.showCode === 1) {
                    this.demandState5 = false;
                    this.userNumShow = true;
                    this.firstShow = true;
                    this.secondShow = true;
                    this.thirdShow = false;
                    this.firstButtonShow = false;
                    this.secondButtonShow = true;
//                    this.thirdButtonShow = false;
//                    this.fourthButtonShow = false;
                    this.fifthButtonShow = false;
                    this.checkDetailIndex = ''; // 列表收起来
                    this.myplanBtnShow = false;
                    this.myplanShow = false;
                }if (this.showCode === 2) {
                    this.demandState5 = false;
                    this.userNumShow = true;
                    this.firstShow = true;
                    this.secondShow = true;
                    this.thirdShow = true;
                    this.firstButtonShow = false;
                    this.secondButtonShow = false;
//                    this.thirdButtonShow = true;
//                    this.fourthButtonShow = false;
                    this.fifthButtonShow = true;
                    this.checkDetailIndex = ''; // 列表收起来
                    this.myplanBtnShow = false;
                    this.myplanShow = false;
                }if (this.showCode === 3) {
                    this.demandState5 = false;
                    this.userNumShow = true;
                    this.firstShow = true;
                    this.secondShow = true;
                    this.thirdShow = true;
                    this.firstButtonShow = false;
                    this.secondButtonShow = false;
//                    this.thirdButtonShow = false;
//                    this.fourthButtonShow = true;
                    this.fifthButtonShow = true;
                    this.checkDetailIndex = ''; // 列表收起来
                    this.myplanBtnShow = false;
                    this.myplanShow = false;
                }if (this.showCode === 4) {     // 我发出的方案部分
                    this.demandState5 = false;
                    this.userNumShow = true;
                    this.firstShow = true;
                    this.secondShow = false;
                    this.thirdShow = false;
                    this.firstButtonShow = false;
                    this.secondButtonShow = false;
//                    this.thirdButtonShow = false;
//                    this.fourthButtonShow = true;
                    this.fifthButtonShow = false;
                    this.checkDetailIndex = ''; // 列表收起来
                    this.myplanBtnShow = true;
                    this.myplanShow = true;
                }if (this.showCode === 5) {     // 审核未通过展示的内容
                    this.demandState5 = true;
                    this.userNumShow = false;
                    this.firstShow = true;
                    this.secondShow = false;
                    this.thirdShow = false;
                    this.firstButtonShow = false;
                    this.secondButtonShow = false;
//                    this.thirdButtonShow = false;
//                    this.fourthButtonShow = true;
                    this.fifthButtonShow = false;
                    this.checkDetailIndex = ''; // 列表收起来
                    this.myplanBtnShow = false;
                    this.myplanShow = false;
                }
            },
            // 日历
            editCalendarFn: function () {
                this.calendarShow1 = true;
            },
            getDate1: function (d) {//获取组件返回的日期
                this.calendarInitDay1 = d.split('-').join('.');
            },
            getDate2: function (d) {
                this.calendarInitDay2 = d.split('-').join('.');
            },
            getMyDate1: function () {//我发布的需求，修改有效期
                if (this.calendarInitDay1 && this.calendarInitDay2) {
                    this.periodValidity0 = this.calendarInitDay1 + "-" + this.calendarInitDay2;
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
//                        console.info('1response:')
//                        console.info(response)
                        if(response.data.opResult === '0'){
                            alert('有效期修改成功！')
                        }else{
                            alert('错误代码：' + response.data.opResult)
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
                        alert("确认方案成功！");
                        this.$emit('refresh');
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
                        alert("撤回方案成功！");
                        this.$emit('refresh');
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
                this.airlineWriteShow = true;
            },
            // 航司点击“取消意向”
            deleteClickFn: function () {
                this.$ajax({
                    url: "/ResponseDel", // 取消意向
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: this.receiveIntention
                }).then((response) => {
//                    console.info('response:')
//                    console.info(response)
                    if(response.data.opResult === '0'){
                        alert('成功取消该意向！');
                        this.$emit('refresh');
                        this.closeThisFn();
                    }else{
                        alert('错误代码：' + response.data.opResult)
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
//                    console.info('collect:')
//                    console.info(response)
                    if(response.data.opResult === '0'){
                        alert('收藏成功！')
                    }else{
                        alert('错误代码：'+ response.data.opResult)
                    }
//                    this.$store.dispatch('hybridData', response.data.list.list).then(() => {});
                }) .catch((error) => {
                    console.log(error);
                });
            },
            //点击“请填写完整方案”里的“提交意向”，this.showCode变成1
            changeShowCodeW: function () {
//                this.showCode = 1;
//                this.show();
                this.refreshFn(); // 重新获取、渲染数据
            },
            //点击“缴纳意向金”，组件“缴纳意向金”显示
            airlinePayFn: function () {
                this.airlinePayShow = true;
                tabulationBoxTrigger.$emit('responseText',this.id)//向dialog.vue传入响应Id
            },
            //点击“确认缴纳”，this.showCode变成2
            changeShowCodeP: function () {
                this.paySuccessShow = true; //“缴纳完成”组件显示
                /*this.showCode = 2;
                this.show();*/
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
            changeShowCodeA: function (index) {
                this.showCode = 3;
                this.show();
                this.refreshFn(); // 重新获取数据
                //发布者是否已选定 0:表示选定,1:表示未选定,确定显示的按钮是一个还是两个
                this.releaseselectedShow = false; //显示两个按钮
            },
            //点击“撤销选定”，showCode变成2状态
            airlineAffirmUnchooseFn: function (item,index) {
                this.airlineAffirmUnchooseData = item;
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
//                    console.info(response)
                    if(response.data.opResult === '0'){
                        alert('成功撤销选定!');
                        this.releaseselectedShow = true;
                        this.showCode = 2;
                        this.show();
                        this.refreshFn();
                    }else{
                        alert('错误代码：' + response.data.opResult);
                    }
//                    this.$store.dispatch('hybridData', response.data.list.list).then(() => {});
                }) .catch((error) => {
                    console.log(error);
                });
            },
            // 点击意向列表的“查看详情”
            checkDetail: function (item,index) {
                this.checkDetailIndex = '';
                this.checkDetailIndex = index;
//                console.info('item:')
//                console.info(item)
                //发布者是否已选定 0:表示选定,1:表示未选定,确定显示的按钮是一个还是两个
                if(item.releaseselected == 0){
                    this.releaseselectedShow = false;
//                    console.info(0)
                }else {
                    this.releaseselectedShow = true;
//                    console.info(1)
                }
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
            closeAlPayFn: function () {
                this.airlinePayShow = false;
            },
            closeAlAffirmFn: function () {
                this.airlineAffirmShow = false;
//                console.info('取消')
            },
            closePaySucssFn: function () {
                this.paySuccessShow = false;
            },
        },
        components: {
            airlineWrite,
            airlineAffirm,
            paySuccess,
            airlinePay,
            calendar,
            myPurposeEdit,
            airlineReqWrapper,
        }
    }
</script>
<style lang="scss" scoped>
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

    .btn-b {
        outline: none;
        border: 0;
    }

    .btn-w {
        outline: none;
    }

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
        box-shadow: 0 5px 11px rgba(85, 85, 85, .1);
    }

    /*********/

    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .4);
        z-index: 30;
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
        position: relative;
        justify-content: space-between;
        align-items: center;
        height: 41px;
        font-size: 12px;
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
        height: 100px;
        background: rgba(216, 216, 216, .17);
        .sec-top {
            margin: 30px 0 15px 0;
            height: 25px;
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
                color: white;
                background: #3c78ff;
                &:hover {
                    background: rgba(60, 120, 255, 0.7);
                }
                &:active {
                    background: #336bea;
                }
            }
            .col-btn2 {
                width: 150px;
            }
        }
    }
    .fifth {
        padding-top: 20px;
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
            /*user-select:none;*/
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
                border-bottom: 2px solid $font-color;
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
                    color: white;
                    background: #3c78ff;
                    &:hover {
                        background: rgba(60, 120, 255, 0.7);
                    }
                    &:active {
                        background: #336bea;
                    }
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
                color: white;
                border-radius: 20px;
                background: #3c78ff;
                &:hover {
                    background: rgba(60, 120, 255, 0.7);
                }
                &:active {
                    background: #336bea;
                }
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
        justify-content: center;
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
                color: white;
                border-radius: 20px;
                background: #3c78ff;
                &:hover {
                    background: rgba(60, 120, 255, 0.7);
                }
                &:active {
                    background: #336bea;
                }
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
        justify-content: center;
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
                color: white;
                border-radius: 20px;
                background: #3c78ff;
                &:hover {
                    background: rgba(60, 120, 255, 0.7);
                }
                &:active {
                    background: #336bea;
                }
            }
            > .btn-w {
                width: 100px;
                border-radius: 20px;
            }
        }
    }
</style>
