const express = require('express');
const bodyParser = require('body-parser');
const httpcode = require('./api/common/http_status_enum')
const all_routes = require('express-list-endpoints');


const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/health', (req, res) => {
  res.status(httpcode.HTTP_OK).send("OK");
});
// app.use('path',require('middleware javascript path'));

app.use('/orders', require('./api/order/index'));
app.use('/menu', require('./api/menu/index'));

// app.use('/users', require('./api/users/index')); // express 미들웨어
// app.use('/login', require('./api/login/index'));
// app.use('/register', require('./api/register/index'));

// app._router.stack.forEach(function(r){
//   if (r.route && r.route.path){
//     console.log(r.route.path)
//   }
// })
console.log(all_routes(app));

module.exports = app;
