class menuListController {
    /**
     * Список меню
     */
    constructor($window) {
        'ngInject';
        this.$window = $window; 
    }
    /**
     * Инициализация
     */
    $onInit() {
    }
    
    /**
     * обработчик клика меню 
     * @param item выбранное меню
     */
    handlerClick(item) {
        chrome.tabs.create({
            url: item.url, 
            active: true
        });
    }
}

export default menuListController;
