const express = require('express');
const bodyParser = require('body-parser');
const httpcode = require('./api/common/http_status_enum')
const all_routes = require('express-list-endpoints');
const storeController=require('./api/store/store.controller');
const fs = require('fs');


const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/health', (req, res) => {
  res.status(httpcode.HTTP_OK).send("OK");
});

app.post('/order_confirm',storeController.createOrder);
// app.use('path',require('middleware javascript path'));

app.use('/store', require('./api/store/index'));
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



fs.writeFile ("current_api_entries.json", JSON.stringify(all_routes(app),null," "), function(err) {
    if (err) throw err;
    console.log('complete');
    }
);

module.exports = app;
