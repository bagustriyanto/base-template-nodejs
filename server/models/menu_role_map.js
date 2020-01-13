/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const menuMap = sequelize.define('menu_role_map', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    menu_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'menu',
        key: 'id'
      }
    },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'role',
        key: 'id'
      }
    }
  }, {
    tableName: 'menu_role_map',
    timestamps: false
  });

  menuMap.associate = (models) => {
    menuMap.belongsTo(models.role, {
      foreignKey: 'role_id'
    });
    menuMap.hasOne(models.menu, {
      foreignKey: 'id',
      sourceKey: 'menu_id'
    })
  }
  return menuMap;
};
