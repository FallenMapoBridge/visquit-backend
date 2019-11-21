/* eslint-disable no-unused-vars */
import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'developement';

// const config =x
const config = require(`${__dirname}/../config/sequelize.json`)[env];
const sequelize = new Sequelize('VISQUIT', config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const db = {};

db.visquit = {};

/*_____________VISQUIT_____________*/

db.visquit.menu = require('./MENU_TB')(sequelize, Sequelize);
db.visquit.orderitem = require('./ORDERITEM_TB_TB')(sequelize, Sequelize);
db.visquit.orders = require('./ORDERS_TB')(sequelize, Sequelize);
db.visquit.store = require('./STORE_TB')(sequelize, Sequelize);
db.visquit.user = require('./USER_TB')(sequelize, Sequelize);

/*_____________TABLE RELATIONSHIPS DEFINE_____________*/

  /*_____________USER_TB_____________*/

db.visquit.user.hasMany(db.visquit.store, {
  foreignKey: 'user_id'
});

  /*_____________STORE_TB_____________*/

db.visquit.store.belongsTo(db.visquit.user, {
  foreignKey: 'user_id'
});
db.visquit.store.hasMany(db.visquit.menu, {
  foreignKey: 'store_id'
});
db.visquit.store.hasMany(db.visquit.orders, {
  foreignKey: 'store_id'
})

  /*_____________MENU_TB_____________*/

db.visquit.menu.belongsTo(db.visquit.store, {
  foreignKey: 'store_id'
});
db.visuqit.menu.hasMany(db.visquit.orderitem, {
  foreignKey: 'menu_id'
});

  /*_____________ORDERS_TB_____________*/

db.visuqit.orders.belongsTo(db.visquit.store, {
  foreignKey: 'store_id'
});
db.visuqit.orders.hasMany(db.visquit.orderitem, {
  foreignKey: 'order_id'
});

  /*_____________ORDERITEM_TB_____________*/

db.visuqit.orderitem.belongsTo(db.visquit.menu, {
  foreignKey: 'menu_id'
});
db.visuqit.orderitem.belongsTo(db.visquit.orders, {
  foreignKey: 'order_id'
});




