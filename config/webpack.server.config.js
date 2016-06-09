var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './src/server.js',
    resolve: {
        root: [path.join(__dirname, '../src')],
        alias: {
            pixi: 'utils/PixiLoader'
        }
    },
    target: 'node',
    output: {
        path: path.join(__dirname, '../build'),
        filename: 'server.js'
    },
    externals: nodeModules,
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
