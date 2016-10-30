import * as constant from 'constants/constant';

class localStorageService {

    /**
     * Записать в локальное хранилище 
     * @param { array } items
     */
    setHistoryByLocalStorage(items) {
        localStorage.setItem(constant.NAME_HISTORY_LS, JSON.stringify(items));
    }

    /**
     * Получить из локального хранилища 
     */
    getHistoryByLocalStorage() {
        const items = localStorage.getItem(constant.NAME_HISTORY_LS);
        return items ? JSON.parse(items) : null;
    }
}
export default localStorageService;