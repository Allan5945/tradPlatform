<template>
    <div id="app" @click="close();">
        <router-view id="case"></router-view>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    export default {
        name: 'app',
        data() {
            return {

            }
        },
        methods: {
            ...vx.mapActions([
                'close'
            ]),
            toShow() {
                this.show = !this.show;
            }
        },
        mounted: function () {

        },
        computed: {
            ...vx.mapGetters([
                'c_updated',
                'airList'
            ])
        },
        components: {

        }
    }
</script>

<style>
    /*通用動畫效果*/
    /*淡入淡出*/
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
        opacity: 0
    }
    /* 下上劃入*/
    .slidey-fade-enter-active {
        transition: all .3s ease;
    }
    .slidey-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slidey-fade-enter, .slidey-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateY(30px);
        opacity: 0;
    }
    /* 左右劃入*/
    .slidex-fade-enter-active {
        transition: all .3s ease;
    }
    .slidex-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slidex-fade-enter, .slidex-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateX(50px);
        opacity: 0;
    }

    .dialog-enter-active, .dialog-leave-active {
        transition: opacity .3s;
    }
    .dialog-enter, .dialog-leave-to{
        opacity: 0;
    }
    /* 机场控件 */

</style>