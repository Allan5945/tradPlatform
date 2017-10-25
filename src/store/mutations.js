import {
    TEST
} from './types'
import getters from './getters'
import {state} from './state.js'
const mutations = {
    [TEST](state) {
        state.c_updated = state.c_updated ++;
    }
};
export default {
	state,
	mutations,
	getters
}