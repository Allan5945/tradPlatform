import {
    TEST,
    CLOSE,
    INITIALIZE,
    HYBRIDDATA,
    MONODATA,
    ROLE,
    TRANSDETAIL
} from './types'
import getters from './getters'
import {state} from './state.js'
const mutations = {
    [TEST](state) {
        state.c_updated = state.c_updated ++;
    },
    [CLOSE](state) {
        state.close = !state.close;
    },
    [INITIALIZE](state,vl) {
        state.airList = vl;
    },
    [MONODATA](state,vl) {
        if(state.demandList.type){
            state.demandList.type = false;
        }
        switch (vl.t){
            case 0:
                state.demandList.monoData = vl.v;
                break;
            case 1:
                state.demandList.monoData = vl.v;
                break;
            case 2:
                state.demandList.monoData.list = state.demandList.monoData.list.concat(vl.v);
                break;
        }
    },
    [HYBRIDDATA](state,vl) {
        if(!state.demandList.type){
            state.demandList.type = true;
        }
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
    },
    [ROLE](state,vl) {
        state.role = vl;
    },
    [TRANSDETAIL](state,vl){
        state.transDetail.transShow = true;
        state.transDetail.userData = vl;
    }
};
export default {
	state,
	mutations,
	getters
}
