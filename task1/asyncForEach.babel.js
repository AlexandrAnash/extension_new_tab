function asyncForEach(array, cb) {
    if (!(array instanceof Array)) throw new TypeError("\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 " + JSON.stringify(array) + " - \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043C\u0430\u0441\u0441\u0438\u0432");
    if (!(cb instanceof Function)) throw new TypeError("\u0424\u0443\u043D\u043A\u0446\u0438\u044F \u043E\u0431\u0440\u0430\u0442\u043D\u043E\u0433\u043E \u0432\u044B\u0437\u043E\u0432\u0430 - \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0437\u0430\u0434\u0430\u043D\u0430");
    return new Promise(function (res) {
        var length = array.length;
        function next(index) {
            if (index < length) {
                cb(array[index], index, next.bind(null, ++index));
            } else {
                res();
            }
        };
        setTimeout(next.bind(null, 0));
    });
}
