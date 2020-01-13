const userRoleMapController = require('./userRoleMapController');

module.exports = (app) => {
    app.post('/api/user-role', userRoleMapController.create);
    app.get('/api/user-role', userRoleMapController.findAll);
    app.put('/api/user-role/:id', userRoleMapController.update);
    app.delete('/api/user-role/:id', userRoleMapController.delete);
}