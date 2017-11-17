<template>
    <div class="container">
        <div class="bg-color must">
            联系人：
        </div>
        <div class="bg-color choose">
            <div class="first items">
                <div class="start item">
                    <div class="top">始发点类型</div>
                    <div class="bottom">请先选择始发地类型</div>
                </div>
                <div class="pass item">
                    <div class="top">经停点按类型</div>
                    <div class="bottom">请先选择经停点类型（选填）</div>
                </div>
                <div class="arrive item">
                    <div class="top">到达点类型</div>
                    <div class="bottom">请先选择到达点类型</div>
                </div>
            </div>
            <div class="second items">
                <div class="start item">
                    <div class="sec-accept">
                        <div class="top">是否接受临近机场</div>
                        <div class="bottom">
                            <div class="vertical-center">
                                <input type="radio" name="airport-a" id="airAYes"><label for="airAYes">是</label>
                            </div>
                            <div class="vertical-center">
                                <input type="radio" name="airport-a" id="airANo"><label for="airANo">否</label>
                            </div>
                        </div>
                    </div>
                    <div class="sec-resource">
                        <div class="top">出港资源</div>
                        <div class="resource-time">
                            <input type="radio" name="airport-b" id="airAResYes"><label for="airAResYes">有</label>
                            <div class="time-frame">00:00</div>-
                            <div class="time-frame">00:00</div>
                        </div>
                        <div class="resource-others">
                            <div class="vertical-center">
                                <input type="radio" name="airport-b" id="airAWait"><label for="airAWait">带协调</label>
                            </div>
                            <div class="vertical-center">
                               <input type="radio" name="airport-b" id="airAEnough"><label for="airAEnough">时刻充足</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pass item">
                    <div class="sec-accept">
                        <div class="top">是否接受临近机场</div>
                        <div class="bottom">
                            <div class="vertical-center">
                                <input type="radio" name="airport-b" id="airBYes"><label for="airBYes">是</label>
                            </div>
                            <div class="vertical-center">
                                <input type="radio" name="airport-b" id="airBNo"><label for="airBNo">否</label>
                            </div>
                        </div>
                    </div>
                    <div class="sec-resource">
                        <div class="top">出港资源</div>
                        <div class="resource-time">
                            <input type="radio" name="airport-c" id="airBResYes"><label for="airBResYes">有</label>
                            <div class="time-frame">00:00</div>-
                            <div class="time-frame">00:00</div>
                        </div>
                        <div class="resource-others">
                            <div class="vertical-center">
                                <input type="radio" name="airport-c" id="airBWait"><label for="airBWait">带协调</label>
                            </div>
                            <div class="vertical-center">
                                <input type="radio" name="airport-c" id="airBEnough"><label for="airBEnough">时刻充足</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="arrive item">
                    <div class="sec-accept">
                        <div class="top">是否接受临近机场</div>
                        <div class="bottom">
                            <div class="vertical-center">
                                <input type="radio" name="airport-c" id="airCYes"><label for="airCYes">是</label>
                            </div>
                            <div class="vertical-center">
                                <input type="radio" name="airport-c" id="airCNo"><label for="airCNo">否</label>
                            </div>
                        </div>
                    </div>
                    <div class="sec-resource">
                        <div class="top">出港资源</div>
                        <div class="resource-time">
                            <input type="radio" name="airport-d" id="airCResYes"><label for="airCResYes">有</label>
                            <div class="time-frame">00:00</div>-
                            <div class="time-frame">00:00</div>
                        </div>
                        <div class="resource-others">
                            <div class="vertical-center">
                                <input type="radio" name="airport-d" id="airCWait"><label for="airCWait">带协调</label>
                            </div>
                            <div class="vertical-center">
                                <input type="radio" name="airport-d" id="airCEnough"><label for="airCEnough">时刻充足</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="third items">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
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
    $font-color: gray;
    $border-color: gray;

    .vertical-center {
        display: flex;
        align-items: center;
    }

    .container {
        padding: 20px 20px 44px 20px;
        width: 620px;
        background: white;
    }
    .bg-color {
        background: #FBFBFB;
    }
    .must {
        padding: 20px;
        margin-bottom: 10px;
    }
    .choose {
        padding: 0 20px;
    }
    .first {
        display: flex;
        justify-content: space-around;
        padding: 20px 0 10px 0;
        .item {
            color: $font-color;
            .top {
                display: flex;
                margin-bottom: 24px;
                height: 24px;
                line-height: 24px;
                border: 1px solid gray;
            }
            .bottom {
                height: 18px;
                line-height: 18px;
                border-bottom: 2px solid $border-color;
            }
        }
        .start {
            width: 160px;
        }
        .pass {
            width: 140px;
        }
        .arrive {
            width: 160px;
        }
    }
    .second {
        display: flex;
        justify-content: space-around;
        padding: 10px 0 20px 0;
        .item {

        }
        .start {
            width: 160px;
        }
        .pass {
            width: 140px;
        }
        .arrive {
            width: 160px;
        }
    }
    .sec-accept {
        margin-bottom: 20px;
        .top {
            height: 20px;
        }
        .bottom {
            display: flex;
            height: 20px;
        }
    }
    .sec-resource {
        .top {
            height: 20px;
        }
        .resource-time {
            display: flex;
            align-items: center;
            height: 40px;
            .time-frame {
                padding: 0 6px;
                height: 24px;
                line-height: 24px;
                border: 1px solid $border-color;
            }
        }
        .resource-others {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 20px;
        }
    }
</style>