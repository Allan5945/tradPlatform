<template>
    <div class="ald-container">
        <div class="first-show" v-show="firstShow">
            <div class="first item-container">
                <span class="font-gray">需求详情</span>
                <span class="close-icon">&times;</span>
            </div>
            <div class="second item-container">
                <div class="sec-top">
                    {{myData.title}}航线需求
                </div>
                <div class="sec-bottom font-gray">
                    <span style="margin-right: 40px;">创建于{{releaseTime}}</span><span>已有{{userNum}}位用户发起意向</span>
                </div>
            </div>
            <div class="third item-container">
                <div class="start item">
                    <div class="item-a font-gray">始发<span v-show="myData.dptState == 0">机场</span><span v-show="myData.dptState == 1">区域</span></div>
                    <div class="item-b"><h2>{{myData.dpt}}</h2></div>
                    <div class="item-c font-gray">{{myData.dptAcceptnearairportStr}}临近机场</div>
                    <div class="item-d font-gray">出港资源</div>
                    <div class="item-e">
                        <span v-show="myData.dptTimeresources == 0">{{dptTime0}}-{{dptTime1}}</span>
                        <span v-show="myData.dptTimeresources == 1">待协调</span>
                        <span v-show="myData.dptTimeresources == 2">时刻充足</span>
                    </div>
                </div>
                <div class="item-icon">
                    <span class="icon-item">&#xe672;</span>
                </div>
                <div class="pass item">
                    <div class="item-a font-gray">经停<span v-show="myData.pstState == 0">机场</span><span v-show="myData.pstState == 1">区域</span></div>
                    <div class="item-b"><h2>北京南苑</h2></div>
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
                    <div class="item-b"><h2>华北地区</h2></div>
                    <!--下方有空格-->
                    <div class="item-c font-gray">&nbsp;<!--此处有空格--></div>
                    <div class="item-d font-gray">&nbsp;<!--此处有空格--></div>
                    <div class="item-e">&nbsp;<!--此处有空格--></div>
                </div>
            </div>
            <div class="fourth item-container">
                <div class="items">
                    <div class="left item font-gray">
                        <div>拟开时间</div>
                        <div>拟飞机型</div>
                        <div>客量期望</div>
                        <div>补贴政策</div>
                    </div>
                    <div class="right item">
                        <div class="item-a">{{sailingtime0}}-{{sailingtime1}}</div>
                        <div class="item-b">{{myData.aircrfttyp}}</div>
                        <div class="item-c">{{myData.loadfactorsexpect}}人/均班</div>
                        <div class="item-d">{{myData.subsidypolicyStr}}</div>
                        <!--<div>有补贴</div>-->
                    </div>
                </div>
                <div class="items">
                    <div class="left item font-gray">
                        <div>拟开班期</div>
                        <div>座位数</div>
                        <div>客座率期望</div>
                        <div>有效期</div>
                    </div>
                    <div class="right item">
                        <div class="item-a">{{myData.days}}</div>
                        <div class="item-b">{{myData.seating}}</div>
                        <div class="item-c">{{myData.loadfactorsexpect}}%</div>
                        <div class="item-d" style="display: flex;">{{periodValidity0}}-{{periodValidity1}} <span class="icon-item" v-show="secondShow">&#xe653;</span></div>
                    </div>
                </div>
            </div>

        </div>

        <div class="second-show" v-show="secondShow">
            <div class="fifth item-container">
                <div class="left font-gray">其他说明</div>
                <div class="right">其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                    其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                    其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                </div>
            </div>
            <div class="sixth item-container">
                <h2>收到的意向</h2>
                <span class="font-gray">已有<span style="font-weight: bold;color: #3c78ff;">2</span>位用户发起意向</span>
            </div>
            <div class="seventh item-container" v-show="secondButtonShow">
                <span class="danger">*您还未缴纳意向金，缴纳后可查看详细列表</span>
            </div>
        </div>

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
                <div class="nine-item">
                    <div class="item-first">
                        <div class="left">11.04.2017</div>
                        <div class="center-left">南方航空</div>
                        <div class="center-right">
                            <span class="icon-item">&#xe602; <span class="reminder"></span></span>
                        </div>
                        <div class="right" @click="purposeDetailShow = !purposeDetailShow" style="color: #3c78ff; cursor: pointer;">查看详情</div>
                    </div>
                    <div v-show="purposeDetailShow">
                        <div class="item-second">
                            <div class="start item">
                                <div class="item-a">始发机场</div>
                                <div class="item-b"><h2>成都双流</h2></div>
                                <div class="item-c">接受临近机场</div>
                                <div class="item-d">出港资源</div>
                                <div class="item-e">08:00-12:00</div>
                            </div>
                            <div class="item-icon">
                                <span class="icon-item">&#xe672;</span>
                            </div>
                            <div class="pass item">
                                <div class="item-a">经停机场</div>
                                <div class="item-b"><h2>北京南苑</h2></div>
                                <div class="item-c">&nbsp;<!--此处有空格--></div>
                                <div class="item-d">出港资源</div>
                                <div class="item-e">带协调</div>
                            </div>
                            <div class="item-icon">
                                <span class="icon-item">&#xe672;</span>
                            </div>
                            <div class="arrive item">
                                <div class="item-a">到达区域</div>
                                <div class="item-b"><h2>华北地区</h2></div>

                                <!--下方有空格-->
                                <div class="item-c">&nbsp;<!--此处有空格--></div>
                                <div class="item-d">&nbsp;<!--此处有空格--></div>
                                <div class="item-e">&nbsp;<!--此处有空格--></div>
                            </div>
                        </div>
                        <div class="item-third">
                            <div class="items">
                                <div class="left item font-gray">
                                    <div>拟开时间</div>
                                    <div>拟飞机型</div>
                                    <div>客量期望</div>
                                    <div>补贴政策</div>
                                    <div>运力归属</div>
                                    <div>是否调度</div>
                                </div>
                                <div class="right item">
                                    <div class="item-height">2017.11.11-2018.11.11</div>
                                    <div class="item-height">AA2222</div>
                                    <div class="item-height">80人/均班</div>
                                    <div class="item-height">按人头</div>
                                    <div class="item-height">东方航空</div>
                                    <div class="item-height">华北地区</div>
                                </div>
                            </div>
                            <div class="items">
                                <div class="left item font-gray">
                                    <div>拟开班期</div>
                                    <div>座位数</div>
                                    <div>客座率期望</div>
                                    <div>小时成本</div>
                                    <div>运力基地</div>
                                </div>
                                <div class="right item">
                                    <div class="item-height">待定</div>
                                    <div class="item-height">180</div>
                                    <div class="item-height">80%</div>
                                    <div class="item-height">8万元/小时</div>
                                    <div class="item-height">成都双流</div>
                                </div>
                            </div>
                        </div>
                        <div class="item-fourth">
                            <div class="left font-gray">其他说明</div>
                            <div class="right">其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                                其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                                其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                            </div>
                        </div>
                        <div class="item-fifth">
                            <button class="btn btn-b" v-show="thirdButtonShow" @click="airlineAffirmFn">选定</button>
                        </div>
                        <div class="item-sixth" v-show="fourthButtonShow">
                            <button class="btn btn-w btn-change" @click="airlineAffirmFn">已选定（点击此次可再次编译）</button>
                            <button class="btn btn-w btn-revocation" @click="airlineAffirmUnchooseFn">撤销选定</button>
                        </div>
                    </div>
                </div>
               <!-- <div class="nine-item">
                    <div class="item-first">
                        <div class="left">11.04.2017</div>
                        <div class="center-left">南方航空</div>
                        <div class="center-right">
                            <span class="icon-item">&#xe602; <span class="reminder"></span></span>
                        </div>
                        <div class="right" style="color: #3c78ff; cursor:pointer;">查看详情</div>
                    </div>

                    <div>
                        <div class="item-second">
                            <div class="start item">
                                <div class="item-a">始发机场</div>
                                <div class="item-b"><h2>成都双流</h2></div>
                                <div class="item-c">接受临近机场</div>
                                <div class="item-d">出港资源</div>
                                <div class="item-e">08:00-12:00</div>
                            </div>
                            <div class="item-icon">
                                <span class="icon-item">&#xe672;</span>
                            </div>
                            <div class="pass item">
                                <div class="item-a">经停机场</div>
                                <div class="item-b"><h2>北京南苑</h2></div>
                                <div class="item-c">&nbsp;&lt;!&ndash;此处有空格&ndash;&gt;</div>
                                <div class="item-d">出港资源</div>
                                <div class="item-e">带协调</div>
                            </div>
                            <div class="item-icon">
                                <span class="icon-item">&#xe672;</span>
                            </div>
                            <div class="arrive item">
                                <div class="item-a">到达区域</div>
                                <div class="item-b"><h2>华北地区</h2></div>

                                &lt;!&ndash;下方有空格&ndash;&gt;
                                <div class="item-c">&nbsp;&lt;!&ndash;此处有空格&ndash;&gt;</div>
                                <div class="item-d">&nbsp;&lt;!&ndash;此处有空格&ndash;&gt;</div>
                                <div class="item-e">&nbsp;&lt;!&ndash;此处有空格&ndash;&gt;</div>
                            </div>
                        </div>
                        <div class="item-third">
                            <div class="items">
                                <div class="left item font-gray">
                                    <div>拟开时间</div>
                                    <div>拟飞机型</div>
                                    <div>客量期望</div>
                                    <div>补贴政策</div>
                                    <div>运力归属</div>
                                    <div>是否调度</div>
                                </div>
                                <div class="right item">
                                    <div>2017.11.11-2018.11.11</div>
                                    <div>AA2222</div>
                                    <div>80人/均班</div>
                                    <div>按人头</div>
                                    <div>东方航空</div>
                                    <div>华北地区</div>
                                </div>
                            </div>
                            <div class="items">
                                <div class="left item font-gray">
                                    <div>拟开班期</div>
                                    <div>座位数</div>
                                    <div>客座率期望</div>
                                    <div>小时成本</div>
                                    <div>运力基地</div>
                                </div>
                                <div class="right item">
                                    <div>待定</div>
                                    <div>180</div>
                                    <div>80%</div>
                                    <div>8万元/小时</div>
                                    <div>成都双流</div>
                                </div>
                            </div>
                        </div>
                        <div class="item-fourth">
                            <div class="left font-gray">其他说明</div>
                            <div class="right">其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                                其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                                其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                            </div>
                        </div>
                        <div class="item-fifth">
                            <button class="btn btn-b" v-show="thirdButtonShow" @click="airlineAffirmFn">选定</button>
                        </div>
                        <div class="item-sixth" v-show="fourthButtonShow">
                            <button class="btn btn-w btn-change" @click="airlineAffirmFn">已选定（点击此次可再次编译）</button>
                            <button class="btn btn-w btn-revocation" @click="airlineAffirmUnchooseFn">撤销选定</button>
                        </div>
                    </div>
                </div>
           -->
            </div>
        </div>
        <div class="first-button" v-show="firstButtonShow">
            <span style="width: 560px;height: 2px;background: black;"></span>
            <div class="buttons">
                <button class="btn btn-b" @click="airlineWriteFn"><span class="icon-item">&#xe609;</span>我有意向</button>
                <button class="btn btn-w">收藏</button>
            </div>
        </div>
        <div class="second-button" v-show="secondButtonShow">
            <div class="buttons">
                <button class="btn btn-b" @click="airlinePayFn">点击此处缴纳意向金</button>
                <button class="btn btn-w">结束需求</button>
            </div>
        </div>

        <div class="bottom" v-show="fifthButtonShow">
            <div class="buttons">
                <button class="btn btn-b">委托代理</button>
                <button class="btn btn-w">结束需求</button>
            </div>
        </div>
        <airlineWrite v-show="airlineWriteShow" @close-this="closeAlWriteFn" @change-showCode="changeShowCodeW" :acceptData="myData"></airlineWrite>
        <!--<airlinePay v-show="airlinePayShow" @close-this="closeAlPayFn" @change-showCode="changeShowCodeP"></airlinePay>-->
        <airlineAffirm v-show="airlineAffirmShow" @close-this="closeAlAffirmFn" @change-showCode="changeShowCodeA"></airlineAffirm>
        <paySuccess v-show="paySuccessShow" @cancel="closePaySucssFn"></paySuccess>
        <airlinePay v-show="airlinePayShow" @cancel="closeAlPayFn" @sure="changeShowCodeP"></airlinePay>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';

    import airlineWrite from './airlineWrite.vue'
