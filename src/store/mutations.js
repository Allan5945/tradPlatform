import {
    TEST,
    CLOSE,
    INITIALIZE,
    HYBRIDDATA,
    MONODATA,
    ROLE,
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
        state.demandList.monoData = vl;
    },
    [HYBRIDDATA](state,vl) {
        state.demandList.hybridData = vl;
    },
    [ROLE](state,vl) {
        state.role = vl;
    }
};
export default {
	state,
	mutations,
	getters
}