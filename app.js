const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('path',require('middleware javascript path'));

app.use('/orders',require('./api/order/index'));
// app.use('/users', require('./api/users/index')); // express 미들웨어
// app.use('/login', require('./api/login/index'));
// app.use('/register', require('./api/register/index'));

module.exports = app;
