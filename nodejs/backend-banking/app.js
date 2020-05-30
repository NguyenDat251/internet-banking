const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const employeeApi = require('./routes/employee');
const adminApi = require('./routes/admin');
const partnerApi = require('./routes/partner');
const customerApi = require('./routes/customer');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/employee', employeeApi);
app.use('/api/admin', adminApi);
app.use('/api/partner', partnerApi);
app.use('/api/customer', customerApi);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(404).json({ "err": "invalid resource url" });
});

module.exports = app;
