import ln from './../../../public/js/tabulationBoxTrigger.js';
import Vue from 'vue'
import _this from './../../../main'

ln.$on('addChat', function (d) {
    let k1, k2, de = d.id, k, keys;
    if (de == null) {
        k1 = _this.$store.getters.role.id;
        k2 = 1;
        de = null;
        // k = [_this.$store.getters.role.id];
    } else {
        if (_this.$store.getters.role.id == 1) {
            k1 = _this.$store.getters.role.id;
        } else {
            k1 = d.employeeId;
        }
        ;
        if (k1 == d.employeeId) {
            k2 = d.demandEmployeeId;
        } else {
            k2 = d.employeeId;
        }
        ;
    }
    ;
    keys = (k1 < k2 ? k1 : k2) + '-' + (k1 < k2 ? k2 : k1) + "-" + de;
    k = keys.split("-");
    if (!this.chat.chatData.hasOwnProperty(keys)) {
        let __this = this;
        let id = _this.$store.getters.role.id;
        _this.$ajax({
            method: 'post',
            url: '/openChat',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            params: {
                fromNameId: id,
                toNameId: k[0] == id ? k[1] : k[0],
                demandId: k[2] == 'null' ? '' : k[2],
            },
        })
            .then((response) => {
                if (response.data.opResult == "0") {
                    response.data.data.forEach((v) => {
                        __this.chat.chatData[v.chatFlag] = v
                    });
                    this.chat.setChat = keys;
                    this.chat.shut = true;
                    this.chat.narrow = true;

                } else {
                    const h = this.$createElement;
                    let mes = response.data.msg;
                    _this.$message({
                        showClose: true,
                        message: mes,
                        type: 'error'
                    });
                }
            })
            .catch((error) => {
                    console.log(error);
                }
            );
    } else {
        this.chat.setChat = keys;
        this.chat.shut = true;
        this.chat.narrow = true;
    }
    ;
});

export default class ChatSocket {
    constructor(w) {
        if ('WebSocket' in window) {
            this.ws = new WebSocket(w);
        } else if ('MozWebSocket' in window) {
            this.ws = new MozWebSocket(w);
        } else {
            alert("not support");
        }
        this.ws.onopen = () => {
            console.log('打开连接');
        };
        this.ws.onmessage = (data) => {
            console.log(`收到信息`, data);
            let chat = JSON.parse(data.data);
            switch (chat.type) {
                case "message" || "remind":
                    break
                case "system":
            }
            let chatFlag;
            if(chat.type === "isChat"){
                chatFlag = chat.chatFlag;
            }else if(chat.type === "system"){
                chatFlag = "x-t-null";
            }else{
                chatFlag = chat.data.chatFlag;
            }
            if (!ln.chat.chatData.hasOwnProperty(chatFlag)) {
                ln.$emit("queryChat");
                return false;
            };
            if (chat.type === "message" || chat.type === "remind") {
                if (ln.chat.chatData[chatFlag].chatRcord == null) {
                    ln.chat.chatData[chatFlag].chatRcord = {
                        list: []
                    }
                };
                ln.chat.chatData[chatFlag].chatRcord.list.splice(0, 0, chat.data);
                if (chat.data.chatFlag != ln.chat.setChat) {
                    ln.chat.chatData[chatFlag].noReadCount = 1;
                }
                ln.chat.chatData[chatFlag].modifyRcord = chat.modifyList;
            } else if (chat.type === "system") {
                ln.chat.chatData["x-t-null"].chatRcord.list.splice(0, 0, chat.data);
                if (ln.chat.setChat != "x-t-null") {
                    ln.chat.chatData["x-t-null"].noReadCount = 1;
                }
            }else if(chat.type === "isChat"){
                ln.chat.chatData[chatFlag].isSendMessage =  chat.isSendMessage;
            }
            ln.chat.change = !ln.chat.change;
        };
        this.ws.onclose = () => {
            setTimeout(() => {
                window.sessionStorage.setItem("isLogin", null);
                Vue.prototype.$chatSocket = null;
                // _this.$router.push("login");
                window.location.reload();
            }, 100);  // 加延迟的作用是防止刷新浏览器就清空sessionStorage，在火狐会重新登录的bug
            console.log('关闭连接');
        };
        this.ws.onerror = () => {
            console.log('error连接错误');
        };
    }
}
