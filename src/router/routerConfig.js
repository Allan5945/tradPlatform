
const page1 = resolve => require(['./../page/page1.vue'], resolve);
const page2 = resolve => require(['./../page/page2.vue'], resolve);


export default{
    routes:[
        {path:'/page1', component:page1},
        {path:'/page2', component:page2},
        // {path:'*', redirect:'/setting'}
    ]
}
