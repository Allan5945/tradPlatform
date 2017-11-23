export const state={
    c_updated:0,
    close:true,
    airList :'',
    demandList:{
        type:true,
        hybridData:{
            list:[]
        }, // 需求列表-全部列表数据
        hybridPage:1, // 需求列表-全部列表数据,加载的页码
        monoData:{
            list:[]
        },  // 需求列表-通过点击图标数据,
        monoPage:1,   // 需求列表-通过点击图标数据,加载的页码
        conditions:'', // 需求列表-全部筛选条件
    },
    role:null
};
