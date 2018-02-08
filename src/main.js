import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import echarts from 'echarts'
import {Radio,Pagination,Message,Checkbox,pagination,TimePicker,TimeSelect} from 'element-ui'

import {airMes,cityMes,companyMes} from './static/js/airMes'
import {local} from './static/js/function'
import jsonp from './static/js/extension'
import BmapExamples from './page/components/bmap/bmapExamples'

import dft from './public/js/dataFormat'
import router from './router/routerConfig.js'
import store from './store/'
import './public/css/all.scss'
import './public/css/specification.scss'
import './static/css/animate.min.css'


Vue.prototype.$ajax = axios;        // 扩展axios 请求数据
Vue.prototype.$airMes = airMes;   // 扩展机场转换方法
Vue.prototype.$cityMes = cityMes;  // 扩展城市转换方法
Vue.prototype.$companyMes = companyMes;  // 扩展航司转换方法
Vue.prototype.$jsonp = jsonp;    // 扩展jsonp请求方法
Vue.prototype.$bExample = new BmapExamples();    // 挂载
Vue.prototype.$chatSocket = null;   // 扩展webscoket
Vue.prototype.$echarts = echarts;
Vue.prototype.$message = Message;
Vue.prototype.$local = local;    // 信息查询信息缓存

Vue.use(Radio);
Vue.use(Pagination);
Vue.use(Checkbox);
Vue.use(TimePicker);
Vue.use(TimeSelect);

//axios拦截器
axios.interceptors.response.use(
    data => {
        if(data.config.url == "/getValidCode"){  //每次接收到验证码后记录时间戳
            if(data.data.opResult && data.data.opResult == 0){
                let time = (new Date()).getTime();
                window.localStorage.setItem("validCodeTime",time);
            }
        }
        return data;
    },
    error => {
        if(error.response.status === 403){  //返回403则重新登录
            window.sessionStorage.clear();
            return router.push('/login');
        }
        Message.error({
            message: '网络错误，请稍后重试'
        });
        return Promise.reject(error)
    }
);

// 注册数据过滤器
Vue.filter('dft', dft);

export default new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
