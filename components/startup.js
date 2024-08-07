const fs = require('fs').promises;
const path = require('path');
const logger = require('./logger.js');

async function startup() {
    try {
        await fs.access('routes.json');
    } catch (error) {
        logger("Der Routes Karre fehlt. Bitte erstelle eine routes.json Datei. Für weitere Informationen ist alles im README.md", "Error");
        process.exit(1);
    }

    const routesContent = await fs.readFile('routes.json');
    const routes = JSON.parse(routesContent);

    let isFirstEntry = true;
    
    for (let route in routes) {
        if (isFirstEntry) {
            isFirstEntry = false;
            continue;
        }
    
        const filePath = path.join(__dirname, '..', routes[route]);
        
        try {
            await fs.access(filePath);
        } catch (error) {
            logger(`The route ${route} is invalid. Please check the routes.json file.`, "Error");
            process.exit(1);
        }
    }
    
    logger("The routes.json file is valid", "Info");

    try {
        const facebookimages = await fs.readdir(path.join(__dirname, '..', 'public', 'gallery', 'facebook'));
        if (facebookimages.length === 0) {
            logger("The Facebook gallery folder is empty. Please add some images to the Facebook gallery folder.", "Warning");
        }
        const instagramimages = await fs.readdir(path.join(__dirname, '..', 'public', 'gallery', 'instagram'));
        if (instagramimages.length === 0) {
            logger("The Instagram gallery folder is empty. Please add some images to the Instagram gallery folder.", "Warning");
        }
    } catch (error) {
        logger("The gallery or instagram/facebook folder is missing. Please create a folder called gallery in the public folder and make sure that a instagram and facebook folder is nested inside.", "Warning");
    }

}

module.exports = startup;