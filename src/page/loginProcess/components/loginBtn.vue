<template>
  <div class="login-btn btn user-select" @click="login" :class="{'btn-b':dis,'step-btn-dis':!dis}">
    <span v-text="arg.text" v-if="!lodings"></span>
    <loading class="search-ing" :args="true" v-if="lodings"></loading>
  </div>
</template>
<script>
import loading from '$src/page/reuseComponents/locading.vue'
export default {
  data(){
    return{

    }
  },
  components:{
    loading
  },
  props:['arg','dis','lodings'],
  watch:{
  },
  methods:{
    login(){
      if(this.dis == false || this.lodings == true)return false;
      this.$emit('to-login');
    }
  }
}
</script>
<style lang="scss" scoped>
  .login-btn{
    border-radius:25px;
    height: 45px;
    color:white;
    letter-spacing: 3px;
    display: flex;
    // background-color: #3c78ff;
  }
   .step-btn-dis{
      cursor: not-allowed;
      background-color:#cccccc;
    }
  .search-ing {
    width: 23px;
    height: 30px;
    color: #3c78ff !important;
    display: inline-block;
    transform: scale(.25);
  }
</style>


