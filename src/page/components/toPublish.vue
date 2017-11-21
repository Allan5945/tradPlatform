<template>
    <div class="publish">
        <span class= "triangle"></span>
        <div class="p-til">发布需求</div>
        <div class="need-btn"  @click="showBox=!showBox">
           <div class="title" v-text="msg" :class="{selected:isSel}"></div>
           <span class="icon-item icon-item1">&#xe605;</span>
           <div class="selc-list dropDown popup" v-show="showBox">
               <div @click="getNeed(index)" v-for="(value,index) in needType">{{value}}</div>
           </div>
        </div>
        <transportForm></transportForm>
    </div>
</template>
<script>
    import transportForm from './transportForm.vue'
    export default {
        data () {
            return{
                showBox: false,
                isSel: false,
                msg:'选择需求类型',
                needType:['运力投放','委托运力投放','航线需求','委托航线需求','运营委托']
            }
        },
        components:{
            transportForm,

        },
        methods:{
             getNeed: function(i){
                this.msg = this.needType[i];
                this.isSel = true;
            }
        }
    }
</script>

<style scoped lang="scss">
    .publish{
        position:absolute;
        right: 21px;
        top: 70px;
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
