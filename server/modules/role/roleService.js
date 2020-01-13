const Role = require('../../models').role;
const Op = require('../../models').Sequelize.Op;
const limit = 10;
const index = 0;

module.exports = {
    create(req) {
        return Role.create({
            name: req.body.name,
            status: req.body.status
        }).then(role => {
            return role;
        }).catch(error => {
            throw error;
        });
    },
    findAll(req) {
        let whereClause = {};
        if (req.body.name !== undefined) {
            whereClause.where = {
                name: { [Op.iLike]: `%${req.body.name}%` }
            }
        }
        return Role.findAndCountAll({
            whereClause,
            limit: req.body.limit === undefined ? limit : req.body.limit,
            offset: req.body.index === undefined ? index : req.body.index,
        }).then(result => {
            return {
                items: result.rows,
                total: result.count,
                limit: req.body.limit === undefined ? limit : req.body.limit,
                pages: req.body.index === undefined ? index + 1 : req.body.index + 1
            };
        }).catch(error => {
            throw error;
        });
    },
    findById(req) {
        return Role.findByPk(req.params.id)
            .then(role => {
                return role;
            })
            .catch(error => {
                throw error;
            });
    },
    update(req) {
        return Role.update({
            name: req.body.name,
            status: req.body.status
        }, { where: { id: req.params.id } })
            .then(role => {
                return role;
            })
            .catch(error => {
                throw error;
            });
    },
    delete(req, res, next) {
        Role.findByPk(req.params.id)
            .then(role => {
                if (role !== null) {
                    Role.destroy({ where: { id: req.params.id } })
                        .then(role => {
                            return role;
                        })
                } else {
                    throw new Error("ERROR-9999");
                }
            })
            .catch(error => {
                throw error;
            });
    }
}