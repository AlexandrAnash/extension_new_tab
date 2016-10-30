/*eslint no-console: 0*/
import asyncForEach from './asyncForEach';
describe('test async forEach', () => {
    beforeEach(() => {
        spyOn(console, 'log');
    });
    it('should be custom error if invalid param', () => {
        expect(() => asyncForEach()).toThrowError(`Параметр undefined - должен быть массив`);
        expect(() => asyncForEach({foo: 'bar'})).toThrowError(`Параметр {"foo":"bar"} - должен быть массив`);
        expect(() => asyncForEach([1,2,3])).toThrowError(`Функция обратного вызова - должен быть задана`);
    });

    it('should be aerial call async function', (done) => {
        jasmine.clock().install();

        console.log('Before');
        asyncForEach([1, 2, 3], (item, index, next) => {
            console.log(`Item ${item} at ${index}`);
            setTimeout(next, 10);
        }).then(() => {
            console.log('Done');
            expect(console.log).toHaveBeenCalledWith('Done');
            expect(console.log.calls.count()).toEqual(6);
            done();
        });
        console.log('After');

        expect(console.log).toHaveBeenCalledWith('Before');
        expect(console.log).toHaveBeenCalledWith('After');
        expect(console.log).not.toHaveBeenCalledWith('Item 1 at 0');
        expect(console.log).not.toHaveBeenCalledWith('Done');

        jasmine.clock().tick(1);
        expect(console.log).toHaveBeenCalledWith('Item 1 at 0');
        expect(console.log).not.toHaveBeenCalledWith('Item 2 at 1');

        jasmine.clock().tick(11);
        expect(console.log).toHaveBeenCalledWith('Item 2 at 1');
        expect(console.log).not.toHaveBeenCalledWith('Item 3 at 2');
        expect(console.log).not.toHaveBeenCalledWith('Done');

        jasmine.clock().tick(21);
        expect(console.log).toHaveBeenCalledWith('Item 3 at 2');
        expect(console.log.calls.count()).toEqual(5);
    });
});