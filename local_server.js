const http = require('http');
const os = require('os');

// Get the local IP address
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const interface = interfaces[interfaceName];
    for (const { address, family, internal } of interface) {
      if (family === 'IPv4' && !internal) {
        return address;
      }
    }
  }
  return '127.0.0.1'; // Default to localhost if no IP is found
}

const hostname = getLocalIpAddress();
const port = 8080;

const server = http.createServer((req, res) => {
  // Log request details
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
