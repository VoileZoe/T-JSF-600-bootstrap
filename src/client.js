const net = require('net');

const client = new net.Socket();

function connect(host, port) {
    client.connect(port, host, () => {
        console.log('Connected to server!');
        client.write('ping');
        client.destroy();
    });

    client.on('data', (data) => {
        console.log('Received from server:', data.toString());
        client.destroy();
    });

    client.on('close', () => {
        console.log('Connection closed');
    });

    client.on('error', (error) => {
        console.error('Connection error:', error);
    });
}

module.exports = { connect };
