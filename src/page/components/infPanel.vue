<template>
    <div class="inf-box popup user-select" id="inf-mes-box" @click.stop>
        <div class="inf-head">
            <span>上海虹桥机场</span>
            <span>SHA/ZSSS</span>
            <span class="btn-w">&#xe62c;</span>
        </div>
        <div class="inf-mes">
            <div>
                <div>机场类型</div>
                <div>普通机场</div>
            </div>
            <div>
                <div>飞行区等级</div>
                <div>4F</div>
            </div>
            <div>
                <div>是否国际</div>
                <div>是</div>
            </div>
            <div>
                <div>放行准点率</div>
                <div>86%</div>
            </div>
            <div>
                <div>消防等级</div>
                <div>-</div>
            </div>
            <div>更多详情</div>
        </div>
        <div class="inf-associated">
            <div>关联航司</div>
            <div><img src="" alt=""></div>
        </div>
        <div class="inf-news">
            <div>滚动舆情</div>
            <div><img src="" alt=""></div>
        </div>
        <div class="inf-news">
            <div>最新政策</div>
            <div><img src="" alt=""></div>
        </div>
    </div>
</template>
<script>
    export default {}
</script>
<style lang="scss" scoped>
    .inf-box {
        cursor: pointer;
        width: 300px;
        height: 300px;
        position: absolute;
        top: 300px;
        left: 500px;
        display: none;
        overflow: hidden;
    }

    .inf-head {
        height: 40px;
        background-color: #e7e7e7;
        padding-left: 20px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        font-size: 14px;
        /*position: relative;*/
        > span:first-of-type {
            color: #605E7C;
            letter-spacing:.5px;
        }
        > span:nth-child(2){
            color: rgba(96,94,124,.7);
            padding-left: 12px;
            letter-spacing:.5px;
        }
        > span:nth-child(3){
            font-family: iconfont;
            font-size: 1.2rem;
            color: #3c78ff;
            border: none;
            padding: 0;
            cursor: pointer;
            display: inline-block;
            text-align: center;
            line-height: 15px;
            position: absolute;
            right: 10px;
            width: 15px;
            height: 15px;
            background-color: white;
            border-radius: 50%;
        }
    }
    .inf-mes{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        padding: 30px 20px 0 ;
        border-bottom: 1px solid #f3f3f3;
        >div{
            width: 70px;
            padding-bottom: 20px;
            > div:nth-child(1){
                font-size: 12px;
                color: #605e7c;
                height: 17px;
            }
            > div:nth-child(2){
                font-size: 12px;
                color: #605e7c;
                height: 23px;
                display: flex;
                align-items: flex-end;
                font-weight: bold;
            }
        }
    }
    .inf-associated{
        padding: 20px 0 0 20px;
        >div:nth-child(1){

        }
    }
    .inf-news{
        padding-left: 20px;
    }
</style>