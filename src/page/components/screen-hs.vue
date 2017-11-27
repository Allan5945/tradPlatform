<template>
    <div class="sc-box popup-x1">
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
                <airportS class="aisx" v-on:resData="resData" :searchText="searchText" v-if="isSearch"></airportS>
            </div>
        </div>
        <div class="sc-grade-d">
            <div class="sc-grade-t">
                <span>&#xe648;</span>
                <span>飞行区等级</span>
            </div>
            <check :flyGrade="flyGrade"></check>
        </div>
        <div class="sc-grade-d" v-if="role.role == '0'">
            <div class="sc-grade-t">
                <span>&#xe648;</span>
                <span>补贴</span>
            </div>
            <check1 :flyGrade="subsidization"></check1>
        </div>
        <div class="sc-grade" v-if="role.role != '0'">
            <div class="sc-grade-t">
                <span>&#xe604;</span>
                <span>机型</span>
            </div>
            <div class="sc-grade-i">
                <select class="sc-grade-s props" v-model="select.selected">
                    <option value ="A320" v-for="(key,i) in select.options">{{key.value}}</option>
                </select>
            </div>
        </div>
        <div class="btn-box">
            <div class="btn-w" @click="screenHs">取消</div>
            <div class="btn-b">查询</div>
        </div>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import check from './checkComponents.vue'
    import check1 from './checkComponents_1.vue'
    import airportS from './airportSearch.vue'

    export default {
        data() {
            return {
                select:{
                    selected: 'A320',
                    options: [
                        { text: 'A320', value: 'A320' },
                        { text: 'A330', value: 'A330' },
                        { text: 'B737NG', value: 'B737NG' },
                        { text: 'E190/195', value: 'E190/195' },
                        { text: 'CRJ900', value: 'CRJ900' },
                        { text: 'MA60', value: 'MA60' },
                        { text: 'B787', value: 'B787' },
                        { text: 'B777', value: 'B777' },
                        { text: 'B767', value: 'B767' },
                        { text: 'E145', value: 'E145' },
                        { text: 'B757', value: 'B757' },
                        { text: 'B747', value: 'B747' },
                        { text: 'ARJ21', value: 'ARJ21' }
                    ]
                },
                flyGrade: [
                    ['1A', '2A', '3A', '4A'],
                    ['1B', '2B', '3B', '4B'],
                    ['1C', '2C', '3C', '4C'],
                    ['3D', '4D']
                ],
                subsidization:['定补','保底','人头','其他','无','不限'],
                searchText:'',
                isSearch:false,
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
        mounted:function () {
        },
        components: {
            check,
            airportS,
            check1
        },
        computed:{
            ...vx.mapGetters([
                'role'
            ]),
            roles:function () {
                let r = {};
                if(this.role != null){
//                    r.
                };


                return r;

            }
        }
    }
</script>
<style lang="scss" scoped>
    .sc-grade-s{
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;
        border-radius: 4px;
        opacity: 1;
        border: 1px solid rgba(0, 0, 0, 0.05);
        padding:0 11px;
        height: 25px;
        color:#605E7C ;
        font-size: 1.2rem;
        width: 100px;
        background-image: url("./../../static/img/sbottom.png");
        background-repeat: no-repeat;
        background-size: 22px;
        background-position: 72px 0;
        >option{
            background-color: white;
            color:#605E7C ;
        }
    }
    /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
    select::-ms-expand { display: none; }
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
            color: rgba(96,94,124,.6);
            margin-right: 7px;
            box-shadow: none;
            border: 1px solid #d8d8d8;
            background-color: white;
        }
        >div:nth-of-type(2){
            color: white;
        }
        >div{
            letter-spacing:.2px;
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

    .sc-grade-d {
        flex-flow: column nowrap;
        display: flex;
        align-items: left;
        justify-content: center;
        padding: 8px 20px 0 20px ;
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
            letter-spacing: 0.2px;
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