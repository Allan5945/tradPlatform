import ln from './../../../public/js/tabulationBoxTrigger.js';
import _this from './../../../main'
ln.$on('addChat', function (d)  {
    let employeeId = d.employeeId != null ? Number(d.employeeId) : 1;
    if(_this.$store.getters.role.id == 1)employeeId = d.demandEmployeeId; //devmandEmployeeId
    let roleId = Number(_this.$store.getters.role.id);
    console.log(employeeId,roleId,d)
    let keys = (roleId < employeeId ? roleId : employeeId)  + '-' + (roleId < employeeId ? employeeId : roleId) + "-" +d.id;
    this.chat.setChat = keys;
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
                if(response.data.opResult == "1"){
                    const h = this.$createElement;
                    let mes = response.data.msg;

                    _this.$message({
                        showClose: true,
                        message: mes,
                        type: 'error'
                    });
                }else{
                    response.data.data.forEach((v)=>{
                        __this.chat.chatData[v.chatFlag] = v
                    });
                    this.chat.shut = true;
                    this.chat.narrow = true;
                }
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

export default class ChatSocket{
    constructor(w){
        if('WebSocket' in window){
            this.ws = new WebSocket(w);
        }else if('MozWebSocket' in window){
            this.ws = new MozWebSocket(w);
        }else{
            alert("not support");
        }
        this.ws.onopen = ()=>{
            console.log('打开连接');
        };
        this.ws.onmessage  = (data)=>{
            console.log(`收到信息`,chat);
            let chat = JSON.parse(data.data);
            ln.chat.chatData[chat.data.chatFlag].chatRcord.list.splice(0,0,chat.data);
            if(chat.data.chatFlag != ln.chat.setChat){
                ln.chat.chatData[chat.data.chatFlag].noReadCount = 1;
            };
            ln.chat.change = !ln.chat.change;
        };
        this.ws.onclose  = ()=>{
            window.sessionStorage.setItem("isLogin",null);
            console.log('关闭连接');
        };
        this.ws.onerror  = ()=>{
            console.log('error连接错误');
        };
    }
}
