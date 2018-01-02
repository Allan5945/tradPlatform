<template>
    <div class="tool popup">
            <a href="http://192.168.10.174/hangyu_login?uuid=123123" target="_blank"><span>&#xe671;</span>航路测算</a>
        <router-link to="/index/information">
            <span>&#xe6fb;</span>信息查询
        </router-link>
        <router-link to="/index/information/time">
            <span>&#xe621;</span>时刻分布
        </router-link>
    </div>
</template>
<script>
    export default {

    }
</script>
<style scoped lang="scss">
    @import "../../../public/css/dropDowBbox";
</style>
