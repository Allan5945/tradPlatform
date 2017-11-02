<template>
    <div class="nav-box">
        <div>新闻资讯</div>
        <div class="user-center">
            <div>
                <span>&#xe6d3;</span>
                个人中心
                <span>&#xe708;</span>
            </div>
            <div></div>
        </div>
        <div>工具</div>
        <div>发布</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                d: 5
            }
        }
    }
</script>
<style scoped lang="scss">
    @mixin user-select{
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
    }
    .nav-box {
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: 10;
        display: flex;
        color: #605E7C;
        width: 420px;
        font-size: 1.3em;
        @include user-select;
        > div {
            height: 30px;
            line-height: 30px;
            font-family: DemiLight;
            display: flex;
            justify-content: center;
            cursor: pointer;
            width: 100px;
        }
        >div:hover{
            color: #446cea;
        }
        >div:active{
            color: #446cea;
        }
    }
    .user-center{

    }
</style>