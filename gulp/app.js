'use strict';
var gutil = require('gulp-util'),
    spawn = require('child_process').spawn,
    notify = require('./notifier'),
    livereload = require('gulp-livereload'),
    serverProcess;

module.exports = function(gulp) {
    function startApp(event) {
        if (serverProcess) serverProcess.kill();
        gutil.log(gutil.colors.green('Starting app...'));
        process.env.sourceMap = gutil.env.sourceMap;
        serverProcess = spawn('node', ['build/server'], {stdio: ['pipe', 1, 2, 'ipc'], env: process.env});
        serverProcess.on('message', function(message) {
            if(message === 'ready') {
                if(gutil.env.livereload) {
                    livereload.changed(event ? event.path : '');
                }
            }
        });
    }

    gulp.task('app:start', 'Start the app', ['build:client', 'build:server'], function() {
        startApp();

        if(gutil.env.livereload) {
            livereload.listen();
        }

        if(gutil.env.watch) {
            gulp.watch(['./build/server.js', './build/client.js'], function(event) {
                startApp(event);
            });
        }



        notify.info('App started!', 'PID: ' + serverProcess.pid);
    }, {
        aliases: ['a:s', 'start', 'appstart'],
        options: {
            '--watch': 'Watch for changes and hotreload',
            '--livereload': 'Enable livereload'
        }
    });

    // clean up process when gulp stops
    process.on('exit', function() {
        if (serverProcess) serverProcess.kill()
    })
};
