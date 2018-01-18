<template>
    <div class="ci-container" @click.self="closeThisFn">
        <img :src="srcImg" alt="电子凭证">
    </div>
</template>
<script>

    export default {
        props: ['srcImg'],
        data() {
            return {

            }
        },
        methods: {
            closeThisFn: function () {
                this.$emit('closeThis')
            },
        }
    }
</script>
<style lang="scss" scoped>
    .ci-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, .4);
        z-index: 20;
    }
</style>