<template>
    <div class="nav-box">
        <div>新闻资讯</div>
        <div class="user-center">
            <div>
                <span class="icon-item">&#xe60f;</span>
                个人中心
                <span class="icon-item icon-item1">&#xe605;</span>
            </div>
            <div></div>
        </div>
        <div @click="toolShow = !toolShow">
            <div>
                <span class="icon-item">&#xe601;</span>
                &nbsp;工具 &nbsp;
                <span class="icon-item icon-item1">&#xe605;</span>
            </div>
            <tool v-if="toolShow"></tool>
        </div>
        <div>
            <div id="posted-btn">
                <span class="icon-item icon-cl">&#xe606;</span>
                发布
            </div>
            <div></div>
        </div>
    </div>
</template>
<script>
    import tool from './navList.vue'

    export default {
        data() {
            return {
                toolShow:false,
            }
        },
        components: {
            tool
        }
    }
</script>
<style scoped lang="scss">
    @mixin user-select {
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
    }

    .nav-box {
        position: absolute;
        right: 100px;
        top: 20px;
        z-index: 10;
        display: flex;
        color: #605E7C;
        width: 335px;
        font-size: 1.3em;
        background-color: rgba(251, 251, 251, 0.8);
        border-radius: 3px;
        @include user-select;
        > div {
            height: 30px;
            line-height: 30px;
            font-family: DemiLight;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-flow: row wrap;
            cursor: pointer;
            width: 105px;
            color: #605E7C;
            font-size:1em;
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
        font-size: 1.2em;
        font-family: iconfont;
    }
    .icon-item1{
        color: #446cea;
    }
    #posted-btn {
        width: 100px;
        border-radius: 15px;
        background-color: #446cea;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        height: 26px;
    }

    .icon-cl {
        color: white;
        display: inline-block;
        width: 25px;
        text-align: left;
    }
</style>