var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var ridesRouter = require('./routes/rides');
var usersRouter = require('./routes/users');
var cors = require('cors');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const server = require('http').Server(app);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/rides', ridesRouter);
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
res.status(err.status || 500);
  res.render('error');
});
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Credentials',true);
  res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers','Content-Type');
  next();
});

/*
server.listen((process.env.PORT || 3200), function(){
  console.log('listening on *:3200');
});
*/
module.exports = app;
