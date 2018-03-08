<template>
    <div class="sc-box popup-x1 scroll" @click="isSearch = false">
        <div class="sc-t">
            <span>筛选</span>
            <span class="user-select" @click="clearSet" title="清空筛选">&#xe67a;</span>
        </div>
        <div class="sc-grade">
            <div class="sc-grade-t">
                <span>&#xe608;</span>
                <span>城市</span>
            </div>
            <div class="sc-grade-i" @click.stop>
                <input type="text" placeholder="输入城市名进行搜索" v-model="searchText" @focus="reqFocus">
                <cityS :setCity="true" class="aisx" v-on:resData="resData" :searchText="searchText" v-if="isSearch"></cityS>
            </div>
        </div>
        <div class="sc-grade-x" v-if="cityCuped.length != 0">
            <div class="city-item" v-for="(key,i) in cityCuped">
                <span>{{key.cityName}}</span>
                <span class="search-ed btn-w" @click="removeCity(key)">&#xe62c;</span>
            </div>
        </div>
        <div class="sc-grade-d">
            <div class="sc-grade-t">
                <span>&#xe648;</span>
                <span>飞行区等级</span>
            </div>
            <check></check>
        </div>
        <div class="sc-grade-d" v-if="role.role == '0'">
            <div class="sc-grade-t">
                <span>&#xe648;</span>
                <span>补贴</span>
            </div>
            <check1></check1>
        </div>
        <div class="sc-grade" v-if="role.role != '0'">
            <div class="sc-grade-t">
                <span>&#xe604;</span>
                <span>机型</span>
            </div>
            <div class="sc-grade-i">
                <select class="sc-grade-s props" v-model="demandList.conditions.airType">
                    <option v-for="(key,i) in select.options">{{key.value}}</option>
                </select>
            </div>
        </div>
        <div class="btn-box">
            <div class="btn-w" @click="screenHs(false)">取消</div>
            <div class="btn-b" @click="openScreen(true);screenHs(true)">查询</div>
        </div>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import check from './checkComponents.vue'
    import check1 from './checkComponents_1.vue'
    import airportS from '../../reuseComponents/airportSearch.vue'
    import cityS from '../../reuseComponents/citySearch.vue'

    export default {
        data() {
            return {
                select: {
                    options: [
                        {text: 'A320', value: 'A320'},
                        {text: 'A330', value: 'A330'},
                        {text: 'B737NG', value: 'B737NG'},
                        {text: 'E190/195', value: 'E190/195'},
                        {text: 'CRJ900', value: 'CRJ900'},
                        {text: 'MA60', value: 'MA60'},
                        {text: 'B787', value: 'B787'},
                        {text: 'B777', value: 'B777'},
                        {text: 'B767', value: 'B767'},
                        {text: 'E145', value: 'E145'},
                        {text: 'B757', value: 'B757'},
                        {text: 'B747', value: 'B747'},
                        {text: 'ARJ21', value: 'ARJ21'},
                        {text: '全选', value: '全选'}
                    ]
                },
                searchText: '',
                isSearch: false,
            }
        },
        watch: {
            selected: function () {
                this.$store.dispatch('setAirType', this.selected).then(() => {
                });
            }
        },
        methods: {
            ...vx.mapActions([
                'openScreen'
            ]),
            removeCity: function (key) {
                this.$store.dispatch('setCity', {v: key.cityIcao, t: false}).then(() => {
                });
            },
            clearSet: function () {
                this.$store.dispatch('setCity', {v: '$&', t: false}).then(() => {
                });
            },
            screenHs: function (t) {
                this.$emit('screenHs', t);
            },
            reqFocus: function () {
                this.isSearch = true;
            },
            resData: function (data) {
                this.searchText = data.name;
                this.isSearch = false;
            }
        },
        mounted: function () {
        },
        components: {
            check,
            cityS,
            check1,
        },
        computed: {
            ...vx.mapGetters([
                'role',
                'demandList',
                'cityList'
            ]),
            roles: function () {
                let r = {};
                if (this.role != null) {
                }
                ;
                return r;
            },
            cityCuped: function () {
                let a = [];
                this.demandList.conditions.city.s.forEach((v) => {
                    a.push(this.$cityMes(this.cityList, v));
                });
                return a;
            }
        },
    }
