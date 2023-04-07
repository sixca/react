// ctrl + h 해서 var -> let 모두바꾸기 함.

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const session = require("express-session"); //추가
const MYSQLSTORE = require("express-mysql-session")(session); //추가
const DBInfo = require("./routes/commonDB"); //추가  :: 세션이 저장될 디비정보를 줘야한다

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let boardRouter = require('./routes/board');// 추가
let memberRouter = require('./routes/member');// 추가

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//미들웨어 - 모든 웹상의 요청이 거쳐간다.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let sessionStore=new MYSQLSTORE(DBInfo.DBInfo);
app.use( session({
  key: "session_key",
  secret: "asfafwhwlgnwawfeagwrhwkrngwkrzzz",  //암호화 키
  store: sessionStore,
  resave: false,
  saveUninitialized: false
})); // 추가
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/board', boardRouter); // 추가
app.use('/member', memberRouter); // 추가

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
