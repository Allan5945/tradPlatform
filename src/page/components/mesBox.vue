<template>
    <div class="message-box">
        <div class="message-head popup">
            <div class="mes-tip">
                <span class="number-mes">1000</span>条需求对象
            </div>
            <div class="mes-cont" :class="{mesContSet:search}" @mouseout.stop="closeSearch" @mouseover.stop="openSearch">
                <input :placeholder="holder" type="text" :disabled="!search" v-model="searchText">
                <span title="搜索">&#xe63a;</span>
            </div>
            <div class="screen">
                <span>&#xe6a7;</span>
            </div>
            <div class="amplification">
                <span>&#xe607;</span>
            </div>
        </div>
        <div class="popup tabulation">
            <div class="tabulation-head">
                <!--<div @mouseout="" @mouseover="">发布时间</div>-->
                <div @click="setd" class="setd">发布时间</div>
                <div>匹配度</div>
                <div>只看与我匹配的</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                search:false,
                holder:'',
                searchText:''
            }
        },
        methods:{
            openSearch:function(){
                this.holder = '搜索关键词';
                this.search = true;
            },
            closeSearch:function(){
                this.holder = '';
                this.search = false;
            },
            setd:function(){

            }
        }
    }
</script>
<style scoped lang="scss">
    .screen,.amplification{
        height: 25px;
        display: flex;
        width: 25px;
        justify-content: center;
        align-items: center;
        >span{
            font-family: iconfont;
            color:#605E7C;
            font-size: 1.7rem;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            line-height: 25px;
            cursor: pointer;
        }
    }
    .amplification{
        justify-content: flex-end;
    }
    .message-box {
        position: absolute;
        top: 100px;
        left: 40px;
        width: 340px;
        height: 80%;
    }
    .tabulation{
        padding: 0 20px;
    }
    .message-head {
        height: 40px;
        display: flex;
        flex-flow:row nowrap;
        align-items: center;
        margin: 0 0 2px 0;
        padding:0 20px;
    }
    .mes-tip{
        color:#959595 ;
    }
    .number-mes{
        color: #3c78ff;
    }
    .mes-cont{
        width: 153px;
        margin-left: 10px;
        display: flex;
        border-radius: 10px;
        height: 25px;
        >input{
            padding-left: 10px;
            border: none;
            outline: none;
            width: 115px;
            color:#605E7C;
            font-family: DemiLight;
            font-size: 1rem;
            background-color: transparent;
        }
        >span{
            font-family: iconfont;
            font-size: 2rem;
            color:#605E7C ;
            border: none;
            background-color:transparent ;
            padding: 0;
            cursor: pointer;
            display: inline-block;
            width:25px ;
            text-align: center;
            line-height: 25px;
        }
    }
    .mes-cont-set{
        background-color: #f4f4f4;
    }
    .mesContSet{
        background-color: #f4f4f4;
    }
    .tabulation-head{
        border-bottom:2px solid #b4dbff;
        display: flex;
        height: 58px;
        align-items: center;
        >div{
            padding: 0 15px 0 0;
            color:#3c78ff;
            font-size: 1.2rem;
            height: 100%;
            line-height: 58px;
        }
    }
    .setd{
        border-bottom:2px solid #3c78ff;
    }
</style>