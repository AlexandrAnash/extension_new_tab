import * as constant from 'constants/constant';
const emptySite = {
    id: 0,
    lastVisitTime: 0,
    title: '',
    typedCount: 0,
    url: '',
    visitCount: 0
};
/**
 * Получить базовый URL сайта
 * @param {any} url полный 
 */
function getBaseUrl(url) {
    const pathArray = url.split('/');
    const protocol = pathArray[0];
    const host = pathArray[2];
    return protocol + '//' + host;
}

/**
 * Получить топ сайты в виде объекта key value
 * key - базовый url
 * @param {any} items список сайтов
 */
function getTopSiteObjects(items) {
    const topSiteObjects = {};
    const setSite = (baseUrl, item) => {
        item.favicon = `${baseUrl}/favicon.ico`;
        item.baseUrl = baseUrl;
        topSiteObjects[baseUrl] = item;
    };
    items.forEach((item) => {
        const baseUrl = getBaseUrl(item.url);
        const foundSite = topSiteObjects[baseUrl];
        if (foundSite) {
            if (foundSite.visitCount < item.visitCount) {
                setSite(baseUrl, item);
            }
        } else {
            setSite(baseUrl, item);
        }
    });
    return topSiteObjects;
}
class historyService {

    /**
     * Сервис для работы с историей 
     */
    constructor($q, localStorageService) {
        'ngInject';
        this.$q = $q;
        this.localStorageService = localStorageService;
    }
    /**
     * Получить данные из браузера
     */
    getHistoryByChrome() {
        const deferred = this.$q.defer();
        chrome.history.search({
            text: ''
        }, (items) => {
            const topSiteObjects = getTopSiteObjects(items);
            const topSiteArray = Object.values(topSiteObjects).sort((a, b) => a.visitCount < b.visitCount);
            const result = [];
            for (let i = 0; i < constant.COUNT_TOP_SITE; i++) {
                result.push(topSiteArray[i] || emptySite);
            }
            deferred.resolve(result);
        });
        return deferred.promise;

    }

    /**
     * Получить список топ элементов
     */
    getTopHistory() {
        const deferred = this.$q.defer();
        const historyLS = this.localStorageService.getHistoryByLocalStorage();
        if (historyLS) {
            deferred.resolve(historyLS);
        } else {
            this.getHistoryByChrome().then((items) => {
                this.localStorageService.setHistoryByLocalStorage(items);
                deferred.resolve(items);
            });
        }
        return deferred.promise;
    }
}

export default historyService;