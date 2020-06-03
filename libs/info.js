const config = require('./config');
const express = require('express');
const router = express.Router();

router.get("/info.js", (req, res) => {
    const appInfo = {
        firstTimeSetup: config.isFirstTimeSetup(),
        logo: "TODO",
        // ...
    };

    res.send(`window.appInfo = ${JSON.stringify(appInfo)}`);
});

module.exports = {
    api: router
}
