const blogService = require("./blogService")
const i18n = require("i18n")
let baseResponse = require("../../response")

module.exports = {
	create: function(req, res) {
		blogService
			.create(req)
			.then(result => {
				baseResponse = { status: true, message: i18n.__("INFO-0000") }

				res.status(200).send(baseResponse)
			})
			.catch(result => {
				baseResponse = {
					status: false,
					message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message
				}
				res.status(400).send(baseResponse)
			})
	},
	update: function(req, res) {
		blogService
			.update(req)
			.then(result => {
				baseResponse = { status: true, message: i18n.__("INFO-0000") }

				res.status(200).send(baseResponse)
			})
			.catch(result => {
				baseResponse = {
					status: false,
					message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message
				}
				res.status(400).send(baseResponse)
			})
	},
	delete: function(req, res) {
		blogService
			.delete(req)
			.then(result => {
				baseResponse = { status: true, message: i18n.__("INFO-0008") }

				res.status(200).send(baseResponse)
			})
			.catch(result => {
				baseResponse = {
					status: false,
					message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message
				}
				res.status(400).send(baseResponse)
			})
	},
	findAll: function(req, res) {
		blogService
			.findAll(req)
			.then(result => {
				baseResponse = { status: true, message: i18n.__("INFO-9999"), list: result }

				res.status(200).send(baseResponse)
			})
			.catch(result => {
				baseResponse = {
					status: false,
					message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message
				}
				res.status(400).send(baseResponse)
			})
	}
}
