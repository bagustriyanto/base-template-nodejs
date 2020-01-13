const roleService = require("./roleService");
const i18n = require("i18n");
let baseResponse = require("../../response/index");


module.exports = {
    create(req, res) {
        roleService.create(req).then(result => {
            baseResponse = { status: true, message: i18n.__("INFO-0000"), data: result };
            res.status(201).send(baseResponse);
        }).catch(err => {
            baseResponse = { status: false, message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message };
            res.status(400).send(baseResponse);
        })
    },
    findAll(req, res) {
        roleService.findAll(req).then(result => {
            baseResponse = { status: true, message: i18n.__("INFO-9999"), list: result };
            res.status(200).send(baseResponse);
        }).catch(err => {
            baseResponse = { status: false, message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message };
            res.status(400).send(baseResponse);
        })
    },
    findById(req, res) {
        roleService.findById(req).then(result => {
            baseResponse = { status: true, message: i18n.__("INFO-9999"), list: result };
            res.status(200).send(baseResponse);
        }).catch(err => {
            baseResponse = { status: false, message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message };
            res.status(400).send(baseResponse);
        })
    },
    update(req, res) {
        roleService.update(req).then(result => {
            baseResponse = { status: true, message: i18n.__("INFO-0000"), list: result };
            res.status(200).send(baseResponse);
        }).catch(err => {
            baseResponse = { status: false, message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message };
            res.status(400).send(baseResponse);
        })
    },
    delete(req, res, next) {
        roleService.delete(req).then(result => {
            baseResponse = { status: true, message: i18n.__("INFO-0008"), list: result };
            res.status(200).send(baseResponse);
        }).catch(err => {
            baseResponse = { status: false, message: err.message.includes("ERROR") ? i18n.__(err.message) : err.message };
            res.status(400).send(baseResponse);
        })
    }
}