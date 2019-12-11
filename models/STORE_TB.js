/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('STORE_TB', {
    store_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      references: {
        model: 'USER_TB',
        key: 'user_id'
      }
    },
    store_device: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    store_location: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    store_tel: {
      type: DataTypes.STRING(13),
      allowNull: true
    }
  }, {
    tableName: 'STORE_TB',
    timestamps:false,
  });
};
