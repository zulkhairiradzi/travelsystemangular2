
const gutil  = require('gulp-util');
const argv   = require('minimist')(process.argv);
const gulpif = require('gulp-if');
const prompt = require('gulp-prompt');
const rsync  = require('gulp-rsync');
const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const browserSync = require('browser-sync');
const path = require('path');
const conf = require('./conf/gulp.conf');

// Load some files into the registry
const hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('build', gulp.series(gulp.parallel('other', 'webpack:dist')));
gulp.task('test', gulp.series('karma:single-run'));
gulp.task('test:auto', gulp.series('karma:auto-run'));
gulp.task('serve', gulp.series('webpack:watch', 'watch', 'browsersync'));
gulp.task('serve:dist', gulp.series('default', 'browsersync:dist'));
gulp.task('default', gulp.series('clean', 'build'));
gulp.task('watch', watch);
gulp.task('deploy', function() {
    rsyncPaths = ['dist', 'lang', 'lib', 'templates', './*.php', './style.css' ];
    rsyncConf = {
    progress: true,
    incremental: true,
    relative: true,
    emptyDirectories: true,
    recursive: true,
    clean: true,
    exclude: [],
    };
    if (argv.staging) {
    
        rsyncConf.hostname = '192.168.0.9'; // hostname
        rsyncConf.username = 'zulkhairi'; // ssh username
        rsyncConf.destination = '/home/zulkhairi/www'; // path where uploaded files go

        // Production
    } else if (argv.production) {
 
        rsyncConf.hostname = ''; // hostname
        rsyncConf.username = ''; // ssh username
        rsyncConf.destination = ''; // path where uploaded files go
          // Missing/Invalid Target  
    } else {
        throwError('deploy', gutil.colors.red('Missing or invalid target'));
    }
    return gulp.src(rsyncPaths)
        .pipe(gulpif(
            argv.production, 
            prompt.confirm({
                message: 'Heads Up! Are you SURE you want to push to PRODUCTION?',
                default: false
            })
        ))
        .pipe(rsync(rsyncConf));
 
    });

function reloadBrowserSync(cb) {
  browserSync.reload();
  cb();
}

function watch(done) {
  gulp.watch(conf.path.tmp('index.html'), reloadBrowserSync);
  done();
}

function throwError(taskName, msg) {
  throw new gutil.PluginError({
      plugin: taskName,
      message: msg
    });
}
