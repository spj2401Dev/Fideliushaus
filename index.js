const express = require('express');
const app = express();
const redirect = express();
const fs = require('fs');
const path = require('path');
const startup = require('./components/startup.js');
const getIp = require('./components/getip.js');
const logger = require('./components/logger.js');
const compression = require('compression');
const https = require('https');

const info = fs.readFileSync(__dirname + '/components/info.txt', 'utf8');
console.log(info);

startup(); // Checks if the routes.json file is valid

const routes = JSON.parse(fs.readFileSync('routes.json'));

app.use(compression());

app.use(express.static('public/images')); // Images and Fonts are served by default. No need to define them in the routes.json file.
app.use(express.static('public/fonts'));

// const options = {
//     key: fs.readFileSync('/etc/letsencrypt/live/fideliushaus.de-0001/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/fideliushaus.de-0001/fullchain.pem'),
// };


app.get("/:page", function(req, res) {
    const page = `/${req.params.page}`;

    if (routes[page]) {
        res.sendFile(`${__dirname}${routes[page]}`);
        logger(`Die Seite ${page} wurde aufgerufen`, "Info");
    } else {
        if (routes["/404"]) {
            res.status(404).sendFile(`${__dirname}${routes["/404"]}`);
            logger("Die 404 Seite wurde aufgerufen", "Info");
        } else {
            res.status(404).send("404 Page Not Found");
            logger("Die 404 Seite wurde nicht gefunden", "Error")
        }
    }
});

app.get("/", function(req, res) {
    if (routes["index"]) {
        res.sendFile(`${__dirname}${routes["index"]}`);
    } else {
        res.send("Index page is not defined! Please try again later.");
        logger("Die Index Seite wurde nicht gefunden", "Error")
    }
});

app.get("/api/gallery/:type", (req, res) => {
    const type = req.params.type;

    let folderPath;

    if (type === "facebook") {
        folderPath = path.join(__dirname, "public", "gallery", "facebook");
    } else if (type === "instagram") {
        folderPath = path.join(__dirname, "public", "gallery", "instagram");
    } else {
        const randomType = Math.random() < 0.5 ? "facebook" : "instagram";
        folderPath = path.join(__dirname, "public", "gallery", randomType);
    }

    try {
        if (!fs.existsSync(folderPath)) {
            return res.status(404).send("Gallery not found");
        }

        const images = fs.readdirSync(folderPath);

        if (!images.length) {
            return res.status(204).send();
        }

        const randomImage = images[Math.floor(Math.random() * images.length)];
        const imagePath = path.join(folderPath, randomImage);

        // Set headers to prevent caching
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        res.sendFile(imagePath);
    } catch (error) {
        console.error("Error fetching gallery:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.use(function(req, res, next) { // This function has to be the last! It handels 404's, not handeled by the initital 404 handler.
    if (routes["/404"]) { // If anything is below this, it will not be routed!
        res.status(404).sendFile(`${__dirname}${routes["/404"]}`);
    } else {
        res.status(404).send("404 Page Not Found");
        logger("Die 404 Seite wurde nicht gefunden", "Error")
    }
});

// Redirect to HTTPS
redirect.get('*', function(req, res) {
    res.redirect('https://' + req.headers.host + req.url);
})

const port = 443; // HTTPS Port
const httpPort = 80; // HTTP Port
const ip = getIp();
// https.createServer(options, app).listen(port, ip, () => {
//     console.log(`HTTPS Traffic getting served on: ${ip}:${port}`);
// });

app.listen(8080, ip, () => {
    logger(`HTTP Traffic getting served on: ${ip}:8080`, "Info");
});

redirect.listen(httpPort, ip, () => {
    logger(`HTTP Traffic getting redirected to HTTPS on: ${ip}:${httpPort}`, "Info");
});