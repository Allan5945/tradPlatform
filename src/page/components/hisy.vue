<template>
    <div class="history-list popup-x1">
        <div @click="res(key)" v-for="(key,i) in list"><span class="icon">&#xe646;</span>{{key.replace(/"/g,'')}}</div>
        <div class="clear-history">
            <div class="btn btn-w" @click="clear">清空历史</div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                list:[]
            }
        },
        mounted:function () {
            this.list = localStorage.getItem('hisyData').split(',');
        },
        methods:{
            res:function (vl) {
                this.$emit('reshsy',vl);
            },
            clear:function () {
                this.list = [];
                localStorage.removeItem('hisyData');
                this.$emit('clear');
            }
        }
    }
</script>
<style scoped lang="scss">
    @mixin user-select {
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
    }
    .history-list{
        >div{
            padding: 0 14px;
            height: 35px;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            color: #605E7C;
            letter-spacing: 0.2px;
        }
    }
    .icon{
        font-family: iconfont;
        color: #d1d1d1;
        font-size: 2rem;
        margin-right: 15px;
    }
    .clear-history{
        border-top: 1px solid #f0f0f0;
        padding: 0 0 !important;
        width:234px ;
        margin: 0 auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        >div{
            border-radius: 10px;
            font-size: 1.2rem;
            padding: 2px 7px;
            box-shadow: 1px 2px 6px #bebebe;
            color: #605E7C;
            cursor: pointer;
            @include user-select;
        }
    }
</style>