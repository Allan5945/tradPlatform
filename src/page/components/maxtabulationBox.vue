<template>
    <div class="demand-list">
        <div></div>
        <div :class="{'tagRed':(key.data.renew == '0'),'already-read':(key.data.collectType != 0)}" class="mes-body-h popup" @click="getDetail(key)"
             v-for="(key,i) in renderData" @mouseover="showPanel = true;iPanel = i" @mouseout="showPanel = false">
            <div class="mes-body-i0">
                <span @click="seted(key)" class="acquiescence mes-body-ix" :class="{'acquiescenceSet':key.data.set}">&#xe723;</span>
                <img :src="key.img" alt="">
            </div>
            <div class="font-bold mes-body-i1">
                <div v-for="(item,d) in key.name">
                    <div>
                        <div :class="{rolling:(item.length > 4),'colored':!(key.data.renew == '0')}">{{item}}</div>
                    </div>
                    <span v-if="d != key.name.length - 1">-</span>
                </div>
            </div>
            <div class="mes-body-i2">{{key.data.releasetime}}</div>
            <div class="mes-body-i3"><img :src='key.tag' alt=""></div>
            <div class="mes-body-i3">{{key.data.pstTime}}</div>
            <div class="mes-body-i3">{{key.data.days}}</div>
            <div class="mes-body-i3">{{key.data.aircrfttyp}}</div>
            <div class="mes-body-i4">{{key.data.subsidypolicyStr}}</div>
            <div class="mes-body-i4">{{key.data.remark}}</div>
            <div class="move-panel" v-if="showPanel && i == iPanel">
                <div class="btn-w" v-if="(key.data.collectType == 0)" @click="futurePanel(key)">添加收藏</div>
                <div class="btn-w" v-if="(key.data.collectType != 0)" @click="alreadyPanel(key)">取消收藏</div>
            </div>
        </div>
        <div v-if="(renderData.length == 0)" class="no-data">无数据!</div>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import singleElection from './singleElection.vue'
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
                showPanel:false,
                iPanel:0
            }
        },
        filters: {
            capitalizeType: function (val) {
                return val;
            }
        },
        methods: {
            alreadyPanel: function () {
                
            },
            futurePanel: function () {

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
                            if(response.data.opResult == '0'){
                                this.$store.dispatch('changeRenew',[val.data.id])
                            }
                        })
                        .catch((error) => {
                                console.log(error);
                            }
                        );
                };
                tabulationBoxTrigger.$emit('tabulationBoxTrigger', val);
            },
            seted: function (v) {
                this.$store.dispatch('setelect', {t: v, a: false}).then(() => {
                });
                this.$emit('resetSingleSet');
            }
        },
        components: {
            singleElection
        },
        mounted: function () {

        },
        watch: {},
        computed: {
            ...vx.mapGetters([
                'demandList',
                'role',
                'close',
                'conditionsOpen'
            ]),
            renderData: function () {
                let d, a = [], c = [];
                if (this.demandList.type) {
                    d = this.demandList.hybridData.list == null ? [] : this.demandList.hybridData.list;
                } else {
                    d = this.demandList.monoData.list == null ? [] : this.demandList.monoData.list;
                    ;
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
    .move-panel{
        position: absolute;
        right: 120px;
        >div{
            border-radius: 15px;
            margin-right: 13px;
            padding: 0 10px;
            color: rgba(96, 94, 124, 0.65);
            height: 20px;
            line-height: 20px;
        }
    }
    .demand-list {
        padding: 0 20px;
    }

    .no-data {
        color: #ff3c28;
    }

    @mixin user-select {
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
    }

    .acquiescence {
        @include user-select;
        font-family: iconfont;
        font-size: 1.7rem;
        cursor: pointer;
        width: 17px;
        height: 19px;
        display: inline-block;
        position: relative;
    }
    .already-read:after{
        content: url(./../../static/img/sc/ysc.png);
        position: absolute;
        right: 2px;
        top: 0;
        width: 0;
        height: 30px;
    }
    .colored{
        color:rgba(96,94,124,.6) !important;
    }
    .acquiescenceSet:before {
        width: 17px;
        height: 19px;
        content: '\e6cc';
        font-size: 1.4rem;
        position: absolute;
        display: inline-block;
        top: 3px;
        left: 0;
        color: #3c78ff;
    }

    .mes-body-h {
        position: relative;
        /*background-color: white;*/
        display: flex;
        flex-flow: row nowrap;
        padding: 0;
        height: 60px;
        align-items: center;
        margin-bottom: 10px;
        box-shadow: 0 2px 11px rgba(85, 85, 85, .1);
        &:hover {
            background-color: rgba(229, 229, 229, .2);
            cursor: pointer;
        }
        > div {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            margin-right: 20px;
            color: rgba(96, 94, 124, 1);
        }
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

    .mes-body-i0 {
        width: 60px;
    }

    .mes-body-i1 {
        width: 174px;
        letter-spacing: 0.2px;
        font-weight: bold;
        > div {
            font-size: 1.3rem !important;
            white-space: nowrap;
            margin: 0;
            max-width: 60px;
            color: #605E7C;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            > div {
                display: flex;
                max-width: 54px;
                overflow: hidden;
                letter-spacing: .5px;
                height: 50px;
                align-items: center;
            }
        }
    }

    .mes-body-i2 {
        width: 80px;
        letter-spacing: 0.2px;
    }

    .mes-body-i3 {
        width: 60px;
        letter-spacing: 0.2px;
    }

    .mes-body-i4 {
        overflow: hidden;
        width: 125px;
        letter-spacing: 0.2px;
    }

    .mes-body-ix {
        margin: 0 6px 0 9px;
        letter-spacing: 0.2px;
    }

    .tagRed:before {
        content: '\e61e';
        font-family: iconfont;
        color: #ff656f;
        position: absolute;
        right: 10px;
        top: 8px;
        font-size: 12px;
    }
</style>