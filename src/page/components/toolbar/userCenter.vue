<template>
    <div class="tool popup">
        <a @click="logout">
            <span>&#xe647;</span>
            退出
        </a>
        <router-link :to="defaultSubLink">
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
        data: ()=>{
            return {
                defaultSubLink:'/index/userCenter',
            }
        },
        computed: {
            ...vx.mapActions([
                'close'
            ]),
            ...vx.mapGetters([
                'role'
            ])
        },
        methods: {
            logout: function () {
                this.$ajax.post('logout')
                    .then((res)=>{
                        if(res.data.opResult == 0){
                            this.$chatSocket.ws.close();
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
        },
        created: function(){
            //配置默认子路由
            if(this.role.role=='2') this.defaultSubLink = '/index/userCenter/reviewList' ;
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