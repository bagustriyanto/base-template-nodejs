const expressJwt = require("express-jwt");
const env = process.env.NODE_ENV || 'development';
const config = require('./config.json').token[env];

function jwt() {
    return expressJwt({
        secret: config.secret,
        audience: config.audience,
        issuer: config.issuer
    }).unless({
        path: [
            '/api/login',
            '/shared/language'
        ]
    })
}

module.exports = jwt;