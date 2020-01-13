const blog = require("../../models").blog
const credential = require("../../models").credentials
const Op = require("../../models").Sequelize.Op
const i18n = require("i18n")

const limit = 10
const index = 0

module.exports = {
	create: function(req) {
		return blog
			.create({
				title: req.body.title,
				content: req.body.content,
				tags: req.body.tags,
				status: req.body.status
			})
			.then(result => {
				return result
			})
			.catch(err => {
				throw err
			})
	},
	update: function(req) {
		return blog
			.update({
				title: req.body.title,
				content: req.body.content,
				tags: req.body.tags,
				status: req.body.status
			})
			.then(result => {
				return result
			})
			.catch(err => {
				throw err
			})
	},
	delete: function(req) {
		return blog
			.delete({ where: { id: req.params.id } })
			.then(result => {
				return result
			})
			.catch(err => {
				throw err
			})
	},
	findAll: function(req) {
		let where = {}
		if (req.body.searchTerm !== undefined && req.body.searchTerm !== "") {
			where.where = {
				[Op.or]: [{ title: { [Op.iLike]: `%${req.body.searchTerm}%` } }, { status: { [Op.iLike]: `%${req.body.searchTerm}%` } }]
			}
		}
		return blog
			.findAndCountAll({
				where,
				limit: req.query.limit === undefined ? limit : req.query.limit,
				offset: req.query.index === undefined ? index : (req.query.index + 1) * limit
			})
			.then(result => {
				return {
					total: result.count,
					list: result.rows,
					limit: limit,
					pages: Math.ceil(result.count / limit)
				}
			})
	}
}
