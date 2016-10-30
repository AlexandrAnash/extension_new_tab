import './src/app/main';

import 'angular-mocks/angular-mocks';


const testsContext = require.context('./src/', true, /.spec.js$/);
const testsContextTask1 = require.context('./task1/', true, /.spec.js$/);
testsContext.keys().forEach(testsContext);
testsContextTask1.keys().forEach(testsContextTask1);