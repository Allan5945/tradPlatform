import Vue from 'vue'
export default new Vue({
    data(){
       return{
           hierarchy:false,  // true 用户中心层级变高，false 反之
           chatData:{},
           chat:{
               shut:false,   // 关闭聊天框
               narrow:true,  // 缩小聊天框
               chatData:{}
           }
       }
    }
});