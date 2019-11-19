/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ORDERS_TB', {
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
    order_price: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    }
  }, {
    timestamps:false,
    tableName: 'ORDERS_TB'
  });
};
