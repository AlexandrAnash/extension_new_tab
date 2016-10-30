const webpackConfig = require('./webpack.config.js');
const configuration = require('./build.configuration.js');


const env = process.env.NODE_ENV || DEBUG;

module.exports = function (config) {
    const _config = {
        basePath: __dirname + '/',

        frameworks: ['jasmine'],

        files: [
            'tests.webpack.js'
        ],

        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only'
        },

        webpackServer: {
            noInfo: true
        },

        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        //browsers: ['Chrome'],

    };

    switch (env) {
        case configuration.KARMA_DEBUG:
            _config.singleRun = false;
            _config.autoWatch = true;
            _config.browsers = ['Chrome'];
            //_config.browsers = ['PhantomJS'];
            break;
        default:
            break;
    }

    config.set(_config);
};