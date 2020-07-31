const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Models = require('../database/models');
const api = require('./api');
const UserRouter = require('./api/user');
require('dotenv').config();
//const cronSendMail = require('./helper/cornemail');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = 8000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.messag;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    e;
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
api(app);
app.listen(PORT, () => {
    console.log('server is runing....' + PORT);
});
