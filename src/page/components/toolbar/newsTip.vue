<template>
    <div class="news-tip" @click="initDis">
        <span class="news-tip-icon">&#xe602;</span>
        <span class="news-tip-num" v-if="tipL != 0">
            <span>{{tipL}}</span>
        </span>
    </div>
</template>
<script>
    import localCommunication from '$src/public/js/tabulationBoxTrigger.js'

    export default {
        data(){
            return {
                tipL:0
            }
        },
        methods:{
            initDis(){
                localCommunication.chat.shut = true;
                localCommunication.chat.narrow = true;
                this.tipL = 0;
            }
        },
        mounted:function () {
            let _this = this;
            this.$ajax({
                method: 'post',
                url: '/openChat',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                params:{
                    fromNameId:this.$store.getters.role.id,
                },
            })
                .then((response) => {
                    _this.tipL = response.data.data.length;
                    let chatFlag = null;
                    response.data.data.forEach((v)=>{
                        if(chatFlag == null)chatFlag = v.chatFlag;
                        if(!localCommunication.chat.chatData.hasOwnProperty(v.chatFlag)){
                            localCommunication.chat.chatData[v.chatFlag] = v;
                        };
                    });
                    localCommunication.chat.setChat = chatFlag;
                })
                .catch((error) => {
                        console.log(error);
                    }
                );
        }
    }
</script>
<style scoped lang="scss">
    .news-tip{
        position: absolute;
        right: 0;
        bottom:165px;
        width: 40px;
        height: 40px;
        background-color: rgba(151, 151, 151, 0.2);
        display: flex;
        align-items: center;
        cursor: pointer;
        justify-content: center;
        &:hover{
            background-color: rgba(151, 151, 151, 0.5);
        }
    }
    .news-tip-icon{
        font-family: iconfont;
        font-size: 3rem;
        color: #605E7C;
    }
    .news-tip-num{
        position: absolute;
        right: 5px;
        top: 3px;
        display: inline-flex;
        background-color: #ff5252;
        color: white;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        >span{
            transform: scale(.7,.7);
            width: 12px;
            height: 12px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>