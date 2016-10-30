import historyService from 'services/historyService';
import menuService from 'services/menuService';
import localStorageService from 'services/localStorageService';

export default function Services(app) {
    app.service('historyService', historyService);
    app.service('menuService', menuService);
    app.service('localStorageService', localStorageService);
};