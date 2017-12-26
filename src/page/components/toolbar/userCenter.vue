<template>
    <div class="tool popup">
        <a @click="logout">
            <span>&#xe647;</span>
            退出
        </a>
        <router-link to="/index/userCenter/reviewList">
            <span>&#xe60f;</span>
            个人中心
        </router-link>
        <a>
            <div class="contact-client btn btn-b" @click="initDis">
                联系客服
                <span>&#xe60f;</span>
            </div>
        </a>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    import localCommunication from '$src/public/js/tabulationBoxTrigger.js'

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
            },
            initDis(){
                localCommunication.$emit('addChat',{id:null});
                localCommunication.chat.shut = true;
                localCommunication.chat.narrow = true;
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "../../../public/css/dropDowBbox";
    .contact-client{
        width: 78px;
        border-radius: 16px;
        color: white;
        font-size: 1.2rem;
        padding: 5px 12px;
        display: flex;
        justify-content: space-between;
        >span{
            font-family: iconfont;
            font-size: 1.5rem;
        }
    }
</style>