class newTabController {
    /**
     * страница новой вкладки
     */
    constructor($scope, historyService, menuService, localStorageService) {
        'ngInject';
        this.topSites = [];
        this.menuItems = [];
        this.historyService = historyService;
        this.localStorageService = localStorageService;
        this.menuService = menuService;

    }
    /**
     * Инициализация
     */
    $onInit() {
        this.menuService.getMenu().then(items => this.menuItems = items);
        this.historyService.getTopHistory().then((items) => {
            this.topSites = items;
        });
    }

    /**
     * Обработчик изменения порядка элементов
     */
    handlerDragend(items) {
        this.localStorageService.setHistoryByLocalStorage(items);
    }
}

export default newTabController;
