const fs = require('fs');
const logger = require('./logger.js');

function getIp() {
    const appsettings = JSON.parse(fs.readFileSync('appsettings.json'));

    if (!appsettings) {
        logger("appsettings.json does not exist. Please create the file and try again.", "Error");
        logger("Server is shutting down.", "Info")
        process.exit(1);
    }

    if (appsettings.environment == "development") {
        logger("The server is running in development mode.", "Info");
        return "localhost";
    } else if (appsettings.environment == "production") {

        if (!appsettings.Ipv4) {
            logger("The IPv4 in appsettings.json is either not defined. Please check the IPv4.", "Error");
            logger("Server is shutting down.", "Info")
            process.exit(1);
        }

        return appsettings.Ipv4;
    } else {
        logger("The environment in appsettings.json is either not defined or incorrect. Please check the environment.", "Error");
        logger("Server is shutting down.", "Info")
        process.exit(1);
    }
}

module.exports = getIp;