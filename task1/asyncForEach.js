function asyncForEach(array, cb) {
    if (!(array instanceof Array)) throw new TypeError(`Параметр ${JSON.stringify(array)} - должен быть массив`);
    if (!(cb instanceof Function)) throw new TypeError(`Функция обратного вызова - должен быть задана`);
    return new Promise((res) => {
        const length = array.length;
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
export default asyncForEach;