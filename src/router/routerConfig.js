import Vue from 'vue'
import VueRouter from 'vue-router'
import state from '../store'

const login = resolve => require(['./../page/login.vue'], resolve);
const index = resolve => require(['./../page/index.vue'], resolve);

Vue.use(VueRouter);

const router = new VueRouter({
    routes:[
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: index,
            meta:{
                requireAuth: true
            }
        },
        {
            path: '/login',
            component: login
        },{
            path: '/*',
            redirect: '/login'
        }
    ],
    model: 'history'
})

router.beforeEach((to, from, next) => {
    let token = window.sessionStorage.getItem('isLogin')==='ok';
    if(to.meta.requireAuth){//需要登录
        if(token) next();
        else{
            next({
                path: '/login',
                // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由，这步可后续做
            })
        }
    }else{
        next();
    }
})

export default router