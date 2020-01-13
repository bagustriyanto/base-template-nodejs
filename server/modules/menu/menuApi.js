const menuController = require('./menuController');

module.exports = (app) => {
    app.post('/api/menu', menuController.create);
    app.get('/api/menu', menuController.findAll);
    app.put('/api/menu/:id', menuController.update);
    app.delete('/api/menu/:id', menuController.delete);
}