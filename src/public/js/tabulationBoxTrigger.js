import Vue from 'vue'
export default new Vue({
    data(){
       return{
           hierarchy:false,  // true 用户中心层级变高，false 反之
           chatData:{},
           chat:{
               setChat:null,  // 传递选择参数
               shut:false,   // 关闭聊天框
               narrow:true,  // 缩小聊天框
               chatData:{},
               change:false
           },
           listItem: false, //个人中心，列表是否为选中状态
       }
    }
});