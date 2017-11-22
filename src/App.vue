<template>
    <div id="app" @click="close();">
        <router-view id="case"></router-view>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    export default {
        name: 'app',
        data() {
            return {

            }
        },
        methods: {
            ...vx.mapActions([
                'close'
            ]),
            toShow() {
                this.show = !this.show;
            }
        },
        mounted: function () {

        },
        computed: {
            ...vx.mapGetters([
                'c_updated',
                'airList'
            ])
        },
        components: {

        }
    }
</script>
