const roleApi = require("../modules/role/roleApi")
const userApi = require("../modules/user/userApi")
const authApi = require("../modules/auth/authApi")
const sharedApi = require("../modules/shared/sharedApi")
const menuApi = require("../modules/menu/menuApi")
const roleMapApi = require("../modules/user-role-map/userRoleMapApi")
const menuMapApi = require("../modules/menu-role-map/menuRoleMapApi")
const blogApi = require("../modules/blog/blogApi")

module.exports = app => {
	app.get("/api", (req, res) =>
		res.status(200).send({
			message: "welcome to api route"
		})
	)
	roleApi(app)
	userApi(app)
	authApi(app)
	sharedApi(app)
	menuApi(app)
	roleMapApi(app)
	menuMapApi(app)
	blogApi(app)
}
