/**
 * jsonp 方法
 * @param url{string} callback {function} 传递回调函数
 * @author  2017/11
 * @version  1.0.1
 * */

var getJSONP = function (url, callback) {
    if (!url) {
        return;
    }
    var a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    var r1 = Math.floor(Math.random() * 10);
    var r2 = Math.floor(Math.random() * 10);
    var r3 = Math.floor(Math.random() * 10);
    var name = 'getJSONP' + a[r1] + a[r2] + a[r3];
    var cbname = 'getJSONP.' + name;
    if (url.indexOf('?') === -1) {
        url += '?callback=' + cbname;
    } else {
        url += '&callback=' + cbname;
    }
    var script = document.createElement('script');
    getJSONP[name] = function (e) {
        try {
            callback && callback(e);
        } catch (e) {
        }
        finally {
            script.parentNode.removeChild(script);
        }
    }
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
};
export default getJSONP;
// getJSONP('restful/getAirportOnLineData',function(response){
//     console.log(response)
// });
