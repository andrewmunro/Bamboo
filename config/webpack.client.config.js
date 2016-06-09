var path = require('path');

module.exports = {
    entry: './src/client',
    resolve: {
        root: [path.join(__dirname, '../src')],
        extensions: ['', '.js'],
        alias: {
            pixi: 'utils/PixiLoader'
        }
    },
    output: {
        path: path.join(__dirname, '../build'),
        filename: 'client.js'
    },
    node: {
        fs: 'empty'
    },
    module: {
        preLoaders: [],
        noParse: [/config\.js/],
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    // https://github.com/babel/babel-loader#options
                    cacheDirectory: true
                }
            },
            {
                test: /\.json?$/,
                loader: 'json',
            }
        ]
    }
};
