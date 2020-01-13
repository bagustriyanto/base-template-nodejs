/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const roleMap = sequelize.define('role_map', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'role',
        key: 'id'
      }
    },
    credential_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'credentials',
        key: 'id'
      }
    }
  }, {
    tableName: 'role_map',
    timestamps: false
  });

  roleMap.associate = (models) => {
    roleMap.hasOne(models.role, {
      foreignKey: 'id',
      sourceKey: 'role_id'
    });
    roleMap.hasOne(models.credentials, {
      foreignKey: 'id',
      sourceKey: 'credential_id'
    });
    roleMap.hasMany(models.menu_role_map, {
      foreignKey: 'role_id',
      sourceKey: 'role_id'
    });
  }
  return roleMap;
};
