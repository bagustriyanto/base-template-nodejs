/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const role = sequelize.define('role', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'role',
    timestamps: false
  });

  role.associate = (models) => {
    role.belongsTo(models.menu_role_map, {
      foreignKey: 'id',
      sourceKey: 'role_id'
    });
  }

  return role;
};
