const userController = require("../user/userController");

module.exports = (app) => {
    app.post("/api/user", userController.create);
    app.put("/api/user/:id", userController.update);
    app.get("/api/user", userController.list);
    app.delete("/api/user/:id", userController.delete);
}