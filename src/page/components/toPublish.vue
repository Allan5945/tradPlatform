<template>
    <div class="publish popup">
        <span class= "triangle"></span>
        <div class="p-til">发布需求</div>
        <div class="need-btn"  @click="showBox=!showBox">
           <div class="title" v-text="msg" :class="{selected:isSel}"></div>
           <span class="icon-item icon-item1">&#xe605;</span>
           <div class="selc-list dropDown popup" v-show="showBox">
               <div @click="getNeed(index)" v-for="(value,index) in needType">{{value}}</div>
           </div>
        </div>
        <transportForm v-if="this.showType== 1" @closeForm="closeForm"></transportForm>
        <agentTransForm v-else-if="this.showType== 2" @closeForm="closeForm"></agentTransForm>
        <airlineReq v-else-if="this.showType== 3"></airlineReq>
        <airlineDelegation v-else-if="this.showType== 4"></airlineDelegation>
        <operationForm v-else-if="this.showType== 5" @closeForm="closeForm"></operationForm>
    </div>
</template>
<script>
    import transportForm from './transportForm.vue'
    import agentTransForm from './agentTransForm.vue'
    import operationForm from './operationForm.vue'
    import airlineReq from './airlineReq.vue'
    import airlineDelegation from './airlineDelegation.vue'
    import * as vx from 'vuex';
    export default {
        data () {
            return{
                showBox: false,
                isSel: false,
                showType:'',
                myShow:[1,2,3,4,5],
                msg:'选择需求类型',
                needType:[],
                needType1:['运力投放','委托运力投放'],
                needType2:['航线需求','委托航线需求','运营托管'],
                needType3:['运力投放','委托运力投放','航线需求','委托航线需求','运营托管'],
            }
        },
        computed: {
            ...vx.mapGetters([
                'role'
            ])
        },
        mounted() {
            if(this.role.role == 0){ //角色为航司
                this.needType = this.needType1;
            }else if(this.role.role == 1){//角色为机场
                this.needType = this.needType2;
            }else if(this.role.role == 2){//角色为太美
                this.needType = this.needType3;
            }

        },
        components:{
            transportForm,
            operationForm,
            agentTransForm,
            airlineReq,
            airlineDelegation
        },
        methods:{
             getNeed: function(i){
                if(this.role.role == 1){ //角色为机场
                    this.showType = this.myShow[i+2];
                }else{//角色为航司和太美
                    this.showType = this.myShow[i];
                }
                this.msg = this.needType[i];
                this.isSel = true;
            },
            closeForm: function(){
                this.showType = '';
                this.msg = "选择需求类型";
            }
        }
    }
</script>

<style scoped lang="scss">
    .publish{
        position:absolute;
        right: 40px;
        top: 95px;
        width:540px;
        height:60px;
        color:#605E7C;
        background-color:#fff;
        border-radius:4px;
        padding: 0 40px;
        .need-btn,.p-til{
            float:left;
            font-size:1.3rem;
            width:240px;
            line-height:60px;
        }
        &:after{
            content:'.';
            visibility:hidden;
            clear:both;
            display: block;
            width:0;
            height:0;
        }
        .need-btn{
            position: relative;
            box-sizing:border-box;
            margin:12px 0 12px 60px;
            height:36px;
            border: 1px solid rgba(96,94,124,.4);
            border-radius: 4px;
            text-align:left;
            padding:0 14px;
            cursor:pointer;
            &:after{
                content:'.';
                visibility:hidden;
                clear:both;
                display: block;
                width:0;
                height:0;
            }
            .title{
                color: rgba(96,94,124,.4);
                font-size:1.2rem;
                float:left;
                height:36px;
                line-height:36px;
            }
            .selected{
                color:#605E7C;
            }
            .icon-item {
                font-size: 1.6rem;
                font-family: iconfont;
            }
            .icon-item1{
                float:right;
                color: #446cea;
                line-height: 36px;
            }
            .selc-list{
                position:absolute;
                top:35px;
                left:0;
            }
       }
    }
    .triangle{
        position: absolute;
        top:-23px;
        right:40px;
        width:0;
        height:0;
        border:10px solid transparent;
        border-bottom: 13px solid #fff;
    }

    .dropDown {
      width:240px;
      background-color: #fff;
      border-radius: 4px;
      z-index:999;
       >div {
        width: 100%;
        height:35px;
        box-sizing: border-box;
        line-height:35px;
        padding-left: 14px;
        color: #605E7C;
        font-size: 1.2rem;
        cursor:pointer;
        &:hover{
            background-color:rgba(235,235,235,.5);
        }
      }
    }
</style>


