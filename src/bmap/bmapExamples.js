class bmapExamples {
    constructor(map = '', allNum = []) {
        this.map = map;
        this.allNum = allNum;
        this.linesList = ''; // 航线实例
        this.pointList = []; // 所有数字实例

        this.setLinesList = (v,t) => {
            if(t){
                if(this.linesList != ''){
                    this.map.removeOverlay(this.linesList);
                    this.linesList = '';
                };
                let curve = new BMapLib.CurveLine(v, {strokeColor: "blue", strokeWeight: 1, strokeOpacity: 0.5}); //创建弧线对象
                this.map.addOverlay(curve); //添加到地图中
                this.linesList = curve;
            }else{
                this.map.removeOverlay(this.linesList);
                this.linesList = '';
            }
        };

        this.setmap = (v) => {
            this.map = v;
        };
        this.setallNum = (a) => {
            this.allNum = a;
            this.allNum.forEach((v) => {
                let point = new BMap.Point(v.value[0], v.value[1]);
                let opts = {
                    position: point,    // 指定文本标注所在的地理位置
                    offset: new BMap.Size(-5, -40),    //设置文本偏移量
                }
                let num = v.num;
                if(v.num > 9){
                    num = 'N';
                }else if(v.num == 0){
                    num = '';
                }
                let label = new BMap.Label(num, opts);  // 创建文本标注对象
                label.setStyle({
                    color: "black",
                    fontSize: "12px",
                    fontFamily: "微软雅黑",
                    border: 'none',
                    fontWeight: 600,
                    backgroundColor: 'transparent',
                });
                label.alldts = v;
                // label.setZIndex(1);
                this.pointList.push(label);
            });
        };
        this.updateNumber = (v) => {
            this.pointList.forEach((d) => {
                // this.map.removeOverlay(d);
                // d.setContent(666)
            })
        };
        this.updateLine = (v) => {
            this.linesList = '';
        };
        this.init = () => {
            this.map.enableScrollWheelZoom(12);
            // this.map.setMaxZoom(8);
            // this.map.setMinZoom(5);
            this.pointList.forEach((v) => {
                this.map.addOverlay(v);
            })
        };
    }
}

export default bmapExamples;