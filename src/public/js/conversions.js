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
            iaco:val.iaco,
            cityCoordinateJ:val.cityCoordinateJ,
            cityCoordinateW:val.cityCoordinateW,
        })
    });
    return mes;
}
export default conversions;