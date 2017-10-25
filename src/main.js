import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routerConfig from './router/routerConfig.js'
import store from './store/'
Vue.use(VueRouter);
const router=new VueRouter({
  routes:routerConfig.routes,
  // mode: 'history'
});
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
