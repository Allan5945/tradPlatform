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
                /*if(this.list.length == '1'){
                    let code = this.list[0].code3,
                        name = this.list[0].name;
                    this.$store.dispatch('searchInfo', {
                      qyCode : code,
                      searchText:name,
                      selcType :'航司'
                    });
                }else if(this.list.length == '0'){
                    this.$store.dispatch('searchInfo', {
                      qyCode : '',
                      searchText:'',
                      selcType :'航司'
                    });
                }*/
            }
        },
        methods:{
            build:function () {
                let ar = [];
                this.companyList.forEach((val)=>{
                    let st = this.searchText;   // 输入名字
                    if(st != ''){
                        let companyName = val.companyName;  // 航司名字
                        let code3 = val.companyIcao;  // 三字码
                        let code = val.companyIata;  // 二字码
                        let pinyin = val.pinyin; // 拼音
                        let py = val.py; // 拼音首字母
                        let regx = new RegExp(st,"gmi");
                        let style = "style='color: #3c78ff'";
                        if(companyName.search(regx) != -1){
                            let reg = new RegExp(st,"gmi");
                            let aName = companyName.replace(reg,"<span "+style+">"+st+"</span>");
                            if(st == companyName){
                                aName = companyName;
                            }else{
                                aName = companyName.replace(reg,"<span "+style+">"+st+"</span>");
                            }
                            ar.push({
                                testName:aName,
                                testCode:val.companyIata,
                                code3:val.companyIcao,
                                code:val.companyIata,
                                name:val.companyName,
                                id: val.id,
                                type:2
                            });
                        }else if(code.search(regx) != -1){
                            let reg = new RegExp(st,"gmi");
                            let aName = code.replace(reg,"<span "+style+">"+st.toLocaleUpperCase()+"</span>");
                            ar.push({
                                testName:val.companyName,
                                testCode:aName,
                                code3:val.companyIcao,
                                code:val.companyIata,
                                name:val.companyName,
                                id: val.id,
                                type:2
                            });
                        }else if(py.search(regx) != -1){
                            let reg = new RegExp(st,"gmi");
                            let aName = py.replace(reg,"<span "+style+">"+st.toLocaleLowerCase()+"</span>");
                            ar.push({
                                testName:val.companyName,
                                testCode:aName,
                                code3:val.companyIcao,
                                code:val.companyIata,
                                name:val.companyName,
                                id: val.id,
                                type:2
                            });
                        }else if(pinyin.search(regx) != -1){
                            let reg = new RegExp(st,"gmi");
                            let aName = pinyin.replace(reg,"<span "+style+">"+st.toLocaleLowerCase()+"</span>");
                            ar.push({
                                testName:val.companyName,
                                testCode:aName,
                                code3:val.companyIcao,
                                code:val.companyIata,
                                name:val.companyName,
                                id: val.id,
                                type:2
                            });
                        };
                    }else{
                        ar.push({
                            testName:val.companyName,
                            testCode:val.companyIata,
                            code3:val.companyIcao,
                            code:val.companyIata,
                            name:val.companyName,
                            id: val.id,
                            type:2
                        });
                    }
                });
                this.list = ar;
            },
            reqD:function (key,index) {
                this.$emit('resData', key);
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
                'companyList'
            ]),
        }
    }
</script>
<style scoped  lang="scss">
    .item{
        color: #605E7C;
        white-space:nowrap;
        font-size: 1.2rem;
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
