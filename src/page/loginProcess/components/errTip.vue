<template>
    <div class="prompt"><span>&#xe632;</span>{{arg}}</div>
</template>
<script>
export default {
  props:['arg','sh'],
  mounted:function(){
      setTimeout(()=>{this.$emit("update:sh",false);},1500);
  }
}
</script>
<style lang="scss" scoped>
   .prompt{
            height: 45px;
            position: absolute;
            bottom: 0px;
            color:#f36b6b;
            padding-left:10px;
            display: flex;
            align-items: center;
            >span{
                font-family: iconfont;
                font-size:1.8rem;
            }
    }
</style>


