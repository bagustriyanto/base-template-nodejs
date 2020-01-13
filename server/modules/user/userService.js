const user = require("../../models").user;
const credentials = require("../../models").credentials;
const op = require("../../models").Sequelize.Op;
const general = require("../general/generalController");
const moment = require("moment");
const models = require("../../models/index");

const limit = 10;
const index = 0;

module.exports = {
    create(req) {
        const email = credentials.findOne({
            where: {
                email: req.body.credential.email
            }
        }).then(result => { return result });

        const username = credentials.findOne({
            where: {
                username: req.body.credential.username
            }
        }).then(result => { return result });

        return Promise.all([email, username]).then(result => {
            if (result[0] !== null) {
                throw Error("ERROR-0001");
            } else if (result[1] !== null) {
                throw Error("ERROR-0002");
            } else {
                return general.salt().then(saltResult => {
                    salt = saltResult;
                    password = general.passwordEncrypt(req.body.credential.password, saltResult);

                    return models.sequelize.transaction(t => {
                        return Promise.all([
                            credentials.create({
                                email: req.body.credential.email,
                                username: req.body.credential.username,
                                password: general.passwordEncrypt(req.body.credential.password, saltResult),
                                salt: saltResult,
                                status: req.body.credential.status,
                                created_by: req.body.credential.username,
                                created_at: moment.now,
                                created_host: req.connection.remoteAddress
                            }, { transaction: t }).then(credModel => {
                                user.create({
                                    credential_id: credModel.get("id"),
                                    first_name: req.body.firstname,
                                    last_name: req.body.lastname,
                                    phone: req.body.phone,
                                    created_by: req.body.credential.username,
                                    created_at: moment.now(),
                                    created_host: req.connection.remoteAddress
                                }, { transaction: t }).then(userModel => {
                                    return true;
                                })
                            })
                        ]);
                    }).catch(tErr => { throw new Error(tErr) })
                })
            }
        })
    },
    update(req) {
        const credential = credentials.findByPk(req.params.id).then(result => { return result });
        return Promise.all([credential]).then(result => {
            if (result[0] === null) {
                throw Error("ERROR-9998");
            } else {
                return models.sequelize.transaction(t => {
                    return Promise.all([
                        credentials.update({
                            status: req.body.credential.status,
                            modified_by: null,
                            modified_on: moment.now(),
                            modified_host: req.connection.remoteAddress
                        }, { where: { id: req.params.id } })
                            .then(credModel => {
                                user.update({
                                    first_name: req.body.firstname,
                                    last_name: req.body.lastname,
                                    phone: req.body.phone
                                }, { where: { credential_id: req.params.id } })
                                    .then(userModel => {
                                        return null;
                                    })
                            })

                    ]).catch(err => { throw err });
                })
            }
        });
    },
    delete(req) {
        return credentials.findByPk(req.params.id)
            .then(result => {
                if (result === null) {
                    throw new Error("ERROR-9999");
                } else {
                    return models.sequelize.transaction(t => {
                        Promise.all([
                            credentials.destroy({
                                where: {
                                    id: req.params.id
                                }
                            }).then(() => {
                                user.destroy({
                                    where: {
                                        credential_id: req.params.id
                                    }
                                })
                            }).then(() => { return true })
                        ]).catch(err => { throw err });
                    })
                }
            })
    },
    list(req) {
        return credentials.findAndCountAll({
            include: [{
                model: user,
                attributes: ["id", "credential_id", "first_name", "last_name", "phone"],
                required: true,
            }],
            limit: req.body.limit,
            offset: req.body.index,
            attributes: ["id", "email", "username", "public_user", "status"],
            order: [[user, "credential_id"]]
        })
            .then(result => {
                return {
                    total: result.count,
                    items: result.rows,
                    limit: req.body.limit === undefined ? limit : req.body.limit,
                    pages: req.body.index === undefined ? index + 1 : req.body.index + 1
                }
            }).catch(err => {
                throw err;
            })

    }
}