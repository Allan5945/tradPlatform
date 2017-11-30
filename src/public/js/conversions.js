import letterConversions from './../../static/js/letterConversions'

function conversions(data) {
    let mes = [];
    data.forEach((val)=>{
        let letter = letterConversions(val.airlnCd);
        mes.push({
            airportName:val.airlnCd,  // 机场名字
            pinyin:letter.allLetter,    // 机场全拼音
            py:letter.fllLetter,    // 机场首字母拼音
            code:val.iata,  // 三字码
            initial:letter.fllLetter.substring(0,1), // 第一个字母
            airLvl:val.airLvl,  // 机场等级
            iaco:val.icao,
            cityCoordinateJ:val.cityCoordinateJ,
            cityCoordinateW:val.cityCoordinateW,
        })
    });
    return mes;
}
function conversionsCity(data) {
    let mes = [];
    data.forEach((val)=>{
        let letter = letterConversions(val.cityName);
        mes.push({
            cityName:val.cityName,  // 机场名字
            pinyin:letter.allLetter,    // 机场全拼音
            py:letter.fllLetter,    // 机场首字母拼音
            cityIcao:val.cityIcao,  // 三字码
            initial:letter.fllLetter.substring(0,1), // 第一个字母
            id:val.id,          // 城市id
            cityCoordinate:val.cityCoordinate // 城市经纬度
        })
    });
    return mes;
}
export {conversions,conversionsCity};