const express = require('express');
const Sequelize = require('Sequelize');
const db = require('../../models/index');
const BaseResult = require('../common/baseResult');
const httpcode = require('../common/http_status_enum');
const identifyStore = require('../common/identifyStore');
const onInValidStore = require('../common/onInValidStore');
const onSQLError = require('../common/onSQLQuerry');

function createMenu(req, res) {
  const response = new BaseResult();
  const query = { store_id: req.query.store_id };

  // const menuBody

  const createMenu = db.visquit.menu.create(
    {
      // menu_id:
      store_id: query.store_id,
      menu_name: req.body.menu_name,
      menu_price: req.body.menu_price,
    }
  ).then((insertedRow) => {
    response.results = insertedRow;
    response.status = 'OK';
  }).catch((err) => {
    console.log(err);
    onSQLError(res);
  });

  identifyStore(query.store_id)
    .then((isValid) => {
      if (!isValid) {
        onInValidStore(res);
        return;
      }
      Promise.all([createMenu])
        .then(() => {
          res.status(httpcode.HTTP_OK).json(response);
        })
        .catch((err) => {
          console.log(err);
          onSQLError(err);
        })
    }).catch((err) => {
      console.log(err);
      onSQLError(err);
    })
}

function getMenu(req, res) {
  const response = new BaseResult();
  const query = { store_id: req.query.store_id };

  const menuInfo = db.visquit.menu.findOne({
    where: {
      store_id: query.store_id,
      menu_id: req.params.menu_id,
    },
  }).then((menuInfo) => {
    response.status = 'OK';
    response.results.push(menuInfo);
  });

  identifyStore(query.store_id)
    .then((isValid) => {
      if (!isValid) {
        onInValidStore(res);
        return;
      }
      Promise.all([menuInfo])
        .then(() => {
          res.status(httpcode.HTTP_OK).json(response)
        })
        .catch((err) => {
          onSQLError(res);
          console.log(err);
        })
    })
    .catch((err) => {
      onSQLError(res);
      console.log(err);
    });
}

function updateMenu(req, res) {
  const response = new BaseResult();
  const query = { store_id: req.query.store_id };

  const updateUnit=req.body;

  const updateMenuInfo = db.visquit.menu
    .update(updateUnit,{where : {
      menu_id:req.params.menu_id
    }},{
      attributes: {exclude: ['menu_id','store_id']}
    })
    .then((updatedMenu) => {
      response.status='OK';
      response.results.push(updateMenu);
     })
    .catch((err) => {
      onSQLError(res);
      console.log(err);
    });

  identifyStore(query.store_id)
    .then((isValid) => {
      if (!isValid) {
        onInValidStore(res);
        return;
      }
      Promise.all([updateMenuInfo])
      .then(() => {
        res.status(httpcode.HTTP_OK).json(response);
       })
      .catch((err)=>{
        onSQLError(res);
        console.log(err);
      })
    })
    .catch((err) => {
      onSQLError(res);
      console.log(err);
    })
}

function deleteMenu(req, res) {

}

module.exports.createMenu = createMenu;
module.exports.getMenu = getMenu;
module.exports.updateMenu = updateMenu;
module.exports.deleteMenu = deleteMenu;
