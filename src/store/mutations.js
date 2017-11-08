import {
    TEST,
    CLOSE
} from './types'
import getters from './getters'
import {state} from './state.js'
const mutations = {
    [TEST](state) {
        state.c_updated = state.c_updated ++;
    },
    [CLOSE](state) {
        state.close = !state.close;
    }
};
export default {
	state,
	mutations,
	getters
}