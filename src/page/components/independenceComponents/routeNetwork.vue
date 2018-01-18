<template>
    <div class="route-network user-select" v-if="role.role!='2'">
        航线网络图
        <div id='turnLine' @click="change" :class="{'iskg0':!ched,'iskg1':ched}" class='iskg'>
            <span :class="{'iskgCkecked':ched}" class='turn-off'>&#xe61e;</span>
        </div>
    </div>
</template>
<script>
    import * as vx from 'vuex';
    import tabulationBoxTrigger from "$src/public/js/tabulationBoxTrigger.js";
    export default {
        data() {
            return {
                ched: true
            }
        },
        methods: {
            change: function () {
                this.ched = !this.ched;
                tabulationBoxTrigger.$emit('routeNetwork',this.ched);
            }
        },
        computed:{
            ...vx.mapGetters([
                'role'
            ])
        },
        mounted:function () {
        }
    }
</script>
<style scoped lang="scss">
    .route-network {
        position: absolute;
        right: 40px;
        bottom: 85px;
        display: flex;
        color: #605E7C;
    }
    .iskg {
        display: inline-block;
        width: 35px;
        height: 16px;
        border-radius: 8px 8px 8px 8px;
        vertical-align: top;
        margin-right: 10px;
        cursor: pointer;
        position: relative;
        background-color:#605E7C;
        margin-left: 10px;
    }
    .iskg0 {
        background-color:#57b57a;
    }
    .turn-off {
        font-family: iconfont;
        font-size: 12px;
        color: white;
        position: relative;
        left: 3px;
        top: 1px;
        transition: left .15s linear;
    }

    .iskg0:before {
        content: 'ON';
        position: absolute;
        right: -1px;
        font-size: 12px;
        bottom: 1px;
        color: white;
        transform: scale(.7);
    }

    .iskg1:before {
        content: 'OFF';
        position: absolute;
        left: -2px;
        font-size: 12px;
        bottom: 1px;
        color: white;
        transform: scale(.7);
    }

    .iskgCkecked {
        left: 20px;
    }
</style>