const roleMap = require("../../models").role_map;
const credentials = require("../../models").credentials;
const role = require("../../models").role;
const Op = require("../../models").Sequelize.Op;
const sequelize = require("../../models").sequelize;

const limit = 10;
const index = 0;

module.exports = {
    create(req) {
        return roleMap.findOne({
            where: {
                role_id: req.body.role_id,
                credential_id: req.body.credential_id
            }
        }).then(result => {
            if (result !== null) {
                throw new Error("ERROR-9999")
            } else {
                return result;
            }
        }).then(result => {
            return sequelize.transaction(t => {
                roleMap.create({
                    role_id: req.body.roleId,
                    credential_id: req.body.credentialId
                }, { transaction: t }).then(create => {
                    return create;
                });
            });

        }).catch(err => {
            throw err;
        });
    },
    update(req) {
        return roleMap.findOne({
            where: { id: req.params.id }
        }).then(result => {
            if (result === null) {
                throw new Error("ERROR-9998");
            } else {
                return result;
            }
        }).then(() => {
            return sequelize.transaction(t => {
                roleMap.update({
                    role_id: req.body.roleId,
                    credential_id: req.body.credentialId
                }, { transaction: t }).then(update => {
                    return update;
                });
            });
        }).catch(err => {
            throw err;
        });
    },
    delete(req) {
        return roleMap.findOne({
            where: { id: req.params.id }
        }).then(result => {
            if (result === null) {
                throw new Error("ERROR-9998");
            } else {
                return result;
            }
        }).then(result => {
            return sequelize.transaction(t => {
                roleMap.destroy({
                    where: { id: req.body.id },
                    transaction: t
                }).then(update => {
                    return update;
                });
            });
        }).catch(err => {
            throw err;
        });
    },
    findAll(req) {
        let whereClause = {};
        if (req.body.searchTerm !== undefined) {
            let param = {
                [Op.or]: [
                    {
                        "$credentials.username$": { [Op.iLike]: `%${req.body.searchTerm}%` }
                    },
                    {
                        "$roles.name$": { [Op.iLike]: `%${req.body.searchTerm}%` }
                    }
                ]
            }
            whereClause = param;
        }
        return roleMap.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: credentials,
                    attributes: ["id", "username", "email", "status", "public_user"],
                    required: false
                }, {
                    model: role,
                    required: false
                }
            ]
        }).then(result => {
            return {
                items: result.rows,
                total: result.count,
                limit: req.body.limit === undefined ? limit : req.body.limit,
                pages: req.body.index === undefined ? index + 1 : req.body.index + 1
            };
        }).catch(err => {
            throw err;
        })
    }
}
