<template>
  <ul class="banner-button-box" :style="{'top':button.height/2 - 72 +'px'}">
      <li :class="{'banner-item-set':btnSet == i,'banner-item':btnSet != i}" v-for="i in 6" @click="btnst(i)"></li>
  </ul>
</template>
<script>
export default {
    data(){
        return {
            button:{
                width:0,
                height:0,
            },
            btnSet:1
        }
    },
    watch:{
        updata:function(){
            let num = document.getElementById("case").scrollTop/document.getElementById("case").offsetHeight +1;
            this.btnSet = Math.round(num)
        }
    },
    props:["updata"],
    mounted:function(){
       this.initBox();
    },
    methods:{
        btnst(i){
            this.btnSet = i;
            document.getElementById("case").scrollTop = (i-1)*document.getElementById("case").offsetHeight;
            this.$emit("reqUp");
        },
        initBox(){
            let bd = document.getElementsByTagName("body");
            this.button = {
                width:bd[0].offsetWidth,
                height:bd[0].offsetHeight,
            };
        }
    }
}
</script>
<style lang="scss" scoped>
    .banner-button-box{
        position: fixed;
        right: 55px;
        >li{
            margin-bottom: 18px;
            border-radius:50%;
            cursor: pointer;
        }
    }
    .banner-item{
        width: 10px;
        height:10px;
        margin-bottom: 18px;
        border-radius:50%;
        border:1px solid rgba(0, 0, 0, 0.4);
        cursor: pointer;
        &:hover{
             border:1px solid #4468fc;
        }
    }
    .banner-item-set{
        width: 12px;
        height:12px;
        background-color: #4468fc;
    }
</style>


