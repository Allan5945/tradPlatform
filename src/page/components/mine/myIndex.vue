<template>
    <div class="my-center" :class="{'my-center-z':hierarchy}">
        <div class="mine">
            <div class="my-msg">
                <div class="my-info">
                    <div class="my-pic">
                        <img :src='img' alt="头像">
                        <span class="iconfont">&#xe645;</span>
                    </div>
                    <div class="name">张二狗</div>
                    <div class="work-info">
                        <div class="position">太美航空&nbsp;市场部</div>
                        <div>成单量：<span>10</span></div>
                        <div>成单率：<span>50%</span></div>
                    </div>
                </div>
                <div class="my-list">
                    <router-link v-for="(val,index) in myList" :to="val.u" :key="index">
                        <div class="my-list-item" :class="{selected:(activeIndex == index)}" @click="activeIndex = index">{{val.n}}</div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="mine-loading" v-show="false"><img :src="loader" alt="加载中..."></div>
        <router-view></router-view>
    </div>
</template>

<script>
import reviewList from './reviewList/viewTable.vue'
import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js'
import myPic from '$src/static/img/145.jpg';
import loader from "$src/static/img/svg/loading-oval.svg"
    export default {
        data() {
            return {
                myList: [{
                    n: "审核列表",
                    u: '/index/userCenter/reviewList'
                }, {
                    n: "委托/托管",
                    u: '/index/userCenter/entrust'
                }, {
                    n: "我的发布",
                    u: '/index/userCenter/myRelease'
                }, {
                    n: "我的意向",
                    u: '/index/userCenter/myIntention'
                }, {
                    n: "我的订单",
                    u: '/index/userCenter/myOrder'
                }, {
                    n: "我的收藏",
                    u: '/index/userCenter/myCollection'
                }, {
                    n: "公司账户",
                    u: '/index/userCenter'
                }
                ],
                activeIndex: 0,
                loader,//加载动画
            }
        },
        methods: {
        },
        created:function () {
            //子路由刷新判断
            let path = this.$router.history.current.path;
            if(path.length>'/index/userCenter'.length){
                for(let i in this.myList){
                    if(this.myList[i].u == path){
                        this.activeIndex = i;
                    }
                }
            }
        },
        computed:{
            img:function(){
                return myPic;
            },
            hierarchy:function () {
                return tabulationBoxTrigger.hierarchy;
            }
        },
        components: {
        }
    }
</script>

<style lang="scss" scoped>
    .my-center-z{
        z-index: 16 !important;
    }
    .my-center {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        background: #fff;
        z-index: 11;
        .mine {
            position: relative;
            width: 100%;
            padding-top: 200px;
            font-size: 1.4rem;
            .my-msg {
                width: 1000px;
                margin: 0 auto;
            }

        }
    }

    .my-info {
        width: 480px;
        height: 280px;
        margin: 0 260px;
        .my-pic {
            position: relative;
            width: 100px;
            height: 100px;
            margin: 0 auto;
            img {
                width: 100%;
                height: 100%;
                border-radius: 100%;
            }
            span {
                position: absolute;
                right: 0;
                bottom: 0;
                display: block;
                width: 25px;
                height: 25px;
                line-height: 25px;
                text-align: center;
                color: #fff;
                background-color: #3c78ff;
                border-radius: 100%;
                cursor: pointer;
            }
        }
        .name {
            height: 40px;
            line-height: 40px;
            margin: 40px 0 20px 0;
            font-size: 2.6rem;
            text-align: center;
        }
        .work-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            height: 20px;
            line-height: 20px;
            .position {
                margin: 0 120px 0 20px;
            }
            span {
                color: #3c78ff;
            }

        }
    }

    .my-list {
        display: inline-flex;
        width: 100%;
        height: 60px;
        line-height: 60px;
        >a{
            flex: 1;
        }
        .my-list-item {
            text-align: center;
            cursor: pointer;
            &:hover {
                border-bottom: 3px solid #3c78ff;
            }
        }
        .selected {
            border-bottom: 3px solid #3c78ff;
        }
    }
    .mine-loading{
        width: 60%;
        height: 405px;
        margin-left: 20%;
        position: absolute;
        bottom:0px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #F8F8F8;
        z-index: 2;
    }
</style>
