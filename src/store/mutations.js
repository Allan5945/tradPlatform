import * as types from './types'
import getters from './getters'
import {state} from './state.js'


const mutations = {
    [types.TEST](state) {
        state.c_updated = state.c_updated ++;
    },
    [types.CLOSE](state) {
        state.close = !state.close;
    },
    [types.INITIALIZE](state,vl) {
        state.airList = vl.airListData;
        state.cityList = vl.cityListData;
        state.companyList = vl.companyListData;
    },
    [types.SETMONONATA](state,vl) {
        state.demandList.type = false;
        state.demandList.monoName = vl.n;
        state.demandList.monoData = vl.t;

    },
    [types.MONODATA](state,vl) {
        switch (vl.t){
            case 0:
                state.demandList.monoData= vl.v;
                break;
            case 1:
                state.demandList.monoPage = vl.v;
                break;
            case 2:
                state.demandList.monoData.list = state.demandList.monoData.list.concat(vl.v);
                break;
        }
    },
    [types.HYBRIDDATA](state,vl) {
        if(!state.demandList.type){
            state.demandList.type = true;
            state.demandList.monoName = '';
        }
        if(vl != ''){
            switch (vl.t){
                case 0:
                    state.demandList.hybridData = vl.v;
                    break;
                case 1:
                    state.demandList.hybridPage = vl.v;
                    break;
                case 2:
                    state.demandList.hybridData.list = state.demandList.hybridData.list.concat(vl.v);
                    break;
            }
        }
    },
    [types.ROLE](state,vl) {
        state.role = vl;
    },
    [types.SUBSIDYPOLICY](state,vl) {
        if(state.demandList.conditions.subsidyPolicy.va[vl].s){
            let l = state.demandList.conditions.subsidyPolicy.s.indexOf(state.demandList.conditions.subsidyPolicy.va[vl].v);
            state.demandList.conditions.subsidyPolicy.va[vl].s = false;
            state.demandList.conditions.subsidyPolicy.s.splice(l,1);
        }else{
            state.demandList.conditions.subsidyPolicy.va[vl].s = true;
            state.demandList.conditions.subsidyPolicy.s.push(state.demandList.conditions.subsidyPolicy.va[vl].v);
        }
    },
    [types.FLYGRADE](state,vl) {
        if(state.demandList.conditions.flyGrade.va[vl[0]][vl[1]].s){
            let l = state.demandList.conditions.flyGrade.s.indexOf(state.demandList.conditions.flyGrade.va[vl[0]][vl[1]].v);
            state.demandList.conditions.flyGrade.va[vl[0]][vl[1]].s = false;
            state.demandList.conditions.flyGrade.s.splice(l,1);
        }else{
            state.demandList.conditions.flyGrade.va[vl[0]][vl[1]].s = true;
            state.demandList.conditions.flyGrade.s.push(state.demandList.conditions.flyGrade.va[vl[0]][vl[1]].v);
        }
    },
    [types.SETCITY](state,vl) {
        if(vl.t){
            if(state.demandList.conditions.city.s.indexOf(vl.v) == -1){
                state.demandList.conditions.city.s.push(vl.v);
            }
        }else{
            if(vl.v == '$&'){  // 清空筛选条件
                state.demandList.conditions = {
                    flyGrade: {
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
                    },
                    airType: '全选',  // 机型
                    subsidyPolicy: {
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
                }
            }else{
                let l = state.demandList.conditions.city.s.indexOf(vl.v);
                state.demandList.conditions.city.s.splice(l,1);
            }
        }
    },
    [types.SETAIRTYPE](state,vl) {
        if(vl != ''){
            // Vue.$set(state.demandList.conditions,'airType',vl);
            state.demandList.conditions.airType = vl;
        }else{
            // Vue.$set(state.demandList.conditions,'airType','');
            state.demandList.conditions.airType = '';
        }
    },
    [types.OPENSCREEN](state,vl) {
        if(vl){
            state.demandList.conditions.open = true;
            state.conditionsOpen = true;
        }else{
            state.demandList.conditions.open = false;
            state.conditionsOpen = false;
        }
    },
    [types.SETELECT](state,vl) {  // vl['a']  全部数据 || 单条数据
        if(vl.a){
            state.demandList.monoData.list.forEach((v)=>{
                v.set = vl.t;
            });
            state.demandList.hybridData.list.forEach((v)=>{
                v.set = vl.t;
            })
        }else{
            state.demandList.monoData.list.forEach((v)=>{
                if(v.id == vl.t.data.id){
                    v.set = !v.set;
                }
            });
            state.demandList.hybridData.list.forEach((v)=>{
                if(v.id == vl.t.data.id){
                    v.set = !v.set;
                }
            })
        }
    },
    [types.ROUTERNETWORK](state,vl) {
        state.routeNetwork = vl;
    },
    [types.CHANGERENEW](state,vl) {
        vl.forEach((v)=>{
            if(state.demandList.type){
                state.demandList.hybridData.list.forEach((v2,i)=>{
                    if(v2.id == v){
                        state.demandList.hybridData.list[i].renew = '1';
                    }
                })
            }else{
                state.demandList.monoData.list.forEach((v2)=>{
                    if(v2.id == v){
                        state.demandList.hybridData.list[i].renew = '1';
                    }
                })
            }
        })
    },
    [types.TAGREAD](state,vl) {  // vl.t  false,表示取消收藏，true添加收藏
        vl.v.forEach((v)=>{
            let ar = (state.demandList.type ? state.demandList.hybridData.list : state.demandList.monoData.list);
            ar.forEach((v2,i)=>{
                if(v2.id == v.key){
                    if(vl.t){
                        ar[i].collectId = v.val;
                        ar[i].collectType = 1;
                    }else{
                        ar[i].collectType = 0;
                    }
                }
            });
        })
    },
    [types.CHANGEORDER](state,vl) {
        state.demandList.conditions.order = !state.demandList.conditions.order;
    },
    [types.SEARCHINFO](state,vl) {
        state.searchInfo = vl;
    },
    [types.DEMANDTYPE](state,t) {
        state.demandType = t;
        state.demandList.monoPage = 1;
        state.demandList.hybridPage = 1;
    },
    [types.CHANGEROLE](state,t){
        for(let item in t){
            state.role[item] = t[item];
        }
    }
    // [types.SETAIRCODE](state,val) {
    //     state.setaircode = val;
    // },

};
export default {
	state,
	mutations,
	getters
}
