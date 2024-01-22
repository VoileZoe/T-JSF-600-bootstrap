// src/router.js

const pages = require('./pages');

module.exports = function route(req, res) {
    const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;

    switch (pathname) {
        case '/':
            pages.home(req, res);
            break;
        case '/about':
            pages.about(req, res);
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 error: Page not found.');
            break;
    }
};
