<template>
    <div>
        <needDetail  v-if="detailShow"  @closeDetail= "closeDetail" :needData="data" :demand="mes.demand"></needDetail>
        <respondAirport v-if="respond"  @responseClose="responClose" :demandId="mes.demand"></respondAirport>
        <myIntention v-if="intentShow" @closeIntent="closeDetail" :demandId="mes.demand"></myintention>
        <transAdmin v-if="adminShow" @closeAdmin="closeDetail"  @openAdmin="openAdmin" :demand="mes.demand"></transAdmin>
    </div>
</template>

<script>
    import needDetail from './needDetail.vue'//机场方（运力响应前我有意向）
    import myIntention from './myIntention.vue'//航司方
    import respondAirport from './respondAirport.vue'//机场方（运力响应后）
    import transAdmin  from './transAdmin.vue'//太美
    import * as vx from 'vuex';

    export default {
        data() {
            return {
                detailShow:false,
                adminShow:false,
                respond:false,
                intentShow:false,
                data:{},
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
            openIntent() {
                this.intentShow = true;
                this.detailShow = false;
                this.respond = false;

            },
            openAdmin() {
                this.adminShow = true;
            },
            responShow(){
                this.respond = true;
                this.detailShow = false;
                this.intentShow = false;
            },
            responClose(){
                this.$emit('closewindow');
            },
            transShow(){
                this.detailShow = true;
                this.respond = false;
                this.intentShow = false;
            },
           /* getNeedDetail(){
                this.$ajax({
                    method: 'post',
                    url: '/capacityRoutesDemandDetailFindById',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                      params: {
                        demandId: this.mes.demand
                    }
                })
                .then((response) => {
                    if(response.data.receiveIntention == null){
                        this.transShow();
                        this.data = response.data;
                    }else if(response.data.receiveIntention !== null){
                        this.responShow();
                        this.data = response.data;
                    }
                 })
                .catch((error) => {
                        console.log(error);
                 });
           }*/

        },
        mounted: function () {
            if( this.role.role == 1){
                //console.log(this.mes.demandType)
                this.respond = true;
            }else if( this.role.role == 0 ){
                this.openIntent();
            }else if( this.role.role == 2 ){
                this.openAdmin();
            }
        },
        components: {
            needDetail,
            myIntention,
            respondAirport,
            transAdmin
        }
    }
</script>

<style lang="scss">
</style>
