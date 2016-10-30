import menuItems from 'api/menu';

class menuService {

    /**
     * Сервис для работы с историей  
     */
    constructor($q) {
        'ngInject';
        this.$q = $q;
    }

    /**
     * Получить список меню
     */
    getMenu() {
        return this.$q.resolve(menuItems);
    }
}

export default menuService;