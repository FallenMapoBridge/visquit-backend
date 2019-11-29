const express = require('express');
const Sequelize = require('Sequelize');
const db = require('../../models/index');
const BaseResult = require('../common/baseResult');
const httpcode = require('../common/http_status_enum');
const identifyStore = require('../common/identifyStore');
const onEvent=require('../common/onEvent');


// function foo(par1,par2){

// }
function getOrders(req, res) {
  // const countReservation = db.reserve.reserveOverview.findAll({
  //   attributes: ['reserveId', 'state', 'beginDate'],
  //   where: {
  //     state: { [Sequelize.Op.or]: [0, 1, 2, 3] }, // 유저 취소와 내부 사정 취소를 제외한 모든 예약을 가져온다.
  //   },
  //   order: [['beginDate', 'DESC']]
  // })
  // const query = { store_id: req.query.store_id }
  const response = new BaseResult();

  const orderHistory = db.visquit.orders.findAll({
    where: {
      store_id: req.params.sid,
      serve_fl: { [Sequelize.Op.ne]: 0 }
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
        .all([orderHistory])
        .then(() => {
          res.status(httpcode.HTTP_OK)
            .json(response);
        }).catch((error) => {
          onEvent.onSQLQueryError(res);
          console.log(error);
        })
    }).catch((error) => {
      console.log(error);
      onEvent.onSQLQueryError(res);
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

module.exports.getOrders = getOrders;
module.exports.updateOrder = updateOrder;
module.exports.completeOrder = completeOrder;
module.exports.createOrder = createOrder;