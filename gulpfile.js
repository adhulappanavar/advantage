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
  gulp.src('app.js')
    .pipe(replace('mongoose.connect(\'localhost:27017/aniladvantagedb\');', '//mongoose.connect(\'localhost:27017/aniladvantagedb\');'))
    .pipe(replace('//var cfg = require(\'./config\');', 'var cfg = require('\./config\');'))
    .pipe(replace('//mongoose.Promise = global.Promise;', 'mongoose.Promise = global.Promise;'))
    .pipe(replace('//mongoose.connect(cfg.mongo.uri);', 'mongoose.connect(cfg.mongo.uri);'))
    .pipe(gulp.dest(devFolder));
});


gulp.task('repl-localhost', function(){
  gulp.src(devFolder+'/**/*')
    .pipe(replace('http://localhost:3000', 'http://'+ 'ec2-35-154-8-81.ap-south-1.compute.amazonaws.com' + ':3000'))
    .pipe(gulp.dest(devFolder));
});

/******************************************** */
/*****************END *********************** */
/******************************************** */
gulp.task('build-ts', function () {
    return gulp.src(appDev + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        // .pipe(jsuglify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(appProd));
});
gulp.task('watch', function () {
    gulp.watch(appDev + '**/*.ts', ['build-ts']);
});

gulp.task('default', ['watch', 'build-ts']);