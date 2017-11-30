<template>
    <div class="area-container">
        <ul class="area-classify">
            <li v-for="(item,index) in areaClassify" :class="{'tab-active':areaTab == item}" @click="showData(item)">{{item}}</li>
        </ul>
        <ul class="area-detail">
            <li v-for="(item,index) in areaDetail" :class="{'li-active':item.name == areaList.name}" @click="selectStyle(item)">{{item.name}}</li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                active: false,
                areaClassify: ['省份', '大区', '管辖区域', '国际热门'],
                areaTab: '',
                areaList: {},
                areaDetail: [],
                areaData : [],
                cityData : ['北京市',
                    '天津市',
                    '河北省',
                    '山西省',
                    '内蒙古',
                    '辽宁省',
                    '吉林省',
                    '黑龙江省',
                    '上海市',
                    '江苏省',
                    '浙江省',
                    '安徽省',
                    '福建省',
                    '江西省',
                    '山东省',
                    '河南省',
                    '湖北省',
                    '湖南省',
                    '广东省',
                    '广西',
                    '海南省',
                    '重庆市',
                    '四川省',
                    '贵州省',
                    '云南省',
                    '西藏',
                    '陕西省',
                    '甘肃省',
                    '青海省',
                    '宁夏',
                    '新疆',
                    '香港',
                    '澳门',
                    '台湾省'],  //城市数据改成省份数据
//                provinceData : ['河南省','河北省','福建省'],
                bigAreaData : ['华东地区','华中地区','华北地区','华南地区','东北地区','西北地区','西南地区'],
                controllAreaData : ['华北','西北','中南','西南','华东','东北','新疆'],
                internationalAreaData : ['吉隆坡','雅加达','名古屋','莫斯科'],
            }
        },
        components: {},
        mounted() {
//            this.initData();
         this.showData();
        },
        methods: {
            /*initData: function () {
                this.$ajax({
                    url:"/getCityAllList",
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }) .then((response) => {
//                    console.info(response.data.list)
                    response.data.list.forEach((vl)=>{
                        this.cityData.push({
                            cityName: vl.cityName,
                            cityIcao: vl.cityIcao,
                        })
                    })
//                    console.info(this.cityData)
                })
                    .catch((error) => {
                        console.log(error);
                    });
            },*/
            showData: function (item = '城市') {
                this.areaTab = item
                if(item === '省份') {
                    this.areaDetail = [];
                    this.cityData.forEach((item)=>{
                        this.areaDetail.push({
                            name: item,
                            code: '',
                        })
                    });
                }if(item === '大区') {
                    this.areaDetail = [];
                    this.bigAreaData.forEach((item)=>{
                        this.areaDetail.push({
                                name: item,
                                code: ''
                            })
                    });
                }if(item === '管辖区域') {
                    this.areaDetail = [];
                    this.controllAreaData.forEach((item)=>{
                        this.areaDetail.push({
                            name: item,
                            code: ''
                        });
                    });
                }if(item === '国际热门') {
                    this.areaDetail = [];
                    this.internationalAreaData.forEach((item)=>{
                        this.areaDetail.push({
                            name: item,
                            code: ''
                        })
                    });
                }
                console.info(this.areaDetail);
            },
            selectStyle: function (item) {
                console.info(item)
                this.areaList = item;
                this.$emit('li-click', this.areaList);
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
        max-height: 100px;
        overflow-y: scroll;
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
    .area-detail::-webkit-scrollbar {
        width: 7px;
    }
    .area-detail::-webkit-scrollbar-thumb {
        background: #D8D8D8;
        border-radius: 4px;
    }
</style>
