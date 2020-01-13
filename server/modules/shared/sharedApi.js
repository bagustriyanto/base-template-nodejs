const sharedController = require('../shared/sharedController');

module.exports = (app) => {
    app.get('/shared/menu', sharedController.menu);
    app.get('/shared/language', sharedController.language);
}