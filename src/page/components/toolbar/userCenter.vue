<template>
    <div class="tool popup" @click.stop>
        <a to="" @click="logout">
            <span>&#xe647;</span>
            退出
        </a>
        <router-link to="/index/userCenter">
            <span>&#xe647;</span>
            个人中心
        </router-link>
    </div>
</template>
<script>
    import * as vx from 'vuex'

    export default {
        watch: {},
        computed: {
            ...vx.mapActions([
                'close'
            ]),
        },
        methods: {
            logout: function () {
                this.$ajax.post('logout')
                    .then((res)=>{
                        if(res.data.opResult == 0){
                            window.sessionStorage.setItem('isLogin',null);
                            this.$router.push({path:'login'});
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "../../../public/css/dropDowBbox";
</style>