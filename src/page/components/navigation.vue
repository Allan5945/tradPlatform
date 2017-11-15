<template>
    <div class="nav-box popup">
        <div class="font-bold-x">新闻资讯</div>
        <div @click="userShow = !userShow;toolShow = false" class="user-center">
            <div>
                <span class="icon-item">&#xe60f;</span>
                <span class="font-bold-x">个人中心</span>
                <span class="icon-item icon-item1">&#xe605;</span>
            </div>
            <userCenter v-if="userShow"></userCenter>
        </div>
        <div @click="toolShow = !toolShow;userShow=false">
            <div>
                <span class="icon-item">&#xe601;</span>
                <span class="font-bold-x">工具 &nbsp;</span>
                <span class="icon-item icon-item1">&#xe605;</span>
            </div>
            <tool v-if="toolShow"></tool>
        </div>
        <div>
            <div id="posted-btn" class="btn btn-b">
                <span class="icon-item icon-cl">&#xe606;</span>
                发布
            </div>
            <div></div>
        </div>
    </div>
</template>
<script>
    import tool from './tools.vue'
    import userCenter from './userCenter.vue'
    export default {
        data() {
            return {
                toolShow:false,
                userShow:false,
            }
        },
        components: {
            tool,
            userCenter,
        }
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
    .nav-box {
        position: absolute;
        right: 100px;
        top: 20px;
        z-index: 10;
        display: flex;
        color: #605E7C;
        width: 335px;
        font-size: 1.4rem;
        @include user-select;
        > div {
            height: 30px;
            line-height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-flow: row wrap;
            cursor: pointer;
            width: 105px;
            color: #605E7C;
            font-size:1.4rem;
        }
        >div:last-of-type{
            position: absolute;
            left: 315px;
            width: 100px;
        }
        > div:hover {
            color: #446cea;
        }
        > div:active {
            color: #446cea;
        }
    }
    .user-center {

    }
    .icon-item {
        font-size: 1.6rem;
        font-family: iconfont;
    }
    .icon-item1{
        color: #446cea;
    }
    #posted-btn {
        width: 100px;
        border-radius: 15px;
        height: 26px;
        color: white;
    }

    .icon-cl {
        color: white;
        display: inline-block;
        width: 25px;
        text-align: left;
    }
</style>