//    import airlinePay from './airlinePay.vue'
    import airlineAffirm from './airlineAffirm.vue'
    import paySuccess from './trans_detail/paySuccess.vue'
    import airlinePay from './trans_detail/dialog.vue'
    export default {
        data() {
            return {
                firstShow: false,
                secondShow: false,
                thirdShow: false,
                fourthShow: false,
                purposeDetailShow: false, //意向列表，点击展开意向详情
                firstButtonShow: false, //code为0时的按钮显示
                secondButtonShow: false,//code为1时的按钮显示
                thirdButtonShow: false,
                fourthButtonShow: false,//code为1时的按钮显示
                fifthButtonShow: false, //委托代理
                airlineWriteShow: false, //组件“请填写完整方案”显示
                airlinePayShow: false,   //组件“缴纳意向金”显示
                airlineAffirmShow: false, //组件“请确认以下方案”显示
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
                periodValidity1: ''
                /**************参数对应的模板***********/
                /*user: '', //联系人
                phoneNum: '', //电话号码
                firArea: '', //始发地 1的意向区域
                secArea: '', //经停地 2的意向区域
                thirdArea: '', //到达地 3的意向区域
                areaInput1: '', //输入的机场或区域
                areaInput2: '', //输入的机场或区域
                areaInput3: '',
                typeChoose: '', //选中的机型
                airType: [], //机型
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
                inputRadio: '&#xe622;',
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
                subsidyList: ['保底','定补','按人头']*/
            }
        },
        mounted(){
//            this.initData();
            //模拟状态码0
            this.showCode = 0;
            tabulationBoxTrigger.$on('getClickData', val => {
                console.log("demandtype"+val.demandType);
                if(val.demandType == 0){
                    this.$ajax({
                        method: 'post',
                        url: '/capacityRoutesDemandDetailFindById',
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded'
                        },
                        params: {
                            demandId: val.demandId
                        }
                    })
                        .then((response) => {
//                            this.isIntentionMoney = response.data.isIntentionMoney;
//                            this.intentionCount = response.data.intentionCount;
//                            this.detailData = response.data.data;
                            this.userNum = response.data.intentionCount
                            this.myData = response.data.data;
                            this.releaseTime = this.myData.releasetime.split(" ")[0];
                            this.dptTime0 = this.myData.dptTime.split(',')[0];
                            this.dptTime1 = this.myData.dptTime.split(',')[1];
                            this.pstTime0 = this.myData.dptTime.split(',')[0];
                            this.pstTime1 = this.myData.dptTime.split(',')[1];
                            this.sailingtime0 = this.myData.dptTime.split(',')[0];
                            this.sailingtime1 = this.myData.dptTime.split(',')[1];
                            this.periodValidity0 = this.myData.dptTime.split(',')[0];
                            this.periodValidity1 = this.myData.dptTime.split(',')[1];
                        })
                        .catch((error) => {
                                console.log(error);
                            }
                        );
//                    this.transShow = true;
                };
            });
            this.show();
        },
        computed: {},
        methods: {
            initData: function () {
                this.$ajax({
                    url:"/capacityRoutesDemandDetailFindById",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: {
                        demandId: 78
                    }
                }) .then((response) => {
//                    console.info(response.data)
//                    this.userNum = response.data.intentionCount
//                    this.myData = response.data.data;
//                    this.releaseTime = this.myData.releasetime.split(" ")[0];
//                    this.dptTime0 = this.myData.dptTime.split(',')[0];
//                    this.dptTime1 = this.myData.dptTime.split(',')[1];
//                    this.pstTime0 = this.myData.dptTime.split(',')[0];
//                    this.pstTime1 = this.myData.dptTime.split(',')[1];
//                    this.sailingtime0 = this.myData.dptTime.split(',')[0];
//                    this.sailingtime1 = this.myData.dptTime.split(',')[1];
//                    this.periodValidity0 = this.myData.dptTime.split(',')[0];
//                    this.periodValidity1 = this.myData.dptTime.split(',')[1];
//                    this.$store.dispatch('airlineData', response.data.data).then(() => {});
                })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            show: function () {
                if(this.showCode === 0) {
                    this.firstShow = true;
                    this.firstButtonShow = true;
                    this.secondButtonShow = false;
                    this.thirdButtonShow = false;
                    this.fourthButtonShow = false;
                    this.fifthButtonShow = false;
                }if(this.showCode === 1) {
                    this.firstShow = true;
                    this.secondShow = true;
                    this.firstButtonShow = false;
                    this.secondButtonShow = true;
                    this.thirdButtonShow = false;
                    this.fourthButtonShow = false;
                    this.fifthButtonShow = false;
                }if(this.showCode === 2) {
                    this.firstShow = true;
                    this.secondShow = true;
                    this.thirdShow = true;
                    this.firstButtonShow = false;
                    this.secondButtonShow = false;
                    this.thirdButtonShow = true;
                    this.fourthButtonShow = false;
                    this.fifthButtonShow = true;
                }if(this.showCode === 3) {
                    this.firstShow = true;
                    this.secondShow = true;
                    this.thirdShow = true;
                    this.firstButtonShow = false;
                    this.secondButtonShow = false;
                    this.thirdButtonShow = false;
                    this.fourthButtonShow = true;
                    this.fifthButtonShow = true;
                }
            },
            //点击“我有意向”，组件“请填写完整方案”显示
            airlineWriteFn: function () {
                this.airlineWriteShow = true;
            },
            //点击“请填写完整方案”里的“提交意向”，this.showCode变成1
            changeShowCodeW: function () {
                this.showCode = 1;
                this.show();
            },
            //点击“缴纳意向金”，组件“缴纳意向金”显示
            airlinePayFn: function () {
                this.airlinePayShow = true;
            },
            //点击“确认缴纳”，this.showCode变成2
            changeShowCodeP: function () {
                this.paySuccessShow = true; //“缴纳完成”组件显示
                this.showCode = 2;
                this.show();
            },
            //点击“选定”，组件“请确认以下方案”显示
            airlineAffirmFn: function () {
                this.airlineAffirmShow = true;
            },
            //点击“请确认以下方案”里的“确认选定该意向”，this.showCode变成3
            changeShowCodeA: function () {
                this.showCode = 3;
                this.show();
            },
            //点击“撤销选定”，showCode变成2状态
            airlineAffirmUnchooseFn: function () {
                this.showCode = 2;
                this.show();
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
            },
            closePaySucssFn: function () {
                this.paySuccessShow = false;
            },
            //此方法只是参考参数的名字，无其他用处
            submitData: function () {
                /*let sendData = {};
                sendData.contact = this.user;
                sendData.iHome = this.phoneNum;
                sendData.dpt = this.firArea;
                sendData.pst = this.secArea;
                sendData.arrv = this.thirdArea;
                sendData.sailingtime = this.sailingtime;      //起止时间
                sendData.days = this.scheduleShow;
                sendData.aircrfttyp = this.typeChoose;
                sendData.seating = this.seatingNum;
                sendData.avgguestexpect = this.avgguestExpect;
                sendData.loadfactorsexpect = this.loadfactorsExpect;
                sendData.subsidypolicy = this.subsidyCode;
                sendData.blockbidprice = this.blockbidPrice;
                sendData.remark = this.remarkMsg;
                sendData.periodValidity = this.periodValidity; //需求发布有效期
                sendData.publicwayStr = this.publicwayStrCode;//公开方式
                sendData.dptAcceptnearairport = this.dptAcceptnearairport;
                sendData.pstAcceptnearairport = this.pstAcceptnearairport;
                sendData.arrvAcceptnearairport = this.arrvAcceptnearairport;*/
            },
        },
        components: {
            airlineWrite,
//            airlinePay,
            airlineAffirm,
            paySuccess,
            airlinePay
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


    .wrapper {

        /*min-height: 600px;*/
        /*max-height: 700px;*/
    }
    .ald-container{
        position: absolute;
        top: 0px;
        right: 0px;
        padding-bottom: 100px;
        box-sizing: border-box;
        width: 600px;
        height: 100%;
        overflow-y: scroll;
        background: white;
        color: $font-color;
        /*transform:translate(0,0);*/
        z-index: 1;
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
            display: flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            border: 1px solid gray;
            border-radius: 100%;
        }
    }
    .second {
        flex-direction: column;
        height: 100px;
        background: rgba(216,216,216, .17);
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
            >span {
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
                line-height: 40px;
            }
            .left {
                width: 80px;
            }
            .right {
                width: 160px;
                .item-a,.item-b,.item-c,.item-d {
                    height: 40px;
                }
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
        background: rgba(216,216,216, .17);
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
        .left{
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
            background: rgba(216,216,216, .17);
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
                }
                .center-left {
                    width: 80px;
                }
                .center-right {
                    margin-right: 220px;
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
                    >span {
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
                >.btn-b {
                    width: 250px;
                    border-radius: 20px;
                    color: white;
                    background: #3c78ff;
                    &:hover {
                        background: rgba(60,120,255,0.7);
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
                >.btn-w {
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
            >.btn-b {
                margin-right: 10px;
                width: 230px;
                color: white;
                border-radius: 20px;
                background: #3c78ff;
                &:hover {
                    background: rgba(60,120,255,0.7);
                }
                &:active {
                    background: #336bea;
                }
            }
            >.btn-w {
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
        /*justify-content: center;*/
        width: 600px;
        height: 100px;
        background: white;
        z-index: 2;
        .buttons {
            display: flex;
            margin-top: 18px;
            margin-left: 90px;
            height: 40px;
            >.btn-b {
                margin-right: 14px;
                width: 300px;
                color: white;
                border-radius: 20px;
                background: #3c78ff;
                &:hover {
                    background: rgba(60,120,255,0.7);
                }
                &:active {
                    background: #336bea;
                }
            }
            >.btn-w {
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
        /*justify-content: center;*/
        width: 600px;
        height: 100px;
        background: white;
        z-index: 2;
        .buttons {
            display: flex;
            margin-top: 18px;
            margin-left: 140px;
            height: 40px;
            >.btn-b {
                margin-right: 14px;
                width: 200px;
                color: white;
                border-radius: 20px;
                background: #3c78ff;
                &:hover {
                    background: rgba(60,120,255,0.7);
                }
                &:active {
                    background: #336bea;
                }
            }
            >.btn-w {
                width: 100px;
                border-radius: 20px;
            }
        }
    }
</style>