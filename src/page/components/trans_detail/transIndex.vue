<template>
    <div>
        <respondAirport v-if="respond"  @responseClose="closeDetail" :demandId="mes.demand"></respondAirport>
        <myIntention v-if="intentShow" @closeIntent="closeDetail" :demandId="mes.demand"></myintention>
        <transAdmin v-if="adminShow" @closeAdmin="closeDetail"   :demand="mes.demand"></transAdmin>
    </div>
</template>

<script>
    import myIntention from './myIntention.vue'//航司方
    import respondAirport from './respondAirport.vue'//机场方
    import transAdmin  from './transAdmin.vue'//太美
    import * as vx from 'vuex';

    export default {
        data() {
            return {
                adminShow:false,
                respond:false,
                intentShow:false,
            }
        },
        props:['mes'],
        computed:{
             ...vx.mapGetters([
                    'role'
                ])
          },
        watch:{

        },
        methods: {
            closeDetail(){
                this.$emit('closewindow');
            },
        },
        mounted: function () {
            if( this.role.role == 1){
                this.respond = true;
            }else if( this.role.role == 0 ){
               this.intentShow = true;
            }else if( this.role.role == 2 ){
                this.adminShow = true;
            }
        },
        components: {
            myIntention,
            respondAirport,
            transAdmin
        }
    }
</script>

<style lang="scss">
</style>
