const menu = require("../../models").menu
const models = require("../../models/index")
const Op = require("../../models").Sequelize.Op
const i18n = require("i18n")

const index = 0
const limit = 10

module.exports = {
	create(req) {
		return menu
			.create({
				title: req.body.title,
				url: req.body.url,
				status: req.body.status,
				parent: req.body.parent,
				icon: req.body.icon
			})
			.then(result => {
				return result
			})
	},
	update(req) {
		return menu
			.findByPk(req.params.id)
			.then(result => {
				if (result === null) throw new Error(i18n.__("ERROR-9998"))
				else return result
			})
			.then(result => {
				return models.sequelize.transaction(t => {
					return menu
						.update(
							{
								title: req.body.title,
								url: req.body.url,
								status: req.body.status,
								parent: req.body.parent,
								icon: req.body.icon
							},
							{ where: { id: req.params.id }, transaction: t }
						)
						.then(menuResult => {
							return menuResult
						})
				})
			})
			.catch(err => {
				throw err
			})
	},
	delete(req) {
		return menu
			.findOne({ where: { id: req.params.id } })
			.then(result => {
				if (result === null) throw new Error(i18n.__("ERROR-9998"))
				else return result
			})
			.then(result => {
				return menu.destroy({ where: { id: req.params.id } }).then(() => {
					return true
				})
			})
	},
	findAll(req) {
		let whereClause = {}
		if (req.body.title !== undefined) {
			let params = {
				title: { [Op.iLike]: `%${req.body.title}%` }
			}
			whereClause.where = params
		}

		const menuList = menu
			.findAll({
				whereClause,
				limit: req.query.limit === undefined ? limit : req.query.limit,
				offset: req.query.index === undefined ? index : (req.query.index - 1) * limit
			})
			.then(result => {
				return Promise.all(
					result.map(item => {
						return menu.findByPk(item.parent).then(parent => {
							if (parent !== null) {
								item.parentDetail = parent
							}

							return item
						})
					})
				)
			})

		const totalMenuList = menu.count().then(result => {
			return result
		})

		return Promise.all([menuList, totalMenuList]).then(result => {
			return {
				items: result[0],
				total: result[1],
				limit: req.query.limit === undefined ? limit : req.query.limit,
				pages: Math.ceil(result[1] / limit)
			}
		})
	}
}
