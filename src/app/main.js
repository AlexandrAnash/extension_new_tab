import 'angular';
import 'angular-drag-and-drop-lists';
import 'lodash';
import components from './config/components';
import services from './config/services';
import directives from './config/directives';

const app = angular.module('newTab', [
    'dndLists'
]);
components(app);
directives(app);
services(app);


angular.bootstrap(document, ['newTab'], {
    strictDi: true
});
export default app;
