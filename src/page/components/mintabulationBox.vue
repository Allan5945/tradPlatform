<template>
    <div class="tabulation-box" id="tabulationBox" :class="{tabulationBoxH:hidden,scroll:hidden}">
        <div :class="{'tagRed':(key.data.renew == 0)}" v-for="(key,index) in renderData" @mouseover="drawLine(key,true)" @mouseout="drawLine('',false)">
            <div class="tabulation-item" @click="getDetail(key)">
                <img :src='key.img' alt="">
                <div class="font-bold">
                    <div v-for="(item,d) in key.name">
                        <div>
                            <div :class="{rolling:(item.length > 4),'colored':!(key.data.renew == '0')}">{{item}}</div>
                        </div>
                        <span v-if="d != key.name.length - 1">-</span>
                    </div>
                </div>
                <div><img :src='key.tag' alt=""></div>
            </div>
            <div class="tabulation-mes">
                <div v-for="ite in key.simpleDemand">
                    <span>{{ite.key}}</span>
                    <div>{{ite.val}}</div>
                </div>
            </div>
        </div>
        <div v-if="(renderData.length == 0)" class="no-data">无数据!</div>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js';
    import ig0 from './../../static/img/haveline.png'; // 航线需求图片
    import ig1 from './../../static/img/haveyun.png'; // 运力需求图片
    import ig2 from './../../static/img/fcqq.png'; // 航线托管需求图片
    import tag0 from './../../static/img/jd/1.png'; // 航线托管需求图片
    import tag1 from './../../static/img/jd/2.png'; // 航线托管需求图片
    import tag2 from './../../static/img/jd/3.png'; // 航线托管需求图片
    import tag3 from './../../static/img/jd/4.png'; // 航线托管需求图片

    export default {
        data() {
            return {
                hidden: false,
                set: ''
            }
        },
        mounted: function () {
            // 更改提示框高度
            window.onresize = () => {
                if (this.set != '') {
                    clearTimeout(this.set);
                }
                ;
                this.set = setTimeout(() => {
                    this.resetWindow()
                }, 100);
            };
            this.resetWindow();
            let tabulationBox = document.getElementById('tabulationBox');
            tabulationBox.addEventListener('scroll', (e) => {
                let z = 126 * this.renderData.length;
                let b = Number(tabulationBox.style.height.split('px')[0]);
                let x = (z - b) / 1.2;
                if (tabulationBox.scrollTop >= x) {
                    if (this.demandList.type && this.demandList.hybridPage < this.demandList.hybridData.pageCount) {  // 混合数据
                        this.$store.dispatch('hybridData', {v: (this.demandList.hybridPage + 1), t: 1}).then(() => {
                            this.$ajax({
                                url: "/getDemandsForCurrentEmployee",
                                method: 'post',
                                headers: {
                                    'Content-type': 'application/x-www-form-urlencoded'
                                },
                                params: {
                                    page: this.demandList.hybridPage
                                }
                            }).then((response) => {
                                this.$store.dispatch('hybridData', {v: response.data.list.list, t: 2}).then(() => {
                                });
                            })
                                .catch((error) => {
                                    console.log(error);
                                });
                        });
                    } else if (!this.demandList.type && this.demandList.monoPage < this.demandList.monoPage.pageCount) { // 非混合数据
                        this.$store.dispatch('monoData', {v: (this.demandList.monoPage + 1), t: 1}).then(() => {
                            this.$ajax({
                                url: "/getDemandsForCurrentCheckedAirport",
                                method: 'post',
                                headers: {
                                    'Content-type': 'application/x-www-form-urlencoded'
                                },
                                params: {
                                    page: this.demandList.monoPage
                                }
                            }).then((response) => {
                                this.$store.dispatch('monoData', {v: response.data.list.list, t: 2}).then(() => {
                                });
                            })
                                .catch((error) => {
                                    console.log(error);
                                });
                        });
                    }
                }
            });
        },
        methods: {
            resetWindow: function () {
                let messageHead = 42;
                let tabulationHead = 62;
                let messageBox = document.getElementById('message-box').offsetHeight;
                let tabulation = document.getElementById('tabulation').offsetHeight;
                if ((messageBox - messageHead) < tabulation + 10) {
                    let zh = messageBox - messageHead - tabulationHead;
                    document.getElementById('tabulationBox').style.height = zh + 'px';
                    this.hidden = true;
                } else {
                    document.getElementById('tabulationBox').style.height = 'auto';
                    this.hidden = false;
                }
            },
            drawLine: function (key, t) {
                let pots = [];
                if (t) {
                    if (key.data.arrvCt != null && key.data.arrvCt != '') {
                        let jw = this.$cityMes(this.cityList, key.data.arrvCt).cityCoordinate.split(',');
                        pots.push(new BMap.Point(jw[0], jw[1]))
                    }
                    if (key.data.dptCt != null && key.data.dptCt != '') {
                        let jw = this.$cityMes(this.cityList, key.data.dptCt).cityCoordinate.split(',');
                        pots.push(new BMap.Point(jw[0], jw[1]))
                    }
                    if (key.data.pstCt != null && key.data.pstCt != '') {
                        let jw = this.$cityMes(this.cityList, key.data.pstCt).cityCoordinate.split(',');
                        pots.push(new BMap.Point(jw[0], jw[1]))
                    }
                }
                this.$bExample.setLinesList(pots, t);
            },
            getDetail: function (val) {
                if(val.data.renew == 0){
                    this.$ajax({
                        method: 'post',
                        url: '/employeeDemandAdd',
                        params:{
                            employeeDemandIds:val.data.id
                        },
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded'
                        }
                    })
                        .then((response) => {
                            if(response.data.opResult == 0){
                                this.$store.dispatch('changeRenew',[val.data.id])
                            }
                        })
                        .catch((error) => {
                                console.log(error);
                            }
                        );
                };
                tabulationBoxTrigger.$emit('tabulationBoxTrigger', val);
            }
        },
        updated: function () {
            this.resetWindow();
        },
        watch: {
            demandList: function () {

            }
        },
        computed: {
            ...vx.mapGetters([
                'demandList',
                'role',
                'close',
                'conditionsOpen',
                'cityList'
            ]),
            renderData: function () {
                let d, a = [], c = [];
                if (this.demandList.type) {
                    d = this.demandList.hybridData.list == null ? [] : this.demandList.hybridData.list;
                } else {
                    d = this.demandList.monoData.list == null ? [] : this.demandList.monoData.list;;
                }
                d.forEach((val) => {
                    let img, name = [], tag;
                    if (val.dptNm != null && val.dptNm != '') {
                        name.push(val.dptNm)
                    }
                    ;
                    if (val.pstNm != null && val.pstNm != '') {
                        name.push(val.pstNm)
                    }
                    ;
                    if (val.arrvNm != null && val.arrvNm != '') {
                        name.push(val.arrvNm)
                    }
                    ;

                    switch (val.demandtype) {
                        case "0":
                            img = ig0;
                            break;
                        case "1":
                            img = ig1;
                            break;
                        case "2":
                            img = ig2;
                            break;
                    }
                    ;
                    switch (val.demandprogress) {
                        case "0":
                            tag = tag0;
                            break;
                        case "1":
                            tag = tag1;
                            break;
                        case "2":
                            tag = tag2;
                            break;
                        case "3" || "4":
                            tag = tag3;
                            break;
                    }
                    a.push({
                        img,
                        name,
                        tag,
                        simpleDemand: val.simpleDemand,
                        data: val
                    })
                });
                a.forEach((v) => {
                    let sr = {
                        city: false,
                        flyGrade: false,
                        airType: true,
                        subsidyPolicy: true,
                    };
                    let cy = this.demandList.conditions.city.s;
                    if (cy.length > 0) {
                        if (
                            (v.data.dptCt != null && v.data.dptCt != '' && cy.indexOf(v.data.dptCt) != -1) ||
                            (v.data.arrvCt != null && v.data.arrvCt != '' && cy.indexOf(v.data.arrvCt) != -1) ||
                            (v.data.pst != null && v.data.pst != '' && cy.indexOf(v.data.pst) != -1)
                        ) {
                            sr.city = true;
                        }
                    } else {
                        sr.city = true;
                    }

                    let flyGrade = this.demandList.conditions.flyGrade.s;

                    if (flyGrade.length > 0) {
                        if (
                            (v.data.dptFltLvl != null && v.data.dptFltLvl != '' && flyGrade.indexOf(v.data.dptFltLvl) != -1) ||
                            (v.data.arrvFltLvl != null && v.data.arrvFltLvl != '' && flyGrade.indexOf(v.data.arrvFltLvl) != -1) ||
                            (v.data.pstFltLvl != null && v.data.pstFltLvl != '' && flyGrade.indexOf(v.data.pstFltLvl) != -1)
                        ) {
                            sr.city = true;
                        }
                    } else {
                        sr.flyGrade = true;
                    }

                    let airType = v.data.aircrfttyp;
                    if (airType != null && this.demandList.conditions.airType != '' && airType != this.demandList.conditions.airType) {
                        sr.airType = false;
                    }
                    let subsidyPolicy = this.demandList.conditions.subsidyPolicy.s;
                    if (subsidyPolicy.length > 0 && subsidyPolicy.indexOf(v.data.subsidypolicyStr) == -1) {
                        sr.subsidyPolicy = false;
                    }
                    ;
                    if (sr.flyGrade && sr.airType && sr.city && sr.subsidyPolicy) {
                        c.push(v);
                    }
                });
                if (this.conditionsOpen) {
                    this.$emit('renderDataLength', c.length);
                    return c;
                } else {
                    this.$emit('renderDataLength', a.length);
                    return a;
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    @keyframes mytext {
        0% {
            margin-left: 0%;
        }
        100% {
            margin-left: -110%;
        }
    }

    .no-data {
        color: #ff3c28;
    }
    .tagRed:before{
        content:'\e61e';
        font-family: iconfont;
        color: #ff656f;
        position: absolute;
        right: 0px;
        top: 3px;
        font-size: 12px;
    }
    .class-item0:after {
        position: absolute;
        /*background: url('./../../static/img/hx.png') no-repeat;*/
        left: 0px;
        top: 0px;
    }

    .tabulationBoxH {
        overflow-y: scroll;
    }

    .rolling:hover {
        animation: mytext 1.5s linear infinite;
    }

    .tabulation-mes {
        > div {
            > span {
                display: inline-block;
                padding-bottom: 8px;
                color: rgba(96, 94, 124, .7);
                font-size: 1.2rem;
            }
            > div {
                font-size: 1.3em;
                color: #605E7C;
            }
        }
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }

    .tabulation-item {
        height: 40px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        width: 100%;
        position: relative;
        > img {
            position: absolute;
            width: 15px;
            /*height: 23px;*/
            left: -38px;
            top: -2px;
        }
        > div:first-of-type {
            cursor: pointer;
            display: flex;
            > div {
                font-size: 1.3rem !important;
                white-space: nowrap;
                margin: 0;
                max-width: 60px;
                color: #605E7C;
                display: flex;
                flex-flow: row nowrap;
                > div {
                    max-width: 54px;
                    overflow: hidden;
                    letter-spacing: .5px;
                    height: 50px;
                }
            }
        }
        > div:last-of-type {

        }
    }

    .tabulation-box {
        padding: 0 20px;
        position: relative;
        > div {
            position: relative;
            height: 105px;
            padding: 20px 0 0 40px;
            border-bottom: 1px solid #f3f3f3;
            &:hover {
                cursor: pointer;
                background-color: rgba(229, 229, 229, .2);
                border-radius: 7px;
            }
        }
    }
    .colored{
        color:rgba(96,94,124,.6) !important;
    }
</style>
