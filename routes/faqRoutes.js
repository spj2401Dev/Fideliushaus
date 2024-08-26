const express = require('express');
const router = express.Router();
const path = require('path');
let editJsonFile  = require("edit-json-file");
const bodyParser = require('body-parser');
const auth = require("../components/auth");

const file = editJsonFile(path.join(__dirname, '..', 'data.json'));

router.use(bodyParser.json());

router.post("/faq", auth, (req, res) => {
    const { title, description, icon } = req.body;

    if (!title || !description || !icon) {
        return res.status(400).send("Bad Request");
    }

    const encodedTitle = encodeURIComponent(title);

    // Store the description and icon separately
    file.set(`faq.${encodedTitle}.answer`, description);
    file.set(`faq.${encodedTitle}.icon`, icon);

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

    const decodedFaq = [];
    for (const key in faq) {
        if (faq.hasOwnProperty(key)) {
            const decodedQuestion = decodeURIComponent(key);
            const answer = faq[key].answer;
            const icon = faq[key].icon || "fa-solid fa-question";

            decodedFaq.push({
                question: decodedQuestion,
                answer: answer,
                icon: icon
            });
        }
    }

    res.json(decodedFaq);
});

module.exports = router;
