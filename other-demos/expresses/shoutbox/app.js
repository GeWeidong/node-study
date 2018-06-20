var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var register = require('./routes/register');
var login = require('./routes/login');

var user = require('./lib/middleware/user');
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	// 使用express-session必须要用的三个参数
	secret: 'file',
	resave: true,
	saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(user);

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/register', register.form);
// app.post('/register', register.submit);
app.get('/logout', login.logout);

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




// 学习到217页