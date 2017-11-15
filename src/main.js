import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routerConfig from './router/routerConfig.js'
import store from './store/'
import './public/css/all.scss'
import './static/css/animate.min.css'
// import './public/js/console'
import {Radio } from 'element-ui'
Vue.use(Radio)

Vue.use(VueRouter);
const router = new VueRouter({
    routes: routerConfig.routes,
    // mode: 'history'
});
new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
})
