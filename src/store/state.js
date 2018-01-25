export const state = {
    c_updated: 0,
    close: true,  // ** 事件冒泡关闭触发
    airList: '',  // ** 所以机场列表信息
    cityList: '',  // ** 所以城市列表信息
    companyList: '', // ** 所以航司列表信息
    conditionsOpen:false,  // 是否打开筛选条件
    demandList: {  // ** 需求列表数据
        type: true,      // 当前操作数据类型 true - 混合数据点（hybridPage） || false - 单类型数据（monoData）
        hybridData: {    // 混合全部数据（例如：航线需求&&运力需求&&我发出的需求）
            list: []     // 存储数据
        }, // 需求列表-全部列表数据
        hybridPage: 1, // 需求列表-全部列表数据,加载的页码
        monoData: {      // 单一数据（例如：航线需求||运力需求||我发出的需求）
            list: [],  // 存储数据
            type: 0,   // 查询类型
            code: '',  // 查询三字码
            name:''
        },  // 需求列表-通过点击图标数据,
        monoName:'',
        monoPage: 1,   // 需求列表-通过点击图标数据,加载的页码
        conditions: {  // 需求列表-全部筛选条件
            order:false,
            open:false,
            flyGrade: { // 飞行区等级
                va: [
                    [
                        {v: '1A', s: false},
                        {v: '2A', s: false},
                        {v: '3A', s: false},
                        {v: '4C', s: false},
                    ],
                    [
                        {v: '1B', s: false},
                        {v: '2B', s: false},
                        {v: '3B', s: false},
                        {v: '4D', s: false},
                    ],
                    [
                        {v: '1C', s: false},
                        {v: '2C', s: false},
                        {v: '3C', s: false},
                        {v: '4E', s: false}
                    ],
                    [
                        {v: '3D', s: false},
                        {v: '4F', s: false}
                    ]
                ],
                s: []  // 选中列表
            },
            city: {
                s:[]
            },     //选择
            airType: '',  // 机型
            subsidyPolicy: {  // 补贴政策
                va: [
                    {v: '定补', s: false},
                    {v: '保底', s: false},
                    {v: '人头', s: false},
                    {v: '其他', s: false},
                    {v: '无', s: false},
                    {v: '不限', s: false},
                ],
                s: []
            },
        },
    },
    demandType:true,  // 需求类型   ** true 代表市场需求，false 我发布的需求
    role: window.sessionStorage.getItem('role')? JSON.parse(window.sessionStorage.getItem('role')):null,// ** 用户角色信息
    routeNetwork:[], // ** 航线网络图数据
    searchInfo:{}//信息查询数据
};
