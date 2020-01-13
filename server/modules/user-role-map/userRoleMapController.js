const userRoleMapService = require("./userRoleMapService");
const i18n = require("i18n");
let baseResponse = require("../../response/index");

module.exports = {
    create(req, res) {
        userRoleMapService.create(req)
            .then(result => {
                baseResponse = { status: true, message: i18n.__("INFO-0000"), data: result }

                res.status(200).send(baseResponse);
            }).catch((err) => {
                baseResponse = {
                    status: false, message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message
                }
                res.status(400).send(baseResponse);
            });
    },
    update(req, res) {
        userRoleMapService.update(req)
            .then(result => {
                baseResponse = { status: true, message: i18n.__("INFO-0000"), data: result }

                res.status(200).send(baseResponse);
            }).catch((err) => {
                baseResponse = {
                    status: false, message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message
                }
                res.status(400).send(baseResponse);
            });
    },
    delete(req, res) {
        userRoleMapService.delete(req)
            .then(result => {
                baseResponse = { status: true, message: i18n.__("INFO-0008"), data: result }

                res.status(200).send(baseResponse);
            }).catch((err) => {
                baseResponse = {
                    status: false, message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message
                }
                res.status(400).send(baseResponse);
            });
    },
    findAll(req, res) {
        userRoleMapService.findAll(req)
            .then(result => {
                baseResponse = { status: true, message: i18n.__("INFO-9998"), list: result }

                res.status(200).send(baseResponse);
            }).catch((err) => {
                baseResponse = {
                    status: false, message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message
                }
                res.status(400).send(baseResponse);
            });
    }
}