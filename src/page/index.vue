<template>
    <div>
        <div>{{name}}</div>
        <div>{{c_updated}}</div>
    </div>
</template>

<script>
    import * as vx from 'vuex'
    export default {
        data () {
            return {
                name:1
            }
        },
        computed:{
            ...vx.mapGetters([
                'c_updated'
            ])
        }
    }
</script>