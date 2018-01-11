<template>
    <div >
        <paySuccess @cancel="closePaySuccess" v-show="payDialog"></paySuccess>
        <needDetail  v-show="detailShow" @transShow="transShow" @closeDetail= "closeDetail"></needDetail>
        <respondAirport v-show="respond" @responseShow="responShow" @responseClose="responClose" ></respondAirport>
        <myIntention v-show="intentShow" @closeIntent="intentShow = false"  @openIntent="openIntent"></myintention>
        <transAdmin v-show="adminShow" @closeAdmin="adminShow = false"  @openAdmin="openAdmin" @formShow="formShow"></transAdmin>
    </div>
</template>

<script>
    import needDetail from './needDetail.vue'//机场方（运力响应前我有意向）
    import myIntention from './myIntention.vue'//航司方
    import respondAirport from './respondAirport.vue'//机场方（运力响应后）
    import transAdmin  from './transAdmin.vue'//太美
    import paySuccess  from './paySuccess.vue'

    export default {
        data() {
            return {
                detailShow:false,
                adminShow:false,
                respond:false,
                intentShow:false,
                payDialog:false
            }
        },
        methods: {
            formShow(){

            },
            closeDetail(i){
                this.detailShow = false;
                if(i == '2'){
                    this.payDialog = true;
                }
            },
            openIntent() {
                this.intentShow = true;
                this.detailShow = false;
                this.respond = false;
                this.$emit('closeAirline');
            },
            openAdmin() {
                this.adminShow = true;
                this.$emit('closeAirline');
            },
            responShow(){
                this.respond = true;
                this.detailShow = false;
                this.intentShow = false;
                this.$emit('closeAirline');
            },
            responClose(){
                this.respond = false;
            },
            transShow(){
                this.detailShow = true;
                this.respond = false;
                this.intentShow = false;
                this.$emit('closeAirline');
            },
            closePaySuccess(){
                this.payDialog = false;
         },
        },
        mounted: function () {

        },
        components: {
            needDetail,
            myIntention,
            respondAirport,
            transAdmin,
            paySuccess
        }
    }
</script>

<style lang="scss">
</style>