</script>
<style lang="scss" scoped>
    .city-item {
        position: relative;
        background-color: #ededed;
        color: #3c78ff !important;
        border: 1px solid transparent !important;
        height: 20px;
        padding: 0 7px 0 8px;
        text-align: center;
        line-height: 20px;
        border-radius: 15px;
        margin: 0 5px 8px 0;
        letter-spacing: .2px;
        color: rgba(96, 94, 124, 0.5);
        cursor: pointer;
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }

    .search-ed {
        font-family: iconfont;
        font-size: 1.2rem;
        color: #3c78ff;
        border: none;
        padding: 0;
        cursor: pointer;
        display: inline-block;
        text-align: center;
        line-height: 15px;
        width: 15px;
        height: 15px;
        background-color: white;
        border-radius: 50%;
        margin-left: 8px;
    }

    .sc-grade-s {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        border-radius: 4px;
        opacity: 1;
        border: 1px solid rgba(0, 0, 0, 0.05);
        padding: 0 11px;
        height: 25px;
        color: #605E7C;
        font-size: 1.2rem;
        width: 164px;
        background-image: url("../../../static/img/sbottom.png");
        background-repeat: no-repeat;
        background-size: 22px;
        background-position: 135px 0;
        > option {
            background-color: white;
            color: #605E7C;
            height: 25px;
            padding: 50px 0;
        }
    }

    /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
    select::-ms-expand {
        display: none;
    }

    .aisx {
        position: absolute;
        top: 25px;
        left: -81px;
        width: 260px;
        max-height: 210px;
        overflow-y: scroll;
        z-index: 10;
    }

    .btn-box {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        padding: 35px 20px 20px 20px;
        > div:nth-of-type(1) {
            color: rgba(96, 94, 124, .6);
            margin-right: 7px;
            box-shadow: none;
            border: 1px solid #d8d8d8;
            background-color: white;
        }
        > div:nth-of-type(2) {
            color: white;
        }
        > div {
            letter-spacing: .2px;
            height: 30px;
            width: 70px;
            border-radius: 20px;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
            /*box-shadow: none !important;*/
        }
    }

    .sc-grade {
        display: flex;
        flex-flow: row nowrap;
        height: 40px;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
    }

    .sc-grade-x {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        padding: 10px 10px 10px 43px;
    }

    .sc-grade-d {
        flex-flow: column nowrap;
        display: flex;
        align-items: left;
        justify-content: center;
        padding: 12px 20px 10px 20px;
    }

    .sc-grade-t {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        white-space: nowrap;
        > span:first-of-type {
            font-family: iconfont;
            font-size: 2rem;
            color: #605E7C;
        }
        > span:last-of-type {
            padding-left: 3px;
            color: #605E7C;
            font-size: 1.2rem;
            font-weight: 600;
            letter-spacing: 0.2px;
        }
    }

    .sc-grade-i {
        position: relative;
        > input {
            border: none;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            font-size: 1.2rem;
            width: 160px;
            outline: none;
            padding-left: 5px;
        }
    }

    .sc-t {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        padding: 0 10px 0 20px;
        height: 40px;
        align-items: center;
        > span:first-of-type {
            color: #959595;
            font-size: 13px;
        }
        > span:last-of-type {
            font-family: iconfont;
            display: inline-block;
            width: 26px;
            height: 19px;
            /*border: 1px solid #d6d6d5;*/
            text-align: center;
            line-height: 19px;
            border-radius: 100%;
            color: rgba(96, 94, 124, .6);
            font-size: 17px;
            cursor: pointer;
            box-shadow: none;
        }
    }

    .sc-box {
        width: 284px;
        max-height: 470px;
        overflow-x: hidden;
        overflow-y: scroll;
    }
</style>