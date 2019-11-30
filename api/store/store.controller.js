const express = require('express');
const Sequelize = require('Sequelize');
const db = require('../../models/index');
const BaseResult = require('../common/baseResult');
const httpcode = require('../common/http_status_enum');
const identifyStore = require('../common/identifyStore');
const onEvent=require('../common/onEvent');


// function foo(par1,par2){

// }
function getCurrentOrder(req, res) { // order history는 store 정보에서 
  const response = new BaseResult();

  const currentOrder = db.visquit.orders.findAll({
    where: {
      store_id: req.params.sid,
      serve_fl: { [Sequelize.Op.eq]: 0 }
    },
    order: [['order_date', 'DESC'], ['order_time', 'DESC']]
  }).then((orderchunk) => {
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
        }).catch((error) => {
          onEvent.onSQLQueryError(res);
          console.log(error);
          return;
        })
    }).catch((error) => {
      console.log(error);
      onEvent.onSQLQueryError(res);
      return;
    })
}

function getOrderHistory(req, res) { // order history는 store 정보에서 
  const response = new BaseResult();

  const currentOrder = db.visquit.orders.findAll({
    where: {
      store_id: req.params.sid,
      serve_fl: { [Sequelize.Op.eq]: 1 }
    },
    order: [['order_date', 'DESC'], ['order_time', 'DESC']]
  }).then((orderHistoryChunk) => {
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
        }).catch((error) => {
          onEvent.onSQLQueryError(res);
          console.log(error);
          return;
        })
    }).catch((error) => {
      console.log(error);
      onEvent.onSQLQueryError(res);
      return;
    })
}


function updateOrder(req, res) {
  // const response=new baseResult();

  // const updateOrder=db.visquit.order
}

function completeOrder(req, res) {

}

function createOrder(req, res) {

}

module.exports.getCurrentOrder = getCurrentOrder;
module.exports.getOrderHistory=getOrderHistory;
module.exports.updateOrder = updateOrder;
module.exports.completeOrder = completeOrder;
module.exports.createOrder = createOrder;