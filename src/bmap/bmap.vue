<template>
    <div id="map-warp"></div>
</template>

<script>
    import echarts from 'echarts';
    import '../static/js/bmap.js';
    import * as vx from 'vuex';
    const sy =  {
        "styleJson": [
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": {
                    "color": "#071327",
                    "visibility": "on"
                }
            },
            {
                "featureType": "land",
                "elementType": "all",
                "stylers": {
                    "color": "#223350",
                    "visibility": "on"
                }
            },
            {
                "featureType": "boundary",
                "elementType": "all",
                "stylers": {
                    "color": "#465b6c",
                    "visibility": "on"
                }
            },
            {
                "featureType": "arterial",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "highway",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "label",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }]
    };
    const zs ={
        "styleJson": [{
            "featureType": "water",  // 水
            "elementType": "all",
            "stylers": {
                "color": "#d6d6d5",
                "visibility": "on"
            }
        },
            {
                "featureType": "land",  // 陆地
                "elementType": "all",
                "stylers": {
                    "color": "#f6f6f6",
                    "visibility": "on"
                }
            },
            {
                "featureType": "boundary",  //边境线
                "elementType": "all",
                "stylers": {
                    "color": "#bdbdbd",
                    "visibility": "on"
                }
            },
            {
                "featureType": "arterial",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            },
            {
                "featureType": "highway",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            },
            {
                "featureType": "label",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }]
    };
    var planePath2 = 'path://M786.496 161.163l-3.537-3.507C713.308 88.89 617.627 46.381 511.992 46.381c-105.507 0-201.123 42.418-270.76 111.073l-3.926 3.911c-68.646 69.668-111.074 165.237-111.074 270.775 0 105.633 42.495 201.295 111.275 270.965l3.522 3.508 270.978 271.006 271.169-271.146 3.132-3.164c68.889-69.697 111.459-165.424 111.459-271.164C897.772 326.521 855.277 230.86 786.496 161.163L786.496 161.163zM512.008 541.766c-74.545 0-134.974-60.447-134.974-134.977 0-30.806 10.283-59.152 27.614-81.856 24.663-32.299 63.574-53.151 107.359-53.151 74.55 0 134.978 60.463 134.978 135.008C646.985 481.318 586.558 541.766 512.008 541.766L512.008 541.766zM512.008 541.766';
    // 航线运力都有
    const i1 = 'image://data:image/png;base64,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';
    // 航线需求（无数字）
    const i2 = 'image://data:image/png;base64,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';
    // 航线需求（有数字）
    const i3 = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAL7klEQVR4Xu2dT3YTSRKHI+2NLC3afYI2J8B9grY3vJY2AycATgCcwO4TYE4AcwLcG6tfb3CfAHMCzAkGFpI9742V86rkPzLIVv3LqojMz0urMiryF/G9rMjMynLCHwqgwJ0KOLRBARS4WwEAITtQ4B4FAIT0QAEAIQdQoJoCjCDVdKNVIgoASCKBppvVFACQarrRKhEFACSRQNPNagoASDXdaJWIAgCSSKDpZjUFAKSabrRKRAEASSTQdLOaAgBSTTdaJaIAgCQSaLpZTQEAqaYbrRJRAEASCTTdrKYAgFTTjVaJKAAgiQSablZTAECq6UarRBQAkEQCTTerKQAg1XSjVSIKAEgigaab1RQAkGq60SoRBQAkkUDTzWoKAEg13WiViAIAkkig6WY1BQCkmm60SkQBAGkh0P6DbMpZ76GsuW3xblPE7dzc1m+JuK0f3PDyVZycXP/fy4mszU5l5k/EyRc3PD9twfXkbwEgAVLA/z3YltnsN/Frj0VkAYaGb+ZzWA7Fz47d6Pyfhq1jTkQApIE0yEeI/248lVk2MrgdcbLZgNkqJo7FzQ7F+z8ZYarI92MbAKmhox8Pnor3j8W5bKTQ9ZePLu5AepM/3a581eWcHW8ApGSs/Li3JbK2J9497nCkKOe194fiZm/c8Py4XEOuBpCCOXANhrhnBZtovOxY5OIPQCkeGgBZoZUf93ZE1veCFtvF49XUlYBSUEkAuUOovPA+778W2yPGqjTIQHlOQX+3TACyRBv/18YLma3tm6kxVmGw8ne/L73pG4p5ZrHuTZV8/eJ//q04t70yp6K7wJ+Kl1duND2Mrms1OsQIcilePmr4tYMaWsbR1MuBG01exdGZ+r1IHpD5NpB+NmroW8uoH99qFvI1lNkTapPEV9LzR6oL/37pXqhqqRVPq2wvmPjnqT9yJTuC+PHgmXh5nU4hXpFdN3vpfj97U7G1+WZJApLDIfLWfPRa64B/54bT563dTtGNkgPEj/t7Im5fUQyMuJImJEkB4sf9t5Ev/IWFLSveN6a7Ka2XJAOIPxociJMXYTMoAeveH7rR9EkCPc27mAQg1BxNp3M6j1vRAwIcTcNxZS8NSKIG5HIn7odQKYJdee6Gk3cx6xAtIPMV8sFn1jlCp+/Fbszvl8QLyHiQjRzhDkwInXdW7Gcr7huTB7HObEUJCDNWrdN17IaT3dbv2sINowPEH/WzQxTet6Adt7ilgP/DDafRLcBGBQh1R8fMrsuv7tHk5rC7jt1p4vZxAcJiYBM5UcdGdI9a0QAy37ouH+tEl7aNKBDV1G88gDBr1Uh21zYS2axWFICwWl47rZs14OWNG01eNmu0G2uRANL/zFuB3STQ3Xe9eBDDK7vmAWH00AbG9V6tf7vh1PIplHlHIgCE0UMrItKb/Gx9hd00IIweatG4dMz+4qFtQI76H9M85E07GFd82N+nZRYQ1j2MQCK2t8TbBYRVcxuEeH/iRtNfbTj7o5eWAfkP73pYSTu7U74mAWHHrhUwrqd8ze70tQnIuP9OxD21libp+utP3XD6wGL/bQJyNODxylq2Gd0Kbw4QZq+skXE15Tt75UZn5j4vYQ+Qo42X4tZeG02ThN3Ovt0+NfeJCXuAjPuHIu5fCWeaza57+epGk5+tOW8QkIG3JjL+XipgsA4xBQgHwRlHzdurQ4wBwnc9TCNi8EUqY4D090XcnukkSdl5L/+40cTUYX7WAKFANw2YvQVDW4AcDY7FyW+mcyRx591wYirnTDnrx8xg2efL1mHXAGI/44z1AECCBYwRJJi0LRoGkCBiswYSRNYujJo6edHMIxaAdJHLIe5p6yAHAAmRA9i8RwEACZIejCBBZO3AKIAEER1AgsjagVEACSI6gASRtQOjABJEdAAJImv7Ro3t6LVUpG+JrH9uP6LcsVkFWAdpVs8FaywUBpO2RcMAEkxsAAkmbYuGASSY2H7cPxFxD4PdAMPBFWA3b0CJPdvdA6rbiulvbjjZbOVODd3ETJGe9dePeaOwobh3Y4Y3CsPq7jkTK6zAwa17c59lMzaC9HZE1j8EjyM3CKOAsTWQTARTgMwfs3irMEz2tmCVc7HCi0yhHl7jQHcwV6AbHUEo1AMlcGCznM0bWOC5efZktSJz8zcxWH+YHEEu65CvIvJT81HEYjAFDNYfhgHhC1PBEjmEYe+/uNF0K4Tp0DbNzWLlI8hR/7E49z60ONhvSAGjj1dmRxAesxpK3NbM8JXb1qS+upHnQ56ta17thv6TG063q7XtvpXJRyxms7pPnBIemDoH6/t+mQVkDgnb30skavuXGi7Or8QyDggf1Gk/68vc0dYBDct6ZhqQyxmtU3HulzJh49pWFPgmvcmW25Vszcrsn31AeEdEafLZHz1MT/Nez2Z9kE05658wiqjiJIrRIwpA5sU6tYgqPERMz1wtamn+EWthXYQDHVRQYnvdI6pp3sXOsMtXBR0iYutYn1WqRTOCXK6L8BXcVREP+bvB76CvkiMuQLKC/Xxwylb4VWEP8Lv3X2Rjum19WjfaR6zrWoSdvgGyv4BJo+97rOpZVCPIQsHOo9aqyDf6exxrHsskiRMQHrUaTf97jRk8DK6MOFECkhfsfw+25UKOqUfKpEPZa/0n6U13Yqs7olwHWRZaFhDLJnyp67/Juuy4R5OTUq2MXRztCHJTtA8OxMkLY3Ex4G5c6x13CR49IPnjFqfCNw1cNFtJVgmTBiBsaFyVByV+t3cAdYnO/XBpEoBQtNdJkcW2ce2zKqJKMoDkkLDrt0hO3HXNN5GLbTc8z3YqJPOXFCCX9QhFe6X0TqMo/16a5AChaK9Ah+GD3yr09laTNAGhaC+RN2kV5Ywglwqw0l6EkfhXylepkOQIciUKRfu96ZHESjmArFCAI0zvEMj7J240PVyVQLH/nvQIcjOScELj7USPd/t6WaABJFsfYXv8Qt7Y/FRa2cQvej2A3C7aPxYVLs7rKMqZxbonsxMv2inKl+QGI8h3oiRctCezQ7fM6A8gS9RK7rMKER7XUwaC+64FkGWApFS0R/5OeV1QAOSuZYBxb0dk/UNdgVW3j/QsqyY1B5D7ivajjZfi1l43KbgiWxTlBYIBIOmutFOUA0gBBVYBktcj/WMR97C+NS0W0t6hWyYKjCAF1PLj3pbIena8zU8FLld+SXqvzdYJCIAUVC+SzytE8+WngmGrfRmAlJDQWy/aIz1gukQIS18KICUlM7zSTlFeMtbZ5QBSUrT5zl9rRTtFeckwX18OIBWUs/W6Ljt0K4QYQOqIlrX1Nj7Uk+RZVnVju9ieEaSGmn7c3xdxezVMBG6a5llWTYoKIDXV9OO+zq9ZJXyWVc2Q3moOIDXV1Fm089pszbBSgzQlYF6PqPqaFUV5k7FlBGlITSVFOzt0G4rnlRkAaVDQzot2zrJqMJpzUwDSsKTdfc2Ks6waDiWAhBA0L9rP+ifi3C8h7C+3SVEeSmtGkADKtlq089psgAjemASQQPK2dMYWRXmg+FGkBxY2n/49Cv4JanboBo4jI0hggYMV7ZxlFThyzGK1InCQop2zrFqJHdO8LcncaNFOUd5S1BhBWhW6saKd12ZbjRs1SItyN/C6LkV5i/HiEatlsfOZrXHVr1nx2mwH4WKrSduiV/uaFWdZtR0n1kG6Uvxme3zRr1lxllWHsaIG6Uj8gkU7K+UdxYcRpGPh5/VIb0f82rvlGxv9J1l3z9yjSXbkKX8dKcAI0pHwi7fNRxMv2yKyLc4fi5cTvlGuIDC8D6IjCHihVwFGEL2xwTMFCgCIgiDggl4FAERvbPBMgQIAoiAIuKBXAQDRGxs8U6AAgCgIAi7oVQBA9MYGzxQoACAKgoALehUAEL2xwTMFCgCIgiDggl4FAERvbPBMgQIAoiAIuKBXAQDRGxs8U6AAgCgIAi7oVQBA9MYGzxQoACAKgoALehUAEL2xwTMFCgCIgiDggl4FAERvbPBMgQIAoiAIuKBXAQDRGxs8U6AAgCgIAi7oVQBA9MYGzxQoACAKgoALehUAEL2xwTMFCgCIgiDggl4FAERvbPBMgQL/B3I1vPZC9unxAAAAAElFTkSuQmCC';
    //  运力需求（无数字）
    const i4 = 'image://data:image/png;base64,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';
    // 运力需求（有数字）
    const i5 = 'image://data:image/png;base64,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';
    // 我发出的需求
    const i6 = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAABRNJREFUSA2dVjuPXDUU9uve2ZlNEJCAxEsoS4oIRAVCimiokPgXiGIrKCigpyUliGILRMNvQEqVhgZBByjikYcgUEAEIrMzO/faPnzf8fXsHTIsKyzdscc+Pp/P67OtOUV75fWbO3632f1LjmbWhWD7FMzEGMk+So7xAbuzaN0T888+sKv/UmdPEnj5jetne2fOm0nTpN65Ituha4dtddwZ34RsbN83C/P75x9fuvdvercC7u9L8+30xmNdNDsEkmDXcqnvHeEIxeabJpeRMTauxEvI7cwcPbvc+/XgwPZ1rfZrRXXihf0vZ2148PEupiBhousEaby1x/ZUG4+h+yRSwQncBh+7+OcvXx28uKi62W8AEsw3Dz1ZrapAFMyxuFT85h6bjHDdhQxLW9MnWAmrbeQBck79Hz+PQYe4GEM30rIxmMAqAiVxnkDZWif44Zdj0rHOYY0yyB94YmJ5UIYhY5E6qZuHYlsDlpjRjVY30IUBYAQigCoEoE05OCj3ttWDEFAPhIEeSkGLjmydY2iou8ANgMxGJojkcjqekpZVMColqJM0WBodfOY8Pp3DWpUpoNxbQJkH1E0Mggb+9DNzPnWIEXIA3gdYVDC6LcMSb6Jj5CS3VgDCPbVZZKV3nWMk6ceMsBkvht5BySKw2WhJAQN77tnX3pLJ3Xzj6Sje0/cwQa3QOMEoWqAJM7g22nzRJP+cAvr0TRD3A0wXAlvXYZtPTCQmEXv8SUyigP6c27sdunznjJ4AtjJuOdKS4iKosDDSGYAZaXa7nN4Vca9CohgIYyFytTX2inFxbnILxXA2LKQObBINj1oZXdfcOeNIVyxjWsc6YwyKNpQC3Yf84uZVIpgAbLNxrsvmnZwSXN2XPYNI1QUzobM1xHLkxnEZV3UepukYhJWcfWYbWJXlWvbNniAEnKNnwLF68A7G5NzpmFiORFypqxY3LcOi0DIqkN48z/6kVmW4h3yGqte9TB7yETFQQMGR9e9vDdwYUVeVQ9d0eb/oeqbKNIzCRqu8y0nUl4/kvrEEkg4Zh/wT0hVakK/H61vHgwwzlRZSx1iOuoiFPiIvaTSElA/HYiBb1lnOP8IhVzdXjv9xTcsDspwNQ/w4rjol9YxrdLw8maWF6ZHgAxnjKLCQCnoDIsutM1e2gXJu4v37rEWBs7T2gldgjunOqptYgTe1Mbce4WmU6Vl0BANFSE7BehQd6cLleSPpPZTlpxuFb9z3uHhL4UsnEaHwcB91mAQP4dqqjJ0O+0PNpJfevH4hdZNJlOhL8TtQmtWPWUfO3EZrPKS2gVnokeIZycDLdCfvyWBD8u1q9cWHl25q3czyw79Vt1JAaYlWavIU1zIZnAVPgjWVxrgGAM5RfgymHgKPji9lPj14OAW89tGj8+k0LMql2WT6nf7nRtxV0JwTOTIBABCR/3kYj55zHmt1ruwp3OelXMTTaV7Ud05hEwDwDdKGpCVCv6uVAKUyPfEAoAqBlpAYdF8BZRkNHhncy3zgHHVSN61j0xiWoTGX3/5pmrruqfGtX2NKmcqNVb7268zWG6K8bfRBhZfcP58YG4BUcPyI8uvbn/Nkfca50h/n2OgJ9owX+/KeOeUjihvY6jNxuXR6k/DW5m1SVrf/ViCSCGN26mfiWJ0+hPU1MAHjMpVaJeGxTKHFwlRM/f/1EB4r5JivgmX73dnDpZ/aDk/9GZ76aPWpvztNS3O3nV/75MIR509qfwPuy4yu0lvuuwAAAABJRU5ErkJggg=='
    // 别人发出的需求
    const i7 = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAGxJREFUGBljZAAC47Qz/L9/s7r+Y2BQAPGZGBgesLL+3n12lslHRpDkr19sGf8Z/nOCJGGAkYHxOxvbrxlMIJ3okiBFIDGQHBPMWJhOZBokB7QOP2ACOQiXEpAcE8i1IAehKwKJQeSAMvi8CQBIwy6CA4oxNgAAAABJRU5ErkJggg==';



    export default {
        data() {
            return {}
        },
        props:['allDot'],
        computed:{
            ...vx.mapGetters([
                'c_updated',
                'airList'
            ]),
        },
        mounted: function () {
            let a = [],d = [],b = [];
            this.allDot.data.forEach((v)=>{
                let mes = this.$airMes(this.airList,v.dpt);
                let obj = v.obj.split(',');
                let demandType = v.demandType.split(',');
                let quantity = '';
                let demand = {
                    tag:'',
                    dbSize:16
                };
                if(obj.indexOf('0') != -1){
                    demand.tag = i6;
                    demand.dbSize = 16;
                }else if(obj.indexOf('1') != -1){
                    demand.tag = i7;
                    demand.dbSize = 6;
                }
                if(demandType.indexOf('0') != -1 && demandType.indexOf('1') != -1){
                    quantity = i1;
                }else if(demandType.indexOf('0') != -1){
                    if(v.num == 0){
                        quantity = i2;
                    }else{
                        quantity = i3;
                    }
                }else if(demandType.indexOf('1') != -1){
                    if(v.num == 0){
                        quantity = i4;
                    }else{
                        quantity = i5;
                    }
                }
                if(
                    v.cityCoordinateJ != null &&
                    v.cityCoordinateW != null &&
                    v.demandType != null &&
//                    v.newInfo != null &&
                    v.num != null &&
                    v.obj != null
                ){
                    let _d, // 无数据
                        _b; // 有新数据，自己发出
                    if(v.newInfo == 0){
                        _b = {
                            name: mes.airportName,
                            value: [mes.cityCoordinateW, mes.cityCoordinateJ],
                            symbol:demand.tag,
                            symbolSize:demand.dbSize,
                            symbolOffset:[0,0],
                            quantity:v.num
                        };
                        b.push(_b);
                    }else{
                        _d = {
                            name: mes.airlnCd,
                            value: [mes.cityCoordinateW, mes.cityCoordinateJ],
                            symbol:demand.tag,
                            symbolSize:demand.dbSize,
                            symbolOffset:[0,0],
                            quantity:v.num
                        };
                        d.push(_d);
                    }
                    // 航线需求列表
                    let _a = {
                        name: mes.airlnCd,
                        value: [mes.cityCoordinateW, mes.cityCoordinateJ],
                        symbol:quantity,
                        symbolSize:40,
                        symbolOffset:[0,-25],
                        quantity:v.num
                    };
                    a.push(_a);
                }
            });
            this.myChart = echarts.init(document.getElementById('map-warp'));
            var option = {
                "bmap": {
                    "center": ["110.47", "32.40"], //
                    "zoom": 6,
                    "color": "red",
                    "roam": "move",
                    "type": 'bmap',
                    "mapStyle":zs
                },
                "tooltip": {trigger: 'item'},
                "series": [
                    {
                        "type": "scatter",
                        "coordinateSystem": "bmap",
                        "data":a,
                        "symbolSize": 50,
                        "label": {
                            "normal": {
                                "show": true,
                                color:'white',
                                "formatter":function (v) {
                                    if(v.data.quantity > 9){
                                        return 'N';
                                    }else if(v.data.quantity == 0){
                                        return '';
                                    }else{
                                        return v.data.quantity;
                                    }
                                },
                                offset:[0,-2]

                            },
                            "emphasis": {"show": false},
                        },
                        "itemStyle": {
                            "emphasis": {
                                "borderColor": "#fff", "borderWidth": 1
                            }
                        }
                    },
                    {
                        "type": "scatter",
                        "coordinateSystem": "bmap",
                        "data":d,
//                        symbol:i1,
                        "symbolSize": 50,
                        "label": {
                            "normal": {
                                "show": true,
                                color:'white',
                                "formatter":function (v) {
                                    return '';
                                },
                                offset:[0,-2]

                            },
                            "emphasis": {"show": false},
                        },
                        "itemStyle": {
                            "emphasis": {
                                "borderColor": "#fff", "borderWidth": 1
                            }
                        }
                    },
                    {
                        "type": "effectScatter",
                        "coordinateSystem": "bmap",
                        "data":b,
                        "symbolSize": 50,
                        "label": {
                            "normal": {
                                "show": true,
                                color:'white',
                                "formatter":function (v) {
                                    return '';
                                },
                                offset:[0,-2]

                            },
                            "emphasis": {"show": false},
                        },
                        "itemStyle": {
                            "emphasis": {
                                "borderColor": "#fff", "borderWidth": 1
                            }
                        }
                    },
                ]
            };
            this.myChart.setOption(option);

            this.myChart.on('click', function (a) {
                console.log(a.data);

            })
        }
    }
</script>
<style>
    #map-warp {
        width: 100%;
        height: 100%;
    }
</style>