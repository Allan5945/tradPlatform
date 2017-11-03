<template>
    <div class="tool" @click.stop>
        <div><span>&#xe671;</span>航路测算</div>
        <div><span>&#xe63b;</span>信息查询</div>
        <div><span>&#xe621;</span>时刻分布</div>
    </div>
</template>
<script>
    export default {}
</script>
<style scoped lang="scss">
    .tool {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        padding-left: 14px;
        background-color: white;
        border-radius: 5px;
        > div {
            width: 100%;
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            color: #605E7C;
            > span {
                font-family: iconfont;
                font-size: 1.2em;
                margin-right: 5px;
            }
        }
        > div:hover{
            color: #446cea;
        }
        > div:active{
            color: #446cea;
        }
    }
</style>