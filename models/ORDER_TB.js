/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ORDER_TB', {
    order_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    store_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      references: {
        model: 'STORE_TB',
        key: 'store_id'
      }
    },
    menu_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      references: {
        model: 'MENU_TB',
        key: 'menu_id'
      }
    },
    order_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    order_num: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    order_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    order_quantity: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    order_price: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    serve_fl: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    }
  }, {
    tableName: 'ORDER_TB',
    timestamps:false,
  });
};
