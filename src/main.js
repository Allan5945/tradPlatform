import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import echarts from 'echarts'
import {Radio,Pagination,Message} from 'element-ui'

import {airMes,cityMes} from './static/js/airMes'
import jsonp from './static/js/extension'
import BmapExamples from './page/components/bmap/bmapExamples'

import router from './router/routerConfig.js'
import store from './store/'
import './public/css/all.scss'
import './public/css/specification.scss'
import './static/css/animate.min.css'


Vue.prototype.$ajax = axios;        // 扩展axios 请求数据
Vue.prototype.$airMes = airMes;   // 扩展机场转换方法
Vue.prototype.$cityMes = cityMes;  // 扩展城市转换方法
Vue.prototype.$jsonp = jsonp;    // 扩展jsonp请求方法
Vue.prototype.$bExample = new BmapExamples();    // 挂载
Vue.prototype.$echarts = echarts;
Vue.prototype.$message = Message;

Vue.use(Radio);
Vue.use(Pagination);

axios.interceptors.response.use(
    data => {
        return data;
    },
    error => {
        if(error.response.status === 403){  //返回403则重新登录
            window.sessionStorage.clear();
            return router.push('/login');
        }
        Message.error({
            message: '加载失败'
        });
        return Promise.reject(error)
    }
);

export default new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
