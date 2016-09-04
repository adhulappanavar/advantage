var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//var cfg = require('./config');



var appRoutes = require('./routes/app');
var peopleRoutes = require('./routes/peoples');
var patientsRoutes = require('./routes/patients');
var patientsRoutes = require('./routes/patients');
var actualpatientsRoutes = require('./routes/Actualpatients');
var medicinesRoutes = require('./routes/medicines');
var actualmedicinesRoutes = require('./routes/actualmedicines');
var med2patientsRoutes = require('./routes/med2patients');
var userRoutes = require('./routes/users');
var studentsRoutes = require('./routes/students');
var seedsRoutes = require('./routes/seeds');

var app = express();


//console.log (cfg.mongo.uri, cfg.mongo.db);
//mongoose.Promise = global.Promise;
//mongoose.connect(cfg.mongo.uri);


//var opts = {"server" : "localhost", "port" :"27017", "db" : "aniladvantagedb//"};
//  mongoose.connect(`mongodb://${opts.server}:${opts.port}/${opts.db}`);

//var opts = {"server" : "localhost", "port" :"27017", "db" : "aniladvantagedb//"};
//core.connect = function connect(opts) {
//  mongoose.Promise = global.Promise;
//  mongoose.connect(`mongodb://${opts.server}:${opts.port}/${opts.db}`);
//  return mongoose.connection;
//};


mongoose.connect('localhost:27017/aniladvantagedb');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
    next();
});

app.use('/people', peopleRoutes);
app.use('/patients', patientsRoutes);
app.use('/actualpatients', actualpatientsRoutes);
app.use('/actualmedicines', actualmedicinesRoutes);
app.use('/medicines', medicinesRoutes);
app.use('/med2patients', med2patientsRoutes);
app.use('/user', userRoutes);
app.use('/students', studentsRoutes);
app.use('/seeds', seedsRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
