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
    },
    monoData:({commit},vl)=>{
        commit(types.MONODATA,vl)
    },
    hybridData:({commit},vl)=>{
        commit(types.HYBRIDDATA,vl)
    }
}