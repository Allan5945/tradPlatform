<template>
    <div >
        <transition name="dialog">
            <transDialog v-show="dialog"  @cancel="closeDialog" @sure="sureDialog"></transDialog>
        </transition>
        <needDetail @formShow="formShow" v-show="detailShow" @transShow="transShow" @closeDetail="closeDetail"></needDetail>
       <!--  <myPlan v-show="planShow" @showPlan="showPlan"></myplan> -->
        <respondAirport @responseShow="responShow" @responseClose="responClose" v-show="respond"></respondAirport>
        <intentForm v-show="intentFormShow" @sumitForm="dialog = true" @closeForm="closeForm"></intentForm>
        <myIntention @closeIntent="intentShow = false" v-show="intentShow" @openIntent="openIntent"></myintention>
        <paySuccess @cancel="closePaySuccess" v-show="payDialog"></paySuccess>
        <transAdmin @closeIntent="intentShow = false" v-show="intentShow" @openIntent="openIntent" @formShow="formShow"></transAdmin>
    </div>
</template>

<script>
    import needDetail from './needDetail.vue'
    import intentForm from './intentForm1.vue'
    import myPlan from './myPlan.vue'
    import myIntention from './myIntention.vue'
    import transDialog from './transDialog.vue'
    import respondAirport from './respondAirport.vue'
    import paySuccess  from './paySuccess.vue'
    import transAdmin  from './transAdmin.vue'

    export default {
        data() {
            return {
                dialog:false,
                payDialog:false,
                intentFormShow:false,
                planShow:false,
                respond:false,
                intentShow:false,
                detailShow:false,
            }
        },
        methods: {
            formShow(){
                this.intentFormShow = true;
            },
            openIntent() {
                this.intentShow = true;
                this.detailShow = false;
                this.respond = false;
                this.$emit('closeAirline');
            },
            closeForm(){
                this.intentFormShow = false;
            },
            closeDetail(){
                this.detailShow =false;
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
            sureDialog(){
                this.intentFormShow = false;
                this.payDialog = true;
                this.detailShow = false;
            },
            showPlan(){
                this.planShow = false;
            },
            transShow(){
                this.detailShow = true;
                this.respond = false;
                this.intentShow = false;
                this.$emit('closeAirline');
            },
            closeDialog(){
                this.dialog = false;
            },
            closePaySuccess(){
                this.payDialog = false;
                /*this.respond = true;*/
            }
        },
        beforeMount: function () {

        },
        mounted: function () {

        },
        components: {
            needDetail,
            intentForm,
            myPlan,
            transDialog,
            myIntention,
            paySuccess,
            respondAirport,
            transAdmin
        }
    }
</script>

<style lang="scss">
</style>
