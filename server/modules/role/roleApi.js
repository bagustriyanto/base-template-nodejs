const RoleController = require('./roleController');

module.exports = (app) => {
    app.post('/api/role', RoleController.create);
    app.get('/api/role', RoleController.findAll);
    app.get('/api/role/:id', RoleController.findById);
    app.put('/api/role/:id', RoleController.update);
    app.delete('/api/role/:id', RoleController.delete);
}