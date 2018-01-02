<template>
    <div class="info-wrapper">
        <div class="airport-info">
            <div class="top">
                <div class="name">绵阳南郊</div>
                <div class="icon" @click="close"><span class="iconfont">&#xe62c;</span></div>
            </div>
            <div class="content">
                <div class="detail">
                    <div class="box">
                        <div class="box-til"><span class="iconfont">&#xe627;</span>基本信息</div>
                        <ul class="box-item">
                            <li><div>机场基准点坐标及其在机场的位置</div><div>N3323dsdsd(跑道中心)</div></li>
                            <li><div>与城市的位置关系</div><div>N3323dsdsd(跑道中心)</div></li>
                            <li><div>机场标高/基准温度</div><div>N3323dsdsd(跑道中心)</div></li>
                            <li><div>机场标高位置/高程异常</div><div>N3323dsdsd(跑道中心)</div></li>
                            <li><div>磁差/年变率</div><div>N3323dsdsd(跑道中心)</div></li>
                            <li><div>机场开放时间</div><div>N3323dsdsd(跑道中心)</div></li>
                            <li><div>允许飞行种类</div><div>N3323dsdsd(跑道中心)</div></li>
                            <li><div>机场性质/飞行区指标</div><div>N3323dsdsd(跑道中心)</div></li>
                            <li class="li-note"><div>备注</div><div>N备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注</div></li>
                            <li class="li-note"><div>机场管理部门、地址、电话、地址</div><div>备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注</div></li>
                        </ul>
                    </div>
                </div>
                <div class="sidebar">

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
        computed:{

        },
        methods: {
            close(){
                this.$emit('closeDetail');
            }

        },
        mounted() {

        },
        components:{

        }
    }
</script>

<style lang="scss" scoped>
  ul,li{
        list-style:none;
        padding:0;
        margin:0;
    }
    .info-wrapper{
        position: fixed;
        width: 100%;
        height:100%;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.5);
        z-index: 20;
        .airport-info{
            position:absolute;
            left:0;
            top:0;
            right:0;
            bottom:0;
            margin:auto;
            width:1350px;
            height:800px;
            z-index: 99;
            color:#605e7c;
            background-color:#ffffff;
        }
    }
    .top{
        width:100%;
        height:70px;
        background-color:#3c78ff;
        display:flex;
        justify-content: space-between;
        box-sizing:border-box;
        padding:0 25px 0 17px;
        color:#fff;
        .name{
            line-height:70px;
            font-size:1.8rem;
        }
        .icon{
            width:20px;
            height:20px;
            margin:25px 0;
            line-height:20px;
            color:#3c78ff;
            text-align:center;
            background-color:#fff;
            border-radius:100%;
            cursor:pointer;
            .iconfont{
                font-size:1.2rem;
            }
        }
    }
    .content{
        width:100%;
        display:flex;
        .detail{
            width:1100px;
        }
        .sidebar{
            width:250px;
        }
    }
    .box{
        .box-til{
            height:50px;
            line-height:50px;
            font-size:1.5rem;
            margin:20px 0 0 26px;
            border-bottom:1px solid #ccc;
            display:flex;
            justify-content: start;
            .iconfont{
                font-size:2.4rem;
            }
        }
        .box-item{
            width:100%;
            box-sizing:border-box;
            padding:37px 60px 0 0;
            display:flex;
            flex-wrap: wrap;
            li{
                width:520px;
                display:flex;
                height:40px;
                line-height:40px;
                >div:first-of-type{
                    width:230px;
                    padding-right:10px;
                    text-align:right;
                }
                >div:last-of-type{
                    width:270px;
                    padding-left:10px;
                }
            }
            .li-note{
                width:100%;
                 >div:last-of-type{
                    width:790px;
                }
            }
        }
    }
</style>
