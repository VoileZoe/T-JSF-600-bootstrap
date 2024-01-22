const http = require('http');
const url = require('url');
const fs = require('fs').promises;
const querystring = require('querystring');
const router = require('./src/router');

async function readHtmlFile() {
    try {
        return await fs.readFile('./views/index.html', 'utf8');
    } catch (error) {
        console.error('Error reading HTML file:', error);
        throw error;
    }
}

function replaceNameInHtml(html, name) {
    return html.replace('$NAME', name);
}

const server = http.createServer(async (req, res) => {
    console.log('Client connected');
    console.log(req);

    if (req.method === 'POST' && req.url === '/index.html') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });
        req.on('end', async () => {
            const postParams = querystring.parse(body);
            const name = postParams.name || 'whoever you are';
            try {
                let html = await readHtmlFile();
                html = replaceNameInHtml(html, name);

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html);
            } catch (error) {
                console.log('Error handling POST request:', error);
                res.writeHead(500);
                res.end('Internal Server Error');
            }
        });
    } else if (req.method === 'GET') {
        try {
            const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
            const pathname = parsedUrl.pathname;
            const queryObject = url.parse(req.url, true).query;

            if (pathname === '/') {
                const name = queryObject.name || 'whoever you are';
                let html = await readHtmlFile();
                html = replaceNameInHtml(html, name);

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html);
            } else {
                router(req, res);
            }
        } catch (error) {
            console.log('Error handling request:', error);
            res.writeHead(500);
            res.end('Internal Server Error');
        }
    }
});

server.on('connection', () => {
    console.log('Client connected');
});

server.on('close', () => {
    console.log('Client disconnected');
});

server.listen(3000, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});
