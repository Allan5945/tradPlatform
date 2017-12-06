<template>
    <div class="my-center">
        <myNav ></myNav>
        <div class="mine">
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
                <div class="my-list-item" :class="{selected:isActive}" v-for="(val,index) in myList" @click="getTable(index)">{{val}}</div>
            </div>
            <!--我的发布-->
             <myPublishList></myPublishList>

            <!--我的意向-->
             <!--<myPurposeList></myPurposeList>-->
        </div>
    </div>
</template>

<script>
import myNav from './myNav.vue';
import myPublishList from './myPublishList.vue';
import myPurposeList from './myPurposeList.vue';
import myPic from './../../../static/img/haveline.png';
    export default {
        data(){
            return{
                myList:["审核列表","委托/托管","我的发布","我的意向","我的订单","我的收藏","公司账户"],
                isActive: true
            }
        },
        methods: {
            getTable:function(i){

            }
        },
        computed:{
            img:function(){
                return myPic;
            }
        },
        components: {
            myNav,
//            myTable改成myPublishList
            myPublishList,//我的发布
            myPurposeList //我的意向
        }
    }
</script>

<style lang="scss" scoped>
    .my-center{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        font-size:1.4rem;
        background: #fff;
        z-index:11;
        .mine{
            width:1000px;
            padding-top:200px;
            margin:0 auto;
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
        .selected{
             border-bottom:3px solid #3c78ff;
        }
    }

</style>
