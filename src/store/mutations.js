import {
    TEST,
    CLOSE,
    INITIALIZE
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
    }
};
export default {
	state,
	mutations,
	getters
}