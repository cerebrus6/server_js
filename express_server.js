// Environment Variables
require('dotenv').config();
const port = process.env.PORT;
const server_api_key = process.env.API_KEY;

// Dependencies
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const os = require('os');
const Routes = require('./routes');

// Initialize and set up routes
const routes = new Routes(app);
routes.setupRoutes();

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

// To avoid CORS errors when running on http
app.use(cors());

// Apply API verification to all routes except /
app.use((req, res, next) => {
    if (req.path !== '/') {
      api_verification(req, res, next);
    } else {
        next();
    }
});

// Check if server_api_key is same with request_api_key
function api_verification(req, res, next) {
    const request_api_key = req.headers["api-key"];
    if (server_api_key !== request_api_key) {
        return res.status(401).json({ message: 'Unauthorized: API verification failed.' });
    }
    next();
}

// Run server
server.listen(port, () => {
    const hostname = getLocalIpAddress();
    console.log(`Server is running on ${hostname}:${port}`);
});
