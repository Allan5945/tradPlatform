<template>
    <div class="tabulation-box">
        <div>
            <div class="tabulation-item">
                <img src="./../../static/img/hx.png" alt="">
                <p>成都双流-北京首都-北京首都</p>
                <div>----</div>
            </div>
            <div class="tabulation-mes">
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
            </div>
        </div>
        <div>
            <div class="tabulation-item">
                <img src="./../../static/img/haveline.png" alt="">
                <p>成都双流-北京首都-北京首都</p>
                <div>----</div>
            </div>
            <div class="tabulation-mes">
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
            </div>
        </div>
        <div>
            <div class="tabulation-item">
                <img src="./../../static/img/haveyun.png" alt="">
                <p>成都双流-北京首都-北京首都</p>
                <div>----</div>
            </div>
            <div class="tabulation-mes">
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
            </div>
        </div>
        <div>
            <div class="tabulation-item">
                <img src="./../../static/img/yun.png" alt="">
                <p>成都双流-北京首都-北京首都</p>
                <div>----</div>
            </div>
            <div class="tabulation-mes">
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{

            }
        }
    }
</script>
<style scoped lang="scss">
    .class-item0:after{
        position: absolute;
        /*background: url('./../../static/img/hx.png') no-repeat;*/
        left: 0px;
        top: 0px;
    }
    .tabulation-mes{
        >div{
            >span{
                display: inline-block;
                padding-bottom: 5px;
                color: #c8c8c7;
                font-size: 1.2rem;
            }
            >div{
                font-size: 1.3em;
                color: #605E7C;
            }
        }
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }
    .tabulation-item{
        height: 40px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        width: 100%;
        position: relative;
        >img{
            position: absolute;
            width: 15px;
            height: 20px;
            left: -38px;
            top: 2px;
        }
        >p{
            font-size: 1.7rem !important;
            width: 150px;
            display: inline-block;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            margin: 0;
        }
        >div{

        }
    }
    .tabulation-box{
        position: relative;
        /*height: 564px;*/
        >div{
            height: 120px;
            /*display: flex;*/
            /*flex-flow: column nowrap;*/
            /*justify-content: center;*/
            padding: 20px 0 0 40px;
            border-bottom: 1px solid #f3f3f3;
        }
    }
</style>