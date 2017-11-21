/**
 * 机场转换信息 方法
 * @param data{list}机场信息列表 field{string}传入信息
 * @author  2017/11
 * @version  1.0.1
 * */

let airMes = function (data,field = '$%') {
    for(let i = 0;i < data.length;i ++){
        if(data[i].airportName != null && data[i].airportName == field){
            return data[i];
        }else if(data[i].code != null && data[i].code == field){
            return data[i];
        }else if(data[i].icao != null && data[i].icao == field){
            return data[i];
        };
    };
    return '';
};
export default airMes;