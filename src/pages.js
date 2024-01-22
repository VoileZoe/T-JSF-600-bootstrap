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

async function form(req, res) {
    try {
        const formHtml = await fs.readFile('./views/form.html', 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(formHtml);
    } catch (error) {
        console.error('Error reading form.html:', error);
        res.writeHead(500);
        res.end('Internal Server Error');
    }
}


module.exports = {
    home,
    about,
    form,
};
