<template>
    <div class="tool popup">
        <a :href="uuid" target="_blank"><span>&#xe671;</span>航路测算</a>
        <router-link to="/index/information">
            <span>&#xe6fb;</span>信息查询
        </router-link>
        <router-link to="/index/information/time">
            <span>&#xe621;</span>时刻分布
        </router-link>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    export default {
        computed:{
            ...vx.mapGetters([
                'role'
            ]),
            uuid:function () {
                return `http://192.168.22.8/hangyu_login?uuid=${this.role.uuid}`
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "../../../public/css/dropDowBbox";
</style>
