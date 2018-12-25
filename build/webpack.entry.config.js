const path = require('path')

const resolve = (...dir) => path.resolve(...dir)

module.exports = {
    entry: resolve(__dirname, '../server.js'),
    output: {
        filename: 'bundled-server.js',
        path: resolve(__dirname, '../')
    },
    mode: 'production',
    target: 'node',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
        }
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_module/
            },
        ]
    },
}