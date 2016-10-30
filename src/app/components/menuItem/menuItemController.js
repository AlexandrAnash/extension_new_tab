class menuItemController {
    /**
     * Элемент меню
     */
    constructor() {
        'ngInject';
    }
    /**
     * Инициализация
     */
    $onInit() {
    }
    
    /**
     * Обработчик клика
     */
    handlerClick() {
        if (!this.onClick) return;

        this.onClick({item: this.model}); 
    }
}

export default menuItemController;
