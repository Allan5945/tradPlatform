<template>
    <div >
        <transition name="dialog">
            <transDialog v-show="dialog"  @cancel="closeDialog" @sure="sureDialog"></transDialog>
        </transition>
        <needDetail @formShow="formShow" v-show="detailShow" @transShow="transShow" @closeDetail="closeDetail"></needDetail>
        <myPlan v-show="planShow" @showPlan="showPlan"></myplan>
        <respondAirport @responseShow="responShow" @responseClose="responClose" v-show="respond"></respondAirport>
        <intentForm v-show="intentFormShow" @sumitForm="dialog = true" @closeForm="closeForm"></intentForm>
        <myIntention @closeIntent="intentShow = false" v-show="intentShow" @formShow="formShow1" @openIntent="openIntent"></myintention>
        <myIntentForm v-show="myFormShow" @closeMyForm="closeMyForm"></myIntentForm>
        <paySuccess @cancel="closePayDialog" v-show="payDialog"></paySuccess>
        <sureForm v-show="sureFormShow" @closeForm="closeSureForm"></sureForm>
    </div>
</template>

<script>
    import needDetail from './needDetail.vue'
    import intentForm from './intentForm.vue'
    import myPlan from './myPlan.vue'
    import myIntention from './myIntention.vue'
    import transDialog from './dialog.vue'
    import respondAirport from './respondAirport.vue'
    import myIntentForm from './myIntentForm.vue'
    import paySuccess  from './paySuccess.vue'
    import sureForm from './sureForm.vue'

    export default {
        data() {
            return {
                dialog:false,
                payDialog:false,
                intentFormShow:false,
                planShow:false,
                respond:false,
                intentShow:false,
                sureFormShow:false,
                myFormShow:false,
                detailShow:false,
            }
        },
        methods: {
            formShow(){
                this.intentFormShow = true;
            },
            formShow1(){
                this.myFormShow = true;
            },
            openIntent() {
                this.intentShow = true;
                this.$emit('closeAirline');
            },
            closeForm(){
                this.intentFormShow = false;
            },
            closeMyForm(){
                this.myFormShow = false;
            },
            closeSureForm(){
                 this.sureFormShow = false;
            },
            closeDetail(){
                this.detailShow =false;
            },
            responShow(){
                this.respond = true;
                this.detailShow = false;
                this.$emit('closeAirline');
            },
            responClose(){
                this.respond = false;
            },
            sureDialog(){
                this.intentFormShow = false;
                this.planShow = true;
                this.payDialog = true;
                this.detailShow = false;
            },
            showPlan(){
                this.planShow = false;
            },
            transShow(){
                this.detailShow = true;
                this.respond = false;
                this.$emit('closeAirline');
            },
            closeDialog(){
                this.dialog = false;
            },
            closePayDialog(){
                this.payDialog = false;
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
            myIntentForm,
            respondAirport,
            sureForm
        }
    }
</script>

<style lang="scss">
</style>
