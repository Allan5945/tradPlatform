export const state={
    c_updated:0,
    close:true,
    airList :'',
    demandList:{
        type:true,      // 当前操作数据类型
        hybridData:{    // 混合全部数据（例如：航线需求&&运力需求&&我发出的需求）
            list:[]     // 存储数据
        }, // 需求列表-全部列表数据
        hybridPage:1, // 需求列表-全部列表数据,加载的页码
        monoData:{      // 单一数据（例如：航线需求||运力需求||我发出的需求）
            list:[],  // 存储数据
            type:0,   // 查询类型
            code:''  // 查询三字码
        },  // 需求列表-通过点击图标数据,
        monoPage:1,   // 需求列表-通过点击图标数据,加载的页码
        conditions:'', // 需求列表-全部筛选条件
    },
    role:null,
    transDetail:{
        transShow:false,
        id: null
    },
     lineDetail:{
        lineShow:false,
        id: null
    },
     agentDetail:{
        agentShow:false,
        id: null
    }
};
