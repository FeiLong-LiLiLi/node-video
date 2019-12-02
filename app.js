var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var dbConfig = require('./config/mysql');



//引入路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var categoriesRouter = require('./routes/api/categories');
var tagsRouter = require('./routes/api/tags')

var videoInfoRouter = require('./routes/api/video/videoInfo');
var addVideoRouter = require('./routes/api/video/addVideo');
var delVideoRouter = require('./routes/api/video/delVideo');
var updateVideoRouter = require('./routes/api/video/updateVideo');
var queryVideoRouter = require('./routes/api/video/queryVideo');

var adminInfoRouter = require('./routes/api/admin/adminInfo');
var addAdminRouter = require('./routes/api/admin/addAdmin');
var delAdminRouter = require('./routes/api/admin/delAdimn');
var updateAdminRouter = require('./routes/api/admin/updateAdmin');
var queryAdminRouter = require('./routes/api/admin/queryAdmin');

var getUsersRouter = require('./routes/api/user/getUsersInfo');
var delUserRouter = require('./routes/api/user/delUser');
var addUserRouter = require('./routes/api/user/addUser');
var updateUserRouter = require('./routes/api/user/updateUserInfo');
var queryUserRouter = require('./routes/api/user/queryUser');



var app = express();
// var Router = express.Router();


// //数据库连接
// var pool = mysql.createConnection(dbConfig);
// pool.connect();


//请求
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


// view engine setups
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());//json解析
app.use(bodyParser.urlencoded({extended: false}));


//使用
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/video/videoInfo', videoInfoRouter);
app.use('/api/video/addVideo', addVideoRouter);
app.use('/api/video/delVideo', delVideoRouter);
app.use('/api/video/updateVideo', updateVideoRouter);
app.use('/api/video/queryVideo', queryVideoRouter);

app.use('/api/admin/adminInfo', adminInfoRouter);
app.use('/api/admin/addAdmin', addAdminRouter);
app.use('/api/admin/delAdmin', delAdminRouter);
app.use('/api/admin/updateAdmin', updateAdminRouter);
app.use('/api/admin/queryAdmin', queryAdminRouter);

app.use('/api/user/usersInfo', getUsersRouter);
app.use('/api/user/delUser', delUserRouter);
app.use('/api/user/addUser', addUserRouter)
app.use('/api/user/updateUserInfo', updateUserRouter)
app.use('/api/user/queryUser', queryUserRouter);

app.use('/api/categories', categoriesRouter)
app.use('/api/tags', tagsRouter)

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
