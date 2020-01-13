const menuMap = require("../../models").menu_role_map;
const role = require("../../models").role;
const roleMap = require("../../models").role_map;
const menu = require("../../models").menu;
const Op = require("../../models").Sequelize.Op;
const sequelize = require("../../models").sequelize;
const limit = 10;
const index = 0;

module.exports = {
    createUpdateRemove(req) {
        return Promise.all([
            sequelize.transaction(t => {
                return Promise.all(
                    req.body.map(item => {
                        if (item.checked && parseInt(item.menuRoleMap.id) === 0) {
                            return menuMap.create({
                                menu_id: item.menuRoleMap.menuId,
                                role_id: item.menuRoleMap.roleId
                            })
                                .then(result => {
                                    return result
                                }).catch(err => {
                                    throw err;
                                });
                        } else if (parseInt(item.menuRoleMap.id) !== 0) {
                            if (item.checked) {
                                return menuMap.update({
                                    menu_id: item.menuId,
                                    role_id: item.roleId
                                }, { where: { id: item.menuRoleMap.id } })
                                    .then(result => {
                                        return result;
                                    })
                                    .catch(err => {
                                        throw err;
                                    })
                            } else {
                                return menuMap.destroy({
                                    where: { id: item.menuRoleMap.id }
                                }).then(result => {
                                    return result;
                                }).catch(err => {
                                    throw err;
                                })
                            }
                        }
                    })
                )
            }).catch(err => { throw err; })
        ]).then(() => {
            return true;
        }).catch(err => {
            throw err;
        })
    },
    find(req) {
        return menuMap.findAndCountAll({
            where: {
                role_id: req.params.id
            },
            limit: req.query.limit === undefined ? limit : req.query.limit,
            offset: req.query.index === undefined ? index : (req.query.index - 1) * limit,
            include: [
                {
                    model: role
                },
                {
                    model: menu
                }
            ]
        }).then(result => {
            return {
                items: result.rows,
                total: result.count,
                limit: req.query.limit === undefined ? limit : req.query.limit,
                pages: Math.ceil(result.count / limit)
            };
        }).catch(err => {
            throw err;
        });
    }
}