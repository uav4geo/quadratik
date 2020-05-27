const express = require('express');
const db = require('./libs/db');
const app = express();
const fs = require('fs');

const argv = require('minimist')(process.argv.slice(2), {
    'default': {
        'port': 3000,
        'host': '0.0.0.0',
    },
    'alias': {
        'port': 'p',
        'host': 'h'
    }
});
const { port, host } = argv;

app.use(express.static('public'));


db.initialize(app).then(() => {
    app.listen(port, host, () => console.log(`Server listening on http://${host}:${port}`))
    if (!fs.existsSync("config.json")){
        console.warn(`WARNING! Change the admin password immediately by visiting http://${host}:${port}/_utils/#/createAdmin`)
    }
}).catch(console.error);