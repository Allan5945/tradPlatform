<template>
    <div class="news-tip" @click="initDis">
        <span class="news-tip-icon">&#xe602;</span>
        <span class="news-tip-num" v-if="tpl != 0">
            <span>{{tpl}}</span>
        </span>
    </div>
</template>
<script>
    import localCommunication from '$src/public/js/tabulationBoxTrigger.js'

    export default {
        data(){
            return {
            }
        },
        methods:{
            initDis(){
                localCommunication.chat.shut = true;
                localCommunication.chat.narrow = true;
            }
        },
        computed:{
            tpl:function () {
                if(localCommunication.chat.change);
                let l = 0;
                for(let key in localCommunication.chat.chatData){
                    if(localCommunication.chat.chatData[key].noReadCount > 0){
                        l = l + 1;
                    }
                }
                return l;
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
                    response.data = {"opResult":"0","data":[],"systemMessage":{"rightTableUp":[{"key":"companyAddr","val":"成都市高新区益州大道777号中航国际交流中心B座12楼"},{"key":"name","val":"太美客服"},{"key":"companyName","val":"太美航空"},{"key":"companyPho","val":"028-65733800"}],"title":"系统消息","noReadCount":19,"chatRcord":{"pageNo":1,"totalCount":23,"pageCount":3,"numPrePage":0,"list":[{"id":0,"fromNameId":null,"toNameId":3,"demandId":517,"date":"2018.01.04 13:50:53","text":"武汉-待定-待定航线需求方案已确定，订单完成","textType":null,"title":"需求状态更新","state":"1"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":517,"date":"2018.01.04 13:50:36","text":"武汉-待定-待定航线需求已选定意向方，等待对方确认消息","textType":null,"title":"需求状态更新","state":"1"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":517,"date":"2018.01.04 13:41:32","text":"武汉-待定-待定航线需求有新的意向方加入","textType":null,"title":"收到新的意向","state":"1"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":538,"date":"2018.01.04 11:30:41","text":"昌都-待定-待定航线需求发布成功","textType":null,"title":"发布成功","state":"1"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":537,"date":"2018.01.04 11:29:44","text":"昌都-待定-待定航线需求发布成功","textType":null,"title":"发布成功","state":"1"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":520,"date":"2018.01.04 11:17:43","text":"宁波-待定-待定航线需求未通过平台审核","textType":null,"title":"需求状态更新","state":"1"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":529,"date":"2018.01.04 10:41:20","text":"朝阳-待定-待定航线需求发布成功","textType":null,"title":"发布成功","state":"1"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":524,"date":"2018.01.04 10:37:37","text":"常德-待定-待定航线需求发布成功","textType":null,"title":"发布成功","state":"1"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":523,"date":"2018.01.04 10:36:47","text":"济南-待定-待定航线需求发布成功","textType":null,"title":"发布成功","state":"1"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":522,"date":"2018.01.04 10:36:16","text":"大连-待定-待定航线需求发布成功","textType":null,"title":"发布成功","state":"1"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":521,"date":"2018.01.04 10:35:41","text":"包头-待定-待定航线需求发布成功","textType":null,"title":"发布成功","state":"1"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":520,"date":"2018.01.04 10:34:30","text":"宁波-待定-待定航线需求发布成功","textType":null,"title":"发布成功","state":"1"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":517,"date":"2018.01.04 09:27:55","text":"武汉-待定-待定航线需求发布成功","textType":null,"title":"发布成功","state":"1"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":515,"date":"2018.01.03 16:15:51","text":"北京-待定-待定航线需求发布成功","textType":null,"title":"发布成功","state":"1"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":513,"date":"2018.01.03 15:59:58","text":"重庆-待定-待定航线需求方案已确定，订单完成","textType":null,"title":"需求状态更新","state":"1"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":513,"date":"2018.01.03 15:59:34","text":"重庆-待定-待定航线需求已选定意向方，等待对方确认消息","textType":null,"title":"需求状态更新","state":"1"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":513,"date":"2018.01.03 11:35:17","text":"重庆-待定-待定航线需求有新的意向方加入","textType":null,"title":"收到新的意向","state":"1"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":513,"date":"2018.01.03 11:08:52","text":"重庆-待定-待定航线需求发布成功","textType":null,"title":"发布成功","state":"1"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":512,"date":"2018.01.03 10:31:12","text":"广州-天津市-待定航线需求发布成功","textType":null,"title":"发布成功","state":"1"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":502,"date":"2018.01.02 14:38:19","text":"广州-待定-待定航线需求有新的意向方加入","textType":null,"title":"收到新的意向","state":"0"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":504,"date":"2018.01.02 14:35:41","text":"意向提交成功","textType":null,"title":"收到新的意向","state":"0"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":503,"date":"2018.01.02 14:08:12","text":"广州-成都-南京航线需求发布成功","textType":null,"title":"发布成功","state":"0"},{"id":0,"fromNameId":null,"toNameId":3,"demandId":502,"date":"2018.01.02 14:04:51","text":"广州-待定-待定航线需求发布成功","textType":null,"title":"发布成功","state":"0"}]}},"msg":"查询成功"};
                    let chatFlag = null;
                    response.data.data.forEach((v)=>{
                        if(chatFlag == null)chatFlag = v.chatFlag;
                        if(!localCommunication.chat.chatData.hasOwnProperty(v.chatFlag)){
                            localCommunication.chat.chatData[v.chatFlag] = v;
                        };
                    });
                    let obj ={
                        chatFlag:"x-t-null",
                        chatObjectList:[],
                        chatRcord:response.data.systemMessage.chatRcord,
                        modifyRcord:null,
                        noReadCount:response.data.systemMessage.noReadCount,
                        rightTableDown:[],
                        rightTableUp:response.data.systemMessage.rightTableUp,
                        title:response.data.systemMessage.title
                    };
                    if(chatFlag == null){chatFlag = "x-t-null"};
                    localCommunication.chat.chatData[obj.chatFlag] = obj;
                    localCommunication.chat.setChat = chatFlag;
                    localCommunication.chat.change =  !localCommunication.chat.change;
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