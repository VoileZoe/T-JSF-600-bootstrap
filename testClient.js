const client = require('./src/client.js');

// Now you can use the client object
client.on('data', (data) => {
  console.log(`TestClient Received: ${data}`);
});