/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ORDERITEM_TB', {
    item_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      references: {
        model: 'ORDERS_TB',
        key: 'order_id'
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
    item_quantity: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    item_price: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    }
  }, {
    timestamps:false,
    tableName: 'ORDERITEM_TB'
  });
};
