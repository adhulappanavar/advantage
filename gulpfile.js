var gulp = require('gulp');

var appDev = 'assets/app/';
var appProd = 'public/js/app/';

/* JS & TS */
var jsuglify = require('gulp-uglify');
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

// Other
var concat = require('gulp-concat');

var tsProject = typescript.createProject('tsconfig.json');


/******************************************** */
/**** Replace localhost with local machine IP */
/******************************************** */
var devFolder = './assets/',
    devbackupFolder = './assetsbackup/',
    fs = require('fs'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    debug = require('gulp-debug'),
    currentFolder = '.',
    os = require('os');;


function getServerIp() {


  var ifaces = os.networkInterfaces();
  var hostname = os.hostname();
  console.log(hostname);
  var values = Object.keys(ifaces).map(function(name) {
    return ifaces[name];
  });
  values = [].concat.apply([], values).filter(function(val){ 
    return val.family == 'IPv4' && val.internal == false; 
  });

  return values.length ? values[0].address : '0.0.0.0';
}


gulp.task('backuplocalhostservice', function() {
  gulp.src(devFolder + '/**/*.service.ts')
  .pipe(gulp.dest(devbackupFolder))
});

gulp.task('restorelocalhostservice', function() {
  gulp.src(devbackupFolder + '/**/*.service.ts')
  .pipe(gulp.dest(devFolder))
});


gulp.task('prodserver', function(){
  gulp.src(devbackupFolder+'/**/*')
    .pipe(replace('http://localhost:3000', 'http://'+ getServerIp() + ':3000'))
    .pipe(gulp.dest(devFolder));
});

/******************************************** */
/*****************END *********************** */
/******************************************** */
gulp.task('repl-local-mongodb', function(){
  gulp.src(currentFolder + '/app.js')
    .pipe(debug({title: 'adv-debug-src:'}))
    .pipe(replace('mongoose.connect(\'localhost:27017/aniladvantagedb\');', '//mongoose.connect(\'localhost:27017/aniladvantagedb\');'))
    .pipe(debug({title: 'adv-debug-comment-localhost:'}))
    .pipe(replace('//var cfg = require(\'./config\');', 'var cfg = require(\'./config\');'))
    .pipe(debug({title: 'adv-debug-uncomment-varcfg:'}))
    .pipe(replace('//mongoose.Promise = global.Promise;', 'mongoose.Promise = global.Promise;'))
        .pipe(debug({title: 'adv-debug-uncomment-mongoose-promise:'}))
    .pipe(replace('//mongoose.connect(cfg.mongo.uri);', 'mongoose.connect(cfg.mongo.uri);'))
        .pipe(debug({title: 'adv-debug-uncomment-config-uri:'}))
    .pipe(gulp.dest(currentFolder))
    .pipe(debug({title: 'adv-debug-dest ********:'}));
});


gulp.task('repl-localhost', function(){
  gulp.src(devFolder+'/**/*service.ts')
    .pipe(debug({title: 'adv-debug-src:'}))
    .pipe(replace('http://localhost:3000', 'http://'+ '52.2.54.7' + ':3000'))
    .pipe(debug({title: 'adv-debug-replace-*******:'}))
    .pipe(gulp.dest(devFolder))
    .pipe(debug({title: 'adv-debug-dest:'}));
});

/******************************************** */
/*****************END *********************** */
/******************************************** */
gulp.task('build-ts', function () {
    return gulp.src(appDev + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(appProd));
});
gulp.task('watch', function () {
    gulp.watch(appDev + '**/*.ts', ['build-ts']);
});

gulp.task('default', ['watch', 'build-ts']);


