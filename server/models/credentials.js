/* jshint indent: 2 */
'use strict';

module.exports = function (sequelize, DataTypes) {
  const credentials = sequelize.define('credentials', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NULL'
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
    },
    verification_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    public_user: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'credentials',
    timestamps: false
  });

  credentials.associate = (models) => {
    credentials.hasOne(models.user, {
      foreignKey: 'credential_id'
    })

    credentials.belongsTo(models.role_map, {
      foreignKey: 'id'
    })
  };

  return credentials;
};
