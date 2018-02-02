/**
 * Created  2017/1/11.
 */
const localEvent = function (item) {
    this.get = function () {
        return sessionStorage.getItem(item) ? JSON.parse(sessionStorage.getItem(item)) : '';
    }
    this.set = function (obj) {
        sessionStorage.setItem(item, JSON.stringify(obj));
    }
    this.clear = function () {
        sessionStorage.removeItem(item);
    }
}


export const local = new localEvent('search_info');


