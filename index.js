const express = require('express');
const db = require('./libs/db');
const payment = require('./libs/payment');
const info = require('./libs/info');
const bodyParser = require('body-parser');
const app = express();

const argv = require('minimist')(process.argv.slice(2), {
    'default': {
        'port': 3000,
        'host': '0.0.0.0',
        'production': false,
    },
    'alias': {
        'port': 'p',
        'host': 'h',
        'production': 'prod'
    }
});
const { port, host, production } = argv;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/r', db.api);
app.use('/r', payment.api);
app.use('/', info.api);

if (production){
    require("greenlock-express")
        .init({
            packageRoot: __dirname,
            maintainerEmail: "nobody@example.com",
            configDir: "./greenlock.d",
            cluster: false
        })
        .serve(app);
}else{
    app.listen(port, host, () => console.log(`Server listening on http://${host}:${port}`))
}