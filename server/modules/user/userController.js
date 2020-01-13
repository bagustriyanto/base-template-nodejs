const userService = require("./userService");
const i18n = require("i18n");
let baseResponse = require("../../response");

module.exports = {
    create(req, res) {
        userService.create(req).then(r => {
            baseResponse = { status: true, message: i18n.__("INFO-0000") }

            res.status(200).send(baseResponse);
        }).catch(err => {
            console.log(err);
            baseResponse = {
                status: false, message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message
            }

            res.status(400).send(baseResponse);
        });
    },
    update(req, res) {
        userService.update(req).then(r => {
            baseResponse = { status: true, message: i18n.__("INFO-0000") }

            res.status(200).send(baseResponse);
        }).catch(err => {
            baseResponse = {
                status: false, message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message
            }

            res.status(400).send(baseResponse);
        });
    },
    delete(req, res) {
        userService.delete(req).then(r => {
            baseResponse = { status: true, message: i18n.__("INFO-0008") }

            res.status(200).send(baseResponse);
        }).catch(err => {
            baseResponse = {
                status: false, message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message
            }

            res.status(400).send(baseResponse);
        });
    },
    list(req, res) {
        userService.list(req).then(r => {
            baseResponse = { status: true, list: r, message: i18n.__("INFO-9998") };

            res.status(200).send(baseResponse);
        }).catch(err => {
            baseResponse = {
                status: false, message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message
            }

            res.status(400).send(baseResponse);
        });
    }
}