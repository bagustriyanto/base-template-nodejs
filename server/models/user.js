/* jshint indent: 2 */
'use strict';

module.exports = function (sequelize, DataTypes) {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    credential_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'credentials',
        key: 'id'
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_host: {
      type: DataTypes.STRING,
      allowNull: true
    },
    modified_by: {
      type: DataTypes.STRING,
      allowNull: true
    },
    modified_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    modified_host: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'user',
    timestamps: false
  });

  user.associate = (models) => {
    user.belongsTo(models.credentials, {
      foreignKey: 'credential_id'
    })
  };

  return user;
};
