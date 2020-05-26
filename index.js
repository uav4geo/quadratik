const express = require('express');
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
app.get('/hello', (req, res) => res.send('Hello World!'));

app.listen(port, host, () => console.log(`Server listening on http://${host}:${port}`))