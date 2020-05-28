const express = require('express');
const db = require('./libs/db');
const app = express();

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
}).catch(console.error);