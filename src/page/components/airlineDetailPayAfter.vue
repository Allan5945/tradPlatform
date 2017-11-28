<template>
    <div class="wrapper">
        <div class="ald-container">
            <div class="first-show" v-show="firstShow">
                <div class="first item-container">
                    <span>需求详情</span>
                    <span class="close-icon">&times;</span>
                </div>
                <div class="second item-container">
                    <div class="sec-top">
                        成都-北京-上海航线需求
                    </div>
                    <div class="sec-bottom">
                        <span style="margin-right: 40px;">创建于2017.12.12</span><span>已有2位用户发起意向</span>
                    </div>
                </div>
                <div class="third item-container">
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
                <div class="fourth item-container">
                    <div class="items">
                        <div class="left item">
                            <div>拟开时间</div>
                            <div>拟飞机型</div>
                            <div>客量期望</div>
                            <div>补贴政策</div>
                        </div>
                        <div class="right item">
                            <div>2017.11.11-2018.11.11</div>
                            <div>AA2222</div>
                            <div>80人/均班</div>
                            <div>按人头</div>
                        </div>
                    </div>
                    <div class="items">
                        <div class="left item">
                            <div>拟开班期</div>
                            <div>座位数</div>
                            <div>客座率期望</div>
                            <div>有效期</div>
                        </div>
                        <div class="right item">
                            <div>待定</div>
                            <div>180</div>
                            <div>80%</div>
                            <div style="display: flex;">2017.11.11-2018.11.11 <span class="icon-item" v-show="secondShow">&#xe653;</span></div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="secondShow" v-show="secondShow">
                <div class="fifth item-container">
                    <div class="left">其他说明</div>
                    <div class="right">其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                        其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                        其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                    </div>
                </div>
                <div class="sixth item-container">
                    <h2>收到的意向</h2>
                    <span>已有2位用户发起意向</span>
                </div>
                <div class="seventh item-container">
                    <div class="left">
                        收到时间
                    </div>
                    <div class="up-down">
                        <span class="icon-item icon-up active">&#xe605;</span>
                        <span class="icon-item icon-down">&#xe605;</span>
                    </div>
                    <div class="right">
                        意向方
                    </div>
                </div>
                <div class="eighth">
                    <div class="eight-item">
                        <div class="item-first">
                            <div class="left">11.04.2017</div>
                            <div class="center-left">南方航空</div>
                            <div class="center-right">
                                <span class="icon-item">&#xe602; <span class="reminder"></span></span>
                            </div>
                            <div class="right">查看详情</div>
                        </div>
                        <div class="item-second">
                            <div class="start item">
                                <div class="item-a">始发机场</div>
                                <div class="item-b">成都双流</div>
                                <div class="item-c">接受临近机场</div>
                                <div class="item-d">出港资源</div>
                                <div class="item-e">08:00-12:00</div>
                            </div>
                            <div class="item-icon">
                                <span class="icon-item">&#xe672;</span>
                            </div>
                            <div class="pass item">
                                <div class="item-a">经停机场</div>
                                <div class="item-b">北京南苑</div>
                                <div class="item-c">&nbsp;<!--此处有空格--></div>
                                <div class="item-d">出港资源</div>
                                <div class="item-e">带协调</div>
                            </div>
                            <div class="item-icon">
                                <span class="icon-item">&#xe672;</span>
                            </div>
                            <div class="arrive item">
                                <div class="item-a">到达区域</div>
                                <div class="item-b">华北地区</div>

                                <!--下方有空格-->
                                <div class="item-c">&nbsp;<!--此处有空格--></div>
                                <div class="item-d">&nbsp;<!--此处有空格--></div>
                                <div class="item-e">&nbsp;<!--此处有空格--></div>
                            </div>
                        </div>
                        <div class="item-third">
                            <div class="items">
                                <div class="left item">
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
                                <div class="left item">
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
                            <div class="left">其他说明</div>
                            <div class="right">其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                                其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                                其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                            </div>
                        </div>
                        <div class="item-fifth">
                            <button class="btn btn-b">选定</button>
                        </div>
                        <div class="item-sixth">
                            <button class="btn btn-w btn-change">已选定（点击此次可再次编译）</button>
                            <button class="btn btn-w btn-revocation">撤销选定</button>
                        </div>
                    </div>
                    <div class="eight-item">
                        <div class="item-first">
                            <div class="left">11.04.2017</div>
                            <div class="center-left">南方航空</div>
                            <div class="center-right">
                                <span class="icon-item">&#xe602; <span class="reminder"></span></span>
                            </div>
                            <div class="right">查看详情</div>
                        </div>
                        <div class="item-second">
                            <div class="start item">
                                <div class="item-a">始发机场</div>
                                <div class="item-b">成都双流</div>
                                <div class="item-c">接受临近机场</div>
                                <div class="item-d">出港资源</div>
                                <div class="item-e">08:00-12:00</div>
                            </div>
                            <div class="item-icon">
                                <span class="icon-item">&#xe672;</span>
                            </div>
                            <div class="pass item">
                                <div class="item-a">经停机场</div>
                                <div class="item-b">北京南苑</div>
                                <div class="item-c">&nbsp;<!--此处有空格--></div>
                                <div class="item-d">出港资源</div>
                                <div class="item-e">带协调</div>
                            </div>
                            <div class="item-icon">
                                <span class="icon-item">&#xe672;</span>
                            </div>
                            <div class="arrive item">
                                <div class="item-a">到达区域</div>
                                <div class="item-b">华北地区</div>

                                <!--下方有空格-->
                                <div class="item-c">&nbsp;<!--此处有空格--></div>
                                <div class="item-d">&nbsp;<!--此处有空格--></div>
                                <div class="item-e">&nbsp;<!--此处有空格--></div>
                            </div>
                        </div>
                        <div class="item-third">
                            <div class="items">
                                <div class="left item">
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
                                <div class="left item">
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
                            <div class="left">其他说明</div>
                            <div class="right">其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                                其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                                其他说明其他说明其他说明其他说明其他说明其他说明其他说明其他说明
                            </div>
                        </div>
                        <div class="item-fifth">
                            <button class="btn btn-b">选定</button>
                        </div>
                        <div class="item-sixth">
                            <button class="btn btn-w btn-change">已选定（点击此次可再次编译）</button>
                            <button class="btn btn-w btn-revocation">撤销选定</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="first-button" v-show="firstShow">
            <span style="width: 560px;height: 2px;background: black;"></span>
            <div class="buttons">
                <button class="btn btn-b" @click="airlineWriteFn"><span class="icon-item">&#xe609;</span>我有意向</button>
                <button class="btn btn-w">收藏</button>
            </div>
        </div>
        <div class="bottom" v-show="secondShow">
            <div class="buttons">
                <button class="btn btn-b">委托代理</button>
                <button class="btn btn-w">结束需求</button>
            </div>
        </div>
        <airlineWrite v-show="airlineWriteShow" @close-alWrite="closeAlWriteFn"></airlineWrite>
    </div>
