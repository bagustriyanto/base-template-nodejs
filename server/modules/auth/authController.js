const authService = require('./authService');
const tokenService = require('./tokenService')
const baseResponse = require('../../response/index');

module.exports = {
    login(req, res) {
        authService.login(req).then(r => {
            baseResponse.data = r.user;
            baseResponse.token = r.token;
            baseResponse.status = true;
            baseResponse.message = 'login success';

            res.status(200).send(baseResponse);
        }).catch(err => {
            baseResponse.message = err.message;

            res.status(400).send(baseResponse)
        });
    },
    testRole(req, res) {
        authService.testRole(req).then(r => {
            baseResponse.data = r;

            res.status(200).send(baseResponse);
        }).catch(err => {
            baseResponse.message = err.message;

            res.status(400).send(baseResponse)
        })
    }
}