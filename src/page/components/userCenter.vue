<template>
    <div class="tool popup" @click.stop>
        <div><span>&#xe611;</span>设置</div>
        <div><span>&#xe610;</span>个人资料</div>
        <div><span>&#xe647;</span>退出</div>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    export default {
        watch:{
//            close:function () {
//
//            }
        },
        computed:{
            ...vx.mapActions([
                'close'
            ]),
        }
    }
</script>
<style scoped lang="scss">
    @import "./../../public/css/dropDowBbox";
</style>