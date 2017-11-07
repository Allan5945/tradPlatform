<template>
    <div class="popup scroll">
        <div v-for="(key,index) in list" class="item">
            <div class="item-imm" v-html="key.airName"></div>
            <div class="item-dynamics" v-html="key.cd"></div>
        </div>
    </div>
</template>
<script>
    import airData from './../../public/js/airport-controls'

    export default {
        data(){
            return{
                list:[]
            }
        },
        props:['searchText'],
        watch:{
            searchText:function () {
                if(this.searchText == ''){

                }else{
                    this.build();
                }
            }
        },
        methods:{
            build:function () {
                let ar = [];
                airData.forEach((val)=>{
                    let st = this.searchText;   // 输入名字
                    let airportName = val.airportName;  // 机场名字
                    let code = val.code;  // 三字码
                    let pinyin = val.pinyin; // 拼音
                    let py = val.py; // 拼音首字母
                    let regx = new RegExp(st,"gmi");
                    let style = "style='color: #3c78ff'";

                    if(airportName.search(regx) != -1){
                        let reg = new RegExp(st,"gmi");
                        let aName = airportName.replace(reg,"<span "+style+">"+st+"</span>");
                        ar.push({
                            airName:aName,
                            cd:val.code
                        });
                    }else if(code.search(regx) != -1){
                        let reg = new RegExp(st,"gmi");
                        let aName = code.replace(reg,"<span "+style+">"+st.toLocaleUpperCase()+"</span>");
                        ar.push({
                            airName:val.airportName,
                            cd:aName
                        });
                    }else if(py.search(regx) != -1){
                        let reg = new RegExp(st,"gmi");
                        let aName = py.replace(reg,"<span "+style+">"+st.toLocaleLowerCase()+"</span>");
                        ar.push({
                            airName:val.airportName,
                            cd:aName
                        });
                    }else if(pinyin.search(regx) != -1){
                        let reg = new RegExp(st,"gmi");
                        let aName = pinyin.replace(reg,"<span "+style+">"+st.toLocaleLowerCase()+"</span>");
                        ar.push({
                            airName:val.airportName,
                            cd:aName
                        });
                    };
                });
                this.list = ar;
            },
            updt:function () {
                this.$emit('update:searchText', 66666);
            }
        },
        filters:{
            fl:function (vl) {
                return vl;
//                return vl.replace(":","")
            }
        },
        mounted:function () {

        }
    }
</script>
<style scoped  lang="scss">
    .scroll::-webkit-scrollbar{/*滚动条整体部分，其中的属性有width,height,background,border等（就和一个块级元素一样）（位置1）*/
        width:7px;
        height:7px;
    }
    /*.scroll::-webkit-scrollbar-button{!*滚动条两端的按钮，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置2）*!*/
        /*background:transparent;*/
    /*}*/
    .scroll::-webkit-scrollbar-track{/*外层轨道，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置3）*/
        background:transparent;
    }
    .scroll::-webkit-scrollbar-track-piece{/*内层轨道，滚动条中间部分（位置4）*/
        background:transparent;
    }
    .scroll::-webkit-scrollbar-thumb{/*滚动条里面可以拖动的那部分（位置5）*/
        background:#d8d8d8;
        border-radius:4px;
    }
    .scroll::-webkit-scrollbar-corner {/*边角（位置6）*/
        background:#82AFFF;
    }
    .scroll::-webkit-scrollbar-resizer  {/*定义右下角拖动块的样式（位置7）*/
        background:transparent;
    }
    .scroll{
        scrollbar-arrow-color: #f4ae21; /**//*三角箭头的颜色*/
        scrollbar-face-color: #333; /**//*立体滚动条的颜色*/
        scrollbar-3dlight-color: #666; /**//*立体滚动条亮边的颜色*/
        scrollbar-highlight-color: #666; /**//*滚动条空白部分的颜色*/
        scrollbar-shadow-color: #999; /**//*立体滚动条阴影的颜色*/
        scrollbar-darkshadow-color: #666; /**//*立体滚动条强阴影的颜色*/
        scrollbar-track-color: #666; /**//*立体滚动条背景颜色*/
        scrollbar-base-color:#f8f8f8; /**//*滚动条的基本颜色*/
    }
    .item{
        white-space:nowrap;
        font-size: 1rem;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        cursor: pointer;
        height: 35px;
        align-items: center;
        >div{
            overflow: hidden;
            padding-right: 5px;
            white-space:nowrap;
            text-overflow:ellipsis;
            >span{
                color: #3c78ff;
            }
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