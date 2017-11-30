<template>
    <div class="alres-container">
        <div class="top">是否接受临近机场</div>
        <div class="bottom">
            <div class="vertical-center">
                <input type="radio" class="magic-radio" name="airport-a" id="airAYes" @change="dptAcceptnearairport = 0"><label for="airAYes" class="input-label">是</label>
            </div>
            <div class="vertical-center">
                <input type="radio" class="magic-radio" name="airport-a" id="airANo" checked @change="dptAcceptnearairport = 1"><label for="airANo" class="input-label">否</label>
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
    $icon-color: #3c78ff;
    $font-color: #605e7c;
    /****************radio样式更改******************/
    .magic-radio {
        position: absolute;
        display: none;
    }
    .magic-radio + label {
        display: flex;
        align-items: center;
        cursor: pointer;
        vertical-align: middle;
        &:before {
            padding-right: 5px;
            font-family: iconfont;
            font-size: 1.7rem;
            color: $font-color;
            content: '\e61c';
            border-radius: 50%;
        }
    }
    .magic-radio:checked + label {
        &:before {
            content: '\e622';
            color: $icon-color;
        }
    }
    /****************************/
    .alres-container {
        margin-bottom: 20px;
        width: 160px;
        .top {
            height: 20px;
        }
        .bottom {
            display: flex;
            height: 20px;
        }
    }
</style>