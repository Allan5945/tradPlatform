<template>
    <div>
        <div class="nav-box popup" @click="colsePublish">
            <div class="font-bold-x nav1">
                <router-link to="/index" class="a-click">首页</router-link>
            </div>
            <div class="font-bold-x nav1">
                <router-link to="/index/opinion" class="a-click">新闻舆情</router-link>
            </div>
            <div @click.stop="userShow = !userShow;toolShow = false" class="user-center nav2">
                <div class="nav-title">
                    <span class="icon-item">&#xe60f;</span>
                    <span class="font-bold-x">个人中心</span>
                    <span class="icon-item icon-item1">&#xe605;</span>
                </div>
                <userCenter v-if="userShow" v-on:showSet="showSetting"></userCenter>
            </div>
            <div @click.stop="toolShow = !toolShow;userShow=false" class="nav3">
                <div class="nav-title">
                    <span class="icon-item">&#xe601;</span>
                    <span class="font-bold-x">工具 &nbsp;</span>
                    <span class="icon-item icon-item1">&#xe605;</span>
                </div>
                <tool v-if="toolShow"></tool>
            </div>
            <div>
                <div id="posted-btn" class="btn btn-b nav-title" @click.stop="publish">
                    <span class="icon-item icon-cl">&#xe606;</span>
                    发布
                </div>
            </div>
            <setting v-if="settingsShow" v-on:closeSet="closeSetting"></setting>
        </div>
        <toPublish v-if="publichShow"></toPublish>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import tool from '../toolbar/tools.vue'
    import userCenter from '../toolbar/userCenter.vue'
    import setting from '$src/page/components/setting/container.vue'
    import toPublish from '$src/page/components/toPublish.vue'
    export default {
        data() {
            return {
                toolShow:false,
                userShow:false,
                settingsShow: false,
                publichShow:false
            }
        },
        components: {
            tool,
            userCenter,
            setting,
            toPublish
        },
        methods:{
            publish() {
                this.publichShow = !this.publichShow;
                this.toolShow = false;
                this.userShow = false;
            },
            colsePublish(){
                this.publichShow = false;
            },
            showSetting(){
                this.settingsShow = true;
            },
            closeSetting(){
                this.settingsShow = false;
            }
        },
        watch:{
            close:function () {
                this.toolShow = false;
                this.userShow = false;
            }
        },
        computed:{
            ...vx.mapGetters([
                'close'
            ]),
        },
    }
</script>
<style scoped lang="scss">
    @mixin user-select {
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
    }
    .font-bold-x:hover{
        font-weight: bold;
    }
    .nav1{
        width: 126px;
    }
    .nav2,.nav3{
        width: 126px;
    }
    .a-click{
        display: inline-flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
    }
    .nav-title{
        height: 40px;
        display: flex;
        align-items: center;
        padding-left: 14px;
    }
    .nav-box {
        position: fixed;
        right: 60px;
        top:40px;
        z-index: 15;
        display: flex;
        color: #605E7C;
        width: 606px;
        font-size: 1.4rem;
        height: 40px;
        @include user-select;
        >div:last-of-type{
            left: 506px;
            width: 134px;
            position: absolute;
            height: 40px;
            display: flex;
            align-items: center;
        }
        > div{
            &:hover{
                color: #446cea;
                cursor: pointer;
                /*background-color: rgba(229, 229, 229, .2);*/
            }
            >a:hover {
                color: #446cea;
                background-color: rgba(229, 229, 229, .2);
            }
        }
        > div{
            &:active{
                color: #446cea;
                cursor: pointer;
            }
            >a:active {
                color: #446cea;
            }
        }
    }
    .icon-item {
        font-size: 1.6rem;
        font-family: iconfont;
    }
    .icon-item1{
        color: #446cea;
    }
    #posted-btn {
        width: 120px;
        border-radius: 15px;
        height: 30px;
        color: white;
        box-shadow: 0px 2px 16px rgba(4, 7, 156,.4) !important;
        padding-left: 40px;
        justify-content: flex-start;
    }
    .icon-cl {
        color: white;
        display: inline-block;
        width: 25px;
        text-align: left;
    }
</style>
