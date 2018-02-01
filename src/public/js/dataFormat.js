/**
 * 过滤不符合数据
 * @param { tmp } 被过滤的数据
 * @param { alternative } 替换的值 ** 可以不传，默认为 '-'
 * @author 2018/2/1
 * */
const format = ([tmp,alternative = '-'] = data)=> {
    let [t,type] = [true,""];
    try {
        tmp = eval(tmp);
    } catch(err) {
//            console.log(err);
    };
    if(Object.is(tmp,NaN) || Object.is(tmp,undefined) || Object.is(tmp,null) ){
        t = false;
    };
    if(t){
        return tmp;
    }else{
        return alternative;
    };

};

export default format;