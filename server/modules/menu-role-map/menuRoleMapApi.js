const menuMapController = require('./menuRoleMapController');

module.exports = (app) => {
    app.post('/api/menu-role', menuMapController.createUpdateRemove);
    app.get('/api/menu-role/:id', menuMapController.find);
}