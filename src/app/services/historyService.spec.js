import * as constant from 'constants/constant';

describe('test history service', () => {
    let historyService;
    let localStorageService;
    let scope;

    beforeEach(angular.mock.module('newTab'));

    beforeEach(inject((_$rootScope_, _historyService_, _localStorageService_) => {
        historyService = _historyService_;
        localStorageService = _localStorageService_;
        scope = _$rootScope_.$new();
        const chrome = {
            history: {
                search: () => {}
            }
        };
        window.chrome = chrome;
    }));

    it('should be sort and uniq items by visitCount', (done) => {
        const items = [{
            title: 'foo',
            url: 'http://foo.ru/bar',
            visitCount: 0
        }, {
            title: 'bar',
            url: 'http://bar.ru/bar',
            visitCount: 0
        }, {
            title: 'baz',
            url: 'http://foo.ru/baz',
            visitCount: 1
        }];
        spyOn(chrome.history, 'search').and.callFake((obj, cb) => {
            cb(items);
        });
        historyService.getHistoryByChrome().then((data) => {
            expect(data[0].title).toEqual('baz');
            expect(data[1].title).toEqual('bar');
            expect(data[2].title).toEqual('');
            done();
        });
        scope.$digest();
    });

    it('should be all items empty if result null', (done) => {
        const items = [];
        spyOn(chrome.history, 'search').and.callFake((obj, cb) => {
            cb(items);
        });
        historyService.getHistoryByChrome().then((data) => {
            expect(data[0].title).toEqual('');
            expect(data[1].title).toEqual('');
            expect(data[2].title).toEqual('');
            expect(data.length).toEqual(constant.COUNT_TOP_SITE);
            done();
        });
        scope.$digest();
    });

    it('should be return data of local storage', (done) => {
        spyOn(localStorageService, 'getHistoryByLocalStorage').and.returnValue([{ foo: 'bar' }]);
        spyOn(historyService, 'getHistoryByChrome');
        historyService.getTopHistory().then(() => {
            expect(historyService.getHistoryByChrome).not.toHaveBeenCalled();
            done();
        });
        scope.$digest();
        
    });
});