const net = require('net');

const client = new net.Socket();

client.connect(3001, 'localhost', () => {
    console.log('Connected to server');
    client.write('Hello from client');
});

client.on('data', (data) => {
    console.log('Received: ' + data);
    client.destroy(); 
});

client.on('close', () => {
    console.log('Connection closed');
});