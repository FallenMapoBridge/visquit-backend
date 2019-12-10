/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MENU_TB', {
    menu_id: {
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
    menu_name: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    menu_price: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    }
  }, {
    timestamps:false,
    tableName: 'MENU_TB'
  });
};
