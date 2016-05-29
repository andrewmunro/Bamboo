'use strict';
var gutil = require('gulp-util'),
    spawn = require('child_process').spawn,
    notify = require('./notifier'),
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

        if(gutil.env.watch) {
            gulp.watch(['./build/server.js', './build/client.js'], function() {
                startApp();
            });
        }

        notify.info('App started!', 'PID: ' + serverProcess.pid);
    }, {
        aliases: ['a:s', 'start', 'appstart'],
        options: {
            '--watch': 'Watch for changes and hotreload'
        }
    });

    // clean up process when gulp stops
    process.on('exit', function() {
        if (serverProcess) serverProcess.kill()
    })
};
