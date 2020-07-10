const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Models = require('../database/models');
const api = require('./api');
const UserRouter = require('./api/user');
const app = express();
const PORT = 8000;
require('dotenv').config();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });
api(app);
//app.use(UserRouter);
app.get('/', (req, res, next) => {
    return res.send('<h1>Nguyen VAn Dung</h1>');
});
app.listen(PORT, () => {
    console.log('server is runing....' + PORT);
});
