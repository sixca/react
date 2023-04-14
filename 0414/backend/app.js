// ctrl + h 해서 var -> let 모두바꾸기 함.

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const session = require("express-session"); //추가
const MYSQLSTORE = require("express-mysql-session")(session); //추가
const DBInfo = require("./routes/commonDB"); //추가  :: 세션이 저장될 디비정보를 줘야한다
const score = require("./routes/commonDB2"); //추가  :: 세션이 저장될 디비정보를 줘야한다
const cors = require('cors'); // 웹 브라우저에서 실행되는 JavaScript 코드가 다른 도메인(또는 포트, 프로토콜)에 있는 API를 요청할 때 보안상의 이유로 브라우저에서 차단하는 것을 우회하는 방법

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let boardRouter = require('./routes/board');// 추가
let memberRouter = require('./routes/member');// 추가
let heroRouter = require('./routes/hero');// 추가
let scoreRouter = require('./routes/score');// 추가
let RestBoardRouter = require('./routes/rest_board');// 추가

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

let sessionStore2=new MYSQLSTORE(score.score);
app.use( session({
  key: "session_key",
  secret: "asfafwhwlgnwawfeagwrhwkrngwkrzzz",  //암호화 키
  store: sessionStore,
  resave: false,
  saveUninitialized: false
})); // 추가

app.use(cors()); // 보다 정밀하게 받는 방법 찾아서 작성해야 한다
//현재는 아무데서나 요청오면 다 받음

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/board', boardRouter); // 추가
app.use('/member', memberRouter); // 추가
app.use('/hero', heroRouter); // 추가
app.use('/score', scoreRouter); // 추가
app.use('/rest_board', RestBoardRouter); // 추가

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
