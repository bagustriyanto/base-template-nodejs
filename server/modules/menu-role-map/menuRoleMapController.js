const menuMapService = require("./menuRoleMapService");
const i18n = require("i18n");
let baseResponse = require("../../response/index");

module.exports = {
    createUpdateRemove(req, res) {
        menuMapService.createUpdateRemove(req).then(() => {
            baseResponse = { status: true, message: i18n.__("INFO-0000") }
        });
        res.status(200).send(baseResponse);
    },
    find(req, res) {
        menuMapService.find(req).then(result => {
            baseResponse = { status: true, list: result }
            res.status(200).send(baseResponse);
        }).catch(err => {
            baseResponse = { message: err.message, status: false };
            res.status(400).send(baseResponse);
        })
    }
}