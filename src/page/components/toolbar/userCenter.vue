<template>
    <div class="tool popup">
        <a @click="showSetting()">
            <span>&#xe611;</span>
            设置
        </a>
        <router-link :to="path.defaultSubLink">
            <span>&#xe60f;</span>
            个人中心
        </router-link>
        <a @click="logout">
            <span>&#xe647;</span>
            退出
        </a>
        <a>
            <div class="contact-client btn btn-b" @click="initDis">
                <span v-if="role.role != '2'">联系客服</span>
                <span v-else>联系用户</span>
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
                path:{
                    defaultSubLink:'/index/userCenter/myRelease',
                },
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
            showSetting: function (flag) {
                this.$emit('showSet');
//                this.show.setting = flag;
            },
            initDis(){
                localCommunication.$emit('addChat',{id:null});
                localCommunication.chat.shut = true;
                localCommunication.chat.narrow = true;
            }
        },
        created: function(){
            //配置默认子路由
            if(this.role.role=='2') this.path.defaultSubLink = '/index/userCenter/reviewList' ;
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
        >span:last-of-type{
            font-family: iconfont;
            font-size: 1.5rem;
        }
    }
</style>