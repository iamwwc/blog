const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const VueLoaderConfig = require('./vue-loader.config')
const isProd = process.env.NODE_ENV === 'production'
const resolve = (...dir) => path.resolve(...dir)
const { readFileSync } = require('fs')


module.exports = {
    devtool: isProd
        ? false
        : '#cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            'public': path.resolve(__dirname, '../public'),
            '~': path.resolve(__dirname, '../'),
            '@': resolve(__dirname, '..', 'src')
        },
        extensions: ['.js', '.vue']
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: VueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'vue-style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader',
                    options: {
                        includePaths: [
                            path.resolve(__dirname, '../src/assets/css/'),
                        ]
                    }
                }]
            }, {
                test: /\.css$/,
                use: [{
                    loader: 'vue-style-loader'
                }, {
                    loader: 'css-loader'
                }]
            },
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            },
            {
                test: /\.styl(us)?$/,
                use: isProd
                    ? ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: { minimize: true }
                            },
                            'stylus-loader'
                        ],
                        fallback: 'vue-style-loader'
                    })
                    : ['vue-style-loader', 'css-loader', 'stylus-loader']
            },
        ]
    },
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false
    },
    plugins: isProd
        ? [
            new VueLoaderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new ExtractTextPlugin({
                filename: 'common.[chunkhash].css'
            })
        ]
        : [
            new VueLoaderPlugin(),
            new FriendlyErrorsPlugin()
        ]
}
