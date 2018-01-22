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
        components: {

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
        destroyed: function () {
            alert("App has destroyed!");
        },
        computed: {
            ...vx.mapGetters([
                'c_updated',
                'airList'
            ])
        }
    }
</script>

<style>
    /* 通用滚动条样式 chrome */
    /*滚动条*/
    ::-webkit-scrollbar-thumb{
        background-color: rgb(195, 195, 195);
        height:50px;
        outline-offset:-2px;
        outline:0px solid #fff;
        -webkit-border-radius:4px;
    }
    /*---鼠标点击滚动条显示样式--*/
    ::-webkit-scrollbar-thumb:hover{
        background-color: rgb(205, 205, 205);
        cursor: pointer;
    }
    /*---滚动条大小--*/
    ::-webkit-scrollbar{
        width:6px;
        height:8px;
    }
    /*---滚动框背景样式--*/
    ::-webkit-scrollbar-track-piece{
        background-color:rgba(153, 153, 153, 0.1);
        -webkit-border-radius:0;
    }

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
        transform: translateY(-30px);
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