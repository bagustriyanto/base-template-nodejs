const blogController = require("./blogController")

module.exports = app => {
	app.get("/api/blog", blogController.findAll)
	app.post("/api/blog", blogController.create)
	app.put("/api/blog/:id", blogController.update)
	app.delete("/api/blog/:id", blogController.delete)
}
