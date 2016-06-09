'use strict';
var gutil = require('gulp-util'),
    spawn = require('child_process').spawn,
    notify = require('./notifier'),
    livereload = require('gulp-livereload'),
    serverProcess;

module.exports = function(gulp) {
    function startApp() {
        if (serverProcess) serverProcess.kill();
        gutil.log(gutil.colors.green('Starting app...'));
        process.env.sourceMap = gutil.env.sourceMap;
        serverProcess = spawn('node', ['build/server'], {stdio: 'inherit', env: process.env});
    }

    gulp.task('app:start', 'Start the app', ['build:client', 'build:server'], function() {
        startApp();

        if(gutil.env.livereload) {
            livereload.listen();
        }

        if(gutil.env.watch) {
            gulp.watch(['./build/server.js', './build/client.js'], function(event) {
                startApp();
                
                if(gutil.env.livereload) {
                    setTimeout(function() {
                        livereload.changed(event.path);
                    }, 2000);
                }
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
