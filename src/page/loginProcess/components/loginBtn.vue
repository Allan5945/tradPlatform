<template>
  <div v-text="arg.text" class="login-btn" @click="login"></div>
</template>
<script>
export default {
  data(){
    return{
    }
  },
  props:['arg'],
  methods:{
    login(){
      this.$emit('to-login');
    }
  }
}
</script>
<style lang="scss" scoped>
  .login-btn{
    border-radius:25px;
    height: 45px;
    line-height: 45px;
    color:white;
    text-align: center;
    letter-spacing: 3px;
    background-color: #3c78ff;
  }
</style>


