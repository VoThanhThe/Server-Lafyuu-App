var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
require('./component/categories/CategoryModel');
require('./component/product/ProductModel');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dienTichRouter = require('./routes/TinhDienTich');
var chuviRouter = require('./routes/chuvi');
const productRouter = require('./routes/product');
const productCPanelRouter = require('./routes/cpanel/ProductCPanel');
const userCPanelRouter = require('./routes/cpanel/UserCPanel');
const productAPIRouter = require('./routes//api/ProductAPI');
const userAPIRouter = require('./routes/api/UserAPI');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//pnpxfmlosbkdmkhm
//session
app.use(session({
  secret: 'iloveyou',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));
//mongoose
mongoose.connect('mongodb://127.0.0.1:27017/CP17309', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));

//khai bao cac duong dan tĩnh
//http://localhost:3000/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', usersRouter);
app.use('/', dienTichRouter);
app.use('/chu-vi', chuviRouter);
//http://localhost:3000/cpanel/user
app.use('/cpanel/user', userCPanelRouter);
//http://localhost:3000/cpanel/product
app.use('/cpanel/product', productCPanelRouter);
//http://localhost:3000/api/user
app.use('/api/user', userAPIRouter);
//http://localhost:3000/api/product
app.use('/api/product', productAPIRouter);

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
