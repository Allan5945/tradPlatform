import Vue from 'vue'
import VueRouter from 'vue-router'
import state from '../store'

// 登录页面
const login = resolve => require(['./../page/login.vue'], resolve);
// 主页 ** 显示全部登录后的内容
const index = resolve => require(['./../page/index.vue'], resolve);
// 用户中心
const userCenter = resolve => require(['./../page/components/mine/myIndex.vue'], resolve);
    //个人中心 7个板块组件
        // 审核列表
        const reviewList = resolve => require(['$src/page/components/mine/reviewList/viewTable.vue'], resolve);
        // 委托/托管
         const entrust = resolve => require(['./../page/components/mine/myOperAgent.vue'], resolve);
        // 我的发布
        const myRelease = resolve => require(['./../page/components/mine/myPublishList.vue'], resolve);
        // 我的意向
        const myIntention = resolve => require(['./../page/components/mine/myPurposeList.vue'], resolve);
        // 我的订单
        // const myOrder = resolve => require(['...'], resolve);
        // 我的收藏
        const myCollection = resolve => require(['./../page/components/mine/collectList/myCollection.vue'], resolve);
        // 公司账户
        // const companyAccount = resolve => require(['...'], resolve);
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
            },
            children: [
                {
                    path: 'userCenter',
                    component: userCenter,
                    children: [
                        {
                            path: 'myCollection',
                            component: myCollection
                        },{
                            path: 'myRelease',
                            component: myRelease
                        },{
                            path: 'myIntention',
                            component: myIntention
                        },{
                            path: 'reviewList',
                            component: reviewList
                        },
                        {
                            path: 'entrust',
                            component: entrust
                        },
                    ]
                }
            ]
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
