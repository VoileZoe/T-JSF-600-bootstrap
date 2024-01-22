// src/pages.js
// page qui contient les fonctions avec le contenu de chaque page !

const fs = require('fs').promises;

async function home(req, res) {
    let html = await fs.readFile('./views/index.html', 'utf8');
    html = html.replace('$NAME', 'Homepage');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
}

async function about(req, res) {
    let html = await fs.readFile('./views/about.html', 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
}

module.exports = {
    home,
    about,
};
