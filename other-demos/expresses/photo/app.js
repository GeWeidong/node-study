var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var photoUplRouter = require('./routes/upload');

var photos = require('./routes/photo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.configure(function () {
// 	app.set('photos', __dirname + '/public/photos');
// })

// app.configure('production', function() {
// 	app.set('photos', '/mounted-volume/photos');
// })

app.set('view engine', 'ejs');
app.set('photos', __dirname + '/public/photos')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/upload', photoUplRouter);
app.get('/upload', photos.form);
app.post('/upload', photos.submit(app.get('photos')));

app.get('/photo/:id/download', photos.download(app.get('photos')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

