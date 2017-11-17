import * as types from './types'

export default {
    packUp:({commit})=>{
        commit(types.TEST)
    },
    close:({commit})=>{
        commit(types.CLOSE)
    },
    initialize:({commit},vl)=>{
        commit(types.INITIALIZE,vl)
    }
}