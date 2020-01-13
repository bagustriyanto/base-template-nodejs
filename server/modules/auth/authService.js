const credentials = require('../../models').credentials;
const roleMap = require('../../models').role_map;
const menuMap = require('../../models').menu_role_map;
const menu = require('../../models').menu;
const role = require('../../models').role;
const Op = require('../../models').Sequelize.Op;
const general = require('../general/generalController');
const tokenService = require('../auth/tokenService');

module.exports = {
    login(req) {
        const result = Promise.all([
            credentials.findOne({
                where: {
                    [Op.or]: [
                        { username: req.body.username }, { email: req.body.username }
                    ],
                    status: true
                }
            })
        ]).then(result => {
            let data = result[0];
            let currentPass = general.passwordEncrypt(req.body.password, data.salt);

            if (currentPass === data.password) {
                data.password = null;
                data.salt = null;

                return data;
            } else {
                throw new Error("password doesn't match with server");
            }
        }).then(result => {
            return roleMap.findOne({
                where: {
                    credential_id: result.id
                },
                include: {
                    model: role
                }
            }).then(roleResult => {
                let token = tokenService.generateToken(result.username, roleResult.role.name, result.id);
                return {
                    user: result,
                    token: token
                };
            })
        }).catch(err => {
            throw err;
        });
        return result;
    },
    testRole(req) {
        getChild = (parent) => {
            return Promise.all(parent.map((item, index) => {
                return menu.findAll({
                    where: {
                        parent: item.menu_id
                    }
                }).then(childResult => {
                    item.menu.child = childResult;
                    return parent[0];
                })
            }));
        }
        const roleMapData = roleMap.findOne({
            where: {
                credential_id: 14
            }
        }).then(result => {
            return menuMap.findAll({
                where: {
                    role_id: result.role_id
                },
                include: {
                    model: menu,
                    where: {
                        parent: null
                    }
                }
            }).then(parent => {
                return parent;
            })
        });

        const parent = Promise.all([roleMapData]).then(result => {
            return getChild(result[0]);
        })
        return parent;
    }
}