Install dependencies

    npm install

Configure env (rename env.txt to .env)

    Linux
  
      mv env.txt .env

    Windows

      ren env.txt .env


Start express server
    
    node express_server.js


Notes:

 - Modify routes.js to add more endpoints

 - API verification is implemented for all endpoints except /


Under construction:

 - API verification exception
 - Error logging
 - Request and response logging
 - Input sanitation to avoid XSS
