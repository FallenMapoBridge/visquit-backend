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
    store_location: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    store_tel: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    nugu_id: {
      type: DataTypes.STRING(32),
      allowNull: true
    }
  }, {
    timestamps:false,
    tableName: 'STORE_TB'
  });
};
