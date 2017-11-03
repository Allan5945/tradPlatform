<template>
    <div class="iconList">
        <div class="iconList-item" v-for="key in iconList"><img v-bind:src="key.iconUrl" alt="">航线需求</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                url:"",
                iconList: [
                    {
                        name:"航线需求",
                        iconUrl:"/src/static/img/hxxq.png"
                    },
                    {
                        name:"运力需求",
                        iconUrl:"/src/static/img/ylxq.png"
                    },
                    {
                        name:"我发出的需求",
                        iconUrl:"/src/static/img/fcqq.png"
                    },
                    {
                        name:"航点",
                        iconUrl:"/src/static/img/hd.png"
                    }
                ]
            }
        }
    }
</script>
<style scoped lang="scss">
    .iconList{
        position: absolute;
        right:20px;
        bottom: 30px;
        display: flex;
        flex-flow: row nowrap;
    }
    .iconList-item{
        display: flex;
        flex-flow:row nowrap;
        align-items: center;
        padding: 0 13px;
        >img{
            margin-right: 6px;
        }
    }
</style>