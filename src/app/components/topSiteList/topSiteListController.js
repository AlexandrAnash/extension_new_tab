class topSiteListController {
    /**
     * Список приоритетных сайтов
     */
    constructor(historyService) {
        'ngInject';
        this.historyService = historyService;
    }
    /**
     * Инициализация
     */
    $onInit() {
        this.models = {
            list: this.items || [],
            selected: null
        };
    }
    
    /**
     * Событие после переноса объекта 
     */
    dndDragend() {
        if (!this.onDragend) return;

        this.onDragend({
            items: this.items
        });
    }
}

export default topSiteListController;
