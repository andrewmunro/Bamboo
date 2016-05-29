'use strict';

var path = require('path'),
    gutil = require('gulp-util'),
    notifier;

try {
    notifier = require('node-notifier');
} catch(e) {
    notifier = {
        notify: function() {
            gutil.log(gutil.colors.yellow('Skipping notify as module is not installed. This can be ignored.'));
        }
    }
}


module.exports = {
    info: function(title, message) {
        notifier.notify({
            'title': title,
            'message': message,
            'icon': path.join(__dirname, 'icons', 'smile.png')
        });
    },
    error: function(title, message) {
        notifier.notify({
            'title': title,
            'message': message,
            'sound': true,
            'icon': path.join(__dirname, 'icons', 'frown.png')
        });
    }
};
