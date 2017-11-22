<template>
    <div class="area-container">
        <ul class="area-classify">
            <li v-for="(item,index) in areaClassify" :class="{'tab-active': areaTab == item}" @click="showData(item)">{{item}}</li>
        </ul>
        <ul class="area-detail">
            <li v-for="(item,index) in areaDetail" :class="{'li-active':item == areaList}" @click="selectStyle(item)">{{item}}</li>
        </ul>
    </div>
</template>
<script>
    let areaData = [
        {
            id: 1, name: '北京', city: [
            {
                id: 1, name: '北京市', district: [
                    {id: 1, name: '东城区'},
                    {id: 2, name: '西城区'},
                    {id: 3, name: '崇文区'},
                    {id: 4, name: '宣武区'},
                    {id: 5, name: '朝阳区'},
                    {id: 6, name: '丰台区'},
                    {id: 7, name: '石景山区'},
                    {id: 8, name: '海淀区'},
                    {id: 9, name: '门头沟区'},
                    {id: 10, name: '房山区'},
                    {id: 11, name: '通州区'},
                    {id: 12, name: '顺义区'},
                    {id: 13, name: '昌平区'},
                    {id: 14, name: '大兴区'},
                    {id: 15, name: '怀柔区'},
                    {id: 16, name: '平谷区'},
                    {id: 17, name: '密云县'},
                    {id: 18, name: '延庆县'}
                ]
            }
        ]
        },
        {
            id: 2, name: '天津', city: [
            {
                id: 2, name: '天津市', district: [
                {id: 19, name: '和平区'},
                {id: 20, name: '河东区'},
                {id: 21, name: '河西区'},
                {id: 22, name: '南开区'},
                {id: 23, name: '河北区'},
                {id: 24, name: '红桥区'},
                {id: 25, name: '塘沽区'},
                {id: 26, name: '汉沽区'},
                {id: 27, name: '大港区'},
                {id: 28, name: '东丽区'},
                {id: 29, name: '西青区'},
                {id: 30, name: '津南区'},
                {id: 31, name: '北辰区'},
                {id: 32, name: '武清区'},
                {id: 33, name: '宝坻区'},
                {id: 34, name: '宁河县'},
                {id: 35, name: '静海县'},
                {id: 36, name: '蓟县'}
            ]
            }
        ]
        },
        {
            id: 3, name: '河北', city: [
            {
                id: 3, name: '石家庄市', district: [
                {id: 37, name: '长安区'},
                {id: 38, name: '桥东区'},
                {id: 39, name: '桥西区'},
                {id: 40, name: '新华区'},
                {id: 41, name: '井陉矿区'},
                {id: 42, name: '裕华区'},
                {id: 43, name: '井陉县'},
                {id: 44, name: '正定县'},
                {id: 45, name: '栾城县'},
                {id: 46, name: '行唐县'},
                {id: 47, name: '灵寿县'},
                {id: 48, name: '高邑县'},
                {id: 49, name: '深泽县'},
                {id: 50, name: '赞皇县'},
                {id: 51, name: '无极县'},
                {id: 52, name: '平山县'},
                {id: 53, name: '元氏县'},
                {id: 54, name: '赵县'},
                {id: 55, name: '辛集市'},
                {id: 56, name: '藁城市'},
                {id: 57, name: '晋州市'},
                {id: 58, name: '新乐市'},
                {id: 59, name: '鹿泉市'}
            ]
            }
        ]
        }
    ];
    import Vue from 'vue'
    export default {
        data() {
            return {
                active: false,
                areaClassify: ['省份', '大区', '管辖区域', '国际热门'],
                areaTab: '',
                areaList: '',
                areaDetail: []
            }
        },
        components: {},
        mounted() {
            this.showData();
        },
        methods: {
            showData: function (item = '省份') {
                this.areaTab = item
                if(item === '省份') {
                    this.areaDetail = [];
                    areaData.forEach((item)=>{
                        this.areaDetail.push(item.name)
                    });
                }if(item === '大区') {
                    this.areaDetail = [];
                    areaData[0].city.forEach((item)=>{
                        this.areaDetail.push(item.name)
                    });
                }if(item === '国际热门') {
                    this.areaDetail = [];
                    areaData[0].city[0].district.forEach((item)=>{
                        this.areaDetail.push(item.name)
                    });
                }if(item === '管辖区域') {
                    this.areaDetail = [];
                    areaData[0].city[0].district.forEach((item)=>{
                        this.areaDetail.push(item.name)
                    });
                }
            },
            selectStyle: function (item) {
                this.areaList = item
            }
        }
    }
</script>
<style lang="scss" scoped>
    $border-color: #3c78ff;
    $font-color: #3c78ff;
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .tab-active {
        border-bottom: 4px solid $border-color;
    }
    .li-active {
        color: $font-color;
    }
    .area-container {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 430px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 2px 11px rgba(85,85,85,0.1);
        overflow: hidden;
        text-align: center;
        background: white;
        z-index: 1;
    }

    .area-classify {
        display: flex;
        font-size: 1.2rem;
        > li {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 86px;
            height: 40px;
            text-align: center;
            &:hover {
                border-bottom: 4px solid $border-color;
                cursor: pointer;
            }
        }
    }

    .area-detail {
        display: flex;
        flex-wrap: wrap;
        > li {
            width: 86px;
            height: 30px;
            line-height: 25px;
            font-size: 1.2rem;
            &:hover {
                color: $font-color;
                cursor: pointer;
            }
        }
    }
</style>