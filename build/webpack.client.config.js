const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const VueConfig = require('./vue-loader.config')
const utils = require('./utils')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = merge(base, {
    entry: {
        app: './src/entry-client.js'
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    resolve:{
        alias:{
            'create-api':'./create-client-api.js'
        }
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true,
                    test: () => /node_modules/.test(module.context) && !/\.css$/.test(module.request),
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
    },
    plugins: [
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
            'process.env.VUE_ENV': '"client"'
        }),
        new VueSSRClientPlugin()
    ]
})

if (process.env.NODE_ENV === 'production') {
    VueConfig.loaders = utils.cssLoaders({
        extract:true
    })
    config.plugins.push(
        // auto generate service worker
        new SWPrecachePlugin({
            cacheId: 'wwc-blog',
            filename: 'service-worker.js',
            minify: true,
            dontCacheBustUrlsMatching: /./,
            staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
            runtimeCaching: [
                {
                    urlPattern: '/*',
                    handler: 'networkFirst'
                }
            ]
        })
    )
}

module.exports = config
