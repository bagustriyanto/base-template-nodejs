const blog = require("../../models").blog
const credentials = require("../../models").credentials
const Op = require("../../models").Sequelize.Op
const i18n = require("i18n")
const moment = require("moment")

const limit = 10
const index = 0

module.exports = {
	create: function(req) {
		return blog
			.create({
				title: req.body.title,
				content: req.body.content,
				tags: req.body.tags,
				status: req.body.status,
				credential_id: req.body.credential_id,
				created_at: moment().format()
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
			.update(
				{
					title: req.body.title,
					content: req.body.content,
					tags: req.body.tags,
					status: req.body.status,
					modified_at: moment().format()
				},
				{ where: { id: req.params.id } }
			)
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
		let whereClause = {}
		if (req.body.searchTerm !== undefined && req.body.searchTerm !== "") {
			where.where = {
				[Op.or]: [{ title: { [Op.iLike]: `%${req.body.searchTerm}%` } }, { status: { [Op.iLike]: `%${req.body.searchTerm}%` } }]
			}
		}
		return blog
			.findAndCountAll({
				whereClause,
				limit: req.query.limit === undefined ? limit : req.query.limit,
				offset: req.query.index === undefined ? index : (req.query.index - 1) * limit,
				include: [{ model: credentials, attributes: { exclude: ["password", "salt"] } }]
			})
			.then(result => {
				return {
					total: result.count,
					items: result.rows,
					limit: limit,
					pages: Math.ceil(result.count / limit)
				}
			})
	}
}
