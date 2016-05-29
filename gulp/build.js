'use strict';

var webpack = require('webpack'),
    gutil = require('gulp-util'),
    notify = require('./notifier');

module.exports = function(gulp) {

    function buildWebpack(config, done) {
        var firstRun = true,
            hasError = false;

        webpack(config, function(err, stats) {
            if (err) {
                throw new gutil.PluginError('webpack', err);
            }

            if (stats.compilation.errors && stats.compilation.errors.length > 0) {
                gutil.log(gutil.colors.red('[webpack:error]'), stats.toString({
                    colors: true
                }));

                // Only notify once!
                if(!hasError) {
                    // Remove the path from the webpack error.
                    var errorMessage = stats.compilation.errors[0].error.message;
                    errorMessage = errorMessage.substr(errorMessage.lastIndexOf('/'));
                    notify.error('Error!', 'Webpack build failed: ' + errorMessage);
                }
                hasError = true;
            } else {
                gutil.log(gutil.colors.green('[webpack:built]'), stats.toString({
                    colors: true,
                    chunkModules: false
                }));

                if(hasError) {
                    hasError = false;
                    notify.info('Compiled!', 'No more errors.');
                }
            }

            // Only call callback to gulp once (on first compile).
            if(firstRun) {
                firstRun = false;
                done();
            }
        });
    }

    gulp.task('build:client', 'Use webpack to build the client code', function(done) {
        var config = require('../config/webpack.client.config.js');
        config.watch = gutil.env.watch;
        config.entry = './src/client.js';
        if(gutil.env.sourceMap) {
            config.devtool = 'inline-source-map';
        }

        buildWebpack(config, done);
    }, {
        aliases: ['b:c', 'buildclient'],
        options: {
            'watch': 'Enable webpack watcher',
            'sourceMap': 'Enable source mapping'
        }
    });

    gulp.task('build:server', 'Use webpack to build the server code', function(done) {
        var config = require('../config/webpack.server.config.js');
        config.watch = gutil.env.watch;
        config.entry = './src/server.js';
        if(gutil.env.sourceMap) {
            config.devtool = 'inline-source-map';
        }

        buildWebpack(config, done);
    }, {
        aliases: ['b:s', 'buildserver'],
        options: {
            'watch': 'Enable webpack watcher',
            'sourceMap': 'Enable source mapping'
        }
    });
};
