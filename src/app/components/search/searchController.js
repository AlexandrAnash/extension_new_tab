class searchController {
    /**
     * форма поиск
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
    * Переходим на страницу поиска
    */
    search() {
        if (!this.text) return;
        this.$window.location = 'https://yandex.ru/search/?text=' + this.text;
    }
}

export default searchController;
