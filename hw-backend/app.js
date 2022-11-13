var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var workRouter = require('./routes/work');
// var picRouter=require('./routes/pic');
// var videoRouter=require('./routes/video');
// var ficRouter=require('./routes/fic');
// var msgRouter=require('./routes/msg');
// var notesRouter=require('./routes/notes');
const api=require('./routes/api')

var app = express();
 
//mongoose

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//链接数据库
mongoose.connect(`mongodb://sherlocktenyears.com:27017/hw`);
// 让 mongoose 使用全局 Promise 库
mongoose.Promise = global.Promise;
// 取得默认连接
const db = mongoose.connection;

// 将连接与错误事件绑定（以获得连接错误的提示）
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));
db.on('open',function(){
  console.log("db connection success")
});
db.on('disconnect',function(){
  console.log("db disconeectioned")
})

// CORS config here
app.all('*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/work',workRouter);
// app.use('/fic',ficRouter);
// app.use('/msg',msgRouter);
// app.use('/pic',picRouter);
// app.use('/video',videoRouter);
// app.use('/notes',notesRouter);
app.use('/api/v1',api);



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
