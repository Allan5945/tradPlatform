<template>
    <!--<div class="demand" :class="{'demandMin':min,'demandMax':!min}">-->
    <div class="demand">
        <div class="demand-head">
            <div :class="{'demand-selected':demandSelected}" @click="changedemandSelected(true)">市场需求</div>
            <div :class="{'demand-selected':!demandSelected}" @click="changedemandSelected(false)">我发布的需求</div>
            <div class="screen" @click.stop>
                <div @click="openScreen" class="select-lis">
                    <span class="icon">&#xe6a7;</span>
                    筛选
                </div>
                <transition name="bounce">
                    <screen class="screen-hs" v-if="screenHsShow" v-on:screenHs="screenHs"></screen>
                </transition>
            </div>
            <div class="amplification" @click="openList">
                <div v-if="min"><span class="icon">&#xe618;</span>展开列表</div>
                <div v-if="!min"><span class="icon">&#xe61a;</span>收起列表</div>
            </div>
        </div>
        <mesMinComponent v-on:openMax="open" v-if="min" v-on:serah="serah"></mesMinComponent>
        <mesMaxComponent v-on:openMin="open" v-if="!min" v-on:serah="serah"></mesMaxComponent>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import mesMaxComponent from './mesMax.vue'
    import mesMinComponent from './mesMin.vue'
    import conversions from '../../../public/js/conversions'
    import screen from './screen-hs.vue'
    import In from '$src/public/js/tabulationBoxTrigger.js'

    export default {
        data() {
            return {
                min: true,
                screenHsShow: false,
                demandSelected:true
            }
        },
        methods: {
            changedemandSelected(t){
                this.$store.dispatch("demandType",t);
                this.demandSelected = t;
                if(this.demandList.type)this.serah();
            },
            serah(){
                let url = '/getOthersDemandListIndex';
                let page = this.demandList.hybridPage;
                if(!this.demandType)url = '/getDemandsByCurrentCheckedAirportForEmployee';
                if(!this.demandType)page = this.demandList.monoPage;
                this.$ajax({
                    url,
                    method: 'post',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    params: {
                        page:1
                    }
                }).then((response) => {
                    if (response.data.opResult == '0') {
                        this.$store.dispatch('hybridData', {v: response.data.list, t: 0}).then(() => {});
                    };
                })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            open: function (v) {
                if (v == 'min') {
                    this.min = true;
                } else {
                    this.min = false;
                }
            },
            screenHs: function (t) {
                if (!t) {
                    this.$store.dispatch('setCity', {v: '$&', t: false}).then(() => {
                    });
                    this.$store.dispatch('openScreen', false).then(() => {
                    });
                };
                this.screenHsShow = false;
            },
            openScreen: function () {
                this.screenHsShow = !this.screenHsShow;
            },
            closeSearch: function () {
               let input = document.getElementById("close-input");
                input.blur();
            },
            openList:function () {
                this.min = !this.min;
            }
        },
        components: {
            mesMinComponent,
            mesMaxComponent,
            screen,
        },
        beforeMount: function () {
            this.serah();
        },
        mounted(){
            In.$on("refreshDemandList",()=>{
                this.serah();
            });
            In.$on("tagModel",(t)=>{
                switch (t){
                    case 0:
                        this.$store.dispatch("demandType",true);
                        this.demandSelected = true;
                        break;
                    case 1:
                        this.$store.dispatch("demandType",false);
                        this.demandSelected = false;
                        break;
                }
            });
        },
        watch: {
            close: function () {
                this.isSearch = false;
                this.openHisy = false;
                this.screenHsShow = false;
                this.closeSearch();
            }
        },
        computed: {
            ...vx.mapGetters([
                'demandList',
                'close',
                'demandType'
            ])
        }

    }
</script>
<style scoped lang="scss">
    @keyframes bounce-in {
        0% {
            width: 0;
            height: 0;
        }
        100% {
            width: 280px;
            height: 420px;
        }
    }

    @keyframes myfirst {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(-360deg);
        }
    }

    .bounce-enter-active {
        animation: bounce-in .3s;
    }

    .search-set {
        color: #3c78ff !important;
    }

    .bounce-leave-active {
        animation: bounce-in .3s reverse;
    }

    .screen-hs {
        position: absolute;
        top: 33px;
        left: 5px;
        z-index: 11;
    }
    .demand-selected{
        background-color: #3c78ff;
        color: white !important;
    }
    .demand {
        position: absolute;
        /*background-color: red;*/
        height: 100%;
        top: 0;
        left: 0;
        background-color: white;
        /*display: flex;*/
        /*flex-flow: column;*/
    }
    .select-lis{
        width: 100%;
    }
    .demand-head {
        height: 44px;
        background-color: white;
        display: flex;
        border: 1px solid rgba(0,0,0,.1);
        cursor: pointer;
        > div {
            flex: 1;
            text-align: center;
            color: #605E7C;
            line-height: 44px;
            border-right: 1px solid rgba(0,0,0,.1);
            &:hover{
                color: #3c78ff;
            }
        }
        > div:nth-child(4) {
            border-right: none;
        }

    }
    .demandMin {
        top: 0;
        left: 0;
        background-color: white;
    }
    .demandMax {
        top: 100px;
        left: 50%;
        margin: 0 0 0 -500px;
    }


    .screen, .amplification {
        display: flex;
        width: 25px;
        justify-content: center;
        align-items: center;
        position: relative;
        > div:hover{
            color: #3c78ff;
        }
    }
    .icon{
        font-family: iconfont;
        font-size: 2rem;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        line-height: 25px;
        cursor: pointer;
        display:inline-block;
        transform: translate(0,3px);
    }
</style>