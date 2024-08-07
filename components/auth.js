const logger = require('../components/logger.js');
const basicAuth = require('basic-auth');
const fs = require('fs');

const appsettings = JSON.parse(fs.readFileSync('appsettings.json'));

const USERNAME = appsettings.username;
const PASSWORD = appsettings.password;

function auth(req, res, next) {
    const user = basicAuth(req);
    
    if (!user || user.name !== USERNAME || user.pass !== PASSWORD) {
        res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
        return res.status(401).send('Authentication required.');
    }

    logger("Admin logged in", "Info");

    next();
}

module.exports = auth;