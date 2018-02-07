<template>
    <div  class="wrapper" @click.self="closeDetail">
            <companyAirlineDetailPayAfter v-if="mes.demandType == '0' " :mes="mes" @closewindow="closeDetail" ></companyAirlineDetailPayAfter>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import tabulationBoxTrigger from '$src/public/js/tabulationBoxTrigger.js'
    /*import transIndex from '$src/page/components/trans_detail/transIndex.vue'*/
    import companyAirlineDetailPayAfter from './companyAirlineDetailPayAfter.vue'
    export default {
        data() {
            return {
                mes:{       //demand  , demandState 需求状态 ,demandType  需求类型
                    demand:"",
                    demandState:"",
                    demandType:""
                }
            }
        },
        props:['needData'],
        mounted() {
            tabulationBoxTrigger.hierarchy = true;
            this.mes.demand = this.needData.id;
             this.mes.demandType = this.needData.demandType;
             //console.info(this.mes)
        },
        computed: {
            ...vx.mapGetters([
                'role'
            ]),
        },
         destroyed: function () {
            tabulationBoxTrigger.hierarchy = false;
        },
        methods: {
             closeDetail:function(){
            this.$emit('closeDetail');
         },
        },
        components: {
            companyAirlineDetailPayAfter
        }
    }
</script>
<style lang="scss" scoped>
     .wrapper{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.1);
        z-index: 11;
    }
</style>
