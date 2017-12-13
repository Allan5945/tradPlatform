export default class ChatSocket{
    constructor(){
        this.ws = null;
        this.init = function (v) {
            this.ws = v;
        }
    }
}
