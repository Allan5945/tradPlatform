<template>
    <div class="sc-box popup">
        <div class="sc-t">
            <span>筛选</span>
            <span class="btn-w" @click="screenHs">&#xe62c;</span>
        </div>
        <div class="sc-grade ">
            <div class="sc-grade-t">
                <span>&#xe608;</span>
                <span>城市</span>
            </div>
            <div class="sc-grade-i">
                <input type="text" placeholder="输入城市名进行搜索" v-model="searchText" @focus="reqFocus">
                <airportS class="aisx" v-on:resData="resData" :searchText="searchText" v-show="isSearch"></airportS>
            </div>
        </div>
        <div class="sc-grade-d">
            <div class="sc-grade-t">
                <span>&#xe648;</span>
                <span>飞行区等级</span>
            </div>
            <check :flyGrade="flyGrade"></check>
        </div>
        <div class="sc-grade-d">
            <div class="sc-grade-t">
                <span>&#xe648;</span>
                <span>补贴</span>
            </div>
            <check1 :flyGrade="subsidization"></check1>
        </div>
        <div class="btn-box">
            <div class="btn-w">取消</div>
            <div class="btn-b">查询</div>
        </div>
    </div>
</template>
<script>
    import check from './checkComponents.vue'
    import check1 from './checkComponents_1.vue'
    import airportS from './airportSearch.vue'

    export default {
        data() {
            return {
                flyGrade: [
                    ['1A', '2A', '3A', '4A'],
                    ['1B', '2B', '3B', '4B'],
                    ['1C', '2C', '3C', '4C'],
                    ['3D', '4D']
                ],
                subsidization:['定补','保底','人头','其他','无','不限'],
                searchText:'',
                isSearch:false
            }
        },
        methods:{
            screenHs:function () {
                this.$emit('screenHs');
            },
            reqFocus:function(){
                this.isSearch = true;
            },
            resData:function (data) {
                this.searchText = data.name;
                this.isSearch = false;
            }
        },
        components: {
            check,
            airportS,
            check1
        }
    }
</script>
<style lang="scss" scoped>
    .aisx {
        position: absolute;
        top: 25px;
        left: -81px;
        width: 260px;
        max-height: 210px;
        overflow-y: scroll;
        z-index: 10;
    }
    .btn-box{
        display: flex;
        flex-flow:row nowrap;
        justify-content:flex-end;
        padding:35px 20px 0 20px;
        >div:nth-of-type(1){
            color: #605E7C;
            margin-right: 7px;
        }
        >div:nth-of-type(2){
            color: white;
        }
        >div{
            height: 30px;
            width: 70px;
            border: 1px solid #d8d8d8;
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

    .sc-grade-d {
        flex-flow: column nowrap;
        display: flex;
        align-items: left;
        justify-content: center;
        padding: 5px 20px 0 20px ;
    }

    .sc-grade-t {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
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
            font-family: '微软雅黑';
        }
    }

    .sc-grade-i {
        position: relative;
        > input {
            border: none;
            border-bottom: 2px solid #ececec;
            font-size: 1.2rem;
            width: 160px;
            outline: none;
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
            width: 19px;
            height: 19px;
            border: 1px solid #d6d6d5;
            text-align: center;
            line-height: 19px;
            border-radius: 100%;
            color: #3c78ff;
            font-size: 12px;
            cursor: pointer;
            box-shadow: none;
        }
    }

    .sc-box {
        width: 280px;
        height: 420px;
        overflow: hidden;
    }
</style>