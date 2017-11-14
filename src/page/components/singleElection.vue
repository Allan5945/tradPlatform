<template>
    <span @click="seted" class="acquiescence" :class="{'acquiescenceSet':single.set}">&#xe723;</span>
</template>
<script>
    export default {
        props:['single'],
        methods:{
            seted:function () {
                this.single.set = !this.single.set;
                this.$emit('update:single', this.single);
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
    .acquiescence{
        @include user-select;
        font-family: iconfont;
        font-size: 1.7rem;
        cursor: pointer;
        width: 17px;
        height: 19px;
        display: inline-block;
        position: relative;
    }
    .acquiescenceSet:before{
        width: 17px;
        height: 19px;
        content: '\e6cc';
        font-size: 1.4rem;
        position: absolute;
        display: inline-block;
        top: 3px;
        left: 0;
        color: #3c78ff;
    }
</style>