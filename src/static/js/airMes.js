/**
 * 机场转换信息 方法
 * @param data{list}机场信息列表 field{string}传入信息
 * @author  2017/11
 * @version  1.0.1
 * */

let airMes = function (data,field = '$%') {
    for(let i = 0;i < data.length;i ++){
        if(data[i].airlnCd != null && data[i].airlnCd == field){
            return data[i];
        }else if(data[i].iata != null && data[i].iata == field){
            return data[i];
        }else if(data[i].icao != null && data[i].icao == field){
            return data[i];
        };
    };
    return '';
};
export default airMes;