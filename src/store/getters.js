export default {
    c_updated:(state)=>{
        return state.c_updated;
    }
    ,close:(state)=>{
        return state.close;
    }
    ,airList:(state)=>{
        return state.airList;
    }
    ,monoData:(state)=>{
        return state.demandList.monoData;
    }
    ,demandList:(state)=>{
        return state.demandList;
    },
    role:(state)=>{
        return state.role;
    },
    transDetail:(state)=>{
        return state.transDetail;
    },
}