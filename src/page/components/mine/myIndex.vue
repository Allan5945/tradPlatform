<template>
    <div class="my-center">
        <div class="test">x</div>
        <myNav ></myNav>
        <div class="mine">
            <div class="my-msg">
                <div class="my-info">
                    <div class="my-pic">
                        <img :src='img' alt="">
                        <span class="iconfont">&#xe645;</span>
                    </div>
                    <div class="name">张二狗</div>
                    <div class="work-info">
                        <div class="position">太美航空&nbsp;市场部</div>
                        <div>成单量：<span>10</span></div>
                        <div>成单率：<span>50%</span></div>
                    </div>
                </div>
                <div class="my-list" >
                    <div class="my-list-item" :class="{'list-checked':index===chooseIndex}" v-for="(val,index) in myList" @click="choosePanel(val,index)">{{val}}</div>
                </div>
            </div>
        </div>
        <reviewList v-if="chooseIndex===0"></reviewList>
        <operAgent v-if="chooseIndex===1"></operAgent>
        <myCollection v-if="chooseIndex===2"></myCollection>
    </div>
</template>

<script>
import myNav from './myNav.vue';
import operAgent from './myOperAgent.vue';
import myCollection from './myCollection.vue';
import reviewList from './reviewList/viewTable.vue'



import myPic from './../../../static/img/haveline.png';
    export default {
        data(){
            return{
                myList:["审核列表","委托/托管","我的发布","我的意向","我的订单","我的收藏","公司账户"],
                isActive:false,
                chooseIndex: 0
            }
        },
        methods: {
            choosePanel:function (data,index) {
                this.chooseIndex = index;
            }
        },
        computed:{
            img:function(){
                return myPic;
            }
        },
        components: {
            myNav,
            operAgent,
            myCollection,
            reviewList
        }
    }
</script>

<style lang="scss" scoped>
    .test{
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .my-center{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        background: #fff;
        z-index:11;
        .mine{
            position:relative;
            width:100%;
            padding-top:200px;
            font-size:1.4rem;
            .my-msg{
                width:1000px;
                margin:0 auto;
            }

        }
    }
    .my-info{
        width:480px;
        height:280px;
        margin: 0 260px;
        .my-pic{
            position:relative;
            width:100px;
            height:100px;
            margin: 0 auto;
            img{
                width:100%;
                height:100%;
                border-radius:100%;
            }
            span{
                position:absolute;
                right:0;
                bottom:0;
                display:block;
                width:25px;
                height:25px;
                line-height:25px;
                text-align:center;
                color:#fff;
                background-color:#3c78ff;
                border-radius:100%;
                cursor:pointer;
            }
        }
        .name{
            height:40px;
            line-height:40px;
            margin:40px 0 20px 0;
            font-size:2.6rem;
            text-align:center;
        }
        .work-info{
            display:flex;
            justify-content: space-between;
            margin-bottom:40px;
            height:20px;
            line-height:20px;
            .position{
            margin:0 120px 0 20px;
            }
            span{
                color:#3c78ff;
            }
        }
    }
    .my-list{
        display:flex;
        width:100%;
        height:60px;
        line-height:60px;
        .my-list-item{
            flex:1;
            text-align:center;
            cursor:pointer;
            &:hover{
                border-bottom:3px solid #3c78ff;
            }
        }
        .list-checked{
            border-bottom:3px solid #3c78ff;
        }
    }

</style>
