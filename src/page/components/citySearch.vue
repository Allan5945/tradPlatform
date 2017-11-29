<template>
    <div class="popup-x1 scroll">
        <div v-for="(key,index) in list" class="item" @click="reqD(key,index)">
            <div class="item-imm" v-html="key.testName"></div>
            <div class="item-dynamics" v-html="key.testCode"></div>
        </div>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    export default {
        data(){
            return{
                list:[]
            }
        },
        props:['searchText'],
        watch:{
            searchText:function () {
                this.build();
            }
        },
        methods:{
            build:function () {
                let ar = [];
                this.cityList.forEach((val)=>{
                    let st = this.searchText;   // 输入名字
                    if(st != ''){
                        let airportName = val.cityName;  // 城市名字
                        let code = val.cityIcao;  // 三字码
                        let pinyin = val.pinyin; // 拼音
                        let py = val.py; // 拼音首字母
                        let regx = new RegExp(st,"gmi");
                        let style = "style='color: #3c78ff'";

                        if(airportName.search(regx) != -1){
                            let reg = new RegExp(st,"gmi");
                            let aName = airportName.replace(reg,"<span "+style+">"+st+"</span>");
                            if(st == airportName){
                                aName = airportName;
                            }else{
                                aName = airportName.replace(reg,"<span "+style+">"+st+"</span>");
                            }
                            ar.push({
                                testName:aName,
                                testCode:val.cityIcao,
                                code:val.cityIcao,
                                name:val.cityName
                            });
                        }else if(code.search(regx) != -1){
                            let reg = new RegExp(st,"gmi");
                            let aName = code.replace(reg,"<span "+style+">"+st.toLocaleUpperCase()+"</span>");
                            ar.push({
                                testName:val.cityName,
                                testCode:aName,
                                code:val.cityIcao,
                                name:val.cityName
                            });
                        }else if(py.search(regx) != -1){
                            let reg = new RegExp(st,"gmi");
                            let aName = py.replace(reg,"<span "+style+">"+st.toLocaleLowerCase()+"</span>");
                            ar.push({
                                testName:val.cityName,
                                testCode:aName,
                                code:val.cityIcao,
                                name:val.cityName
                            });
                        }else if(pinyin.search(regx) != -1){
                            let reg = new RegExp(st,"gmi");
                            let aName = pinyin.replace(reg,"<span "+style+">"+st.toLocaleLowerCase()+"</span>");
                            ar.push({
                                testName:val.cityName,
                                testCode:aName,
                                code:val.cityIcao,
                                name:val.cityName
                            });
                        };
                    }else{
                        ar.push({
                            testName:val.cityName,
                            testCode:val.cityIcao,
                            code:val.cityIcao,
                            name:val.cityName
                        });
                    }
                });
                this.list = ar;
            },
            reqD:function (key,index) {
                this.$emit('resData', key);
                this.$store.dispatch('setCity',{v:key.code,t:true}).then(() => {
                });
            }
        },
        mounted:function () {
            this.build();
        },
        filters:{
            fl:function (vl) {
                return vl;
//                return vl.replace(":","")
            }
        },
        computed:{
            ...vx.mapGetters([
                'cityList',
                'demandList',
            ]),
        }
    }
</script>
<style scoped  lang="scss">
    .item{
        color: #605E7C;
        white-space:nowrap;
        font-size: 1rem;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        cursor: pointer;
        height: 35px;
        align-items: center;
        padding: 0 14px;
        >div{
            overflow: hidden;
            padding-right: 5px;
            white-space:nowrap;
            text-overflow:ellipsis;
            >span{
                color: #3c78ff;
            }
        }
        &:hover{
            background-color: #f5f5f5;
        }
    }
    .item-imm{
        width: 140px;
    }
    .item-dynamics{
        flex: 1;
        text-align: right;
    }
</style>