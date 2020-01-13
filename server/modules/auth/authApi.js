const authController = require('../auth/authController');

module.exports = (app) => {
    app.post('/api/login', authController.login);
    app.get('/api/testRole', authController.testRole)
}