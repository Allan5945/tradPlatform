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
    },
    role:({commit},vl)=>{
        commit(types.ROLE,vl)
    },
    transDetail:({commit},vl)=>{
        commit(types.TRANSDETAIL,vl)
    },

    setFlyGrade:({commit},vl)=>{
        commit(types.FLYGRADE,vl)
    },
    setSubsidyPolicy:({commit},vl)=>{
        commit(types.SUBSIDYPOLICY,vl)
    },
    setCity:({commit},vl)=>{
        commit(types.SETCITY,vl)
    },
    setAirType:({commit},vl)=>{
        commit(types.SETAIRTYPE,vl)
    },
    openScreen:({commit},vl)=>{
        commit(types.OPENSCREEN,vl)
    },
    setelect:({commit},vl)=>{
        commit(types.SETELECT,vl)
    }
}
