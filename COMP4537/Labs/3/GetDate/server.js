// server.js
const http = require('http');
const url = require('url');
const fs = require('fs');
const utils = require('./modules/utils');
const messages = require('./locals/en.json');

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;

    if (req.url.includes('/getDate')) {
        const name = queryObject.name || 'Guest';
        const currentTime = utils.getDate();

        let message = messages.greeting.replace('%name%', name);
        message += currentTime;

        // Respond in blue text
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<div style="color:blue;">${message}</div>`);
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
