<template>
    <span class="order">
        <span class="order-top" :class="{set:order.set}" @click="orderTop">&#xe605;</span>
        <span class="order-bottom" :class="{set:!order.set}" @click="orderBottom">&#xe605;</span>
    </span>
</template>
<script>
    export default {
        props:['order'],
        methods:{
            orderTop:function () {
                this.order.set = !this.order.set;
                this.$emit('update:order',this.order);
            },
            orderBottom:function () {
                this.order.set = !this.order.set;
                this.$emit('update:order',this.order);
            }
        }
    }
</script>
<style scoped lang="scss">
    @mixin user-select {
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
    }
    .order{
        position: relative;
        display: inline-block;
        height: 19px;
        >span{
            @include user-select;
            font-family: iconfont;
            cursor: pointer;
        }
    }
    .order-top{
        transform: rotate(180deg);
        display: inline-block;
        position: absolute;
        top: -1px;
        left: 0px;
    }
    .order-bottom{
        display: inline-block;
        position: absolute;
        top: 6px;
        left: 0px;
    }
    .set{
        color: #3c78ff;
    }
</style>