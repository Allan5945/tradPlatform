<template>
    <div class="trans-wrapper"  @click.self="closeDetail">
        <respondAirport v-if="respond"  @responseClose="closeDetail" :demandId="mes.demand"></respondAirport>
        <myIntention v-if="intentShow" @closeIntent="closeDetail" :demandId="mes.demand"></myintention>
    </div>
</template>

<script>
    import myIntention from './myIntention.vue'//航司方
    import respondAirport from './respondAirport.vue'//机场方
    import * as vx from 'vuex'

    export default {
        data() {
            return {
                respond:false,
                intentShow:false,
                isSelf:false
            }
        },
        props:['mes'],
        computed:{
             ...vx.mapGetters([
                    'role'
                ])
          },
        watch:{
            'mes.demand':function(){
                if(this.role.role == 2 ){
                    this.init();
                }
            }
        },
        methods: {
            closeDetail(){
                this.$emit('closewindow');
            },
            init(){
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
                    //是否太美发布
                    this.isSelf = response.data.isSelf;
                     if(this.isSelf == true){
                        this.respond = false;
                         this.intentShow = true;

                     }else{
                         this.respond = true;
                        this.intentShow = false;
                        }
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
            }
        },
        mounted: function () {
            if( this.role.role == 1){  //0：航司，1：机场，2：太美
                this.respond = true;
            }else if( this.role.role == 0 ){
               this.intentShow = true;
            }else if( this.role.role == 2 ){
                this.init();
            }
        },
        components: {
            myIntention,
            respondAirport
        }
    }
</script>

<style lang="scss">
    .trans-wrapper{
        width:100%;
        height:100%;
    }
</style>
