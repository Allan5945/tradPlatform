<template>
    <div class="alp-wrapper">
        <div class="container">
            <span class="close-icon">&times;</span>
            <div class="first">
                是否确认缴纳意向金****元
            </div>
            <div class="second">
                <button class="btn btn-b">确认缴纳</button>
                <button class="btn btn-w">取消</button>
            </div>
            <div class="third">
                <span class="left">*若交易失败，意向金将退回到您的账号</span>
                <span class="right">申请代付意向金&gt;</span>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {}
        },
        components: {}
    }
</script>
<style lang="scss" scoped>
    .btn-b {
        border: 0;
        border-radius: 20px;
        background:  #3c78ff;
        color: white;
        font-size: 1.5rem;
        box-shadow: -1px 2px 6px  #3c78ff;
        &:hover {
            opacity: 0.7;
        }
    }
    .btn-w {
        font-size: 1.5rem;
        border: 1px solid  #3c78ff;
        border-radius: 20px;
        background: transparent;
    }
    .alp-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.4);
        z-index: 2;
    }
    .container {
        position: relative;
        width: 480px;
        height: 280px;
        background: white;
    }
    .close-icon {
        position: absolute;
        top: 18px;
        right: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 22px;
        height: 22px;
        border: 1px solid gray;
        border-radius: 100%;
    }
    .first {
        display: flex;
        justify-content: center;
        margin-top: 100px;
        margin-bottom: 60px;
        font-size: 20px;
        line-height: 20px;
    }
    .second {
        display: flex;
        margin-bottom: 26px;
        button {
            padding: 9px 0;
            outline: none;
            font-size: 1.5rem;
            line-height: 20px;
            cursor: pointer;
        }
        .btn-b {
            margin-left: 113px;
            margin-right: 8px;
            width: 150px;
        }
        .btn-w {
            width: 100px;
        }
    }
    .third {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        font-size: 12px;
        .left {
            color: #605e7c;
        }
        .right {
            color: #3c78ff;
            cursor: pointer;
        }
    }
</style>