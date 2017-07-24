var gulp = require('gulp');
var exec = require('child_process').exec;
var browserSync = require('browser-sync').create();

gulp.task('compile', function (done) {
    exec('tsc -w', function (err, stdOut, stdErr) {
        console.log(stdOut);
        if (err) {
            done(err);
        } else {
            done();
        }
    });
});

gulp.task('polymerServe', function (done) {
    exec('polymer serve -p 568 -v', function (err, stdOut, stdErr) {
        console.log(stdOut);
        if (err) {
            done(err);
        } else {
            done();
        }
    });
});

gulp.task('browser-sync', function () {
    browserSync.init({
        proxy: "localhost:568",
        startPath: '/components/titanium-date-input/demo/index.html'
    });
});

gulp.task('watch', ['browser-sync'], function () {

    var directoriesToWatch = ["src/**/*.js", "src/**/*.html", "demo/**/*.html", "demo/**/*.js", "*.js", "*.html", "images/*.*"]

    directoriesToWatch.forEach(function (directory) {
        console.log('Listening for changes at: ' + directory);
        var jsWatcher = gulp.watch(directory, {
            interval: 1000
        }).on('change', browserSync.reload);

        jsWatcher.on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type);
        });
    });

});

gulp.task('default', ['compile', 'polymerServe', 'watch']);