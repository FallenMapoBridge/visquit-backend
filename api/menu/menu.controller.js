const express = require('express');
const Sequelize = require('Sequelize');
const db = require('../../models/index');
const BaseResult = require('../common/baseResult');
const httpcode = require('../common/http_status_enum');
const identifyStore = require('../common/identifyStore');
const onEvent=require('../common/onEvent');

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
    onEvent.onSQLQueryError(res);
  });

  identifyStore(query.store_id)
    .then((isValid) => {
      if (!isValid) {
        onEvent.onInValidStoreId(res);
        return;
      }
      Promise.all([createMenu])
        .then(() => {
          res.status(httpcode.HTTP_OK).json(response);
        })
        .catch((err) => {
          console.log(err);
          onEvent.onSQLQueryError(res);
          return;
        })
    }).catch((err) => {
      console.log(err);
      onEvent.onSQLQueryError(res);
      return;
    })
}

function getMenus(req, res) {
  const response = new BaseResult();
  const query = { store_id: req.query.store_id };

  const menuInfo = db.visquit.menu.findAll({
    where: {
      store_id: query.store_id,
    },
  }).then((menuList) => {
    response.status = 'OK';
    response.results.push(menuList);
  });

  identifyStore(query.store_id)
    .then((isValid) => {
      if (!isValid) {
        onEvent.onInValidStoreId(res);
        return;
      }
      Promise.all([menuInfo])
        .then(() => {
          res.status(httpcode.HTTP_OK).json(response)
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
    });
}


function getMenuInfo(req, res) {
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
        onEvent.onInValidStoreId(res);
        return;
      }
      Promise.all([menuInfo])
        .then(() => {
          res.status(httpcode.HTTP_OK).json(response)
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
      onEvent.onSQLQueryError(res);
      console.log(err);
      return;

    });

  identifyStore(query.store_id)
    .then((isValid) => {
      if (!isValid) {
        onEvent.onInValidStoreId(res);
        return;
      }
      Promise.all([updateMenuInfo])
      .then(() => {
        res.status(httpcode.HTTP_OK).json(response);
       })
      .catch((err)=>{
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

function deleteMenu(req, res) {
  const response = new BaseResult();
  const query = { store_id: req.query.store_id };

  const deleteMenu=db.visquit.menu.destroy(
    {
      where:{
        menu_id:req.params.menu_id
      }
    }
  ).then(()=>{
    response.status='OK';
  })
  .catch((err)=>{
    onEvent.onSQLQueryError(res);
    console.log(err);
    return;

  });

  identifyStore(query.store_id)
  .then((isValid)=>{
    if(!isValid){
      onEvent.onInValidStoreId(res);
      return;
    }
    Promise.all([deleteMenu])
    .then(()=>{
      res.status(httpcode.HTTP_OK).json(response);
    })
    .catch((err)=>{
      onEvent.onSQLQueryError(res);
      console.log(err);
      return;
    })
  })

}

module.exports.createMenu = createMenu;
module.exports.getMenus=getMenus;
module.exports.getMenuInfo = getMenuInfo;
module.exports.updateMenu = updateMenu;
module.exports.deleteMenu = deleteMenu;
