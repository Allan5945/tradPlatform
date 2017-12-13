<template>
    <div >
        <transition name="dialog">
            <transDialog v-show="dialog"  @cancel="dialog = false" @sure="sureDialog"></transDialog>
        </transition>
        <needDetail @formShow="formShow" v-show="detailShow" @transShow="transShow" @closeDetail="closeDetail"></needDetail>
        <myPlan v-show="planShow" @showPlan="showPlan"></myplan>
        <respondAirport @responseShow="responShow" @responseClose="responClose" v-show="respond"></respondAirport>
        <intentForm v-show="intentFormShow" @sumitForm="dialog = true" @closeForm="closeForm"></intentForm>
        <myIntention @closeIntent="intentShow = false" v-show="intentShow" @formShow="formShow1" @openIntent="openIntent"></myintention>
        <myIntentForm v-show="myFormShow" @closeMyForm="closeMyForm"></myIntentForm>
         <infPanel></infPanel>
        <paySuccess @cancel="payDialog = false" v-show="payDialog"></paySuccess>
    </div>
</template>

<script>
    import needDetail from './../page/components/trans_detail/needDetail.vue'
    import intentForm from './../page/components/trans_detail/intentForm.vue'
    import myPlan from './../page/components/trans_detail/myPlan.vue'
    import myIntention from './../page/components/trans_detail/myIntention.vue'
    import transDialog from './../page/components/trans_detail/dialog.vue'
    import respondAirport from './../page/components/trans_detail/respondAirport.vue'
    import myIntentForm from './../page/components/trans_detail/myIntentForm.vue'
    import paySuccess  from './../page/components/trans_detail/paySuccess.vue'

    export default {
        data() {
            return {
                test1:false,
                renderComponent:false,
                name: 1,
                show: false,
                dialog:false,
                payDialog:false,
                intentFormShow:false,
                planShow:false,
                respond:false,
                intentShow:false,
                myFormShow:false,
                detailShow:false,
                detailShow2: false,
                demandId: ''
            }
        },
        methods: {
            formShow(){
                this.intentFormShow = !this.intentFormShow;
            },
            formShow1(){
                this.myFormShow = !this.myFormShow
            },
            openIntent() {
                this.intentShow = true;
                this.detailShow2 = false;
            },
            closeForm(){
                this.intentFormShow = !this.intentFormShow;
            },
            closeMyForm(){
                this.myFormShow = !this.myFormShow;
            },
            closeDetail(){
                this.detailShow =false;
            },
            responShow(){
                this.respond = true;
                this.detailShow = false;
                this.detailShow2 = false;
            },
            responClose(){
                this.respond = false;
            },
             closeThis() {
                this.detailShow2 = false;
            },
            sureDialog(){
                this.intentFormShow = false;
                this.planShow = true;
                this.payDialog = true;
                this.detailShow = false;
            },
            showPlan:function(){
                this.planShow = false;
            },
            transShow:function(){
                this.detailShow = true;
                this.detailShow2 = false;
                this.respond = false;
            },
            transShow2: function () {
                this.detailShow2 = true;
                this.detailShow = false;
                this.respond = false;
                this.intentShow = false;
            },
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
            myPublish,
            respondAirport
        }
    }
</script>

<style lang="scss">
</style>
