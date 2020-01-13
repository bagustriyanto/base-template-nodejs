const menuService = require("./menuService");
const i18n = require("i18n");

let baseResponse = require("../../response/index");

module.exports = {
    create(req, res) {
        menuService.create(req).then(result => {
            baseResponse = { status: true, message: i18n.__("INFO-0000") };

            res.status(200).send(baseResponse);

        }).catch(err => {
            baseResponse = {
                status: false, message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message
            }

            res.status(400).send(baseResponse);
        })
    },
    update(req, res) {
        menuService.update(req).then(result => {
            baseResponse = { status: true, message: i18n.__("INFO-0000") };

            res.status(200).send(baseResponse);

        }).catch(err => {
            baseResponse = {
                status: false, message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message
            }

            res.status(400).send(baseResponse);
        })
    },
    delete(req, res) {
        menuService.delete(req).then(result => {
            baseResponse = { status: true, message: i18n.__("INFO-0008") };

            res.status(200).send(baseResponse);

        }).catch(err => {
            baseResponse = {
                status: false, message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message
            }

            res.status(400).send(baseResponse);
        })
    },
    findAll(req, res) {
        menuService.findAll(req).then(result => {
            baseResponse = { status: true, message: i18n.__("INFO-9999"), list: result };

            res.status(200).send(baseResponse);

        }).catch(err => {
            baseResponse = {
                status: false, message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message
            }

            res.status(400).send(baseResponse);
        })
    }
}