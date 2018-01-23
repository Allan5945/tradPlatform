const format = ([tmp,alternative] = data)=> {
    let [t,type] = [true,""];
    if(typeof(tmp) == 'undefined'){
        type =  'undefined';
        t = false;
    }else if(!tmp && typeof(tmp) != 'undefined' && tmp != 0 && !isNaN(tmp)){
        type = null;
        t = false;
    }else if(isNaN(tmp)&& typeof tmp == Number){
        type = 'NaN';
        t = false;
    }
    if(t){
        return tmp;
    }else{
        return alternative;
    };
};

export default format;