/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	const blog = sequelize.define(
		"blog",
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false
			},
			content: {
				type: DataTypes.TEXT,
				allowNull: false
			},
			status: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			credential_id: {
				type: DataTypes.BIGINT,
				allowNull: true,
				references: {
					model: "credentials",
					key: "id"
				}
			},
			created_at: {
				type: DataTypes.DATEONLY,
				allowNull: true
			},
			modified_at: {
				type: DataTypes.DATEONLY,
				allowNull: true
			},
			tags: {
				type: DataTypes.TEXT,
				allowNull: true
			}
		},
		{
			tableName: "blog",
			timestamps: false
		}
	)

	blog.associate = models => {
		blog.hasOne(models.credentials, {
			foreignKey: "credential_id"
		})
	}

	return blog
}
