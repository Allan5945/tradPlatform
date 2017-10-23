<template>
  <div id="app">
        <div id="boxCanvas">
            <canvas id="canvas"></canvas>
        </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
    mounted:function () {
        let can = document.getElementById('canvas').getContext('2d');
        console.log(can)
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
    #boxCanvas{
        width: 600px;
        height: 600px;
        background-color: green;
    }
</style>
