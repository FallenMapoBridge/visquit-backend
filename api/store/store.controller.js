const express = require('express');
const Sequelize = require('sequelize');
const db = require('../../models/index');
const BaseResult = require('../common/baseResult');
const httpcode = require('../common/http_status_enum');
const identifyStore = require('../common/identifyStore');
const identifyStoreByNuguId = require('../common/identifyStoreByNuguId');
const onEvent = require('../common/onEvent');
const moment = require('moment');
const moment_timezone = require('moment-timezone')
moment.tz.setDefault("Asia/Seoul");
const fs = require('fs');


// function foo(par1,par2){

// }
function getCurrentOrder(req, res) { // order history는 store 정보에서
  const response = new BaseResult();

  const currentOrder = db.visquit.order.findAll({
    where: {
      store_id: req.params.sid,
      serve_fl: { [Sequelize.Op.eq]: 0 }
    },
    order: [['order_date', 'DESC'], ['order_time', 'DESC']]
  })
    .then((orderchunk) => {
      response.status = 'OK';
      response.results.push(orderchunk);
    });


  /* Above promise will be excuted at below code section */
  /* *************************************************** */
  identifyStore(req.params.sid)
    .then((isValid) => {
      if (!isValid) {
        onEvent.onInValidStoreId(res);
        return;
      }
      Promise
        .all([currentOrder])
        .then(() => {
          res.status(httpcode.HTTP_OK)
            .json(response);
        })
        .catch((error) => {
          onEvent.onSQLQueryError(res);
          console.log(error);
          return;
        })
    })
    .catch((error) => {
      console.log(error);
      onEvent.onSQLQueryError(res);
      return;
    })
}

function getOrderHistory(req, res) { // order history는 store 정보에서
  const response = new BaseResult();

  const currentOrder = db.visquit.order.findAll({
    where: {
      store_id: req.params.sid,
      serve_fl: { [Sequelize.Op.eq]: 1 }
    },
    order: [['order_date', 'DESC'], ['order_time', 'DESC']]
  })
    .then((orderHistoryChunk) => {
      response.status = 'OK';
      response.results.push(orderHistoryChunk);
    });


  /* Above promise will be excuted at below code section */
  /* *************************************************** */
  identifyStore(req.params.sid)
    .then((isValid) => {
      if (!isValid) {
        onEvent.onInValidStoreId(res);
        return;
      }
      Promise
        .all([currentOrder])
        .then(() => {
          res.status(httpcode.HTTP_OK)
            .json(response);
        })
        .catch((error) => {
          onEvent.onSQLQueryError(res);
          console.log(error);
          return;
        })
    })
    .catch((error) => {
      console.log(error);
      onEvent.onSQLQueryError(res);
      return;
    })
}


function updateOrder(req, res) {
  const response = new BaseResult();


  const updateOrder = db.visquit.order
    .update({ serve_fl: true }, {
      where: {
        order_id: req.params.oid
      }
    }, {
      attributes: { exclude: ['order_id', 'store_id'] }
    })
    .then((updatedOrder) => {
      console.log("UPDATE RES\n");
      response.status = 'OK';
      response.results.push(updatedOrder);
    })
    .catch((err) => {
      onEvent.onSQLQueryError(res);
      console.log(err);
      return;

    });

  identifyStore(req.params.sid)
    .then((isValid) => {
      if (!isValid) {
        onEvent.onInValidStoreId(res);
        return;
      }
      console.log("VERIFY OK\n")
      Promise.all([updateOrder])
        .then(() => {
          res.status(httpcode.HTTP_OK).json(response);

        })
        .catch((err) => {
          onEvent.onSQLQueryError(res);
          console.log(err);
          return;

        })
    })
    .catch((err) => {
      onEvent.onSQLQueryError(res);
      console.log(err);
      return;

    })

}



function createOrder(req, res) {
  fs.writeFile("createorder.json", JSON.stringify(req.body, null, " "), function (err) {
    if (err) throw err;
    console.log('complete');
  }
  );

  db.visquit.menu.findOne({
    where: {
      menu_name: req.body.action.parameters.menu.value.replace(/ /g,'')
,
    }
  })
    .then((menu_info) => {
      db.visquit.order.create({
        store_id: 1,
        menu_id: menu_info.menu_id,
        order_date: moment().format('YYYY-MM-DD'),
        order_time: moment().format('HH:mm:ss'),
        order_quantity: req.body.action.parameters.count.value,
        order_price:
          menu_info.menu_price * req.body.action.parameters.count.value,
        serve_fl: false,
      })
        .then((createdOrder) => {
          const response = {
            "version": "2.0",
            "resultCode": "OK",
            "output": {
              "order_id": createdOrder.order_id
            },
          }
          res.status(httpcode.HTTP_OK).json(response);

        })
    })
  /*
    identifyStoreByNuguId(req.params.sid) // 수정해야함.
      .then((isValid) => {
        if (!isValid) {
          onEvent.onInValidStoreId(res);
          return;
        }
        Promise
          .all([currentOrder])
          .then(() => {
            res.status(httpcode.HTTP_OK)
              .json(response);
          })
          .catch((error) => {
            onEvent.onSQLQueryError(res);
            console.log(error);
            return;
          })
      })
      .catch((error) => {
        console.log(error);
        onEvent.onSQLQueryError(res);
        return;
      })
      */

}

function registerStore(req, res) {
  const response = new BaseResult();

  db.visquit.store.create({
    user_id: req.query.user_id,
    store_location: req.body.store_location,
    store_tel: req.body.store_tel,
    nugu_id: req.body.nugu_id,
  }).then((registeredStore) => {
    response.status = 'OK';
    response.results.push(registeredStore);
    res.status(httpcode.HTTP_OK).json(response);
  }).catch((error) => {
    console.log(error);
    onEvent.onSQLQueryError(res);
    return
  })
}

function registerUser(req, res) {
  const response = new BaseResult();

  db.visquit.user.create({
    user_name: req.body.user_name,
  }).then((registerdUser) => {
    response.status = 'OK';
    response.results.push(registerdUser);
    res.status(httpcode.HTTP_OK).json(response);
  }).catch((error) => {
    console.log(error);
    onEvent.onSQLQueryError(res);
    return
  });
}

function getOrderInfo(req, res) {
  
  db.visquit.order.findOne({
    where: {
      order_id: req.body.action.parameters.order.value,
    }
  }).then((orderInfo) => {
    db.visquit.menu.findOne({
      where: {
        menu_id: orderInfo.menu_id,
      }
    }).then((menuInfo) => { 
      const response = {
        "version": "2.0",
        "resultCode": "OK",
        "output": {
          "order_id": req.body.action.parameters.order.value.order_id,
          "menu_name":menuInfo.menu_name,
          "order_quantity":orderInfo.order_quantity,
          "order_price":orderInfo.order_quantity*menuInfo.menu_price,
        },
      }
      res.status(httpcode.HTTP_OK).json(response);
    })

  })

}

module.exports.getCurrentOrder = getCurrentOrder;
module.exports.getOrderHistory = getOrderHistory;
module.exports.getOrderInfo = getOrderInfo;
module.exports.updateOrder = updateOrder;
module.exports.createOrder = createOrder;
module.exports.registerStore = registerStore
module.exports.registerUser = registerUser