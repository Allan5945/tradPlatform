<template>
    <div class="form-wrapper" >
        <div class="form">
            <header>
                <div class="p-til">发布子需求</div>
                <div class="selec-need">
                    <div class="type-til">需求类型</div>
                    <div class="need-btn"  @click="showBox=!showBox">
                       <div class="title" v-text="msg" :class="{selected:isSel}"></div>
                       <span class="iconfont">&#xe605;</span>
                       <div class="selc-list dropDown popup" v-show="showBox">
                           <div @click="getNeed(index)" v-for="(value,index) in needType">{{value}}</div>
                       </div>
                    </div>
                </div>
            </header>
            <transForm @closeForm="closeForm" v-show="showType == '0' "></transForm>
            <AirlineForm @closeForm="closeForm" v-show="showType == '1'"></AirlineForm>
        </div>
    </div>
</template>
<script>
    import transForm from './sonTransForm1.vue'
    /*import transForm from './../transportForm.vue'*/
    import AirlineForm from './sonAirlineForm.vue'
    export default {
        data() {
            return {
                showBox: false,
                isSel: false,
                showType:'0',
                myShow:[0,1],
                msg:'选择需求类型',
                needType:['运力投放','航线需求'],
            }
        },
        methods: {
            getNeed: function(i){
                this.showType = this.myShow[i];
                this.msg = this.needType[i];
                this.isSel = true;
            },
            closeForm:function(){
                this.$emit('closeForm');
            }
        },
        components: {
            transForm,
            AirlineForm
        }
    }
</script>
<style lang="scss" scoped>
    .form-wrapper{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        background: rgba(0, 0, 0, .4);
        z-index:99;
        .form{
            position: absolute;
            top: 100px;
            left: 500px;
            padding: 20px 20px 0 20px;
            color: #605E7C;
            width: 580px;
            height: 630px;
            border-radius: 4px;
            box-shadow: 0 2px 11px rgba(85,85,85,0.1);
            background: white;
        }
        header{
            display:flex;
            justify-content: space-between;
            padding:0 10px 20px 10px;
        }
    }
    .p-til{
        font-size:1.4rem;
        width:240px;
        line-height:40px;
        font-weight:bold;
    }
    .selec-need{
         display:flex;
         .type-til{
            width:60px;
            height:54px;
            line-height:54px;
         }
    }
        .need-btn{
            position: relative;
            box-sizing:border-box;
            margin:12px 0 12px 0;
            font-size:1.3rem;
            width:240px;
            line-height:30px;
            height:30px;
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
                height:30px;
                line-height:30px;
            }
            .iconfont{
                float:right;
                color: #446cea;
            }
            .selected{
                color:#605E7C;
            }
             .selc-list{
                position:absolute;
                top:35px;
                left:0;
                width:240px;
            }
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
