<template>
    <div >
        <div class="content">
            <div class="banner">
                <div class="b-til">{{this.airportText}}机场</div>
                <div class="sidebar">
                    <div><span class="iconfont">&#xe603;</span>基本信息</div>
                     <div><span class="iconfont">&#xe624;</span>新闻舆情</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props:['qyCode','airportText'],
        watch: {
            "inputData": function(){
                this.updateData();
            },
            'airportText':function(){
                this.updateData();
            }
        },
       computed:{

        },
        methods: {

        },
        mounted() {

        },
        components:{

        }
    }
</script>

<style lang="scss" scoped>
    input{
        border:0;
        outline:0;
    }
    ul,li{
        list-style:none;
        padding:0;
        margin:0;
    }
    .content{
        width:1100px;
        height:1000px;
        margin-left:250px;
        margin-top:160px;
        background-color: #fff;
    }
    .banner{
        width:100%;
        height:100px;
        position:relative;
        background-color:pink;
        .b-til{
            width:210px;
            height:100px;
            text-align:center;
            line-height:100px;
            font-size:2.5rem;
        }
    }
    .sidebar{
        position:absolute;
        top:12px;
        right:-100px;
        >div{
            height:42px;
            line-height:42px;
            font-size:1.6rem;
            width:100px;
            display:flex;
            cursor:pointer;
            border-top-right-radius:5px;
            border-bottom-right-radius:5px;
            span{
                font-size:2.6rem;
            }
            &:hover{
                color:#fff;
                background-color:#3c78ff;
            }
        }
    }

</style>
