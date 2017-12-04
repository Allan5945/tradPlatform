<template>
    <div class="iconList">
        <div class="iconList-item" v-for="key in iconList"><img v-bind:src="key.iconUrl" alt="">{{key.name}}</div>
    </div>
</template>
<script>
    import hxxq from './../../static/img/hxxq.png'
    import ylxq from './../../static/img/ylxq.png'
    import fcqq from './../../static/img/fcqq.png'
    import hd from './../../static/img/hd.png'
    export default {
        data() {
            return {
                url:"",
                iconList: [
                    {
                        name:"航线需求",
                        iconUrl:hxxq
                    },
                    {
                        name:"运力需求",
                        iconUrl:ylxq
                    },
                    {
                        name:"我发出的需求",
                        iconUrl:fcqq
                    },
                    {
                        name:"航点",
                        iconUrl:hd
                    }
                ]
            }
        }
    }
</script>
<style scoped lang="scss">
    .iconList{
        position: absolute;
        right:40px;
        bottom: 40px;
        display: flex;
        flex-flow: row nowrap;
    }
    .iconList-item{
        display: flex;
        flex-flow:row nowrap;
        align-items: center;
        padding: 0 13px;
        font-size: 1.2rem;
        color: #605E7C;
        >img{
            margin-right: 6px;
        }
    }
</style>