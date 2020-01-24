const menu = require("../../models").menu
const i18n = require("i18n")
const roleMap = require("../../models").role_map
const menuMap = require("../../models").menu_role_map
const uuid = require("uuid")

module.exports = {
	language(req, res) {
		let cookies = req.headers.cookies.split(";")
		let lang = cookies[0].split("=")[1].trim()
		if (!!lang) {
			lang = "id"
		}
		const i18nCatalog = i18n.getCatalog(lang)
		res.status(200).send(i18nCatalog)
	},
	menu(req, res) {
		getChild = parent => {
			return Promise.all(
				parent.map((item, index) => {
					return menu
						.findAll({
							where: {
								parent: item.menu_id
							}
						})
						.then(childResult => {
							item.menu.child = childResult
							return item
						})
				})
			).then(result => {
				res.status(200).send(result)
			})
		}

		const roleMapData = roleMap
			.findOne({
				where: {
					credential_id: req.user.userId
				}
			})
			.then(result => {
				return menuMap
					.findAll({
						where: {
							role_id: result.role_id
						},
						include: {
							model: menu,
							where: {
								parent: null
							}
						}
					})
					.then(parent => {
						return parent
					})
			})

		const parent = Promise.all([roleMapData]).then(result => {
			return getChild(result[0])
		})
	},
	uploadFile(req, res) {
		if (!req.files || Object.keys(req.files).length === 0) {
			res.status(400).send("No file were uploaded")
		}

		let file = req.files.file
		let id = uuid.v4()
		let splitFile = file.name.split(".")
		let fileFormat = splitFile[splitFile.length - 1]
		let folderType = req.body.type === "1" ? "image" : "file"
		let fullPath = `/public/upload/${folderType}/${id}.${fileFormat}`
		let returnPath = `/upload/${folderType}/${id}.${fileFormat}`

		file.mv(`${appRoot}/${fullPath}`, function(err) {
			if (err) res.status(400).send({ message: "error", status: false })
			res.status(200).send({ message: "success", data: returnPath, status: true })
		})
	}
}
