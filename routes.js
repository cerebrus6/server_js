const axios = require('axios');

class Routes {
    constructor(app) {
        this.app = app;
    }

    // Modify this to add routes
    setupRoutes() {
        this.app.get('/', this.index.bind(this));
        this.app.get('/send_message', this.send_message.bind(this));
        this.app.get('/send_json', this.send_json.bind(this));
        this.app.get('/request', this.request.bind(this));
    }

    ////////////////////
    // Controllers
    ////////////////////

    // Default
    index(req, res) {
        res.sendFile(__dirname + '/index.html');
    }

    // Test function for send()
    async send_message(req, res) {
        let message = req.query.message || 'Default broadcast message';

        let response = {
            'message': message
        }
        res.send(response);
    }

    // Test function for json()
    async send_json(req, res) {
        res.json({
            message: 'Success',
            data: {
                hello: 'world',
            }
        });
    }

    // This function should be called redirect
    // This function will send a request to a url
    // The params given to the function will be given to the request
    // method: POST/GET
    // url: https://test-url.com
    // param_1: param_1
    // param_2: param_2
    // param_n: param_n
    async request(req, res) {

        // Important req and res properties
        let headers = req.headers;
        let payload = req.query;
        let http_method = payload.method;
        let url = payload.url;

        try {
            // Initialize response variable
            let response;

            // Handle different HTTP methods
            switch (http_method) {
                case 'get':
                    // Use all payload properties except 'method' as query params
                    let { method, ...queryParams } = payload;
                    response = await axios.get(url, { params: queryParams });
                    break;
                case 'post':
                    // Use all payload properties except 'method' as body params
                    let { method: methodPost, ...bodyParams } = payload;
                    response = await axios.post(url, bodyParams);
                    break;
                // Add cases for other HTTP methods (PUT, DELETE, etc.) as needed
                default:
                    console.log(http_method);
                    throw new Error('Unsupported HTTP method');
            }

            res.json({ message: 'Request successful', data: response.data });
        } catch (error) {
            res.status(500).json({ message: 'Error in request', error: error.message });
        }
    }
}

module.exports = Routes;
