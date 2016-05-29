var path = require('path');

module.exports = {
    entry: './src/client',
    resolve: {
        root: [path.join(__dirname, '../src')],
        extensions: ['', '.js'],
    },
    output: {
        path: path.join(__dirname, '../build'),
        filename: 'client.js'
    },
    module: {
        preLoaders: [],
        noParse: [/config\.js/],
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.json?$/,
                exclude: /node_modules/,
                loader: 'json'
            }
        ]
    }
};
