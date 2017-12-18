import ln from './../../../public/js/tabulationBoxTrigger.js';
import _this from './../../../main'
ln.$on('addChat', function (d)  {
    this.chat.shut = true;
    this.chat.narrow = true;
    let employeeId = d.employeeId != null ? d.employeeId : 1;
    let keys = _this.$store.getters.role.id + '=' + employeeId + "=" +d.id;
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
                __this.chat.chatData[keys] = response.data;
            })
            .catch((error) => {
                    console.log(error);
                }
            );
    };
});


export default class ChatSocket{
    constructor(w){
        this.ws = new WebSocket(w);

        this.ws.onopen = ()=>{
            console.log('打开连接');
        };
        this.ws.onmessage  = (data)=>{
            console.log(`收到信息${data}`);
        };
        this.ws.onclose  = ()=>{
            console.log('关闭连接');
        };
        this.ws.onerror  = ()=>{
            console.log('error连接错误');
        };
    }
}
