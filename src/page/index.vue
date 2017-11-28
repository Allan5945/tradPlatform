<template>
    <div v-if="renderComponent">
        <bmap :allDot="allDot"></bmap>
        <navigation @toShow="toShow"></navigation>
        <toPublish v-if="show"></toPublish>
        <tagIcon></tagIcon>
        <messageBox></messageBox>

        <transition name="dialog">
            <transDialog v-show="dialog"  @cancel="dialog = false" @sure="sureDialog"></transDialog>
        </transition>
        <needDetail></needDetail>
        <!-- <myPlan></myplan> -->
        <!-- <intentForm></intentForm> -->
        <myIntention></myintention>
    </div>
</template>

<script>
    import * as vx from 'vuex'
    import index from './../page/index.vue'
    import bmap from './../bmap/bmap.vue'
    import navigation from './../page/components/navigation.vue'
    import tagIcon from './../page/components/tagIcon.vue'
    import messageBox from './../page/components/mesBox.vue'
    import toPublish from './../page/components/toPublish.vue'
    import conversions from './../public/js/conversions'
    import needDetail from './../page/components/trans_detail/needDetail.vue'
    import intentForm from './../page/components/trans_detail/intentForm.vue'
    import myPlan from './../page/components/trans_detail/myPlan.vue'
    import transDialog from './../page/components/trans_detail/dialog.vue'
    import myIntention from './../page/components/trans_detail/myIntention.vue'
    


    export default {
        data() {
            return {
                name: 1,
                show: false,
                dialog:true,
                transShow:false,
                loadingData: {
                    airList: false,
                    demands: false
                },
                allDot: '',
                test: 555,
                demandId :''
            }
        },
        methods: {
            ...vx.mapActions([
                'close',
                'initialize'
            ]),
            toShow() {
                this.show = !this.show;
            },
            sureDialog(){
               /* const self = this;
                switch (self.dialog_type){
                    case 'clear':
                        self.$store.dispatch('clearevent');
                        break;
                    case 'del':
                        self.$store.dispatch('delevent',self.del_info);
                        break;
                }
                this.dialog = false;*/
            },
        },
        beforeMount:function () {
            if(this.role == null)window.location.href = '#/login'
        },
        mounted: function () {
            this.$ajax({
                method: 'post',
                url: '/airList',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
                .then((response) => {
                    this.$store.dispatch('initialize', conversions(response.data.mes)).then(() => {
                    });
                    this.loadingData.airList = true;
                })
                .catch((error) => {
                        console.log(error);
                    }
                );

            this.$ajax({
                method: 'post',
                url: '/getAllDemands',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
                .then((response) => {
                    let arr = [];
                    response.data.data.forEach((val)=>{
                        if(
                            val.cityCoordinateJ != null &&
                            val.cityCoordinateW != null &&
                            val.demandType != null &&
                            val.dpt != null &&
                            val.newInfo != null &&
                            val.num != null &&
                            val.obj != null
                        ){
                            arr.push(val)
                        }
                    });
                    this.allDot = arr;
                    this.loadingData.demands = true;
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
        },
        computed: {
            ...vx.mapGetters([
                'c_updated',
                'airList',
                'role'
            ]),
            renderComponent: function () {
                if (this.loadingData.airList && this.loadingData.demands) {
                    return true;
                } else {
                    return false;
                };
            }
        },
        components: {
            bmap,
            navigation,
            tagIcon,
            messageBox,
            toPublish,
            needDetail,
            intentForm,
            myPlan,
            transDialog,
            myIntention
        }
    }
</script>

<style lang="scss">
    .dialog-enter-active, .dialog-leave-active {
     transition: opacity .3s;
}
.dialog-enter, .dialog-leave-to{
    opacity: 0;
}
</style>
