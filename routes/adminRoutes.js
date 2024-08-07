const express = require('express');
const router = express.Router();
const path = require('path');
const auth = require("../components/auth");

router.get('/faq', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '/../public/admin/index.html'));
});

module.exports = router;