</template>
<script>
    import * as vx from 'vuex'

    import airlineWrite from './airlineWrite.vue'
    export default {
        data() {
            return {
                firstShow: false,
                secondShow: false,
                thirdShow: false,
                fourthShow: false,
                airlineWriteShow: false, //组件“请填写完整方案”显示
                showCode: '', //0,1,2,3对应firstShow，secondShow，thirdShow，fourthShow

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
            this.initData();
            this.show();
        },
        computed: {},
        methods: {
            initData: function () {
                this.$ajax({
                    url:"/capacityroutesdemand/capacityRoutesDemandFindById",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: {
                        demandId: 60
                    }
                }) .then((response) => {
                    console.info(response.data.data)
//                    this.$store.dispatch('airlineData', response.data.data).then(() => {});
                })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            show: function () {
                if(this.showCode == 0) {
                    this.firstShow = true;
                }if(this.showCode == 1) {
//                    this.firstShow = true;
                }if(this.showCode == 2) {
//                    this.firstShow = true;
                }if(this.showCode == 3) {
//                    this.firstShow = true;
                }
            },
            //点击“我有意向”，组件“请填写完整方案”显示
            airlineWriteFn: function () {
                this.airlineWriteShow = true;
            },
            closeAlWriteFn: function (index) {
                this.airlineWriteShow = index;
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
            airlineWrite
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
        font-size: 20px;
        line-height: 20px;
    }
    .danger {
        color: red;
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
        position: absolute;
        top: 10px;
        right: 10px;
        padding-bottom: 100px;
        width: 600px;
        /*height: 100%;*/
        min-height: 600px;
        max-height: 900px;
    }
    .ald-container{
        width: 600px;
        /*height: 100%;*/
        min-height: 600px;
        max-height: 900px;
        overflow-y: scroll;
        background: white;
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
            font-size: 20px;
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
                font-size: 20px;
            }
            .item-c {
                margin-bottom: 23px;
            }
            .item-d {
                margin-bottom: 5px;
            }
            .item-e {}
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
    .eighth {
        padding: 0 20px;
        .eight-item {
            position: relative;
            margin-bottom: 6px;
            padding-bottom: 95px;
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
                        font-size: 20px;
                    }
                    .item-c {
                        margin-bottom: 23px;
                    }
                    .item-d {
                        margin-bottom: 5px;
                    }
                    .item-e {}
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
                    }
                }
            }
            .item-fourth {
                display: flex;
                padding: 20px 20px 0 20px;
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
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 600px;
        height: 100px;
        background: white;
        .buttons {
            display: flex;
            margin-top: 18px;
            height: 40px;
            >.btn-b {
                margin-right: 10px;
                width: 230px;
                border-radius: 20px;
            }
            >.btn-w {
                width: 80px;
                border-radius: 20px;
            }
        }
    }
    .bottom {
        position: absolute;
        bottom: 0;
        display: flex;
        /*justify-content: center;*/
        width: 600px;
        height: 100px;
        background: white;
        .buttons {
            display: flex;
            margin-top: 18px;
            margin-left: 140px;
            height: 40px;
            >.btn-b {
                margin-right: 14px;
                width: 200px;
                border-radius: 20px;
            }
            >.btn-w {
                width: 100px;
                border-radius: 20px;
            }
        }
    }
</style>