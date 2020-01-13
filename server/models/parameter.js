/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('parameter', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
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
    tableName: 'parameter'
  });
};
