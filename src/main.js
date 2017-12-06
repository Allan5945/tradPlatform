import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import {Radio } from 'element-ui'

import {airMes,cityMes} from './static/js/airMes'
import jsonp from './static/js/extension'
import bmapExamples from './page/components/bmap/bmapExamples'


import routerConfig from './router/routerConfig.js'
import store from './store/'
import './public/css/all.scss'
import './static/css/animate.min.css'
// import './public/js/console'
Vue.prototype.$ajax = axios;        // 扩展axios 请求数据
Vue.prototype.$airMes = airMes;   // 扩展机场转换方法
Vue.prototype.$cityMes = cityMes;  // 扩展城市转换方法
Vue.prototype.$jsonp = jsonp;    // 扩展jsonp请求方法
Vue.prototype.$bExample = new bmapExamples();    // 挂载

Vue.use(Radio);
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
