
const login = resolve => require(['./../page/login.vue'], resolve);
const index = resolve => require(['./../page/index.vue'], resolve);


export default{
    routes:[
        {path:'/login', component:login},
        {path:'/index', component:index},
        {path:'*', redirect:'/login'}
    ]
}
