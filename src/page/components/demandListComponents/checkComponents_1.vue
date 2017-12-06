<template>
    <div class="fly-list">
        <div @click="setSubsidyPolicy(i)" v-for="(vl,i) in demandList.conditions.subsidyPolicy.va" :class="{'setBth':vl.s}">{{vl.v}}</div>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    export default {
        data(){
            return{

            }
        },
        methods:{
            ...vx.mapActions([
                'setSubsidyPolicy'
            ])
        },
        computed:{
            ...vx.mapGetters([
                'demandList'
            ])
        }
    }
</script>
<style scoped lang="scss">
    .fly-list{
        display: flex;
        flex-flow: row wrap;
        padding-left: 20px;
        color: #605E7C;
        >div{
            width: 40px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            border-radius: 15px;
            border: 1px solid rgba(96,94,124,.4);
            margin: 10px 12px 0 0;
            letter-spacing:.2px;
            color: rgba(96,94,124,.5);
            cursor: pointer;
            -moz-user-select: none;
            -khtml-user-select: none;
            user-select: none;
        }
    }
    .setBth{
        background-color: #ededed;
        color: #3c78ff !important;
        border: 1px solid transparent !important;
    }
</style>