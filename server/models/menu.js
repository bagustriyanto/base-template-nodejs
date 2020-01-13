/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	const menu = sequelize.define(
		"menu",
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			title: {
				type: DataTypes.STRING,
				allowNull: true
			},
			url: {
				type: DataTypes.STRING,
				allowNull: true
			},
			parent: {
				type: DataTypes.BIGINT,
				allowNull: true,
				references: {
					model: "menu",
					key: "id"
				}
			},
			status: {
				type: DataTypes.BOOLEAN,
				allowNull: true
			},
			icon: {
				type: DataTypes.STRING,
				allowNull: true
			},
			child: {
				type: DataTypes.VIRTUAL
			},
			parentDetail: {
				type: DataTypes.VIRTUAL
			}
		},
		{
			tableName: "menu",
			timestamps: false
		}
	)

	menu.associate = models => {
		// menu.hasMany(models.menu, {
		//   as: 'parentMenu',
		//   foreignKey: 'parent',
		//   targetKey: 'id'
		// })
		// menu.belongsTo(models.menu, {
		//   as: 'childMenu',
		//   foreignKey: 'id',
		//   targetKey: 'id'
		// })

		menu.belongsTo(models.menu_role_map, {
			foreignKey: "id",
			sourceKey: "id"
		})
	}

	return menu
}
