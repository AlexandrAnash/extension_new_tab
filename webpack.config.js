const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appPath = __dirname + '/src/app/';
const stylePath = __dirname + '/src/less/';
const distPath = __dirname + '/dist/';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const configuration = require('./build.configuration.js');


const env = process.env.NODE_ENV || configuration.DEBUG;

const config = {
    context: __dirname + '/',
    entry: {
        app: `${appPath}main.js`,
        style: `${stylePath}main.less`
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        chunkFilename: '[id].js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src/app']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css!autoprefixer-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: __dirname,
                loaders: ['ng-annotate', 'babel-loader']
            },
            {
                test: /\.(png|jpg|jpeg)?$/,
                loader: 'file-loader?name=img/[name].[ext]'
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        devtool: 'eval',
        progress: true,
        colors: true,
        compress: true,
        hot: true
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html'
        }),
        new webpack.optimize.DedupePlugin()
    ]

};
switch (env) {
    case configuration.DEBUG:
        config.devtool = 'source-map';
        config.module.loaders.push({
            test: /\.less$/,
            loaders: ['style', 'css?sourceMap', 'postcss', 'less?sourceMap']
        });
        config.module.loaders.push(
            {
                test: /\.(ttf|woff|eot|svg)?$/,
                loader: 'url-loader?name=fonts/[name].[ext]'
            });
        config.watch = true;
        break;
    case configuration.SERVER:
        config.devtool = 'source-map';
        config.module.loaders.push({
            test: /\.less$/,
            loaders: ['style', 'css?sourceMap', 'postcss', 'less?sourceMap']
        });
        config.module.loaders.push(
            {
                test: /\.(ttf|woff|eot|svg)?$/,
                loader: 'url-loader?name=fonts/[name].[ext]'
            });
        config.devServer = {
            host: 'localhost',
            post: 8081,
        };
        break;
    case configuration.KARMA_DEBUG:
        config.devtool = 'inline-source-map';
        config.module.loaders.push({
            test: /\.less$/,
            loaders: ['style', 'css', 'less']
        });
        config.module.loaders.push(
            {
                test: /\.(ttf|woff|eot|svg)?$/,
                loader: 'url-loader?name=fonts/[name].[ext]'
            });
        break;
    case configuration.PRODUCTION:
        const ExtractCSS = new ExtractTextPlugin('[name].css');
        config.output.path = `${distPath}`;
        config.module.loaders.push({
            test: /\.less$/,
            loader: ExtractCSS.extract('style', 'css!autoprefixer-loader!postcss!less')
        });
        config.module.loaders.push(
            {
                test: /\.(ttf|woff|eot|svg)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            });
        config.plugins.push(
            ExtractCSS,
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            }),
            new webpack.optimize.OccurrenceOrderPlugin(true)
        );
        break;
    default:
        break;
}
module.exports = config;
