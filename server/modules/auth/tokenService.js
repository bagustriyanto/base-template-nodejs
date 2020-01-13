const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json').token[env];

module.exports = {
    generateToken(username, role, credential_id) {
        return jwt.sign({ username: username, role: role, userId: credential_id }, config.secret,
            { audience: config.audience, issuer: config.issuer, expiresIn: config.expiresIn });
    }
}
