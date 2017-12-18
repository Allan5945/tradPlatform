import ln from './../../../public/js/tabulationBoxTrigger.js';
import _this from './../../../main'
ln.$on('addChat', function (d)  {
    let employeeId = d.employeeId != null ? d.employeeId : 1;
    // if(_this.$store.getters.role.id == 1)employeeId = "";
    let keys = _this.$store.getters.role.id + '-' + employeeId + "-" +d.id;
    if(!this.chat.chatData.hasOwnProperty(keys)){
        let __this = this;
        _this.$ajax({
            method: 'post',
            url: '/openChat',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            params:{
                fromNameId:_this.$store.getters.role.id,
                toNameId:employeeId,
                demandId:d.id,
            },
        })
            .then((response) => {
                response.data.data.forEach((v)=>{
                    __this.chat.chatData[v.chatFlag] = v
                });
                this.chat.shut = true;
                this.chat.narrow = true;
            })
            .catch((error) => {
                    console.log(error);
                }
            );
    }else{
        this.chat.shut = true;
        this.chat.narrow = true;
    };
});
ln.$on('initChat', function ()  {
    let __this = this;
    _this.$ajax({
        method: 'post',
        url: '/openChat',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params:{
            fromNameId:_this.$store.getters.role.id,
        },
    })
        .then((response) => {
            response.data.data.forEach((v)=>{
                if(!__this.chat.chatData.hasOwnProperty(v.chatFlag)){
                    __this.chat.chatData[v.chatFlag] = v
                };
            });
            this.chat.shut = true;
            this.chat.narrow = true;
        })
        .catch((error) => {
                console.log(error);
            }
        );
});

export default class ChatSocket{
    constructor(w){
        this.ws = new WebSocket(w);
        this.ws.onopen = ()=>{
            console.log('打开连接');
        };
        this.ws.onmessage  = (data)=>{
            let chat = JSON.parse(data.data);
            ln.chat.chatData[chat.data.chatFlag].chatRcord.list.push(chat.data);
            ln.chat.change = !ln.chat.change;
            console.log(`收到信息`,chat);
        };
        this.ws.onclose  = ()=>{
            console.log('关闭连接');
        };
        this.ws.onerror  = ()=>{
            console.log('error连接错误');
        };
    }
}
