const express = require('express');
const router = express.Router();
const path = require('path');
let editJsonFile  = require("edit-json-file");
const bodyParser = require('body-parser');
const auth = require("../components/auth");

const file = editJsonFile(path.join(__dirname, '..', 'data.json'));

router.use(bodyParser.json());

router.post("/faq", auth, (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).send("Bad Request");
    }

    const encodedTitle = encodeURIComponent(title);

    file.set(`faq.${encodedTitle}`, description);
    file.save();
    res.status(200).send("FAQ added successfully");
});

router.delete("/faq", auth, (req, res) => {
    const title = req.body.title;

    if (!title) {
        return res.status(400).send("Title is required");
    }

    if (!file.get(`faq.${title}`)) {
        return res.status(400).send("FAQ does not exist");
    }

    file.unset(`faq.${title}`);
    file.save();
    res.status(200).send("FAQ deleted successfully");
});

router.get("/faq", (req, res) => {
    const faq = file.get("faq");

    const decodedFaq = {};
    for (const key in faq) {
        if (faq.hasOwnProperty(key)) {
            const decodedKey = decodeURIComponent(key);
            decodedFaq[decodedKey] = faq[key];
        }
    }

    res.json(decodedFaq);
});

module.exports = router;
